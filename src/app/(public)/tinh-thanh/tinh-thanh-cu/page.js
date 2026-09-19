'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import legacyProvinces from '@/data/tinhthanh/provinces-63-legacy.json';

export default function TinhThanhCuPage() {
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  const regions = [
    { id: 'all', name: 'Tất cả vùng miền' },
    { id: 'Đồng bằng sông Hồng', name: 'Đồng bằng sông Hồng' },
    { id: 'Trung du miền núi phía Bắc', name: 'Trung du & miền núi phía Bắc' },
    { id: 'Bắc Trung Bộ', name: 'Bắc Trung Bộ' },
    { id: 'Duyên hải Nam Trung Bộ', name: 'Duyên hải Nam Trung Bộ' },
    { id: 'Tây Nguyên', name: 'Tây Nguyên' },
    { id: 'Đông Nam Bộ', name: 'Đông Nam Bộ' },
    { id: 'Đồng bằng sông Cửu Long', name: 'Đồng bằng sông Cửu Long' }
  ];

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return legacyProvinces.filter(p => {
      const matchRegion = filterRegion === 'all' || p.region === filterRegion;
      const matchQuery = !q || 
        p.name.toLowerCase().includes(q) || 
        p.mergedInto.toLowerCase().includes(q) ||
        p.licensePlate.includes(q);
      return matchRegion && matchQuery;
    });
  }, [search, filterRegion]);

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">63 Tỉnh Thành Cũ</span>
        </div>

        {/* Title */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Lịch Sử Địa Giới Hành Chính Việt Nam
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: '6px 0 10px 0' }}>
            Tra Cứu 63 Tỉnh Thành Cũ Sau Sáp Nhập Về Đâu?
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
            Bảng đối chiếu toàn diện 63 tỉnh thành truyền thống của Việt Nam tương ứng sáp nhập vào 34 tỉnh thành mới năm 2026. Hỗ trợ người dân và doanh nghiệp tra cứu thông tin hành chính, mã bưu chính và biển số xe chuyển đổi.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="tt-card" style={{ padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ position: 'relative', gridColumn: 'span 2' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập tên tỉnh thành cũ (VD: Bình Dương, Bà Rịa, Hà Tây, Nam Định...)"
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
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ position: 'absolute', right: '12px', top: '10px', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              )}
            </div>

            <div>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
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
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="tt-data-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Tỉnh/Thành Cũ</th>
                <th>Khu Vực</th>
                <th>Sáp Nhập Thành Tỉnh Mới</th>
                <th>Biển Số Xe Cũ</th>
                <th style={{ textAlign: 'right' }}>Chi Tiết Tỉnh Mới</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{p.id}</td>
                  <td style={{ fontWeight: '800', color: '#0f172a' }}>{p.name}</td>
                  <td style={{ color: '#64748b' }}>{p.region}</td>
                  <td>
                    <span style={{ color: '#ea580c', fontWeight: '800' }}>➔ {p.mergedInto}</span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontWeight: '800', color: '#0f172a' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a' }}>
                      {p.licensePlate}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link
                      href={`/tinh-thanh/province/${p.newSlug}`}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#f1f5f9',
                        color: '#0f172a',
                        fontWeight: '700',
                        fontSize: '12px',
                        textDecoration: 'none'
                      }}
                    >
                      Xem quy hoạch →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
