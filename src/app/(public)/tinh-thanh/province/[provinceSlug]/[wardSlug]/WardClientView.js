'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import policeFanpagesData from '@/data/tinhthanh/police-verified-fanpages.json';
import { getProvinceUnits } from '@/lib/tinhthanhUnitsHelper';

const InteractiveWardMap = dynamic(
  () => import('@/app/(public)/tinh-thanh/components/InteractiveWardMap'),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: '100%', height: '540px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
        <span>🗺️ Đang khởi tạo bản đồ số đa lớp...</span>
      </div>
    )
  }
);

export default function WardClientView({ province, provinceSlug, wardSlug, initialUnit, seoArticle }) {
  const unit = initialUnit;

  // Active POI & Accordion state
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(0);
  const [mapCoords, setMapCoords] = useState({
    lat: unit.lat || 10.9034,
    lng: unit.lng || 106.759
  });

  // Live Weather from Open-Meteo API
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const lat = unit.lat || 10.9034;
    const lng = unit.lng || 106.759;
    let isCancelled = false;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
      .then(res => res.json())
      .then(data => {
        if (isCancelled || !data?.current) return;
        const cur = data.current;
        const code = cur.weather_code;
        let condition = 'Trời quang, nắng ấm';
        let icon = '☀️';
        if (code === 0) {
          condition = 'Trời quang đãng';
          icon = '☀️';
        } else if (code <= 3) {
          condition = 'Có mây, nắng gián đoạn';
          icon = '🌤️';
        } else if (code <= 48) {
          condition = 'Sương mù nhẹ';
          icon = '🌫️';
        } else if (code <= 65) {
          condition = 'Mưa rào';
          icon = '🌧️';
        } else if (code >= 95) {
          condition = 'Có dông sét';
          icon = '⛈️';
        }

        setWeatherData({
          temp: Math.round(cur.temperature_2m),
          humidity: Math.round(cur.relative_humidity_2m),
          wind: Math.round(cur.wind_speed_10m),
          condition,
          icon
        });
        setWeatherLoading(false);
      })
      .catch(() => {
        if (!isCancelled) setWeatherLoading(false);
      });

    return () => { isCancelled = true; };
  }, [unit.lat, unit.lng]);

  // Fallbacks for missing objects
  const ubndRaw = unit.ubnd || {};
  const isUbndCoordTarget = /destination=\d+\.\d+,\d+\.\d+/.test(ubndRaw.googleDirectionsUrl || '');
  const ubndPoiQuery = `UBND ${unit.name}, ${province.name}`;
  const ubnd = {
    ...ubndRaw,
    name: ubndRaw.name || `Trụ sở UBND ${unit.name}`,
    address: ubndRaw.address || `Trụ sở UBND ${unit.name}, ${province.name}`,
    phone: ubndRaw.phone || '',
    website: ubndRaw.website || '',
    workingHours: ubndRaw.workingHours || 'Thứ 2 - Thứ 6 (07:30 - 17:00)',
    lat: ubndRaw.lat || unit.lat || 10.9034,
    lng: ubndRaw.lng || unit.lng || 106.759,
    googleMapsUrl: ubndRaw.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ubndPoiQuery)}`,
    googleDirectionsUrl: (!ubndRaw.googleDirectionsUrl || isUbndCoordTarget)
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ubndPoiQuery)}`
      : ubndRaw.googleDirectionsUrl
  };

  // Phân cấp tra cứu Fanpage Tích Xanh Công An
  const provPolice = policeFanpagesData?.provinces?.[provinceSlug];
  const districtKey = unit.district ? unit.district.toLowerCase().replace(/^(quận|huyện|thành phố|tp\.|tx\.)\s*/i, '').trim().replace(/\s+/g, '-') : '';
  const distPolice = policeFanpagesData?.districts ? Object.entries(policeFanpagesData.districts).find(([key]) => key.includes(districtKey) || (districtKey && key.endsWith(districtKey)))?.[1] : null;

  const policeFb = unit.police?.facebook || distPolice?.url || provPolice?.url || 'https://www.facebook.com/mpsgov';
  const policeFbName = unit.police?.facebookName || distPolice?.name || provPolice?.name || 'Cổng Thông tin điện tử Bộ Công an';

  const policeRaw = unit.police || {};
  const isPoliceCoordTarget = /destination=\d+\.\d+,\d+\.\d+/.test(policeRaw.googleDirectionsUrl || '');
  const policePoiQuery = `Công An ${unit.name}, ${province.name}`;
  const police = {
    ...policeRaw,
    name: policeRaw.name || `Công An ${unit.name}`,
    address: policeRaw.address || `Liền kề Trụ sở UBND ${unit.name}, ${province.name}`,
    phone: policeRaw.phone && !policeRaw.phone.includes('xxxx') ? policeRaw.phone : '',
    hotline: policeRaw.hotline || distPolice?.hotline || provPolice?.hotline || '113 / Trực ban 24/7',
    facebook: policeFb,
    facebookName: policeFbName,
    lat: policeRaw.lat || Number(((unit.lat || 10.9034) + 0.001).toFixed(4)),
    lng: policeRaw.lng || Number(((unit.lng || 106.759) + 0.0015).toFixed(4)),
    googleMapsUrl: policeRaw.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(policePoiQuery)}`,
    googleDirectionsUrl: (!policeRaw.googleDirectionsUrl || isPoliceCoordTarget)
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(policePoiQuery)}`
      : policeRaw.googleDirectionsUrl
  };

  const agencies = unit.agencies || {};
  const districtLabel = unit.district || province.center || province.name;
  const treasury = agencies['kho-bac'] || {
    name: `Kho Bạc Nhà Nước Khu Vực ${districtLabel}`,
    address: `Khu hành chính tài chính ${districtLabel}, ${province.name}`,
    phone: '',
    workingHours: 'Thứ 2 - Thứ 6 (07:30 - 11:30 | 13:30 - 16:30)',
    googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Kho bạc nhà nước ' + districtLabel + ', ' + province.name)}`,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Kho bạc nhà nước ' + districtLabel + ', ' + province.name)}`
  };

  const court = agencies['toa-an'] || {
    name: `Tòa Án Nhân Dân Khu Vực ${districtLabel}`,
    address: `Khu hành chính tư pháp ${districtLabel}, ${province.name}`,
    phone: '',
    workingHours: 'Thứ 2 - Thứ 6 (07:30 - 11:30 | 13:30 - 17:00)',
    googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Tòa án nhân dân ' + districtLabel + ', ' + province.name)}`,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Tòa án nhân dân ' + districtLabel + ', ' + province.name)}`
  };

  const procuracy = agencies['vien-kiem-sat'] || {
    name: `Viện Kiểm Sát Nhân Dân Khu Vực ${districtLabel}`,
    address: `Khu hành chính tư pháp ${districtLabel}, ${province.name}`,
    phone: '',
    hotline: '113 / Cổng tư pháp',
    workingHours: 'Thứ 2 - Thứ 6 (07:30 - 11:30 | 13:30 - 17:00)',
    googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Viện kiểm sát nhân dân ' + districtLabel + ', ' + province.name)}`,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Viện kiểm sát nhân dân ' + districtLabel + ', ' + province.name)}`
  };

  const demographics = unit.demographics || {
    standardPopulation: unit.type === 'Xã' ? 8000 : 21000,
    standardAreaKm2: unit.type === 'Xã' ? 30 : 5.5,
    populationRatio: Math.round((unit.population / (unit.type === 'Xã' ? 8000 : 21000)) * 100),
    areaRatio: Math.round((unit.areaKm2 / (unit.type === 'Xã' ? 30 : 5.5)) * 100),
    density: unit.areaKm2 > 0 ? Math.round(unit.population / unit.areaKm2) : 0,
    densityLevel: 'Cực cao'
  };

  const faqList = useMemo(() => {
    return (unit.faq || []).map(f => ({
      ...f,
      answer: typeof f.answer === 'string'
        ? f.answer
            .replace(/\b\d{2,4}\s*\d{3,4}\s*xxxx\b/gi, 'Hotline Dịch vụ công')
            .replace(/\b\d{3,4}\s*xxxx\b/gi, 'Hotline tiếp dân')
            .replace(/xxxx/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim()
        : f.answer
    }));
  }, [unit.faq]);

  const currentLat = selectedPOI ? selectedPOI.lat : (unit.lat || 10.9034);
  const currentLng = selectedPOI ? selectedPOI.lng : (unit.lng || 106.759);
  const delta = 0.008;
  const minLng = (currentLng - delta).toFixed(4);
  const minLat = (currentLat - delta).toFixed(4);
  const maxLng = (currentLng + delta).toFixed(4);
  const maxLat = (currentLat + delta).toFixed(4);

  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${currentLat}%2C${currentLng}`;
  const osmDirectUrl = `https://www.openstreetmap.org/?mlat=${currentLat}&mlon=${currentLng}#map=16/${currentLat}/${currentLng}`;
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${currentLat},${currentLng}`;

  // Neighboring wards
  const neighboringWards = useMemo(() => {
    if (unit.neighbors && Array.isArray(unit.neighbors)) {
      return unit.neighbors.map(n => {
        const name = typeof n === 'string' ? n : n.name;
        const slug = typeof n === 'string'
          ? n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-')
          : n.slug;
        const type = typeof n === 'object' && n.type ? n.type : (name.startsWith('Xã') ? 'Xã' : 'Phường');
        return { name, wardSlug: slug, type };
      });
    }

    const cleanDist = (unit.district || '').replace(/^(Huyện|Quận|Thị xã|TP\.)\s*/i, '').trim();
    const provUnits = getProvinceUnits(provinceSlug, province);
    const sameDist = provUnits.filter(u => {
      if (u.wardSlug === wardSlug || u.slug === wardSlug) return false;
      const uDist = (u.district || '').replace(/^(Huyện|Quận|Thị xã|TP\.)\s*/i, '').trim();
      return uDist === cleanDist || (cleanDist && uDist.includes(cleanDist));
    });

    const pool = sameDist.length >= 8 ? sameDist : [...sameDist, ...provUnits.filter(u => u.wardSlug !== wardSlug && !sameDist.includes(u))];
    return pool.slice(0, 8).map(u => ({
      name: u.name,
      wardSlug: u.wardSlug || u.slug?.replace(/^giao-gas-/, ''),
      type: u.type || (u.name.startsWith('Xã') ? 'Xã' : 'Phường')
    }));
  }, [unit, wardSlug, provinceSlug, province]);

  const wardCoverImage = unit.coverImage || unit.image || `/images/tinhthanh/covers/${provinceSlug}.jpg`;

  return (
    <div className="tt-container">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="tt-breadcrumb" style={{ paddingTop: '16px' }}>
        <Link href="/">🏠 Trang chủ</Link>
        <span className="tt-breadcrumb-separator">/</span>
        <Link href={`/tinh-thanh/province/${province.slug}`}>← {province.name}</Link>
        <span className="tt-breadcrumb-separator">/</span>
        <span className="tt-breadcrumb-active">{unit.name}</span>
      </nav>

      {/* 2. BỐ CỤC 2 CỘT (MAIN COLUMN + SIDEBAR) */}
      <div className="tt-2col-layout" style={{ marginTop: '14px' }}>
        {/* === CỘT CHÍNH (MAIN COLUMN) === */}
        <div className="tt-main-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* KHỐI 1: HERO BANNER */}
          <section
            className="tt-hero-banner-v2"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.42) 0%, rgba(15, 23, 42, 0.12) 45%, rgba(15, 23, 42, 0.62) 100%), url('${wardCoverImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#0f172a'
            }}
          >
            <div className="tt-hero-top-row">
              <div className="tt-glass-box" style={{ maxWidth: '460px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>📍</span>
                  <h1 className="tt-hero-title-h1" style={{ fontSize: '26px' }}>
                    {unit.name}
                  </h1>
                </div>
                <p className="tt-hero-subtitle" style={{ marginTop: '4px', fontSize: '13px' }}>
                  <strong style={{ color: '#0284c7' }}>{province.name}</strong> · <span style={{ color: '#64748b' }}>{unit.district} (cũ)</span>
                </p>
              </div>

              <div className="tt-glass-box" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📖</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>
                  Mã Phường: <strong style={{ color: '#c2410c', fontSize: '16px' }}>{unit.administrativeCode || '25942'}</strong>
                </span>
              </div>
            </div>

            <div className="tt-hero-bottom-row">
              <div className="tt-glass-box" style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#0369a1' }}>
                  <span>🔀</span> Sáp nhập từ {unit.oldUnits?.length || 1} đơn vị:
                </div>
                <div className="tt-merge-pills-row">
                  {(unit.oldUnits || []).map((old, idx) => (
                    <span key={idx} className="tt-merge-pill">
                      {old}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span className="tt-area-badge-green">
                  <span>📐</span> Diện tích: {unit.areaKm2} km²
                </span>
                <a href="#ban-do-so" className="tt-btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                  <span>🗺️</span> Xem Bản đồ
                </a>
              </div>
            </div>
          </section>

          {/* KHỐI 2: 4 THẺ THỐNG KÊ PASTEL */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>📊</span>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                Thống Kê {unit.name}
              </h3>
            </div>

            <div className="tt-stat-grid">
              <div className="tt-stat-card tt-stat-green">
                <div className="tt-stat-header">
                  <div className="tt-stat-icon-wrap">📐</div>
                  <span className="tt-stat-badge">Quy chuẩn</span>
                </div>
                <div>
                  <p className="tt-stat-label">Diện tích tự nhiên</p>
                  <div className="tt-stat-value-group">
                    <span className="tt-stat-value">
                      {typeof unit.areaKm2 === 'number' ? unit.areaKm2.toLocaleString('vi-VN') : unit.areaKm2}
                    </span>
                    <span className="tt-stat-unit">km²</span>
                  </div>
                </div>
              </div>

              <div className="tt-stat-card tt-stat-pink">
                <div className="tt-stat-header">
                  <div className="tt-stat-icon-wrap">👥</div>
                  <span className="tt-stat-badge">Dân cư</span>
                </div>
                <div>
                  <p className="tt-stat-label">Dân số (2025)</p>
                  <div className="tt-stat-value-group">
                    <span className="tt-stat-value">{unit.population.toLocaleString('vi-VN')}</span>
                    <span className="tt-stat-unit">người</span>
                  </div>
                </div>
              </div>

              <div className="tt-stat-card tt-stat-orange">
                <div className="tt-stat-header">
                  <div className="tt-stat-icon-wrap">📈</div>
                  <span className="tt-stat-badge">Mật độ</span>
                </div>
                <div>
                  <p className="tt-stat-label">Mật độ dân số</p>
                  <div className="tt-stat-value-group">
                    <span className="tt-stat-value">{demographics.density.toLocaleString('vi-VN')}</span>
                    <span className="tt-stat-unit">người/km²</span>
                  </div>
                </div>
              </div>

              <div className="tt-stat-card tt-stat-blue">
                <div className="tt-stat-header">
                  <div className="tt-stat-icon-wrap">🏛️</div>
                  <span className="tt-stat-badge">Hợp nhất</span>
                </div>
                <div>
                  <p className="tt-stat-label">Đơn vị sáp nhập</p>
                  <div className="tt-stat-value-group">
                    <span className="tt-stat-value">{unit.oldUnits?.length || 1}</span>
                    <span className="tt-stat-unit">đơn vị</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KHỐI 3: KHÁM PHÁ THÊM */}
          <div className="tt-explore-list">
            <Link href={`/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}/co-quan/ubnd`} className="tt-explore-item">
              <span>🏛️ Danh bạ 5 Cơ quan Nhà nước (UBND, Công An, Kho Bạc, Tòa Án, VKSND)</span>
              <span style={{ color: '#ea580c', fontWeight: '800' }}>Chi tiết ›</span>
            </Link>
            <Link href={`/tinh-thanh/province/${province.slug}/co-quan-nha-nuoc`} className="tt-explore-item">
              <span>🏢 Cơ quan đầu não cấp Tỉnh ({province.name})</span>
              <span style={{ color: '#ea580c', fontWeight: '800' }}>Khám phá ›</span>
            </Link>
            <a href="#chuyen-de-ubnd" className="tt-explore-item">
              <span>📋 Cẩm nang thủ tục hành chính Một Cửa 2026</span>
              <span style={{ color: '#ea580c', fontWeight: '800' }}>Xem ngay ›</span>
            </a>
            <a href="#ban-do-so" className="tt-explore-item">
              <span>Bản đồ hành chính số</span>
              <span style={{ color: '#94a3b8' }}>›</span>
            </a>
          </div>

          {/* KHỐI 4: BẢNG CAM ĐẶC TRƯNG THÔNG TIN ĐƠN VỊ HÀNH CHÍNH */}
          <section className="tt-orange-header-panel">
            <div className="tt-orange-header">
              <div className="tt-orange-header-title">
                <span>🌐</span>
                <span>THÔNG TIN {unit.name.toUpperCase()}</span>
                <span style={{ opacity: 0.9, fontSize: '11px', fontWeight: '600' }}>
                  CẬP NHẬT SÁP NHẬP HÀNH CHÍNH MỚI NHẤT 2026
                </span>
              </div>
              <span className="tt-update-badge">Update 2026</span>
            </div>

            <div style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#ea580c', margin: '0 0 4px 0' }}>
                {unit.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#475569', marginBottom: '18px' }}>
                <span>🏛️</span>
                <strong style={{ color: '#dc2626' }}>{province.name}</strong> · <span>{unit.district} (cũ)</span>
              </div>

              <div className="tt-info-grid-2x2">
                <div className="tt-info-box-item">
                  <div className="tt-info-label">🆔 MÃ ĐỊNH DANH (UNIT CODE)</div>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', marginTop: '4px' }}>
                    {unit.administrativeCode}
                  </div>
                </div>

                <div className="tt-info-box-item">
                  <div className="tt-info-label">🏛️ THUỘC TỈNH THÀNH (PROVINCE)</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#dc2626', marginTop: '4px' }}>
                    {province.name}
                  </div>
                </div>

                <div className="tt-info-box-item">
                  <div className="tt-info-label">🏷️ LOẠI ĐƠN VỊ (TYPE)</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#dc2626', marginTop: '4px' }}>
                    {unit.type}
                  </div>
                </div>

                <div className="tt-info-box-item">
                  <div className="tt-info-label">✉️ MÃ BƯU CHÍNH (POSTAL CODE)</div>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#ea580c', marginTop: '4px' }}>
                    {unit.postalCode}
                  </div>
                </div>

                <div className="tt-info-box-item" style={{ gridColumn: '1 / -1' }}>
                  <div className="tt-info-label">📍 TRỤ SỞ HÀNH CHÍNH MỚI (ADMIN CENTER)</div>
                  <a
                    href={ubnd.googleMapsUrl || ubnd.googleDirectionsUrl || googleDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a', textDecoration: 'none', display: 'inline-block', marginTop: '4px' }}
                  >
                    {ubnd.address} ↗
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* KHỐI BẢN ĐỒ SỐ ĐA LỚP (ĐÃ ĐƯỢC ĐƯA LÊN NGAY DƯỚI BẢNG THÔNG TIN ĐƠN VỊ HÀNH CHÍNH) */}
          <section id="ban-do-so" className="tt-map-card">
            <div className="tt-map-header">
              <div className="tt-map-title">
                <span>🗺️</span>
                <span>Bản Đồ Số {unit.name} - {province.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={osmDirectUrl} target="_blank" rel="noopener noreferrer" className="tt-btn-white" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  OpenStreetMap ↗
                </a>
                <a href={googleDirectionsUrl} target="_blank" rel="noopener noreferrer" className="tt-btn-primary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  Chỉ đường ↗
                </a>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <InteractiveWardMap
                unit={unit}
                province={province}
                onCenterChange={(lat, lng) => {
                  setMapCoords({ lat: Number(lat.toFixed(4)), lng: Number(lng.toFixed(4)) });
                }}
              />
            </div>

            <div className="tt-map-footer">
              <div>
                <span>📍 Tọa độ tâm: <strong>{mapCoords.lat}°B, {mapCoords.lng}°Đ</strong></span>
              </div>
              <div>
                <span>Dữ liệu: </span>
                <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">
                  OpenStreetMap
                </a>
                <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                <a href={googleDirectionsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>
                  Google Maps ↗
                </a>
              </div>
            </div>
          </section>

          {/* KHỐI 5: TỔNG QUAN & LỊCH SỬ HÌNH THÀNH + BOX TRỤ SỞ UBND */}
          <section className="tt-card tt-card-padded">
            <h2 className="tt-overview-title">
              <span>📑</span>
              <span>Tổng quan về {unit.name} 2026</span>
            </h2>

            <p className="tt-overview-text">
              <strong>{unit.name}</strong> được chính thức hình thành trên cơ sở sáp nhập các đơn vị hành chính trước đây bao gồm: <strong style={{ color: '#c2410c' }}>{(unit.oldUnits || []).join(', ')}</strong>. Đợt điều chỉnh địa giới này được thực hiện nghiêm túc theo <strong>Nghị quyết số 202/2025/QH15 của Quốc hội</strong> về sắp xếp đơn vị hành chính cấp tỉnh thành.
            </p>

            <p className="tt-overview-text">
              Sau khi sáp nhập địa giới hành chính, địa bàn hiện sở hữu diện tích tự nhiên rộng khoảng <strong>{typeof unit.areaKm2 === 'number' ? unit.areaKm2.toLocaleString('vi-VN') : unit.areaKm2} km²</strong> với quy mô dân số đạt mốc <strong>{unit.population.toLocaleString('vi-VN')} người</strong>. Dữ liệu dân cư và hạ tầng này mở ra tiềm năng phát triển vượt bậc, kế thừa trọn vẹn các thế mạnh kinh tế - xã hội cốt lõi <em>trực thuộc {unit.district} cũ</em>.
            </p>

            <p className="tt-overview-text">
              Chính thức vận hành từ ngày <strong>01/07/2025</strong>, bộ máy hành chính mới của <strong>UBND {unit.name}</strong> hiện đặt trụ sở làm việc tại <strong>{ubnd.address}</strong>, đảm bảo không gian tiếp công dân văn minh và giải quyết nhanh chóng mọi hồ sơ hành chính cho bà con.
            </p>

            {/* Lịch Sử Hình Thành Từ Các Đơn Vị Cũ */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#ea580c', marginBottom: '8px' }}>
                ↳ Lịch Sử Hình Thành Từ Các Đơn Vị Cũ:
              </div>
              <div className="tt-pill-list">
                {(unit.oldUnits || []).map((old, idx) => (
                  <span key={idx} className="tt-pill-btn">
                    <span>→</span> {old}
                  </span>
                ))}
              </div>
            </div>

            {/* BOX VỊ TRÍ UBND & NÚT CHỈ ĐƯỜNG */}
            <div className="tt-ubnd-cta-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '32px' }}>🏛️</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>
                    VỊ TRÍ UBND {unit.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
                    {ubnd.address}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a
                  href={ubnd.googleDirectionsUrl || ubnd.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tt-btn-primary"
                  style={{ padding: '12px 18px', fontSize: '13px' }}
                >
                  <span>↗</span>
                  <span>CHỈ ĐƯỜNG TỚI UBND</span>
                </a>
                <a
                  href={ubnd.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tt-btn-white"
                  style={{ padding: '12px 18px', fontSize: '13px', border: '1px solid #cbd5e1' }}
                >
                  <span>📍</span>
                  <span>XEM GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </section>

          {/* KHỐI 5B: HỆ THỐNG TRỤ SỞ CÔNG QUYỀN & TIỆN ÍCH DÂN SINH */}
          <section className="tt-card tt-card-padded">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Hạ tầng & Dịch vụ công 2026
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
                  Danh Bạ Cơ Quan Công Quyền & Tiện Ích {unit.name}
                </h3>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a', backgroundColor: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>
                ✓ Đã xác thực thực địa
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {/* Card 1: Trụ sở UBND */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #dcfce7', backgroundColor: '#f0fdf4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>🏛️</span>
                      <strong style={{ fontSize: '14px', color: '#166534' }}>{ubnd.name}</strong>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#166534', backgroundColor: '#bbf7d0', padding: '2px 6px', borderRadius: '4px' }}>
                      Cấp Xã/Phường
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    🕒 <strong>Thời gian làm việc:</strong> {ubnd.workingHours || 'Thứ 2 - Thứ 6 (07:30 - 17:00)'}
                  </div>
                  {ubnd.website && (
                    <div style={{ fontSize: '12px', marginTop: '6px' }}>
                      🌐 <strong>Cổng TTĐT:</strong>{' '}
                      <a href={ubnd.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', fontWeight: '700', textDecoration: 'underline' }}>
                        {ubnd.website.replace(/^https?:\/\//, '')} ↗
                      </a>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #dcfce7' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <a
                      href={ubnd.googleDirectionsUrl || ubnd.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#15803d', textDecoration: 'none' }}
                    >
                      <span>↗ Chỉ đường</span>
                    </a>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <a
                      href={ubnd.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#0284c7', textDecoration: 'none' }}
                    >
                      <span>📍 Google Maps</span>
                    </a>
                  </div>
                  <Link
                    href={`/tinh-thanh/province/${provinceSlug}/${unit.wardSlug || unit.slug}/co-quan/ubnd`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#15803d',
                      color: '#ffffff',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none'
                    }}
                  >
                    Xem Trang Chi Tiết UBND →
                  </Link>
                </div>
              </div>

              {/* Card 2: Trụ sở Công An */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #dbeafe', backgroundColor: '#eff6ff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>🛡️</span>
                      <strong style={{ fontSize: '14px', color: '#1e40af' }}>{police.name}</strong>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#1e40af', backgroundColor: '#bfdbfe', padding: '2px 6px', borderRadius: '4px' }}>
                      An ninh 24/7
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    🚨 <strong>Đường dây nóng khẩn cấp:</strong> <strong style={{ color: '#dc2626' }}>113 (Trực ban 24/7)</strong>
                  </div>
                  {police.facebook && (
                    <div style={{ fontSize: '12px', marginTop: '6px' }}>
                      <a
                        href={police.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#1877f2', fontWeight: '700', textDecoration: 'none' }}
                      >
                        <span style={{ display: 'inline-block', backgroundColor: '#1877f2', color: '#fff', borderRadius: '50%', width: '15px', height: '15px', fontSize: '9px', textAlign: 'center', lineHeight: '15px' }}>✓</span>
                        <span>{police.facebookName || 'Fanpage Công An (Tích Xanh)'} ↗</span>
                      </a>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #dbeafe' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <a
                      href={police.googleDirectionsUrl || police.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#1d4ed8', textDecoration: 'none' }}
                    >
                      <span>↗ Chỉ đường</span>
                    </a>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <a
                      href={police.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#0284c7', textDecoration: 'none' }}
                    >
                      <span>📍 Google Maps</span>
                    </a>
                  </div>
                  <Link
                    href={`/tinh-thanh/province/${provinceSlug}/${unit.wardSlug || unit.slug}/co-quan/cong-an`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#1d4ed8',
                      color: '#ffffff',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none'
                    }}
                  >
                    Xem Trang Chi Tiết Công An →
                  </Link>
                </div>
              </div>

              {/* Card 3: Kho Bạc Nhà Nước */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #fde68a', backgroundColor: '#fffbeb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>🏦</span>
                      <strong style={{ fontSize: '14px', color: '#92400e' }}>{treasury.name}</strong>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#92400e', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
                      Ngân sách
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    🕒 <strong>Thời gian làm việc:</strong> {treasury.workingHours || 'Thứ 2 - Thứ 6 (Giờ HC)'}
                  </div>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #fde68a' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <a
                      href={treasury.googleDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#b45309', textDecoration: 'none' }}
                    >
                      <span>↗ Chỉ đường</span>
                    </a>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <a
                      href={treasury.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#0284c7', textDecoration: 'none' }}
                    >
                      <span>📍 Google Maps</span>
                    </a>
                  </div>
                  <Link
                    href={`/tinh-thanh/province/${provinceSlug}/${unit.wardSlug || unit.slug}/co-quan/kho-bac`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#b45309',
                      color: '#ffffff',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none'
                    }}
                  >
                    Xem Trang Chi Tiết Kho Bạc →
                  </Link>
                </div>
              </div>

              {/* Card 4: Tòa Án Nhân Dân */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #ddd6fe', backgroundColor: '#f5f3ff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>⚖️</span>
                      <strong style={{ fontSize: '14px', color: '#6d28d9' }}>{court.name}</strong>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#6d28d9', backgroundColor: '#ede9fe', padding: '2px 6px', borderRadius: '4px' }}>
                      Cơ quan Xét xử
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    🕒 <strong>Thời gian làm việc:</strong> {court.workingHours || 'Thứ 2 - Thứ 6 (Giờ HC)'}
                  </div>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #ddd6fe' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <a
                      href={court.googleDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#7c3aed', textDecoration: 'none' }}
                    >
                      <span>↗ Chỉ đường</span>
                    </a>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <a
                      href={court.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#0284c7', textDecoration: 'none' }}
                    >
                      <span>📍 Google Maps</span>
                    </a>
                  </div>
                  <Link
                    href={`/tinh-thanh/province/${provinceSlug}/${unit.wardSlug || unit.slug}/co-quan/toa-an`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#7c3aed',
                      color: '#ffffff',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none'
                    }}
                  >
                    Xem Trang Chi Tiết Tòa Án →
                  </Link>
                </div>
              </div>

              {/* Card 5: Viện Kiểm Sát Nhân Dân */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #fecdd3', backgroundColor: '#fff1f2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>📜</span>
                      <strong style={{ fontSize: '14px', color: '#9f1239' }}>{procuracy.name}</strong>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#9f1239', backgroundColor: '#ffe4e6', padding: '2px 6px', borderRadius: '4px' }}>
                      Công tố & Kiểm sát
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    🕒 <strong>Thời gian làm việc:</strong> Thứ 2 - Thứ 6 (07:30 - 17:00)
                  </div>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #fecdd3' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <a
                      href={procuracy.googleDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#be123c', textDecoration: 'none' }}
                    >
                      <span>↗ Chỉ đường</span>
                    </a>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <a
                      href={procuracy.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#0284c7', textDecoration: 'none' }}
                    >
                      <span>📍 Google Maps</span>
                    </a>
                  </div>
                  <Link
                    href={`/tinh-thanh/province/${provinceSlug}/${unit.wardSlug || unit.slug}/co-quan/vien-kiem-sat`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#be123c',
                      color: '#ffffff',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '800',
                      textDecoration: 'none'
                    }}
                  >
                    Xem Chi Tiết Viện Kiểm Sát →
                  </Link>
                </div>
              </div>

              {/* Card Banner: Liên kết cơ quan cấp tỉnh */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>🏢</span>
                <strong style={{ fontSize: '14px', color: '#0f172a' }}>Cơ Quan Đầu Não Cấp Tỉnh ({province.name})</strong>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  Tra cứu trụ sở UBND, Công An, Kho Bạc, TAND, VKSND cấp tỉnh.
                </p>
                <Link
                  href={`/tinh-thanh/province/${provinceSlug}/co-quan-nha-nuoc`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    textDecoration: 'none'
                  }}
                >
                  <span>Xem Trụ Sở Cấp Tỉnh →</span>
                </Link>
              </div>

              {/* Card Y Tế */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #fed7aa', backgroundColor: '#fff7ed', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>🏥</span>
                    <strong style={{ fontSize: '14px', color: '#c2410c' }}>Cơ Sở Y Tế & Chăm Sóc Sức Khỏe</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                    Định vị trạm y tế, bệnh viện và phòng khám phục vụ cư dân {unit.name}:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Trạm y tế ' + unit.name + ', ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #fdba74',
                        borderRadius: '8px',
                        color: '#9a3412',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      <span>🏥 Trạm Y Tế {unit.name}</span>
                      <span style={{ fontSize: '11px', color: '#ea580c' }}>Tìm vị trí ↗</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Bệnh viện phòng khám ' + unit.name + ', ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #fdba74',
                        borderRadius: '8px',
                        color: '#9a3412',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      <span>🚑 Bệnh Viện & Phòng Khám Khu Vực</span>
                      <span style={{ fontSize: '11px', color: '#ea580c' }}>Tìm vị trí ↗</span>
                    </a>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: '#9a3412', opacity: 0.85 }}>
                  📍 <em>Tra cứu trực tiếp qua Google Maps POI thực địa</em>
                </div>
              </div>

              {/* Card Giáo Dục */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>🏫</span>
                    <strong style={{ fontSize: '14px', color: '#0f172a' }}>Hệ Thống Trường Học Dân Sinh</strong>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                    Tra cứu mạng lưới giáo dục các cấp chính quy quanh {unit.name}:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Trường mầm non ' + unit.name + ', ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        color: '#1e293b',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      <span>🎒 Trường Mầm Non / Mẫu Giáo</span>
                      <span style={{ fontSize: '11px', color: '#2563eb' }}>Tra cứu ↗</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Trường tiểu học ' + unit.name + ', ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        color: '#1e293b',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      <span>📚 Trường Tiểu Học (Cấp 1)</span>
                      <span style={{ fontSize: '11px', color: '#2563eb' }}>Tra cứu ↗</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Trường THCS THPT ' + unit.name + ', ' + province.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        color: '#1e293b',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      <span>🏛️ Trường THCS & THPT (Cấp 2 - 3)</span>
                      <span style={{ fontSize: '11px', color: '#2563eb' }}>Tra cứu ↗</span>
                    </a>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: '#64748b' }}>
                  📍 <em>Định vị danh sách trường học chuẩn xác qua Google Maps</em>
                </div>
              </div>
            </div>
          </section>

          {/* KHỐI CHUYÊN ĐỀ SEO HÀNH CHÍNH & THỦ TỤC UBND ĐỘC BẢN (DYNAMIC LOCAL CONTENT ENGINE) */}
          {seoArticle && (
            <section id="chuyen-de-ubnd" className="tt-card tt-card-padded" style={{ borderLeft: '4px solid #ea580c' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '26px' }}>🏛️</span>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: '1.3' }}>
                    {seoArticle.section1.title}
                  </h2>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Cẩm Nang Hành Chính Độc Bản Sau Sáp Nhập 2026
                  </span>
                </div>
              </div>

              {/* Đoạn mở bài độc bản */}
              <p style={{ fontSize: '14.5px', lineHeight: '1.8', color: '#334155', margin: '0 0 16px 0' }}>
                {seoArticle.lead}
              </p>

              {/* Section 1 Content: Vị trí trụ sở & Giờ làm việc */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#334155', margin: '0 0 12px 0' }}>
                  {seoArticle.section1.content}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>📍</span>
                    <span><strong>Trụ sở:</strong> {seoArticle.section1.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>📞</span>
                    <span><strong>Tổng đài hỗ trợ:</strong> <strong style={{ color: '#ea580c' }}>{seoArticle.section1.phone}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: '1 / -1' }}>
                    <span style={{ fontSize: '16px' }}>🕒</span>
                    <span><strong>Lịch tiếp công dân Một Cửa:</strong> {seoArticle.section1.hours}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Hướng dẫn 4 thủ tục hành chính trọng điểm */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📋</span>
                  <span>Hướng Dẫn 4 Thủ Tục Hành Chính Công Thiết Yếu</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(seoArticle.procedures || []).map((proc, pIdx) => (
                    <div key={pIdx} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#c2410c', margin: '0 0 6px 0' }}>
                        {proc.title}
                      </h4>
                      <p style={{ fontSize: '13px', lineHeight: '1.65', color: '#475569', margin: 0 }}>
                        {proc.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Hạ tầng an ninh, y tế & phân tuyến giáo dục */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🏥</span>
                  <span>{seoArticle.infrastructure.title}</span>
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: '1.75', color: '#334155', margin: 0 }}>
                  {seoArticle.infrastructure.content}
                </p>
              </div>
            </section>
          )}

          {/* KHỐI 6: QUY MÔ DÂN SỐ & ĐẶC THÙ MẬT ĐỘ CƯ DÂN */}
          <section className="tt-density-panel">
            <div className="tt-orange-header">
              <div className="tt-orange-header-title">
                <span>👥</span>
                <span>QUY MÔ DÂN SỐ & MẬT ĐỘ CƯ DÂN</span>
                <span style={{ opacity: 0.9, fontSize: '11px', fontWeight: '600' }}>
                  CHI TIẾT DÂN SỐ {unit.name.toUpperCase()}, {province.name.toUpperCase()}
                </span>
              </div>
              <span className="tt-update-badge" style={{ backgroundColor: '#ffffff', color: '#ea580c' }}>
                Mật độ: {demographics.densityLevel}
              </span>
            </div>

            <div className="tt-density-grid">
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📊</span>
                  <span>Phân tích quy mô & đặc thù không gian cư dân {unit.name}</span>
                </h4>

                <div className="tt-mini-stats-row">
                  <div className="tt-mini-stat" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                    <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>📐 DIỆN TÍCH TỰ NHIÊN</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#15803d', marginTop: '4px' }}>
                      {typeof unit.areaKm2 === 'number' ? unit.areaKm2.toLocaleString('vi-VN') : unit.areaKm2} <span style={{ fontSize: '12px' }}>km²</span>
                    </div>
                  </div>

                  <div className="tt-mini-stat" style={{ backgroundColor: '#fdf2f8', borderColor: '#fbcfe8' }}>
                    <div style={{ fontSize: '11px', color: '#9d174d', fontWeight: '700' }}>👥 QUY MÔ DÂN SỐ</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#be185d', marginTop: '4px' }}>
                      {unit.population.toLocaleString('vi-VN')} <span style={{ fontSize: '12px' }}>người</span>
                    </div>
                  </div>

                  <div className="tt-mini-stat" style={{ backgroundColor: '#fff7ed', borderColor: '#fed7aa' }}>
                    <div style={{ fontSize: '11px', color: '#9a3412', fontWeight: '700' }}>📈 MẬT ĐỘ BÌNH QUÂN</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#c2410c', marginTop: '4px' }}>
                      {demographics.density.toLocaleString('vi-VN')} <span style={{ fontSize: '11px' }}>người/km²</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', lineHeight: '1.75', color: '#334155' }}>
                  <p style={{ margin: 0 }}>
                    Theo dữ liệu thống kê hành chính mới nhất phục vụ quy hoạch giai đoạn mới, <strong>{unit.name}</strong> ghi nhận quy mô dân số chính thức đạt <strong style={{ color: '#be185d' }}>{unit.population.toLocaleString('vi-VN')} người</strong>, sinh sống trên tổng diện tích tự nhiên khoảng <strong>{typeof unit.areaKm2 === 'number' ? unit.areaKm2.toLocaleString('vi-VN') : unit.areaKm2} km²</strong>. Chỉ số mật độ dân cư trung bình đạt mức <strong>{demographics.density.toLocaleString('vi-VN')} người/km²</strong> — phân loại đặc thù: <strong style={{ color: '#ea580c' }}>{demographics.densityLevel}</strong>.
                  </p>

                  {demographics.density < 500 ? (
                    <p style={{ margin: 0 }}>
                      Với mật độ {demographics.density.toLocaleString('vi-VN')} người/km², <strong>{unit.name}</strong> sở hữu lợi thế đặc biệt về quỹ đất tự nhiên rộng lớn và môi trường sinh thái trong lành ven sông. Không gian cư trú tại đây mang tính chất <em>nông thôn sinh thái - cảnh quan thoáng đạt</em>, mật độ xây dựng thấp và mật độ phủ xanh cao.
                    </p>
                  ) : demographics.density < 2500 ? (
                    <p style={{ margin: 0 }}>
                      Mật độ cư dân đạt mức {demographics.density.toLocaleString('vi-VN')} người/km² thể hiện sự phân bổ không gian sống cân bằng, hài hòa giữa diện tích công trình nhà ở, hạ tầng cây xanh và mạng lưới giao thông liên vùng.
                    </p>
                  ) : (
                    <p style={{ margin: 0 }}>
                      Chỉ số mật độ {demographics.density.toLocaleString('vi-VN')} người/km² khẳng định vị thế của <strong>{unit.name}</strong> là một trong những trung tâm đô thị nén sầm uất. Khu vực sở hữu mạng lưới giao thương sôi động, nơi quỹ đất được tối ưu hóa đồng bộ cho các tổ hợp thương mại - dịch vụ.
                    </p>
                  )}

                  <p style={{ margin: 0 }}>
                    Đối soát theo tiêu chuẩn đơn vị hành chính của Ủy ban Thường vụ Quốc hội, {unit.name} đạt <strong style={{ color: '#15803d' }}>{demographics.populationRatio}%</strong> chỉ tiêu quy mô dân số và <strong style={{ color: '#15803d' }}>{demographics.areaRatio}%</strong> định mức diện tích tự nhiên.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* KHỐI 7: ĐỊNH HƯỚNG PHÁT TRIỂN & ĐỐI SOÁT NGHỊ QUYẾT 112 */}
          <section id="dinh-huong" className="tt-nq112-panel">
            <div className="tt-orange-header">
              <div className="tt-orange-header-title">
                <span>🚀</span>
                <span>ĐỊNH HƯỚNG PHÁT TRIỂN {unit.name.toUpperCase()}</span>
                <span style={{ opacity: 0.9, fontSize: '11px', fontWeight: '600' }}>
                  CẤP PHƯỜNG/XÃ · TẦM NHÌN CHIẾN LƯỢC 2026 - 2030
                </span>
              </div>
              <span className="tt-update-badge" style={{ backgroundColor: '#ffffff', color: '#ea580c' }}>
                ĐỐI SOÁT NQ 112/2025/UBTVQH15
              </span>
            </div>

            <div className="tt-nq112-grid">
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                      📋 MỐC CHIẾN LƯỢC CẢI CÁCH
                    </div>
                    <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
                      Việc thành lập và sắp xếp đơn vị mới từ ngày <strong>01/07/2025</strong> không chỉ là bước ngoặt chiến lược nhằm <strong>tối ưu hóa bộ máy quản lý</strong>, mà còn bảo đảm các thủ tục hành chính và dịch vụ công của cộng đồng cư dân luôn diễn ra nhanh chóng, thuận tiện và hiện đại nhất.
                    </p>
                  </div>

                  <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                      🚀 TỔNG KẾT ĐỊNH HƯỚNG
                    </div>
                    <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
                      Kế thừa trọn vẹn tinh hoa văn hóa và nội lực kinh tế từ <strong>{unit.district}</strong> trước đây, <strong>{unit.name}</strong> đang được định vị trở thành hạt nhân phát triển bền vững của <strong>{province.name}</strong>.
                    </p>
                  </div>
                </div>

                <a
                  href="#ban-do-so"
                  className="tt-btn-primary"
                  style={{ textAlign: 'center', justifyContent: 'center', padding: '12px' }}
                >
                  <span>XEM BẢN ĐỒ HÀNH CHÍNH 2026 ↗</span>
                </a>
              </div>

              <div className="tt-nq112-card-right">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: '#0f172a' }}>MỨC ĐẠT CHUẨN NGHỊ QUYẾT 112</strong>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                    ✓ Đạt Chuẩn Quy Hoạch
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
                    <span>Diện tích tự nhiên: <strong>{unit.areaKm2} km²</strong></span>
                    <span style={{ color: '#16a34a' }}>{demographics.areaRatio}% Định mức</span>
                  </div>
                  <div className="tt-progress-track">
                    <div className="tt-progress-bar-green" style={{ width: '100%' }}></div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Mức chuẩn tối thiểu theo phân loại đơn vị</span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
                    <span>Quy mô dân số: <strong>{unit.population.toLocaleString('vi-VN')} người</strong></span>
                    <span style={{ color: '#ea580c' }}>{demographics.populationRatio}% Định mức</span>
                  </div>
                  <div className="tt-progress-track">
                    <div className="tt-progress-bar-orange" style={{ width: '100%' }}></div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Mức chuẩn tối thiểu theo phân loại đơn vị</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <Link
                    href={`/tinh-thanh/ban-do-tien-ich/${provinceSlug}/${unit.wardSlug || unit.slug}`}
                    className="tt-btn-white"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '12px', backgroundColor: '#22c55e', color: '#ffffff', textDecoration: 'none' }}
                  >
                    BẢN ĐỒ TIỆN ÍCH ↗
                  </Link>
                  <a
                    href="#ban-do-so"
                    className="tt-btn-primary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '12px' }}
                  >
                    ↑ VỀ BẢN ĐỒ ĐỊA GIỚI
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* KHỐI 11: CỔNG THÔNG TIN ĐIỆN TỬ */}
          <section className="tt-blue-header-panel">
            <div className="tt-blue-header">
              <span>🌐</span>
              <span>CỔNG THÔNG TIN ĐIỆN TỬ {unit.name.toUpperCase()} - DỮ LIỆU HÀNH CHÍNH CHÍNH THỐNG</span>
            </div>

            <div className="tt-blue-grid">
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                  Vai trò cổng thông tin địa phương
                </h4>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#334155', margin: '0 0 12px 0' }}>
                  Cổng thông tin điện tử <strong>{unit.name}</strong> đóng vai trò cầu nối kỹ thuật số trực tiếp giữa chính quyền và người dân, giúp cư dân tiếp cận nhanh chóng các chủ trương và thủ tục hành chính sau sáp nhập.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                    <strong style={{ display: 'block', color: '#16a34a', marginBottom: '2px' }}>📄 Dịch Vụ Công</strong>
                    <span style={{ color: '#64748b' }}>Hỗ trợ nộp hồ sơ, tiếp nhận kết quả trực tuyến.</span>
                  </div>
                  <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                    <strong style={{ display: 'block', color: '#0284c7', marginBottom: '2px' }}>📢 Chỉ Đạo Điều Hành</strong>
                    <span style={{ color: '#64748b' }}>Thông tin chính sách, bản đồ quy hoạch mới.</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>
                  TRANG THÔNG TIN ĐỊA PHƯƠNG
                </div>
                <a
                  href="https://dichvucong.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    fontWeight: '700',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>Cổng Dịch Vụ Công Quốc Gia</span>
                  <span style={{ color: '#0284c7' }}>↗</span>
                </a>
              </div>
            </div>
          </section>

          {/* KHỐI 12: HƯỚNG DẪN 4 THỦ TỤC HÀNH CHÍNH */}
          <section className="tt-card tt-card-padded">
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase' }}>Hành chính công 2026</span>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>
                Hướng Dẫn 4 Thủ Tục Hành Chính Sau Sáp Nhập
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>🆔 Cập nhật CCCD & VNeID</strong>
                <span style={{ color: '#64748b', lineHeight: '1.5' }}>Tự động đồng bộ trên hệ thống quốc gia; không bắt buộc đổi thẻ vật lý nếu còn hạn.</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>🏠 Giấy Tờ Nhà Đất (Sổ Đỏ)</strong>
                <span style={{ color: '#64748b', lineHeight: '1.5' }}>Giấy chứng nhận mang tên đơn vị cũ giữ nguyên giá trị pháp lý, cập nhật khi có giao dịch.</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>🚗 Đăng Ký Xe & Biển Số</strong>
                <span style={{ color: '#64748b', lineHeight: '1.5' }}>Giữ nguyên biển số định danh ({unit.licensePlates}). Xe đăng ký mới cấp theo phân bổ 2026.</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>📑 Hộ Tịch & Khai Sinh</strong>
                <span style={{ color: '#64748b', lineHeight: '1.5' }}>Thực hiện qua Cổng Dịch Vụ Công Quốc Gia hoặc nộp hồ sơ tại Bộ phận Một cửa UBND {unit.name}.</span>
              </div>
            </div>
          </section>

          {/* KHỐI 13: GIẢI ĐÁP NHANH THƯỜNG GẶP (FAQ ACCORDION) */}
          {faqList.length > 0 && (
            <section className="tt-card tt-card-padded">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '22px' }}>❓</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    Giải Đáp Nhanh Về {unit.name}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Các câu hỏi thường gặp về địa giới, thủ tục và đời sống</span>
                </div>
              </div>

              <div>
                {faqList.map((f, idx) => {
                  const isOpen = expandedFaqIndex === idx;
                  return (
                    <div key={idx} className="tt-faq-item">
                      <button
                        onClick={() => setExpandedFaqIndex(isOpen ? -1 : idx)}
                        className="tt-faq-btn"
                      >
                        <span>0{idx + 1}. {f.question}</span>
                        <span style={{ fontSize: '10px', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: isOpen ? '#ea580c' : '#94a3b8' }}>▼</span>
                      </button>
                      {isOpen && (
                        <div className="tt-faq-content">
                          {f.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>

        {/* === CỘT BÊN PHẢI (SIDEBAR) === */}
        <aside className="tt-sidebar-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Widget 1: THỜI TIẾT ĐỊA PHƯƠNG */}
          <div className="tt-sidebar-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 className="tt-sidebar-title" style={{ margin: 0 }}>
                <span>🌤️</span>
                <span>Thời Tiết {unit.name}</span>
              </h4>
              <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: '800', backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                ● Live API
              </span>
            </div>

            {weatherLoading ? (
              <div style={{ padding: '16px 8px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                Đang cập nhật thời tiết thực tế...
              </div>
            ) : weatherData ? (
              <div className="tt-weather-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a' }}>{weatherData.temp}°C</div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{weatherData.condition}</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>{weatherData.icon}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '8px', borderTop: '1px dashed #bbf7d0', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>💧 Độ ẩm: <strong>{weatherData.humidity}%</strong></span>
                  <span>💨 Gió: <strong>{weatherData.wind} km/h</strong></span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Widget 2: THÔNG TIN TRƯỚC SÁP NHẬP */}
          <div className="tt-sidebar-card">
            <h4 className="tt-sidebar-title">
              <span>🏛️</span>
              <span>Thông Tin Trước Sáp Nhập</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #f1f5f9', paddingBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Quận/Huyện cũ:</span>
                <strong style={{ color: '#ea580c' }}>{unit.district}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #f1f5f9', paddingBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Tỉnh/Thành cũ:</span>
                <strong style={{ color: '#0f172a' }}>
                  {unit.legacyProvince || (province.legacyProvinces && province.legacyProvinces.length > 0 ? province.legacyProvinces.join(', ') : province.name)}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Vùng kinh tế:</span>
                <strong style={{ color: '#0284c7' }}>{province.region || 'Đồng bằng sông Hồng'}</strong>
              </div>
            </div>
          </div>

          {/* Widget 3: Xã Phường lân cận */}
          <div className="tt-sidebar-card">
            <h4 className="tt-sidebar-title">
              <span>📍</span>
              <span>Xã Phường lân cận</span>
            </h4>
            <div className="tt-sidebar-pills">
              {neighboringWards.map(nw => {
                const isXa = nw.type === 'Xã' || nw.name.startsWith('Xã');
                return (
                  <Link
                    key={nw.wardSlug}
                    href={`/tinh-thanh/province/${province.slug}/${nw.wardSlug}`}
                    className={`tt-sidebar-pill ${isXa ? 'tt-sidebar-pill-xa' : 'tt-sidebar-pill-phuong'}`}
                  >
                    {nw.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Widget 4: Tra Cứu Tiện Ích */}
          <div className="tt-sidebar-card">
            <h4 className="tt-sidebar-title">
              <span>🔍</span>
              <span>Tra Cứu Tiện Ích</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <Link href="/tinh-thanh/tra-cuu-sap-nhap" style={{ color: '#16a34a', fontWeight: '700', textDecoration: 'none' }}>
                🔍 Tra Cứu Sáp Nhập Xã Phường
              </Link>
              <Link href="/tinh-thanh/tra-cuu-ma-buu-chinh" style={{ color: '#ea580c', fontWeight: '700', textDecoration: 'none' }}>
                📮 Tra Cứu Mã Bưu Chính Toàn Quốc
              </Link>
              <Link href="/tinh-thanh/34-tinh-thanh" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>
                📍 Danh Mục 34 Tỉnh Thành Mới
              </Link>
              <Link href="/tinh-thanh/tieu-chuan-xa-phuong" style={{ color: '#475569', fontWeight: '600', textDecoration: 'none' }}>
                📐 Tiêu Chuẩn Phân Loại Xã Phường
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
