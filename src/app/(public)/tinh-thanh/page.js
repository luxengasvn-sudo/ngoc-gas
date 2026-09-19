'use client';
import vinhlongUnitsData from '@/data/tinhthanh/administrative-units-vinh-long.json';
import dongthapUnitsData from '@/data/tinhthanh/administrative-units-dong-thap.json';
import camauUnitsData from '@/data/tinhthanh/administrative-units-ca-mau.json';
import angiangUnitsData from '@/data/tinhthanh/administrative-units-an-giang.json';
import canthoUnitsData from '@/data/tinhthanh/administrative-units-can-tho.json';
import tayninhUnitsData from '@/data/tinhthanh/administrative-units-tay-ninh.json';
import dongnaiUnitsData from '@/data/tinhthanh/administrative-units-dong-nai.json';
import hochiminhUnitsData from '@/data/tinhthanh/administrative-units-ho-chi-minh.json';
import lamdongUnitsData from '@/data/tinhthanh/administrative-units-lam-dong.json';
import gialaiUnitsData from '@/data/tinhthanh/administrative-units-gia-lai.json';
import daklakUnitsData from '@/data/tinhthanh/administrative-units-dak-lak.json';
import quangngaiUnitsData from '@/data/tinhthanh/administrative-units-quang-ngai.json';
import khanhhoaUnitsData from '@/data/tinhthanh/administrative-units-khanh-hoa.json';
import danangUnitsData from '@/data/tinhthanh/administrative-units-da-nang.json';
import thanhhoaUnitsData from '@/data/tinhthanh/administrative-units-thanh-hoa.json';
import quangtriUnitsData from '@/data/tinhthanh/administrative-units-quang-tri.json';
import ngheanUnitsData from '@/data/tinhthanh/administrative-units-nghe-an.json';
import hatinhUnitsData from '@/data/tinhthanh/administrative-units-ha-tinh.json';
import hueUnitsData from '@/data/tinhthanh/administrative-units-hue.json';
import tuyenquangUnitsData from '@/data/tinhthanh/administrative-units-tuyen-quang.json';
import thainguyenUnitsData from '@/data/tinhthanh/administrative-units-thai-nguyen.json';
import sonlaUnitsData from '@/data/tinhthanh/administrative-units-son-la.json';
import phuthoUnitsData from '@/data/tinhthanh/administrative-units-phu-tho.json';
import laocaiUnitsData from '@/data/tinhthanh/administrative-units-lao-cai.json';
import langsonUnitsData from '@/data/tinhthanh/administrative-units-lang-son.json';
import dienbienUnitsData from '@/data/tinhthanh/administrative-units-dien-bien.json';
import caobangUnitsData from '@/data/tinhthanh/administrative-units-cao-bang.json';
import hungyenUnitsData from '@/data/tinhthanh/administrative-units-hung-yen.json';
import bacninhUnitsData from '@/data/tinhthanh/administrative-units-bac-ninh.json';

import quangninhUnitsData from '@/data/tinhthanh/administrative-units-quang-ninh.json';
import haiphongUnitsData from '@/data/tinhthanh/administrative-units-hai-phong.json';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import hanoiUnitsData from '@/data/tinhthanh/administrative-units-ha-noi.json';
import ninhbinhUnitsData from '@/data/tinhthanh/administrative-units-ninh-binh.json';
import laichauUnitsData from '@/data/tinhthanh/administrative-units-lai-chau.json';
import NationalProvincesMap from './components/NationalProvincesMap';

