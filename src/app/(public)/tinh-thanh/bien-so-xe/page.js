'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import legacyProvincesData from '@/data/tinhthanh/provinces-63-legacy.json';

export default function BienSoXePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState('34-new'); // '34-new' | '63-legacy'
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { id: 'all', name: 'Tất cả vùng miền' },
    { id: 'dong-nam-bo', name: 'Đông Nam Bộ' },
    { id: 'dong-bang-song-hong', name: 'Đồng Bằng Sông Hồng' },
    { id: 'trung-du-mien-nui-phia-bac', name: 'Trung Du & Miền Núi Phía Bắc' },
    { id: 'bac-trung-bo', name: 'Bắc Trung Bộ' },
    { id: 'duyen-hai-nam-trung-bo', name: 'Duyên Hải Nam Trung Bộ' },
    { id: 'dong-bang-song-cuu-long', name: 'Đồng Bằng Sông Cửu Long' }
  ];

  // Combined plates data
  const filteredNewProvinces = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return provincesData.filter(p => {
      if (selectedRegion !== 'all' && p.regionSlug !== selectedRegion) return false;
      if (!q) return true;
      const matchName = p.name.toLowerCase().includes(q);
      const matchPlates = p.licensePlates.some(plate => plate.toLowerCase().includes(q));
      const matchLegacy = p.legacyProvinces.some(leg => leg.toLowerCase().includes(q));
      return matchName || matchPlates || matchLegacy;
    });
  }, [searchQuery, selectedRegion]);

  const filteredLegacyProvinces = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return legacyProvincesData.filter(p => {
      if (!q) return true;
      const matchName = p.name.toLowerCase().includes(q);
      const matchPlate = p.licensePlate.toLowerCase().includes(q);
      const matchMerged = p.mergedInto.toLowerCase().includes(q);
      return matchName || matchPlate || matchMerged;
    });
  }, [searchQuery]);

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Biển Số Xe 34 Tỉnh Thành</span>
        </div>

        {/* Heading Card */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Cơ Sở Dữ Liệu Biển Số Xe Ô Tô & Mô Tô Toàn Quốc 2026
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: '6px 0 10px 0' }}>
            Tra Cứu Ký Hiệu Biển Số Xe 34 Tỉnh Thành Mới & 63 Tỉnh Thành Cũ
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
            Hệ thống tra cứu nhanh mã ký hiệu biển số xe dân dụng, cơ quan và doanh nghiệp của 34 tỉnh thành phố mới sau sáp nhập 2026 và 63 tỉnh thành truyền thống. Tra cứu theo số biển (ví dụ: 29, 50, 61, 72...) hoặc theo tên địa phương.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="tt-card" style={{ padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập biển số xe (VD: 51, 61, 29...) hoặc tên tỉnh..."
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }}>🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '12px', top: '10px', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  backgroundColor: '#ffffff',
                  outline: 'none'
                }}
              >
                {regions.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Tab Toggle */}
            <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
              <button
                onClick={() => setViewTab('34-new')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: viewTab === '34-new' ? '#ea580c' : 'transparent',
                  color: viewTab === '34-new' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s'
                }}
              >
                34 Tỉnh mới
              </button>
              <button
                onClick={() => setViewTab('63-legacy')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: viewTab === '63-legacy' ? '#ea580c' : 'transparent',
                  color: viewTab === '63-legacy' ? '#ffffff' : '#475569',
                  transition: 'all 0.15s'
                }}
              >
                63 Tỉnh cũ
              </button>
            </div>
          </div>
        </div>

        {/* View 1: 34 New Provinces */}
        {viewTab === '34-new' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                📍 Danh sách biển số 34 Tỉnh thành sau sáp nhập
              </h2>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#ea580c', backgroundColor: '#fff7ed', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #fed7aa' }}>
                {filteredNewProvinces.length} địa phương
              </span>
            </div>

            <div className="tt-provinces-grid">
              {filteredNewProvinces.map((province) => (
                <div key={province.slug} className="tt-province-card">
                  <div>
                    <div className="tt-province-card-top">
                      <div>
                        <h3 className="tt-province-card-title">
                          <Link href={`/tinh-thanh/province/${province.slug}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
                            {province.name}
                          </Link>
                        </h3>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{province.region}</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                        Zip: {province.postalCode}
                      </span>
                    </div>

                    {/* Plates Badges */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>
                        KÝ HIỆU BIỂN SỐ XE ĐỊNH DANH:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {province.licensePlates.map(plate => (
                          <span
                            key={plate}
                            style={{
                              fontFamily: 'monospace',
                              fontSize: '15px',
                              fontWeight: '900',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              backgroundColor: '#fff7ed',
                              border: '1px solid #fed7aa',
                              color: '#c2410c'
                            }}
                          >
                            {plate}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ fontSize: '11px', color: '#64748b', padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '14px' }}>
                      <strong>Kế thừa từ:</strong> {province.legacyProvinces.join(', ')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px', fontSize: '12px' }}>
                    <Link
                      href={`/tinh-thanh/province/${province.slug}/danh-sach-don-vi-hanh-chinh`}
                      style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}
                    >
                      Xem {province.totalUnits} xã phường →
                    </Link>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {province.region}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: 63 Legacy Provinces */}
        {viewTab === '63-legacy' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                🏛️ Danh sách biển số 63 Tỉnh thành truyền thống
              </h2>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '9999px' }}>
                {filteredLegacyProvinces.length} địa phương
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="tt-data-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tỉnh thành cũ</th>
                    <th>Ký hiệu biển số</th>
                    <th>Vùng miền</th>
                    <th>Thuộc tỉnh thành mới 2026</th>
                    <th style={{ textAlign: 'right' }}>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLegacyProvinces.map((p, idx) => (
                    <tr key={p.id}>
                      <td style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{idx + 1}</td>
                      <td style={{ fontWeight: '800', color: '#0f172a' }}>{p.name}</td>
                      <td>
                        <span style={{
                          fontFamily: 'monospace',
                          fontWeight: '900',
                          fontSize: '14px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#fef3c7',
                          color: '#b45309',
                          border: '1px solid #fde68a'
                        }}>
                          {p.licensePlate}
                        </span>
                      </td>
                      <td style={{ color: '#64748b' }}>{p.region}</td>
                      <td>
                        <Link
                          href={`/tinh-thanh/province/${p.newSlug}`}
                          style={{ fontWeight: '700', color: '#ea580c', textDecoration: 'none' }}
                        >
                          {p.mergedInto}
                        </Link>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          href={`/tinh-thanh/province/${p.newSlug}`}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            backgroundColor: '#f1f5f9',
                            color: '#0f172a',
                            fontWeight: '700',
                            fontSize: '11px',
                            textDecoration: 'none'
                          }}
                        >
                          Xem thông tin →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Legal & Regulation Guide */}
        <div style={{ marginTop: '36px', backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #1e293b' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Quy Định & Hướng Dẫn Biển Số Định Danh 2026
          </span>
          <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '8px 0 14px 0' }}>
            Biển Số Xe Sau Sáp Nhập Tỉnh Thành Có Cần Đổi Không?
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 12px 0' }}>
            Theo thông tư của Bộ Công an về quản lý biển số định danh phương tiện giao thông, khi thực hiện sáp nhập các đơn vị hành chính cấp tỉnh và cấp xã:
          </p>
          <ul style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li><strong>Giữ nguyên biển số đã cấp:</strong> Các phương tiện giao thông đã được cấp biển số định danh theo mã tỉnh cũ tiếp tục được phép lưu hành bình thường cho đến hết niên hạn hoặc khi chủ phương tiện chuyển quyền sở hữu.</li>
            <li><strong>Đăng ký mới theo mã mới:</strong> Khi làm thủ tục đăng ký mới, sang tên di chuyển từ thời điểm quyết định sáp nhập có hiệu lực, phương tiện sẽ được cấp biển số theo mã phân bổ của đơn vị hành chính mới.</li>
            <li><strong>Đồng bộ cơ sở dữ liệu quốc gia:</strong> Mọi thông tin giấy phép lái xe, đăng ký xe được tự động cập nhật liên thông trên ứng dụng VNeID mà người dân không phải đến cơ quan công an để đổi biển số cơ học.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
