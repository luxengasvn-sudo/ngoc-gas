import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllHospitals, getHospitalBySlug, getRelatedHospitals } from '@/lib/tinhthanhHospitalsHelper';

export async function generateStaticParams() {
  const hospitals = getAllHospitals();
  return hospitals.map(h => ({
    hospitalSlug: h.slug
  }));
}

export async function generateMetadata({ params }) {
  const { hospitalSlug } = await params;
  const hospital = getHospitalBySlug(hospitalSlug);

  if (!hospital) {
    return {
      title: 'Bệnh Viện Không Tồn Tại'
    };
  }

  const title = `${hospital.name} - Địa Chỉ, Số Cấp Cứu, Giờ Khám & Địa Điểm Google Maps | ${hospital.provinceName}`;
  const description = `Thông tin chính thức về ${hospital.name} tại ${hospital.provinceName}. Địa chỉ: ${hospital.address}. Số điện thoại cấp cứu 24/7: ${hospital.hotlineEmergency}. Giờ làm việc, chuyên khoa mũi nhọn và bản đồ xem địa điểm Google Maps.`;

  return {
    title,
    description,
    keywords: [
      hospital.name,
      hospital.shortName,
      `địa chỉ ${hospital.name}`,
      `số điện thoại ${hospital.name}`,
      `cấp cứu ${hospital.name}`,
      `địa điểm ${hospital.name}`,
      hospital.provinceName
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://ngocgas.com/tinh-thanh/benh-vien/${hospital.slug}`
    }
  };
}