const allQuickUnits = [
  ...vinhlongUnitsData.map(u => ({ ...u, provinceSlug: 'vinh-long' })),
  ...dongthapUnitsData.map(u => ({ ...u, provinceSlug: 'dong-thap' })),
  ...camauUnitsData.map(u => ({ ...u, provinceSlug: 'ca-mau' })),
  ...angiangUnitsData.map(u => ({ ...u, provinceSlug: 'an-giang' })),
  ...canthoUnitsData.map(u => ({ ...u, provinceSlug: 'can-tho' })),
  ...tayninhUnitsData.map(u => ({ ...u, provinceSlug: 'tay-ninh' })),
  ...dongnaiUnitsData.map(u => ({ ...u, provinceSlug: 'dong-nai' })),
  ...hochiminhUnitsData.map(u => ({ ...u, provinceSlug: 'ho-chi-minh' })),
  ...lamdongUnitsData.map(u => ({ ...u, provinceSlug: 'lam-dong' })),
  ...gialaiUnitsData.map(u => ({ ...u, provinceSlug: 'gia-lai' })),
  ...daklakUnitsData.map(u => ({ ...u, provinceSlug: 'dak-lak' })),
  ...quangngaiUnitsData.map(u => ({ ...u, provinceSlug: 'quang-ngai' })),
  ...khanhhoaUnitsData.map(u => ({ ...u, provinceSlug: 'khanh-hoa' })),
  ...danangUnitsData.map(u => ({ ...u, provinceSlug: 'da-nang' })),
  ...thanhhoaUnitsData.map(u => ({ ...u, provinceSlug: 'thanh-hoa' })),
  ...quangtriUnitsData.map(u => ({ ...u, provinceSlug: 'quang-tri' })),
  ...ngheanUnitsData.map(u => ({ ...u, provinceSlug: 'nghe-an' })),
  ...hatinhUnitsData.map(u => ({ ...u, provinceSlug: 'ha-tinh' })),
  ...hueUnitsData.map(u => ({ ...u, provinceSlug: 'hue' })),
  ...tuyenquangUnitsData.map(u => ({ ...u, provinceSlug: 'tuyen-quang' })),
  ...thainguyenUnitsData.map(u => ({ ...u, provinceSlug: 'thai-nguyen' })),
  ...sonlaUnitsData.map(u => ({ ...u, provinceSlug: 'son-la' })),
  ...phuthoUnitsData.map(u => ({ ...u, provinceSlug: 'phu-tho' })),
  ...laocaiUnitsData.map(u => ({ ...u, provinceSlug: 'lao-cai' })),
  ...langsonUnitsData.map(u => ({ ...u, provinceSlug: 'lang-son' })),
  ...dienbienUnitsData.map(u => ({ ...u, provinceSlug: 'dien-bien' })),
  ...caobangUnitsData.map(u => ({ ...u, provinceSlug: 'cao-bang' })),
  ...hungyenUnitsData.map(u => ({ ...u, provinceSlug: 'hung-yen' })),
  ...bacninhUnitsData.map(u => ({ ...u, provinceSlug: 'bac-ninh' })),
  ...quangninhUnitsData.map(u => ({ ...u, provinceSlug: 'quang-ninh' })),
  ...haiphongUnitsData.map(u => ({ ...u, provinceSlug: 'hai-phong' })),
  ...hanoiUnitsData.map(u => ({ ...u, provinceSlug: 'ha-noi' })),
  ...ninhbinhUnitsData.map(u => ({ ...u, provinceSlug: 'ninh-binh' })),
  ...laichauUnitsData.map(u => ({ ...u, provinceSlug: 'lai-chau' }))
];

