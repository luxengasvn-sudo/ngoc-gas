'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function ProvinceWardExplorer({ wardList = [], province }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [viewMode, setViewMode] = useState('card'); // 'card' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Extract unique clean districts for filter dropdown
  const districtOptions = useMemo(() => {
    const raw = wardList.map(w => w.district).filter(Boolean);
    const cleaned = [...new Set(raw.map(d => d.replace(/^(Huyện|Quận|Thị xã|TP\.)\s*/i, '').trim()))];
    return cleaned.sort((a, b) => a.localeCompare(b, 'vi'));
  }, [wardList]);

  // Filtered wards
  const filteredWards = useMemo(() => {
    return wardList.filter(u => {
      // Type filter
      if (selectedType !== 'ALL') {
        const uType = u.type || (u.name?.startsWith('Xã') ? 'Xã' : (u.name?.startsWith('Đặc khu') ? 'Đặc khu' : 'Phường'));
        if (uType !== selectedType) return false;
      }

      // District filter
      if (selectedDistrict !== 'ALL') {
        const uDist = (u.district || '').replace(/^(Huyện|Quận|Thị xã|TP\.)\s*/i, '').trim();
        if (uDist !== selectedDistrict) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = u.name?.toLowerCase().includes(q);
        const matchSlug = (u.wardSlug || u.slug)?.toLowerCase().includes(q);
        const matchCode = u.administrativeCode?.toLowerCase().includes(q);
        const matchDist = u.district?.toLowerCase().includes(q);
        const matchOld = u.oldUnits?.some(o => o.toLowerCase().includes(q));
        if (!matchName && !matchSlug && !matchCode && !matchDist && !matchOld) return false;
      }

      return true;
    });
  }, [wardList, selectedType, selectedDistrict, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredWards.length / itemsPerPage) || 1;
  const paginatedWards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWards.slice(start, start + itemsPerPage);
  }, [filteredWards, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('ALL');
    setSelectedDistrict('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="tt-card tt-card-padded" style={{ marginBottom: '32px' }}>
      {/* Header & View Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Cơ sở dữ liệu hành chính 2026
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
            Tra Cứu Đơn Vị Hành Chính {province.name}
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
            Tổng cộng <strong>{wardList.length}</strong> đơn vị hành chính cấp xã, phường và đặc khu
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', padding: '0 6px' }}>Hiển thị:</span>
          <button
            type="button"
            onClick={() => setViewMode('card')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '800',
              backgroundColor: viewMode === 'card' ? '#2563eb' : 'transparent',
              color: viewMode === 'card' ? '#ffffff' : '#475569',
              transition: 'all 0.15s'
            }}
          >
            <span>🔲</span> Card
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '800',
              backgroundColor: viewMode === 'table' ? '#2563eb' : 'transparent',
              color: viewMode === 'table' ? '#ffffff' : '#475569',
              transition: 'all 0.15s'
            }}
          >
            <span>📊</span> Bảng
          </button>
        </div>
      </div>

      {/* SEARCH & FILTER BAR (EMERALD GRADIENT) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '20px',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {/* Keyword Search Input */}
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="🔍 Tìm theo tên phường/xã, mã, quận cũ..."
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1fae5',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}
            />
          </div>

          {/* Type Dropdown Filter */}
          <div style={{ flex: '0 0 auto' }}>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #d1fae5',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0f172a',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="ALL">Loại đơn vị: Tất cả</option>
              <option value="Phường">Phường</option>
              <option value="Xã">Xã</option>
              <option value="Đặc khu">Đặc khu</option>
            </select>
          </div>

          {/* District Dropdown Filter */}
          <div style={{ flex: '0 0 auto' }}>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #d1fae5',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0f172a',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                outline: 'none',
                maxWidth: '200px'
              }}
            >
              <option value="ALL">Quận/Huyện cũ: Tất cả</option>
              {districtOptions.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {(searchQuery || selectedType !== 'ALL' || selectedDistrict !== 'ALL') && (
            <button
              type="button"
              onClick={handleClearFilters}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #ffffff',
                backgroundColor: '#fef08a',
                color: '#854d0e',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              ✕ Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Results status indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '12px', opacity: 0.95 }}>
          <span>
            Đang hiển thị <strong>{paginatedWards.length}</strong> / <strong>{filteredWards.length}</strong> kết quả
          </span>
          <span>
            Trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong>
          </span>
        </div>
      </div>

      {/* ZERO RESULTS FALLBACK */}
      {filteredWards.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
          <strong style={{ fontSize: '16px', color: '#0f172a' }}>Không tìm thấy đơn vị hành chính phù hợp</strong>
          <p style={{ fontSize: '13px', margin: '6px 0 16px 0' }}>
            Vui lòng thử tìm kiếm bằng từ khóa khác hoặc bấm nút xóa bộ lọc.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="tt-btn-primary"
            style={{ fontSize: '13px', padding: '8px 18px' }}
          >
            Hiển thị lại toàn bộ
          </button>
        </div>
      ) : viewMode === 'card' ? (
        /* MODE 1: CARD VIEW */
        <div className="tt-prov-ward-grid">
          {paginatedWards.map(u => {
            const cleanSlug = u.wardSlug || u.slug?.replace(/^giao-gas-/, '');
            const isXa = u.type === 'Xã' || u.name?.startsWith('Xã');
            const isDacKhu = u.type === 'Đặc khu' || u.name?.startsWith('Đặc khu');

            return (
              <Link
                key={u.id || cleanSlug}
                href={`/tinh-thanh/province/${province.slug}/${cleanSlug}`}
                className="tt-prov-ward-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.2s ease-in-out',
                  gap: '10px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '15px', color: '#0f172a', fontWeight: '800' }}>
                      {u.name}
                    </strong>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        backgroundColor: isXa ? '#dcfce7' : (isDacKhu ? '#fee2e2' : '#ffedd5'),
                        color: isXa ? '#166534' : (isDacKhu ? '#991b1b' : '#c2410c')
                      }}
                    >
                      {u.type || (isXa ? 'Xã' : (isDacKhu ? 'Đặc khu' : 'Phường'))}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                    Sáp nhập từ: <strong>{u.oldUnits?.slice(0, 2).join(', ') || u.name}</strong>
                  </div>

                  {u.district && (
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                      📍 {u.district}
                    </div>
                  )}

                  {/* NÚT UBND & GOOGLE MAPS */}
                  <div style={{
                    fontSize: '11px',
                    color: '#166534',
                    marginTop: '6px',
                    backgroundColor: '#f0fdf4',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid #dcfce7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '12px' }}>🏛️</span>
                      <strong style={{ color: '#15803d' }}>UBND</strong>
                    </div>
                    <a
                      href={u.ubnd?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('UBND ' + u.name + ', ' + (province?.name || ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: '10px', color: '#15803d', fontWeight: '800', textDecoration: 'none', whiteSpace: 'nowrap', backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px', border: '1px solid #bbf7d0' }}
                      title="Mở Google Maps ghim vị trí UBND"
                    >
                      📍 Ghim vị trí ↗
                    </a>
                  </div>

                  {/* TIỆN ÍCH CÔNG AN & MÃ BƯU CHÍNH */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px', fontSize: '10px' }}>
                    {u.police?.address && (
                      <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px', border: '1px solid #dbeafe' }} title={u.police.address}>
                        🚓 Công An 113
                      </span>
                    )}
                    <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '2px 6px', borderRadius: '4px', border: '1px solid #bbf7d0', fontWeight: '700' }}>
                      📮 Zip: {u.postalCode || province?.postalCode || '---'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #f1f5f9', paddingTop: '8px', fontSize: '11px', color: '#475569' }}>
                  <span>📐 {typeof u.areaKm2 === 'number' ? u.areaKm2.toLocaleString('vi-VN') : u.areaKm2} km²</span>
                  <span>👥 {u.population ? (u.population >= 1000 ? `${(u.population / 1000).toFixed(1)}k` : u.population) : '--'} dân</span>
                  <span style={{ color: '#ea580c', fontWeight: '800', fontSize: '14px' }}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* MODE 2: TABLE VIEW */
        <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '40px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Tên đơn vị</th>
                <th style={{ padding: '12px 14px' }}>Trụ sở UBND xã/phường</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Mã</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Loại</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>Dân số</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>Diện tích</th>
                <th style={{ padding: '12px 12px', textAlign: 'right' }}>Mật độ</th>
                <th style={{ padding: '12px 12px' }}>Quận/Huyện cũ</th>
                <th style={{ padding: '12px 12px', textAlign: 'center' }}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWards.map((u, idx) => {
                const cleanSlug = u.wardSlug || u.slug?.replace(/^giao-gas-/, '');
                const isXa = u.type === 'Xã' || u.name?.startsWith('Xã');
                const isDacKhu = u.type === 'Đặc khu' || u.name?.startsWith('Đặc khu');
                const density = u.areaKm2 > 0 ? Math.round(u.population / u.areaKm2) : 0;
                const rowNum = (currentPage - 1) * itemsPerPage + idx + 1;

                return (
                  <tr
                    key={u.id || cleanSlug}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fcfcfd',
                      transition: 'background-color 0.15s'
                    }}
                  >
                    <td style={{ padding: '10px', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>
                      {rowNum}
                    </td>

                    <td style={{ padding: '10px 14px' }}>
                      <Link
                        href={`/tinh-thanh/province/${province.slug}/${cleanSlug}`}
                        style={{ color: '#0f172a', fontWeight: '800', textDecoration: 'none', display: 'block' }}
                      >
                        {u.name}
                      </Link>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        Sáp nhập: {u.oldUnits?.slice(0, 2).join(', ') || u.name}
                      </span>
                    </td>

                    <td style={{ padding: '10px 14px', fontSize: '12px' }}>
                      <div style={{ fontWeight: '600', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <a
                          href={u.ubnd?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('UBND ' + u.name + ', ' + (province?.name || ''))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          title="Mở Google Maps ghim vị trí UBND"
                        >
                          🏛️ 📍 Ghim vị trí ↗
                        </a>
                      </div>
                    </td>

                    <td style={{ padding: '10px', textAlign: 'center', fontFamily: 'monospace', color: '#64748b', fontSize: '12px' }}>
                      {u.administrativeCode || '--'}
                    </td>

                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          backgroundColor: isXa ? '#dcfce7' : (isDacKhu ? '#fee2e2' : '#ffedd5'),
                          color: isXa ? '#166534' : (isDacKhu ? '#991b1b' : '#c2410c')
                        }}
                      >
                        {u.type || (isXa ? 'Xã' : (isDacKhu ? 'Đặc khu' : 'Phường'))}
                      </span>
                    </td>

                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>
                      {u.population ? u.population.toLocaleString('vi-VN') : '--'}
                    </td>

                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', color: '#475569' }}>
                      {typeof u.areaKm2 === 'number' ? u.areaKm2.toLocaleString('vi-VN') : u.areaKm2} km²
                    </td>

                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#ea580c' }}>
                      {density > 0 ? density.toLocaleString('vi-VN') : '--'}
                    </td>

                    <td style={{ padding: '10px 12px', color: '#475569' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '6px', backgroundColor: '#f1f5f9', fontSize: '11px', fontWeight: '600' }}>
                        {u.district || '--'}
                      </span>
                    </td>

                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <Link
                        href={`/tinh-thanh/province/${province.slug}/${cleanSlug}`}
                        style={{
                          display: 'inline-block',
                          color: '#2563eb',
                          fontWeight: '700',
                          textDecoration: 'none',
                          fontSize: '12px'
                        }}
                      >
                        Bản đồ ↗
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: currentPage === 1 ? '#f8fafc' : '#ffffff',
              color: currentPage === 1 ? '#94a3b8' : '#0f172a',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: '700',
              fontSize: '12px'
            }}
          >
            ← Trang trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
            ) {
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: pageNum === currentPage ? '#2563eb' : '#cbd5e1',
                    backgroundColor: pageNum === currentPage ? '#2563eb' : '#ffffff',
                    color: pageNum === currentPage ? '#ffffff' : '#0f172a',
                    cursor: 'pointer',
                    fontWeight: '800',
                    fontSize: '12px'
                  }}
                >
                  {pageNum}
                </button>
              );
            }
            if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
              return <span key={pageNum} style={{ color: '#94a3b8', padding: '0 4px' }}>...</span>;
            }
            return null;
          })}

          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: currentPage === totalPages ? '#f8fafc' : '#ffffff',
              color: currentPage === totalPages ? '#94a3b8' : '#0f172a',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: '700',
              fontSize: '12px'
            }}
          >
            Trang sau →
          </button>
        </div>
      )}
    </div>
  );
}
