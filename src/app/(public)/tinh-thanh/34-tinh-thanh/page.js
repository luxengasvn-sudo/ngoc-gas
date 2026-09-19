import Link from 'next/link';
import provincesData from '@/data/tinhthanh/provinces-34.json';

export const metadata = {
  title: 'Danh Sách & Bản Đồ 34 Tỉnh Thành Mới Nhất 2026',
  description: 'Tra cứu đầy đủ 34 tỉnh thành mới của Việt Nam theo 6 vùng kinh tế: diện tích, dân số, trung tâm hành chính, số lượng xã phường và biển số xe.'
};

export default function DanhSach34TinhThanhPage() {
  const regions = [
    { name: 'Đồng bằng sông Hồng', slug: 'dong-bang-song-hong', desc: 'Trung tâm chính trị, văn hóa và kinh tế công nghệ cao phía Bắc' },
    { name: 'Trung du và miền núi phía Bắc', slug: 'trung-du-mien-nui-phia-bac', desc: 'Vùng phên dậu Tây Bắc và Đông Bắc, cửa ngõ biên mậu và thủy điện' },
    { name: 'Bắc Trung Bộ', slug: 'bac-trung-bo', desc: 'Hành lang kinh tế miền Trung, cảng biển nước sâu và công nghiệp nặng' },
    { name: 'Duyên hải Nam Trung Bộ', slug: 'duyen-hai-nam-trung-bo', desc: 'Trung tâm du lịch biển quốc tế, năng lượng tái tạo và logistics biển' },
    { name: 'Tây Nguyên', slug: 'tay-nguyen', desc: 'Vùng nông sản chiến lược, cà phê, hồ tiêu và văn hóa cồng chiêng' },
    { name: 'Đông Nam Bộ', slug: 'dong-nam-bo', desc: 'Đầu tàu kinh tế, công nghiệp, tài chính và logistics hiện đại cả nước' },
    { name: 'Đồng bằng sông Cửu Long', slug: 'dong-bang-song-cuu-long', desc: 'Vựa lúa, thủy sản và vương quốc trái cây nhiệt đới Nam Bộ' }
  ];

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">34 Tỉnh Thành Mới</span>
        </div>

        {/* Header Card */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Nghị Quyết Sáp Nhập Đơn Vị Hành Chính Cấp Tỉnh 2026
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', margin: '6px 0 10px 0' }}>
            Danh Sách & Bản Đồ Sáp Nhập 34 Tỉnh Thành Mới Nhất
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
            Tổng hợp phương án sáp nhập 63 tỉnh thành thành 34 đơn vị hành chính cấp tỉnh mới. Dữ liệu chuẩn xác về quy mô diện tích, dân số, trung tâm hành chính, ký hiệu biển số xe và hệ thống các đơn vị hành chính trực thuộc.
          </p>
        </div>

        {/* Quick Region Index Bar */}
        <div className="tt-card" style={{ padding: '14px 18px', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
            CHUYỂN NHANH ĐẾN VÙNG KINH TẾ:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {regions.map(r => (
              <a
                key={r.slug}
                href={`#${r.slug}`}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'all 0.15s'
                }}
              >
                {r.name}
              </a>
            ))}
          </div>
        </div>

        {/* Grouped by Regions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {regions.map(r => {
            const list = provincesData.filter(p => p.regionSlug === r.slug);
            if (list.length === 0) return null;

            return (
              <section key={r.slug} id={r.slug} style={{ scrollMarginTop: '80px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid #0f172a', paddingBottom: '8px', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>📍</span> {r.name}
                    </h2>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>{r.desc}</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#ea580c', backgroundColor: '#fff7ed', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #fed7aa' }}>
                    {list.length} tỉnh thành
                  </span>
                </div>

                <div className="tt-provinces-grid">
                  {list.map(p => (
                    <div key={p.slug} className="tt-province-card">
                      <div>
                        <div className="tt-province-card-top">
                          <h3 className="tt-province-card-title">
                            <Link href={`/tinh-thanh/province/${p.slug}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
                              {p.name}
                            </Link>
                          </h3>
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
                            <strong style={{ color: '#0f172a' }}>{(p.population / 1000000).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} tr người</strong>
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
                          <strong>Hợp nhất từ:</strong> {p.legacyProvinces.join(' + ')}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
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
                          Chi tiết
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
                          Xã/Phường →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
