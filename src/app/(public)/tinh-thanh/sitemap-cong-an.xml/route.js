import { GET as getSitemapCongAn } from '@/app/sitemap-cong-an.xml/route.js';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET(request) {
  return getSitemapCongAn(request);
}
