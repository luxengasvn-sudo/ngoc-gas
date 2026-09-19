export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const content = `User-Agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-gas.xml
Sitemap: ${baseUrl}/sitemap-diagioi.xml
Sitemap: ${baseUrl}/tinh-thanh/sitemap-diagioi.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
