'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import { getAllSearchUnits } from '@/lib/tinhthanhUnitsHelper';
import TraCuuInteractiveMap from '@/app/(public)/tinh-thanh/components/TraCuuInteractiveMap';

const allSearchUnits = getAllSearchUnits();

// Highlight helper function for search terms
function HighlightedText({ text = '', highlight = '' }) {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  const q = highlight.trim();
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ backgroundColor: '#fef08a', color: '#854d0e', padding: '0 2px', borderRadius: '3px' }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function TraCuuContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialProv = searchParams.get('tinh') || 'all';
  const initialDistrict = searchParams.get('huyen') || 'all';
  const initialMerger = searchParams.get('sapnhap') === '1';

  const [keyword, setKeyword] = useState(initialQuery);
  const [selectedProvince, setSelectedProvince] = useState(initialProv);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [onlyMergers, setOnlyMergers] = useState(initialMerger);
  const [isExactMatch, setIsExactMatch] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'table' | 'map'
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Extract unique clean districts for filter dropdown (filtered by selected province)
  const districtOptions = useMemo(() => {
    const unitsPool = selectedProvince === 'all'
      ? allSearchUnits
      : allSearchUnits.filter(u => u.provinceSlug === selectedProvince);

    const raw = unitsPool.map(w => w.district).filter(Boolean);
    const cleaned = [...new Set(raw.map(d => d.replace(/^(Huyện|Quận|Thị xã|TP\.)\s*/i, '').trim()))];
    return cleaned.sort((a, b) => a.localeCompare(b, 'vi'));
  }, [selectedProvince]);

  const handleProvinceChange = (newProv) => {
    setSelectedProvince(newProv);
    setSelectedDistrict('all');
    setCurrentPage(1);
  };

  // Filtered dataset
  const filteredUnits = useMemo(() => {
    const q = keyword.toLowerCase().trim();
    return allSearchUnits.filter(u => {
      // Province filter by slug
      if (selectedProvince !== 'all' && u.provinceSlug !== selectedProvince) return false;

      // Type filter
      if (selectedType !== 'all') {
        const uType = u.type || (u.name?.startsWith('Xã') ? 'Xã' : (u.name?.startsWith('Đặc khu') ? 'Đặc khu' : 'Phường'));
        if (uType !== selectedType) return false;
      }

      // District filter
      if (selectedDistrict !== 'all') {
        const uDist = (u.district || '').replace(/^(Huyện|Quận|Thị xã|TP\.)\s*/i, '').trim();
        if (uDist !== selectedDistrict) return false;
      }

      // Only mergers filter
      if (onlyMergers && !u.hasMerger) return false;

      // Keyword filter
      if (!q) return true;

      const nameMatch = isExactMatch 
        ? u.name.toLowerCase() === q 
        : u.name.toLowerCase().includes(q);

      const districtMatch = isExactMatch 
        ? (u.district || '').toLowerCase() === q 
        : (u.district || '').toLowerCase().includes(q);

      const provMatch = (u.provinceName || u.province || '').toLowerCase().includes(q);

      const oldUnitsMatch = u.oldUnits && u.oldUnits.some(old => 
        isExactMatch ? old.toLowerCase() === q : old.toLowerCase().includes(q)
      );

      const previousNamesMatch = (u.previousNames || '').toLowerCase().includes(q);

      const codeMatch = (u.administrativeCode || u.postalCode || '').toLowerCase().includes(q);

      return nameMatch || districtMatch || provMatch || oldUnitsMatch || previousNamesMatch || codeMatch;
    });
  }, [keyword, selectedProvince, selectedType, selectedDistrict, onlyMergers, isExactMatch]);

  // URL synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (selectedProvince !== 'all') params.set('tinh', selectedProvince);
    if (selectedDistrict !== 'all') params.set('huyen', selectedDistrict);
    if (onlyMergers) params.set('sapnhap', '1');

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [keyword, selectedProvince, selectedDistrict, onlyMergers]);

  // Pagination
  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage) || 1;
  const paginatedUnits = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUnits.slice(start, start + itemsPerPage);
  }, [filteredUnits, currentPage, itemsPerPage]);

  const handlePageChange = (p) => {
    setCurrentPage(p);
    const resultsElement = document.getElementById('search-results-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocateUnit = (unit) => {
    setSelectedUnit(unit);
    const mapElement = document.getElementById('interactive-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleClearFilters = () => {
    setKeyword('');
    setSelectedProvince('all');
    setSelectedType('all');
    setSelectedDistrict('all');
    setOnlyMergers(false);
    setIsExactMatch(false);
    setCurrentPage(1);
    setSelectedUnit(null);
  };

  const getPaginationPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    pages.push(1);
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) pages.push('...');
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '16px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Tra Cứu Sáp Nhập</span>
        </div>

        {/* 1. HERO BANNER CHUẨN 1:1 TINHTHANHVN */}
        <div className="tt-tc-hero">
          <div className="tt-tc-hero-content">
            {/* Red Vietnam Map Silhouette */}
            <div className="tt-tc-hero-svg">
              <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path
                  d="M50 10 C58 12, 65 20, 68 28 C70 34, 62 42, 58 48 C54 54, 56 62, 60 70 C65 78, 62 88, 56 96 C50 104, 52 114, 58 122 C64 130, 68 140, 62 148 C56 156, 44 164, 38 172 C32 180, 26 188, 22 192 C18 190, 20 180, 24 170 C28 160, 38 150, 42 140 C46 130, 44 120, 38 110 C32 100, 34 90, 40 80 C46 70, 48 60, 44 50 C40 40, 36 30, 40 20 C42 15, 46 10, 50 10 Z"
                  fill="#dc2626"
                  opacity="0.9"
                />
                <circle cx="56" cy="35" r="4" fill="#fbbf24" />
                <circle cx="62" cy="85" r="3" fill="#fbbf24" />
                <circle cx="48" cy="142" r="4" fill="#fbbf24" />
              </svg>
            </div>

            {/* Titles & Description */}
            <div className="tt-tc-hero-titles">
              <h1 className="tt-tc-hero-title-yellow">
                Tra Cứu Sáp Nhập Hành Chính
              </h1>
              <div className="tt-tc-hero-title-green">
                34 Tỉnh Thành & 3.320 Phường Xã Mới
              </div>
              <p className="tt-tc-hero-desc">
                Dữ liệu cập nhật theo <strong>Nghị quyết sáp nhập mới nhất</strong> của Ủy ban Thường vụ Quốc hội. Hỗ trợ tra cứu chi tiết thay đổi địa giới hành chính, diện tích, dân số và các tiện ích công cộng dân sinh sau sáp nhập.
              </p>
              <div className="tt-tc-hero-badge">
                <span>•</span>
                <span>Dữ liệu chính thức áp dụng từ 01/07/2025 - Cập nhật mới liên tục 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SEARCH & MULTI-LEVEL FILTER CONTAINER */}
        <div className="tt-tc-filter-wrap">
          <div className="tt-tc-filter-inner">
            {/* Search Input Bar */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setCurrentPage(1); }}
                placeholder="Nhập tên phường, xã, thị trấn cũ hoặc mới... (ví dụ: Dĩ An, Thường Tân, Hàng Bạc, Tân Mỹ...)"
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 44px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)'
                }}
              />
              <span style={{ position: 'absolute', left: '16px', top: '14px', fontSize: '18px', color: '#94a3b8' }}>🔍</span>
              {keyword && (
                <button
                  type="button"
                  onClick={() => { setKeyword(''); setCurrentPage(1); }}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '12px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#e2e8f0',
                    border: 'none',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                💡 <strong>Tìm nhanh:</strong> Tên phường/xã mới, Phường/xã cũ trước sáp nhập, Quận/huyện, Mã hành chính
              </div>

              {/* Nút lọc nhanh 1-chạm: Chỉ xem đơn vị sáp nhập */}
              <button
                type="button"
                onClick={() => { setOnlyMergers(!onlyMergers); setCurrentPage(1); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: onlyMergers ? '2px solid #ea580c' : '1px solid #cbd5e1',
                  backgroundColor: onlyMergers ? '#fff7ed' : '#ffffff',
                  color: onlyMergers ? '#c2410c' : '#475569',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s'
                }}
              >
                <span>⚡</span>
                <span>{onlyMergers ? 'Đang lọc: Chỉ đơn vị có sáp nhập' : 'Lọc đơn vị có sáp nhập'}</span>
              </button>
            </div>

            {/* Filter Dropdowns Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              {/* Province Select */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Lọc theo tỉnh thành
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="all">Tất Cả 34 Tỉnh Thành ({allSearchUnits.length} đơn vị)</option>
                  {provincesData.map(p => {
                    const count = allSearchUnits.filter(u => u.provinceSlug === p.slug).length;
                    return (
                      <option key={p.slug} value={p.slug}>
                        {p.name} ({count} đơn vị)
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Unit Type Select */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Loại hình đơn vị
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="all">Tất cả loại hình</option>
                  <option value="Phường">Phường</option>
                  <option value="Xã">Xã</option>
                  <option value="Đặc khu">Đặc khu</option>
                </select>
              </div>

              {/* District Select */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Quận / Huyện {selectedProvince !== 'all' ? '(Theo tỉnh)' : 'cũ'}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    outline: 'none'
                  }}
                >
                  <option value="all">Tất cả quận / huyện ({districtOptions.length})</option>
                  {districtOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Exact match checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={isExactMatch}
                    onChange={(e) => { setIsExactMatch(e.target.checked); setCurrentPage(1); }}
                    style={{ width: '16px', height: '16px', accentColor: '#059669' }}
                  />
                  <span>Khớp từ khóa chính xác 100%</span>
                </label>
              </div>
            </div>

            {/* Filter Summary & Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '13px', color: '#475569' }}>
                Tìm thấy <strong style={{ color: '#ea580c', fontSize: '15px' }}>{filteredUnits.length}</strong> đơn vị hành chính phù hợp.
                {filteredUnits.length > 0 && <span> (Đang xem trang {currentPage} / {totalPages})</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                {/* Items per page selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                  <span>Hiển thị:</span>
                  {[12, 24, 48].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => { setItemsPerPage(num); setCurrentPage(1); }}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: itemsPerPage === num ? '1px solid #ea580c' : '1px solid #cbd5e1',
                        backgroundColor: itemsPerPage === num ? '#ea580c' : '#ffffff',
                        color: itemsPerPage === num ? '#ffffff' : '#334155',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {(keyword || selectedProvince !== 'all' || selectedType !== 'all' || selectedDistrict !== 'all' || onlyMergers || isExactMatch) && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    style={{ background: 'none', border: 'none', color: '#ea580c', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Xóa tất cả bộ lọc ↺
                  </button>
                )}

                {/* View Mode Toggle Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('card')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '800',
                      backgroundColor: viewMode === 'card' ? '#2563eb' : 'transparent',
                      color: viewMode === 'card' ? '#ffffff' : '#475569'
                    }}
                  >
                    🗂️ Thẻ
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '800',
                      backgroundColor: viewMode === 'table' ? '#2563eb' : 'transparent',
                      color: viewMode === 'table' ? '#ffffff' : '#475569'
                    }}
                  >
                    📋 Bảng
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '800',
                      backgroundColor: viewMode === 'map' ? '#2563eb' : 'transparent',
                      color: viewMode === 'map' ? '#ffffff' : '#475569'
                    }}
                  >
                    🗺️ Bản đồ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE MAP SECTION */}
        <div id="interactive-map-section" className="tt-tc-map-container">
          <div className="tt-tc-map-header">
            <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🗺️</span>
              <span>Bản Đồ Phân Bố {filteredUnits.length} Đơn Vị Hành Chính Tra Cứu</span>
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Click ghim để xem chi tiết • Nút `Định vị 📍` trên thẻ để bay tới xã/phường
            </span>
          </div>

          <TraCuuInteractiveMap
            units={paginatedUnits}
            selectedUnit={selectedUnit}
            onSelectUnit={(u) => setSelectedUnit(u)}
            height={viewMode === 'map' ? '620px' : '440px'}
          />
        </div>

        {/* 4. RESULTS PRESENTATION SECTION */}
        <div id="search-results-section">
          {/* A. CARD VIEW */}
          {viewMode === 'card' && (
            <div>
              {paginatedUnits.map((u) => {
                const isPhuong = u.type === 'Phường' || (u.name && u.name.startsWith('Phường'));
                const isXã = u.type === 'Xã' || (u.name && u.name.startsWith('Xã'));
                const typeBadgeClass = isPhuong ? 'tt-tc-badge-phuong' : (isXã ? 'tt-tc-badge-xa' : 'tt-tc-badge-dackhu');

                return (
                  <div key={u.uniqueId} className="tt-tc-card" style={{ borderColor: selectedUnit?.uniqueId === u.uniqueId ? '#ea580c' : '#e2e8f0', borderLeftColor: selectedUnit?.uniqueId === u.uniqueId ? '#ea580c' : '#2563eb' }}>
                    <div className="tt-tc-card-top">
                      <div>
                        <h4 className="tt-tc-card-heading">
                          <span style={{ fontSize: '16px' }}>📍</span>
                          <span className={`tt-tc-badge-type ${typeBadgeClass}`}>
                            {u.type || (isPhuong ? 'Phường' : 'Xã')}
                          </span>
                          <Link
                            href={`/tinh-thanh/province/${u.provinceSlug}/${u.slug}`}
                            style={{ textDecoration: 'none', color: '#0f172a' }}
                          >
                            <HighlightedText text={u.name} highlight={keyword} />
                          </Link>
                          <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '15px' }}>
                            - {u.provinceName || u.province}
                          </span>
                        </h4>

                        <div className="tt-tc-card-sub">
                          <span>🏢</span>
                          <span>Thuộc <strong>{u.district}</strong> cũ</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <span className="tt-tc-badge-found">
                          📰 {keyword ? 'Tìm thấy trong kết quả' : 'Đơn vị hành chính 2026'}
                        </span>
                        {u.hasMerger ? (
                          <span style={{ fontSize: '11px', fontWeight: '800', color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '4px', border: '1px solid #fde68a' }}>
                            ⚡ Có sáp nhập địa giới
                          </span>
                        ) : (
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                            ✓ Giữ nguyên địa giới
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sáp nhập từ block: Luồng sáp nhập trực quan */}
                    <div className="tt-tc-merger-box">
                      <div className="tt-tc-merger-label">
                        <span>🔀</span>
                        <span>Luồng sáp nhập:</span>
                      </div>
                      <div className="tt-tc-merger-units" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ color: '#64748b' }}>
                          <HighlightedText text={Array.isArray(u.oldUnits) ? u.oldUnits.join(', ') : (u.oldUnits || u.previousNames || u.name)} highlight={keyword} />
                        </span>
                        <span style={{ color: '#ea580c', fontWeight: '900', fontSize: '14px' }}>➔</span>
                        <strong style={{ color: '#0f172a' }}>{u.name}</strong>
                      </div>
                    </div>

                    {/* 4 Bottom Sub-boxes */}
                    <div className="tt-tc-bottom-grid">
                      {/* Mã xã */}
                      <div className="tt-tc-subbox tt-tc-subbox-amber">
                        <span className="tt-tc-subbox-label">
                          <span>🌐</span> Mã xã:
                        </span>
                        <span className="tt-tc-subbox-val" style={{ color: '#b45309' }}>
                          {u.administrativeCode || u.postalCode || '25909'}
                        </span>
                      </div>

                      {/* Diện tích */}
                      <div className="tt-tc-subbox tt-tc-subbox-green">
                        <span className="tt-tc-subbox-label">
                          <span>📈</span> Diện tích:
                        </span>
                        <span className="tt-tc-subbox-val" style={{ color: '#15803d' }}>
                          {u.areaKm2 ? `${u.areaKm2} km²` : '---'}
                        </span>
                      </div>

                      {/* Dân số */}
                      <div className="tt-tc-subbox tt-tc-subbox-pink">
                        <span className="tt-tc-subbox-label">
                          <span>👥</span> Dân số:
                        </span>
                        <span className="tt-tc-subbox-val" style={{ color: '#be185d' }}>
                          {u.population ? `${u.population.toLocaleString('vi-VN')} người` : '---'}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="tt-tc-btn-group">
                        <button
                          type="button"
                          onClick={() => handleLocateUnit(u)}
                          className="tt-tc-pin-btn"
                          title="Định vị xã/phường trên bản đồ"
                        >
                          📍 Bản đồ
                        </button>
                        <Link
                          href={`/tinh-thanh/province/${u.provinceSlug}/${u.slug}`}
                          className="tt-tc-detail-btn"
                        >
                          <span>Xem Chi Tiết</span>
                          <span>➔</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* B. TABLE VIEW (BẢNG SO SÁNH) */}
          {viewMode === 'table' && (
            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table className="tt-data-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Đơn Vị Hành Chính Mới</th>
                    <th>Sáp Nhập Từ Xã/Phường Cũ</th>
                    <th>Quận / Huyện Cũ</th>
                    <th>Diện Tích</th>
                    <th>Dân Số</th>
                    <th>Trụ Sở UBND Phường/Xã</th>
                    <th style={{ textAlign: 'right' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUnits.map((u, idx) => (
                    <tr key={u.uniqueId} style={{ backgroundColor: selectedUnit?.uniqueId === u.uniqueId ? '#fff7ed' : 'transparent' }}>
                      <td style={{ color: '#94a3b8', fontFamily: 'monospace' }}>
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td>
                        <Link
                          href={`/tinh-thanh/province/${u.provinceSlug}/${u.slug}`}
                          style={{ fontWeight: '800', color: '#0f172a', textDecoration: 'none' }}
                        >
                          <HighlightedText text={u.name} highlight={keyword} />
                        </Link>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                          {u.provinceName || u.province}
                        </div>
                        <span style={{
                          display: 'inline-block',
                          marginTop: '4px',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '800',
                          backgroundColor: u.type === 'Phường' ? '#ffedd5' : '#dcfce7',
                          color: u.type === 'Phường' ? '#c2410c' : '#15803d'
                        }}>
                          {u.type || 'Xã/Phường'}
                        </span>
                      </td>
                      <td style={{ fontSize: '12px', color: '#475569', maxWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                          <HighlightedText text={Array.isArray(u.oldUnits) ? u.oldUnits.join(', ') : (u.oldUnits || u.previousNames || u.name)} highlight={keyword} />
                          <span style={{ color: '#ea580c', fontWeight: '800' }}>➔</span>
                          <strong style={{ color: '#0f172a' }}>{u.name}</strong>
                        </div>
                      </td>
                      <td style={{ fontSize: '12px', color: '#334155', fontWeight: '600' }}>
                        {u.district}
                      </td>
                      <td style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                        {u.areaKm2 ? `${u.areaKm2} km²` : '---'}
                      </td>
                      <td style={{ fontSize: '12px', fontWeight: '700', color: '#ea580c' }}>
                        {u.population ? u.population.toLocaleString('vi-VN') : '---'}
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                          {u.agencies?.ubnd?.name || `UBND ${u.name}`}
                        </div>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          {u.agencies?.ubnd?.address || `Khu trung tâm, ${u.name}`}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => handleLocateUnit(u)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              backgroundColor: '#ffffff',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            📍 Ghim
                          </button>
                          <Link
                            href={`/tinh-thanh/province/${u.provinceSlug}/${u.slug}`}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              backgroundColor: '#2563eb',
                              color: '#ffffff',
                              fontWeight: '700',
                              fontSize: '12px',
                              textDecoration: 'none'
                            }}
                          >
                            Chi tiết ↗
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredUnits.length === 0 && (
            <div className="tt-card tt-card-padded" style={{ textAlign: 'center', padding: '60px 20px', marginBottom: '24px' }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Không tìm thấy xã/phường nào phù hợp</h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc bấm nút bên dưới để xem lại toàn bộ dữ liệu.</p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="tt-btn-primary"
                style={{ marginTop: '16px', border: 'none', cursor: 'pointer' }}
              >
                Xem lại toàn bộ {allSearchUnits.length} đơn vị hành chính ↺
              </button>
            </div>
          )}

          {/* Smart Pagination Control */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.4 : 1
                }}
              >
                « Trước
              </button>

              {getPaginationPages().map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} style={{ padding: '0 6px', color: '#94a3b8', fontWeight: 'bold' }}>
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    style={{
                      minWidth: '36px',
                      height: '36px',
                      padding: '0 8px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: currentPage === page ? '#2563eb' : '#cbd5e1',
                      backgroundColor: currentPage === page ? '#2563eb' : '#ffffff',
                      color: currentPage === page ? '#ffffff' : '#0f172a',
                      fontWeight: '800',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.4 : 1
                }}
              >
                Sau »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TraCuuSapNhapPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Đang tải cơ sở dữ liệu tra cứu sáp nhập...</div>}>
      <TraCuuContent />
    </Suspense>
  );
}
