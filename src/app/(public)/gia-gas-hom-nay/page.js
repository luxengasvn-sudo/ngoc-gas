import Link from 'next/link';
import { ShieldCheck, Clock, PhoneCall, CheckCircle2, Award, Truck, Sparkles } from 'lucide-react';
import GasPriceWidget from '@/components/GasPriceWidget';
import { getAllProducts } from '@/lib/productsHelper';
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getCurrentDateInfo() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const [year, month, day] = formatter.format(now).split('-');

  return {
    day,
    month,
    year,
    fullDateStr: `${day}/${month}/${year}`,
    monthYearStr: `Tháng ${month}/${year}`
  };
}

export async function generateMetadata() {
  const { fullDateStr, monthYearStr } = getCurrentDateInfo();
  const settings = await getAllSettings();
  const brandName = settings.site_name || 'Ngọc Gas';

  return {
    title: `Bảng Giá Gas Hôm Nay Ngày ${fullDateStr} Mới Nhất`,
    description: `Cập nhật bảng giá gas hôm nay ngày ${fullDateStr} (${monthYearStr}) chính hãng Sopet, Phoenix, Luxen Gas 12kg & 45kg tại TP. HCM & Bình Dương. Giao nhanh 15 phút, cân đủ ký tận nơi.`,
    keywords: [
      'giá gas hôm nay',
      `giá gas ngày ${fullDateStr}`,
      `bảng giá gas ${monthYearStr}`,
      'giá bình gas 12kg',
      'giá gas luxen',
      'giá gas sopet',
      'giá gas phoenix',
      'giá gas bình dương',
      'đổi gas dĩ an'
    ],
    openGraph: {
      title: `Bảng Giá Gas Hôm Nay Ngày ${fullDateStr} - ${brandName}`,
      description: `Bảng giá bình gas dân dụng 12kg & công nghiệp 45kg niêm yết mới nhất ngày ${fullDateStr}. Giao gas tận nhà 15 phút.`,
      url: '/gia-gas-hom-nay',
      type: 'website'
    }
  };
}

