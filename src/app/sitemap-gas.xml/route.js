import { getAllProducts } from '@/lib/productsHelper.js';
import { getAllPosts } from '@/lib/postsHelper.js';
import { getAllStores } from '@/lib/storesHelper.js';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const now = new Date().toISOString();

  // 1. Core static pages
  const staticRoutes = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/gia-gas-hom-nay`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/san-pham`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/cua-hang`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/tin-tuc`, priority: '0.8', changefreq: 'daily' },
    { loc: `${baseUrl}/mon-an`, priority: '0.8', changefreq: 'daily' },
    { loc: `${baseUrl}/tuyen-dung`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/gioi-thieu`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/lien-he`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/dieu-khoan`, priority: '0.5', changefreq: 'monthly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  for (const p of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${p.loc}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Products
  try {
    const products = await getAllProducts();
    if (Array.isArray(products)) {
      for (const p of products) {
        if (p.is_active === 1 || p.is_active === true || p.is_active === undefined || p.is_active === '1') {
          const lastmod = p.updated_at ? new Date(p.updated_at).toISOString() : (p.created_at ? new Date(p.created_at).toISOString() : now);
          xml += `  <url>\n`;
          xml += `    <loc>${baseUrl}/san-pham/${p.slug}</loc>\n`;
          xml += `    <lastmod>${lastmod}</lastmod>\n`;
          xml += `    <changefreq>daily</changefreq>\n`;
          xml += `    <priority>0.9</priority>\n`;
          xml += `  </url>\n`;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching products for sitemap-gas:', err.message);
  }

  // 3. Posts
  try {
    const posts = await getAllPosts();
    if (Array.isArray(posts)) {
      for (const p of posts) {
        if (p.is_published === 1 || p.is_published === true || p.is_published === undefined || p.is_published === '1') {
          const lastmod = p.updated_at ? new Date(p.updated_at).toISOString() : (p.created_at ? new Date(p.created_at).toISOString() : now);
          xml += `  <url>\n`;
          xml += `    <loc>${baseUrl}/tin-tuc/${p.slug}</loc>\n`;
          xml += `    <lastmod>${lastmod}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.8</priority>\n`;
          xml += `  </url>\n`;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching posts for sitemap-gas:', err.message);
  }

  // 4. Stores
  try {
    const stores = await getAllStores();
    if (Array.isArray(stores)) {
      for (const s of stores) {
        if (s.slug) {
          xml += `  <url>\n`;
          xml += `    <loc>${baseUrl}/cua-hang/${s.slug}</loc>\n`;
          xml += `    <lastmod>${now}</lastmod>\n`;
          xml += `    <changefreq>weekly</changefreq>\n`;
          xml += `    <priority>0.7</priority>\n`;
          xml += `  </url>\n`;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching stores for sitemap-gas:', err.message);
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
