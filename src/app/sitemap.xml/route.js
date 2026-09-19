export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Sitemap 1: Hệ thống Sản phẩm, Bảng giá & Tin tức Ngọc Gas -->
  <sitemap>
    <loc>${baseUrl}/sitemap-gas.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>

  <!-- Sitemap 2: Cổng Tra Cứu Địa Giới, Bản Đồ 34 Tỉnh Thành & Xã Phường 2026 -->
  <sitemap>
    <loc>${baseUrl}/sitemap-diagioi.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
