'use client';

import Link from 'next/link';
import provincesData from '@/data/tinhthanh/provinces-34.json';

export default function TieuChuanXaPhuongPage() {
  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Tiêu Chuẩn Xã Phường</span>
        </div>

        {/* Hero Header Card */}
        <div className="tt-card tt-card-padded" style={{ backgroundColor: '#0f172a', color: '#ffffff', border: '1px solid #1e293b', marginBottom: '24px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(234, 88, 12, 0.2)', border: '1px solid rgba(234, 88, 12, 0.4)', color: '#fdba74', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Nghị quyết số 112/2025/UBTVQH15 · Hiệu lực áp dụng 2026
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 10px 0', color: '#ffffff' }}>
            Tiêu Chuẩn Đơn Vị Hành Chính Xã, Phường Mới Nhất 2026
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
            Tổng hợp quy định khung định mức diện tích tự nhiên, quy mô dân số, tỷ lệ đô thị hóa áp dụng cho Phường, Xã và Đặc khu theo đề án tinh gọn bộ máy hành chính nhà nước.
          </p>
        </div>

        {/* Section 1: Phường */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🏙️
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>1. Phường (Đơn Vị Đô Thị)</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Đơn vị hành chính cấu thành quận, thị xã, thành phố thuộc tỉnh và thành phố trực thuộc trung ương</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#c2410c' }}>QUY MÔ DÂN SỐ</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>≥ 21.000 người</div>
              <p style={{ fontSize: '11px', color: '#7c2d12', margin: 0 }}>Đô thị miền núi, biên giới, hải đảo hoặc có di sản UNESCO: giảm 50% (chỉ cần ≥ 10.500 người).</p>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#c2410c' }}>DIỆN TÍCH TỰ NHIÊN</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>≥ 5,5 km²</div>
              <p style={{ fontSize: '11px', color: '#7c2d12', margin: 0 }}>Phường tại các huyện đảo, hải đảo chỉ cần đạt diện tích ≥ 2,75 km².</p>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#c2410c' }}>TỶ LỆ ĐÔ THỊ HÓA</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>≥ 50%</div>
              <p style={{ fontSize: '11px', color: '#7c2d12', margin: 0 }}>Mật độ đường giao thông kiên cố, mạng lưới chiếu sáng và cấp thoát nước đạt chuẩn đô thị loại III trở lên.</p>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#c2410c' }}>CƠ CẤU KINH TẾ & LAO ĐỘNG</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>Tự cân đối ≥ 100%</div>
              <p style={{ fontSize: '11px', color: '#7c2d12', margin: 0 }}>Thu ngân sách tự cân đối ≥ 100% chi; công nghiệp - dịch vụ và lao động phi nông nghiệp mỗi tiêu chí ≥ 70%.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Xã */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🌾
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>2. Xã (Đơn Vị Nông Thôn)</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Đơn vị hành chính cấu thành huyện, vùng nông thôn và vành đai nông nghiệp sinh thái</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#15803d' }}>QUY MÔ DÂN SỐ</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>≥ 16.000 người</div>
              <p style={{ fontSize: '11px', color: '#166534', margin: 0 }}>Xã vùng đồng bằng: ≥ 16.000 dân. Vùng cao/miền núi: ≥ 5.000 dân. Hải đảo: ≥ 2.500 dân.</p>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#15803d' }}>DIỆN TÍCH TỰ NHIÊN</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: '4px 0' }}>≥ 30 km²</div>
              <p style={{ fontSize: '11px', color: '#166534', margin: 0 }}>Riêng Đồng bằng sông Hồng: ≥ 21 km² (giảm 30%). Miền núi/rừng: ≥ 100 km². Hải đảo: ≥ 15 km².</p>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#15803d' }}>TRƯỜNG HỢP ĐẶC THÙ BIÊN GIỚI & VEN BIỂN</div>
              <p style={{ fontSize: '12px', color: '#166534', margin: '4px 0 0 0', lineHeight: '1.5' }}>
                Xã bãi ngang ven biển chỉ cần đạt tối thiểu ≥ 8.000 dân. Các xã biên giới đất liền có trên 50% dân số là đồng bào dân tộc thiểu số chỉ cần đạt tối thiểu ≥ 2.500 dân để đảm bảo phên dậu chủ quyền quốc gia.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Đặc khu */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              ⚓
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>3. Đặc Khu (Đơn Vị Đặc Thù)</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Đơn vị hành chính có vị trí biệt lập, an ninh quốc phòng trọng yếu</p>
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', fontSize: '13px', color: '#581c87', lineHeight: '1.6' }}>
            <p style={{ margin: '0 0 8px 0' }}>
              Theo <strong>Điều 7</strong> Nghị quyết 112/2025/UBTVQH15, Đặc khu áp dụng tiêu chuẩn theo <strong>Luật Tổ chức chính quyền địa phương</strong> - hoàn toàn không áp khung cứng về diện tích và dân số như Xã, Phường thông thường.
            </p>
            <p style={{ margin: 0 }}>
              Chính sách đặc biệt ưu tiên giữ ổn định cho các đơn vị hành chính hải đảo tiền tiêu, biệt lập (như <em>Côn Đảo, Bạch Long Vĩ, Cô Tô, Hoàng Sa, Trường Sa...</em>), tuyệt đối không sáp nhập cơ học làm ảnh hưởng tới thế trận quốc phòng toàn dân và chủ quyền biển đảo thiêng liêng.
            </p>
          </div>
        </div>

        {/* Section 4: Tra cứu theo 34 Tỉnh */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
              4. Tra Cứu Danh Sách Xã Phường Của 34 Tỉnh Mới
            </h2>
            <Link href="/tinh-thanh/34-tinh-thanh" style={{ fontSize: '12px', fontWeight: '700', color: '#ea580c', textDecoration: 'none' }}>
              Xem tất cả 34 tỉnh →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
            {provincesData.map((p) => (
              <Link
                key={p.slug}
                href={`/tinh-thanh/province/${p.slug}/danh-sach-don-vi-hanh-chinh`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  fontSize: '12px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name.replace('Thành phố ', 'TP. ').replace('Tỉnh ', '')}
                </span>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>{p.totalUnits}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Banner Tra Cứu Địa Giới */}
        <div style={{
          marginTop: '32px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          borderRadius: '16px',
          padding: '24px 28px',
          color: '#ffffff',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 8px 24px rgba(30, 58, 138, 0.25)'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 4px 0' }}>Tra Cứu Bản Đồ Địa Giới 34 Tỉnh Thành Mới</h3>
            <p style={{ fontSize: '13px', color: '#bfdbfe', margin: 0 }}>
              Đối chiếu tiêu chuẩn diện tích, dân số và ranh giới hành chính của 3.319 xã/phường trên toàn quốc.
            </p>
          </div>
          <Link
            href="/tinh-thanh/tra-cuu-sap-nhap"
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              color: '#1e3a8a',
              fontWeight: '900',
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            🔍 Tra Cứu Toàn Quốc →
          </Link>
        </div>
      </div>
    </div>
  );
}
