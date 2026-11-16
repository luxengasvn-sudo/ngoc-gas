import provincesData from '@/data/tinhthanh/provinces-34.json';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const now = new Date().toISOString();
  const dataDir = path.join(process.cwd(), 'src/data/tinhthanh');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Provincial Police Hub Pages (34 Provinces)
  for (const prov of provincesData) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/tinh-thanh/province/${prov.slug}/co-quan-nha-nuoc</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;

    // 2. Ward/Commune Police Station URLs (3.446 units)
    const unitFile = path.join(dataDir, `administrative-units-${prov.slug}.json`);
    if (fs.existsSync(unitFile)) {
      try {
        const units = JSON.parse(fs.readFileSync(unitFile, 'utf8'));
        if (Array.isArray(units)) {
          for (const u of units) {
            const wardSlug = u.wardSlug || u.slug;
            if (wardSlug) {
              xml += `  <url>\n`;
              xml += `    <loc>${baseUrl}/tinh-thanh/province/${prov.slug}/${wardSlug}/co-quan/cong-an</loc>\n`;
              xml += `    <lastmod>${now}</lastmod>\n`;
              xml += `    <changefreq>weekly</changefreq>\n`;
              xml += `    <priority>0.8</priority>\n`;
              xml += `  </url>\n`;
            }
          }
        }
      } catch (e) {
        console.error(`Error loading units for sitemap-cong-an (${prov.slug}):`, e.message);
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
