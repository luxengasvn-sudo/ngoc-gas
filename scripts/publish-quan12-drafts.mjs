#!/usr/bin/env node

/**
 * ĐỒNG BỘ 11 BÀI VIẾT QUẬN 12 Ở CHẾ ĐỘ BẢN NHÁP (is_published = 0)
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

import { article53 } from './deep-articles/art53-an-phu-dong.mjs';
import { article54 } from './deep-articles/art54-thanh-loc.mjs';
import { article55 } from './deep-articles/art55-thanh-xuan.mjs';
import { article56 } from './deep-articles/art56-hiep-thanh.mjs';
import { article57 } from './deep-articles/art57-tan-chanh-hiep.mjs';
import { article58 } from './deep-articles/art58-tan-thoi-hiep.mjs';
import { article59 } from './deep-articles/art59-thoi-an.mjs';
import { article60 } from './deep-articles/art60-trung-my-tay.mjs';
import { article61 } from './deep-articles/art61-tan-hung-thuan.mjs';
import { article62 } from './deep-articles/art62-dong-hung-thuan.mjs';
import { article63 } from './deep-articles/art63-tan-thoi-nhat.mjs';

const articles = [
  article53,
  article54,
  article55,
  article56,
  article57,
  article58,
  article59,
  article60,
  article61,
  article62,
  article63
];

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('=================================================================');
  console.log('🚀 [DRAFT PUBLISHER] BẮT ĐẦU NẠP 11 BÀI VIẾT BẢN NHÁP QUẬN 12');
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

  console.log('\n🔍 KIỂM CHỨNG LẠI DỮ LIỆU BẢN NHÁP TRONG MYSQL (ID 53 đến 63):');
  const [rows] = await conn.query('SELECT id, title, slug, is_published FROM posts WHERE id >= 53 AND id <= 63 ORDER BY id ASC');
  console.table(rows);

  const [totalCount] = await conn.query('SELECT is_published, COUNT(*) as count FROM posts GROUP BY is_published');
  console.log('\n📊 TỔNG HỢP TRẠNG THÁI TOÀN BỘ BÀI VIẾT TRÊN HỆ THỐNG:');
  console.table(totalCount);

  await conn.end();
  console.log('\n🎉 [HOÀN TẤT] Cả 11 bài viết Quận 12 đã nằm an toàn trong CSDL ở chế độ BẢN NHÁP (Draft)!');
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
