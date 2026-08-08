'use client';

import { useState, useEffect } from 'react';
import { Flame, ShieldCheck, Clock, CheckCircle2, PhoneCall, Sparkles, TrendingUp, TrendingDown, Minus, X, Calendar, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function GasPriceWidget({ products = [] }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // State for History Modal & Selected Gas Filter
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedGasType, setSelectedGasType] = useState('all');
  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/gas-price-history?gas_type=${selectedGasType}`);
      const data = await res.json();
      if (data.success) {
        setHistoryData(data.data);
      }
    } catch (e) {
      console.error('Error loading gas price history:', e);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (isHistoryModalOpen) {
      fetchHistory();
    }
  }, [isHistoryModalOpen, selectedGasType]);

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
    1440000,
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

  // Helper for Chart SVG Points
  const renderChartSVG = () => {
    if (!historyData || historyData.length === 0) return null;

    // Filter items to chart
    const filtered = selectedGasType === 'all' 
      ? historyData.filter(d => d.gas_type === 'luxen-12kg')
      : historyData;

    if (filtered.length === 0) return null;

    const prices = filtered.map(d => Number(d.sale_price || d.price));
    const minP = Math.min(...prices) * 0.98;
    const maxP = Math.max(...prices) * 1.02;
    const range = maxP - minP || 1;

    const width = 600;
    const height = 180;
    const padding = 40;

    const points = filtered.map((d, idx) => {
      const x = padding + (idx / Math.max(filtered.length - 1, 1)) * (width - padding * 2);
      const val = Number(d.sale_price || d.price);
      const y = height - padding - ((val - minP) / range) * (height - padding * 2);
      return { x, y, val, month: d.effective_month, change: d.change_type, amount: d.change_amount };
    });

    const pathD = points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="price-chart-svg">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill under line */}
        {points.length > 1 && (
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
            fill="url(#chartGradient)"
          />
        )}

        {/* Grid lines */}
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#E2E8F0" strokeDasharray="4 4" />
        <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#E2E8F0" strokeDasharray="4 4" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Line path */}
        <path d={pathD} fill="none" stroke="#FF6B00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data Points */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="6" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="3" />
            <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
              {formatVND(pt.val)}
            </text>
            <text x={pt.x} y={height - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748B">
              {pt.month.replace('Tháng ', 'T')}
            </text>
          </g>
        ))}
      </svg>
    );
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
              <button 
                type="button" 
                onClick={() => setIsHistoryModalOpen(true)} 
                className="btn-history-trigger"
              >
                <BarChart2 size={16} />
                <span>Xem Lịch Sử Biến Động Giá</span>
              </button>
              
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

      {/* History & Trend Chart Modal */}
      {isHistoryModalOpen && (
        <div className="price-history-modal-overlay" onClick={() => setIsHistoryModalOpen(false)}>
          <div className="price-history-modal-content card" onClick={(e) => e.stopPropagation()}>
            <div className="history-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChart2 size={24} color="#FF6B00" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>Lịch Sử & Biểu Đồ Biến Động Giá Gas</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Theo dõi xu hướng tăng giảm giá gas qua các tháng tại Ngọc Gas</p>
                </div>
              </div>
              <button onClick={() => setIsHistoryModalOpen(false)} className="modal-close-icon-btn">
                <X size={20} />
              </button>
            </div>

            <div className="history-modal-body">
              {/* Type Filter Tabs */}
              <div className="history-filter-tabs">
                <button 
                  type="button" 
                  onClick={() => setSelectedGasType('all')} 
                  className={`filter-tab-btn ${selectedGasType === 'all' ? 'active' : ''}`}
                >
                  Tất cả các loại
                </button>
                <button 
                  type="button" 
                  onClick={() => setSelectedGasType('luxen-12kg')} 
                  className={`filter-tab-btn ${selectedGasType === 'luxen-12kg' ? 'active' : ''}`}
                >
                  Gas Cao Cấp 12kg
                </button>
                <button 
                  type="button" 
                  onClick={() => setSelectedGasType('phothong-12kg')} 
                  className={`filter-tab-btn ${selectedGasType === 'phothong-12kg' ? 'active' : ''}`}
                >
                  Gas Phổ Thông 12kg
                </button>
                <button 
                  type="button" 
                  onClick={() => setSelectedGasType('congnghiep-45kg')} 
                  className={`filter-tab-btn ${selectedGasType === 'congnghiep-45kg' ? 'active' : ''}`}
                >
                  Gas Công Nghiệp 45kg
                </button>
              </div>

              {/* Chart Visualizing Trend */}
              <div className="history-chart-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    📈 Biểu Đồ Xu Hướng Giá (6 Tháng Gần Nhất)
                  </span>
                  <span style={{ fontSize: '12px', color: '#FF6B00', fontWeight: '600' }}>Cập nhật chuẩn theo thị trường</span>
                </div>

                {loadingHistory ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748B' }}>Đang nạp dữ liệu lịch sử giá...</div>
                ) : (
                  renderChartSVG()
                )}
              </div>

              {/* Table of Detailed Logs */}
              <div className="history-table-container">
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: '0 0 12px 0' }}>Chi Tiết Nhật Ký Tăng Giảm Theo Tháng</h4>
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Thời gian</th>
                      <th>Loại Gas</th>
                      <th style={{ textAlign: 'right' }}>Giá Khuyến Mãi</th>
                      <th style={{ textAlign: 'center' }}>Biến động</th>
                      <th>Ghi chú điều chỉnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData && historyData.length > 0 ? (
                      historyData.map((item) => {
                        const isUp = item.change_type === 'up';
                        const isDown = item.change_type === 'down';
                        const changeVal = Number(item.change_amount || 0);

                        return (
                          <tr key={item.id}>
                            <td style={{ fontWeight: '700', color: '#0F172A' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={13} color="#94A3B8" />
                                {item.effective_month}
                              </span>
                            </td>
                            <td style={{ fontWeight: '600', color: '#334155' }}>{item.gas_name}</td>
                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#E11D48', fontSize: '15px' }}>
                              {formatVND(item.sale_price || item.price)}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {isUp ? (
                                <span className="trend-badge-up">
                                  <TrendingUp size={13} /> +{formatVND(changeVal)}
                                </span>
                              ) : isDown ? (
                                <span className="trend-badge-down">
                                  <TrendingDown size={13} /> {formatVND(changeVal)}
                                </span>
                              ) : (
                                <span className="trend-badge-same">
                                  <Minus size={13} /> Giữ giá
                                </span>
                              )}
                            </td>
                            <td style={{ fontSize: '13px', color: '#64748B' }}>{item.notes || '—'}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px 0', color: '#94A3B8' }}>
                          Chưa có nhật ký giá cho loại gas này.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

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
          align-items: center;
          flex-wrap: wrap;
        }

        .btn-history-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          color: #FFFFFF;
          padding: 9px 16px;
          border-radius: 20px;
          font-size: 13.5px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }

        .btn-history-trigger:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #FF6B00 0%, #FF2E00 100%);
          box-shadow: 0 6px 16px rgba(255, 107, 0, 0.3);
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

        /* History Modal Styles */
        .price-history-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .price-history-modal-content {
          background: #FFFFFF;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          border-radius: 18px;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        .history-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #E2E8F0;
          background: #F8FAFC;
        }

        .modal-close-icon-btn {
          background: #E2E8F0;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          transition: all 0.2s;
        }

        .modal-close-icon-btn:hover {
          background: #CBD5E1;
          color: #0F172A;
        }

        .history-modal-body {
          padding: 24px;
        }

        .history-filter-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .filter-tab-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          color: #475569;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-tab-btn:hover {
          border-color: #FF6B00;
          color: #FF6B00;
        }

        .filter-tab-btn.active {
          background: #FF6B00;
          color: #FFFFFF;
          border-color: #FF6B00;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.25);
        }

        .history-chart-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 24px;
        }

        .price-chart-svg {
          width: 100%;
          height: 180px;
          display: block;
        }

        .history-table-container {
          overflow-x: auto;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .history-table th {
          text-align: left;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          background: #F1F5F9;
          border-bottom: 2px solid #E2E8F0;
          text-transform: uppercase;
        }

        .history-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #E2E8F0;
          font-size: 13.5px;
        }

        .trend-badge-up {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: #FFE4E6;
          color: #E11D48;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
        }

        .trend-badge-down {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: #D1FAE5;
          color: #059669;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
        }

        .trend-badge-same {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: #F1F5F9;
          color: #64748B;
          border-radius: 12px;
          font-weight: 600;
          font-size: 12px;
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
