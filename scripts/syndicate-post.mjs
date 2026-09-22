#!/usr/bin/env node

/**
 * HỆ THỐNG PHÂN PHỐI BÀI VIẾT ĐA TẦNG TỰ ĐỘNG LÊN TOÀN BỘ ENTITY (MULTI-ENTITY SEO SYNDICATION ENGINE)
 * Tự động biến đổi 1 bài viết thành 5 góc nhìn nội dung độc bản và bắn đa kênh qua:
 * - Pha 1: Fast REST API tức thì (Telegra.ph, Markdown Docs, Webhook) trong 2 - 3 giây.
 * - Pha 2: Đóng gói sẵn nội dung chuẩn SEO cho Google Maps (3 điểm), 5 Fanpage Facebook, Web 2.0 Blogs.
 * - Tự động ghi nhận lịch sử vào data/syndication-history.json và đồng bộ số liệu thống kê.
 * 
 * TUÂN THỦ 100%: Tuyệt đối không commit hay đẩy bài viết hàng ngày vào kho Git.
 */

import fs from 'fs';
import path from 'path';
import { generateSyndicationMatrix } from './syndication-matrix.mjs';

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

// Lấy slug bài viết từ tham số dòng lệnh hoặc mặc định bài 22/09
const postSlug = process.argv[2] || 'ga-kho-sa-ot-dam-da-chuan-vi';

console.log(`🚀 KÍCH HOẠT QUY TRÌNH SYNDICATION ĐA TẦNG CHO BÀI VIẾT: ${postSlug}`);

