import { getAllSettings, parseSectionOrder } from '@/lib/settingsHelper';
import { getAllProducts } from '@/lib/productsHelper';
import { getAllPosts } from '@/lib/postsHelper';
import Link from 'next/link';
import FeaturedProductsTabs from '@/components/FeaturedProductsTabs';
import PostCard from '@/components/PostCard';
import SafetyFAQSection from '@/components/SafetyFAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GasPriceWidget from '@/components/GasPriceWidget';
import HeroSection from '@/components/HeroSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata() {
  const settings = await getAllSettings();
  const title = settings.meta_title || "Ngọc Gas - Năng lượng xanh, An tâm cho mọi nhà";
  const description = settings.meta_description || "Ngọc Gas chuyên cung cấp các loại bình gas dân dụng, gas công nghiệp và phụ kiện gas chính hãng an toàn tại TP. HCM & Bình Dương.";
  const keywords = settings.meta_keywords || "ngọc gas, đổi gas dĩ an, bình gas 12kg, gas bình dương, gas thủ đức";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website'
    }
  };
}

export default async function HomePage() {
  let featuredGasProducts = [];
  let featuredOtherProducts = [];
  let allActiveProducts = [];
  let latestPosts = [];
  let settings = {
    phone: '19009396',
    address: '7 Nguyễn Trung Trực, Dĩ An, Tỉnh Bình Dương',
    working_hours: '6h00 - 22h00 Tất cả các ngày trong tuần',
    about_vision: 'Trở thành thương hiệu cung cấp sản phẩm gas và giải pháp thi công hệ thống gas uy tín tại TP. HCM & Bình Dương.'
  };

  try {
    // Fetch products via 3-layer hydration engine (File + DB + Cache)
    const allProducts = await getAllProducts();
    allActiveProducts = allProducts.filter(p => p.is_active == 1);

    // Fetch settings via 3-layer hydration engine
    const fetchedSettings = await getAllSettings();
    settings = { ...settings, ...fetchedSettings };

    let featuredGasIds = [];
    let featuredOtherIds = [];
    try {
      featuredGasIds = JSON.parse(settings.featured_gas_ids || '[]');
      featuredOtherIds = JSON.parse(settings.featured_other_ids || '[]');
    } catch (e) {}

    // Group 1: Gas Cylinder Products
    const safeGasIds = Array.isArray(featuredGasIds) 
      ? featuredGasIds.map(id => Number(id)).filter(id => !isNaN(id)) 
      : [];

    if (safeGasIds.length > 0) {
      featuredGasProducts = allActiveProducts.filter(p => safeGasIds.includes(Number(p.id))).sort((a, b) => {
        return safeGasIds.indexOf(Number(a.id)) - safeGasIds.indexOf(Number(b.id));
      });
    }

    if (featuredGasProducts.length === 0) {
      featuredGasProducts = allActiveProducts.slice(0, 4);
    }

    // Group 2: Other/Accessory Products
    const safeOtherIds = Array.isArray(featuredOtherIds) 
      ? featuredOtherIds.map(id => Number(id)).filter(id => !isNaN(id)) 
      : [];

    if (safeOtherIds.length > 0) {
      featuredOtherProducts = allActiveProducts.filter(p => safeOtherIds.includes(Number(p.id))).sort((a, b) => {
        return safeOtherIds.indexOf(Number(a.id)) - safeOtherIds.indexOf(Number(b.id));
      });
    } else {
      featuredOtherProducts = [];
    }

    // Fetch posts via 3-layer hydration engine
    const allPosts = await getAllPosts();
    latestPosts = allPosts.filter(p => p.is_published == 1).slice(0, 3);

  } catch (error) {
    console.error('Error fetching homepage data:', error);
  }

  const rawPhone = (settings.phone || '19009396').replace(/[^0-9]/g, '');

  // Parse section order dynamically from Admin Settings
  const sectionOrder = parseSectionOrder(settings.home_sections_order);

  const displayPosts = latestPosts;

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'gas-price-widget':
        if (settings.show_home_gas_price === '0') return null;
        return <GasPriceWidget key="gas-price-widget" products={allActiveProducts} settings={settings} />;

      case 'intro-features':
        if (settings.show_home_features === '0') return null;
        return <SafetyFAQSection key="intro-features" settings={settings} />;

      case 'featured-products':
        if (settings.show_home_products === '0') return null;
        return (
          <section key="featured-products" className="section-padding bg-warm">
            <div className="container">
              <FeaturedProductsTabs 
                gasProducts={featuredGasProducts} 
                otherProducts={featuredOtherProducts} 
              />
            </div>
          </section>
        );

      case 'customer-reviews':
        if (settings.show_home_testimonials === '0') return null;
        return <TestimonialsSection key="customer-reviews" settings={settings} />;

      case 'latest-posts':
        if (settings.show_home_posts === '0') return null;
        if (!displayPosts || displayPosts.length === 0) return null;
        return (
          <section key="latest-posts" className="section-padding bg-warm">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-subtitle">TIN TỨC & KINH NGHIỆM</span>
                <h2 className="section-title">Kiến Thức & An Toàn Sử Dụng Gas</h2>
                <p className="section-desc">Cập nhật tin tức thị trường gas, mẹo tiết kiệm gas và kiến thức an toàn PCCC cho gia đình.</p>
              </div>

              <div className="posts-grid">
                {displayPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              <div className="text-center" style={{ marginTop: '2.5rem' }}>
                <Link href="/tin-tuc" className="btn btn-outline">
                  Xem tất cả bài viết
                </Link>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <HeroSection initialSettings={settings} />

      {sectionOrder.map((secId) => renderSection(secId))}

      {/* CTA Bottom Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Bạn Cần Đổi Gas Ngay Bây Giờ?</h2>
            <p className="cta-desc">
              Gọi ngay hotline {settings.phone} để được phục vụ giao gas nhanh trong vòng 10-15 phút tại Dĩ An, Thuận An & KDC VietSing. Cân đủ ký, kiểm tra an toàn van gas miễn phí.
            </p>
            <div className="cta-buttons">
              <a href={`tel:${rawPhone}`} className="btn btn-primary btn-lg">
                Gọi {settings.phone}
              </a>
              <Link href="/san-pham" className="btn btn-secondary btn-lg">
                Xem bảng giá gas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
