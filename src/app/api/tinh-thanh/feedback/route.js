import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import db from '@/lib/db';
import { checkRateLimit, recordRateLimitAttempt, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    // Chống spam: tối đa 5 lần báo lỗi trong 10 phút từ 1 IP
    const rateCheck = checkRateLimit(ip, 'data_feedback_submit', 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, message: 'Bạn đã gửi thông tin quá nhiều lần. Vui lòng thử lại sau vài phút.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const targetName = String(body.targetName || '').trim().slice(0, 200);
    const targetUrl = String(body.targetUrl || '').trim().slice(0, 500);
    const senderName = String(body.senderName || 'Người dân ẩn danh').trim().slice(0, 100);
    const senderContact = String(body.senderContact || '').trim().slice(0, 100);
    const feedbackContent = String(body.feedbackContent || '').trim().slice(0, 2000);
    const suggestedAddress = String(body.suggestedAddress || '').trim().slice(0, 300);
    const suggestedPhone = String(body.suggestedPhone || '').trim().slice(0, 50);

    if (!feedbackContent && !suggestedAddress && !suggestedPhone) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp nội dung thông tin cần đính chính.' },
        { status: 400 }
      );
    }

    recordRateLimitAttempt(ip, 'data_feedback_submit', 10 * 60 * 1000);

    const feedbackRecord = {
      id: `fb-${Date.now()}`,
      timestamp: new Date().toISOString(),
      targetRecipientEmail: 'coin62.com@gmail.com',
      targetName,
      targetUrl,
      senderName,
      senderContact,
      suggestedAddress,
      suggestedPhone,
      feedbackContent,
      ip
    };

    // 1. Lưu vào tệp log dữ liệu data/data-inaccuracies-reports.json
    try {
      const logDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
      const logFile = path.join(logDir, 'data-inaccuracies-reports.json');
      let currentLogs = [];
      if (fs.existsSync(logFile)) {
        try {
          currentLogs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
        } catch (_) {
          currentLogs = [];
        }
      }
      currentLogs.unshift(feedbackRecord);
      fs.writeFileSync(logFile, JSON.stringify(currentLogs.slice(0, 200), null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Could not write to local JSON log:', fsErr.message);
    }

    // 2. Lưu vào CSDL contacts nếu bảng tồn tại
    try {
      await db.query(
        'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)',
        [
          `[BÁO LỖI ĐỊA CHỈ] ${targetName}`.slice(0, 100),
          senderContact.slice(0, 50),
          'coin62.com@gmail.com',
          `URL: ${targetUrl}\nNgười gửi: ${senderName}\nLiên hệ: ${senderContact}\nĐịa chỉ đề xuất: ${suggestedAddress}\nSĐT đề xuất: ${suggestedPhone}\nNội dung: ${feedbackContent}`
        ]
      );
    } catch (dbErr) {
      console.warn('Could not insert to DB contacts:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Thông tin báo lỗi đã được tiếp nhận thành công. Ban quản trị (coin62.com@gmail.com) sẽ đối soát và cập nhật trong thời gian sớm nhất!',
      data: feedbackRecord
    });
  } catch (error) {
    console.error('Error in data feedback API:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tiếp nhận thông tin báo lỗi.' },
      { status: 500 }
    );
  }
}
