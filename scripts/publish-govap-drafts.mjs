#!/usr/bin/env node

/**
 * ĐỒNG BỘ 16 BÀI VIẾT QUẬN GÒ VẤP Ở CHẾ ĐỘ BẢN NHÁP (is_published = 0)
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

import { article64 } from './deep-articles/art64-phuong-1-go-vap.mjs';
import { article65 } from './deep-articles/art65-phuong-3-go-vap.mjs';
import { article66 } from './deep-articles/art66-phuong-4-go-vap.mjs';
import { article67 } from './deep-articles/art67-phuong-5-go-vap.mjs';
import { article68 } from './deep-articles/art68-phuong-6-go-vap.mjs';
import { article69 } from './deep-articles/art69-phuong-7-go-vap.mjs';
import { article70 } from './deep-articles/art70-phuong-8-go-vap.mjs';
import { article71 } from './deep-articles/art71-phuong-9-go-vap.mjs';
import { article72 } from './deep-articles/art72-phuong-10-go-vap.mjs';
import { article73 } from './deep-articles/art73-phuong-11-go-vap.mjs';
import { article74 } from './deep-articles/art74-phuong-12-go-vap.mjs';
import { article75 } from './deep-articles/art75-phuong-13-go-vap.mjs';
import { article76 } from './deep-articles/art76-phuong-14-go-vap.mjs';
import { article77 } from './deep-articles/art77-phuong-15-go-vap.mjs';
import { article78 } from './deep-articles/art78-phuong-16-go-vap.mjs';
import { article79 } from './deep-articles/art79-phuong-17-go-vap.mjs';

const articles = [
  article64,
  article65,
  article66,
  article67,
  article68,
  article69,
  article70,
  article71,
  article72,
  article73,
  article74,
  article75,
  article76,
  article77,
  article78,
  article79
];

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('=================================================================');
  console.log('🚀 [DRAFT PUBLISHER] BẮT ĐẦU NẠP 16 BÀI VIẾT BẢN NHÁP QUẬN GÒ VẤP');
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

  console.log('\n🔍 KIỂM CHỨNG LẠI DỮ LIỆU BẢN NHÁP TRONG MYSQL (ID 64 đến 79):');
  const [rows] = await conn.query('SELECT id, title, slug, is_published FROM posts WHERE id >= 64 AND id <= 79 ORDER BY id ASC');
  console.table(rows);

  console.log('\n📊 THỐNG KÊ TỔNG THỂ BẢNG POSTS:');
  const [countRows] = await conn.query(`
    SELECT 
      COUNT(*) as total_posts,
      SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published_posts,
      SUM(CASE WHEN is_published = 0 THEN 1 ELSE 0 END) as draft_posts
    FROM posts
  `);
  console.table(countRows);

  await conn.end();
  console.log('\n🎉 [HOÀN TẤT] TẤT CẢ 16 BÀI VIẾT QUẬN GÒ VẤP ĐÃ ĐƯỢC LƯU AN TOÀN Ở CHẾ ĐỘ BẢN NHÁP!');
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
