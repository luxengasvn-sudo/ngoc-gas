#!/usr/bin/env node

/**
 * ĐỒNG BỘ 10 BÀI VIẾT CỤM 1 BẮC THỦ ĐỨC Ở CHẾ ĐỘ BẢN NHÁP (is_published = 0)
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

import { article21 } from './deep-articles/art21-tam-binh.mjs';
import { article22 } from './deep-articles/art22-tam-phu.mjs';
import { article23 } from './deep-articles/art23-hiep-binh-phuoc.mjs';
import { article24 } from './deep-articles/art24-hiep-binh-chanh.mjs';
import { article25 } from './deep-articles/art25-linh-dong.mjs';
import { article26 } from './deep-articles/art26-linh-tay.mjs';
import { article27 } from './deep-articles/art27-linh-chieu.mjs';
import { article28 } from './deep-articles/art28-binh-chieu.mjs';
import { article29 } from './deep-articles/art29-binh-tho.mjs';
import { article30 } from './deep-articles/art30-truong-tho.mjs';

const articles = [
  article21,
  article22,
  article23,
  article24,
  article25,
  article26,
  article27,
  article28,
  article29,
  article30
];

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('=================================================================');
  console.log('🚀 [DRAFT PUBLISHER] BẮT ĐẦU NẠP 10 BÀI VIẾT BẢN NHÁP CỤM 1 THỦ ĐỨC');
  console.log('📌 Trạng thái kỹ thuật: is_published = 0 (Bản nháp - Draft)');
  console.log('=================================================================\n');

  console.log('📊 ĐO ĐẠC ĐỘ DÀI TỪNG BÀI VIẾT:');
  for (const art of articles) {
    const text = art.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(w => w.length > 0).length;
    console.log(`- [ID ${art.id}] ${art.slug}: ${words} từ | is_published: ${art.is_published}`);
  }

  console.log('\n🔌 Đang kết nối CSDL MySQL...');
  const conn = await mysql.createConnection(DB_URL);

  for (const art of articles) {
    console.log(`\n⏳ Đang lưu bài viết ID ${art.id}: "${art.title}" (is_published = 0)...`);
    const metaTitle = `${art.title} | Ngọc Gas`;
    const metaDesc = art.summary;

    const [res] = await conn.query(
      `INSERT INTO posts (id, title, slug, excerpt, content, image_url, meta_title, meta_description, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         slug = VALUES(slug),
         excerpt = VALUES(excerpt),
         content = VALUES(content),
         image_url = VALUES(image_url),
         meta_title = VALUES(meta_title),
         meta_description = VALUES(meta_description),
         is_published = VALUES(is_published)`,
      [
        art.id,
        art.title,
        art.slug,
        art.summary,
        art.content,
        art.imageUrl,
        metaTitle,
        metaDesc,
        0 // is_published = 0 (Bản nháp)
      ]
    );

    console.log(`✅ Thành công! Insert/Update ID: ${art.id}`);
  }

  console.log('\n🔍 KIỂM CHỨNG LẠI DỮ LIỆU BẢN NHÁP TRONG MYSQL:');
  const [rows] = await conn.query('SELECT id, title, slug, is_published FROM posts WHERE id >= 21 AND id <= 30 ORDER BY id ASC');
  console.table(rows);

  await conn.end();
  console.log('\n🎉 [HOÀN TẤT] Cả 10 bài viết Cụm 1 đã nằm an toàn trong CSDL ở chế độ BẢN NHÁP (Draft)!');
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
