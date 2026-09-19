#!/usr/bin/env node

/**
 * ĐỒNG BỘ TOÀN DIỆN 10 BÀI VIẾT CHUYÊN SÂU ĐỘC BẢN LÊN CSDL MYSQL
 */

import fs from 'fs';
import path from 'path';

import { article11 } from './deep-articles/art11-an-binh.mjs';
import { article12 } from './deep-articles/art12-dong-hoa.mjs';
import { article13 } from './deep-articles/art13-tan-binh.mjs';
import { article14 } from './deep-articles/art14-binh-an.mjs';
import { article15 } from './deep-articles/art15-binh-thang.mjs';
import { article16 } from './deep-articles/art16-an-phu.mjs';
import { article17 } from './deep-articles/art17-thuan-giao.mjs';
import { article18 } from './deep-articles/art18-binh-hoa.mjs';
import { article19 } from './deep-articles/art19-linh-xuan.mjs';
import { article20 } from './deep-articles/art20-linh-trung.mjs';

const allArticles = [
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20
];

// Nạp .env.local
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

const target = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
const API_KEY = process.env.AI_PUBLISHER_API_KEY;

if (!API_KEY) {
  console.error('❌ Thiếu AI_PUBLISHER_API_KEY trong .env.local');
  process.exit(1);
}

async function main() {
  console.log('=================================================================');
  console.log('🚀 [MASTER DEEP PUBLISHER] BẮT ĐẦU CẬP NHẬT 10 BÀI VIẾT CHUYÊN SÂU');
  console.log(`🌐 Server: ${target}`);
  console.log('=================================================================\n');

  // 1. Kiểm tra số từ từng bài
  console.log('📊 ĐO ĐẠC ĐỘ DÀI TỪNG BÀI VIẾT TRƯỚC KHI ĐẨY LÊN SERVER:');
  for (const art of allArticles) {
    const text = art.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(w => w.length > 0).length;
    console.log(`- [ID ${art.id}] ${art.slug}: ${words} từ`);
  }

  console.log('\n🚀 BẮT ĐẦU CẬP NHẬT QUA PUT /api/posts/[id]...');
  for (let i = 0; i < allArticles.length; i++) {
    const art = allArticles[i];
    console.log(`\n[${i + 1}/10] Đang cập nhật ID ${art.id}: "${art.title}"...`);

    const payload = {
      title: art.title,
      slug: art.slug,
      summary: art.summary,
      excerpt: art.summary,
      content: art.content,
      image_url: art.imageUrl,
      is_published: 1
    };

    try {
      const res = await fetch(`${target}/api/posts/${art.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        console.log(`   ✅ Thành công! Link: ${target}/tin-tuc/${art.slug}`);
      } else {
        console.warn(`   ⚠️ Thất bại: ${json.message || res.statusText}`);
      }
    } catch (err) {
      console.error(`   ❌ Lỗi kết nối: ${err.message}`);
    }
  }

  // 2. Xóa Cache toàn diện
  console.log('\n⚡ Đang làm mới bộ nhớ đệm (Cache Revalidation) toàn hệ thống...');
  try {
    const purgeRes = await fetch(`${target}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ category: 'all' })
    });
    const purgeJson = await purgeRes.json();
    console.log(`✅ Kết quả xóa cache:`, purgeJson.message);
  } catch (err) {
    console.warn('⚠️ Lỗi xóa cache:', err.message);
  }

  console.log('\n=================================================================');
  console.log('🎉 ĐÃ HOÀN TẤT CẬP NHẬT 10 BÀI VIẾT CHUYÊN SÂU ĐỘC BẢN 100%!');
  console.log('=================================================================\n');
}

main().catch(console.error);
