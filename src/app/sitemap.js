import db from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';

  // 1. Trang tĩnh cố định
  const staticPages = [
    '',
    '/gioi-thieu',
    '/san-pham',
    '/cua-hang',
    '/tin-tuc',
    '/lien-he',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Trang sản phẩm động (tự lấy từ database)
  let productPages = [];
  try {
    const [products] = await db.query(
      'SELECT slug, created_at FROM products WHERE is_active = 1'
    );
    if (Array.isArray(products)) {
      productPages = products.map((p) => ({
        url: `${baseUrl}/san-pham/${p.slug}`,
        lastModified: p.created_at ? new Date(p.created_at) : new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));
    }
  } catch (e) {
    console.error('Error fetching products for sitemap:', e.message);
  }

  // 3. Trang tin tức / bài viết động (tự lấy từ database)
  let postPages = [];
  try {
    const [posts] = await db.query(
      'SELECT slug, created_at FROM posts WHERE is_published = 1'
    );
    if (Array.isArray(posts)) {
      postPages = posts.map((p) => ({
        url: `${baseUrl}/tin-tuc/${p.slug}`,
        lastModified: p.created_at ? new Date(p.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error('Error fetching posts for sitemap:', e.message);
  }

  return [...staticPages, ...productPages, ...postPages];
}
