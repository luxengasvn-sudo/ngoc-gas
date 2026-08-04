'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

export default function ProductCard({ product }) {
  // Format price helper
  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const productUrl = `/san-pham/${product.slug}`;
  const hasSale = product.sale_price && Number(product.sale_price) > 0;
  const isHot = product.is_featured === 1;

  return (
    <>
      <div className="product-card card">
        <Link href={productUrl} className="card-image-link" onClick={() => trackClick('product_card_click', product.name)}>
          <div className="product-image-container">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="product-card-img" />
            ) : (
              <div className="product-placeholder-image">
                <Flame size={48} className="placeholder-icon" />
              </div>
            )}
            
            <div className="badge-group">
              <div className="category-badge">{product.category_name || 'Gas'}</div>
              {hasSale && <div className="sale-badge">GIẢM GIÁ</div>}
              {isHot && <div className="hot-badge">BÁN CHẠY</div>}
            </div>
          </div>
        </Link>
        <div className="product-card-body">
          <Link href={productUrl} onClick={() => trackClick('product_card_click', product.name)}>
            <h3 className="product-name">{product.name}</h3>
          </Link>
          <div className="product-card-footer">
            <div className="price-container">
              {hasSale ? (
                <>
                  <span className="product-price sale">{formatPrice(product.sale_price)}</span>
                  <span className="product-original-price">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="product-price">{formatPrice(product.price)}</span>
              )}
            </div>
            <Link href={productUrl} className="view-detail-link" onClick={() => trackClick('product_card_click', product.name)}>
              Chi tiết →
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          padding: 0;
        }

        .card-image-link {
          display: block;
          width: 100%;
        }

        .product-image-container {
          position: relative;
          height: 220px;
          background-color: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }

        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 12px;
          transition: var(--transition);
        }

        .product-card:hover .product-card-img {
          transform: scale(1.05);
        }

        .product-placeholder-image {
          color: var(--primary-dark);
          opacity: 0.6;
        }

        .placeholder-icon {
          animation: float 4s infinite ease-in-out;
        }

        .badge-group {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
          z-index: 10;
        }

        .category-badge {
          background-color: #FFFFFF;
          color: var(--text);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
        }

        .sale-badge {
          background-color: var(--error);
          color: #FFFFFF;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .hot-badge {
          background-color: var(--primary);
          color: #111111;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .product-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-name {
          font-family: var(--font-inter), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 16px;
          line-height: 1.4;
          height: 50px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .product-name:hover {
          color: var(--primary-dark);
        }

        .product-card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price-container {
          display: flex;
          flex-direction: column;
        }

        .product-price {
          font-family: var(--font-inter), sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
        }

        .product-price.sale {
          color: var(--error);
          font-size: 18px;
        }

        .product-original-price {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: line-through;
          margin-top: 2px;
        }

        .view-detail-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary-dark);
        }

        .view-detail-link:hover {
          color: var(--primary);
        }

        @media (max-width: 640px) {
          .product-image-container {
            height: 145px;
          }
          .product-card-img {
            padding: 8px;
          }
          .product-card-body {
            padding: 12px;
          }
          .product-name {
            font-size: 14px;
            height: 40px;
            margin-bottom: 10px;
          }
          .product-price {
            font-size: 14px;
          }
          .product-price.sale {
            font-size: 14px;
          }
          .product-original-price {
            font-size: 11px;
          }
          .view-detail-link {
            font-size: 12px;
          }
          .badge-group {
            top: 6px;
            left: 6px;
            gap: 4px;
          }
          .category-badge, .sale-badge, .hot-badge {
            padding: 2px 6px;
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
}
