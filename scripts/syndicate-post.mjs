#!/usr/bin/env node

/**
 * HỆ THỐNG PHÂN PHỐI BÀI VIẾT ĐA KÊNH TỰ ĐỘNG QUA API (CONTENT SYNDICATION ENGINE)
 * Tự động bắn bài viết mới từ CSDL ngocgas.com lên các kênh vệ tinh qua REST API trong vòng 5 - 10 giây
 */

import fs from 'fs';
import path from 'path';

// Load .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  });
}

const TARGET_URL = (process.env.TARGET_URL || 'https://ngocgas.com').replace(/\/+$/, '');
const API_KEY = process.env.AI_PUBLISHER_API_KEY;

// Lấy slug bài viết từ tham số dòng lệnh hoặc mặc định bài 22/09
const postSlug = process.argv[2] || 'bien-dong-thi-truong-gas-ngay-22-09';

console.log(`🚀 KÍCH HOẠT HỆ THỐNG SYNDICATION API CHO BÀI VIẾT: ${postSlug}`);

async function syndicatePost() {
  const results = {
    postSlug,
    syndicatedAt: new Date().toISOString(),
    channels: []
  };

  // 1. Lấy thông tin bài viết từ API ngocgas.com hoặc data/posts.json
  let postData = null;
  const localPostsPath = path.join(process.cwd(), 'data', 'posts.json');
  if (fs.existsSync(localPostsPath)) {
    try {
      const posts = JSON.parse(fs.readFileSync(localPostsPath, 'utf8'));
      postData = posts.find(p => p.slug === postSlug);
    } catch (e) {}
  }

  if (!postData) {
    // Fallback bài viết mặc định 22/09
    postData = {
      title: 'Biến Động Thị Trường Gas Ngày 22/09: Cảnh Giác Nguy Cơ Đứt Gãy Nguồn Cung & Bẫy Gas Giá Rẻ',
      slug: postSlug,
      summary: 'Thị trường gas ngày 22/09 đối mặt nguy cơ đứt gãy nguồn cung quốc tế. Cảnh giác gas sang chiết lậu giá rẻ thiếu ký. Ngọc Gas cam kết chủ động dự trữ kho bãi, đủ cân đủ ký và bảo đảm quyền lợi tối đa cho khách hàng.',
      content: 'Thị trường gas ngày 22/09 ghi nhận biến động mạnh. Ngọc Gas cam kết luôn ổn định nguồn cung và duy trì chính sách trợ giá tốt nhất tại Dĩ An và Bình Dương.'
    };
  }

  const originalArticleUrl = `${TARGET_URL}/tin-tuc/${postData.slug}`;
  const pricePageUrl = `${TARGET_URL}/gia-gas-hom-nay`;

  console.log(`📄 Tiêu đề: ${postData.title}`);
  console.log(`🔗 Link gốc: ${originalArticleUrl}`);

  // --- KÊNH 1: TELEGRA.PH API (Chạy ngầm trong 1 giây) ---
  try {
    console.log('📡 Đang bắn API lên Telegra.ph...');
    const telegraRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: '1d02b0e3703a40081af8d89b1b664518f31abd54f8617eb4036c42430b40',
        title: postData.title.slice(0, 100),
        author_name: 'Ngọc Gas - Đại Lý Gas Dĩ An',
        author_url: originalArticleUrl,
        content: [
          { tag: 'p', children: [postData.summary || 'Thông tin cập nhật mới nhất từ Ngọc Gas.'] },
          { tag: 'hr' },
          { tag: 'p', children: ['👉 Xem bài viết phân tích chi tiết tại: ', { tag: 'a', attrs: { href: originalArticleUrl }, children: [originalArticleUrl] }] },
          { tag: 'p', children: ['🔥 Bảng giá gas hôm nay được cập nhật tự động tại: ', { tag: 'a', attrs: { href: pricePageUrl }, children: [pricePageUrl] }] },
          { tag: 'p', children: ['📞 Hotline đặt gas nhanh 15 phút tại Dĩ An: ', { tag: 'strong', children: ['1900 9396'] }] }
        ],
        return_content: false
      })
    });
    const telegraData = await telegraRes.json();
    if (telegraData.ok) {
      const url = `https://telegra.ph/${telegraData.result.path}`;
      console.log(`✅ [Telegra.ph] Đăng thành công: ${url}`);
      results.channels.push({ name: 'Telegra.ph', status: 'Success', url });
    } else {
      console.log(`⚠️ [Telegra.ph] Phản hồi lỗi:`, telegraData);
      results.channels.push({ name: 'Telegra.ph', status: 'Failed', error: telegraData.error });
    }
  } catch (err) {
    console.error(`❌ [Telegra.ph] Lỗi kết nối:`, err.message);
  }

  // --- KÊNH 2: TELEGRAM CHANNEL BOT API (Nếu có BOT TOKEN) ---
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      console.log('📡 Đang bắn tin nhắn lên Telegram Channel qua Bot API...');
      const teleMsg = `🔥 <b>${postData.title}</b>\n\n${postData.summary}\n\n👉 <a href="${originalArticleUrl}">Xem chi tiết bài viết</a>\n📊 <a href="${pricePageUrl}">Bảng giá gas hôm nay</a>\n📞 Hotline: <b>1900 9396</b>`;
      const teleRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: teleMsg,
          parse_mode: 'HTML',
          disable_web_page_preview: false
        })
      });
      const teleJson = await teleRes.json();
      if (teleJson.ok) {
        console.log(`✅ [Telegram Bot] Đăng thành công vào Channel ID ${process.env.TELEGRAM_CHAT_ID}`);
        results.channels.push({ name: 'Telegram Channel', status: 'Success', messageId: teleJson.result.message_id });
      }
    } catch (err) {
      console.error(`❌ [Telegram Bot] Lỗi kết nối:`, err.message);
    }
  }

  // 3. Ghi nhận lịch sử Syndication
  const historyPath = path.join(process.cwd(), 'data', 'syndication-history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try { history = JSON.parse(fs.readFileSync(historyPath, 'utf8')); } catch (e) {}
  }
  history.unshift(results);
  fs.writeFileSync(historyPath, JSON.stringify(history.slice(0, 50), null, 2), 'utf8');

  console.log(`\n🎉 HOÀN TẤT BẮN API SYNDICATION ĐA KÊNH TRONG 2 GIÂY!`);
  console.log(JSON.stringify(results, null, 2));
}

syndicatePost();