export default async function GasPriceTodayPage() {
  const { fullDateStr, monthYearStr, day, month, year } = getCurrentDateInfo();
  const products = await getAllProducts();
  const settings = await getAllSettings();

  const activeProducts = products.filter(p => p.is_active === undefined || p.is_active === 1 || p.is_active === true || p.is_active === '1');
  const cleanPhone = (settings.phone || '19009396').replace(/\./g, '').trim();

  // Dynamic Notes from settings
  let notes = [
    'Giá trên đã bao gồm thuế VAT và miễn phí công giao gas tận nhà tại TP. Dĩ An, Thuận An & TP. HCM.',
    'Miễn phí kiểm tra van gas, dây dẫn và bảo dưỡng bếp gas định kỳ khi đổi bình.',
    `Đối với khách hàng Nhà hàng, Quán ăn, Bếp ăn công nghiệp sử dụng số lượng lớn, vui lòng liên hệ hotline ${settings.phone || '19009396'} để nhận chiết khấu thương mại tốt nhất.`
  ];
  if (settings.gas_price_notes_json) {
    try {
      const parsed = typeof settings.gas_price_notes_json === 'string' ? JSON.parse(settings.gas_price_notes_json) : settings.gas_price_notes_json;
      if (Array.isArray(parsed) && parsed.length > 0) notes = parsed;
    } catch (e) {}
  }

  // Dynamic Commitments from settings
  let commitments = [
    { title: '100% Bình Gas Chính Hãng', desc: 'Bình gas có tem chống hàng giả, niêm phong màng co nguyên vẹn từ nhà máy Sopet, Phoenix và Luxen Gas.' },
    { title: 'Cân Đủ Ký Tại Nhà', desc: 'Nhân viên luôn mang theo cân điện tử kiểm tra trọng lượng gas ruột đủ 12kg/45kg ngay trước mặt khách hàng.' },
    { title: 'Bảo Hiểm An Toàn 5 Tỷ', desc: 'Tất cả bình gas lưu hành đều được mua bảo hiểm trách nhiệm sản phẩm PCCC lên tới 5.000.000.000 VNĐ.' },
    { title: 'Giao Hỏa Tốc 15 Phút', desc: 'Đội ngũ giao nhận chuyên nghiệp, thông thạo địa bàn, có mặt ngay khi bạn cần đun nấu gấp.' }
  ];
  if (settings.gas_price_commitments_json) {
    try {
      const parsed = typeof settings.gas_price_commitments_json === 'string' ? JSON.parse(settings.gas_price_commitments_json) : settings.gas_price_commitments_json;
      if (Array.isArray(parsed) && parsed.length > 0) commitments = parsed;
    } catch (e) {}
  }

  // Dynamic FAQs from settings
  let faqs = [
    {
      q: `Giá bình gas 12kg hôm nay ngày ${fullDateStr} là bao nhiêu?`,
      a: `Giá bình gas 12kg tại Ngọc Gas hôm nay dao động từ 385.000đ đến 399.000đ tùy thương hiệu (Sopet, Phoenix, Luxen Gas). Mức giá này đã bao gồm công vận chuyển và cân thử tại nhà.`
    },
    {
      q: 'Khi đổi bình gas khác hãng có bị mất tiền cọc vỏ không?',
      a: 'Ngọc Gas hỗ trợ đổi chéo ngang tất cả các vỏ bình chính hãng trên thị trường (Petrolimex, Saigon Petro, Gia Đình Gas, TotalGas...) hoàn toàn miễn phí mà không thu thêm tiền cọc vỏ.'
    },
    {
      q: 'Làm sao để biết bình gas đủ ký và không bị thiếu gas?',
      a: 'Trọng lượng tổng khi nhận bình = Trọng lượng vỏ (dập nổi trên quai bình) + 12kg gas ruột. Nhân viên sẽ cân mẫu và hướng dẫn bạn kiểm tra trực tiếp.'
    },
    {
      q: 'Ngọc Gas có hỗ trợ xuất hóa đơn VAT điện tử không?',
      a: 'Có. Chúng tôi hỗ trợ xuất hóa đơn VAT điện tử đầy đủ và nhanh chóng cho các hộ kinh doanh, nhà hàng, công ty và trường học trong ngày.'
    }
  ];
  if (settings.gas_price_faqs_json) {
    try {
      const parsed = typeof settings.gas_price_faqs_json === 'string' ? JSON.parse(settings.gas_price_faqs_json) : settings.gas_price_faqs_json;
      if (Array.isArray(parsed) && parsed.length > 0) faqs = parsed;
    } catch (e) {}
  }

  const formatVND = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Structured Data (Schema.org) for Google SEO Rich Snippets
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/gia-gas-hom-nay#faq`,
        'mainEntity': faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/gia-gas-hom-nay#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Trang chủ',
            'item': baseUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Giá gas hôm nay',
            'item': `${baseUrl}/gia-gas-hom-nay`
          }
        ]
      }
    ]
  };

  const pageDesc = settings.gas_price_page_desc || `Bảng giá niêm yết chính hãng các loại bình gas Sopet Gas One, Phoenix Gas, Luxen Gas 12kg và 45kg tại TP. Dĩ An, Thuận An, Bình Dương & TP. HCM. Đủ ký 100%, bảo hiểm an toàn 5 tỷ đồng.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* Hero Header */}
      <section className="price-page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Giá gas hôm nay</span>
          </div>

          <div className="hero-badge-pill">
            <Sparkles size={14} />
            <span>CẬP NHẬT TRỰC TUYẾN: NGÀY {fullDateStr}</span>
          </div>

          <h1 className="price-page-title">
            Bảng Giá Gas Hôm Nay — Ngày {fullDateStr} ({monthYearStr})
          </h1>

          <p className="price-page-desc">
            {pageDesc}
          </p>

          <div className="hero-cta-group">
            <a href={`tel:${cleanPhone}`} className="hero-call-btn">
              <PhoneCall size={18} />
              <span>Gọi Giao Gas: {settings.phone || '19009396'}</span>
            </a>
            <div className="hero-guarantee-tag">
              <Clock size={16} color="#FF6B00" />
              <span>Giao siêu tốc 15 phút</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gas Price Widget (Dynamic Top 3 Cards) */}
      <div className="price-page-widget-wrapper">
        <GasPriceWidget products={activeProducts} settings={settings} />
      </div>

      {/* Comprehensive All Gas Products Price Table */}
      <section className="price-table-section">
        <div className="container">
          <div className="section-title-box">
            <span className="sub-tag">BÁO GIÁ CHI TIẾT TỪNG LOẠI BÌNH</span>
            <h2>Bảng Báo Giá Chi Tiết Tất Cả Các Loại Bình Gas</h2>
            <p>Bảng giá công khai, minh bạch, được cập nhật theo kỳ điều chỉnh giá mới nhất</p>
          </div>

          <div className="table-responsive-card">
            <table className="full-price-table">
              <thead>
                <tr>
                  <th className="th-stt" style={{ width: '60px', textAlign: 'center' }}>STT</th>
                  <th className="th-name">Tên Sản Phẩm Gas</th>
                  <th className="th-spec" style={{ width: '140px' }}>Quy Cách</th>
                  <th className="th-original-price" style={{ width: '140px', textAlign: 'right' }}>Giá Niêm Yết</th>
                  <th className="th-today-price" style={{ width: '160px', textAlign: 'right' }}>Giá Bán Hôm Nay</th>
                  <th className="th-save" style={{ width: '130px', textAlign: 'center' }}>Tiết Kiệm</th>
                  <th className="th-action" style={{ width: '170px', textAlign: 'center' }}>Đặt Hàng</th>
                </tr>
              </thead>
              <tbody>
                {activeProducts.map((prod, idx) => {
                  const hasDiscount = prod.sale_price && Number(prod.price) > Number(prod.sale_price);
                  const savingAmount = hasDiscount ? Number(prod.price) - Number(prod.sale_price) : 0;
                  const effectivePrice = prod.sale_price && Number(prod.sale_price) > 0 ? Number(prod.sale_price) : Number(prod.price);

                  return (
                    <tr key={prod.id || idx}>
                      <td className="td-stt" style={{ textAlign: 'center', fontWeight: '700', color: '#64748B' }}>{idx + 1}</td>
                      <td className="td-name">
                        <Link href={`/san-pham/${prod.slug}`} className="table-prod-name">
                          <strong>{prod.name}</strong>
                        </Link>
                        {prod.short_description && (
                          <span className="table-prod-desc">{prod.short_description}</span>
                        )}
                      </td>
                      <td className="td-spec">
                        <span className="spec-badge">
                          {prod.name.includes('45kg') ? 'Bình 45kg (Công nghiệp)' : 'Bình 12kg (Gia đình)'}
                        </span>
                      </td>
                      <td className="td-original-price" style={{ textAlign: 'right', color: '#94A3B8', textDecoration: hasDiscount ? 'line-through' : 'none', fontSize: '14px' }}>
                        {prod.price ? formatVND(prod.price) : '—'}
                      </td>
                      <td className="td-today-price" style={{ textAlign: 'right', fontWeight: '800', color: '#E11D48', fontSize: '16px' }}>
                        {formatVND(effectivePrice)}
                      </td>
                      <td className="td-save" style={{ textAlign: 'center' }}>
                        {savingAmount > 0 ? (
                          <span className="save-badge">-{formatVND(savingAmount)}</span>
                        ) : (
                          <span className="no-save-badge">Giá chuẩn</span>
                        )}
                      </td>
                      <td className="td-action" style={{ textAlign: 'center' }}>
                        <div className="table-action-buttons">
                          <a href={`tel:${cleanPhone}`} className="table-call-btn">
                            <PhoneCall size={13} />
                            <span>Gọi ngay</span>
                          </a>
                          <Link href={`/san-pham/${prod.slug}`} className="table-view-btn">
                            Chi tiết
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="price-notes-box">
            <p>📌 <strong>Ghi chú quan trọng:</strong></p>
            <ul>
              {notes.map((note, nIdx) => (
                <li key={nIdx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 Commitments Section */}
      <section className="commitments-section">
        <div className="container">
          <div className="section-title-box">
            <span className="sub-tag">CAM KẾT DỊCH VỤ</span>
            <h2>Tại Sao Nên Đổi Gas Tại {settings.company_name || 'Ngọc Gas'}?</h2>
            <p>An toàn tuyệt đối cho gia đình bạn là tôn chỉ hoạt động hàng đầu của chúng tôi</p>
          </div>

          <div className="commitments-grid">
            {commitments.map((comm, cIdx) => {
              const icons = [
                <Award key="1" size={28} />,
                <CheckCircle2 key="2" size={28} />,
                <ShieldCheck key="3" size={28} />,
                <Truck key="4" size={28} />
              ];
              const bgClasses = ['bg-orange', 'bg-green', 'bg-blue', 'bg-purple'];

              return (
                <div key={cIdx} className="commit-card">
                  <div className={`commit-icon-box ${bgClasses[cIdx % 4]}`}>
                    {icons[cIdx % 4]}
                  </div>
                  <h3>{comm.title}</h3>
                  <p>{comm.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic SEO Article Block */}
      {(settings.gas_price_seo_content || true) && (
        <section className="price-seo-article-section">
          <div className="container">
            <div className="seo-article-card">
              <div className="article-badge-tag">
                <Sparkles size={14} />
                <span>KIẾN THỨC & THỊ TRƯỜNG GAS</span>
              </div>
              <h2 className="seo-article-main-title">
                {settings.gas_price_seo_title || 'Thông Tin & Phân Tích Xu Hướng Thị Trường Giá Gas Hôm Nay'}
              </h2>
              <div 
                className="seo-article-content-body"
                dangerouslySetInnerHTML={{ 
                  __html: settings.gas_price_seo_content || `<h2>1. Tổng Quan Thị Trường & Xu Hướng Giá Gas Hôm Nay</h2>
