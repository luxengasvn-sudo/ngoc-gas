import provincesData from '@/data/tinhthanh/provinces-34.json';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Core Dia Gioi Tools & Index Pages
  const coreTools = [
    { path: '/tinh-thanh', priority: '1.0', changefreq: 'daily' },
    { path: '/tinh-thanh/34-tinh-thanh', priority: '0.9', changefreq: 'daily' },
    { path: '/tinh-thanh/tra-cuu-sap-nhap', priority: '0.9', changefreq: 'daily' },
    { path: '/tinh-thanh/tra-cuu-ma-buu-chinh', priority: '0.9', changefreq: 'daily' },
    { path: '/tinh-thanh/tinh-thanh-cu', priority: '0.8', changefreq: 'weekly' },
    { path: '/tinh-thanh/bien-so-xe', priority: '0.8', changefreq: 'weekly' },
    { path: '/tinh-thanh/tieu-chuan-xa-phuong', priority: '0.8', changefreq: 'monthly' },
    { path: '/tinh-thanh/dieu-khoan', priority: '0.5', changefreq: 'monthly' }
  ];

  for (const tool of coreTools) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${tool.path}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${tool.changefreq}</changefreq>\n`;
    xml += `    <priority>${tool.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. 34 Province Hub Pages
  const dataDir = path.join(process.cwd(), 'src/data/tinhthanh');

  for (const prov of provincesData) {
    // Province Home
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/tinh-thanh/province/${prov.slug}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;

    // Province Unit Directory
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/tinh-thanh/province/${prov.slug}/danh-sach-don-vi-hanh-chinh</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    // Province Government Agencies
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/tinh-thanh/province/${prov.slug}/co-quan-nha-nuoc</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    // 3. Wards & Communes of this province
    const unitFile = path.join(dataDir, `administrative-units-${prov.slug}.json`);
    if (fs.existsSync(unitFile)) {
      try {
        const units = JSON.parse(fs.readFileSync(unitFile, 'utf8'));
        if (Array.isArray(units)) {
          for (const u of units) {
            const wardSlug = u.wardSlug || u.slug;
            if (wardSlug) {
              xml += `  <url>\n`;
              xml += `    <loc>${baseUrl}/tinh-thanh/province/${prov.slug}/${wardSlug}</loc>\n`;
              xml += `    <lastmod>${now}</lastmod>\n`;
              xml += `    <changefreq>weekly</changefreq>\n`;
              xml += `    <priority>0.8</priority>\n`;
              xml += `  </url>\n`;
            }
          }
        }
      } catch (e) {
        console.error(`Error loading units for sitemap-diagioi (${prov.slug}):`, e.message);
      }
    }
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
