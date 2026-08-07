import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ProductOrderButton from '@/components/ProductOrderButton';
import { Flame, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const [rows] = await db.query('SELECT name, short_description FROM products WHERE slug = ?', [slug]);
    if (rows.length > 0) {
      const product = rows[0];
      return {
        title: `${product.name} - NGỌC GAS`,
        description: product.short_description || `Mua ${product.name} chính hãng, giá tốt tại Ngọc Gas TP. HCM & Bình Dương. Giao gas siêu tốc 15 phút.`,
        keywords: `${product.name}, ngoc gas tp hcm, ngoc gas binh duong`
      };
    }
  } catch (e) {
    console.error('Error generating product metadata:', e);
  }
  
  return {
    title: 'Sản phẩm gas chất lượng - NGỌC GAS',
    description: 'Danh sách sản phẩm bình gas gia đình, gas công nghiệp và phụ kiện bếp gas chính hãng tại TP. HCM & Bình Dương.'
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  let product = null;
  let relatedProducts = [];

  try {
    // 1. Fetch product detail
    const [prodRows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.slug = ? AND p.is_active = 1
    `, [slug]);

    if (prodRows.length === 0) {
      notFound();
    }
    product = prodRows[0];

    // Log page view to database in GMT+7
    const tzOffset = 7 * 60; // mins
    const localTime = new Date(new Date().getTime() + tzOffset * 60 * 1000);
    const today = localTime.toISOString().slice(0, 10);
    db.query(
      `INSERT INTO analytics_clicks (click_type, click_target, click_date, click_count) 
       VALUES ('product_view', ?, ?, 1) 
       ON DUPLICATE KEY UPDATE click_count = click_count + 1`,
      [product.name, today]
    ).catch(err => console.error('Analytics view log failed:', err));

    // 2. Fetch related products in same category
    if (product.category_id) {
      const [relatedRows] = await db.query(`
        SELECT p.*, c.name AS category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.id 
        WHERE p.category_id = ? AND p.id != ? AND p.is_active = 1 
        LIMIT 3
      `, [product.category_id, product.id]);
      relatedProducts = relatedRows;
    }
  } catch (error) {
    console.error('Error fetching product detail:', error);
  }

  // Fetch hotline settings
  let hotline = '19009396';
  try {
    const [settingRows] = await db.query("SELECT setting_value FROM settings WHERE setting_key = 'phone'");
    if (settingRows.length > 0) {
      hotline = settingRows[0].setting_value;
    }
  } catch (e) {}

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const hasSale = product.sale_price && Number(product.sale_price) > 0;

  return (
    <>
      <div className="product-detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <Link href="/san-pham">Sản phẩm</Link>
            <span className="separator">/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="product-detail-grid">
            
            {/* Product Image Column - Now handles multiple images with gallery */}
            <div className="product-detail-image-panel">
              <ProductGallery mainImage={product.image_url} imagesJson={product.images} />
            </div>

            {/* Product Info Column */}
            <div className="product-detail-info-panel">
              <span className="product-detail-category">{product.category_name}</span>
              <h1 className="product-detail-title">{product.name}</h1>
              
              <div className="product-detail-price-box">
                <span className="price-label">Giá bán:</span>
                {hasSale ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="price-value" style={{ color: 'var(--error)' }}>{formatPrice(product.sale_price)}</span>
                    <span className="original-price-value" style={{ textDecoration: 'line-through', fontSize: '15px', color: 'var(--text-secondary)' }}>
                      Giá gốc: {formatPrice(product.price)}
                    </span>
                  </div>
                ) : (
                  <span className="price-value">{formatPrice(product.price)}</span>
                )}
              </div>

              <div className="product-detail-divider"></div>

              {/* Product Short Description */}
              {product.short_description && (
                <div className="product-detail-short-desc">
                  <p>{product.short_description}</p>
                </div>
              )}

              <div className="product-detail-meta-cards">
                <div className="meta-card">
                  <ShieldCheck size={20} className="meta-icon" />
                  <div>
                    <strong>Chính hãng 100%</strong>
                    <p>Cam kết chất lượng chuẩn vỏ bình dày</p>
                  </div>
                </div>
                <div className="meta-card">
                  <Flame size={20} className="meta-icon" />
                  <div>
                    <strong>Đủ trọng lượng</strong>
                    <p>Cân gas trực tiếp khi giao hàng</p>
                  </div>
                </div>
              </div>

              <div className="product-detail-actions">
                <ProductOrderButton productName={product.name} hotline={hotline} />
              </div>
            </div>
          </div>

          {/* Long Description Section */}
          {product.description && (
            <div className="product-long-description-section card">
              <h3 className="long-desc-title">Thông Tin Chi Tiết Sản Phẩm</h3>
              <div className="product-desc-content" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="related-products-section">
              <h2 className="related-title">Sản Phẩm Liên Quan</h2>
              <div className="grid-3 products-grid">
                {relatedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


    </>
  );
}
