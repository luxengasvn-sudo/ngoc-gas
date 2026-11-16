'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';

const ITEMS_PER_PAGE = 12;

export default function HospitalDirectoryClient({ initialHospitals, provinces, tiers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef(null);

  // Reset trang về 1 khi người dùng đổi từ khóa hoặc bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProvince, selectedTier]);

  // Filter hospitals
  const filteredHospitals = useMemo(() => {
    return initialHospitals.filter(h => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchName = h.name.toLowerCase().includes(query) || (h.shortName && h.shortName.toLowerCase().includes(query));
        const matchAddr = h.address.toLowerCase().includes(query) || (h.provinceName && h.provinceName.toLowerCase().includes(query));
        const matchSpecialty = h.specialties && h.specialties.some(s => s.toLowerCase().includes(query));
        if (!matchName && !matchAddr && !matchSpecialty) return false;
      }

      // Province filter
      if (selectedProvince !== 'all' && h.provinceSlug !== selectedProvince) {
        return false;
      }

      // Tier filter
      if (selectedTier !== 'all' && h.tier !== selectedTier) {
        return false;
      }

      return true;
    });
  }, [initialHospitals, searchTerm, selectedProvince, selectedTier]);

  // Phân trang dữ liệu
  const totalPages = Math.ceil(filteredHospitals.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredHospitals.length);

  const paginatedHospitals = useMemo(() => {
    return filteredHospitals.slice(startIndex, endIndex);
  }, [filteredHospitals, startIndex, endIndex]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* 1. THANH TÌM KIẾM & BỘ LỌC */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '28px',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', alignItems: 'center' }}>
          {/* Ô tìm kiếm */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
              🔍 Tìm kiếm bệnh viện
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập tên viện, chuyên khoa (Tim, Thận, Nhi...)"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Lọc theo Tỉnh / Thành phố */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
              📍 Tỉnh / Thành Phố
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              <option value="all">Tất cả Tỉnh / Thành phố ({initialHospitals.length})</option>
              {provinces.map(p => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.count})
                </option>
              ))}
            </select>
          </div>

          {/* Lọc theo Tuyến Quản Lý */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
              🏥 Tuyến Bệnh Viện
            </label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              <option value="all">Tất cả phân tuyến</option>
              {tiers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Thống kê kết quả & Nút xóa lọc */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Hiển thị cơ sở <strong>{filteredHospitals.length > 0 ? `${startIndex + 1} - ${endIndex}` : '0'}</strong> trên tổng số <strong>{filteredHospitals.length}</strong> cơ sở y tế
            {totalPages > 1 && (
              <span style={{ marginLeft: '8px', color: '#0284c7', fontWeight: '700' }}>
                (Trang {currentPage} / {totalPages})
              </span>
            )}
          </span>
          {(searchTerm || selectedProvince !== 'all' || selectedTier !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedProvince('all');
                setSelectedTier('all');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ✕ Xóa toàn bộ bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Anchor cuộn trang mượt */}
      <div ref={listTopRef} style={{ scrollMarginTop: '30px' }} />

      {/* 2. LƯỚI DANH SÁCH BỆNH VIỆN */}
      {filteredHospitals.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px dashed #cbd5e1'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏥</div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
            Không tìm thấy bệnh viện phù hợp
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '400px', margin: '0 auto 16px auto' }}>
            Vui lòng thử tìm với từ khóa khác hoặc điều chỉnh lại bộ lọc Tỉnh/Thành phố.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedProvince('all');
              setSelectedTier('all');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Xem lại tất cả bệnh viện
          </button>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {paginatedHospitals.map(h => (
            <div
              key={h.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                position: 'relative'
              }}
            >
              <div>
                {/* Badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span style={{
                    backgroundColor: h.tier === 'Tuyến Trung Ương' ? '#fee2e2' : '#e0f2fe',
                    color: h.tier === 'Tuyến Trung Ương' ? '#b91c1c' : '#0369a1',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}>
                    {h.badge || h.tier}
                  </span>
                  <span style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    📍 {h.provinceName}
                  </span>
                </div>

                {/* Tên bệnh viện */}
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                  <Link
                    href={`/tinh-thanh/benh-vien/${h.slug}`}
                    style={{ color: '#0f172a', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0284c7'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#0f172a'}
                  >
                    {h.name}
                  </Link>
                </h2>

                {/* Tóm tắt ngắn */}
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                  {h.summary}
                </p>

                {/* Thông tin nhanh: Địa chỉ & Cấp cứu */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {/* Địa chỉ mở trực tiếp địa điểm Google Maps */}
                  <a
                    href={h.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      color: '#0f172a',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    title="Nhấp để xem địa điểm trên Google Maps"
                  >
                    <span style={{ fontSize: '15px', flexShrink: 0 }}>📍</span>
                    <span style={{ lineHeight: 1.4 }}>
                      {h.address} <span style={{ color: '#2563eb', fontSize: '11px', fontWeight: '700' }}>↗</span>
                    </span>
                  </a>

                  {h.hotlineEmergency && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', flexShrink: 0 }}>🚨</span>
                      <span style={{ color: '#64748b' }}>Cấp cứu 24/7:</span>
                      <a
                        href={`tel:${h.hotlineEmergency.replace(/\s+/g, '')}`}
                        style={{ color: '#dc2626', fontWeight: '800', textDecoration: 'none' }}
                      >
                        {h.hotlineEmergency}
                      </a>
                    </div>
                  )}

                  {h.bedCapacity && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                      <span style={{ fontSize: '15px', flexShrink: 0 }}>🛏️</span>
                      <span>Quy mô: <strong>{h.bedCapacity}</strong></span>
                    </div>
                  )}
                </div>

                {/* Chuyên khoa nổi bật tags */}
                {h.specialties && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                    {h.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11px',
                          color: '#0369a1',
                          backgroundColor: '#f0f9ff',
                          border: '1px solid #e0f2fe',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                    {h.specialties.length > 3 && (
                      <span style={{ fontSize: '11px', color: '#64748b', padding: '2px 4px' }}>
                        +{h.specialties.length - 3} khoa
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* HÀNG NÚT BẤM HÀNH ĐỘNG */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                {/* NÚT MỞ ĐỊA ĐIỂM GOOGLE MAPS */}
                <a
                  href={h.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#f1f5f9',
                    color: '#0f172a',
                    fontSize: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                >
                  <span>📍</span>
                  <span>Xem Địa Điểm</span>
                </a>

                {/* NÚT XEM CHI TIẾT */}
                <Link
                  href={`/tinh-thanh/benh-vien/${h.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0369a1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0284c7';
                  }}
                >
                  <span>Xem Chi Tiết</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3. BỘ PHÂN TRANG (PAGINATION CONTROLS) */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Nút Về Trang Đầu */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                title="Về trang đầu tiên"
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: currentPage === 1 ? '#f8fafc' : '#ffffff',
                  color: currentPage === 1 ? '#94a3b8' : '#1e293b',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >
                « Đầu
              </button>

              {/* Nút Trang Trước */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title="Trang trước"
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: currentPage === 1 ? '#f8fafc' : '#ffffff',
                  color: currentPage === 1 ? '#94a3b8' : '#1e293b',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >
                ‹ Trước
              </button>

              {/* Các nút số trang */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  title={`Đến trang ${pageNum}`}
                  style={{
                    minWidth: '38px',
                    height: '38px',
                    padding: '0 8px',
                    borderRadius: '8px',
                    border: currentPage === pageNum ? '1px solid #0284c7' : '1px solid #cbd5e1',
                    backgroundColor: currentPage === pageNum ? '#0284c7' : '#ffffff',
                    color: currentPage === pageNum ? '#ffffff' : '#1e293b',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '700',
                    transition: 'all 0.2s',
                    boxShadow: currentPage === pageNum ? '0 2px 6px rgba(2, 132, 199, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== pageNum) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.borderColor = '#94a3b8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== pageNum) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }
                  }}
                >
                  {pageNum}
                </button>
              ))}

              {/* Nút Trang Sau */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="Trang kế tiếp"
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: currentPage === totalPages ? '#f8fafc' : '#ffffff',
                  color: currentPage === totalPages ? '#94a3b8' : '#1e293b',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >
                Sau ›
              </button>

              {/* Nút Đến Trang Cuối */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                title="Đến trang cuối cùng"
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: currentPage === totalPages ? '#f8fafc' : '#ffffff',
                  color: currentPage === totalPages ? '#94a3b8' : '#1e293b',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
              >
                Cuối »
              </button>
            </div>

            {/* Thông số vị trí trang */}
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              Trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong> (Hiển thị {startIndex + 1} – {endIndex} trên tổng số {filteredHospitals.length} cơ sở)
            </div>
          </div>
        )}
      </>
    )}
    </div>
  );
}
