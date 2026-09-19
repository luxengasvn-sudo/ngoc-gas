import './tinhthanh.css';
import Script from 'next/script';
import SubPortalNavbar from './components/SubPortalNavbar';
import SubPortalFooter from './components/SubPortalFooter';

export const metadata = {
  title: {
    template: '%s | ĐịaGiớiVN',
    default: 'Bản Đồ & Tra Cứu Địa Giới Hành Chính 2026 | ĐịaGiớiVN',
    absolute: 'Bản Đồ & Tra Cứu Địa Giới Hành Chính 2026 | ĐịaGiớiVN'
  },
  description: 'Hệ thống số hóa bản đồ hành chính và tra cứu phương án sáp nhập 34 tỉnh thành mới nhất 2026. Đối chiếu xã phường, mã bưu chính, biển số xe, trụ sở cơ quan nhà nước và tiện ích dân sinh toàn quốc.'
};

export default function TinhThanhLayout({ children }) {
  return (
    <div className="tt-portal-root">
      {/* Google Tag (gtag.js) GA4 độc quyền cho phân hệ Địa Giới */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XZSX04M2JH"
        strategy="afterInteractive"
      />
      <Script id="google-analytics-diagioi" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XZSX04M2JH');
        `}
      </Script>

      {/* Sub-Portal Top Bar */}
      <SubPortalNavbar />

      {/* Main Content Area */}
      <main className="tt-main-body" style={{ flex: 1 }}>
        {children}
      </main>

      {/* Sub-Portal Footer */}
      <SubPortalFooter />
    </div>
  );
}


