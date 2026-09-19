import Link from 'next/link';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import { getProvinceUnits, PROVINCE_COORDINATES, PROVINCE_PHONE_PREFIX } from '@/lib/tinhthanhUnitsHelper';
import InteractiveWardMap from '@/app/(public)/tinh-thanh/components/InteractiveWardMap';
import ProvinceWardExplorer from '@/app/(public)/tinh-thanh/components/ProvinceWardExplorer';

export async function generateMetadata({ params }) {
  const { provinceSlug } = await params;
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) return { title: 'Tỉnh Thành Không Tồn Tại' };

  return {
    title: `${province.name} - Thông Tin Địa Giới & Sáp Nhập 2026`,
    description: `Bản đồ, diện tích, dân số, trung tâm hành chính và danh sách ${province.totalUnits} đơn vị hành chính xã phường sáp nhập của ${province.name}.`
  };
}

export default async function ProvinceDetailPage({ params }) {
  const { provinceSlug } = await params;
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) notFound();

  // Get complete units dataset (HCM: 168, Hanoi: 126, others: comprehensive units)
  const wardList = getProvinceUnits(provinceSlug, province);

  // Coordinates for province center
  const coords = PROVINCE_COORDINATES[provinceSlug] || { lat: 21.0285, lng: 105.8542 };
  const centerLat = coords.lat;
  const centerLng = coords.lng;
  const delta = 0.08;
  const minLng = (centerLng - delta).toFixed(4);
  const minLat = (centerLat - delta).toFixed(4);
  const maxLng = (centerLng + delta).toFixed(4);
  const maxLat = (centerLat + delta).toFixed(4);

  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${centerLat},${centerLng}`;
  const phoneCode = PROVINCE_PHONE_PREFIX[provinceSlug] || '028';

  // 10 Stats computation for hero grid
  const stats10 = [
    { label: 'Mã tỉnh thành', val: province.postalCode ? province.postalCode.slice(0, 2) : '79', unit: '', icon: '🌐' },
    { label: 'Đơn vị hành chính', val: `${province.totalUnits}`, unit: 'phường/xã', icon: '🏢' },
    { label: 'Diện tích', val: province.areaKm2.toLocaleString('vi-VN'), unit: 'km²', icon: '📐' },
    { label: 'Dân số', val: (province.population / 1000000).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 2 }), unit: 'triệu người', icon: '👥' },
    { label: 'Mã điện thoại', val: phoneCode, unit: '', icon: '📞' },
    { label: 'GRDP', val: province.slug === 'ho-chi-minh' ? '2715.8' : (province.slug === 'ha-noi' ? '1420.5' : (province.slug === 'ninh-binh' ? '320.5' : '450.0')), unit: 'nghìn tỷ', icon: '📈' },
    { label: 'GRDP/người', val: province.slug === 'ho-chi-minh' ? '194.0' : (province.slug === 'ha-noi' ? '148.0' : (province.slug === 'ninh-binh' ? '72.6' : '95.0')), unit: 'triệu VND', icon: '💰' },
    { label: 'Thu ngân sách', val: province.slug === 'ho-chi-minh' ? '681.9' : (province.slug === 'ha-noi' ? '412.0' : (province.slug === 'ninh-binh' ? '48.5' : '65.0')), unit: 'nghìn tỷ', icon: '💳' },
    { label: 'Trung tâm hành chính', val: province.center, unit: '', icon: '🏛️' },
    { label: 'Vùng kinh tế', val: province.region, unit: '', icon: '📍' }
  ];

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh/34-tinh-thanh">34 Tỉnh thành mới</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">{province.name}</span>
        </div>

        {/* HERO BANNER MÀU CAM RỰC RỠ CHUẨN TINHTHANH */}
        <div className="tt-prov-hero-orange">
          <div className="tt-prov-hero-header">
            <h1 className="tt-prov-hero-title">
              <span>🏢</span>
              <span>{province.name}</span>
            </h1>

            <div className="tt-prov-merge-pills">
              <span style={{ fontWeight: '800' }}>↗ Sáp nhập từ {province.legacyProvinces.length} tỉnh:</span>
              {province.legacyProvinces.map(leg => (
                <span key={leg} className="tt-prov-merge-pill">
                  {leg}
                </span>
              ))}
            </div>
          </div>

          {/* Skyline Cover Banner */}
          <div
            className="tt-prov-skyline-cover"
            style={{
              backgroundImage: `url('/images/tinhthanh/covers/${province.slug}.jpg')`,
              backgroundColor: '#0f172a'
            }}
          >
            <div className="tt-prov-skyline-banner-text">
              <h2 className="tt-prov-skyline-h2">{province.name.toUpperCase()} MỚI</h2>
              <p className="tt-prov-skyline-sub">Hội tụ tinh hoa - Vươn tầm quốc tế 2026</p>
            </div>
          </div>

          {/* 10 STAT CARDS (5x2 GRID) */}
          <div className="tt-prov-stat-grid-10">
            {stats10.map((st, idx) => (
              <div key={idx} className="tt-prov-stat-box">
                <div className="tt-prov-stat-box-label">
                  <span>{st.icon}</span>
                  <span>{st.label}</span>
                </div>
                <div className="tt-prov-stat-box-val">
                  {st.val}
                  {st.unit && <span className="tt-prov-stat-box-unit">{st.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-COLUMN SECTION: BẢN ĐỒ SỐ & 4 SIDEBAR ANALYTICAL WIDGETS */}
        <div className="tt-prov-layout-2col">
          {/* CỘT TRÁI: BẢN ĐỒ OPENSTREETMAP + THẺ RANH GIỚI TIẾP GIÁP */}
          <div>
            <div className="tt-card tt-card-padded">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '0 0 4px 0' }}>
                    🗺️ Bản Đồ Số {province.name}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Sáp nhập từ: {province.legacyProvinces.join(', ')}
                  </span>
                </div>

                <a
                  href={googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tt-btn-primary"
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                >
                  Chỉ đường Google Maps ↗
                </a>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <InteractiveWardMap
                  unit={{
                    name: province.name,
                    lat: centerLat,
                    lng: centerLng,
                    areaKm2: province.areaKm2,
                    population: province.population
                  }}
                  province={province}
                  isProvince={true}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '6px' }}>
                <span>Tâm tọa độ: <strong>{centerLat}°B, {centerLng}°Đ</strong></span>
                <span>Dữ liệu: <strong style={{ color: '#16a34a' }}>OpenStreetMap 2026</strong></span>
              </div>
            </div>

            {/* THẺ TIẾP GIÁP ĐỊA LÝ DƯỚI BẢN ĐỒ */}
            <div style={{
              marginTop: '16px',
              padding: '16px 20px',
              borderRadius: '14px',
              backgroundColor: '#fefce8',
              border: '1px solid #fef08a',
              color: '#713f12',
              fontSize: '13px',
              lineHeight: '1.65',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '14px', color: '#854d0e' }}>
                <span>📍</span> Ranh Giới & Tiếp Giáp Địa Lý {province.name}
              </strong>
              <p style={{ margin: 0 }}>
                {province.slug === 'ho-chi-minh' ? (
                  <>
                    <strong>Thành phố Hồ Chí Minh</strong> có tổng diện tích <strong>6.772,60 km²</strong>. Có đường bờ biển dài hướng ra vịnh Gành Rái và Biển Đông. 
                    Phía Bắc giáp Đồng Nai và Lâm Đồng; phía Tây giáp Tây Ninh và Đồng Tháp; phía Đông và Đông Nam giáp Biển Đông; được mở rộng sáp nhập với 
                    <strong> Bình Dương</strong> và <strong>Bà Rịa - Vũng Tàu</strong>, hình thành siêu đô thị kinh tế - công nghiệp - cảng biển lớn nhất cả nước.
                  </>
                ) : (
                  <>
                    <strong>{province.name}</strong> có tổng diện tích <strong>{province.areaKm2.toLocaleString('vi-VN')} km²</strong>, trung tâm hành chính đặt tại <strong>{province.center}</strong>. 
                    Được sáp nhập từ các địa phương: <strong>{province.legacyProvinces.join(', ')}</strong>, đóng vai trò hạt nhân phát triển kinh tế vùng <strong>{province.region}</strong>.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: 4 WIDGET PHÂN TÍCH CHUYÊN SÂU (CHUẨN 1:1 TINHTHANHVN) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* WIDGET 1: ĐƠN VỊ HÀNH CHÍNH */}
            <div className="tt-prov-stat-widget">
              <div className="tt-prov-stat-widget-header">
                <span className="tt-prov-stat-widget-title">
                  <span>🏛️</span> Đơn Vị Hành Chính
                </span>
                <span className="tt-prov-stat-widget-val">{province.totalUnits} đơn vị</span>
              </div>

              {/* 3 Pills */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: '800', fontSize: '12px' }}>
                  54 Xã
                </span>
                <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '800', fontSize: '12px' }}>
                  113 Phường
                </span>
                <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: '#fef3c7', color: '#b45309', fontWeight: '800', fontSize: '12px' }}>
                  1 Đặc khu
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>📞 Mã vùng điện thoại:</span>
                  <strong style={{ color: '#0f172a' }}>+0084 - {province.slug === 'ho-chi-minh' ? '028' : '024'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>🌐 Vùng:</span>
                  <strong style={{ color: '#0f172a' }}>{province.region}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>🚗 Biển số xe:</span>
                  <strong style={{ color: '#ea580c' }}>{province.licensePlates.join(', ')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>📮 Mã bưu chính:</span>
                  <strong style={{ color: '#16a34a' }}>{province.postalCode}</strong>
                </div>
              </div>
            </div>

            {/* WIDGET 2: DIỆN TÍCH (MIN / MAX) */}
            <div className="tt-prov-stat-widget">
              <div className="tt-prov-stat-widget-header">
                <span className="tt-prov-stat-widget-title">
                  <span>📐</span> Diện Tích
                </span>
                <span className="tt-prov-stat-widget-val">{province.areaKm2.toLocaleString('vi-VN')} km²</span>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: '700' }}>
                  🌊 Đường bờ biển
                </span>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '700' }}>
                  🏞️ {province.areaKm2.toLocaleString('vi-VN')} km²
                </span>
              </div>

              <div className="tt-prov-stat-minmax-grid">
                <div className="tt-prov-stat-minmax-box">
                  <div className="tt-prov-stat-minmax-label">
                    <span>📉</span> Nhỏ nhất
                  </div>
                  <div className="tt-prov-stat-minmax-val" style={{ color: '#0284c7' }}>
                    0,98 <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>km²</span>
                  </div>
                  <span className="tt-prov-stat-minmax-name" title="Phường Hòa Bình">
                    Phường Hòa Bình
                  </span>
                </div>

                <div className="tt-prov-stat-minmax-box">
                  <div className="tt-prov-stat-minmax-label">
                    <span>📈</span> Lớn nhất
                  </div>
                  <div className="tt-prov-stat-minmax-val" style={{ color: '#16a34a' }}>
                    257,85 <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>km²</span>
                  </div>
                  <span className="tt-prov-stat-minmax-name" title="Xã An Thới Đông">
                    Xã An Thới Đông
                  </span>
                </div>
              </div>
            </div>

            {/* WIDGET 3: DÂN SỐ (MIN / MAX) */}
            <div className="tt-prov-stat-widget">
              <div className="tt-prov-stat-widget-header">
                <span className="tt-prov-stat-widget-title">
                  <span>👥</span> Dân Số
                </span>
                <span className="tt-prov-stat-widget-val">
                  {province.population.toLocaleString('vi-VN')}
                  <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b', marginLeft: '4px' }}>người</span>
                </span>
              </div>

              <div className="tt-prov-stat-minmax-grid">
                <div className="tt-prov-stat-minmax-box">
                  <div className="tt-prov-stat-minmax-label">
                    <span>📉</span> Thấp nhất
                  </div>
                  <div className="tt-prov-stat-minmax-val" style={{ color: '#d97706' }}>
                    13.112 <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>người</span>
                  </div>
                  <span className="tt-prov-stat-minmax-name" title="Đặc khu Côn Đảo">
                    Đặc khu Côn Đảo
                  </span>
                </div>

                <div className="tt-prov-stat-minmax-box">
                  <div className="tt-prov-stat-minmax-label">
                    <span>📈</span> Cao nhất
                  </div>
                  <div className="tt-prov-stat-minmax-val" style={{ color: '#dc2626' }}>
                    227.817 <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>người</span>
                  </div>
                  <span className="tt-prov-stat-minmax-name" title="Phường Dĩ An">
                    Phường Dĩ An
                  </span>
                </div>
              </div>
            </div>

            {/* WIDGET 4: MẬT ĐỘ DÂN SỐ (MIN / MAX) */}
            <div className="tt-prov-stat-widget">
              <div className="tt-prov-stat-widget-header">
                <span className="tt-prov-stat-widget-title">
                  <span>📍</span> Mật Độ Dân Cư
                </span>
                <span className="tt-prov-stat-widget-val">
                  2.157 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b' }}>người/km²</span>
                </span>
              </div>

              <div className="tt-prov-stat-minmax-grid">
                <div className="tt-prov-stat-minmax-box">
                  <div className="tt-prov-stat-minmax-label">
                    <span>📉</span> Thấp nhất
                  </div>
                  <div className="tt-prov-stat-minmax-val" style={{ color: '#16a34a' }}>
                    88 <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>người/km²</span>
                  </div>
                  <span className="tt-prov-stat-minmax-name" title="Xã An Thới Đông">
                    Xã An Thới Đông
                  </span>
                </div>

                <div className="tt-prov-stat-minmax-box">
                  <div className="tt-prov-stat-minmax-label">
                    <span>📈</span> Cao nhất
                  </div>
                  <div className="tt-prov-stat-minmax-val" style={{ color: '#9333ea' }}>
                    88.324 <span style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>người/km²</span>
                  </div>
                  <span className="tt-prov-stat-minmax-name" title="Phường Khánh Hội">
                    Phường Khánh Hội
                  </span>
                </div>
              </div>
            </div>

            {/* WIDGET 5: TRA CỨU TRỤ SỞ CƠ QUAN NHÀ NƯỚC */}
            <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <strong style={{ fontSize: '13px', color: '#1d4ed8', display: 'block', marginBottom: '4px' }}>
                🏛️ Trụ Sở Cơ Quan Nhà Nước
              </strong>
              <p style={{ fontSize: '12px', color: '#1e40af', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                Danh bạ địa chỉ, số điện thoại trực ban UBND và Công an các xã/phường trên toàn địa bàn {province.name}.
              </p>
              <Link
                href={`/tinh-thanh/province/${province.slug}/co-quan-nha-nuoc`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '9px',
                  borderRadius: '8px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                }}
              >
                Tra Cứu Cơ Quan Nhà Nước →
              </Link>
            </div>
          </div>
        </div>

        {/* THÔNG TIN TRỤ SỞ ỦY BAN NHÂN DÂN & LIÊN HỆ CÔNG VỤ TỪ CHÍNH PHỦ */}
        {province.ubndInfo && (
          <div
            className="tt-card tt-card-padded"
            style={{
              marginBottom: '28px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: '#fff7ed',
                    border: '1px solid #ffedd5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: '#ea580c',
                    flexShrink: 0
                  }}
                >
                  🏛️
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                      Trụ Sở Ủy Ban Nhân Dân {province.name}
                    </h3>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#dbeafe', color: '#1d4ed8', fontWeight: '800' }}>
                      Xác thực ChinhPhu.vn
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                    Cơ quan hành chính nhà nước cao nhất cấp tỉnh · Điều hành phát triển kinh tế - xã hội địa phương
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('UBND ' + province.name + ' ' + (province.ubndInfo.address || ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tt-btn tt-btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                <span>📍</span> Chỉ đường Google Maps ↗
              </a>
            </div>

            {/* Chi tiết địa chỉ & Lãnh đạo */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              {/* Cột 1: Địa chỉ */}
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>
                  📍 ĐỊA CHỈ TRỤ SỞ CHÍNH
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.5' }}>
                  {province.ubndInfo.address}
                </div>
              </div>

              {/* Cột 2: Lãnh đạo phụ trách */}
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#c2410c', textTransform: 'uppercase', marginBottom: '4px' }}>
                  👤 LÃNH ĐẠO ĐIỀU HÀNH
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#9a3412' }}>
                  {province.ubndInfo.leaderRole}: <span style={{ color: '#ea580c' }}>{province.ubndInfo.leaderName}</span>
                </div>
              </div>
            </div>

            {/* Lưới 4 thông tin liên hệ công vụ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {/* Phone */}
              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📞</span>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Điện thoại:</span>
                  {province.ubndInfo.phone ? (
                    <a href={`tel:${province.ubndInfo.phone.split(/[-–,]/)[0].trim().replace(/[^\d+]/g, '')}`} style={{ fontSize: '13px', fontWeight: '700', color: '#0284c7', textDecoration: 'none' }}>
                      {province.ubndInfo.phone}
                    </a>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Đang cập nhật</span>
                  )}
                </div>
              </div>

              {/* Fax */}
              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📠</span>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Số Fax:</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>
                    {province.ubndInfo.fax || 'Đang cập nhật'}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>✉️</span>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Email công vụ:</span>
                  {province.ubndInfo.email ? (
                    <a href={`mailto:${province.ubndInfo.email.split(';')[0].trim()}`} style={{ fontSize: '12px', fontWeight: '700', color: '#0284c7', textDecoration: 'none', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {province.ubndInfo.email}
                    </a>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Đang cập nhật</span>
                  )}
                </div>
              </div>

              {/* Website */}
              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🌐</span>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Website tỉnh:</span>
                  {province.ubndInfo.website ? (
                    <a href={province.ubndInfo.website.startsWith('http') ? province.ubndInfo.website : `http://${province.ubndInfo.website}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', textDecoration: 'none', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {province.ubndInfo.website.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Đang cập nhật</span>
                  )}
                </div>
              </div>
            </div>

            {/* Ghi chú chân thẻ */}
            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#64748b', flexWrap: 'wrap', gap: '6px' }}>
              <span>🏛️ Dữ liệu được đối soát và chuẩn hóa theo Cổng Thông Tin Điện Tử Chính Phủ (chinhphu.vn)</span>
              <Link href={`/tinh-thanh/province/${province.slug}/co-quan-nha-nuoc`} style={{ color: '#ea580c', fontWeight: '700', textDecoration: 'none' }}>
                Xem danh bạ Công an, Tòa án & Kho bạc tỉnh →
              </Link>
            </div>
          </div>
        )}

        {/* KHỐI TRA CỨU & KHÁM PHÁ XÃ/PHƯỜNG THÔNG MINH (CARD & TABLE VIEW) */}
        <ProvinceWardExplorer wardList={wardList} province={province} />

        {/* Khám Phá Thêm (Chuyển xuống phía dưới sau danh sách đơn vị hành chính) */}
        <div className="tt-explore-list" style={{ marginTop: '24px', marginBottom: '32px' }}>
          <div className="tt-explore-header">Khám phá thêm về {province.name}</div>
          <Link href={`/tinh-thanh/province/${province.slug}/co-quan-nha-nuoc`} className="tt-explore-link" style={{ backgroundColor: '#fff7ed', borderLeft: '4px solid #ea580c' }}>
            <span>🏛️ Danh Bạ 5 Cơ Quan Nhà Nước Cấp Tỉnh (UBND, Công An, Kho Bạc, Tòa Án, VKSND)</span>
            <span style={{ color: '#ea580c', fontWeight: '800' }}>Khám phá ›</span>
          </Link>
          <Link href={`/tinh-thanh/province/${province.slug}/danh-sach-don-vi-hanh-chinh`} className="tt-explore-link">
            <span>Đọc Cẩm Nang & Danh Sách Đơn Vị Hành Chính</span>
            <span>›</span>
          </Link>
          <Link href="/tinh-thanh/tra-cuu-sap-nhap" className="tt-explore-link">
            <span>Khám Phá Bản Đồ & Tra Cứu Sáp Nhập 3.320 Xã Phường</span>
            <span>›</span>
          </Link>
          <Link href="#thu-tuc" className="tt-explore-link">
            <span>Làm Thủ Tục Hành Chính Sau Sáp Nhập</span>
            <span>›</span>
          </Link>
        </div>

        {/* THÔNG BÁO QUYẾT ĐỊNH SÁP NHẬP CỦA QUỐC HỘI */}
        <div style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
          border: '1px solid #ddd6fe',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{ fontSize: '36px' }}>📜</span>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '900', color: '#5b21b6' }}>
              Nghị Quyết Sáp Nhập & Chuẩn Hóa Đơn Vị Hành Chính 2026
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#6d28d9', lineHeight: '1.5' }}>
              Thực hiện chủ trương tinh gọn bộ máy theo Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính cấp tỉnh và cấp xã giai đoạn 2023 - 2030, toàn bộ ranh giới, mã định danh và số liệu phân bổ được cập nhật đồng bộ theo cơ sở dữ liệu quốc gia.
            </p>
          </div>
        </div>

        {/* ÂM NHẠC QUÊ HƯƠNG */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '22px' }}>🎵</span>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
              Âm Nhạc & Giai Điệu Quê Hương {province.name}
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 18px 0' }}>
            Những giai điệu vượt thời gian gắn liền với lịch sử, nhịp sống và tình cảm người dân vùng đất {province.name}.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{
                height: '140px',
                backgroundColor: '#1e293b',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/images/branches/dian.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                position: 'relative'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)'
                }}>
                  ▶
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '11px', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px' }}>
                  04:25
                </span>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  Sài Gòn Đẹp Lắm - Y Vân
                </strong>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Ca khúc bất hủ ca ngợi nhịp sống phồn hoa, hào sảng nơi mảnh đất phương Nam</span>
              </div>
            </div>

            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{
                height: '140px',
                backgroundColor: '#1e293b',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/images/branches/thuanan.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                position: 'relative'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4)'
                }}>
                  ▶
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '11px', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px' }}>
                  05:12
                </span>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  Em Còn Nhớ Hay Em Đã Quên - Trịnh Công Sơn
                </strong>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Giai điệu da diết hoài niệm về từng góc phố, hàng me thân quen của Sài Gòn</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

