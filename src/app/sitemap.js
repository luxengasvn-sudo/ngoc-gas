import { getAllProducts } from '../lib/productsHelper.js';
import { getAllPosts } from '../lib/postsHelper.js';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh sitemap generation always

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';

  // 1. Trang tĩnh cố định & Trang đích trọng điểm
  const staticPages = [
    { route: '', changeFrequency: 'daily', priority: 1.0 },
    { route: '/gia-gas-hom-nay', changeFrequency: 'daily', priority: 1.0 },
    { route: '/san-pham', changeFrequency: 'daily', priority: 0.9 },
    { route: '/gioi-thieu', changeFrequency: 'monthly', priority: 0.8 },
    { route: '/cua-hang', changeFrequency: 'weekly', priority: 0.8 },
    { route: '/tin-tuc', changeFrequency: 'daily', priority: 0.8 },
    { route: '/lien-he', changeFrequency: 'monthly', priority: 0.8 },
  ].map(({ route, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // 2. Trang sản phẩm động
  let productPages = [];
  try {
    const products = await getAllProducts();
    if (Array.isArray(products)) {
      productPages = products
        .filter((p) => p.is_active === 1 || p.is_active === true || p.is_active === undefined || p.is_active === '1')
        .map((p) => ({
          url: `${baseUrl}/san-pham/${p.slug}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : (p.created_at ? new Date(p.created_at) : new Date()),
          changeFrequency: 'daily',
          priority: 0.9,
        }));
    }
  } catch (e) {
    console.error('Error fetching products for sitemap:', e.message);
  }

  // 3. Trang tin tức / bài viết động
  let postPages = [];
  try {
    const posts = await getAllPosts();
    if (Array.isArray(posts)) {
      postPages = posts
        .filter((p) => p.is_published === 1 || p.is_published === true || p.is_published === undefined || p.is_published === '1')
        .map((p) => ({
          url: `${baseUrl}/tin-tuc/${p.slug}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : (p.created_at ? new Date(p.created_at) : new Date()),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
    }
  } catch (e) {
    console.error('Error fetching posts for sitemap:', e.message);
  }

  return [...staticPages, ...productPages, ...postPages];
}
