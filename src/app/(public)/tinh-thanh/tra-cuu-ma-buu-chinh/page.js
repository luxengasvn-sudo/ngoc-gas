'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import postalData from '@/data/tinhthanh/postal-codes.json';

export default function TraCuuMaBuuChinhPage() {
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const q = keyword.toLowerCase().trim();
    if (!q) return postalData;
    return postalData.filter(p => 
      p.province.toLowerCase().includes(q) ||
      p.code.includes(q) ||
      p.newProvince.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q)
    );
  }, [keyword]);

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Mã Bưu Chính</span>
        </div>

        {/* Heading */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Hệ Thống Mã Quốc Gia Chuẩn Bưu Chính Việt Nam
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: '6px 0 10px 0' }}>
            Tra Cứu Mã Bưu Chính (Zip Code) Toàn Quốc 2026
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
            Hệ thống tra cứu mã bưu chính quốc gia chuẩn 5–6 chữ số của các tỉnh, thành phố trực thuộc Trung ương. Phục vụ gửi nhận bưu phẩm, thương mại điện tử và khai báo thủ tục hành chính.
          </p>
        </div>

        {/* Search Bar */}
        <div className="tt-card" style={{ padding: '16px', marginBottom: '24px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập tên tỉnh thành hoặc mã số cần tra (VD: 700000, Hà Nội, Bình Dương, 100000...)"
              style={{
                width: '100%',
                padding: '12px 36px 12px 40px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <span style={{ position: 'absolute', left: '14px', top: '12px', fontSize: '16px' }}>📮</span>
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                style={{ position: 'absolute', right: '14px', top: '12px', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="tt-data-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tỉnh / Thành Phố</th>
                <th>Mã Bưu Chính (Zip Code)</th>
                <th>Quy Hoạch Tỉnh Mới</th>
                <th>Khu Vực</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{idx + 1}</td>
                  <td style={{ fontWeight: '800', color: '#0f172a' }}>{item.province}</td>
                  <td>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: '900',
                      fontSize: '15px',
                      color: '#ea580c',
                      backgroundColor: '#fff7ed',
                      border: '1px solid #fed7aa',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      display: 'inline-block'
                    }}>
                      {item.code}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700', color: '#0284c7' }}>{item.newProvince}</td>
                  <td style={{ color: '#64748b' }}>{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
