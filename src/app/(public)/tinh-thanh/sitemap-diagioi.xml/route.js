import { GET as getSitemapDiaGioi } from '@/app/sitemap-diagioi.xml/route.js';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request) {
  return getSitemapDiaGioi(request);
}
