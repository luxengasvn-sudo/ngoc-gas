#!/usr/bin/env node

/**
 * ĐỒNG BỘ 20 BÀI VIẾT QUẬN BÌNH THẠNH Ở CHẾ ĐỘ BẢN NHÁP (is_published = 0)
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

import { article80 } from './deep-articles/art80-phuong-1-binh-thanh.mjs';
import { article81 } from './deep-articles/art81-phuong-2-binh-thanh.mjs';
import { article82 } from './deep-articles/art82-phuong-3-binh-thanh.mjs';
import { article83 } from './deep-articles/art83-phuong-5-binh-thanh.mjs';
import { article84 } from './deep-articles/art84-phuong-6-binh-thanh.mjs';
import { article85 } from './deep-articles/art85-phuong-7-binh-thanh.mjs';
import { article86 } from './deep-articles/art86-phuong-11-binh-thanh.mjs';
import { article87 } from './deep-articles/art87-phuong-12-binh-thanh.mjs';
import { article88 } from './deep-articles/art88-phuong-13-binh-thanh.mjs';
import { article89 } from './deep-articles/art89-phuong-14-binh-thanh.mjs';
import { article90 } from './deep-articles/art90-phuong-15-binh-thanh.mjs';
import { article91 } from './deep-articles/art91-phuong-17-binh-thanh.mjs';
import { article92 } from './deep-articles/art92-phuong-19-binh-thanh.mjs';
import { article93 } from './deep-articles/art93-phuong-21-binh-thanh.mjs';
import { article94 } from './deep-articles/art94-phuong-22-binh-thanh.mjs';
import { article95 } from './deep-articles/art95-phuong-24-binh-thanh.mjs';
import { article96 } from './deep-articles/art96-phuong-25-binh-thanh.mjs';
import { article97 } from './deep-articles/art97-phuong-26-binh-thanh.mjs';
import { article98 } from './deep-articles/art98-phuong-27-binh-thanh.mjs';
import { article99 } from './deep-articles/art99-phuong-28-binh-thanh.mjs';

const articles = [
  article80,
  article81,
  article82,
  article83,
  article84,
  article85,
  article86,
  article87,
  article88,
  article89,
  article90,
  article91,
  article92,
  article93,
  article94,
  article95,
  article96,
  article97,
  article98,
  article99
];

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('=================================================================');
  console.log('🚀 [DRAFT PUBLISHER] BẮT ĐẦU NẠP 20 BÀI VIẾT BẢN NHÁP QUẬN BÌNH THẠNH');
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

  console.log('\n🔍 KIỂM CHỨNG LẠI DỮ LIỆU BẢN NHÁP TRONG MYSQL (ID 80 đến 99):');
  const [rows] = await conn.query('SELECT id, title, slug, is_published FROM posts WHERE id >= 80 AND id <= 99 ORDER BY id ASC');
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
  console.log('\n🎉 [HOÀN TẤT] TẤT CẢ 20 BÀI VIẾT QUẬN BÌNH THẠNH ĐÃ ĐƯỢC LƯU AN TOÀN Ở CHẾ ĐỘ BẢN NHÁP!');
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