<p>Thị trường gas dân dụng và công nghiệp tại khu vực TP. Hồ Chí Minh và Tỉnh Bình Dương hiện nay đang có những biến động theo giá hợp đồng thế giới (CP). Ngọc Gas luôn cập nhật bảng giá chính xác, niêm yết công khai hàng ngày để người tiêu dùng an tâm lựa chọn.</p>
<h2>2. Ưu Điểm Vượt Trội Của Bình Gas Chính Hãng Tại Ngọc Gas</h2>
<p>Tất cả các sản phẩm bình gas 12kg và 45kg phân phối bởi Ngọc Gas (Sopet Gas One, Phoenix Gas, Luxen Gas) đều trải qua quy trình kiểm định chất lượng nghiêm ngặt:</p>
<ul>
  <li><strong>Vỏ bình tiêu chuẩn:</strong> Chế tạo từ thép cao cấp chịu áp lực cao, kiểm định định kỳ 5 năm/lần.</li>
  <li><strong>Gas tinh khiết:</strong> Tỷ lệ phối trộn Propane & Butane chuẩn giúp ngọn lửa xanh, không đen đáy nồi, tiết kiệm 15% nhiên liệu.</li>
  <li><strong>Niêm phong an toàn:</strong> 100% bình gas đều có tem chống hàng giả và màng co nhiệt nguyên vẹn từ nhà máy chiết nạp.</li>
