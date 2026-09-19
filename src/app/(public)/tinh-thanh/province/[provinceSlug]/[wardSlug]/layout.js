import provincesData from '@/data/tinhthanh/provinces-34.json';
import { getOrSynthesizeWardUnit } from '@/lib/tinhthanhUnitsHelper';
import { generateWardMetadata } from '@/lib/tinhthanhLocalContentEngine';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { provinceSlug, wardSlug } = resolvedParams;
  const province = provincesData.find(p => p.slug === provinceSlug);

  if (!province) {
    return {
      title: 'Đơn Vị Hành Chính'
    };
  }

  const unit = getOrSynthesizeWardUnit(provinceSlug, wardSlug, province);
  if (!unit) {
    return {
      title: `UBND ${wardSlug} (${province.name})`
    };
  }

  return generateWardMetadata(unit, province);
}

export default function WardDetailLayout({ children }) {
  return children;
}
