#!/usr/bin/env node

/**
 * ĐỒNG BỘ 10 BÀI VIẾT CỤM 3 QUẬN 2 CŨ Ở CHẾ ĐỘ BẢN NHÁP (is_published = 0)
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

import { article43 } from './deep-articles/art43-thao-dien.mjs';
import { article44 } from './deep-articles/art44-an-phu-thu-duc.mjs';
import { article45 } from './deep-articles/art45-an-khanh.mjs';
import { article46 } from './deep-articles/art46-thu-thiem.mjs';
import { article47 } from './deep-articles/art47-an-loi-dong.mjs';
import { article48 } from './deep-articles/art48-thanh-my-loi.mjs';
import { article49 } from './deep-articles/art49-binh-trung-tay.mjs';
import { article50 } from './deep-articles/art50-binh-trung-dong.mjs';
import { article51 } from './deep-articles/art51-cat-lai.mjs';
import { article52 } from './deep-articles/art52-phu-huu.mjs';

const articles = [
  article43,
  article44,
  article45,
  article46,
  article47,
  article48,
  article49,
  article50,
  article51,
  article52
];

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('=================================================================');
  console.log('🚀 [DRAFT PUBLISHER] BẮT ĐẦU NẠP 10 BÀI VIẾT BẢN NHÁP CỤM 3 QUẬN 2 CŨ');
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

  console.log('\n🔍 KIỂM CHỨNG LẠI DỮ LIỆU BẢN NHÁP TRONG MYSQL (ID 43 đến 52):');
  const [rows] = await conn.query('SELECT id, title, slug, is_published FROM posts WHERE id >= 43 AND id <= 52 ORDER BY id ASC');
  console.table(rows);

  // Tổng hợp toàn bộ 34 phường TP. Thủ Đức
  const [totalCount] = await conn.query('SELECT is_published, COUNT(*) as count FROM posts GROUP BY is_published');
  console.log('\n📊 TỔNG HỢP TRẠNG THÁI TOÀN BỘ BÀI VIẾT TRÊN HỆ THỐNG:');
  console.table(totalCount);

  await conn.end();
  console.log('\n🎉 [HOÀN TẤT] Cả 10 bài viết Cụm 3 đã nằm an toàn trong CSDL ở chế độ BẢN NHÁP (Draft)!');
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
