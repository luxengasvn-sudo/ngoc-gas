import fs from 'fs';
import { getAllPosts } from '../src/lib/postsHelper.js';

async function syncFoodCsv() {
  const posts = await getAllPosts();
  const food = posts.filter(p => p.is_published == 1 && p.category === 'mon-an').sort((a, b) => a.id - b.id);
  console.log('Total published food posts:', food.length);

  let history = [];
  const historyPath = 'data/syndication-history.json';
  if (fs.existsSync(historyPath)) {
    try { history = JSON.parse(fs.readFileSync(historyPath, 'utf8')); } catch (e) {}
  }

  const rows = ['STT,Tiêu Đề Bài Viết,Tóm Tắt Nội Dung,Link Bài Viết,Link Vệ Tinh (Entity),Trạng Thái,Ngày Đăng,Ảnh Đại Diện,Số Từ'];

  food.forEach((p, idx) => {
    const words = (p.content.replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length;
    const cleanSummary = (p.summary || p.excerpt || '').replace(/[\r\n]+/g, ' ').replace(/"/g, '""');
    const cleanTitle = (p.title || '').replace(/"/g, '""');
    const link = `https://ngocgas.com/mon-an/${p.slug}`;
    const date = p.created_at ? new Date(p.created_at).toLocaleDateString('vi-VN') : '19/09/2026';
    const img = p.image_url.startsWith('http') ? p.image_url : `https://ngocgas.com${p.image_url}`;
    
    // Tìm link vệ tinh từ lịch sử syndication
    const syncItem = history.find(h => h.postSlug === p.slug);
    const satelliteUrls = (syncItem?.channels || [])
      .filter(c => c.url)
      .map(c => c.url)
      .join(' | ') || 'Đang đồng bộ';

    rows.push(`${idx + 1},"${cleanTitle}","${cleanSummary}",${link},"${satelliteUrls}",Công khai (Live),${date},${img},${words}`);
  });

  fs.writeFileSync('data/Thong-Ke-Mon-An.csv', rows.join('\n'), 'utf8');
  console.log('✅ Rebuilt data/Thong-Ke-Mon-An.csv with Entity syndication links successfully!');
}

syncFoodCsv().catch(console.error);