export default function TinhThanhHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedProvinceSlug, setSelectedProvinceSlug] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'table'
  const [activeProvinceSlug, setActiveProvinceSlug] = useState(null);

  const regions = [
    { id: 'all', name: 'Tất cả 6 Vùng' },
    { id: 'dong-nam-bo', name: 'Đông Nam Bộ' },
    { id: 'dong-bang-song-hong', name: 'Đồng Bằng Sông Hồng' },
    { id: 'trung-du-mien-nui-phia-bac', name: 'Trung Du & Miền Núi Phía Bắc' },
    { id: 'bac-trung-bo', name: 'Bắc Trung Bộ' },
    { id: 'duyen-hai-nam-trung-bo', name: 'Duyên Hải Nam Trung Bộ' },
    { id: 'tay-nguyen', name: 'Tây Nguyên' },
    { id: 'dong-bang-song-cuu-long', name: 'Đồng Bằng Sông Cửu Long' }
  ];

  // Quick navigation provinces
  const quickPills = [
    { name: 'Hà Nội', slug: 'ha-noi' },
    { name: 'Hồ Chí Minh', slug: 'ho-chi-minh' },
    { name: 'Ninh Bình', slug: 'ninh-binh' },
    { name: 'Lai Châu', slug: 'lai-chau' },
    { name: 'Đồng Nai', slug: 'dong-nai' },
    { name: 'Đà Nẵng', slug: 'da-nang' },
    { name: 'Hải Phòng', slug: 'hai-phong' },
    { name: 'Cần Thơ', slug: 'can-tho' }
  ];

  // Filter provinces by region and query
  const filteredProvinces = useMemo(() => {
    return provincesData.filter(p => {
      const matchRegion = selectedRegion === 'all' || p.regionSlug === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        p.name.toLowerCase().includes(q) || 
        p.center.toLowerCase().includes(q) ||
        p.licensePlates.some(plate => plate.includes(q)) ||
        p.legacyProvinces.some(leg => leg.toLowerCase().includes(q));
      return matchRegion && matchQuery;
    });
  }, [searchQuery, selectedRegion]);

  // Quick unit search results (up to 8 instant results)
  const quickUnitMatches = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return allQuickUnits.filter(u => 
      u.name.toLowerCase().includes(q) ||
      (u.district && u.district.toLowerCase().includes(q)) ||
      (u.oldUnits && u.oldUnits.some(old => old.toLowerCase().includes(q)))
    ).slice(0, 8);
  }, [searchQuery]);

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* 1. HERO BANNER CHUẨN TINHTHANHVN: TEAL-CYAN-LIME GRADIENT */}
      <section className="tt-home-hero">
        <div className="tt-home-hero-grid">
          {/* Card Trái: Tiêu đề + Search */}
          <div className="tt-hero-main-card">
            <div>
              <div className="tt-hero-badge-date">
                <span>Cập nhật 01/07/2025</span>
              </div>
              <h1 className="tt-hero-heading-teal">
                Thông Tin Hành Chính
              </h1>
              <div className="tt-hero-heading-gradient">
                Bản đồ Việt Nam 2026
              </div>
              <div className="tt-hero-sub-pills">
                Sau sáp nhập có • <strong>34 Tỉnh thành</strong> • <strong>3.321 phường xã</strong>
              </div>
            </div>

            <div className="tt-hero-search-wrapper">
              <div className="tt-hero-search-bar">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập tên phường xã, tỉnh thành..."
                  className="tt-hero-search-input"
                />
                <select
                  value={selectedProvinceSlug}
                  onChange={(e) => {
                    setSelectedProvinceSlug(e.target.value);
                    if (e.target.value) {
                      window.location.href = `/tinh-thanh/province/${e.target.value}`;
                    }
                  }}
                  className="tt-hero-search-select"
                >
                  <option value="">Chọn tỉnh thành ▾</option>
                  {provincesData.map(p => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
                <Link
                  href={searchQuery ? `/tinh-thanh/tra-cuu-sap-nhap?q=${encodeURIComponent(searchQuery)}` : '/tinh-thanh/tra-cuu-sap-nhap'}
                  className="tt-hero-search-btn"
                >
                  <span>🔍</span>
                </Link>
              </div>

              {/* Instant Dropdown */}
              {quickUnitMatches.length > 0 && (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0', marginTop: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', padding: '6px 10px', textTransform: 'uppercase' }}>
                    Gợi ý xã/phường sáp nhập:
                  </div>
                    {quickUnitMatches.map(u => (
                    <Link
                      key={`${u.provinceSlug}-${u.id}`}
                      href={`/tinh-thanh/province/${u.provinceSlug || 'ho-chi-minh'}/${u.wardSlug}`}
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', textDecoration: 'none', color: '#0f172a', borderRadius: '6px', fontSize: '13px' }}
                      className="tt-search-dropdown-item"
                    >
                      <span><strong>{u.name}</strong> ({u.district})</span>
                      <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '11px' }}>Chi tiết →</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Quick Pills */}
              <div className="tt-hero-quick-pills">
                {quickPills.map(qp => (
                  <Link
                    key={qp.slug}
                    href={`/tinh-thanh/province/${qp.slug}`}
                    className="tt-quick-pill"
                  >
                    {qp.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 6 Thẻ Stat Pastel Bên Phải */}
          <div className="tt-hero-stat-grid-6">
            {/* 1. Số Tỉnh Thành */}
            <div className="tt-hero-stat-card tt-hero-stat-card-blue">
              <div className="tt-hero-stat-label">
                <span>🏢</span>
                <span>Số Tỉnh thành</span>
              </div>
              <div>
                <span className="tt-hero-stat-val-num" style={{ color: '#0284c7' }}>34</span>
                <span className="tt-hero-stat-val-unit">tỉnh thành</span>
              </div>
            </div>

            {/* 2. Thành Phố */}
            <div className="tt-hero-stat-card tt-hero-stat-card-peach">
              <div className="tt-hero-stat-label">
                <span>🏛️</span>
                <span>Thành phố</span>
              </div>
              <div>
                <span className="tt-hero-stat-val-num" style={{ color: '#ea580c' }}>8</span>
                <span className="tt-hero-stat-val-unit">thành phố</span>
              </div>
            </div>

            {/* 3. Đơn Vị Hành Chính */}
            <div className="tt-hero-stat-card tt-hero-stat-card-peach">
              <div className="tt-hero-stat-label">
                <span>📍</span>
                <span>Đơn vị hành chính</span>
              </div>
              <div>
                <span className="tt-hero-stat-val-num" style={{ color: '#ea580c' }}>3321</span>
                <span className="tt-hero-stat-val-unit">phường xã</span>
              </div>
            </div>

            {/* 4. Diện Tích */}
            <div className="tt-hero-stat-card tt-hero-stat-card-green">
              <div className="tt-hero-stat-label">
                <span>📐</span>
                <span>Diện tích</span>
              </div>
              <div>
                <span className="tt-hero-stat-val-num" style={{ color: '#16a34a' }}>331.307</span>
                <span className="tt-hero-stat-val-unit">km²</span>
              </div>
            </div>

            {/* 5. Dân Số */}
            <div className="tt-hero-stat-card tt-hero-stat-card-pink">
              <div className="tt-hero-stat-label">
                <span>👥</span>
                <span>Dân số</span>
              </div>
              <div>
                <span className="tt-hero-stat-val-num" style={{ color: '#e11d48' }}>102.32</span>
                <span className="tt-hero-stat-val-unit">triệu người</span>
              </div>
            </div>

            {/* 6. Mật Độ */}
            <div className="tt-hero-stat-card tt-hero-stat-card-purple">
              <div className="tt-hero-stat-label">
                <span>📈</span>
                <span>Mật độ</span>
              </div>
              <div>
                <span className="tt-hero-stat-val-num" style={{ color: '#9333ea' }}>309</span>
                <span className="tt-hero-stat-val-unit">người/km²</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TỈNH THÀNH NỔI BẬT (CHỮ HOA ĐẬM UỐN LƯỢN + 4 CARDS) */}
      <div className="tt-container" style={{ marginTop: '36px' }}>
        <div className="tt-section-title-row">
          <div>
            <h2 className="tt-section-title-cursive">
              Tỉnh Thành Nổi Bật
            </h2>
            <div className="tt-section-sub">
              Các tỉnh thành có quy mô GRDP và dân cư đầu tàu cả nước
            </div>
          </div>
          <Link
            href="/tinh-thanh/34-tinh-thanh"
            style={{ color: '#0284c7', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}
          >
            Xem tất cả 34 tỉnh →
          </Link>
        </div>

        <div className="tt-featured-grid">
          {provincesData.slice(0, 4).map(fp => (
            <Link
              key={fp.slug}
              href={`/tinh-thanh/province/${fp.slug}`}
              className="tt-featured-card"
            >
              <div
                className="tt-featured-img-wrap"
                style={{
                  backgroundImage: `url('/images/tinhthanh/covers/${fp.slug}.jpg')`,
                  backgroundColor: '#0f172a'
                }}
              >
                <div className="tt-featured-img-overlay"></div>
                <h3 className="tt-featured-name">{fp.name}</h3>
              </div>
              <div className="tt-featured-body">
                <div className="tt-featured-stat-row">
                  <span style={{ color: '#64748b' }}>Đơn vị hành chính:</span>
                  <strong style={{ color: '#0f172a' }}>{fp.totalUnits} xã/phường</strong>
                </div>
                <div className="tt-featured-stat-row">
                  <span style={{ color: '#64748b' }}>Diện tích:</span>
                  <strong style={{ color: '#0f172a' }}>{fp.areaKm2.toLocaleString('vi-VN')} km²</strong>
                </div>
                <div className="tt-featured-stat-row">
                  <span style={{ color: '#64748b' }}>Dân số:</span>
                  <strong style={{ color: '#ea580c' }}>{(fp.population / 1000000).toFixed(1)} triệu</strong>
                </div>
                <div className="tt-featured-stat-row">
                  <span style={{ color: '#64748b' }}>Biển số xe:</span>
                  <strong style={{ color: '#16a34a' }}>{fp.licensePlates.join(', ')}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. BỐN KHỐI TIỆN ÍCH ĐIỀU HƯỚNG NHANH */}
      <div className="tt-container" style={{ marginTop: '36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <Link href="/tinh-thanh/tra-cuu-sap-nhap" className="tt-card tt-card-padded" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>🔍</div>
            <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
              Tra Cứu Sáp Nhập Xã Phường
            </strong>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
              Bộ lọc đa tiêu chí đối chiếu tên xã cũ, xã mới, mã bưu chính và diện tích 2026.
            </p>
          </Link>

          <Link href="/tinh-thanh/34-tinh-thanh" className="tt-card tt-card-padded" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>🗺️</div>
            <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
              Danh Mục 34 Tỉnh Thành Mới
            </strong>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
              Phân loại theo 6 vùng kinh tế, bản đồ ranh giới và trung tâm hành chính chuẩn.
            </p>
          </Link>

          <Link href="/tinh-thanh/tinh-thanh-cu" className="tt-card tt-card-padded" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>🏛️</div>
            <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
              63 Tỉnh Thành Cũ Về Đâu?
            </strong>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
              Sơ đồ đối chiếu nguồn gốc hình thành của từng tỉnh thành trước sáp nhập.
            </p>
          </Link>

          <Link href="/tinh-thanh/bien-so-xe" className="tt-card tt-card-padded" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>🚗</div>
            <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
              Tra Cứu Biển Số Xe 34 Tỉnh
            </strong>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
              Ký hiệu biển số phương tiện giao thông các tỉnh thành mới và cũ toàn quốc.
            </p>
          </Link>
        </div>
      </div>

      {/* 4. DANH MỤC 34 TỈNH THÀNH THEO VÙNG & BẢN ĐỒ SỐ TOÀN QUỐC */}
      <div className="tt-container" style={{ marginTop: '40px' }} id="national-map-section">
        <div className="tt-section-title-row" style={{ flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Danh bạ địa giới 2026
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
              Bản Đồ Số & Phân Vùng 34 Tỉnh Thành Việt Nam
            </h2>
          </div>

          {/* View Mode Switcher */}
          <div className="tt-map-view-switcher">
            <button
              onClick={() => setViewMode('map')}
              className={`tt-view-switch-btn ${viewMode === 'map' ? 'active' : ''}`}
            >
              🗺️ Bản Đồ & Thẻ
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`tt-view-switch-btn ${viewMode === 'table' ? 'active' : ''}`}
            >
              📊 Bảng So Sánh Số Liệu
            </button>
          </div>
        </div>

        {/* BẢN ĐỒ SỐ LEAFLET 5 LỚP 34 TỈNH THÀNH */}
        <NationalProvincesMap
          provinces={provincesData}
          selectedRegion={selectedRegion}
          activeProvinceSlug={activeProvinceSlug}
          onSelectProvince={(slug) => {
            setActiveProvinceSlug(slug);
          }}
        />

        {/* Region Tabs */}
        <div className="tt-regions-bar" style={{ marginTop: '16px' }}>
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`tt-region-tab-btn ${selectedRegion === r.id ? 'active' : ''}`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* VIEW 1: DẠNG LƯỚI THẺ (CARD VIEW) */}
        {viewMode === 'map' && (
          <div className="tt-provinces-grid">
            {filteredProvinces.map(p => (
              <div key={p.slug} className={`tt-province-card ${activeProvinceSlug === p.slug ? 'active' : ''}`}>
                <div>
                  <div className="tt-province-card-top">
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                        {p.region}
                      </span>
                      <h3 className="tt-province-card-title">
                        <Link href={`/tinh-thanh/province/${p.slug}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
                          {p.name}
                        </Link>
                      </h3>
                    </div>
                    <span className="tt-province-card-type-badge">
                      {p.totalUnits} xã/phường
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                    {p.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '10px', fontSize: '11px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Diện tích:</span>
                      <strong style={{ color: '#0f172a' }}>{p.areaKm2.toLocaleString('vi-VN')} km²</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Dân số:</span>
                      <strong style={{ color: '#0f172a' }}>{(p.population / 1000000).toFixed(1)} tr người</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Trung tâm:</span>
                      <strong style={{ color: '#0f172a' }}>{p.center}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', display: 'block' }}>Biển số xe:</span>
                      <strong style={{ color: '#ea580c' }}>{p.licensePlates.join(', ')}</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '14px' }}>
                    <strong>Tỉnh cũ hợp nhất:</strong> {p.legacyProvinces.join(' + ')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveProvinceSlug(p.slug);
                      const mapEl = document.getElementById('national-map-section');
                      if (mapEl) {
                        mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="tt-card-pin-btn"
                    title="Xem vị trí trên bản đồ"
                  >
                    📍 Bản đồ
                  </button>
                  <Link
                    href={`/tinh-thanh/province/${p.slug}`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: '#f1f5f9',
                      color: '#0f172a',
                      fontSize: '12px',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    Tổng quan
                  </Link>
                  <Link
                    href={`/tinh-thanh/province/${p.slug}/danh-sach-don-vi-hanh-chinh`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: '#ea580c',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}
                  >
                    Xã/Phường ({p.totalUnits}) →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: DẠNG BẢNG SO SÁNH (TABLE VIEW) */}
        {viewMode === 'table' && (
          <div className="tt-nat-table-wrap">
            <table className="tt-nat-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>#</th>
                  <th>Tỉnh / Thành Phố</th>
                  <th>Vùng Kinh Tế</th>
                  <th>Trung Tâm</th>
                  <th style={{ textAlign: 'right' }}>Số Xã/Phường</th>
                  <th style={{ textAlign: 'right' }}>Diện Tích (km²)</th>
                  <th style={{ textAlign: 'right' }}>Dân Số</th>
                  <th style={{ textAlign: 'right' }}>Mật Độ (ng/km²)</th>
                  <th>Biển Số Xe</th>
                  <th style={{ textAlign: 'center' }}>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProvinces.map((p, idx) => (
                  <tr key={p.slug}>
                    <td style={{ textAlign: 'center', fontWeight: '800', color: '#94a3b8' }}>{idx + 1}</td>
                    <td>
                      <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>{p.name}</strong>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{p.type}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>{p.region}</span>
                    </td>
                    <td>
                      <strong style={{ color: '#0f172a' }}>{p.center}</strong>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: '#16a34a' }}>
                      {p.totalUnits}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700' }}>
                      {p.areaKm2.toLocaleString('vi-VN')}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: '#ea580c' }}>
                      {(p.population / 1000000).toFixed(2)} tr
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: '#9333ea' }}>
                      {p.density ? p.density.toLocaleString('vi-VN') : Math.round(p.population / p.areaKm2).toLocaleString('vi-VN')}
                    </td>
                    <td>
                      <span style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                        {p.licensePlates.join(', ')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setActiveProvinceSlug(p.slug);
                            setViewMode('map');
                            const mapEl = document.getElementById('national-map-section');
                            if (mapEl) {
                              mapEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className="tt-card-pin-btn"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="Xem vị trí trên bản đồ"
                        >
                          📍
                        </button>
                        <Link
                          href={`/tinh-thanh/province/${p.slug}`}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '800',
                            textDecoration: 'none'
                          }}
                        >
                          Chi tiết →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. CỔNG DỮ LIỆU ĐỊA GIỚI & TIỆN ÍCH CÔNG ÍCH XÃ HỘI */}
      <div className="tt-container" style={{ marginTop: '40px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '24px',
          padding: '32px',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          border: '1px solid #334155',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              TIỆN ÍCH CỘNG ĐỒNG PHI LỢI NHUẬN
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: '900', margin: '6px 0 12px 0', color: '#ffffff' }}>
              Cổng Tra Cứu Địa Giới & Sáp Nhập Hành Chính 2026
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
              Chuyên trang tiện ích xã hội phục vụ nhân dân và doanh nghiệp tra cứu thông tin địa giới hành chính, bản đồ ranh giới, trụ sở cơ quan nhà nước (UBND, Công an 113) và mã bưu chính sau sắp xếp giai đoạn 2026 - 2030 theo các Nghị quyết của Quốc hội.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link
              href="/tinh-thanh/tra-cuu-sap-nhap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                borderRadius: '12px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
              }}
            >
              <span>🔍 TRA CỨU PHƯỜNG / XÃ</span>
            </Link>
            <Link
              href="/lien-he"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              Góp Ý Dữ Liệu →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