</ul>
<h2>3. Dịch Vụ Giao Gas Nhanh Chóng & Cân Đủ Ký Tận Nhà</h2>
<p>Với hệ thống cửa hàng trải dài tại TP. Dĩ An, Thuận An, VietSing và TP. Thủ Đức, đội ngũ giao nhận của Ngọc Gas cam kết có mặt trong 15 - 20 phút. Nhân viên luôn chủ động mang cân điện tử cân kiểm tra trực tiếp trước mặt khách hàng và hỗ trợ kiểm tra an toàn van dây miễn phí.</p>` 
                }} 
              />
            </div>
          </div>
        </section>
      )}

      {/* FAQ SEO Section */}
      <section className="faq-seo-section">
        <div className="container">
          <div className="section-title-box">
            <span className="sub-tag">HỎI ĐÁP THẮC MẮC</span>
            <h2>Câu Hỏi Thường Gặp Về Giá Gas & Đổi Bình Gas</h2>
          </div>

          <div className="faq-list-grid">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="faq-item-card">
                <h4>❓ {faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .price-seo-article-section {
          padding: 60px 0;
          background-color: #FFFFFF;
          border-top: 1px solid #F1F5F9;
        }

        .seo-article-card {
          max-width: 960px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .article-badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF7ED;
          color: #FF6B00;
          font-size: 12px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        .seo-article-main-title {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 24px;
          line-height: 1.35;
        }

        .seo-article-content-body {
          font-size: 15.5px;
          line-height: 1.8;
          color: #334155;
        }

        .seo-article-content-body h2 {
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin: 28px 0 12px 0;
        }

        .seo-article-content-body h3 {
          font-size: 17.5px;
          font-weight: 700;
          color: #1E293B;
          margin: 20px 0 10px 0;
        }

        .seo-article-content-body p {
          margin-bottom: 16px;
        }

        .seo-article-content-body ul, .seo-article-content-body ol {
          margin: 12px 0 20px 24px;
        }

        .seo-article-content-body li {
          margin-bottom: 8px;
        }

        .seo-article-content-body blockquote {
          border-left: 4px solid #FF6B00;
          background: #FFF7ED;
          padding: 14px 20px;
          border-radius: 0 8px 8px 0;
          color: #9A3412;
          font-style: italic;
          margin: 20px 0;
        }

        .seo-article-content-body img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 16px 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        @media (max-width: 768px) {
          .seo-article-card {
            padding: 24px 18px;
          }

          .seo-article-main-title {
            font-size: 20px;
          }
        }

        .price-page-hero {
          background: linear-gradient(180deg, #FFFDF5 0%, #FFF8E7 100%);
          padding: 40px 0 32px 0;
          border-bottom: 1px solid #F1E5C8;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #64748B;
          margin-bottom: 14px;
        }

        .breadcrumb-link {
          color: #0F172A;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .breadcrumb-link:hover {
          color: #FF6B00;
        }

        .separator {
          color: #CBD5E1;
        }

        .current {
          color: #FF6B00;
          font-weight: 600;
        }

        .hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF7ED;
          color: #FF6B00;
          border: 1px solid #FFEDD5;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .price-page-title {
          font-size: 34px;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          line-height: 1.25;
        }

        .price-page-desc {
          font-size: 15.5px;
          color: #475569;
          max-width: 780px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FF6B00 0%, #EA580C 100%);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 15px;
          padding: 12px 24px;
          border-radius: 30px;
          box-shadow: 0 4px 14px rgba(255, 107, 0, 0.35);
          transition: all 0.2s ease;
        }

        .hero-call-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 0, 0.45);
        }

        .hero-guarantee-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          background: #FFFFFF;
          padding: 10px 18px;
          border-radius: 30px;
          border: 1px solid #E2E8F0;
        }

        .price-page-widget-wrapper {
          background-color: #FAFAF9;
          padding-top: 10px;
        }

        .price-table-section {
          padding: 60px 0;
          background-color: #FFFFFF;
        }

        .section-title-box {
          text-align: center;
          margin-bottom: 36px;
        }

        .sub-tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          color: #FF6B00;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .section-title-box h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .section-title-box p {
          font-size: 15px;
          color: #64748B;
        }

        .table-responsive-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow-x: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          margin-bottom: 24px;
        }

        .full-price-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .full-price-table th {
          background-color: #F8FAFC;
          padding: 14px 18px;
          font-size: 13.5px;
          font-weight: 700;
          color: #334155;
          border-bottom: 1.5px solid #E2E8F0;
          white-space: nowrap;
        }

        .full-price-table td {
          padding: 16px 18px;
          border-bottom: 1px solid #F1F5F9;
          vertical-align: middle;
        }

        .full-price-table tr:hover {
          background-color: #FFFDF9;
        }

        .table-prod-name {
          color: #0F172A;
          text-decoration: none;
          font-size: 15px;
          display: block;
          transition: color 0.2s ease;
        }

        .table-prod-name:hover {
          color: #FF6B00;
        }

        .table-prod-desc {
          display: block;
          font-size: 12.5px;
          color: #64748B;
          margin-top: 2px;
        }

        .spec-badge {
          background: #F1F5F9;
          color: #475569;
          font-size: 12.5px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .save-badge {
          background: #DCFCE7;
          color: #166534;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .no-save-badge {
          color: #94A3B8;
          font-size: 12.5px;
        }

        .table-action-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .table-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #FF6B00;
          color: #FFFFFF;
          font-size: 12.5px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .table-call-btn:hover {
          background: #EA580C;
        }

        .table-view-btn {
          font-size: 12.5px;
          font-weight: 600;
          color: #475569;
          padding: 5px 10px;
          border: 1px solid #CBD5E1;
          border-radius: 20px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .table-view-btn:hover {
          border-color: #FF6B00;
          color: #FF6B00;
        }

        .price-notes-box {
          background: #FFFBEB;
          border: 1px solid #FDE68A;
          border-radius: 12px;
          padding: 18px 24px;
          color: #78350F;
          font-size: 14px;
          line-height: 1.6;
        }

        .price-notes-box ul {
          margin: 8px 0 0 20px;
          padding: 0;
        }

        .commitments-section {
          padding: 70px 0;
          background-color: #FAFAF9;
        }

        .commitments-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .commit-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 28px 22px;
          text-align: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease;
        }

        .commit-card:hover {
          transform: translateY(-4px);
        }

        .commit-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .bg-orange { background: #FFF7ED; color: #FF6B00; }
        .bg-green { background: #ECFDF5; color: #10B981; }
        .bg-blue { background: #EFF6FF; color: #3B82F6; }
        .bg-purple { background: #FAF5FF; color: #8B5CF6; }

        .commit-card h3 {
          font-size: 17px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .commit-card p {
          font-size: 13.5px;
          color: #64748B;
          line-height: 1.5;
        }

        .faq-seo-section {
          padding: 70px 0 90px 0;
          background-color: #FFFFFF;
        }

        .faq-list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-item-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 22px;
        }

        .faq-item-card h4 {
          font-size: 15.5px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .faq-item-card p {
          font-size: 14px;
          color: #475569;
          line-height: 1.55;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .commitments-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .price-page-hero {
            padding: 24px 0;
          }

          .price-page-title {
            font-size: 24px;
          }

          .price-page-desc {
            font-size: 14px;
          }

          /* Hide unwanted columns on mobile - Only show Name & Today Price */
          .th-stt, .td-stt,
          .th-spec, .td-spec,
          .th-original-price, .td-original-price,
          .th-save, .td-save,
          .th-action, .td-action {
            display: none !important;
          }

          .table-responsive-card {
            overflow-x: visible;
            border-radius: 12px;
          }

          .full-price-table th {
            padding: 12px 14px;
            font-size: 13px;
          }

          .full-price-table td {
            padding: 12px 14px;
          }

          .th-name {
            width: auto !important;
          }

          .th-today-price {
            width: 140px !important;
            text-align: right !important;
          }

          .table-prod-name strong {
            font-size: 14px;
            line-height: 1.4;
          }

          .table-prod-desc {
            display: none !important;
          }

          .td-today-price {
            text-align: right !important;
            font-size: 15px !important;
            font-weight: 800;
            color: #E11D48;
            white-space: nowrap;
          }

          .commitments-grid {
            grid-template-columns: 1fr;
          }

          .faq-list-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
