import Link from 'next/link';

export default function SubPortalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tt-footer">
      <div className="tt-container">
        {/* Main 3 Columns */}
        <div className="tt-footer-grid">
          {/* Left Col: Brand & Intro */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4C14.0589 4 6 12.0589 6 22C6 32.5 21.5 43.2 23.1 44.3C23.65 44.68 24.35 44.68 24.9 44.3C26.5 43.2 42 32.5 42 22C42 12.0589 33.9411 4 24 4Z"
                  fill="#1e40af"
                />
                <circle cx="24" cy="20" r="13" fill="#ffffff" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
                <path
                  d="M22 11C23 11 25.5 12 26 13.5C26.5 15 25 16 23.5 17C21.8 18.2 22.2 19.5 23 20.8C23.8 22 25.8 23 25.5 25C25.2 27 23.8 28.5 22 29.5"
                  stroke="#f59e0b"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <span style={{ fontSize: '19px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.3px', display: 'flex', alignItems: 'baseline' }}>
                  <span>ĐịaGiới</span>
                  <span style={{ color: '#f59e0b', marginLeft: '2px' }}>VN</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600', marginLeft: '6px' }}>· {currentYear}</span>
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.3px' }}>
                  Cổng Tra Cứu Địa Giới & Sáp Nhập Hành Chính Quốc Gia
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94a3b8', maxWidth: '420px', marginBottom: '12px' }}>
              Trang tra cứu & tổng hợp dữ liệu đơn vị hành chính Việt Nam theo phương án sáp nhập mới nhất. Hỗ trợ đối chiếu địa giới, dân số, diện tích, mã bưu chính và cơ sở hạ tầng dân sinh.
            </p>

            <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', maxWidth: '420px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#38bdf8', marginBottom: '4px' }}>
                ℹ️ Tiện Ích Tra Cứu Cộng Đồng:
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: 0 }}>
                Trang thông tin phi lợi nhuận phục vụ nhân dân tra cứu địa giới hành chính, bản đồ tiện ích số và trụ sở cơ quan sau sáp nhập 2026.
              </p>
            </div>
          </div>

          {/* Center Col: Dữ Liệu Số */}
          <div>
            <h4 className="tt-footer-col-title">Dữ Liệu Số {currentYear}</h4>
            <ul className="tt-footer-links">
              <li>
                <Link href="/tinh-thanh/34-tinh-thanh">34 Tỉnh thành mới</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/tra-cuu-sap-nhap">Tra cứu Phường/Xã mới</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/tieu-chuan-xa-phuong">Tiêu chuẩn Xã, Phường</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/tinh-thanh-cu">63 Tỉnh thành cũ</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/province/ho-chi-minh">Bản đồ TP. Hồ Chí Minh</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/province/ha-noi">Bản đồ Thủ đô Hà Nội</Link>
              </li>
            </ul>
          </div>

          {/* Right Col: Tiện Ích Tra Cứu */}
          <div>
            <h4 className="tt-footer-col-title">Tiện Ích</h4>
            <ul className="tt-footer-links">
              <li>
                <Link href="/tinh-thanh/tra-cuu-sap-nhap">Tra Cứu Sáp Nhập 3.320 Đơn Vị</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/tra-cuu-ma-buu-chinh">Tra cứu Mã Bưu Chính</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/34-tinh-thanh">Bản Đồ 34 Tỉnh Thành Mới</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/tieu-chuan-xa-phuong">Tiêu chuẩn Xã, Phường Mới</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/tinh-thanh-cu">Tra cứu 63 Tỉnh Thành Cũ</Link>
              </li>
              <li>
                <Link href="/tinh-thanh/dieu-khoan">Điều khoản & Bản quyền số</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Search City Pills Bar */}
        <div className="tt-footer-quick-cities">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fb923c', fontWeight: '700' }}>
            <span>📍</span> <span>TRA CỨU NHANH:</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { name: 'Hà Nội', slug: 'ha-noi' },
              { name: 'Hồ Chí Minh', slug: 'ho-chi-minh' },
              { name: 'Đà Nẵng', slug: 'da-nang' },
              { name: 'Cần Thơ', slug: 'can-tho' },
              { name: 'Đồng Nai', slug: 'dong-nai' },
              { name: 'Hải Phòng', slug: 'hai-phong' },
              { name: 'Quảng Ninh', slug: 'quang-ninh' }
            ].map(city => (
              <Link key={city.slug} href={`/tinh-thanh/province/${city.slug}`} className="tt-city-pill">
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="tt-footer-bottom">
          <div>
            <p style={{ margin: 0 }}>
              © {currentYear} ĐịaGiớiVN · Cổng Tra Cứu Địa Giới & Sáp Nhập Hành Chính.
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>
              Dữ liệu tổng hợp từ các quyết định quy hoạch công khai và các văn bản chỉ đạo của Quốc hội.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/">Trang chủ</Link>
            <span>•</span>
            <Link href="/tinh-thanh/dieu-khoan">Điều khoản & Bản quyền</Link>
            <span>•</span>
            <Link href="/lien-he">Liên hệ góp ý</Link>
            <span>•</span>
            <Link href="/lien-he" style={{ color: '#38bdf8', fontWeight: '800', textDecoration: 'none' }}>Hỗ trợ 24/7</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
