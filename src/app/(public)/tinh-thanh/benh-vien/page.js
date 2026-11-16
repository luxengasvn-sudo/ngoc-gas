import Link from 'next/link';
import { getAllHospitals, getHospitalProvinces, getHospitalTiers } from '@/lib/tinhthanhHospitalsHelper';
import HospitalDirectoryClient from './HospitalDirectoryClient';

export const metadata = {
  title: 'Danh Mục Bệnh Viện Toàn Quốc - Địa Chỉ, Hotline Cấp Cứu 24/7 & Xem Địa Điểm Google Maps',
  description: 'Tra cứu danh bạ các bệnh viện tuyến trung ương, bệnh viện đa khoa hạng đặc biệt và tuyến tỉnh toàn quốc 2026. Thông tin địa chỉ chính xác, hotline cấp cứu 24/7, chuyên khoa mũi nhọn và bản đồ xem địa điểm Google Maps.',
  keywords: [
    'danh mục bệnh viện',
    'bệnh viện toàn quốc',
    'bệnh viện tuyến trung ương',
    'bệnh viện hạng đặc biệt',
    'số điện thoại cấp cứu',
    'địa chỉ bệnh viện',
    'bản đồ bệnh viện'
  ]
};

export default function HospitalDirectoryPage() {
  const hospitals = getAllHospitals();
  const provinces = getHospitalProvinces();
  const tiers = getHospitalTiers();

  // Schema.org ItemList for hospitals
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Danh Sách Các Bệnh Viện Trọng Điểm Toàn Quốc 2026',
    'description': 'Danh bạ hệ thống bệnh viện đa khoa và chuyên khoa đầu ngành tại Việt Nam',
    'numberOfItems': hospitals.length,
    'itemListElement': hospitals.map((h, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Hospital',
        'name': h.name,
        'url': `https://ngocgas.com/tinh-thanh/benh-vien/${h.slug}`,
        'telephone': h.hotlineEmergency || h.phoneAppointment,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': h.address,
          'addressLocality': h.provinceName,
          'addressCountry': 'VN'
        }
      }
    }))
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '24px 0 60px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="tt-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>🏠 Trang chủ</Link>
          <span>›</span>
          <Link href="/tinh-thanh" style={{ color: '#64748b', textDecoration: 'none' }}>Cổng Địa Giới VN</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: '700' }}>Danh Mục Bệnh Viện</span>
        </nav>

        {/* Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)',
          borderRadius: '20px',
          padding: '36px 32px',
          color: '#ffffff',
          marginBottom: '32px',
          boxShadow: '0 10px 30px rgba(3, 105, 161, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              marginBottom: '14px',
              letterSpacing: '0.5px'
            }}>
              <span>🏥 HỆ THỐNG Y TẾ TOÀN QUỐC 2026</span>
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: '900', lineHeight: 1.25, margin: '0 0 12px 0' }}>
              Danh Mục Bệnh Viện & Cấp Cứu Y Tế Toàn Quốc
            </h1>

            <p style={{ fontSize: '15px', color: '#e0f2fe', maxWidth: '780px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Hệ thống tra cứu thông tin chính thức của các bệnh viện hạng đặc biệt, tuyến trung ương và đa khoa tuyến tỉnh. Xem ngay địa chỉ thực tế, số điện thoại cấp cứu 24/7, chuyên khoa điều trị và bản đồ xem địa điểm Google Maps chính xác.
            </p>

            {/* Badges cam kết */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '8px' }}>
                ✓ 100% Địa chỉ xác thực thực địa
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '8px' }}>
                🚨 Trực cấp cứu 24/24
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '8px' }}>
                📍 Xem vị trí Google Maps
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '8px' }}>
                📄 Bài viết thông tin độc bản
              </span>
            </div>
          </div>
        </div>

        {/* Client Interactive Directory */}
        <HospitalDirectoryClient
          initialHospitals={hospitals}
          provinces={provinces}
          tiers={tiers}
        />
      </div>
    </div>
  );
}
