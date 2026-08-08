import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ProductOrderButton from '@/components/ProductOrderButton';
import { Flame, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

const allFallbackProducts = [
  { id: 1, name: 'Bình Gas Sopet Vil 12kg (Xám)', slug: 'binh-gas-sopet-vil-12kg-xam', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet Vil 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', price: 420000, sale_price: 395000, image_url: '/images/sopet-xam.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 2, name: 'Bình Gas Sopet Vil 12kg (Xanh Đen)', slug: 'binh-gas-sopet-vil-12kg-xanh-den', short_description: 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet Vil 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', price: 425000, sale_price: 400000, image_url: '/images/sopet-xanh-den.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 3, name: 'Bình Gas Sopet Vil 12kg (Xanh)', slug: 'binh-gas-sopet-vil-12kg-xanh', short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet Vil 12kg vỏ xanh tiêu chuẩn gia đình.', price: 420000, sale_price: 395000, image_url: '/images/sopet-xanh.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 4, name: 'Bình Gas Sopet Vil 12kg (Đỏ)', slug: 'binh-gas-sopet-vil-12kg-do', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet Vil 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', price: 430000, sale_price: 405000, image_url: '/images/sopet.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 5, name: 'Bình Gas Phoenix Gas 12kg (Xám)', slug: 'binh-gas-phoenix-gas-12kg-xam', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', price: 410000, sale_price: 385000, image_url: '/images/phoenix-xam.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 6, name: 'Bình Gas Phoenix Gas 12kg (Xanh)', slug: 'binh-gas-phoenix-gas-12kg-xanh', short_description: 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', price: 415000, sale_price: 390000, image_url: '/images/phoenix-lg-xanh.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 7, name: 'Bình Gas Phoenix Gas 12kg (Đỏ)', slug: 'binh-gas-phoenix-gas-12kg-do', short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', price: 420000, sale_price: 395000, image_url: '/images/phoenix-do.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 8, name: 'Bình Gas Luxen Gas 12kg', slug: 'binh-gas-luxen-gas-12kg', short_description: 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', price: 420000, sale_price: 395000, image_url: '/images/luxen-gas.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 9, name: 'Bình Gas Luxen Gas 45kg (Công Nghiệp)', slug: 'binh-gas-luxen-gas-45kg-cong-nghiep', short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', price: 1550000, sale_price: 1450000, image_url: '/images/luxen-45.png', category_id: 1, is_featured: 1, is_active: 1 }
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const [rows] = await db.query('SELECT name, short_description FROM products WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      const product = rows[0];
      return {
        title: `${product.name} - NGỌC GAS`,
        description: product.short_description || `Mua ${product.name} chính hãng, giá tốt tại Ngọc Gas TP. HCM & Bình Dương. Giao gas nhanh.`,
        keywords: `${product.name}, giao gas nhanh, ngoc gas dĩ an`
      };
    }
  } catch (e) {
    console.error('Error generating product metadata:', e.message);
  }

  const fallbackObj = allFallbackProducts.find(p => p.slug === slug);
  if (fallbackObj) {
    return {
      title: `${fallbackObj.name} - NGỌC GAS`,
      description: fallbackObj.short_description,
      keywords: `${fallbackObj.name}, giao gas nhanh, ngoc gas`
    };
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
    const [prodRows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.slug = ? AND p.is_active = 1
    `, [slug]);

    if (prodRows && prodRows.length > 0) {
      product = prodRows[0];
    }
  } catch (error) {
    console.error('Error fetching product detail:', error.message);
  }

  // Fallback to default product list if DB is offline or slug missing in DB
  if (!product) {
    const foundFallback = allFallbackProducts.find(p => p.slug === slug);
    if (foundFallback) {
      product = {
        ...foundFallback,
        category_name: 'Gas Dân Dụng & Công Nghiệp'
      };
    } else {
      notFound();
    }
  }

  // Safe analytics click log
  try {
    db.query(
      `INSERT INTO analytics_clicks (click_type, label, page_url) VALUES ('product_view', ?, ?)`,
      [product.name, `/san-pham/${slug}`]
    ).catch(() => {});
  } catch (e) {}

  // Fetch related products
  try {
    const [relatedRows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id != ? AND p.is_active = 1 
      LIMIT 3
    `, [product.id || 0]);
    relatedProducts = relatedRows || [];
  } catch (e) {}

  if (!relatedProducts || relatedProducts.length === 0) {
    relatedProducts = allFallbackProducts.filter(p => p.slug !== slug).slice(0, 3);
  }

  // Fetch hotline settings
  let hotline = '19009396';
  try {
    const [settingRows] = await db.query("SELECT setting_value FROM settings WHERE setting_key = 'phone'");
    if (settingRows && settingRows.length > 0) {
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
            
            {/* Product Image Column */}
            <div className="product-detail-image-panel">
              <ProductGallery mainImage={product.image_url} imagesJson={product.images} />
            </div>

            {/* Product Info Column */}
            <div className="product-detail-info-panel">
              <span className="product-detail-category">{product.category_name || 'Gas Chính Hãng'}</span>
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
