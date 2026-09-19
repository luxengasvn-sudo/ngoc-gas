#!/usr/bin/env node

/**
 * ĐỒNG BỘ 12 BÀI VIẾT CỤM 2 QUẬN 9 CŨ Ở CHẾ ĐỘ BẢN NHÁP (is_published = 0)
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

import { article31 } from './deep-articles/art31-hiep-phu.mjs';
import { article32 } from './deep-articles/art32-tang-nhon-phu-a.mjs';
import { article33 } from './deep-articles/art33-tang-nhon-phu-b.mjs';
import { article34 } from './deep-articles/art34-phuoc-long-a.mjs';
import { article35 } from './deep-articles/art35-phuoc-long-b.mjs';
import { article36 } from './deep-articles/art36-phuoc-binh.mjs';
import { article37 } from './deep-articles/art37-tan-phu-thu-duc.mjs';
import { article38 } from './deep-articles/art38-long-thanh-my.mjs';
import { article39 } from './deep-articles/art39-long-binh.mjs';
import { article40 } from './deep-articles/art40-long-truong.mjs';
import { article41 } from './deep-articles/art41-truong-thanh.mjs';
import { article42 } from './deep-articles/art42-long-phuoc.mjs';

const articles = [
  article31,
  article32,
  article33,
  article34,
  article35,
  article36,
  article37,
  article38,
  article39,
  article40,
  article41,
  article42
];

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('=================================================================');
  console.log('🚀 [DRAFT PUBLISHER] BẮT ĐẦU NẠP 12 BÀI VIẾT BẢN NHÁP CỤM 2 QUẬN 9 CŨ');
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

  console.log('\n🔍 KIỂM CHỨNG LẠI DỮ LIỆU BẢN NHÁP TRONG MYSQL (ID 31 đến 42):');
  const [rows] = await conn.query('SELECT id, title, slug, is_published FROM posts WHERE id >= 31 AND id <= 42 ORDER BY id ASC');
  console.table(rows);

  await conn.end();
  console.log('\n🎉 [HOÀN TẤT] Cả 12 bài viết Cụm 2 đã nằm an toàn trong CSDL ở chế độ BẢN NHÁP (Draft)!');
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
