import Link from 'next/link';
import { notFound } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import { getProvincialAgencies, getProvinceUnits } from '@/lib/tinhthanhUnitsHelper';

export async function generateMetadata({ params }) {
  const { provinceSlug } = await params;
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) return { title: 'Tỉnh Thành Không Tồn Tại' };

  return {
    title: `Danh Bạ Cơ Quan Nhà Nước ${province.name} - UBND, Công An, Kho Bạc, Tòa Án, Viện Kiểm Sát`,
    description: `Tổng hợp 5 cơ quan đầu não nhà nước cấp tỉnh tại ${province.name}: Trụ sở UBND, Công An, Kho Bạc, Tòa Án và Viện Kiểm Sát. Địa chỉ chuẩn, SĐT trực ban, giờ làm việc và chỉ đường Google Maps.`
  };
}

export default async function ProvincialAgenciesPage({ params }) {
  const { provinceSlug } = await params;
  const data = getProvincialAgencies(provinceSlug);
  if (!data) notFound();

  const { province, agencies } = data;
  const units = getProvinceUnits(provinceSlug, province);

  const agencyThemes = {
    'ubnd': { primary: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', accent: '#166534', lightBadge: '#dcfce7' },
    'cong-an': { primary: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', accent: '#1e40af', lightBadge: '#dbeafe' },
    'kho-bac': { primary: '#b45309', bg: '#fffbeb', border: '#fde68a', accent: '#92400e', lightBadge: '#fef3c7' },
    'toa-an': { primary: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', accent: '#6d28d9', lightBadge: '#ede9fe' },
    'vien-kiem-sat': { primary: '#be123c', bg: '#fff1f2', border: '#fecdd3', accent: '#9f1239', lightBadge: '#ffe4e6' }
  };

  return (
    <div style={{ padding: '24px 0 60px 0', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className="tt-container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 16px' }}>

        {/* 1. BREADCRUMB */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>🏠 Trang chủ</Link>
          <span>›</span>
          <Link href="/tinh-thanh" style={{ color: '#64748b', textDecoration: 'none' }}>Bản đồ 34 Tỉnh thành</Link>
          <span>›</span>
          <Link href={`/tinh-thanh/province/${province.slug}`} style={{ color: '#64748b', textDecoration: 'none' }}>{province.name}</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: '700' }}>Cơ quan nhà nước cấp tỉnh</span>
        </nav>

        {/* 2. HERO BANNER */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '28px 32px',
          marginBottom: '28px',
          boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            backgroundColor: '#dc2626'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  Hệ Thống Trụ Sở Đầu Não 2026
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Trung tâm Hành chính: {province.center}
                </span>
              </div>

              <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0', lineHeight: '1.25' }}>
                Danh Bạ Cơ Quan Đầu Não Nhà Nước Tại {province.name}
              </h1>

              <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: '1.6' }}>
                Tổng hợp thông tin chính thống về 5 cơ quan lãnh đạo hành chính, an ninh trật tự, tài chính ngân sách và tư pháp cấp tỉnh tại <strong>{province.name}</strong>. Cung cấp địa chỉ chuẩn xác, số điện thoại tiếp dân, đường dây nóng và liên kết chỉ đường Google Maps.
              </p>
            </div>

            <Link
              href={`/tinh-thanh/province/${province.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              <span>← Quay lại {province.name}</span>
            </Link>
          </div>
        </div>

        {/* 3. DANH SÁCH 5 CƠ QUAN ĐẦU NÃO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          {agencies.map((agency, aIdx) => {
            const theme = agencyThemes[agency.agencySlug] || agencyThemes['ubnd'];

            return (
              <div
                key={agency.slug}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: `1px solid ${theme.border}`,
                  padding: '24px 28px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      flexShrink: 0
                    }}>
                      {agency.icon}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <span style={{
                          backgroundColor: theme.lightBadge,
                          color: theme.accent,
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {agency.badge}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                          {agency.level}
                        </span>
                      </div>

                      <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                        {agency.name}
                      </h2>
                    </div>
                  </div>

                  {/* Dual Google Maps Buttons */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a
                      href={agency.googleDirectionsUrl || agency.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: theme.primary,
                        color: '#ffffff',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: '800',
                        textDecoration: 'none'
                      }}
                    >
                      <span>↗ Chỉ đường Google Maps</span>
                    </a>

                    <a
                      href={agency.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: '1px solid #cbd5e1',
                        textDecoration: 'none'
                      }}
                    >
                      <span>📍 Ghim Vị Trí</span>
                    </a>

                    {agency.facebook && (
                      <a
                        href={agency.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#1877f2',
                          color: '#ffffff',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: '800',
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(24,119,242,0.25)'
                        }}
                      >
                        <span style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#1877f2', borderRadius: '50%', width: '13px', height: '13px', fontSize: '8px', textAlign: 'center', lineHeight: '13px', fontWeight: '900' }}>✓</span>
                        <span>{agency.facebookName || 'Fanpage Tích Xanh'}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  fontSize: '13px'
                }}>
                  <div>
                    <span style={{ color: '#64748b' }}>📍 Địa chỉ: </span>
                    <strong style={{ color: '#0f172a' }}>{agency.address}</strong>
                  </div>

                  <div>
                    <span style={{ color: '#64748b' }}>🚨 Hỗ trợ khẩn cấp: </span>
                    <strong style={{ color: '#dc2626' }}>{agency.hotline || '113 (Trực ban 24/7)'}</strong>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <span style={{ color: '#64748b' }}>⏰ Giờ làm việc: </span>
                    <strong style={{ color: '#334155' }}>{agency.workingHours}</strong>
                  </div>

                  <div style={{ gridColumn: '1 / -1', color: '#475569', lineHeight: '1.5' }}>
                    <span style={{ color: '#64748b' }}>ℹ️ Chức năng & Thẩm quyền: </span>
                    {agency.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. KHÁM PHÁ CƠ QUAN TẠI CÁC XÃ/PHƯỜNG */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          marginBottom: '28px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase' }}>
                Hạ Tầng Cơ Sở Các Địa Phương
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
                Tra Cứu Trụ Sở 5 Cơ Quan Theo Từng Xã/Phường Tại {province.name}
              </h3>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>
              Tổng số {units.length} phường / xã
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: '1.5' }}>
            Mỗi phường/xã đều có trang chuyên sâu về <strong>UBND, Công An, Kho Bạc, Tòa Án, Viện Kiểm Sát</strong> với đầy đủ thủ tục hành chính, số điện thoại trực ban và nút chỉ đường Google Maps:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
            maxHeight: '320px',
            overflowY: 'auto',
            paddingRight: '6px'
          }}>
            {units.slice(0, 48).map((u, uIdx) => (
              <Link
                key={uIdx}
                href={`/tinh-thanh/province/${province.slug}/${u.wardSlug || u.slug}/co-quan/ubnd`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  fontSize: '12px',
                  color: '#334155',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                <span>🏛️ {u.name}</span>
                <span style={{ color: '#94a3b8' }}>›</span>
              </Link>
            ))}
          </div>

          {units.length > 48 && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link
                href={`/tinh-thanh/province/${province.slug}`}
                style={{ fontSize: '13px', fontWeight: '800', color: '#ea580c', textDecoration: 'none' }}
              >
                Xem toàn bộ {units.length} xã/phường của {province.name} →
              </Link>
            </div>
          )}
        </section>



      </div>
    </div>
  );
}
