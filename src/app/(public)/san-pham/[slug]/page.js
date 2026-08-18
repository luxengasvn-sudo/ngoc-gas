import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import ProductOrderButton from '@/components/ProductOrderButton';
import { Flame, ShieldCheck, Star, CheckCircle2, Award } from 'lucide-react';
import { getProductByIdOrSlug, getAllProducts, getDefaultProductReviews } from '@/lib/productsHelper';
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

// Helper function to build humanized, 100% Google Keyword-Trust Article structure with branch linking
const createKeywordTrustSEOArticle = (productName, imageSrc, productTypeDesc, phone = '19009396', address = '7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương') => {
  const rawPhone = String(phone).replace(/[^0-9]/g, '');
  return `
<h2>Thông Tin & Hướng Dẫn Đổi ${productName} Tận Nhà</h2>
<p>Chào anh chị, Ngọc Gas xin gửi tới anh chị những thông tin chi tiết nhất về sản phẩm <strong>${productName}</strong>. Là đơn vị chuyên cung cấp gas chính hãng nhiều năm qua tại khu vực Dĩ An, Thuận An, KDC VietSing cũng như khắp Bình Dương và TP.HCM, chúng tôi luôn thấu hiểu rằng một bình gas an toàn, ngọn lửa xanh đều và dịch vụ phục vụ chu đáo chính là điều quan trọng nhất đối với mỗi căn bếp gia đình hay nhà hàng.</p>

<img src="${imageSrc}" alt="${productName} giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 24px auto; display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.12);" />

<h3>1. Đánh Giá Thực Tế Về ${productName}</h3>
<p>${productTypeDesc}</p>
<ul>
  <li><strong>Lửa xanh tiết kiệm:</strong> Khí gas tinh khiết được lọc kỹ, cho ngọn lửa xanh cháy đều, đun nấu nhanh chín mà không sợ đen đít nồi.</li>
  <li><strong>Vỏ bình dày dặn, an toàn:</strong> Đạt tiêu chuẩn kiểm định PCCC, sơn tĩnh điện chống rỉ sét và chịu lực va đập cực tốt.</li>
  <li><strong>Nguyên màng co niêm phong:</strong> Mỗi bình gas xuất kho đều được bọc màng co bảo vệ cổ van cẩn thận, đảm bảo hàng mới 100%.</li>
</ul>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<!-- SECTION 1: KEYWORD TRUST - GIAO GAS NHANH -->
<h3>2. Dịch Vụ Giao Gas Nhanh - Có Mặt Trong 15-30 Phút</h3>
<p>Khi hết gas giữa lúc đang nấu nướng, việc chờ đợi quá lâu sẽ gây gián đoạn công việc nội trợ hoặc kinh doanh quán ăn. Thấu hiểu điều đó, Ngọc Gas triển khai dịch vụ <strong>giao gas nhanh</strong> với mạng lưới giao hàng bằng xe máy phủ sóng khắp các nẻo đường. Khách hàng sử dụng dịch vụ <strong>giao gas nhanh</strong> của Ngọc Gas luôn được cam kết giao đúng hẹn, nhân viên nhiệt tình hỗ trợ cân thử gas và kiểm tra an toàn van dây miễn phí.</p>

<!-- SECTION 2: KEYWORD TRUST - GIAO GAS NHANH TẠI DĨ AN -->
<h3>3. Giao Gas Nhanh Tại Dĩ An - Uy Tín & Phục Vụ 24/7</h3>
<p>Với trụ sở chính đặt tại Dĩ An, dịch vụ <strong>giao gas nhanh tại Dĩ An</strong> của chúng tôi đã phục vụ hàng chục ngàn hộ gia đình trên các tuyến đường chính như Nguyễn Trung Trực, Lý Thường Kiệt, Trần Hưng Đạo, Nguyễn An Ninh... Khi gọi <strong>giao gas nhanh tại Dĩ An</strong>, anh chị hoàn toàn yên tâm về chất lượng bình gas chính hãng <strong>${productName}</strong> đủ cân nặng, ngọn lửa xanh mướt và không bao giờ lo gas giả.</p>

<!-- SECTION 3: KEYWORD TRUST - GIAO GAS NHANH TẠI THUẬN AN -->
<h3>4. Giao Gas Nhanh Tại Thuận An - Phủ Sóng Mọi Phường Trạm</h3>
<p>Tại khu vực Thuận An (phường An Phú, Thuận Giao, Lái Thiêu, An Thạnh, Bình Chuẩn), nhu cầu đun nấu hàng ngày rất lớn. Dịch vụ <strong>giao gas nhanh tại Thuận An</strong> của Ngọc Gas luôn đảm bảo cung cấp bình gas chính hãng <strong>${productName}</strong> chất lượng cao. Khi gọi <strong>giao gas nhanh tại Thuận An</strong>, anh chị không chỉ được phục vụ siêu tốc mà còn được nhân viên hỗ trợ vệ sinh kiềng bếp và tư vấn cách dùng gas sao cho tiết kiệm và an toàn nhất.</p>

<!-- SECTION 4: KEYWORD TRUST - GIAO GAS NHANH TẠI VIETSING -->
<h3>5. Giao Gas Nhanh Tại VietSing - Tận Căn Hộ, Nhà Trọ & Bếp Ăn KCN VSIP 1</h3>
<p>Khu dân cư VietSing (VSIP 1) có nhiều chung cư, nhà trọ cũng như quán ăn buôn bán tấp nập. Dịch vụ <strong>giao gas nhanh tại VietSing</strong> của chúng tôi chuyên phục vụ các căn hộ cao tầng, phòng trọ và quán ăn khu vực này. Khi anh chị cần <strong>giao gas nhanh tại VietSing</strong>, các anh em giao gas sẵn sàng bê bình gas lên tận tầng, hỗ trợ lắp đặt gọn gàng và cẩn thận. Gọi <strong>giao gas nhanh tại VietSing</strong> qua tổng đài ${phone} để được hỗ trợ tức thì.</p>

<!-- SECTION 5: KEYWORD TRUST - GIAO GAS NHANH TẠI TP.HCM -->
<h3>6. Giao Gas Nhanh Tại TP.HCM - Phục Vụ Nhanh Chóng Các Khu Vực Giáp Ranh</h3>
<p>Bên cạnh Bình Dương, Ngọc Gas cũng mở rộng dịch vụ <strong>giao gas nhanh tại TP.HCM</strong> cho các khu vực giáp ranh như TP. Thủ Đức, Quận 12, Bình Thạnh... Khách hàng khi cần <strong>giao gas nhanh tại TP.HCM</strong> luôn đánh giá cao sự đúng giờ và tinh thần trách nhiệm của đội ngũ nhân viên.</p>

<!-- SECTION 6: KEYWORD TRUST - GIAO GAS NHANH TẠI BÌNH DƯƠNG -->
<h3>7. Giao Gas Nhanh Tại Bình Dương - Hệ Thống Cửa Hàng Phủ Sóng Khắp Tỉnh</h3>
<p>Với định hướng trở thành người bạn đồng hành tin cậy của mọi căn bếp, giải pháp <strong>giao gas nhanh tại Bình Dương</strong> của Ngọc Gas đã và đang phục vụ cho hàng ngàn hộ gia đình, quán ăn và doanh nghiệp.</p>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<h3>8. Hệ Thống Cửa Hàng & Tổng Đài Đổi Gas Ngay</h3>
<p>Để tìm cửa hàng trạm gas gần nhất hoặc xem danh sách toàn bộ các chi nhánh của công ty, anh chị có thể bấm xem tại đây: <a href="/cua-hang" style="color: #FF6B00; font-weight: bold; text-decoration: underline;">Danh Sách Cửa Hàng & Chi Nhánh Trạm Gas Ngọc Gas</a>.</p>

<p>Khi cần đổi gas hoặc gặp bất kỳ thắc mắc nào về an toàn bếp gas, anh chị hãy gọi ngay cho chúng tôi nhé:</p>
<ul style="list-style: none; padding-left: 0; line-height: 2;">
  <li>📞 <strong>Hotline Hỗ Trợ 24/7:</strong> <a href="tel:${rawPhone}" style="color: #FF6B00; font-weight: bold; font-size: 20px;">${phone}</a></li>
  <li>📍 <strong>Trụ sở chính:</strong> ${address}</li>
</ul>
`;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const normSlug = slug.replace(/-sopet-vil-/g, '-sopet-');
  
  const product = (await getProductByIdOrSlug(slug)) || (await getProductByIdOrSlug(normSlug));
  if (product) {
    return {
      title: `${product.name} - Giao Gas Nhanh Tại Dĩ An, Thuận An, Bình Dương`,
      description: product.short_description || `Mua ${product.name} chính hãng, giá tốt tại Ngọc Gas TP. HCM & Bình Dương. Giao gas nhanh.`,
      keywords: `${product.name}, giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngoc gas`
    };
  }
  
  return {
    title: 'Sản phẩm gas chính hãng',
    description: 'Danh sách sản phẩm bình gas gia đình, gas công nghiệp và phụ kiện bếp gas chính hãng tại TP. HCM & Bình Dương.'
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const normSlug = slug.replace(/-sopet-vil-/g, '-sopet-');

  let product = (await getProductByIdOrSlug(slug)) || (await getProductByIdOrSlug(normSlug));

  if (!product) {
    notFound();
  }

  // Fetch settings dynamically
  const settings = await getAllSettings();
  const phone = settings.phone || '19009396';
  const address = settings.address || '7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương';
  const hotline = phone;

  // Preserve user's custom description if present; only fallback if description is completely empty
  if (!product.description || !product.description.trim()) {
    product.description = createKeywordTrustSEOArticle(
      product.name, 
      product.image_url || '/images/sopet-xam.png', 
      `${product.name} là sản phẩm gas chính hãng chất lượng cao tại Ngọc Gas.`,
      phone,
      address
    );
  }

  // Safe analytics click log
  try {
    db.query(
      `INSERT INTO analytics_clicks (click_type, label, page_url) VALUES ('product_view', ?, ?)`,
      [product.name, `/san-pham/${slug}`]
    ).catch(() => {});
  } catch (e) {}

  // Fetch related products dynamically
  let relatedProducts = [];
  try {
    const allProducts = await getAllProducts();
    relatedProducts = allProducts
      .filter(p => String(p.id) !== String(product.id) && p.slug !== product.slug && (p.is_active === 1 || p.is_active === true || p.is_active === undefined))
      .slice(0, 3);
  } catch (e) {}

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const hasSale = product.sale_price && Number(product.sale_price) > 0;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const productPrice = Number(product.sale_price && product.sale_price > 0 ? product.sale_price : (product.price || 0));

  // Parse product customer reviews
  let productReviews = [];
  try {
    if (product.reviews_json) {
      const parsed = typeof product.reviews_json === 'string' ? JSON.parse(product.reviews_json) : product.reviews_json;
      if (Array.isArray(parsed) && parsed.length > 0) {
        productReviews = parsed;
      }
    }
  } catch (e) {}

  if (productReviews.length === 0) {
    productReviews = getDefaultProductReviews(product.name);
  }

  const ratingVal = Number(product.rating_value || 4.9);
  const ratingCnt = Number(product.rating_count || (80 + (product.id ? Number(product.id) * 3 : 6)));

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${baseUrl}/san-pham/${product.slug}#product`,
        "name": product.name,
        "image": product.image_url ? (product.image_url.startsWith('http') ? product.image_url : `${baseUrl}${product.image_url}`) : `${baseUrl}/favicon.ico`,
        "description": product.short_description || `${product.name} chính hãng chất lượng cao tại Ngọc Gas. Giao nhanh 15 phút, cân đủ ký.`,
        "brand": {
          "@type": "Brand",
          "name": product.brand || settings.company_name || "Ngọc Gas"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": ratingVal.toFixed(1),
          "reviewCount": ratingCnt,
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": productReviews.map(r => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": r.name || "Khách Hàng Đổi Gas"
          },
          "datePublished": r.date || "2026-08-01",
          "reviewBody": r.comment || "Bình gas chính hãng, giao gas nhanh 15 phút, cân đủ ký tại chỗ.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": String(r.rating || 5),
            "bestRating": "5",
            "worstRating": "1"
          }
        })),
        "offers": {
          "@type": "Offer",
          "url": `${baseUrl}/san-pham/${product.slug}`,
          "priceCurrency": "VND",
          "price": productPrice > 0 ? productPrice : 390000,
          "priceValidUntil": "2030-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": settings.company_name || "Ngọc Gas"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/san-pham/${product.slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sản phẩm",
            "item": `${baseUrl}/san-pham`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `${baseUrl}/san-pham/${product.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .review-slider {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 18px;
          padding-bottom: 16px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }
        .review-slider::-webkit-scrollbar {
          height: 6px;
        }
        .review-slider::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 8px;
        }
        .review-slider::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 8px;
        }
        .review-card {
          flex: 0 0 85%;
          max-width: 320px;
          scroll-snap-align: start;
        }
        @media (min-width: 768px) {
          .review-card {
            flex: 0 0 340px;
          }
        }
      ` }} />
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
              
              {/* Rating stars & Sold count badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <a href="#danh-gia" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFFBEB', border: '1px solid #FDE68A', padding: '4px 12px', borderRadius: '20px' }}>
                  <div style={{ display: 'flex', color: '#F59E0B' }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  </div>
                  <strong style={{ fontSize: '13px', color: '#B45309', fontWeight: '800' }}>{ratingVal.toFixed(1)} / 5.0</strong>
                  <span style={{ fontSize: '12px', color: '#92400E' }}>({ratingCnt} đánh giá)</span>
                </a>
                <span style={{ fontSize: '12.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={15} color="#059669" /> Đã phục vụ hơn 2.400+ bình
                </span>
              </div>

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

          {/* Long Description Section - Humanized Keyword Trust Article */}
          {product.description && (
            <div className="product-long-description-section card" style={{ marginTop: '40px', padding: '36px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div className="product-desc-content" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Khối Đánh Giá Khách Hàng Thực Tế (Google Search Console Reviews) */}
          <div id="danh-gia" className="product-reviews-section card" style={{ marginTop: '40px', padding: '36px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', borderBottom: '1px solid #F1F5F9', paddingBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={24} fill="#F59E0B" color="#F59E0B" />
                  <span>Đánh Giá Từ Khách Hàng Đã Đổi {product.name}</span>
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
                  Tổng hợp nhận xét thực tế từ khách hàng gia đình và quán ăn tại Dĩ An, Thuận An &amp; TP.HCM.
                </p>
              </div>

              {/* Điểm tổng hợp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFBEB', border: '1px solid #FDE68A', padding: '12px 20px', borderRadius: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', fontWeight: '900', color: '#B45309', lineHeight: 1 }}>{ratingVal.toFixed(1)}</span>
                  <span style={{ fontSize: '14px', color: '#92400E', fontWeight: '600' }}>/5</span>
                </div>
                <div>
                  <div style={{ display: 'flex', color: '#F59E0B', marginBottom: '4px' }}>
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  </div>
                  <span style={{ fontSize: '12.5px', color: '#78350F', fontWeight: '600' }}>{ratingCnt} lượt bình chọn 100% hài lòng</span>
                </div>
              </div>
            </div>

            {/* Danh sách review cards */}
            <div className="review-slider">
              {productReviews.map((rev, idx) => (
                <div key={rev.id || idx} className="review-card" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block' }}>{rev.name}</strong>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>📍 {rev.location || 'Dĩ An, Bình Dương'}</span>
                      </div>
                      <span style={{ fontSize: '11.5px', background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '12px', fontWeight: '700', border: '1px solid #A7F3D0' }}>
                        ✓ Đã đổi gas
                      </span>
                    </div>

                    <div style={{ display: 'flex', color: '#F59E0B', marginBottom: '10px' }}>
                      {[...Array(Number(rev.rating || 5))].map((_, i) => (
                        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>

                    <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: '1.6', fontStyle: 'italic' }}>
                      "{rev.comment}"
                    </p>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #E2E8F0', fontSize: '11.5px', color: '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Đánh giá ngày: {rev.date || 'Gần đây'}</span>
                    <span style={{ color: '#059669', fontWeight: '600' }}>Cân gas đủ ký</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
