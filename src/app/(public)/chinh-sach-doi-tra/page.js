import Link from 'next/link';
import { 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  PhoneCall, 
  MapPin, 
  Flame, 
  ArrowRight,
  HelpCircle,
  Scale
} from 'lucide-react';
import { getAllSettings } from '@/lib/settingsHelper';

export const revalidate = 60;

export async function generateMetadata() {
  const settings = await getAllSettings();
  const brandName = settings.site_name || settings.company_name || 'Ngọc Gas';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';

  return {
    title: `Chính Sách Đổi Trả Bình Gas & Hoàn Tiền 100% | ${brandName}`,
    description: `Chính sách đổi trả bình gas và phụ kiện trong 7 ngày miễn phí 100% tại Dĩ An, Thuận An & Bình Dương. Đổi bình mới tức thì hoặc hoàn tiền 100% nếu phát hiện rò rỉ, thiếu ký hoặc lửa đỏ. Hotline 1900 9396.`,
    alternates: {
      canonical: `${baseUrl}/chinh-sach-doi-tra`
    },
    openGraph: {
      title: `Chính Sách Đổi Trả & Hoàn Tiền Bình Gas | ${brandName}`,
      description: `Đổi trả miễn phí trong 7 ngày đối với bình gas và phụ kiện lỗi. Kỹ thuật viên đổi bình tận nhà trong 15-30 phút. Hoàn tiền 100%.`,
      url: `${baseUrl}/chinh-sach-doi-tra`,
      siteName: brandName,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Chính Sách Đổi Trả & Hoàn Tiền Bình Gas | ${brandName}`,
      description: `Đổi trả miễn phí trong 7 ngày đối với bình gas và phụ kiện lỗi.`
    }
  };
}

export default async function ChinhSachDoiTraPage() {
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
        "@id": `${baseUrl}/chinh-sach-doi-tra#webpage`,
        "url": `${baseUrl}/chinh-sach-doi-tra`,
        "name": "Chính Sách Đổi Trả Bình Gas & Hoàn Tiền 100% | Ngọc Gas",
        "description": "Chính sách đổi trả bình gas và phụ kiện trong 7 ngày miễn phí 100% tại Dĩ An, Thuận An, Bình Dương. Đổi mới tận nhà hoặc hoàn tiền 100%.",
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
              "name": "Chính sách đổi trả",
              "item": `${baseUrl}/chinh-sach-doi-tra`
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

      {/* Hero Header */}
      <section className="return-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Chính sách đổi trả</span>
          </div>

          <div className="hero-content">
            <span className="hero-badge">
              <RotateCcw size={15} /> Chuẩn Minh Bạch Google Merchant Center
            </span>
            <h1 className="hero-title">
              Chính Sách Đổi Trả Bình Gas &amp; Hoàn Tiền 100%
            </h1>
            <p className="hero-desc">
              Nhằm đảm bảo quyền lợi tối cao và an toàn tuyệt đối cho mọi gia đình, hệ thống phân phối <strong>Ngọc Gas</strong> áp dụng chính sách đổi trả minh bạch: 
              <strong> Đổi trả miễn phí trong vòng 7 ngày</strong>, <strong>Phí đổi trả 0 VNĐ</strong> và cam kết <strong>Hoàn tiền 100%</strong> nếu quý khách không hài lòng về chất lượng.
            </p>

            <div className="hero-highlights">
              <div className="highlight-pill">
                <Clock size={16} className="pill-icon text-amber" />
                <span>Thời hạn: <strong>7 Ngày Đổi Trả</strong></span>
              </div>
              <div className="highlight-pill">
                <DollarSign size={16} className="pill-icon text-green" />
                <span>Phí đổi trả: <strong>0 VNĐ (Miễn Phí)</strong></span>
              </div>
              <div className="highlight-pill">
                <ShieldCheck size={16} className="pill-icon text-blue" />
                <span>Cam kết: <strong>1 Đổi 1 Hoặc Hoàn Tiền 100%</strong></span>
              </div>
              <div className="highlight-pill">
                <Scale size={16} className="pill-icon text-purple" />
                <span>Thời gian xử lý: <strong>15 – 30 Phút Tận Nhà</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="return-body-section section-padding">
        <div className="container">
          <div className="return-layout">
            
            {/* Main Column */}
            <div className="return-main-col">
              
              {/* 1. Bảng Thông Số Đổi Trả Chuẩn Google Merchant */}
              <div className="card return-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-orange">
                    <RotateCcw size={22} color="#EA580C" />
                  </div>
                  <div>
                    <h2 className="card-title">1. Tóm Tắt Quy Định Đổi Trả Chuẩn Google Merchant</h2>
                    <p className="card-subtitle">Áp dụng công khai, minh bạch cho mọi khách hàng mua sắm và đổi gas tại Ngọc Gas.</p>
                  </div>
                </div>

                <div className="specs-table-wrapper">
                  <table className="specs-table">
                    <tbody>
                      <tr>
                        <th style={{ width: '38%' }}>Thời hạn chấp nhận đổi trả (Return Window)</th>
                        <td>
                          <span className="badge-window">7 NGÀY KỂ TỪ KHI NHẬN HÀNG</span>
                          <p className="table-note">Đối với bình gas dân dụng 12kg và phụ kiện (van gas, dây dẫn). Đối với bình gas công nghiệp 45kg: hỗ trợ xử lý kỹ thuật 24/7 trong suốt quá trình sử dụng.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Phí hoàn trả hàng (Return Shipping Fee)</th>
                        <td>
                          <strong className="text-green">0 VNĐ — MIỄN PHÍ 100%</strong>
                          <p className="table-note">Khách hàng không phải chi trả bất kỳ khoản phí vận chuyển hay phụ phí nào khi yêu cầu đổi trả sản phẩm lỗi.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Phương thức đổi trả (Return Method)</th>
                        <td>
                          <strong>Đổi trả tận nơi tại nhà (In-store &amp; At-home pickup)</strong>
                          <p className="table-note">Kỹ thuật viên của Ngọc Gas trực tiếp mang bình mới đến nhà khách hàng để kiểm tra và thu hồi bình cũ.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Hình thức giải quyết (Refund / Exchange Type)</th>
                        <td>
                          <strong>Đổi bình mới 100% hoặc Hoàn tiền 100%</strong>
                          <p className="table-note">Hoàn trả tiền mặt tại chỗ hoặc chuyển khoản ngân hàng ngay trong vòng 24 giờ làm việc.</p>
                        </td>
                      </tr>
                      <tr>
                        <th>Tình trạng sản phẩm áp dụng</th>
                        <td>
                          Bình gas mới nguyên niêm phong màng co HOẶC bình gas đang sử dụng nhưng phát hiện lỗi kỹ thuật, rò rỉ, đỏ lửa hoặc thiếu cân.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Các Trường Hợp Được Đổi Trả & Hoàn Tiền */}
              <div className="card return-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-green">
                    <CheckCircle2 size={22} color="#059669" />
                  </div>
                  <div>
                    <h2 className="card-title">2. Các Trường Hợp Được Áp Dụng Đổi Trả Miễn Phí</h2>
                    <p className="card-subtitle">Ngọc Gas cam kết đổi mới ngay lập tức trong các tình huống sau:</p>
                  </div>
                </div>

                <div className="cases-grid">
                  <div className="case-item valid">
                    <div className="case-icon">🔥</div>
                    <div>
                      <strong>Bình gas bị đỏ lửa, muội than:</strong>
                      <p>Khí gas cháy sinh ra lửa đỏ hoặc khét đáy nồi do tạp chất từ nhà máy chiết nạp, kỹ thuật viên sẽ thay thế bình gas mới ngay.</p>
                    </div>
                  </div>

                  <div className="case-item valid">
                    <div className="case-icon">⚖️</div>
                    <div>
                      <strong>Phát hiện thiếu trọng lượng:</strong>
                      <p>Nếu cân kiểm tra phát hiện ruột gas thiếu so với tiêu chuẩn 12kg công bố, Ngọc Gas đổi ngay bình mới và bồi thường chi phí.</p>
                    </div>
                  </div>

                  <div className="case-item valid">
                    <div className="case-icon">🛡️</div>
                    <div>
                      <strong>Cổ van xì gas, lỗi rò rỉ PCCC:</strong>
                      <p>Cụm van điều áp hoặc cổ bình bị hở ron, rò rỉ gas gây mất an toàn sẽ được thu hồi hỏa tốc trong 15 phút.</p>
                    </div>
                  </div>

                  <div className="case-item valid">
                    <div className="case-icon">📦</div>
                    <div>
                      <strong>Giao sai chủng loại thương hiệu:</strong>
                      <p>Giao không đúng loại van (van ngang POL / van chụp Compact) hoặc sai thương hiệu khách yêu cầu (Sopet, Phoenix, Luxen Gas).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Quy Trình 4 Bước Đổi Trả Tận Nhà Nhanh Chóng */}
              <div className="card return-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-blue">
                    <Clock size={22} color="#0284C7" />
                  </div>
                  <div>
                    <h2 className="card-title">3. Quy Trình 4 Bước Tiếp Nhận &amp; Đổi Trả Hỏa Tốc</h2>
                    <p className="card-subtitle">Xử lý gọn gàng, không thủ tục rườm rà, có mặt tại nhà khách hàng trong 15 – 30 phút.</p>
                  </div>
                </div>

                <div className="process-flow">
                  <div className="process-step">
                    <div className="step-circle">1</div>
                    <div className="step-detail">
                      <h4>Bước 1: Tiếp nhận yêu cầu qua Hotline 1900 9396</h4>
                      <p>Khách hàng chỉ cần gọi điện thoại hoặc nhắn tin Zalo thông báo hiện tượng bình gas cần đổi trả kèm địa chỉ.</p>
                    </div>
                  </div>

                  <div className="process-step">
                    <div className="step-circle">2</div>
                    <div className="step-detail">
                      <h4>Bước 2: Kỹ thuật viên có mặt tại nhà (15 – 30 Phút)</h4>
                      <p>Kỹ thuật viên mang theo bình gas mới, cân điện tử và thiết bị đo áp suất kiểm tra hiện trường miễn phí.</p>
                    </div>
                  </div>

                  <div className="process-step">
                    <div className="step-circle highlight">3</div>
                    <div className="step-detail">
                      <h4>Bước 3: Xác minh &amp; Đổi bình mới ngay tại chỗ</h4>
                      <p>Thực hiện đổi bình gas mới 100% nguyên màng co niêm phong hoặc thay thế bộ van dây an toàn mới.</p>
                    </div>
                  </div>

                  <div className="process-step">
                    <div className="step-circle">4</div>
                    <div className="step-detail">
                      <h4>Bước 4: Hoàn tiền hoặc bàn giao biên bản nghiệm thu</h4>
                      <p>Nếu khách hàng có nhu cầu trả hàng hoàn tiền, nhân viên hoàn trả 100% số tiền đã thanh toán ngay tại chỗ.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Chính Sách Hoàn Tiền (Refund Policy) */}
              <div className="card return-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-purple">
                    <DollarSign size={22} color="#7C3AED" />
                  </div>
                  <div>
                    <h2 className="card-title">4. Quy Định &amp; Thời Gian Hoàn Tiền (Refund Policy)</h2>
                    <p className="card-subtitle">Minh bạch dòng tiền, đảm bảo quyền lợi tuyệt đối cho người tiêu dùng.</p>
                  </div>
                </div>

                <div className="refund-methods-grid">
                  <div className="refund-card">
                    <strong>💵 Hoàn tiền mặt trực tiếp:</strong>
                    <p>Áp dụng ngay khi kỹ thuật viên đến thu hồi bình tại nhà khách hàng. Nhận đủ 100% tiền mặt không khấu trừ bất kỳ chi phí nào.</p>
                  </div>

                  <div className="refund-card">
                    <strong>💳 Hoàn tiền qua Chuyển khoản / Ví điện tử:</strong>
                    <p>Xử lý qua chuyển khoản ngân hàng 24/7 (Vietcombank, MB, Techcombank, Momo, ZaloPay). Thời gian nhận tiền trong vòng <strong>24 giờ làm việc</strong>.</p>
                  </div>
                </div>

                <div className="refund-note-box">
                  <ShieldCheck size={20} className="note-icon" />
                  <div>
                    <strong>Chính sách hoàn tiền đặt cọc vỏ bình gas:</strong>
                    <p>Khách hàng khi không còn nhu cầu sử dụng gas có thể trả lại vỏ bình bất cứ lúc nào. Ngọc Gas cam kết <strong>hoàn trả 100% tiền đặt cọc vỏ bình</strong> (theo đơn giá cọc ban đầu) và hỗ trợ cử nhân viên đến tận nhà thu hồi miễn phí.</p>
                  </div>
                </div>
              </div>

              {/* 5. Câu Hỏi Thường Gặp (FAQ) */}
              <div className="card return-card">
                <div className="card-header-styled">
                  <div className="header-icon-box bg-amber">
                    <HelpCircle size={22} color="#D97706" />
                  </div>
                  <div>
                    <h2 className="card-title">5. Các Câu Hỏi Thường Gặp Về Đổi Trả (FAQ)</h2>
                    <p className="card-subtitle">Giải đáp các tình huống thực tế của khách hàng khi đổi trả bình gas.</p>
                  </div>
                </div>

                <div className="faq-list">
                  <div className="faq-item">
                    <h4 className="faq-q">❓ Tôi đã khui màng co và nấu được 1 – 2 ngày thì có được đổi trả không?</h4>
                    <p className="faq-a">
                      <strong>CÓ.</strong> Trong vòng 7 ngày, nếu quý khách nhận thấy bình gas bị đỏ lửa làm đen nồi, lửa yếu bất thường hoặc có mùi gas rò rỉ, Ngọc Gas vẫn đổi ngay bình gas mới 100% hoàn toàn miễn phí.
                    </p>
                  </div>

                  <div className="faq-item">
                    <h4 className="faq-q">❓ Tôi có phải mang bình gas ra cửa hàng để đổi không?</h4>
                    <p className="faq-a">
                      <strong>KHÔNG CẦN.</strong> Quý khách chỉ cần gọi hotline <strong>1900 9396</strong>. Nhân viên kỹ thuật của Ngọc Gas sẽ đến tận căn bếp của quý khách tại Dĩ An, Thuận An để thực hiện đổi trả và kiểm tra an toàn.
                    </p>
                  </div>

                  <div className="faq-item">
                    <h4 className="faq-q">❓ Nếu đổi vỏ hãng khác sang bình Ngọc Gas có bị từ chối bảo hành không?</h4>
                    <p className="faq-a">
                      <strong>KHÔNG.</strong> Tất cả bình gas do Ngọc Gas phân phối đều được bảo hành chính hãng và bảo hiểm cháy nổ trị giá 5 tỷ đồng, không phân biệt trước đó quý khách đổi từ vỏ hãng nào sang.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar Column */}
            <div className="return-sidebar-col">
              
              {/* Box Hotline Hỗ Trợ Đổi Trả */}
              <div className="sidebar-card hotline-card">
                <span className="hotline-badge">⚡ Tổng Đài Hỗ Trợ</span>
                <h3 className="hotline-card-title">Yêu Cầu Đổi Trả?</h3>
                <p className="hotline-card-desc">
                  Gọi ngay tổng đài để kỹ thuật viên có mặt xử lý đổi bình trong 15 – 30 phút.
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

              {/* Box Thông Tin Tiếp Nhận */}
              <div className="sidebar-card info-sidebar-card">
                <h4 className="sidebar-title">Địa Điểm Tiếp Nhận Đổi Trả</h4>
                <ul className="sidebar-info-list">
                  <li>
                    <MapPin size={18} className="sidebar-icon" />
                    <div>
                      <strong>Trụ sở chính:</strong>
                      <p>{address}</p>
                    </div>
                  </li>
                  <li>
                    <RotateCcw size={18} className="sidebar-icon" />
                    <div>
                      <strong>Trạm giao gas:</strong>
                      <p>Hệ thống 3 trạm trực tại Dĩ An, Thuận An &amp; KDC VietSing phục vụ đổi trả tại nhà.</p>
                    </div>
                  </li>
                  <li>
                    <ShieldCheck size={18} className="sidebar-icon" />
                    <div>
                      <strong>Bảo hiểm sản phẩm:</strong>
                      <p>Cam kết bồi thường 100% nếu có sự cố rò rỉ khí gas do lỗi kỹ thuật bình.</p>
                    </div>
                  </li>
                </ul>

                <Link href="/chinh-sach-giao-hang" className="sidebar-link-btn">
                  <span>Xem chính sách giao hàng</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Box Cam Kết */}
              <div className="sidebar-card commitment-card">
                <Flame size={28} className="flame-icon" />
                <h4>Cam Kết Vàng</h4>
                <ul className="commit-list">
                  <li>✓ 100% Miễn phí đổi trả tại nhà</li>
                  <li>✓ Đổi bình mới trong 15 - 30 phút</li>
                  <li>✓ Hoàn tiền 100% nếu không hài lòng</li>
                  <li>✓ Bảo hiểm PCCC 5 tỷ đồng</li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Embedded CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .return-hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0C4A6E 100%);
          color: #FFFFFF;
          padding: 36px 0 54px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
        }

        .return-hero::after {
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

        .return-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 36px;
        }

        @media (max-width: 1024px) {
          .return-layout {
            grid-template-columns: 1fr;
          }
        }

        .return-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 28px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        @media (max-width: 640px) {
          .return-card {
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

        .badge-window {
          display: inline-block;
          background: #EA580C;
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

        /* Cases Grid */
        .cases-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .cases-grid {
            grid-template-columns: 1fr;
          }
        }

        .case-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px;
        }

        .case-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .case-item strong {
          display: block;
          font-size: 15px;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .case-item p {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        /* Process Flow */
        .process-flow {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .process-step {
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }

        .step-circle {
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

        .step-circle.highlight {
          background: #059669;
          box-shadow: 0 0 12px rgba(5, 150, 105, 0.4);
        }

        .step-detail {
          flex: 1;
          padding-bottom: 16px;
          border-bottom: 1px solid #F1F5F9;
        }

        .process-step:last-child .step-detail {
          border-bottom: none;
          padding-bottom: 0;
        }

        .step-detail h4 {
          font-size: 16px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px 0;
        }

        .step-detail p {
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        /* Refund Methods Grid */
        .refund-methods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 640px) {
          .refund-methods-grid {
            grid-template-columns: 1fr;
          }
        }

        .refund-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px;
        }

        .refund-card strong {
          display: block;
          font-size: 15px;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .refund-card p {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        .refund-note-box {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          padding: 16px 20px;
          border-radius: 12px;
        }

        .note-icon {
          color: #059669;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .refund-note-box strong {
          display: block;
          font-size: 14.5px;
          color: #065F46;
          margin-bottom: 4px;
        }

        .refund-note-box p {
          font-size: 13.5px;
          color: #047857;
          line-height: 1.5;
          margin: 0;
        }

        /* FAQ */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
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
        .return-sidebar-col {
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
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          text-align: center;
        }

        .flame-icon {
          color: #059669;
          margin: 0 auto 10px auto;
        }

        .commitment-card h4 {
          font-size: 16px;
          font-weight: 800;
          color: #065F46;
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
          color: #047857;
          font-weight: 700;
          text-align: left;
        }
      ` }} />
    </>
  );
}
