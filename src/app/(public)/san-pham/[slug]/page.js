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
  { 
    id: 1, 
    name: 'Bình Gas Sopet Vil 12kg (Xám)', 
    slug: 'binh-gas-sopet-vil-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet Vil 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 
    description: `<h3>Đại Lý Giao Gas Nhanh Bình Gas Sopet Vil 12kg Xám Tại Dĩ An, Thuận An & VietSing</h3>
<p>Bình Gas Sopet Vil 12kg vỏ màu xám là dòng sản phẩm gas dân dụng cao cấp thương hiệu công nghệ Nhật Bản được đông đảo hộ gia đình và quán ăn tin dùng. Ngọc Gas chuyên dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, TP.HCM & Bình Dương</strong>.</p>
<h4>Ưu Điểm Nổi Bật Của Bình Gas Sopet Vil 12kg Xám:</h4>
<ul>
  <li><strong>Chất lượng khí gas tinh khiết:</strong> Cho ngọn lửa xanh đều, tiết kiệm nhiên liệu và không gây đen đáy nồi.</li>
  <li><strong>Tiêu chuẩn an toàn vỏ bình:</strong> Vỏ bình chịu áp lực cao, kiểm định PCCC định kỳ an toàn tuyệt đối.</li>
  <li><strong>Cân gas công khai:</strong> Kỹ thuật viên Ngọc Gas luôn mang theo cân điện tử kiểm tra đủ 12kg gas trước sự chứng kiến của khách hàng.</li>
</ul>
<p>Quý khách cần <strong>giao gas nhanh tại Dĩ An hoặc Thuận An</strong>, vui lòng liên hệ ngay tổng đài chính thức <strong>19009396</strong> hoặc ghé cửa hàng tại <em>7 Nguyễn Trung Trực, Dĩ An</em>.</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/sopet-xam.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 2, 
    name: 'Bình Gas Sopet Vil 12kg (Xanh Đen)', 
    slug: 'binh-gas-sopet-vil-12kg-xanh-den', 
    short_description: 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet Vil 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 
    description: `<h3>Dịch Vụ Giao Gas Nhanh Bình Gas Sopet Vil 12kg Xanh Đen Tại Thuận An & VietSing</h3>
<p>Bình Gas Sopet Vil 12kg màu xanh đen sở hữu thiết kế vỏ bình dày dặn, nước sơn tĩnh điện láng mịn đạt chuẩn Nhật Bản. Ngọc Gas cung cấp dịch vụ <strong>giao gas nhanh tại VietSing, giao gas nhanh tại Thuận An, Dĩ An & TP.HCM</strong> tận nhà 24/7.</p>
<h4>Tại Sao Nên Chọn Bình Gas Sopet Vil 12kg Xanh Đen?</h4>
<ul>
  <li><strong>Độ an toàn PCCC vượt trội:</strong> Trang bị van điều áp tự động ngắt gas khẩn cấp khi có sự cố.</li>
  <li><strong>Kiểm tra an toàn miễn phí:</strong> Nhân viên giao gas nhanh luôn kiểm tra kỹ hệ thống dây van gas cho căn bếp gia đình.</li>
  <li><strong>Giao hàng siêu tốc:</strong> Đội ngũ kỹ thuật viên túc trực liên tục tại trạm Dĩ An & Thuận An, giao gas tận bếp trong 15-30 phút.</li>
</ul>
<p>Liên hệ hotline chính thức <strong>19009396</strong> để được phục vụ <strong>giao gas nhanh tại Bình Dương & TP.HCM</strong>.</p>`,
    price: 425000, 
    sale_price: 400000, 
    image_url: '/images/sopet-xanh-den.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 3, 
    name: 'Bình Gas Sopet Vil 12kg (Xanh)', 
    slug: 'binh-gas-sopet-vil-12kg-xanh', 
    short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet Vil 12kg vỏ xanh tiêu chuẩn gia đình.', 
    description: `<h3>Giao Gas Nhanh Bình Gas Sopet Vil 12kg Vỏ Xanh Tiêu Chuẩn Tại TP.HCM & Bình Dương</h3>
<p>Bình Gas Sopet Vil 12kg vỏ xanh tươi mát là sự lựa chọn quen thuộc của hàng nghìn căn bếp gia đình. Ngọc Gas cam kết dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại TP.HCM & Bình Dương</strong> chính hãng 100%.</p>
<h4>Cam Kết Chất Lượng Từ Ngọc Gas (7 Nguyễn Trung Trực, Dĩ An):</h4>
<ul>
  <li><strong>Đủ trọng lượng:</strong> Cân trực tiếp trọng lượng vỏ và ruột gas khi giao tới nhà khách hàng.</li>
  <li><strong>Lửa xanh mạnh mẽ:</strong> Đốt cháy hoàn toàn, giúp rút ngắn thời gian nấu nướng.</li>
  <li><strong>Tem niêm phong chính hãng:</strong> Nguyên màng co màng nhiệt bảo vệ cổ van bình.</li>
</ul>
<p>Đổi gas chính hãng dễ dàng chỉ với 1 cuộc gọi tới hotline <strong>19009396</strong>.</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/sopet-xanh.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 4, 
    name: 'Bình Gas Sopet Vil 12kg (Đỏ)', 
    slug: 'binh-gas-sopet-vil-12kg-do', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet Vil 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 
    description: `<h3>Đại Lý Giao Gas Nhanh Bình Gas Sopet Vil 12kg Đỏ Tại Dĩ An & VietSing</h3>
<p>Bình Gas Sopet Vil 12kg vỏ màu đỏ nổi bật với công nghệ sản xuất Nhật Bản hiện đại, chống ăn mòn kim loại tối ưu. Ngọc Gas chuyên <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại VietSing & Thuận An</strong>.</p>
<h4>Đặc Điểm Kỹ Thuật & An Toàn:</h4>
<ul>
  <li>Trọng lượng ruột gas: 12kg (± 200g).</li>
  <li>Vỏ bình được dập nổi thương hiệu Sopet Vil rõ ràng, hạn kiểm định PCCC còn hiệu lực dài hạn.</li>
  <li>Kỹ thuật viên giao gas nhanh hỗ trợ lắp đặt, thay ron van gas miễn phí.</li>
</ul>
<p>Đặt mua nhanh qua tổng đài <strong>19009396</strong> - Ngọc Gas 7 Nguyễn Trung Trực, Dĩ An.</p>`,
    price: 430000, 
    sale_price: 405000, 
    image_url: '/images/sopet.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 5, 
    name: 'Bình Gas Phoenix Gas 12kg (Xám)', 
    slug: 'binh-gas-phoenix-gas-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', 
    description: `<h3>Giao Gas Nhanh Bình Gas Phoenix Gas 12kg Xám Tại Dĩ An & Thuận An</h3>
<p>Bình Gas Phoenix Gas 12kg màu xám là giải pháp nhiên liệu tiết kiệm chi phí dành cho hộ gia đình và các quán ăn vừa và nhỏ. Ngọc Gas đáp ứng dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An & KDC VietSing</strong>.</p>
<h4>Ưu Điểm Của Phoenix Gas 12kg Xám:</h4>
<ul>
  <li>Áp suất khí gas duy trì cực kỳ ổn định.</li>
  <li>Chi phí hợp lý, tiết kiệm ngân sách tiêu dùng hàng tháng.</li>
  <li>Giao gas nhanh tận nhà, cân thử trực tiếp công khai.</li>
</ul>
<p>Tổng đài gọi gas nhanh: <strong>19009396</strong> (Ngọc Gas Dĩ An).</p>`,
    price: 410000, 
    sale_price: 385000, 
    image_url: '/images/phoenix-xam.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 6, 
    name: 'Bình Gas Phoenix Gas 12kg (Xanh)', 
    slug: 'binh-gas-phoenix-gas-12kg-xanh', 
    short_description: 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', 
    description: `<h3>Dịch Vụ Giao Gas Nhanh Bình Gas Phoenix Gas 12kg Xanh Tại KDC VietSing</h3>
<p>Bình Gas Phoenix Gas 12kg màu xanh lá mang thương hiệu Phoenix Gas uy tín trên thị trường. Ngọc Gas hỗ trợ <strong>giao gas nhanh tại VietSing, giao gas nhanh tại Dĩ An, Thuận An, TP.HCM & Bình Dương</strong>.</p>
<h4>Dịch Vụ Đi Kèm Tại Ngọc Gas:</h4>
<ul>
  <li>Giao tận bếp trong 15-30 phút sau khi nhận cuộc gọi.</li>
  <li>Miễn phí kiểm tra bếp gas, vệ sinh kiềng bếp và van ngắt gas.</li>
  <li>Cân bình gas tại nhà đảm bảo đủ 12kg.</li>
</ul>
<p>Hotline hỗ trợ 24/7: <strong>19009396</strong>.</p>`,
    price: 415000, 
    sale_price: 390000, 
    image_url: '/images/phoenix-lg-xanh.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 7, 
    name: 'Bình Gas Phoenix Gas 12kg (Đỏ)', 
    slug: 'binh-gas-phoenix-gas-12kg-do', 
    short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', 
    description: `<h3>Giao Gas Nhanh Bình Gas Phoenix Gas 12kg Đỏ Tại TP.HCM & Bình Dương</h3>
<p>Bình Gas Phoenix Gas 12kg vỏ đỏ thiết kế sang trọng, chịu nhiệt chịu áp suất cao. Ngọc Gas cung cấp dịch vụ <strong>giao gas nhanh tại TP.HCM, giao gas nhanh tại Dĩ An & Thuận An</strong>.</p>
<h4>Cam Kết Uy Tín:</h4>
<ul>
  <li>Chất lượng gas sạch, ngọn lửa xanh không bám muội than.</li>
  <li>Đội ngũ giao gas chuyên nghiệp, thái độ phục vụ tận tâm.</li>
</ul>
<p>Liên hệ hotline chính thức: <strong>19009396</strong> (Đại lý Ngọc Gas 7 Nguyễn Trung Trực, Dĩ An).</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/phoenix-do.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 8, 
    name: 'Bình Gas Luxen Gas 12kg', 
    slug: 'binh-gas-luxen-gas-12kg', 
    short_description: 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', 
    description: `<h3>Đại Lý Giao Gas Nhanh Bình Gas Luxen Gas 12kg Tại VietSing & Thuận An</h3>
<p>Bình Gas Luxen Gas 12kg là thương hiệu gas uy tín sản xuất tại Bình Dương. Ngọc Gas phân phối chính hãng và hỗ trợ dịch vụ <strong>giao gas nhanh tại VietSing, giao gas nhanh tại Thuận An & Dĩ An</strong>.</p>
<h4>Tính Năng Nổi Bật:</h4>
<ul>
  <li>Vỏ bình dập khuôn chắc chắn, được kiểm định an toàn nghiêm ngặt.</li>
  <li>Khí gas hóa lỏng tiêu chuẩn cao, ngọn lửa xanh cháy khỏe.</li>
  <li>Giao gas nhanh tận nơi, lắp đặt tận tình.</li>
</ul>
<p>Gọi ngay tổng đài: <strong>19009396</strong>.</p>`,
    price: 420000, 
    sale_price: 395000, 
    image_url: '/images/luxen-gas.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  },
  { 
    id: 9, 
    name: 'Bình Gas Luxen Gas 45kg (Công Nghiệp)', 
    slug: 'binh-gas-luxen-gas-45kg-cong-nghiep', 
    short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', 
    description: `<h3>Dịch Vụ Giao Gas Nhanh Bình Gas Luxen Gas 45kg Cho Nhà Hàng KCN VSIP 1 & Dĩ An</h3>
<p>Bình Gas Luxen Gas 45kg (Bình bò công nghiệp) chuyên dùng cho các hệ thống bếp ăn tập thể, nhà hàng, khách sạn và xưởng sản xuất. Ngọc Gas tự hào cung cấp giải pháp <strong>giao gas nhanh tại KCN VSIP 1, giao gas nhanh tại Dĩ An, Thuận An & TP.HCM</strong>.</p>
<h4>Lợi Ích Khi Chọn Gas Công Nghiệp Luxen 45kg Tại Ngọc Gas:</h4>
<ul>
  <li><strong>Nguồn cung dồi dào:</strong> Đáp ứng khối lượng tiêu thụ lớn liên tục giờ cao điểm.</li>
  <li><strong>Thi công đường ống dẫn gas inox đạt chuẩn PCCC:</strong> Đội ngũ kỹ sư hỗ trợ khảo sát và tư vấn giàn gom gas miễn phí.</li>
  <li><strong>Giao gas nhanh 24/7:</strong> Kỹ thuật viên hỗ trợ giao gas nhanh và kiểm tra an toàn định kỳ.</li>
</ul>
<p>Khảo sát & nhận báo giá gas công nghiệp qua hotline chính thức: <strong>19009396</strong>.</p>`,
    price: 1550000, 
    sale_price: 1450000, 
    image_url: '/images/luxen-45.png', 
    category_id: 1, 
    is_featured: 1, 
    is_active: 1 
  }
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

  // Ensure long description fallback if DB record description is empty
  if (!product.description) {
    const foundFallback = allFallbackProducts.find(p => p.slug === slug);
    if (foundFallback && foundFallback.description) {
      product.description = foundFallback.description;
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

          {/* Long Description Section - Individual SEO Article */}
          {product.description && (
            <div className="product-long-description-section card" style={{ marginTop: '40px', padding: '32px' }}>
              <h3 className="long-desc-title" style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#0F172A', borderBottom: '2px solid #FF6B00', paddingBottom: '10px', display: 'inline-block' }}>
                Thông Tin Chi Tiết Sản Phẩm & Hướng Dẫn Đặt Gas
              </h3>
              <div className="product-desc-content" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="related-products-section" style={{ marginTop: '50px' }}>
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
