'use client';

import { Flame, ShieldCheck, Clock, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function GasPriceWidget({ products = [] }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Helper to get minimum price in a category of products
  const getMinPriceProduct = (filterFn, defaultName, defaultPrice, defaultSalePrice, defaultSlug) => {
    const matched = products.filter(filterFn);
    if (!matched || matched.length === 0) {
      return {
        name: defaultName,
        price: defaultPrice,
        sale_price: defaultSalePrice,
        slug: defaultSlug
      };
    }

    // Find product with lowest price (checking sale_price first, then price)
    let minProd = matched[0];
    let minEffectivePrice = minProd.sale_price && Number(minProd.sale_price) > 0 ? Number(minProd.sale_price) : Number(minProd.price || 9999999);

    for (let i = 1; i < matched.length; i++) {
      const p = matched[i];
      const effPrice = p.sale_price && Number(p.sale_price) > 0 ? Number(p.sale_price) : Number(p.price || 9999999);
      if (effPrice < minEffectivePrice) {
        minEffectivePrice = effPrice;
        minProd = p;
      }
    }

    return {
      name: defaultName,
      price: minProd.price,
      sale_price: minProd.sale_price || minProd.price,
      slug: minProd.slug
    };
  };

  // 1. Gas Cao Cấp 12kg (Luxen Gas 12kg)
  const luxen12kg = getMinPriceProduct(
    p => (p.name.toLowerCase().includes('luxen') && p.name.includes('12kg')),
    'Gas Cao Cấp 12kg (Luxen Gas)',
    420000,
    390000,
    'binh-gas-luxen-gas-12kg-xam'
  );

  // 2. Gas Phổ Thông 12kg (Sopet & Phoenix 12kg)
  const phoThong12kg = getMinPriceProduct(
    p => (p.name.includes('12kg') && (p.name.toLowerCase().includes('sopet') || p.name.toLowerCase().includes('phoenix'))),
    'Gas Phổ Thông 12kg (Sopet & Phoenix)',
    410000,
    385000,
    'binh-gas-phoenix-gas-12kg-xam'
  );

  // 3. Gas Công Nghiệp 45kg (Luxen 45kg)
  const congNghiep45kg = getMinPriceProduct(
    p => p.name.includes('45kg'),
    'Gas Công Nghiệp 45kg (Cho Nhà Hàng/Bếp Ăn)',
    1550000,
    1450000,
    'binh-gas-luxen-gas-45kg-cong-nghiep'
  );

  const priceCards = [
    {
      id: 'luxen-12kg',
      badge: 'CHẤT LƯỢNG CAO',
      badgeColor: '#FF6B00',
      title: 'Gas Cao Cấp 12kg',
      subTitle: 'Thương hiệu Luxen Gas Bình Dương',
      price: luxen12kg.price,
      sale_price: luxen12kg.sale_price,
      slug: luxen12kg.slug,
      features: [
        'Lửa xanh siêu xoáy & tiết kiệm gas',
        'Vỏ bình đúc thép chịu lực chuẩn PCCC',
        'Cân đúng 12kg đủ ký tận nhà'
      ]
    },
    {
      id: 'phothong-12kg',
      badge: 'TIẾT KIỆM GIA ĐÌNH',
      badgeColor: '#10B981',
      title: 'Gas Phổ Thông 12kg',
      subTitle: 'Thương hiệu Sopet & Phoenix Gas',
      price: phoThong12kg.price,
      sale_price: phoThong12kg.sale_price,
      slug: phoThong12kg.slug,
      features: [
        'Giá mềm tiết kiệm chi phí đun nấu',
        'Khí gas lọc sạch không đen đít nồi',
        'Cân đúng 12kg đủ ký tận nhà'
      ]
    },
    {
      id: 'congnghiep-45kg',
      badge: 'BÌNH BÒ CÔNG NGHIỆP',
      badgeColor: '#6366F1',
      title: 'Gas Công Nghiệp 45kg',
      subTitle: 'Chuyên dùng cho Nhà hàng & Bếp ăn KCN',
      price: congNghiep45kg.price,
      sale_price: congNghiep45kg.sale_price,
      slug: congNghiep45kg.slug,
      features: [
        'Dung tích lớn 45kg đun nấu liên tục',
        'Áp suất gas mạnh mẽ cho bếp khè',
        'Hỗ trợ kỹ thuật & giao nhận tận nơi'
      ]
    }
  ];

  const formatVND = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="gas-price-section">
      <div className="container">
        <div className="price-card-wrapper glass">
          <div className="price-header">
            <div className="price-title-box">
              <div className="flame-icon-bg">
                <Flame size={28} />
              </div>
              <div>
                <span className="price-tag-badge">Bảng Giá Niêm Yết Giá Thấp Nhất</span>
                <h2>BẢNG GIÁ GAS THÁNG {currentMonth}/{currentYear}</h2>
              </div>
            </div>
            <div className="price-badges-group">
              <div className="trust-badge">
                <ShieldCheck size={16} />
                <span>100% Chính Hãng Sopet, Phoenix, Luxen</span>
              </div>
              <div className="trust-badge">
                <Clock size={16} />
                <span>Giao Nhanh 15-30 Phút</span>
              </div>
            </div>
          </div>

          <div className="price-grid-3">
            {priceCards.map((card) => (
              <div key={card.id} className="price-item-card-3">
                <div className="card-top-tag" style={{ backgroundColor: card.badgeColor }}>
                  <Sparkles size={12} />
                  <span>{card.badge}</span>
                </div>
                
                <div className="price-item-header-3">
                  <Flame size={20} className="item-flame-3" />
                  <div>
                    <h4>{card.title}</h4>
                    <span className="card-subtitle-3">{card.subTitle}</span>
                  </div>
                </div>

                <div className="price-item-body-3">
                  <div className="price-values-3">
                    <span className="current-price-3">{formatVND(card.sale_price || card.price)}</span>
                    {card.sale_price && card.price > card.sale_price && (
                      <span className="old-price-3">{formatVND(card.price)}</span>
                    )}
                  </div>
                  <ul className="item-features-3">
                    {card.features.map((feat, idx) => (
                      <li key={idx}><CheckCircle2 size={14} /> {feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="price-item-footer-3">
                  <a href="tel:19009396" className="btn-call-mini-3">
                    <PhoneCall size={14} />
                    <span>Gọi Đặt Ngay</span>
                  </a>
                  <Link href={`/san-pham/${card.slug || '#'}`} className="btn-detail-mini-3">
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="price-footer-note">
            <p>💡 <em>* Giá gas được cập nhật tự động theo giá ưu đãi thị trường. Đã bao gồm thuế VAT, giao hàng và cân thử tại nhà ở Dĩ An, Thuận An, VietSing, TP. Hồ Chí Minh & Bình Dương.</em></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gas-price-section {
          padding: 45px 0;
          background: linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%);
        }

        .price-card-wrapper {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #E2E8F0;
        }

        .price-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-bottom: 24px;
          border-bottom: 2px dashed #E2E8F0;
          margin-bottom: 28px;
        }

        .price-title-box {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .flame-icon-bg {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: linear-gradient(135deg, #FF6B00 0%, #FF2E00 100%);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(255, 107, 0, 0.3);
        }

        .price-tag-badge {
          font-size: 12px;
          font-weight: 700;
          color: #FF6B00;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 2px;
        }

        .price-header h2 {
          font-size: 24px;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
        }

        .price-badges-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #F1F5F9;
          color: #334155;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .price-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 24px;
        }

        .price-item-card-3 {
          position: relative;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 24px 20px 20px 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .price-item-card-3:hover {
          transform: translateY(-5px);
          border-color: #FF6B00;
          box-shadow: 0 16px 32px rgba(255, 107, 0, 0.14);
        }

        .card-top-tag {
          position: absolute;
          top: -12px;
          left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 800;
          border-radius: 12px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .price-item-header-3 {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 6px;
          margin-bottom: 16px;
        }

        .item-flame-3 {
          color: #FF6B00;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .price-item-header-3 h4 {
          font-size: 17px;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 2px 0;
          line-height: 1.3;
        }

        .card-subtitle-3 {
          font-size: 12.5px;
          color: #64748B;
          font-weight: 500;
          display: block;
        }

        .price-values-3 {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 14px;
          padding: 8px 12px;
          background: #F8FAFC;
          border-radius: 8px;
        }

        .current-price-3 {
          font-size: 24px;
          font-weight: 800;
          color: #E11D48;
        }

        .old-price-3 {
          font-size: 14px;
          color: #94A3B8;
          text-decoration: line-through;
        }

        .item-features-3 {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .item-features-3 li {
          font-size: 13.5px;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .item-features-3 li :global(svg) {
          color: #10B981;
          flex-shrink: 0;
        }

        .price-item-footer-3 {
          display: flex;
          gap: 10px;
        }

        .btn-call-mini-3 {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, #FF6B00 0%, #FF2E00 100%);
          color: #FFFFFF;
          padding: 11px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
        }

        .btn-call-mini-3:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        .btn-detail-mini-3 {
          padding: 11px 16px;
          background: #F1F5F9;
          color: #475569;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }

        .btn-detail-mini-3:hover {
          background: #E2E8F0;
        }

        .price-footer-note {
          text-align: center;
          font-size: 13px;
          color: #64748B;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid #F1F5F9;
        }

        @media (max-width: 992px) {
          .price-grid-3 {
            grid-template-columns: repeat(1, 1fr);
          }

          .price-card-wrapper {
            padding: 20px;
          }

          .price-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .price-header h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
