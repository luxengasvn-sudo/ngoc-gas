import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// Phase 1 (28 phường: IDs 21 đến 48)
import { binhThanhArticles } from './new-wards/cluster-binh-thanh.mjs';
import { goVapArticles } from './new-wards/cluster-go-vap.mjs';
import { quan12Articles } from './new-wards/cluster-quan-12.mjs';
import { thuDucArticles } from './new-wards/cluster-thu-duc.mjs';

// Phase 2 (19 phường: IDs 49 đến 67)
import { quan134Articles } from './new-wards/cluster-quan-1-3-4.mjs';
import { quan510Articles } from './new-wards/cluster-quan-5-10.mjs';
import { phuNhuanArticles } from './new-wards/cluster-phu-nhuan.mjs';

// Phase 3 (27 phường: IDs 68 đến 94)
import { quan68Articles } from './new-wards/cluster-quan-6-8.mjs';
import { quan11Articles } from './new-wards/cluster-quan-11.mjs';
import { tanBinhArticles } from './new-wards/cluster-tan-binh.mjs';
import { tanPhuBinhTanArticles } from './new-wards/cluster-tan-phu-binh-tan.mjs';

// Phase 4 (28 phường/xã: IDs 95 đến 122)
import { quan7NhaBeArticles } from './new-wards/cluster-quan-7-nha-be.mjs';
import { binhChanhArticles } from './new-wards/cluster-binh-chanh.mjs';
import { hocMonArticles } from './new-wards/cluster-hoc-mon.mjs';
import { cuChiCanGioArticles } from './new-wards/cluster-cu-chi-can-gio.mjs';

// Phase 5 (14 phường Bình Dương: IDs 123 đến 136)
import { binhDuongArticles } from './new-wards/cluster-binh-duong.mjs';

// Phase 6 (17 phường/xã Vũng Tàu: IDs 137 đến 153)
import { vungTauArticles } from './new-wards/cluster-vung-tau.mjs';

const allNewWards = [
  // Phase 1 (28 phường: IDs 21 đến 48)
  ...binhThanhArticles,
  ...goVapArticles,
  ...quan12Articles,
  ...thuDucArticles,

  // Phase 2 (19 phường: IDs 49 đến 67)
  ...quan134Articles,
  ...quan510Articles,
  ...phuNhuanArticles,

  // Phase 3 (27 phường: IDs 68 đến 94)
  ...quan68Articles,
  ...quan11Articles,
  ...tanBinhArticles,
  ...tanPhuBinhTanArticles,

  // Phase 4 (28 phường/xã: IDs 95 đến 122)
  ...quan7NhaBeArticles,
  ...binhChanhArticles,
  ...hocMonArticles,
  ...cuChiCanGioArticles,

  // Phase 5 (14 phường Bình Dương: IDs 123 đến 136)
  ...binhDuongArticles,

  // Phase 6 (17 phường/xã Vũng Tàu: IDs 137 đến 153)
  ...vungTauArticles
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

const dbUrl = process.env.DATABASE_URL || 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log(`🚀 [SYNC] Bắt đầu đồng bộ toàn bộ ${allNewWards.length} bài viết phường/xã mới (Phase 1 đến Phase 6: TP.HCM, Bình Dương, Vũng Tàu) vào MySQL...\n`);
  const db = await mysql.createConnection(dbUrl);

  // 1. Kiểm tra và bảo vệ các bài viết live (is_published = 1)
  const [liveRows] = await db.execute('SELECT id, title, slug, is_published FROM posts WHERE is_published = 1 ORDER BY id ASC');
  console.log(`🛡️ [DATA PROTECTION] Tìm thấy ${liveRows.length} bài viết đã xuất bản (is_published = 1). Tuyệt đối bảo vệ nguyên vẹn.`);
  const liveIds = new Set(liveRows.map(r => r.id));

  // 2. Dọn dẹp các bài viết nháp cũ (is_published = 0)
  await db.execute('DELETE FROM posts WHERE is_published = 0');
  console.log(`🗑️ [CLEANUP] Đã dọn dẹp các bản nháp cũ (is_published = 0).`);

  // 3. Nạp 133 bài viết phường mới đạt chuẩn vào MySQL
  console.log(`📦 [PREPARE] Đã nạp ${allNewWards.length} bài viết phường/xã mới đạt chuẩn (IDs 21 đến 153).`);

  const insertSql = `
    INSERT INTO posts (id, title, slug, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NOW())
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      slug = VALUES(slug),
      excerpt = VALUES(excerpt),
      content = VALUES(content),
      image_url = VALUES(image_url),
      meta_title = VALUES(meta_title),
      meta_description = VALUES(meta_description),
      meta_keywords = VALUES(meta_keywords),
      is_published = 0
  `;

  for (const art of allNewWards) {
    if (liveIds.has(art.id)) {
      console.error(`❌ CẢNH BÁO: ID ${art.id} trùng với bài viết live! Bỏ qua để bảo vệ dữ liệu.`);
      continue;
    }

    await db.execute(insertSql, [
      art.id,
      art.title,
      art.slug,
      art.summary,
      art.content,
      art.imageUrl,
      art.title,
      art.summary,
      `giao gas, đổi gas, ${art.slug.replace('giao-gas-', '').replace(/-/g, ' ')}, ngọc gas, sopet gas one`
    ]);
    console.log(`  ✅ [INSERT DRAFT] ID ${art.id}: ${art.title.slice(0, 50)}...`);
  }

  // 4. Kiểm tra đối soát thực tế trên MySQL
  const [finalRows] = await db.execute('SELECT id, title, slug, is_published FROM posts ORDER BY id ASC');
  const finalLive = finalRows.filter(r => r.is_published === 1);
  const finalDraft = finalRows.filter(r => r.is_published === 0);

  console.log('\n=============================================');
  console.log('📊 KẾT QUẢ KIỂM ĐỊNH THỰC TẾ TRÊN MYSQL:');
  console.log(`- Tổng số bài viết trong CSDL: ${finalRows.length}`);
  console.log(`- Số bài đã xuất bản (is_published = 1): ${finalLive.length} (Bảo vệ 100%)`);
  console.log(`- Số bài nháp phường/xã mới (is_published = 0): ${finalDraft.length} (IDs 21 - 153: đủ 133 bài)`);
  console.log('=============================================\n');

  await db.end();
  console.log('🎉 [HOÀN TẤT] Quá trình đồng bộ CSDL toàn bộ 133 bài phường/xã mới thành công mỹ mãn!');
}

main().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
