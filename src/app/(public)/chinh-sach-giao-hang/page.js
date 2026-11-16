import Link from 'next/link';
import { 
  Truck, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Scale, 
  Flame, 
  Zap, 
  AlertCircle, 
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getAllSettings } from '@/lib/settingsHelper';

export const revalidate = 60;

export async function generateMetadata() {
  const settings = await getAllSettings();
  const brandName = settings.site_name || settings.company_name || 'Ngọc Gas';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';

  return {
    title: `Chính Sách Giao Gas Hỏa Tốc & Giao Nhận An Toàn | ${brandName}`,
    description: `Chính sách giao gas hỏa tốc 10 - 15 phút và tiêu chuẩn khoảng 30 phút tại Dĩ An, Thuận An & Bình Dương. Miễn phí vận chuyển 0 VNĐ, cân gas điện tử đối chứng tại nhà, lắp đặt và kiểm tra an toàn PCCC.`,
    alternates: {
      canonical: `${baseUrl}/chinh-sach-giao-hang`
    },
    openGraph: {
      title: `Chính Sách Giao Hàng & Vận Chuyển Gas | ${brandName}`,
      description: `Giao gas hỏa tốc 10-15 phút, giao tiêu chuẩn 30 phút. Miễn phí 100% công giao & lắp đặt. Cân gas đối chứng tại bếp. Hotline 1900 9396.`,
      url: `${baseUrl}/chinh-sach-giao-hang`,
      siteName: brandName,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Chính Sách Giao Hàng & Vận Chuyển Gas | ${brandName}`,
      description: `Giao gas hỏa tốc 10-15 phút, giao tiêu chuẩn 30 phút. Miễn phí 100% công giao & lắp đặt.`
    }
  };
}

export default async function ChinhSachGiaoHangPage() {
  const settings = await getAllSettings();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const phone = settings.phone || '19009396';
  const cleanPhone = phone.replace(/\./g, '').trim();
  const address = settings.address || '7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương';
  const email = settings.email || 'contact@ngocgas.com';
  const workingHours = settings.working_hours || '06:00 - 21:30 (Thứ 2 - Chủ nhật)';

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/chinh-sach-giao-hang#webpage`,
        "url": `${baseUrl}/chinh-sach-giao-hang`,
        "name": "Chính Sách Giao Gas Hỏa Tốc & Giao Nhận An Toàn | Ngọc Gas",
        "description": "Chính sách giao gas hỏa tốc 10 - 15 phút và giao tiêu chuẩn 30 phút tại Dĩ An, Thuận An, Bình Dương. Miễn phí vận chuyển 0 VNĐ, cân gas điện tử tại nhà, bảo đảm an toàn PCCC.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang chủ",
              "item": baseUrl
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Chính sách giao hàng",
              "item": `${baseUrl}/chinh-sach-giao-hang`
            }
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": settings.company_name || "Ngọc Gas",
          "url": baseUrl,
          "logo": settings.logo_url ? (settings.logo_url.startsWith('http') ? settings.logo_url : `${baseUrl}${settings.logo_url}`) : `${baseUrl}/favicon.ico`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": phone,
            "contactType": "customer service",
            "areaServed": "VN",
            "availableLanguage": "Vietnamese"
          }
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="shipping-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Chính sách giao hàng</span>
          </div>

          <div className="hero-content">
            <span className="hero-badge">
              <Truck size={15} /> Chuẩn Minh Bạch Google Merchant Center
            </span>
            <h1 className="hero-title">
              Chính Sách Giao Gas Hỏa Tốc &amp; Quy Trình An Toàn
            </h1>
            <p className="hero-desc">
              Hệ thống phân phối Ngọc Gas cam kết dịch vụ vận chuyển gas tận nhà chuyên nghiệp: 
              <strong> Giao hỏa tốc trong 10 – 15 phút</strong>, <strong>giao tiêu chuẩn khoảng 30 phút</strong>, 
              <strong> Miễn phí vận chuyển 100% (0 VNĐ)</strong> và cân gas đối chứng điện tử công khai tại bếp.
            </p>

            <div className="hero-highlights">
              <div className="highlight-pill">
                <Zap size={16} className="pill-icon text-amber" />
                <span>Hỏa tốc: <strong>10 – 15 Phút</strong></span>
              </div>
              <div className="highlight-pill">
                <Clock size={16} className="pill-icon text-blue" />
                <span>Tiêu chuẩn: <strong>~30 Phút</strong></span>
              </div>
              <div className="highlight-pill">
                <CheckCircle2 size={16} className="pill-icon text-green" />
                <span>Cước phí: <strong>0 VNĐ (Miễn Phí)</strong></span>
              </div>
              <div className="highlight-pill">
                <Scale size={16} className="pill-icon text-purple" />
                <span>Cân gas: <strong>Đủ 100% Tại Bếp</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="shipping-body-section section-padding">
        <div className="container">
          <div className="shipping-layout">
            
            {/* Main Content */}
            <div className="shipping-main-col">
              
              {/* 1. Bảng Thông Số Vận Chuyển Chuẩn Google Merchant Center */}
              <div className="card shipping-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-orange">
                    <Truck size={22} color="#EA580C" />
                  </div>
                  <div>
                    <h2 className="card-title">1. Biểu Phí &amp; Thời Gian Vận Chuyển Chuẩn Google Merchant</h2>
                    <p className="card-subtitle">Áp dụng công khai, minh bạch cho toàn bộ khách hàng đổi gas và mua phụ kiện gas.</p>
                  </div>
                </div>

                <div className="specs-table-wrapper">
                  <table className="specs-table">
                    <tbody>
                      <tr>
                        <th style={{ width: '38%' }}>Phí vận chuyển (Shipping Rate)</th>
                        <td>
                          <span className="badge-free">0 VNĐ — MIỄN PHÍ 100%</span>
                          <p className="table-note">Miễn phí toàn bộ công vận chuyển tận bếp, miễn phí công bê vác lên cầu thang/chung cư và miễn phí công lắp đặt.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Thời gian xử lý &amp; điều phối (Handling Time)</th>
                        <td>
                          <strong>0 – 5 Phút</strong>
                          <p className="table-note">Ngay khi tiếp nhận cuộc gọi qua hotline hoặc tin nhắn Zalo, đơn hàng lập tức được chuyển đến trạm gần nhất.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Giao hàng Hỏa Tốc (Express Transit Time)</th>
                        <td>
                          <strong className="text-amber">10 – 15 Phút</strong>
                          <p className="table-note">Áp dụng trong bán kính 3 – 5km xung quanh hệ thống cửa hàng Ngọc Gas tại Dĩ An, Thuận An, KDC VietSing.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Giao hàng Tiêu Chuẩn (Standard Transit Time)</th>
                        <td>
                          <strong>Khoảng 30 Phút</strong>
                          <p className="table-note">Áp dụng cho các địa chỉ xa hơn, trong giờ cao điểm giao thông hoặc điều kiện thời tiết mưa bão.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Khung giờ phục vụ (Operating Hours)</th>
                        <td>
                          <strong>06:00 – 21:30</strong> (Tất cả các ngày trong tuần, kể cả Thứ 7, Chủ Nhật và ngày Lễ/Tết).
                        </td>
                      </tr>
                      <tr>
                        <th>Giờ chốt đơn trong ngày (Order Cutoff Time)</th>
                        <td>
                          <strong>21:30 hàng ngày</strong>. Đơn đặt sau 21:30 sẽ được hệ thống ưu tiên điều phối giao vào ca sớm sáng hôm sau (từ 06:00).
                        </td>
                      </tr>
                      <tr>
                        <th>Phương thức vận chuyển</th>
                        <td>
                          Đội ngũ kỹ thuật viên giao gas trực thuộc biên chế Ngọc Gas với xe chuyên dụng chở bình an toàn PCCC.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Comparison Grid */}
                <div className="shipping-options-grid">
                  <div className="shipping-option-card express">
                    <div className="option-top">
                      <span className="option-badge">Giao Nhanh Nhất</span>
                      <Zap size={24} className="option-icon" />
                    </div>
                    <h3 className="option-name">Giao Gas Hỏa Tốc</h3>
                    <div className="option-time">10 – 15 Phút</div>
                    <p className="option-desc">Phục vụ tức thì khi khách hàng đang nấu ăn dở bị hết gas đột xuất trong khu vực nội thị.</p>
                    <ul className="option-features">
                      <li>✓ Ưu tiên điều phối trạm gần nhất</li>
                      <li>✓ Miễn phí 100% cước giao hàng</li>
                      <li>✓ Cân điện tử trực tiếp tại bếp</li>
                    </ul>
                  </div>

                  <div className="shipping-option-card standard">
                    <div className="option-top">
                      <span className="option-badge standard-badge">Linh Hoạt</span>
                      <Clock size={24} className="option-icon" />
                    </div>
                    <h3 className="option-name">Giao Gas Tiêu Chuẩn</h3>
                    <div className="option-time">Khoảng 30 Phút</div>
                    <p className="option-desc">Áp dụng cho các khu vực ngoại vi, đơn hẹn giờ trước hoặc trong các khung giờ cao điểm.</p>
                    <ul className="option-features">
                      <li>✓ Giao đúng khung giờ khách hẹn</li>
                      <li>✓ Miễn phí 100% cước giao hàng</li>
                      <li>✓ Kiểm tra rò rỉ van gas an toàn</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Phạm Vi Giao Hàng Chi Tiết */}
              <div className="card shipping-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-blue">
                    <MapPin size={22} color="#0284C7" />
                  </div>
                  <div>
                    <h2 className="card-title">2. Phạm Vi Phục Vụ &amp; Trạm Giao Gas Trọng Điểm</h2>
                    <p className="card-subtitle">Hệ thống trạm giao gas phân bổ chiến lược đảm bảo thời gian tiếp cận nhanh nhất.</p>
                  </div>
                </div>

                <div className="areas-grid">
                  <div className="area-box">
                    <h4 className="area-heading">📍 Thành phố Dĩ An</h4>
                    <p className="area-sub">Phục vụ hỏa tốc 10 – 15 phút tại tất cả các phường:</p>
                    <div className="area-tags">
                      <span className="area-tag">Phường Dĩ An</span>
                      <span className="area-tag">Phường Tân Đông Hiệp</span>
                      <span className="area-tag">Phường Đông Hòa</span>
                      <span className="area-tag">Phường An Bình</span>
                      <span className="area-tag">Phường Bình An</span>
                      <span className="area-tag">Phường Bình Thắng</span>
                      <span className="area-tag">Phường Tân Bình</span>
                    </div>
                    <div className="station-ref">
                      <strong>Trạm trung tâm:</strong> 7 Nguyễn Trung Trực &amp; 7/14 Đường Cây Da, KP. Tân Phú 1.
                    </div>
                  </div>

                  <div className="area-box">
                    <h4 className="area-heading">📍 Thành phố Thuận An</h4>
                    <p className="area-sub">Phục vụ hỏa tốc các khu dân cư và cụm công nghiệp trọng điểm:</p>
                    <div className="area-tags">
                      <span className="area-tag">KDC VietSing</span>
                      <span className="area-tag">KCN VSIP 1</span>
                      <span className="area-tag">Phường An Phú</span>
                      <span className="area-tag">Phường Thuận Giao</span>
                      <span className="area-tag">Phường Bình Hòa</span>
                      <span className="area-tag">Phường Lái Thiêu</span>
                      <span className="area-tag">Ngã tư 550</span>
                    </div>
                    <div className="station-ref">
                      <strong>Trạm trung tâm:</strong> Kiot 5, Đường D5, KDC Vietsing, P. An Phú.
                    </div>
                  </div>
                </div>

                <div className="callout-box">
                  <AlertCircle size={20} className="callout-icon" />
                  <div>
                    <strong>Khu vực lân cận &amp; Giáp ranh:</strong> Các khu vực giáp ranh như TP. Thủ Đức (TP.HCM), Tân Uyên... được phục vụ theo gói <strong>Giao tiêu chuẩn (khoảng 30 phút)</strong>.
                  </div>
                </div>
              </div>

              {/* 3. Quy Trình 5 Bước Giao Nhận Chuẩn Mực */}
              <div className="card shipping-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-green">
                    <ShieldCheck size={22} color="#059669" />
                  </div>
                  <div>
                    <h2 className="card-title">3. Quy Trình 5 Bước Giao Nhận &amp; Kiểm Định An Toàn Tại Bếp</h2>
                    <p className="card-subtitle">Không chỉ giao gas, Ngọc Gas bảo đảm an toàn tính mạng và tài sản cho gian bếp của bạn.</p>
                  </div>
                </div>

                <div className="steps-flow">
                  <div className="step-item">
                    <div className="step-num">1</div>
                    <div className="step-content">
                      <h4 className="step-title">Tiếp nhận yêu cầu &amp; Điều phối thông minh</h4>
                      <p className="step-desc">
                        Tổng đài <strong>1900 9396</strong> hoặc Zalo tiếp nhận địa chỉ, loại bình gas (Sopet Gas One, Phoenix Gas, Luxen Gas 12kg/45kg) và định vị trạm gần nhất để xuất kho trong vòng 3 phút.
                      </p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-num">2</div>
                    <div className="step-content">
                      <h4 className="step-title">Giao gas hỏa tốc đúng cam kết</h4>
                      <p className="step-desc">
                        Kỹ thuật viên mang bình gas chính hãng được bao bọc an toàn, mang đến tận căn bếp của khách hàng đúng thời gian cam kết (10 - 15 phút hỏa tốc hoặc khoảng 30 phút tiêu chuẩn).
                      </p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-num highlight-num">3</div>
                    <div className="step-content">
                      <h4 className="step-title text-primary-dark">Cân gas đối chứng điện tử công khai tại bếp</h4>
                      <p className="step-desc">
                        <strong>Khách hàng tự tay xác thực:</strong> Nhân viên móc cân điện tử cầm tay chuẩn kiểm định, cân trực tiếp trước mặt khách. Công thức minh bạch: 
                        <span className="formula-badge">Tổng trọng lượng = Khối lượng vỏ dập nổi trên tai bình + 12kg gas ruột</span>.
                      </p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-num">4</div>
                    <div className="step-content">
                      <h4 className="step-title">Lắp đặt &amp; Đo kiểm tra rò rỉ khí gas PCCC</h4>
                      <p className="step-desc">
                        Tháo niêm phong màng co nhiệt trước mặt khách, gắn van điều áp chuẩn xác, dùng thiết bị chuyên dụng hoặc dung dịch tạo bọt kiểm tra độ kín tuyệt đối tại cổ van và khớp nối ống dẫn.
                      </p>
                    </div>
                  </div>

                  <div className="step-item">
                    <div className="step-num">5</div>
                    <div className="step-content">
                      <h4 className="step-title">Vệ sinh bếp miễn phí &amp; Bàn giao sổ bảo hiểm</h4>
                      <p className="step-desc">
                        Kỹ thuật viên cạo sạch muội than mâm chia lửa, chỉnh gió cho lửa xanh tiết kiệm gas, dán tem số hotline <strong>1900 9396</strong> và bàn giao hóa đơn/sổ bảo hiểm trách nhiệm sản phẩm trị giá 5 tỷ đồng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Chính Sách Kiểm Tra & Đổi Trả Khi Giao Nhận */}
              <div className="card shipping-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-purple">
                    <Scale size={22} color="#7C3AED" />
                  </div>
                  <div>
                    <h2 className="card-title">4. Quyền Kiểm Tra Hàng Hóa &amp; Chính Sách Đổi Trả Ngay Tại Chỗ</h2>
                    <p className="card-subtitle">Khách hàng có toàn quyền từ chối nhận nếu sản phẩm không đạt chuẩn 100% an toàn.</p>
                  </div>
                </div>

                <div className="rights-grid">
                  <div className="right-card">
                    <CheckCircle2 size={20} className="right-icon" />
                    <div>
                      <strong>Nguyên tem niêm phong màng co:</strong>
                      <p>Màng co nhiệt cổ van nguyên vẹn của thương hiệu Sopet Gas One, Phoenix Gas hoặc Luxen Gas, không có vết cắt dán lại.</p>
                    </div>
                  </div>

                  <div className="right-card">
                    <CheckCircle2 size={20} className="right-icon" />
                    <div>
                      <strong>Tem chống hàng giả QR / Hologram:</strong>
                      <p>Khách hàng có thể quét mã QR xác thực nguồn gốc chiết nạp xuất xưởng ngay trên điện thoại trước khi thanh toán.</p>
                    </div>
                  </div>

                  <div className="right-card">
                    <CheckCircle2 size={20} className="right-icon" />
                    <div>
                      <strong>Đổi ngay bình khác nếu thiếu cân:</strong>
                      <p>Nếu cân điện tử hiển thị thiếu dù chỉ 100 gram, kỹ thuật viên lập tức đổi bình gas khác và tặng phiếu ưu đãi xin lỗi.</p>
                    </div>
                  </div>

                  <div className="right-card">
                    <CheckCircle2 size={20} className="right-icon" />
                    <div>
                      <strong>Thu hồi &amp; Đổi ngang mọi vỏ bình:</strong>
                      <p>Đổi ngang miễn phí tất cả vỏ bình gas dân dụng hợp pháp trên thị trường (Petrolimex, Saigon Petro, Total, Gia Đình...) sang bình mới của Ngọc Gas.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Câu Hỏi Thường Gặp (FAQ) Vận Chuyển Gas */}
              <div className="card shipping-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-amber">
                    <HelpCircle size={22} color="#D97706" />
                  </div>
                  <div>
                    <h2 className="card-title">5. Các Câu Hỏi Thường Gặp Về Vận Chuyển Gas (FAQ)</h2>
                    <p className="card-subtitle">Giải đáp thắc mắc về cước phí, thời gian và quy cách phục vụ của Ngọc Gas.</p>
                  </div>
                </div>

                <div className="faq-list">
                  <div className="faq-item">
                    <h4 className="faq-q">❓ Tôi ở chung cư tầng cao không có thang máy thì có bị tính phụ phí bê bình không?</h4>
                    <p className="faq-a">
                      <strong>Hoàn toàn KHÔNG.</strong> Ngọc Gas thực hiện chính sách <strong>Miễn phí 100% công vận chuyển tận bếp</strong> cho mọi gia đình, kể cả chung cư cao tầng hay nhà trọ thang bộ.
                    </p>
                  </div>

                  <div className="faq-item">
                    <h4 className="faq-q">❓ Làm sao để tôi được giao gas hỏa tốc trong 10 – 15 phút?</h4>
                    <p className="faq-a">
                      Khi cần đổi gas gấp, quý khách vui lòng gọi trực tiếp hotline <strong>1900 9396</strong>. Tổng đài viên sẽ bấm phím điều chuyển tức thì cho kỹ thuật viên đang trực tuần tra ngay tại tuyến đường gần nhà bạn nhất.
                    </p>
                  </div>

                  <div className="faq-item">
                    <h4 className="faq-q">❓ Nếu thời tiết mưa to hoặc giờ tan tầm kẹt xe thì thời gian giao là bao lâu?</h4>
                    <p className="faq-a">
                      Trong điều kiện thời tiết xấu hoặc giờ cao điểm, thời gian giao hàng sẽ rơi vào gói <strong>Giao tiêu chuẩn (khoảng 30 phút)</strong>. Nhân viên giao hàng sẽ chủ động gọi điện báo trước thời gian dự kiến để quý khách an tâm.
                    </p>
                  </div>

                  <div className="faq-item">
                    <h4 className="faq-q">❓ Tôi có thể đặt hẹn giờ giao gas cụ thể được không?</h4>
                    <p className="faq-a">
                      Có. Quý khách có thể gọi hotline hoặc nhắn tin Zalo hẹn chính xác khung giờ quý khách có mặt ở nhà (ví dụ 18h30 sau giờ làm việc). Đúng giờ hẹn, kỹ thuật viên sẽ có mặt để bàn giao và lắp đặt.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Support */}
            <div className="shipping-sidebar-col">
              
              {/* Box Hotline Khẩn Cấp */}
              <div className="sidebar-card hotline-card">
                <span className="hotline-badge">⚡ Tổng Đài Hỏa Tốc</span>
                <h3 className="hotline-card-title">Cần Đổi Gas Gấp?</h3>
                <p className="hotline-card-desc">
                  Gọi ngay tổng đài để nhân viên giao gas hỏa tốc 10 – 15 phút đến tận căn bếp của bạn.
                </p>
                <a href={`tel:${cleanPhone}`} className="hotline-big-btn">
                  <PhoneCall size={20} />
                  <span>{phone}</span>
                </a>
                <div className="working-time-sub">
                  <Clock size={14} />
                  <span>{workingHours}</span>
                </div>
              </div>

              {/* Box Địa Chỉ Trụ Sở */}
              <div className="sidebar-card info-sidebar-card">
                <h4 className="sidebar-title">Thông Tin Trực Ban</h4>
                <ul className="sidebar-info-list">
                  <li>
                    <MapPin size={18} className="sidebar-icon" />
                    <div>
                      <strong>Trụ sở chính:</strong>
                      <p>{address}</p>
                    </div>
                  </li>
                  <li>
                    <Truck size={18} className="sidebar-icon" />
                    <div>
                      <strong>Đội xe giao gas:</strong>
                      <p>Trực ban thường trực tại 3 cụm trạm Dĩ An, Thuận An &amp; KDC VietSing.</p>
                    </div>
                  </li>
                  <li>
                    <ShieldCheck size={18} className="sidebar-icon" />
                    <div>
                      <strong>Pháp lý thương mại:</strong>
                      <p>Phân phối ủy quyền Sopet Gas One, Phoenix Gas &amp; Luxen Gas.</p>
                    </div>
                  </li>
                </ul>

                <Link href="/gia-gas-hom-nay" className="sidebar-link-btn">
                  <span>Xem bảng giá gas hôm nay</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Box Cam Kết */}
              <div className="sidebar-card commitment-card">
                <Flame size={28} className="flame-icon" />
                <h4>Cam Kết 3 Không</h4>
                <ul className="commit-list">
                  <li>❌ Không thu phí vận chuyển</li>
                  <li>❌ Không giao gas thiếu ký</li>
                  <li>❌ Không sử dụng bình trôi nổi</li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Embedded Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .shipping-hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0C4A6E 100%);
          color: #FFFFFF;
          padding: 36px 0 54px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
        }

        .shipping-hero::after {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, rgba(234, 88, 12, 0) 70%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 9999px;
          background-color: rgba(234, 88, 12, 0.2);
          border: 1px solid rgba(234, 88, 12, 0.4);
          color: #FDBA74;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 900;
          line-height: 1.25;
          margin: 0 0 14px 0;
          color: #FFFFFF;
          letter-spacing: -0.5px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 24px;
          }
        }

        .hero-desc {
          font-size: 15.5px;
          color: #CBD5E1;
          line-height: 1.65;
          max-width: 820px;
          margin: 0 0 24px 0;
        }

        .hero-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          padding: 7px 16px;
          border-radius: 30px;
          font-size: 13.5px;
          color: #F1F5F9;
        }

        .text-amber { color: #F59E0B; }
        .text-blue { color: #38BDF8; }
        .text-green { color: #34D399; }
        .text-purple { color: #C084FC; }

        .shipping-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 36px;
        }

        @media (max-width: 1024px) {
          .shipping-layout {
            grid-template-columns: 1fr;
          }
        }

        .shipping-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 28px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 640px) {
          .shipping-card {
            padding: 20px;
          }
        }

        .card-header-styled {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid #F1F5F9;
        }

        .header-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-orange { background-color: #FFF7ED; border: 1px solid #FFEDD5; }
        .bg-blue { background-color: #F0F9FF; border: 1px solid #E0F2FE; }
        .bg-green { background-color: #ECFDF5; border: 1px solid #D1FAE5; }
        .bg-purple { background-color: #FAF5FF; border: 1px solid #F3E8FF; }
        .bg-amber { background-color: #FFFBEB; border: 1px solid #FEF3C7; }

        .card-title {
          font-size: 21px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
          letter-spacing: -0.3px;
        }

        @media (max-width: 640px) {
          .card-title {
            font-size: 18px;
          }
        }

        .card-subtitle {
          font-size: 14px;
          color: #64748B;
          margin: 0;
          line-height: 1.5;
        }

        /* Specs Table */
        .specs-table-wrapper {
          overflow-x: auto;
          margin-bottom: 28px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14.5px;
        }

        .specs-table th, .specs-table td {
          padding: 14px 18px;
          text-align: left;
          border-bottom: 1px solid #F1F5F9;
        }

        .specs-table tr:last-child th, .specs-table tr:last-child td {
          border-bottom: none;
        }

        .specs-table th {
          background-color: #F8FAFC;
          font-weight: 700;
          color: #334155;
          vertical-align: top;
        }

        .specs-table td {
          color: #0F172A;
          vertical-align: top;
        }

        .badge-free {
          display: inline-block;
          background: #059669;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 13px;
          padding: 4px 12px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }

        .table-note {
          margin: 6px 0 0 0;
          font-size: 13px;
          color: #64748B;
          line-height: 1.5;
        }

        /* Shipping Option Grid */
        .shipping-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .shipping-options-grid {
            grid-template-columns: 1fr;
          }
        }

        .shipping-option-card {
          border-radius: 14px;
          padding: 24px;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .shipping-option-card.express {
          background: #FFF7ED;
          border: 2px solid #FDBA74;
        }

        .shipping-option-card.standard {
          background: #F0FDF4;
          border: 2px solid #BBF7D0;
        }

        .option-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .option-badge {
          background: #EA580C;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 20px;
        }

        .standard-badge {
          background: #059669;
        }

        .option-icon {
          color: #EA580C;
        }

        .shipping-option-card.standard .option-icon {
          color: #059669;
        }

        .option-name {
          font-size: 18px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
        }

        .option-time {
          font-size: 26px;
          font-weight: 900;
          color: #EA580C;
          margin-bottom: 8px;
        }

        .shipping-option-card.standard .option-time {
          color: #059669;
        }

        .option-desc {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .option-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          color: #1E293B;
          font-weight: 600;
        }

        /* Areas Grid */
        .areas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (max-width: 640px) {
          .areas-grid {
            grid-template-columns: 1fr;
          }
        }

        .area-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 20px;
        }

        .area-heading {
          font-size: 16px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
        }

        .area-sub {
          font-size: 13px;
          color: #64748B;
          margin: 0 0 12px 0;
        }

        .area-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }

        .area-tag {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          color: #334155;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .station-ref {
          font-size: 12.5px;
          color: #475569;
          background: #FFFFFF;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px dashed #CBD5E1;
        }

        .callout-box {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 13.5px;
          color: #1E40AF;
        }

        .callout-icon {
          color: #2563EB;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Steps Flow */
        .steps-flow {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .step-item {
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }

        .step-num {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0F172A;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .highlight-num {
          background: #EA580C;
          box-shadow: 0 0 12px rgba(234, 88, 12, 0.4);
        }

        .step-content {
          flex: 1;
          padding-bottom: 16px;
          border-bottom: 1px solid #F1F5F9;
        }

        .step-item:last-child .step-content {
          border-bottom: none;
          padding-bottom: 0;
        }

        .step-title {
          font-size: 16px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
        }

        .text-primary-dark {
          color: #C2410C;
        }

        .step-desc {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        .formula-badge {
          display: block;
          margin-top: 8px;
          background: #FEF3C7;
          border: 1px dashed #F59E0B;
          color: #92400E;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 8px;
        }

        /* Rights Grid */
        .rights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .rights-grid {
            grid-template-columns: 1fr;
          }
        }

        .right-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px;
        }

        .right-icon {
          color: #059669;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .right-card strong {
          display: block;
          font-size: 14px;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .right-card p {
          font-size: 13px;
          color: #64748B;
          line-height: 1.5;
          margin: 0;
        }

        /* FAQ */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .faq-item {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px 20px;
        }

        .faq-q {
          font-size: 15px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 8px 0;
          line-height: 1.45;
        }

        .faq-a {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        /* Sidebar */
        .shipping-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .hotline-card {
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .hotline-badge {
          display: inline-block;
          background: rgba(234, 88, 12, 0.3);
          color: #FDBA74;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .hotline-card-title {
          font-size: 20px;
          font-weight: 900;
          margin: 0 0 8px 0;
          color: #FFFFFF;
        }

        .hotline-card-desc {
          font-size: 13px;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0 0 18px 0;
        }

        .hotline-big-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #EA580C;
          color: #FFFFFF;
          padding: 12px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 0.5px;
          box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4);
          transition: transform 0.2s, background-color 0.2s;
        }

        .hotline-big-btn:hover {
          background: #C2410C;
          transform: translateY(-2px);
        }

        .working-time-sub {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: #94A3B8;
          margin-top: 14px;
        }

        .sidebar-title {
          font-size: 16px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 16px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #F1F5F9;
        }

        .sidebar-info-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sidebar-info-list li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 13px;
        }

        .sidebar-icon {
          color: #EA580C;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sidebar-info-list strong {
          display: block;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .sidebar-info-list p {
          color: #64748B;
          margin: 0;
          line-height: 1.45;
        }

        .sidebar-link-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          color: #0F172A;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .sidebar-link-btn:hover {
          background: #F1F5F9;
          color: #EA580C;
        }

        .commitment-card {
          background: #FFFBEB;
          border: 1px solid #FDE68A;
          text-align: center;
        }

        .flame-icon {
          color: #EA580C;
          margin: 0 auto 10px auto;
        }

        .commitment-card h4 {
          font-size: 16px;
          font-weight: 800;
          color: #92400E;
          margin: 0 0 12px 0;
        }

        .commit-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
          color: #78350F;
          font-weight: 700;
          text-align: left;
        }
      ` }} />
    </>
  );
}
