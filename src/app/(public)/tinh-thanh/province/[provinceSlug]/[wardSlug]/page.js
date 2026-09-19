import { notFound } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import { getOrSynthesizeWardUnit } from '@/lib/tinhthanhUnitsHelper';
import {
  generateWardSeoArticle,
  generateWardSchema,
  generateWardMetadata
} from '@/lib/tinhthanhLocalContentEngine';
import WardClientView from './WardClientView';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { provinceSlug, wardSlug } = resolvedParams;
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) {
    return { title: 'Không tìm thấy địa bàn' };
  }

  const unit = getOrSynthesizeWardUnit(provinceSlug, wardSlug, province);
  if (!unit) {
    return { title: `UBND ${wardSlug} (${province.name})` };
  }

  return generateWardMetadata(unit, province);
}

export default async function WardDetailPage({ params }) {
  const resolvedParams = await params;
  const { provinceSlug, wardSlug } = resolvedParams;
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) notFound();

  const unit = getOrSynthesizeWardUnit(provinceSlug, wardSlug, province);
  if (!unit) notFound();

  const seoArticle = generateWardSeoArticle(unit, province);
  const schemaJson = generateWardSchema(unit, province);

  return (
    <>
      {/* Schema JSON-LD cấu trúc Google Search (GovernmentOffice + FAQPage + BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <WardClientView
        province={province}
        provinceSlug={provinceSlug}
        wardSlug={wardSlug}
        initialUnit={unit}
        seoArticle={seoArticle}
      />
    </>
  );
}
