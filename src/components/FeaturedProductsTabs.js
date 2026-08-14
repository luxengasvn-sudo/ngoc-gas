'use client';

import { useState } from 'react';
import { Flame, Compass } from 'lucide-react';
import ProductCard from './ProductCard';

export default function FeaturedProductsTabs({ gasProducts = [], otherProducts = [] }) {
  const [activeTab, setActiveTab] = useState('gas'); // 'gas' | 'other'

  return (
    <div className="featured-products-container">
      {/* Dynamic Tab Selector Headers */}
      <div className="tabs-header-wrapper">
        <button
          type="button"
          onClick={() => setActiveTab('gas')}
          className={`tab-toggle-btn ${activeTab === 'gas' ? 'active' : ''}`}
        >
          <Flame size={18} className="tab-icon" />
          <span>Bình Gas Chính Hãng</span>
          <span className="tab-count-badge">{gasProducts.length}</span>
        </button>
        
        <button
          type="button"
          onClick={() => setActiveTab('other')}
          className={`tab-toggle-btn ${activeTab === 'other' ? 'active' : ''}`}
        >
          <Compass size={18} className="tab-icon" />
          <span>Phụ Kiện & Bếp</span>
          <span className="tab-count-badge">{otherProducts.length}</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="tab-panel-content">
        {activeTab === 'gas' && (
          <div className="products-tab-pane animate-fade-in-up">
            {gasProducts.length > 0 ? (
              <div className="grid-3 products-grid">
                {gasProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-tab-state card">
                <Flame size={48} style={{ opacity: 0.3, color: 'var(--primary)' }} />
                <p>Đang cập nhật danh sách bình gas nổi bật...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'other' && (
          <div className="products-tab-pane animate-fade-in-up">
            {otherProducts.length > 0 ? (
              <div className="grid-3 products-grid">
                {otherProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-tab-state card">
                <Compass size={48} style={{ opacity: 0.3, color: 'var(--primary)' }} />
                <p>Chưa có sản phẩm phụ kiện nào. Danh sách sẽ tự động hiển thị khi bạn tạo sản phẩm phụ kiện mới trong Admin.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .featured-products-container {
          width: 100%;
        }

        .tabs-header-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }

        .tab-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 16px;
          padding: 12px 24px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          outline: none;
        }

        .tab-toggle-btn:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.04);
        }

        .tab-toggle-btn.active {
          color: #111111;
          background: var(--primary);
          box-shadow: 0 4px 14px rgba(250, 204, 21, 0.3);
        }

        .tab-icon {
          transition: transform 0.3s ease;
        }

        .tab-toggle-btn.active .tab-icon {
          transform: scale(1.1) rotate(12deg);
        }

        .tab-count-badge {
          font-size: 11px;
          background: rgba(255, 255, 255, 0.15);
          color: inherit;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 700;
          margin-left: 4px;
        }

        .tab-toggle-btn.active .tab-count-badge {
          background: rgba(17, 17, 17, 0.15);
          color: #111111;
        }

        .tab-panel-content {
          min-height: 250px;
        }

        .empty-tab-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 60px 20px;
          text-align: center;
          border: 1px dashed rgba(255, 255, 255, 0.1) !important;
          background: rgba(255, 255, 255, 0.01) !important;
        }

        .empty-tab-state p {
          color: var(--text-secondary);
          font-size: 15px;
        }

        /* Animation class */
        .animate-fade-in-up {
          animation: fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .tabs-header-wrapper {
            flex-direction: column;
            gap: 10px;
            width: 100%;
            border-bottom: none;
            padding-bottom: 0;
          }
          .tab-toggle-btn {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
          }
        }
      `}</style>
    </div>
  );
}