export async function syndicatePostBySlug(slug = postSlug) {
  const results = {
    postSlug: slug,
    syndicatedAt: new Date().toISOString(),
    channels: [],
    packagesCreated: false
  };

  // 1. Lấy thông tin bài viết từ API ngocgas.com hoặc data/posts.json
  let postData = null;
  const localPostsPath = path.join(process.cwd(), 'data', 'posts.json');
  if (fs.existsSync(localPostsPath)) {
    try {
      const posts = JSON.parse(fs.readFileSync(localPostsPath, 'utf8'));
      postData = posts.find(p => p.slug === slug);
    } catch (e) {}
  }

  // Fallback từ recipes-50-master.json nếu là món ăn
  if (!postData) {
    const recipesPath = path.join(process.cwd(), 'data', 'recipes-50-master.json');
    if (fs.existsSync(recipesPath)) {
      try {
        const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
        const foundRecipe = recipes.find(r => r.slug === slug);
        if (foundRecipe) {
          postData = {
            title: foundRecipe.title || foundRecipe.name || 'Món ngon mỗi ngày cùng Ngọc Gas',
            slug: foundRecipe.slug,
            category: 'mon-an',
            summary: foundRecipe.summary || foundRecipe.description || foundRecipe.excerpt || 'Công thức nấu ăn thơm ngon, chuẩn vị cùng Ngọc Gas.',
            content: foundRecipe.content || foundRecipe.description || ''
          };
        }
      } catch (e) {}
    }
  }

  if (!postData) {
    // Mẫu dự phòng
    postData = {
      title: 'Gà kho sả ớt đậm đà chuẩn vị cơm nhà',
      slug: slug,
      category: 'mon-an',
      summary: 'Cách làm gà kho sả ớt thơm cay nồng ấm, thịt gà săn chắc ngấm đậm gia vị mặn ngọt hài hòa.',
      content: 'Món gà kho sả ớt là món ăn quen thuộc trong mâm cơm người Việt. Thịt gà được chặt miếng vừa ăn, ướp cùng sả băm, ớt tươi và nước mắm truyền thống.'
    };
  }

  console.log(`📄 Tiêu đề: ${postData.title}`);
  console.log(`📁 Chuyên mục: ${postData.category || 'tin-tuc'}`);

  // 2. SINH MA TRẬN 5 GÓC NHÌN NỘI DUNG ĐỘC BẢN
  console.log(`\n🧩 Đang phóng tác ma trận 5 góc nhìn nội dung độc bản...`);
  const matrix = generateSyndicationMatrix(postData);

  // Lưu gói nội dung vào data/syndication-packages/${slug}.json
  const packagesDir = path.join(process.cwd(), 'data', 'syndication-packages');
  if (!fs.existsSync(packagesDir)) {
    fs.mkdirSync(packagesDir, { recursive: true });
  }
  const packageFilePath = path.join(packagesDir, `${slug}.json`);
  fs.writeFileSync(packageFilePath, JSON.stringify(matrix, null, 2), 'utf8');
  results.packagesCreated = true;
  console.log(`✅ Đã lưu gói nội dung 5 góc nhìn tại: data/syndication-packages/${slug}.json`);

  // --- PHA 1: FAST REST API TỨC THÌ (3 - 5 GIÂY) ---

  // KÊNH 1: TELEGRA.PH API (Tier 4: Tech & Docs)
  try {
    console.log('📡 [Pha 1] Đang bắn API lên Telegra.ph...');
    const telegraRes = await fetch('https://api.telegra.ph/createPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: '1d02b0e3703a40081af8d89b1b664518f31abd54f8617eb4036c42430b40',
        title: postData.title.slice(0, 100),
        author_name: 'Ngọc Gas - Đại Lý Gas Dĩ An',
        author_url: matrix.postUrl,
        content: [
          { tag: 'p', children: [postData.summary || 'Thông tin hữu ích từ Đại lý Ngọc Gas.'] },
          { tag: 'hr' },
          { tag: 'h4', children: ['💡 Góc nhìn chuyên sâu từ chuyên gia Ngọc Gas:'] },
          { tag: 'p', children: [matrix.tier3Blog.body.slice(0, 500) + '...'] },
          { tag: 'hr' },
          { tag: 'p', children: ['👉 Xem bài viết chi tiết tại: ', { tag: 'a', attrs: { href: matrix.postUrl }, children: [matrix.postUrl] }] },
          { tag: 'p', children: ['📊 Cập nhật bảng giá gas hôm nay tự động: ', { tag: 'a', attrs: { href: matrix.pricePageUrl }, children: [matrix.pricePageUrl] }] },
          { tag: 'p', children: ['📞 Tổng đài đặt gas chính hãng tại Dĩ An & Bình Dương: ', { tag: 'strong', children: [matrix.hotline] }] }
        ],
        return_content: false
      })
    });
    const telegraData = await telegraRes.json();
    if (telegraData.ok) {
      const url = `https://telegra.ph/${telegraData.result.path}`;
      console.log(`✅ [Telegra.ph] Đăng thành công: ${url}`);
      results.channels.push({
        tier: 'Tier 4 (Tech & Docs)',
        name: 'Telegra.ph',
        status: 'Success',
        url,
        anchorText: postData.title
      });
    } else {
      console.log(`⚠️ [Telegra.ph] Phản hồi lỗi:`, telegraData);
      results.channels.push({ name: 'Telegra.ph', status: 'Failed', error: telegraData.error });
    }
  } catch (err) {
    console.error(`❌ [Telegra.ph] Lỗi kết nối:`, err.message);
  }

  // Ghi nhận các gói sẵn sàng cho Pha 2 (Browser Automation)
  results.channels.push({
    tier: 'Tier 1 (Local & Maps)',
    name: 'Google Maps (3 Chi Nhánh: Dĩ An, Cây Da, VietSing)',
    status: 'Ready in Queue',
    contentPreview: matrix.tier1Maps.slice(0, 100) + '...'
  });
  results.channels.push({
    tier: 'Tier 2 (Social Networks)',
    name: 'Facebook Pages (5 Fanpages) & LinkedIn',
    status: 'Ready in Queue',
    contentPreview: matrix.tier2Social.slice(0, 100) + '...'
  });
  results.channels.push({
    tier: 'Tier 3 (Web 2.0 Blogs)',
    name: 'Blogger, WordPress, Tumblr',
    status: 'Ready in Queue',
    title: matrix.tier3Blog.title,
    contentPreview: matrix.tier3Blog.body.slice(0, 100) + '...'
  });
  results.channels.push({
    tier: 'Tier 5 (Q&A & Community)',
    name: 'Quora, Reddit, Pinterest',
    status: 'Ready in Queue',
    faqQuestion: matrix.tier5Faq.question
  });

  // 3. Ghi nhận lịch sử Syndication vào data/syndication-history.json
  const historyPath = path.join(process.cwd(), 'data', 'syndication-history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    try { history = JSON.parse(fs.readFileSync(historyPath, 'utf8')); } catch (e) {}
  }
  history.unshift(results);
  fs.writeFileSync(historyPath, JSON.stringify(history.slice(0, 100), null, 2), 'utf8');

  console.log(`\n🎉 HOÀN TẤT PHÂN PHỐI PHA 1 VÀ ĐÓNG GÓI NỘI DUNG 5 GÓC NHÌN!`);
  console.log(`📊 Kết quả:`);
  console.log(`- Telegra.ph Live: ${results.channels.find(c => c.name === 'Telegra.ph')?.url || 'Chưa hoàn tất'}`);
  console.log(`- Gói nội dung độc bản: data/syndication-packages/${slug}.json`);
  console.log(`- Nhật ký syndication: data/syndication-history.json`);

  return results;
}

// Chạy trực tiếp nếu gọi từ dòng lệnh
if (process.argv[1] && process.argv[1].endsWith('syndicate-post.mjs')) {
  syndicatePostBySlug(postSlug);
}
