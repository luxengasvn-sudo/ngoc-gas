#!/usr/bin/env node

/**
 * HỆ THỐNG TỰ ĐỘNG HÓA VIẾT VÀ ĐĂNG BÀI ẨM THỰC HÀNG NGÀY (NGỌC GAS DAILY RECIPE CRON)
 * 
 * Tần suất: 8h00 sáng mỗi ngày từ Thứ 2 đến Thứ 7 (4 bài / ngày).
 * Nguồn: Cuốn chiếu 50 món ăn tìm kiếm nhiều nhất theo roadmap.
 * Trí tuệ nhân tạo: Google Gemini 3.6-flash sinh nội dung chuẩn SEO E-E-A-T > 1.500 từ.
 * Tải ảnh: Tự động chuẩn bị ảnh ẩm thực và upload lên https://ngocgas.com/api/upload.
 * Xuất bản: Gọi REST API https://ngocgas.com/api/posts công khai trực tiếp.
 * Báo cáo: Bắn tin nhắn tóm tắt kết quả kèm link bài viết về Telegram cá nhân.
 * Chống trùng lặp: Lưu lịch sử chạy trong data/daily-post-tracker.json.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 1. Nạp biến môi trường từ .env.local
function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx > 0) {
          const key = trimmed.slice(0, idx).trim();
          let val = trimmed.slice(idx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) process.env[key] = val;
        }
      }
    });
  }
}

loadEnv();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AI_PUBLISHER_API_KEY = process.env.AI_PUBLISHER_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ALLOWED_CHAT_ID = process.env.TELEGRAM_ALLOWED_CHAT_ID;
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com').replace(/\/+$/, '');

const MASTER_PATH = path.join(PROJECT_ROOT, 'data', 'recipes-50-master.json');
const TRACKER_PATH = path.join(PROJECT_ROOT, 'data', 'daily-post-tracker.json');

// 2. Gửi thông báo về Telegram
async function sendTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ALLOWED_CHAT_ID) {
    console.warn('⚠️ Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_ALLOWED_CHAT_ID');
    return false;
  }
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_ALLOWED_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: false
      })
    });
    const json = await res.json();
    return json.ok;
  } catch (err) {
    console.error('Lỗi gửi Telegram:', err.message);
    return false;
  }
}

// 3. Chuẩn hóa slug
function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// 4. Sinh bài viết chuẩn SEO E-E-A-T bằng Gemini (Ưu tiên 3.8-flash -> 3.7-flash -> 3.6-flash)
async function generateRecipeContent(dish) {
  if (!GEMINI_API_KEY) throw new Error('Thiếu GEMINI_API_KEY!');

  const prompt = `Bạn là chuyên gia ẩm thực Việt Nam và chuyên viên biên tập nội dung ẩm thực cao cấp cho thương hiệu "Ngọc Gas" (Đại lý phân phối gas chính hãng Sopet Gas One, Luxen Gas, Phoenix Gas tại Bình Dương - Hotline 1900 9396 - Địa chỉ 7 Nguyễn Trung Trực, Dĩ An, Bình Dương).

Nhiệm vụ: Viết bài hướng dẫn công thức nấu món ăn chuẩn SEO E-E-A-T chuyên sâu cho món:
TÊN MÓN: "${dish.name}"
PHÂN NHÓM: "${dish.category}"
ĐẶC TRƯNG & LÝ DO TÌM KIẾM: "${dish.description}"

YÊU CẦU NỘI DUNG:
1. Độ dài: Tối thiểu 1.500 từ, hành văn cuốn hút, gần gũi, chuẩn vị Việt Nam truyền thống.
2. Tiêu đề (SEO Title): Hấp dẫn, chứa từ khóa chính "Cách nấu [Tên món]..." + lời hứa giá trị (ví dụ: bí quyết, mẹo chuẩn vị, đậm đà đưa cơm).
3. Tóm tắt (Summary/Meta Description): 150 - 180 ký tự, tóm tắt điểm đắt giá nhất của món ăn.
4. Cấu trúc bài viết chuẩn HTML (dùng <h2>, <h3>, <p>, <ul>, <li>, <table>, <blockquote>, <strong>):
   - Mở bài (Sapo): Khơi gợi cảm xúc, nguồn gốc món ăn trong mâm cơm gia đình Việt, lý do món ăn này luôn được tìm kiếm nhiều.
   - Phần 1: Bảng chuẩn bị nguyên liệu và định lượng chi tiết cho gia đình 4 người (kèm mẹo chọn mua nguyên liệu tươi sạch, an toàn).
   - Phần 2: Hướng dẫn 4 bước chế biến chi tiết từng phút:
     + Bước 1: Sơ chế và khử sạch mùi hôi/tanh đặc trưng.
     + Bước 2: Kỹ thuật tẩm ướp chuẩn tỷ lệ gia vị vàng.
     + Bước 3: Nấu/Xào/Kho/Luộc - Hướng dẫn chi tiết kỹ thuật căn chỉnh nhiệt độ lửa gas xanh.
     + Bước 4: Hoàn thiện, trang trí và thưởng thức.
   - Phần 3: BÍ QUYẾT LỬA GAS AN TOÀN & TIẾT KIỆM TỪ NGỌC GAS: Nhấn mạnh tầm quan trọng của ngọn lửa gas xanh tinh khiết (không làm đen đáy nồi, nhiệt trị cao giúp món ăn chín đều giữ trọn dinh dưỡng, tiết kiệm gas tối đa). Nhắc đến bình gas Sopet Gas One, Luxen Gas, Phoenix Gas và hotline gọi gas nhanh: 1900 9396 (Đại lý Ngọc Gas, 7 Nguyễn Trung Trực, Dĩ An, Bình Dương).
   - Phần 4: Bảng thành phần dinh dưỡng và giá trị sức khỏe của món ăn (Calo, Protein, Chất béo, Vitamin).
   - Phần 5: Mẹo bảo quản và hâm nóng món ăn cho hộp cơm văn phòng hoặc dùng lại hôm sau mà không bị khô/thiu.
   - Phần 6: Giải đáp thắc mắc thường gặp (FAQ: 3 câu hỏi thực tế người nấu hay băn khoăn).

ĐỊNH DẠNG TRẢ VỀ:
BẮT BUỘC trả về duy nhất một chuỗi JSON hợp lệ (không chèn markdown backticks \`\`\`json):
{
  "title": "Tiêu đề chuẩn SEO",
  "slug": "cach-nau-ten-mon-chuan-vi",
  "summary": "Đoạn tóm tắt meta description 160 ký tự",
  "contentHtml": "Nội dung bài viết hoàn chỉnh bằng HTML..."
}`;

  const preferredModels = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash'];
  let lastError = null;

  for (const model of preferredModels) {
    try {
      console.log(`   🧠 Thử gọi model AI: ${model}...`);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7
          }
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`   ⚠️ Model ${model} tạm thời trả về (${res.status}): ${errText.slice(0, 100)}...`);
        lastError = new Error(`Model ${model} error (${res.status}): ${errText}`);
        continue; // Thử model tiếp theo
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        lastError = new Error(`Không nhận được text từ ${model}`);
        continue;
      }

      try {
        const parsed = JSON.parse(rawText);
        console.log(`   ✅ Đã sinh nội dung thành công bằng: ${model}`);
        return parsed;
      } catch (e) {
        const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(clean);
        console.log(`   ✅ Đã sinh nội dung thành công bằng: ${model}`);
        return parsed;
      }
    } catch (err) {
      lastError = err;
      console.warn(`   ⚠️ Lỗi khi gọi ${model}:`, err.message);
    }
  }

  throw lastError || new Error('Tất cả các model Gemini đều không phản hồi');
}

// 5. Tải ảnh món ăn và upload lên server live
async function uploadDishImage(dish) {
  // Kho ảnh ẩm thực chất lượng cao theo phân nhóm
  const photoLibrary = {
    'Thịt heo': [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&q=80'
    ],
    'Thịt gà': [
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=80',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200&q=80',
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=1200&q=80'
    ],
    'Thịt bò': [
      'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80'
    ],
    'Thủy hải sản': [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=80',
      'https://images.unsplash.com/photo-1535400255456-984241443b29?w=1200&q=80',
      'https://images.unsplash.com/photo-1559737558-2451399c4398?w=1200&q=80'
    ],
    'Trứng & Đậu': [
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80'
    ],
    'Món canh': [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80',
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=1200&q=80',
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=1200&q=80'
    ],
    'Rau củ xào': [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80'
    ],
    'Rau luộc': [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80'
    ],
    'Cơm & Món đơn': [
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80'
    ],
    'Món Eat Clean': [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80'
    ]
  };

  const categoryPhotos = photoLibrary[dish.category] || photoLibrary['Thịt heo'];
  const photoUrl = categoryPhotos[dish.stt % categoryPhotos.length];

  try {
    const res = await fetch(photoUrl);
    if (!res.ok) throw new Error(`Lỗi tải ảnh nguồn (${res.status})`);
    const buffer = Buffer.from(await res.arrayBuffer());

    const fileName = `dish_${dish.stt}_${Date.now()}.jpg`;
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    formData.append('file', blob, fileName);

    const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: { 'x-api-key': AI_PUBLISHER_API_KEY },
      body: formData
    });

    const uploadJson = await uploadRes.json();
    if (uploadJson.success && uploadJson.url) {
      return uploadJson.url;
    }
  } catch (err) {
    console.warn(`⚠️ Lỗi upload ảnh cho món "${dish.name}":`, err.message);
  }
  return '/images/recipe-default.jpg';
}

// 6. Xuất bản bài viết qua API
async function publishPost(payload) {
  const postRes = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_PUBLISHER_API_KEY
    },
    body: JSON.stringify({
      title: payload.title,
      slug: payload.slug,
      summary: payload.summary,
      excerpt: payload.summary,
      content: payload.contentHtml,
      image_url: payload.imageUrl,
      category: 'mon-an',
      is_published: 1
    })
  });

  const postJson = await postRes.json();
  if (!postRes.ok || !postJson.success) {
    throw new Error(`Đăng bài thất bại: ${postJson.message || postRes.statusText}`);
  }

  // Revalidate cache
  try {
    await fetch(`${BASE_URL}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AI_PUBLISHER_API_KEY
      },
      body: JSON.stringify({ category: 'posts' })
    });
  } catch (e) {}

  return postJson.data;
}

// 7. Hàm điều phối chính (Orchestrator)
export async function runDailyRecipes({ force = false, limit = 4, dryRun = false } = {}) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Mon, ..., 6 = Sat
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  console.log(`\n======================================================`);
  console.log(`🍲 [NGỌC GAS] BẮT ĐẦU QUY TRÌNH ĐĂNG 4 BÀI MÓN ĂN TỰ ĐỘNG`);
  console.log(`📅 Ngày: ${dateFormatted} | Giờ: ${now.toLocaleTimeString('vi-VN')}`);
  console.log(`======================================================\n`);

  // Kiểm tra ngày nghỉ (Chủ nhật không chạy trừ khi có cờ --force)
  if (dayOfWeek === 0 && !force) {
    console.log(`⏸️ Hôm nay là Chủ Nhật — Lịch tự động nghỉ ngơi theo cấu hình (T2 - T7).`);
    return { status: 'SKIPPED_SUNDAY' };
  }

  // Kiểm tra tracker chống trùng lặp
  let tracker = { last_run_date: null, runs: [] };
  if (fs.existsSync(TRACKER_PATH)) {
    try {
      tracker = JSON.parse(fs.readFileSync(TRACKER_PATH, 'utf8'));
    } catch (e) {}
  }

  if (tracker.last_run_date === todayStr && !force) {
    console.log(`✅ Hôm nay (${todayStr}) đã hoàn thành đăng bài rồi! Hệ thống bỏ qua để tránh trùng lặp.`);
    return { status: 'ALREADY_RAN_TODAY' };
  }

  // Đọc danh sách 50 món ăn
  if (!fs.existsSync(MASTER_PATH)) {
    throw new Error(`Không tìm thấy file lộ trình: ${MASTER_PATH}`);
  }
  const masterDishes = JSON.parse(fs.readFileSync(MASTER_PATH, 'utf8'));

  // Lọc các món chưa hoàn thành
  const pendingDishes = masterDishes.filter(d => d.status !== '🟢 Đã Xuất Bản');
  if (pendingDishes.length === 0) {
    console.log(`🎉 CHÚC MỪNG! Toàn bộ 50 món ăn trong danh sách đã hoàn thành 100%!`);
    await sendTelegram(`🎉 <b>[NGỌC GAS]</b>: Toàn bộ 50 món ăn trong lộ trình nội dung đã hoàn thành xuất bản 100%! Hãy lên lộ trình mới!`);
    return { status: 'ALL_COMPLETED' };
  }

  const selectedDishes = pendingDishes.slice(0, limit);
  console.log(`📋 Đã chọn ${selectedDishes.length} món tiếp theo để xuất bản:`);
  selectedDishes.forEach((d, i) => console.log(`   ${i + 1}. Món #${d.stt}: ${d.name} (${d.category})`));

  if (dryRun) {
    console.log(`\n🧪 [DRY RUN] Chạy kiểm thử thành công, không lưu bài lên website.`);
    return { status: 'DRY_RUN_SUCCESS', dishes: selectedDishes };
  }

  const publishedResults = [];

  for (let i = 0; i < selectedDishes.length; i++) {
    const dish = selectedDishes[i];
    console.log(`\n------------------------------------------------------`);
    console.log(`[${i + 1}/${selectedDishes.length}] Đang xử lý Món #${dish.stt}: "${dish.name}"...`);

    try {
      // A. Sinh nội dung chuẩn SEO E-E-A-T
      console.log(`   🧠 Gọi Gemini 3.6-flash biên soạn nội dung chuyên sâu...`);
      const generated = await generateRecipeContent(dish);
      console.log(`   ✅ Tiêu đề: "${generated.title}"`);

      // B. Chuẩn bị ảnh và upload
      console.log(`   🖼️ Đang chuẩn bị ảnh món ăn và upload lên server...`);
      const imageUrl = await uploadDishImage(dish);
      console.log(`   ✅ Ảnh đại diện: ${imageUrl}`);

      // C. Xuất bản bài viết
      console.log(`   🚀 Đang xuất bản lên https://ngocgas.com/api/posts...`);
      const postData = await publishPost({
        title: generated.title,
        slug: generated.slug || slugify(dish.name),
        summary: generated.summary,
        contentHtml: generated.contentHtml,
        imageUrl
      });

      const liveUrl = `${BASE_URL}/tin-tuc/${postData.slug || generated.slug}`;
      console.log(`   🎉 Xuất bản thành công! Live: ${liveUrl}`);

      // D. Cập nhật trạng thái trong master file
      dish.status = '🟢 Đã Xuất Bản';
      dish.slug = postData.slug || generated.slug;
      dish.url = liveUrl;
      dish.completed_at = dateFormatted;

      publishedResults.push({
        stt: dish.stt,
        name: dish.name,
        category: dish.category,
        title: generated.title,
        url: liveUrl,
        post_id: postData.id
      });
    } catch (err) {
      console.error(`   ❌ Lỗi khi xử lý Món #${dish.stt}:`, err.message);
    }
  }

  // Lưu lại master JSON cập nhật
  fs.writeFileSync(MASTER_PATH, JSON.stringify(masterDishes, null, 2), 'utf8');

  // Cập nhật tracker
  tracker.last_run_date = todayStr;
  tracker.runs.push({
    date: todayStr,
    run_at: new Date().toISOString(),
    published_count: publishedResults.length,
    articles: publishedResults
  });
  fs.writeFileSync(TRACKER_PATH, JSON.stringify(tracker, null, 2), 'utf8');

  // Đếm tổng số bài đã hoàn thành
  const totalCompleted = masterDishes.filter(d => d.status === '🟢 Đã Xuất Bản').length;
  const percent = Math.round((totalCompleted / masterDishes.length) * 100);

  // Gửi thông báo Telegram
  if (publishedResults.length > 0) {
    let tgMsg = `🍲 <b>[NGỌC GAS - BÁO CÁO ĐĂNG BÀI 8H00 SÁNG]</b>\n`;
    tgMsg += `📅 Ngày: ${dateFormatted}\n`;
    tgMsg += `✅ <b>Đã tự động xuất bản thành công ${publishedResults.length} bài viết món ăn mới:</b>\n\n`;

    publishedResults.forEach((r, idx) => {
      tgMsg += `<b>${idx + 1}. Món #${r.stt}: ${r.name}</b>\n`;
      tgMsg += `📌 <i>${r.title}</i>\n`;
      tgMsg += `🔗 <a href="${r.url}">Xem bài viết trực tiếp</a>\n\n`;
    });

    tgMsg += `📊 <b>Tiến độ lộ trình 50 món:</b> ${totalCompleted}/50 món (${percent}%)\n`;
    tgMsg += `🔥 <i>Bình gas Sopet Gas One & Luxen Gas luôn đồng hành cùng căn bếp Việt!</i>`;

    console.log(`\n📱 Đang gửi thông báo về Telegram...`);
    const tgSent = await sendTelegram(tgMsg);
    if (tgSent) console.log(`✅ Đã gửi báo cáo Telegram thành công!`);
  }

  console.log(`\n======================================================`);
  console.log(`🎉 HOÀN TẤT TOÀN BỘ QUY TRÌNH HÀNG NGÀY!`);
  console.log(`======================================================\n`);

  return {
    status: 'SUCCESS',
    published: publishedResults,
    totalCompleted,
    percent
  };
}

// Chạy trực tiếp qua CLI
if (process.argv[1] && process.argv[1].endsWith('cron-daily-4-recipes.mjs')) {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const dryRun = args.includes('--dry-run');
  const limitArg = args.find(a => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 4;

  runDailyRecipes({ force, limit, dryRun })
    .then(res => {
      if (res.status === 'SKIPPED_SUNDAY' || res.status === 'ALREADY_RAN_TODAY') {
        process.exit(0);
      }
      process.exit(0);
    })
    .catch(err => {
      console.error(`💥 LỖI HỆ THỐNG:`, err);
      process.exit(1);
    });
}
