import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { checkRateLimit, recordRateLimitAttempt, getClientIp } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách liên hệ' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    // Chống bot spam liên hệ: tối đa 5 lần gửi trong 10 phút từ cùng 1 IP
    const rateCheck = checkRateLimit(ip, 'contact_submit', 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, message: 'Bạn đã gửi liên hệ quá nhiều lần. Vui lòng chờ vài phút trước khi gửi lại.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const name = String(body.name || '').trim().slice(0, 100);
    const phone = String(body.phone || '').trim().slice(0, 50);
    const email = String(body.email || '').trim().slice(0, 100);
    const message = String(body.message || '').trim().slice(0, 2000);

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Họ tên và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    recordRateLimitAttempt(ip, 'contact_submit', 10 * 60 * 1000);

    const [result] = await db.query(
      'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)',
      [name, phone, email || '', message || '']
    );

    return NextResponse.json({
      success: true,
      message: 'Gửi liên hệ thành công',
      data: { id: result?.insertId }
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi gửi liên hệ' },
      { status: 500 }
    );
  }
}
