'use client';

import { Flame, ShieldCheck, Clock, CheckCircle2, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function GasPriceWidget({ products = [] }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Pick gas products if passed, or default gas items
  const displayGasItems = products.length > 0
    ? products.filter(p => p.category_id === 1 || p.name.toLowerCase().includes('gas') || p.name.toLowerCase().includes('bình')).slice(0, 4)
    : [
        { id: 1, name: 'Bình Gas Sopet 12kg (Xám)', price: 420000, sale_price: 395000, slug: 'binh-gas-sopet-12kg-xam' },
        { id: 2, name: 'Bình Gas Sopet 12kg (Đỏ)', price: 430000, sale_price: 405000, slug: 'binh-gas-sopet-12kg-do' },
        { id: 3, name: 'Bình Gas 12kg Van Khè (Công Nghiệp)', price: 450000, sale_price: 420000, slug: 'binh-gas-12kg-van-khe' },
        { id: 4, name: 'Bình Gas Bò 45kg (Cho Nhà Hàng/Quán Ăn)', price: 1550000, sale_price: 1450000, slug: 'binh-gas-45kg-bo' },
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
                <span className="price-tag-badge">Bảng Giá Niêm Yết</span>
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

          <div className="price-grid">
            {displayGasItems.map((item) => (
              <div key={item.id} className="price-item-card">
                <div className="price-item-header">
                  <Flame size={18} className="item-flame" />
                  <h4>{item.name}</h4>
                </div>
                <div className="price-item-body">
                  <div className="price-values">
                    <span className="current-price">{formatVND(item.sale_price || item.price)}</span>
                    {item.sale_price && item.price > item.sale_price && (
                      <span className="old-price">{formatVND(item.price)}</span>
                    )}
                  </div>
                  <ul className="item-features">
                    <li><CheckCircle2 size={14} /> Cân đúng ký tại nhà</li>
                    <li><CheckCircle2 size={14} /> Kiểm tra rò rỉ van gas miễn phí</li>
                  </ul>
                </div>
                <div className="price-item-footer">
                  <a href="tel:19009396" className="btn-call-mini">
                    <PhoneCall size={14} />
                    <span>Gọi Đặt Ngay</span>
                  </a>
                  <Link href={`/san-pham/${item.slug || '#'}`} className="btn-detail-mini">
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="price-footer-note">
            <p>💡 <em>* Giá gas được cập nhật chuẩn theo biến động thị trường. Đã bao gồm thuế VAT, giao hàng và lắp đặt tận nơi tại Dĩ An, Thuận An, TP. Hồ Chí Minh.</em></p>
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

        .price-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .price-item-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .price-item-card:hover {
          transform: translateY(-4px);
          border-color: #FF6B00;
          box-shadow: 0 12px 24px rgba(255, 107, 0, 0.12);
        }

        .price-item-header {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 14px;
        }

        .item-flame {
          color: #FF6B00;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .price-item-header h4 {
          font-size: 15px;
          font-weight: 700;
          color: #1E293B;
          margin: 0;
          line-height: 1.4;
        }

        .price-values {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 12px;
        }

        .current-price {
          font-size: 22px;
          font-weight: 800;
          color: #E11D48;
        }

        .old-price {
          font-size: 14px;
          color: #94A3B8;
          text-decoration: line-through;
        }

        .item-features {
          list-style: none;
          padding: 0;
          margin: 0 0 18px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .item-features li {
          font-size: 13px;
          color: #64748B;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .item-features li :global(svg) {
          color: #10B981;
          flex-shrink: 0;
        }

        .price-item-footer {
          display: flex;
          gap: 8px;
        }

        .btn-call-mini {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, #FF6B00 0%, #FF2E00 100%);
          color: #FFFFFF;
          padding: 10px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .btn-call-mini:hover {
          opacity: 0.9;
        }

        .btn-detail-mini {
          padding: 10px 14px;
          background: #F1F5F9;
          color: #475569;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }

        .btn-detail-mini:hover {
          background: #E2E8F0;
        }

        .price-footer-note {
          text-align: center;
          font-size: 13px;
          color: #64748B;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #F1F5F9;
        }

        @media (max-width: 768px) {
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