export default async function HospitalDetailPage({ params }) {
  const { hospitalSlug } = await params;
  const hospital = getHospitalBySlug(hospitalSlug);

  if (!hospital) {
    notFound();
  }

  const relatedHospitals = getRelatedHospitals(hospital.slug, 3);

  // Schema JSON-LD chuẩn y tế
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    'name': hospital.name,
    'alternateName': hospital.shortName,
    'description': hospital.summary,
    'url': `https://ngocgas.com/tinh-thanh/benh-vien/${hospital.slug}`,
    'telephone': hospital.hotlineEmergency || hospital.phoneAppointment,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': hospital.address,
      'addressLocality': hospital.provinceName,
      'addressCountry': 'VN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': hospital.lat,
      'longitude': hospital.lng
    },
    'openingHours': 'Mo-Su 00:00-24:00',
    'availableService': hospital.specialties?.map(s => ({
      '@type': 'MedicalSpecialty',
      'name': s
    }))
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '24px 0 60px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="tt-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
        {/* 1. BREADCRUMBS */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>🏠 Trang chủ</Link>
          <span>›</span>
          <Link href="/tinh-thanh" style={{ color: '#64748b', textDecoration: 'none' }}>Cổng Địa Giới VN</Link>
          <span>›</span>
          <Link href="/tinh-thanh/benh-vien" style={{ color: '#64748b', textDecoration: 'none' }}>Danh Mục Bệnh Viện</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: '700' }}>{hospital.shortName || hospital.name}</span>
        </nav>

        {/* 2. HEADER HERO BỆNH VIỆN */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 6px 20px rgba(15, 23, 42, 0.04)'
        }}>
          {/* Badges Phân Tuyến */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
            <span style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              fontSize: '12px',
              fontWeight: '800',
              padding: '4px 10px',
              borderRadius: '6px',
              textTransform: 'uppercase'
            }}>
              {hospital.badge}
            </span>
            <span style={{
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              🏛️ {hospital.agency}
            </span>
            <span style={{
              backgroundColor: '#f1f5f9',
              color: '#475569',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              📍 {hospital.provinceName}
            </span>
          </div>

          {/* Tên Bệnh Viện */}
          <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', margin: '0 0 12px 0', lineHeight: 1.3 }}>
            {hospital.name}
          </h1>

          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            {hospital.summary}
          </p>

          {/* CỤM NÚT HÀNH ĐỘNG: MỞ ĐỊA ĐIỂM GOOGLE MAPS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px 16px'
          }}>
            {/* NÚT MỞ ĐỊA ĐIỂM GOOGLE MAPS (YÊU CẦU CHÍNH) */}
            <a
              href={hospital.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                maxWidth: '320px',
                padding: '14px 24px',
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                transition: 'all 0.2s',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '18px' }}>📍</span>
              <span>Xem Địa Điểm Google Maps</span>
            </a>
          </div>
        </div>

        {/* 3. THÔNG SỐ HÀNH CHÍNH & VỊ TRÍ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Card Địa chỉ (Click mở Google Maps) */}
          <a
            href={hospital.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '2px solid #bfdbfe',
              padding: '18px',
              textDecoration: 'none',
              display: 'block',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.06)'
            }}
            title="Nhấp để mở vị trí bệnh viện trên Google Maps"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#1d4ed8', textTransform: 'uppercase' }}>
                📍 Địa Chỉ Chính Xác
              </span>
              <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                Mở Google Maps ↗
              </span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: 1.5 }}>
              {hospital.address}
            </div>
            <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '6px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🗺️ Xem địa điểm trên Google Maps</span>
            </div>
          </a>

          {/* Card Giờ Làm Việc */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              ⏰ Giờ Khám Bệnh
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: 1.5 }}>
              {hospital.workingHours}
            </div>
          </div>

          {/* Card Quy Mô Giường */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              🛏️ Quy Mô Điều Trị
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: 1.5 }}>
              {hospital.bedCapacity}
            </div>
          </div>
        </div>

        {/* 4. CHUYÊN KHOA MŨI NHỌN */}
        {hospital.specialties && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 14px 0', textTransform: 'uppercase' }}>
              🔬 Các Chuyên Khoa Mũi Nhọn Trọng Điểm
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {hospital.specialties.map((s, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 5. BÀI VIẾT ĐỘC BẢN VỀ BỆNH VIỆN (KHÔNG TRÙNG NHAU) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '36px',
          marginBottom: '32px',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
        }}>
          <div style={{
            borderBottom: '2px solid #0284c7',
            paddingBottom: '12px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
              📄 Giới Thiệu Chuyên Sâu Về {hospital.name}
            </h2>
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '4px' }}>
              ✓ Nội dung độc bản xác thực
            </span>
          </div>

          {/* Render Nội dung bài viết */}
          <div
            className="tt-hospital-article-content"
            style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#334155'
            }}
            dangerouslySetInnerHTML={{ __html: hospital.content }}
          />

          {/* Ghi chú cấp cứu khẩn cấp */}
          <div style={{
            marginTop: '28px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}>
            <div style={{ fontSize: '24px', lineHeight: 1 }}>🚨</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#991b1b', marginBottom: '4px' }}>
                Lưu Ý Khẩn Cấp Dành Cho Bệnh Nhân Cấp Cứu
              </div>
              <p style={{ fontSize: '13px', color: '#7f1d1d', margin: 0, lineHeight: 1.6 }}>
                Các trường hợp nguy kịch, ngừng tuần hoàn, chấn thương nặng hoặc đột quỵ hãy gọi ngay đường dây nóng cấp cứu <strong>{hospital.hotlineEmergency}</strong> hoặc gọi <strong>115</strong> để được điều động xe cứu thương cấp cứu kịp thời trong thời gian vàng.
              </p>
            </div>
          </div>
        </div>

        {/* 6. CÁC BỆNH VIỆN LIÊN QUAN TRONG KHU VỰC */}
        {relatedHospitals.length > 0 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              🏥 Bệnh Viện Cùng Khu Vực & Cùng Tuyến
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {relatedHospitals.map(rh => (
                <div
                  key={rh.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                      {rh.provinceName}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '8px 0 6px 0' }}>
                      <Link href={`/tinh-thanh/benh-vien/${rh.slug}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                        {rh.name}
                      </Link>
                    </h4>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                      📍 {rh.address}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                    <a
                      href={rh.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}
                    >
                      📍 Xem địa điểm
                    </a>
                    <Link
                      href={`/tinh-thanh/benh-vien/${rh.slug}`}
                      style={{ fontSize: '12px', color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}
                    >
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
