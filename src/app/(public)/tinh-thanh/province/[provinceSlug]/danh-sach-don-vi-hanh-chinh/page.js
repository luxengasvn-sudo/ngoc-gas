'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import { getProvinceUnits } from '@/lib/tinhthanhUnitsHelper';
import TraCuuInteractiveMap from '../../../components/TraCuuInteractiveMap';

export default function DanhSachDonViHanhChinhPage({ params }) {
  const { provinceSlug } = use(params);
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) notFound();

  const [query, setQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table' | 'map'
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  // Filter units for this province (HCM: 168, Hanoi: 126, others: comprehensive units)
  const provinceUnits = useMemo(() => {
    const raw = getProvinceUnits(provinceSlug, province);
    return raw.map(u => ({
      ...u,
      slug: u.wardSlug || u.slug || `xa-phuong-${u.id}`,
      wardSlug: u.wardSlug || u.slug || `xa-phuong-${u.id}`,
      code: u.administrativeCode || u.code || `${province.postalCode ? province.postalCode.slice(0, 2) : '79'}${String(u.id).padStart(3, '0')}`,
      provinceName: province.name,
      provinceSlug: province.slug
    }));
  }, [provinceSlug, province]);

  // Extract unique districts
  const districts = useMemo(() => {
    const set = new Set();
    provinceUnits.forEach(u => {
      if (u.district) set.add(u.district);
    });
    return Array.from(set);
  }, [provinceUnits]);

  // Filtered list based on search, district, and unit type
  const filteredList = useMemo(() => {
    const q = query.toLowerCase().trim();
    return provinceUnits.filter(u => {
      if (selectedDistrict !== 'all' && u.district !== selectedDistrict) return false;
      if (selectedType !== 'all' && u.type !== selectedType) return false;
      if (!q) return true;
      const matchName = u.name.toLowerCase().includes(q);
      const matchDistrict = u.district.toLowerCase().includes(q);
      const matchOld = u.oldUnits && u.oldUnits.some(old => old.toLowerCase().includes(q));
      const matchCode = u.code && u.code.toLowerCase().includes(q);
      return matchName || matchDistrict || matchOld || matchCode;
    });
  }, [provinceUnits, query, selectedDistrict, selectedType]);

  // Summary counts
  const wardsCount = useMemo(() => provinceUnits.filter(u => u.type === 'Phường').length, [provinceUnits]);
  const communesCount = useMemo(() => provinceUnits.filter(u => u.type === 'Xã').length, [provinceUnits]);
  const specialCount = useMemo(() => provinceUnits.filter(u => u.type === 'Đặc khu' || u.type === 'Thị trấn').length, [provinceUnits]);

  // Paginated List
  const totalPages = Math.ceil(filteredList.length / pageSize) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);

  // Action: Select unit and smooth scroll to map
  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    const mapEl = document.getElementById('province-map-container');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href={`/tinh-thanh/province/${province.slug}`}>{province.name}</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Danh Sách Đơn Vị Hành Chính</span>
        </div>

        {/* HERO TITLE & STATS CARDS */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff7ed', border: '1px solid #fed7aa', padding: '4px 10px', borderRadius: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  CẨM NANG ĐỊA GIỚI HÀNH CHÍNH 2026
                </span>
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
                Danh Sách {province.totalUnits} Đơn Vị Hành Chính {province.name}
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                Tra cứu đầy đủ và đối soát ranh giới, quy mô diện tích, dân số của toàn bộ các xã, phường, thị trấn sau sáp nhập tại {province.name}. Tích hợp bản đồ số vệ tinh đa lớp, danh bạ trụ sở cơ quan nhà nước và dữ liệu mã bưu chính mới nhất.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                href={`/tinh-thanh/province/${province.slug}`}
                className="tt-btn-secondary"
                style={{ fontSize: '12px', padding: '8px 16px', textDecoration: 'none' }}
              >
                ← Trang Tổng Quan
              </Link>
              <Link
                href="/tinh-thanh/tra-cuu-sap-nhap"
                className="tt-btn-primary"
                style={{ fontSize: '12px', padding: '8px 16px', textDecoration: 'none' }}
              >
                🔍 Tra Cứu Toàn Quốc
              </Link>
            </div>
          </div>

          {/* 4 Stat Boxes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '14px', padding: '14px 16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', display: 'block', marginBottom: '4px' }}>
                🏛️ TỔNG SỐ ĐƠN VỊ
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>{province.totalUnits}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>xã/phường</span>
              </div>
            </div>

            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '14px', padding: '14px 16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#ea580c', display: 'block', marginBottom: '4px' }}>
                🏢 SỐ LƯỢNG PHƯỜNG
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#ea580c' }}>{wardsCount}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>phường đô thị</span>
              </div>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '14px', padding: '14px 16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', display: 'block', marginBottom: '4px' }}>
                🌾 SỐ LƯỢNG XÃ
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#2563eb' }}>{communesCount}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>xã nông thôn</span>
              </div>
            </div>

            <div style={{ background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '14px', padding: '14px 16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#9333ea', display: 'block', marginBottom: '4px' }}>
                📐 QUY MÔ ĐỊA GIỚI
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>
                  {province.areaKm2.toLocaleString('vi-VN')}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>km²</span>
              </div>
            </div>
          </div>
        </div>

        {/* BẢN ĐỒ TƯƠNG TÁC ĐA LỚP CỦA TỈNH (LEAFLET 5 LỚP) */}
        <div id="province-map-container" style={{ marginBottom: '24px' }}>
          <div className="tt-card tt-card-padded" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="tt-national-pulse-icon"></div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    Bản Đồ Số {province.name} (Leaflet 5 Lớp)
                  </h3>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {selectedUnit
                      ? `Đang chọn: ${selectedUnit.name} (${selectedUnit.district})`
                      : `Hiển thị ${filteredList.length} điểm ghim xã/phường • Bấm vào ghim để xem chi tiết`}
                  </span>
                </div>
              </div>

              {/* View Mode Switcher */}
              <div className="tt-map-view-switcher">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`tt-view-switch-btn ${viewMode === 'cards' ? 'active' : ''}`}
                >
                  🔲 Thẻ Chi Tiết
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`tt-view-switch-btn ${viewMode === 'table' ? 'active' : ''}`}
                >
                  📊 Bảng Danh Sách
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`tt-view-switch-btn ${viewMode === 'map' ? 'active' : ''}`}
                >
                  🗺️ Bản Đồ Mở Rộng
                </button>
              </div>
            </div>

            <TraCuuInteractiveMap
              units={filteredList}
              selectedUnit={selectedUnit}
              onSelectUnit={(unit) => setSelectedUnit(unit)}
              height={viewMode === 'map' ? '640px' : '460px'}
            />
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', gridColumn: 'span 2' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Nhập tên phường/xã, tên cũ trước sáp nhập, mã bưu chính..."
                className="tt-search-input"
                style={{ width: '100%', paddingLeft: '38px', boxSizing: 'border-box' }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Type Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="tt-search-select"
              style={{ width: '100%' }}
            >
              <option value="all">Tất cả phân loại ▾</option>
              <option value="Phường">Phường ({wardsCount})</option>
              <option value="Xã">Xã ({communesCount})</option>
              {specialCount > 0 && <option value="Đặc khu">Đặc khu / Khác ({specialCount})</option>}
            </select>

            {/* District Dropdown */}
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setCurrentPage(1);
              }}
              className="tt-search-select"
              style={{ width: '100%' }}
            >
              <option value="all">Tất cả quận/huyện ({districts.length}) ▾</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              Hiển thị <strong style={{ color: '#ea580c' }}>{filteredList.length}</strong> / {province.totalUnits} đơn vị hành chính.
            </div>
            {(query || selectedDistrict !== 'all' || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedDistrict('all');
                  setSelectedType('all');
                  setCurrentPage(1);
                }}
                style={{ background: 'none', border: 'none', color: '#ea580c', fontWeight: '700', cursor: 'pointer', padding: 0 }}
              >
                Đặt lại bộ lọc ↺
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: DẠNG LƯỚI THẺ CHI TIẾT (CARD VIEW) */}
        {viewMode === 'cards' && (
          <div>
            <div className="tt-featured-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {paginatedList.map((u) => {
                const isSelected = selectedUnit && selectedUnit.id === u.id;
                return (
                  <div
                    key={u.id}
                    className={`tt-tc-card ${isSelected ? 'active' : ''}`}
                    style={{
                      border: isSelected ? '2px solid #ea580c' : '1px solid #e2e8f0',
                      boxShadow: isSelected ? '0 8px 24px rgba(234, 88, 12, 0.15)' : '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>
                          Quận/Huyện: <strong>{u.district}</strong>
                        </span>
                        <span
                          className={`tt-province-card-type-badge`}
                          style={{
                            backgroundColor: u.type === 'Phường' ? '#eff6ff' : (u.type === 'Xã' ? '#f0fdf4' : '#faf5ff'),
                            color: u.type === 'Phường' ? '#2563eb' : (u.type === 'Xã' ? '#16a34a' : '#9333ea')
                          }}
                        >
                          {u.type}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#0f172a', margin: '0 0 6px 0' }}>
                        <Link
                          href={`/tinh-thanh/province/${province.slug}/${u.wardSlug || u.slug}`}
                          style={{ textDecoration: 'none', color: '#0f172a' }}
                        >
                          {u.name}
                        </Link>
                      </h3>

                      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', marginBottom: '14px', minHeight: '34px' }}>
                        <strong>Sáp nhập từ:</strong> {u.oldUnits && u.oldUnits.length > 0 ? u.oldUnits.join(', ') : 'Đơn vị hiện hữu'}
                      </div>

                      {/* 4-Subbox Bar Under Card */}
                      <div className="tt-tc-bottom-grid">
                        <div className="tt-tc-subbox tt-tc-subbox-amber">
                          <span className="tt-tc-subbox-label">MÃ XÃ</span>
                          <span className="tt-tc-subbox-val">{u.code || `${province.postalCode?.slice(0, 2) || '79'}${String(u.id).padStart(3, '0')}`}</span>
                        </div>
                        <div className="tt-tc-subbox tt-tc-subbox-green">
                          <span className="tt-tc-subbox-label">DIỆN TÍCH</span>
                          <span className="tt-tc-subbox-val">{u.areaKm2 ? `${u.areaKm2} km²` : '-'}</span>
                        </div>
                        <div className="tt-tc-subbox tt-tc-subbox-pink">
                          <span className="tt-tc-subbox-label">DÂN SỐ</span>
                          <span className="tt-tc-subbox-val">{u.population ? `${u.population.toLocaleString('vi-VN')}` : '-'}</span>
                        </div>
                        <div className="tt-tc-btn-group">
                          <button
                            onClick={() => handleSelectUnit(u)}
                            className="tt-tc-pin-btn"
                            title="Định vị trên bản đồ số"
                          >
                            📍 Bản đồ
                          </button>
                          <Link
                            href={`/tinh-thanh/province/${province.slug}/${u.wardSlug || u.slug}`}
                            className="tt-tc-detail-btn"
                          >
                            Xem ↗
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '28px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="tt-btn-secondary"
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, fontSize: '12px', padding: '6px 14px' }}
                >
                  ← Trước
                </button>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="tt-btn-secondary"
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, fontSize: '12px', padding: '6px 14px' }}
                >
                  Sau →
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: DẠNG BẢNG DANH SÁCH (TABLE VIEW) */}
        {viewMode === 'table' && (
          <div className="tt-nat-table-wrap">
            <table className="tt-nat-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', textAlign: 'center' }}>STT</th>
                  <th>Đơn Vị Mới (2026)</th>
                  <th>Phân Loại</th>
                  <th>Sáp Nhập Từ Đơn Vị Cũ</th>
                  <th>Quận / Huyện</th>
                  <th style={{ textAlign: 'right' }}>Diện Tích</th>
                  <th style={{ textAlign: 'right' }}>Dân Số</th>
                  <th>Trụ Sở UBND</th>
                  <th style={{ textAlign: 'center' }}>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.map((u, idx) => (
                  <tr key={u.id} className={selectedUnit && selectedUnit.id === u.id ? 'active' : ''}>
                    <td style={{ textAlign: 'center', fontWeight: '800', color: '#94a3b8' }}>
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td>
                      <Link
                        href={`/tinh-thanh/province/${province.slug}/${u.wardSlug || u.slug}`}
                        style={{ fontWeight: '800', color: '#0f172a', textDecoration: 'none', fontSize: '14px', display: 'block' }}
                      >
                        {u.name}
                      </Link>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Mã: {u.code || '-'}</span>
                    </td>
                    <td>
                      <span
                        className="tt-province-card-type-badge"
                        style={{
                          backgroundColor: u.type === 'Phường' ? '#eff6ff' : (u.type === 'Xã' ? '#f0fdf4' : '#faf5ff'),
                          color: u.type === 'Phường' ? '#2563eb' : (u.type === 'Xã' ? '#16a34a' : '#9333ea')
                        }}
                      >
                        {u.type}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569', maxWidth: '280px' }}>
                      {u.oldUnits && u.oldUnits.length > 0 ? u.oldUnits.join(', ') : 'Đơn vị hiện hữu'}
                    </td>
                    <td>
                      <strong style={{ color: '#0f172a', fontSize: '12px' }}>{u.district}</strong>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', fontSize: '12px' }}>
                      {u.areaKm2 ? `${u.areaKm2} km²` : '-'}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: '#ea580c', fontSize: '12px' }}>
                      {u.population ? u.population.toLocaleString('vi-VN') : '-'}
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                        {u.ubnd?.name || `UBND ${u.name}`}
                      </div>
                      <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '600' }} title={u.ubnd?.address || ''}>
                        📍 {u.ubnd?.address ? (u.ubnd.address.length > 32 ? u.ubnd.address.slice(0, 32) + '...' : u.ubnd.address) : 'Khu trung tâm hành chính'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => handleSelectUnit(u)}
                          className="tt-card-pin-btn"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="Xem vị trí trên bản đồ"
                        >
                          📍 Bản đồ
                        </button>
                        <Link
                          href={`/tinh-thanh/province/${province.slug}/${u.wardSlug || u.slug}`}
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
                          Xem ↗
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination for table */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="tt-btn-secondary"
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, fontSize: '12px', padding: '6px 14px' }}
                >
                  ← Trước
                </button>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="tt-btn-secondary"
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, fontSize: '12px', padding: '6px 14px' }}
                >
                  Sau →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredList.length === 0 && (
          <div className="tt-card tt-card-padded" style={{ textAlign: 'center', padding: '48px 20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
              Không tìm thấy đơn vị nào khớp với tiêu chí tìm kiếm
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Vui lòng thử tìm kiếm lại với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh sách.
            </p>
          </div>
        )}

        {/* BOTTOM ADMINISTRATIVE INFRASTRUCTURE BANNER */}
        <div style={{ marginTop: '40px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            border: '1px solid #334155'
          }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                HẠ TẦNG SỐ HÓA ĐỊA CHÍNH 2026
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0 8px 0', color: '#ffffff' }}>
                Cơ Sở Dữ Liệu Đơn Vị Hành Chính {province.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, maxWidth: '600px', lineHeight: '1.5' }}>
                Dữ liệu ranh giới địa giới, trụ sở cơ quan công quyền, mã bưu chính và chỉ số nhân khẩu học phục vụ nhân dân, doanh nghiệp và công tác nghiên cứu quy hoạch phát triển.
              </p>
            </div>

            <Link
              href={`/tinh-thanh/province/${province.slug}/co-quan-nha-nuoc`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '14px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
              }}
            >
              <span>🏛️ XEM CƠ QUAN NHÀ NƯỚC</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
