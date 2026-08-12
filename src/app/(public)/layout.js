import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactWidget from "@/components/MobileContactWidget";
import BottomNav from "@/components/BottomNav";
import { getAllSettings } from "@/lib/settingsHelper";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PublicLayout({ children }) {
  let settings = {};
  try {
    settings = await getAllSettings();
  } catch (e) {
    console.error('Error fetching layout settings:', e);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://ngocgas.com/#organization",
        "name": settings.company_name || "Ngọc Gas",
        "description": settings.slogan || "Nhà cung cấp gas chuyên nghiệp, uy tín tại TP. HCM & Bình Dương. Chuyên thiết kế, thi công hệ thống gas công nghiệp và giao lẻ gas dân dụng chính hãng.",
        "telephone": settings.phone || "19009396",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings.address || "7 Nguyễn Trung Trực, Dĩ An",
          "addressLocality": "Dĩ An",
          "addressRegion": "Bình Dương",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.9073,
          "longitude": 106.7725
        },
        "areaServed": ["Dĩ An", "Thuận An", "Thủ Dầu Một", "TP. Hồ Chí Minh"],
        "priceRange": "$$"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header initialSettings={settings} />
      <div className="main-content-wrapper">{children}</div>
      <MobileContactWidget phone={settings.phone} />
      <BottomNav phone={settings.phone} />
      <Footer initialSettings={settings} />
    </>
  );
}
