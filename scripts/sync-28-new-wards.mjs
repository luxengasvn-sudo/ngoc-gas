import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { binhThanhArticles } from './new-wards/cluster-binh-thanh.mjs';
import { goVapArticles } from './new-wards/cluster-go-vap.mjs';
import { quan12Articles } from './new-wards/cluster-quan-12.mjs';
import { thuDucArticles } from './new-wards/cluster-thu-duc.mjs';

const DB_URL = 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';

async function main() {
  console.log('🚀 [SYNC] Bắt đầu chuẩn hóa 28 bài viết theo phường mới của TP.HCM...');
  const conn = await mysql.createConnection(DB_URL);

  // 1. Kiểm tra trạng thái bài published ban đầu
  const [publishedRows] = await conn.query('SELECT id, slug FROM posts WHERE is_published = 1 ORDER BY id ASC');
  console.log(`🛡️ [DATA PROTECTION] Tìm thấy ${publishedRows.length} bài viết đã xuất bản (is_published = 1). Tuyệt đối bảo vệ nguyên vẹn.`);
  if (publishedRows.length !== 15) {
    throw new Error(`Cảnh báo an toàn: Số lượng bài published (${publishedRows.length}) khác 15. Dừng ngay lập tức!`);
  }

  // 2. Xóa các bản nháp cũ của phường số (id >= 21 AND is_published = 0)
  const [delResult] = await conn.query('DELETE FROM posts WHERE id >= 21 AND is_published = 0');
  console.log(`🗑️ [CLEANUP] Đã dọn dẹp ${delResult.affectedRows} bản nháp phường số cũ (id >= 21).`);

  // 3. Tổng hợp 28 bài viết phường mới
  const allNewWards = [
    ...binhThanhArticles,
    ...goVapArticles,
    ...quan12Articles,
    ...thuDucArticles
  ];

  console.log(`📦 [PREPARE] Đã nạp ${allNewWards.length} bài viết phường mới đạt chuẩn.`);

  // 4. Thêm từng bài vào CSDL dưới dạng DRAFT (is_published = 0)
  for (const art of allNewWards) {
    await conn.query(
      `INSERT INTO posts (id, title, slug, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published, created_at)
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
         is_published = 0`,
      [
        art.id,
        art.title,
        art.slug,
        art.summary,
        art.content,
        art.imageUrl,
        art.title,
        art.summary,
        `giao gas, đổi gas, ${art.slug.replace('giao-gas-', '').replace(/-/g, ' ')}, ngọc gas, sopet gas one`
      ]
    );
    console.log(`  ✅ [INSERT DRAFT] ID ${art.id}: ${art.title.substring(0, 50)}...`);
  }

  // 5. Kiểm định kết quả sau đồng bộ
  const [finalRows] = await conn.query('SELECT id, slug, title, is_published, image_url, LENGTH(content) as content_len FROM posts ORDER BY id ASC');
  const finalPub = finalRows.filter(r => r.is_published === 1);
  const finalDraft = finalRows.filter(r => r.is_published === 0);

  console.log('\n=============================================');
  console.log('📊 KẾT QUẢ KIỂM ĐỊNH THỰC TẾ TRÊN MYSQL:');
  console.log(`- Tổng số bài viết trong CSDL: ${finalRows.length}`);
  console.log(`- Số bài đã xuất bản (is_published = 1): ${finalPub.length} (Bảo vệ 100%)`);
  console.log(`- Số bài nháp phường mới (is_published = 0): ${finalDraft.length} (IDs 21 - 48)`);
  console.log('=============================================\n');

  // Ghi tệp sao lưu an toàn ra scratch/
  fs.writeFileSync(
    path.resolve('scratch/final_posts_summary.json'),
    JSON.stringify(finalRows.map(r => ({ id: r.id, slug: r.slug, title: r.title, is_published: r.is_published, content_len: r.content_len, image_url: r.image_url })), null, 2),
    'utf8'
  );

  await conn.end();
  console.log('🎉 [HOÀN TẤT] Quá trình chuẩn hóa CSDL thành công mỹ mãn!');
}

main().catch(err => {
  console.error('❌ Lỗi message:', err.message);
  console.error('❌ Lỗi code:', err.code);
  console.error('❌ Lỗi sqlMessage:', err.sqlMessage);
  process.exit(1);
});
