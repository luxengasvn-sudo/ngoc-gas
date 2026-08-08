import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ProductOrderButton from '@/components/ProductOrderButton';
import { Flame, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

// Helper function to build 100% Google Keyword-Trust Article structure with dedicated sections for each local keyword
const createKeywordTrustSEOArticle = (productName, imageSrc, productTypeDesc) => {
  return `
<h2>Chuyên Bài Viết SEO - Dịch Vụ Giao Gas Nhanh ${productName}</h2>
<p>Chào mừng quý khách đến với đại lý Ngọc Gas (Địa chỉ chính thức: <em>7 Nguyễn Trung Trực, TP. Dĩ An, Bình Dương</em>). Bài viết này phân tích chi tiết về <strong>${productName}</strong> và hệ thống dịch vụ <strong>giao gas nhanh</strong> tận nơi cho quý khách hàng tại Dĩ An, Thuận An, VietSing, TP.HCM và Bình Dương.</p>

<img src="${imageSrc}" alt="${productName} giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 24px auto; display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.12);" />

<h3>1. Tổng Quan Về Sản Phẩm ${productName}</h3>
<p>${productTypeDesc}</p>
<ul>
  <li><strong>Khí gas tinh khiết:</strong> Ngọn lửa cháy xanh đều, đốt cháy hoàn toàn nhiên liệu, tiết kiệm gas tối đa và không bám đen đáy nồi.</li>
  <li><strong>Tiêu chuẩn an toàn vỏ bình:</strong> Đúc từ thép chịu lực cao cấp, kiểm định PCCC hợp quy định.</li>
  <li><strong>Tem niêm phong chính hãng:</strong> Cổ van bình luôn được bọc màng co nguyên vẹn bảo vệ chống hàng giả hàng nhái.</li>
</ul>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<!-- SECTION 1: KEYWORD TRUST - GIAO GAS NHANH -->
<h3>2. Dịch Vụ Giao Gas Nhanh - Cam Kết Có Mặt Trong 15-30 Phút</h3>
<p>Dịch vụ <strong>giao gas nhanh</strong> của Ngọc Gas được thiết kế chuyên biệt nhằm giải quyết triệt để sự cố hết gas đột ngột khi quý khách đang nấu nướng. Với đội ngũ kỹ thuật viên túc trực 24/7, chúng tôi cam kết <strong>giao gas nhanh</strong> tận bếp, không để bữa ăn gia đình hay hoạt động kinh doanh nhà hàng bị gián đoạn. Đội ngũ <strong>giao gas nhanh</strong> luôn mang theo đầy đủ dụng cụ đo kiểm tra an toàn van dây gas miễn phí khi lắp đặt.</p>

<!-- SECTION 2: KEYWORD TRUST - GIAO GAS NHANH TẠI DĨ AN -->
<h3>3. Giao Gas Nhanh Tại Dĩ An - Phục Vụ Tận Nhà 24/7 Các Phường</h3>
<p>Dịch vụ <strong>giao gas nhanh tại Dĩ An</strong> phủ sóng toàn bộ địa bàn TP. Dĩ An bao gồm các phường: Dĩ An, An Bình, Tân Đông Hiệp, Đông Hòa, Bình An, Bình Thắng và Tân Bình. Đại lý chính thức tại <em>7 Nguyễn Trung Trực, Dĩ An</em> giúp việc <strong>giao gas nhanh tại Dĩ An</strong> diễn ra tức thì trong 15 phút. Khách hàng gọi <strong>giao gas nhanh tại Dĩ An</strong> sẽ được nhân viên cân bình gas trực tiếp tại nhà để kiểm tra đủ ký trước khi bàn giao.</p>

<!-- SECTION 3: KEYWORD TRUST - GIAO GAS NHANH TẠI THUẬN AN -->
<h3>4. Giao Gas Nhanh Tại Thuận An - Phục Vụ Siêu Tốc Hộ Gia Đình & Quán Ăn</h3>
<p>Nhu cầu <strong>giao gas nhanh tại Thuận An</strong> luôn rất cao tại các khu vực sầm uất như phường An Phú, Thuận Giao, Lái Thiêu, An Thạnh, Bình Chuẩn. Trạm vận chuyển <strong>giao gas nhanh tại Thuận An</strong> của Ngọc Gas đảm bảo tiếp ứng bình gas chính hãng <strong>${productName}</strong> chỉ trong ít phút. Khách hàng lựa chọn <strong>giao gas nhanh tại Thuận An</strong> hoàn toàn yên tâm về chất lượng bình gas mới 100%, vỏ bình dày dặn đạt chuẩn PCCC.</p>

<!-- SECTION 4: KEYWORD TRUST - GIAO GAS NHANH TẠI VIETSING -->
<h3>5. Giao Gas Nhanh Tại VietSing - Tận Căn Hộ, Nhà Trọ & KCN VSIP 1</h3>
<p>Khu dân cư VietSing (KCN VSIP 1) là khu vực mật độ dân cư và quán ăn dày đặc. Dịch vụ <strong>giao gas nhanh tại VietSing</strong> của Ngọc Gas đáp ứng nhu cầu đổi gas khẩn cấp cho căn hộ, nhà trọ và bếp ăn công nghiệp. Khi đặt <strong>giao gas nhanh tại VietSing</strong>, quý khách sẽ được kỹ thuật viên hỗ trợ bê bình gas tận tầng, lắp đặt van ngắt tự động và hướng dẫn sử dụng gas an toàn tiết kiệm nhất. Đặt <strong>giao gas nhanh tại VietSing</strong> qua hotline 19009396 ngay hôm nay.</p>

<!-- SECTION 5: KEYWORD TRUST - GIAO GAS NHANH TẠI TP.HCM -->
<h3>6. Giao Gas Nhanh Tại TP.HCM - Đáp Ứng Nhu Cầu Năng Lượng Đô Thị</h3>
<p>Đối với các khu vực giáp ranh TP. Hồ Chí Minh như TP. Thủ Đức, Quận 12, Bình Thạnh..., Ngọc Gas duy trì trạm trung chuyển <strong>giao gas nhanh tại TP.HCM</strong> nhằm mang đến nguồn gas sạch, lửa xanh tiết kiệm. Dịch vụ <strong>giao gas nhanh tại TP.HCM</strong> cam kết bình gas được kiểm định định kỳ, nguyên màng co niêm phong và bảo hành sự cố trong suốt quá trình sử dụng. Quý khách hàng cần <strong>giao gas nhanh tại TP.HCM</strong> chỉ cần gọi tổng đài 19009396.</p>

<!-- SECTION 6: KEYWORD TRUST - GIAO GAS NHANH TẠI BÌNH DƯƠNG -->
<h3>7. Giao Gas Nhanh Tại Bình Dương - Giải Pháp Năng Lượng An Toàn Toàn Tỉnh</h3>
<p>Ngọc Gas tự hào là thương hiệu cung cấp giải pháp <strong>giao gas nhanh tại Bình Dương</strong> uy tín cho hàng nghìn hộ gia đình, chuỗi nhà hàng và xưởng sản xuất. Dịch vụ <strong>giao gas nhanh tại Bình Dương</strong> không chỉ đáp ứng tiêu chí giao hàng tốc độ mà còn cam kết kiểm tra an toàn PCCC toàn diện cho giàn gas, dây dẫn và van khóa. Khách hàng chọn <strong>giao gas nhanh tại Bình Dương</strong> luôn nhận được mức giá niêm yết cạnh tranh và dịch vụ hậu mãi chu đáo nhất.</p>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<h3>8. Hướng Dẫn Đặt Gas & Liên Hệ Hotline</h3>
<p>Để nhận ưu đãi và trải nghiệm dịch vụ <strong>giao gas nhanh</strong> uy tín nhất, quý khách vui lòng liên hệ:</p>
<ul>
  <li><strong>Hotline Đặt Gas 24/7:</strong> <a href="tel:19009396" style="color: #FF6B00; font-weight: bold; font-size: 18px;">19009396</a></li>
  <li><strong>Địa chỉ đại lý chính thức:</strong> 7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương</li>
  <li><strong>Website chính thức:</strong> <a href="https://ngoc-gas.tinhgon.xyz" target="_blank">ngoc-gas.tinhgon.xyz</a></li>
</ul>
`;
};

const allFallbackProducts = [
  { 
    id: 1, 
    name: 'Bình Gas Sopet Vil 12kg (Xám)', 
    slug: 'binh-gas-sopet-vil-12kg-xam', 
    short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet Vil 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet Vil 12kg (Xám)', 
      '/images/sopet-xam.png', 
      'Bình Gas Sopet Vil 12kg màu xám là dòng gas dân dụng sản xuất theo công nghệ Nhật Bản tiên tiến, mang lại ngọn lửa xanh sạch và hiệu suất truyền nhiệt vượt trội.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet Vil 12kg (Xanh Đen)', 
      '/images/sopet-xanh-den.png', 
      'Bình Gas Sopet Vil 12kg vỏ xanh đen sang trọng, sở hữu nước sơn tĩnh điện chịu nhiệt cao, tích hợp van điều áp tự động ngắt gas khẩn cấp khi gặp sự cố.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet Vil 12kg (Xanh)', 
      '/images/sopet-xanh.png', 
      'Bình Gas Sopet Vil 12kg vỏ xanh tiêu chuẩn là sự lựa chọn quen thuộc của hàng nghìn căn bếp gia đình tại Việt Nam nhờ lửa xanh khỏe và tiết kiệm nhiên liệu.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Sopet Vil 12kg (Đỏ)', 
      '/images/sopet.png', 
      'Bình Gas Sopet Vil 12kg vỏ đỏ nổi bật với kết cấu thép đúc siêu bền, bề mặt dập nổi logo Sopet Vil chính hãng đảm bảo an toàn tuyệt đối cho người sử dụng.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Phoenix Gas 12kg (Xám)', 
      '/images/phoenix-xam.png', 
      'Bình Gas Phoenix Gas 12kg vỏ xám mang đến giải pháp nhiên liệu đun nấu tiết kiệm chi phí nhưng vẫn đảm bảo áp suất gas ổn định và an toàn PCCC.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Phoenix Gas 12kg (Xanh)', 
      '/images/phoenix-lg-xanh.png', 
      'Bình Gas Phoenix Gas 12kg vỏ xanh lá tươi sáng, được kiểm định chất lượng khí gas tinh khiết không tạo cặn bẩn hay làm đen kiềng bếp nấu.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Phoenix Gas 12kg (Đỏ)', 
      '/images/phoenix-do.png', 
      'Bình Gas Phoenix Gas 12kg màu đỏ nổi bật với áp suất duy trì đều đặn từ lúc bắt đầu cho tới khi hết bình gas, giúp món ăn đun nấu nhanh chín thơm ngon.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Luxen Gas 12kg', 
      '/images/luxen-gas.png', 
      'Bình Gas Luxen Gas 12kg là thương hiệu gas uy tín sản xuất ngay tại tỉnh Bình Dương, có vỏ bình đúc dày chịu lực tốt và ngọn lửa xanh cực mạnh.'
    ),
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
    description: createKeywordTrustSEOArticle(
      'Bình Gas Luxen Gas 45kg (Công Nghiệp)', 
      '/images/luxen-45.png', 
      'Bình Gas Luxen Gas 45kg công nghiệp (Bình bò) dung tích cực lớn chuyên dùng cho các giàn gom bếp khè nhà hàng, khách sạn và bếp ăn công nghiệp KCN VSIP 1.'
    ),
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
        title: `${product.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, VietSing, TP.HCM - NGỌC GAS`,
        description: product.short_description || `Mua ${product.name} chính hãng, giá tốt tại Ngọc Gas TP. HCM & Bình Dương. Giao gas nhanh.`,
        keywords: `${product.name}, giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngoc gas`
      };
    }
  } catch (e) {
    console.error('Error generating product metadata:', e.message);
  }

  const fallbackObj = allFallbackProducts.find(p => p.slug === slug);
  if (fallbackObj) {
    return {
      title: `${fallbackObj.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, VietSing, TP.HCM - NGỌC GAS`,
      description: fallbackObj.short_description,
      keywords: `${fallbackObj.name}, giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngoc gas`
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

  // Always enforce the Keyword Trust SEO Article structure for maximum Google ranking authority
  const foundFallback = allFallbackProducts.find(p => p.slug === slug);
  if (foundFallback && (!product.description || product.description.length < 300)) {
    product.description = foundFallback.description;
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

          {/* Long Description Section - 100% Keyword Trust Authority SEO Article */}
          {product.description && (
            <div className="product-long-description-section card" style={{ marginTop: '40px', padding: '36px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
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
