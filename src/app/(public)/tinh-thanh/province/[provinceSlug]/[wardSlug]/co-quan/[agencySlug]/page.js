import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAgencyDetails } from '@/lib/tinhthanhUnitsHelper';
import InteractiveWardMap from '@/app/(public)/tinh-thanh/components/InteractiveWardMap';

export async function generateMetadata({ params }) {
  const { provinceSlug, wardSlug, agencySlug } = await params;
  const data = getAgencyDetails(provinceSlug, wardSlug, agencySlug);
  if (!data) return { title: 'Cơ Quan Không Tồn Tại' };

  const { agency, unit, province } = data;
  return {
    title: `${agency.name} - Địa Chỉ, SĐT, Giờ Làm Việc & Bản Đồ | ${unit.name}, ${province.name}`,
    description: `Thông tin chính thức về ${agency.name} tại ${unit.name}, ${province.name}. Địa chỉ: ${agency.address}, SĐT: ${agency.phone}, giờ làm việc, thủ tục hành chính và chỉ đường Google Maps.`
  };
}

export default async function AgencyDetailPage({ params }) {
  const { provinceSlug, wardSlug, agencySlug } = await params;
  const data = getAgencyDetails(provinceSlug, wardSlug, agencySlug);

  if (!data) {
    notFound();
  }

  const { agency, unit, province, sisterAgencies } = data;

  // Custom unit object positioned at agency coordinates for InteractiveWardMap
  const mapUnit = {
    ...unit,
    name: agency.name,
    lat: agency.lat || unit.lat,
    lng: agency.lng || unit.lng
  };

  const agencyThemes = {
    'ubnd': { primary: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', accent: '#166534', lightBadge: '#dcfce7' },
    'cong-an': { primary: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', accent: '#1e40af', lightBadge: '#dbeafe' },
    'kho-bac': { primary: '#b45309', bg: '#fffbeb', border: '#fde68a', accent: '#92400e', lightBadge: '#fef3c7' },
    'toa-an': { primary: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', accent: '#6d28d9', lightBadge: '#ede9fe' },
    'vien-kiem-sat': { primary: '#be123c', bg: '#fff1f2', border: '#fecdd3', accent: '#9f1239', lightBadge: '#ffe4e6' }
  };

  const theme = agencyThemes[agency.slug] || agencyThemes['ubnd'];

  return (
    <div style={{ padding: '24px 0 60px 0', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div className="tt-container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 16px' }}>

        {/* 1. BREADCRUMBS ĐA TẦNG */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', color: '#64748b' }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>🏠 Trang chủ</Link>
          <span>›</span>
          <Link href="/tinh-thanh" style={{ color: '#64748b', textDecoration: 'none' }}>Bản đồ 34 Tỉnh thành</Link>
          <span>›</span>
          <Link href={`/tinh-thanh/province/${province.slug}`} style={{ color: '#64748b', textDecoration: 'none' }}>{province.name}</Link>
          <span>›</span>
          <Link href={`/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}`} style={{ color: '#64748b', textDecoration: 'none' }}>{unit.name}</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: '700' }}>{agency.shortName || agency.name}</span>
        </nav>

        {/* 2. SISTER AGENCIES TAB SWITCHER */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '20px',
          scrollbarWidth: 'thin'
        }}>
          {sisterAgencies.map((sa) => {
            const isActive = sa.isActive;
            const tabTheme = agencyThemes[sa.slug] || agencyThemes['ubnd'];
            return (
              <Link
                key={sa.slug}
                href={`/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}/co-quan/${sa.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: isActive ? '800' : '600',
                  color: isActive ? '#ffffff' : '#334155',
                  backgroundColor: isActive ? tabTheme.primary : '#ffffff',
                  border: `1px solid ${isActive ? tabTheme.primary : '#e2e8f0'}`,
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '16px' }}>{sa.icon}</span>
                <span>{sa.name}</span>
                {sa.badge && (
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.22)' : '#f1f5f9',
                    color: isActive ? '#ffffff' : '#64748b'
                  }}>
                    {sa.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* 3. HERO HEADER BANNER */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
          padding: '24px 28px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            backgroundColor: theme.primary
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
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
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {agency.badge || 'Cơ Quan Nhà Nước'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    {agency.level}
                  </span>
                </div>

                <h1 style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#0f172a',
                  margin: '0 0 6px 0',
                  lineHeight: '1.25'
                }}>
                  {agency.name}
                </h1>

                <div style={{ fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍</span>
                  <span>{unit.name}, {province.name}</span>
                </div>
              </div>
            </div>

            {/* DUAL GOOGLE MAPS ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={agency.googleDirectionsUrl || agency.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((agency.name || '') + ', ' + (agency.address || province.name))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: theme.primary,
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '800',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                }}
              >
                <span>↗</span>
                <span>Chỉ đường Google Maps</span>
              </a>

              <a
                href={agency.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((agency.name || '') + ', ' + (agency.address || province.name))}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: '1px solid #cbd5e1',
                  textDecoration: 'none'
                }}
              >
                <span>📍</span>
                <span>Ghim Vị Trí</span>
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
                    padding: '12px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '800',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(24,119,242,0.25)'
                  }}
                >
                  <span style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#1877f2', borderRadius: '50%', width: '15px', height: '15px', fontSize: '9px', textAlign: 'center', lineHeight: '15px', fontWeight: '900' }}>✓</span>
                  <span>{agency.facebookName || 'Fanpage Tích Xanh'}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 4. MAIN CONTENT GRID (2 COLUMNS: INFO & MAP) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>

          {/* CỘT 1: HỘP THÔNG TIN HÀNH CHÍNH CHI TIẾT */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#0f172a',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '12px'
            }}>
              <span>📑</span>
              <span>Thông Tin Liên Hệ & Tiếp Dân</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Row: Vị trí trụ sở */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>📍</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Vị trí trụ sở chính</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0284c7', marginTop: '2px' }}>
                    <a
                      href={agency.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((agency.name || '') + ', ' + (unit.name || '') + ', ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#0284c7', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>Xem ghim thực địa trên Google Maps ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Row: Tiếp nhận hồ sơ & Đường dây nóng */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>🚨</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Đường dây nóng & Hỗ trợ trực tuyến</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#334155', marginTop: '2px' }}>
                    113 (Trực ban Công an 24/7) · Cổng Dịch vụ công Quốc gia
                  </div>
                </div>
              </div>

              {/* Row: Trang thông tin điện tử chính quyền (.gov.vn) nếu có */}
              {agency.website && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>🌐</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Trang thông tin điện tử chính quyền</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1d4ed8', marginTop: '2px' }}>
                      <a href={agency.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', textDecoration: 'underline' }}>
                        {agency.website} ↗
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Row: Đường dây nóng khẩn cấp (nếu có) */}
              {agency.hotline && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>🚨</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase' }}>Đường dây nóng / Trực ban</div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#dc2626', marginTop: '2px' }}>
                      {agency.hotline}
                    </div>
                  </div>
                </div>
              )}

              {/* Row: Thời gian làm việc */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>⏰</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Thời gian làm việc & tiếp nhận hồ sơ</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginTop: '2px', lineHeight: '1.5' }}>
                    {agency.workingHours}
                  </div>
                </div>
              </div>

              {/* Row: Cấp quản lý & Mã định danh */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>🆔</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Mã định danh & Thẩm quyền quản lý</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginTop: '2px' }}>
                    Mã: <strong>{agency.administrativeCode || 'Đang cập nhật'}</strong> · {agency.level}
                  </div>
                </div>
              </div>

              {/* Box hướng dẫn nhanh */}
              <div style={{
                marginTop: '10px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                fontSize: '12px',
                color: '#334155',
                lineHeight: '1.5'
              }}>
                <strong style={{ color: theme.accent }}>💡 Lưu ý tiếp công dân:</strong> Quý công dân khi đến giao dịch hành chính vui lòng mang theo Căn cước công dân gắn chip hoặc ứng dụng VNeID mức 2 đã kích hoạt để đối chiếu thông tin nhanh chóng.
              </div>

              {/* Box Kênh Phản Ánh Trực Tuyến Tích Xanh (Dành riêng cho Công An) */}
              {(agency.type === 'cong-an' || agency.slug === 'cong-an') && (
                <div style={{
                  marginTop: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <span style={{ display: 'inline-block', backgroundColor: '#1877f2', color: '#fff', borderRadius: '50%', width: '15px', height: '15px', fontSize: '9px', textAlign: 'center', lineHeight: '15px', fontWeight: '900' }}>✓</span>
                    <strong style={{ fontSize: '13px', color: '#1e40af' }}>Kênh Tiếp Nhận & Tích Xanh Chính Thức:</strong>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                    {agency.facebook && (
                      <a href={agency.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🔵</span>
                        <span>{agency.facebookName || 'Fanpage Công An Quản Lý Địa Bàn'} ↗</span>
                      </a>
                    )}
                    {agency.boconganFacebook && (
                      <a href={agency.boconganFacebook} target="_blank" rel="noopener noreferrer" style={{ color: '#1e40af', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🛡️</span>
                        <span>{agency.boconganName || 'Cổng Thông tin điện tử Bộ Công an'} (Tích xanh) ↗</span>
                      </a>
                    )}
                    {agency.vneidFacebook && (
                      <a href={agency.vneidFacebook} target="_blank" rel="noopener noreferrer" style={{ color: '#0369a1', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📱</span>
                        <span>{agency.vneidName || 'Trung tâm Dữ liệu quốc gia về dân cư - VNeID'} ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CỘT 2: BẢN ĐỒ SỐ VỊ TRÍ TRỤ SỞ */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🗺️</span>
                <span>Bản Đồ Số Vị Trí Trụ Sở</span>
              </h2>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803d', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>
                Tọa độ GPS: {agency.lat?.toFixed(4)}, {agency.lng?.toFixed(4)}
              </span>
            </div>

            <div style={{ height: '380px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <InteractiveWardMap
                unit={mapUnit}
                province={province}
                isProvince={false}
              />
            </div>
          </div>
        </div>

        {/* 5. BẢNG THỦ TỤC HÀNH CHÍNH THƯỜNG GẶP */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: theme.accent, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Hướng Dẫn Dịch Vụ Công
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
                Thủ Tục Hành Chính Phổ Biến Tại {agency.shortName || agency.name}
              </h3>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
              Chuẩn hóa quy trình 2026
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
            {(agency.keyProcedures || []).map((proc, pIdx) => (
              <div
                key={pIdx}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #f1f5f9',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: theme.bg,
                      color: theme.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '800',
                      flexShrink: 0
                    }}>
                      {pIdx + 1}
                    </span>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: '2px 0 8px 0', lineHeight: '1.4' }}>
                      {proc.title}
                    </h4>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px dashed #e2e8f0'
                }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Thời gian: </span>
                    <strong style={{ color: '#0f172a' }}>{proc.time}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Lệ phí: </span>
                    <strong style={{ color: '#16a34a' }}>{proc.fee}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. LIÊN KẾT CƠ QUAN ĐẦU NÃO CẤP TỈNH */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          padding: '18px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase' }}>
              Tra cứu cơ quan cấp trên
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
              Cơ Quan Đầu Não Cấp Tỉnh ({province.name})
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Xem danh bạ 5 cơ quan trung tâm: UBND Tỉnh, Công An Tỉnh, Kho Bạc Tỉnh, TAND Tỉnh, VKSND Tỉnh.
            </div>
          </div>

          <Link
            href={`/tinh-thanh/province/${province.slug}/co-quan-nha-nuoc`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '10px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '800',
              textDecoration: 'none'
            }}
          >
            <span>🏛️ Xem Cơ Quan Cấp Tỉnh</span>
            <span>→</span>
          </Link>
        </div>



      </div>
    </div>
  );
}
