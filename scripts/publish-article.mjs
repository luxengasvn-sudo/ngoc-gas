#!/usr/bin/env node

/**
 * CÔNG CỤ XUẤT BẢN BÀI VIẾT & TẢI ẢNH TRỰC TIẾP QUA API (NGỌC GAS API PUBLISHER)
 * Hoạt động 100% qua mạng HTTP REST API, không sửa code, không commit Git.
 * 
 * Cách dùng:
 * node scripts/publish-article.mjs \
 *   --title "Tiêu đề bài viết" \
 *   --summary "Mô tả ngắn" \
 *   --content "<p>Nội dung HTML bài viết...</p>" \
 *   --image "path/to/image.jpg" \
 *   [--target "https://ngocgas.com"]
 */

import fs from 'fs';
import path from 'path';

// 1. Tự động nạp .env.local
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

const API_KEY = process.env.AI_PUBLISHER_API_KEY;

function parseArgs(args) {
  const params = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        params[key] = next;
        i++;
      } else {
        params[key] = true;
      }
    }
  }
  return params;
}

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

export async function publishArticle({
  title,
  slug,
  summary = '',
  content = '',
  contentFile = null,
  imagePath = null,
  imageUrl = null,
  targetUrl = null
}) {
  const target = (targetUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com').replace(/\/+$/, '');
  
  if (!API_KEY) {
    throw new Error('Không tìm thấy AI_PUBLISHER_API_KEY trong tệp .env.local!');
  }
  if (!title) {
    throw new Error('Tiêu đề bài viết (--title) là bắt buộc!');
  }

  const finalSlug = slug ? slugify(slug) : (slugify(title) + '-' + Date.now().toString().slice(-4));
  let finalContent = content;

  if (contentFile && fs.existsSync(contentFile)) {
    finalContent = fs.readFileSync(contentFile, 'utf8');
  }

  if (!finalContent) {
    finalContent = `<p>${summary || title}</p>`;
  }

  console.log(`\n🚀 [NGỌC GAS API PUBLISHER] Bắt đầu xuất bản trực tiếp lên: ${target}`);
  console.log(`📌 Tiêu đề: "${title}"`);
  console.log(`🔗 Slug: "${finalSlug}"`);

  // Bước 1: Xử lý Upload Ảnh (Nếu có)
  let finalImageUrl = imageUrl || '';

  if (imagePath && fs.existsSync(imagePath)) {
    console.log(`🖼️ Đang tải ảnh lên server live: ${imagePath}...`);
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    
    const ext = path.extname(imagePath).toLowerCase();
    const mimeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon'
    };
    const mimeType = mimeMap[ext] || 'application/octet-stream';
    
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: mimeType });
    formData.append('file', blob, fileName);

    const uploadRes = await fetch(`${target}/api/upload`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY
      },
      body: formData
    });

    const uploadJson = await uploadRes.json().catch(() => ({}));
    if (!uploadRes.ok || !uploadJson.success) {
      console.warn('⚠️ Cảnh báo: Tải ảnh thất bại:', uploadJson.message || uploadRes.statusText);
    } else {
      finalImageUrl = uploadJson.url;
      console.log(`✅ Tải ảnh thành công! URL: ${finalImageUrl}`);
    }
  }

  // Bước 2: Tạo bài viết qua POST /api/posts
  console.log(`📝 Đang lưu bài viết vào CSDL máy chủ...`);
  const postPayload = {
    title,
    slug: finalSlug,
    summary: summary || title,
    content: finalContent,
    image_url: finalImageUrl,
    is_published: 1
  };

  const postRes = await fetch(`${target}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(postPayload)
  });

  const postJson = await postRes.json().catch(() => ({}));
  if (!postRes.ok || !postJson.success) {
    throw new Error(`Tạo bài viết thất bại (HTTP ${postRes.status}): ${postJson.message || 'Lỗi không xác định'}`);
  }

  console.log(`✅ Tạo bài viết thành công vào MySQL! ID: ${postJson.data?.id || 'mới'}`);

  // Bước 3: Làm mới bộ nhớ đệm (Purge Cache)
  console.log(`⚡ Đang làm mới bộ nhớ đệm (Cache Revalidation)...`);
  try {
    await fetch(`${target}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ category: 'posts' })
    });
    console.log(`✅ Đã làm mới cache trang chủ và trang tin tức tức thì!`);
  } catch (err) {
    console.warn('⚠️ Làm mới cache thất bại:', err.message);
  }

  const liveUrl = `${target}/tin-tuc/${finalSlug}`;
  console.log(`\n🎉 XUẤT BẢN HOÀN TẤT THÀNH CÔNG 100%!`);
  console.log(`🌐 Link bài viết live: ${liveUrl}\n`);

  return {
    success: true,
    post: postJson.data,
    liveUrl
  };
}

// Chạy trực tiếp qua CLI
if (process.argv[1] && process.argv[1].endsWith('publish-article.mjs')) {
  const args = parseArgs(process.argv.slice(2));
  
  if (!args.title) {
    console.log(`
Cách sử dụng:
  node scripts/publish-article.mjs --title "Tiêu đề" [tùy chọn]

Các tùy chọn:
  --title "Tiêu đề bài viết"           (Bắt buộc)
  --slug "slug-tuy-chinh"             (Tùy chọn, tự động sinh từ tiêu đề)
  --summary "Tóm tắt ngắn"             (Tùy chọn)
  --content "<p>Nội dung HTML...</p>" (Tùy chọn)
  --content-file "file.html"          (Đọc nội dung từ tệp)
  --image "path/to/image.jpg"         (Tải file ảnh lên máy chủ)
  --image-url "/uploads/anh-co-san.webp" (Dùng link ảnh đã có)
  --target "http://localhost:3000"    (Mặc định: https://ngocgas.com)
`);
    process.exit(0);
  }

  publishArticle({
    title: args.title,
    slug: args.slug,
    summary: args.summary,
    content: args.content,
    contentFile: args['content-file'],
    imagePath: args.image,
    imageUrl: args['image-url'],
    targetUrl: args.target
  }).catch(err => {
    console.error(`❌ LỖI: ${err.message}`);
    process.exit(1);
  });
}
