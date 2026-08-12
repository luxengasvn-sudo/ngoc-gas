import db from '@/lib/db';
import { getAllSettings } from '@/lib/settingsHelper';
import Link from 'next/link';
import FeaturedProductsTabs from '@/components/FeaturedProductsTabs';
import PostCard from '@/components/PostCard';
import SafetyFAQSection from '@/components/SafetyFAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GasPriceWidget from '@/components/GasPriceWidget';
import HeroSection from '@/components/HeroSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

const defaultGasProducts = [
  { id: 1, name: 'Bình Gas Sopet 12kg (Xám)', slug: 'binh-gas-sopet-12kg-xam', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', price: 420000, sale_price: 395000, image_url: '/images/sopet-xam.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 2, name: 'Bình Gas Sopet 12kg (Xanh Đen)', slug: 'binh-gas-sopet-12kg-xanh-den', short_description: 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', price: 425000, sale_price: 400000, image_url: '/images/sopet-xanh-den.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 3, name: 'Bình Gas Sopet 12kg (Xanh)', slug: 'binh-gas-sopet-12kg-xanh', short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', price: 420000, sale_price: 395000, image_url: '/images/sopet-xanh.png', category_id: 1, is_featured: 1, is_active: 1 },
  { id: 4, name: 'Bình Gas Sopet 12kg (Đỏ)', slug: 'binh-gas-sopet-12kg-do', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', price: 430000, sale_price: 405000, image_url: '/images/sopet.png', category_id: 1, is_featured: 1, is_active: 1 }
];

const defaultAccessoryProducts = [
  { id: 101, name: 'Dây Dẫn Gas Cao Cấp Chống Chuột Bọ', slug: 'day-dan-gas-cao-cap', short_description: 'Dây dẫn gas nhập khẩu Hàn Quốc 3 lớp siêu bền chống gập, chống chuột cắn.', price: 180000, sale_price: 150000, image_url: '/images/gas-cylinder.jpg', category_id: 3, is_featured: 1, is_active: 1 },
  { id: 102, name: 'Van Gas Năng Lượng Tự Động Ngắt Khẩn Cấp', slug: 'van-gas-tu-dong-ngat', short_description: 'Van điều áp an toàn tự động khóa gas khi có sự cố rò rỉ.', price: 350000, sale_price: 290000, image_url: '/images/gas-cylinder.jpg', category_id: 3, is_featured: 1, is_active: 1 },
  { id: 103, name: 'Bộ Van Dây Gas Đôi Tiêu Chuẩn PCCC', slug: 'bo-van-day-gas-doi', short_description: 'Combo van ngắt và dây gas nhập khẩu chính hãng bảo vệ căn bếp.', price: 480000, sale_price: 420000, image_url: '/images/gas-cylinder.jpg', category_id: 3, is_featured: 1, is_active: 1 },
  { id: 104, name: 'Bếp Gas Đơn Hồng Ngoại Tiết Kiệm Gas', slug: 'bep-gas-don-hong-ngoai', short_description: 'Bếp gas hồng ngoại đơn lửa xanh chịu lực cao, tiết kiệm 30% gas.', price: 650000, sale_price: 580000, image_url: '/images/gas-cylinder.jpg', category_id: 3, is_featured: 1, is_active: 1 }
];

export default async function HomePage() {
  let featuredGasProducts = [];
  let featuredOtherProducts = [];
  let latestPosts = [];
  let settings = {
    phone: '19009396',
    address: '7 Nguyễn Trung Trực, Dĩ An, Tỉnh Bình Dương',
    working_hours: '6h00 - 22h00 Tất cả các ngày trong tuần',
    about_vision: 'Trở thành thương hiệu cung cấp sản phẩm gas và giải pháp thi công hệ thống gas uy tín tại TP. HCM & Bình Dương.'
  };

  try {
    // 1. Fetch settings from unified settingsHelper (File + DB + Memory)
    const fetchedSettings = await getAllSettings();
    settings = { ...settings, ...fetchedSettings };

    let featuredGasIds = [];
    let featuredOtherIds = [];
    try {
      featuredGasIds = JSON.parse(settings.featured_gas_ids || '[]');
      featuredOtherIds = JSON.parse(settings.featured_other_ids || '[]');
    } catch (e) {}

    // Group 1: Gas Cylinder Products (Category Name like '%gas%' or Category ID 1, 2, 4)
    let gasQuery = `
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = 1 AND (LOWER(c.name) LIKE '%gas%' OR p.category_id IN (1, 2, 4))
    `;
    const safeGasIds = Array.isArray(featuredGasIds) 
      ? featuredGasIds.map(id => Number(id)).filter(id => !isNaN(id)) 
      : [];
    if (safeGasIds.length > 0) {
      gasQuery += ` AND p.id IN (${safeGasIds.join(',')})`;
    } else {
      gasQuery += ` AND p.is_featured = 1`;
    }
    gasQuery += ` LIMIT 4`;
    const [gasRows] = await db.query(gasQuery);
    featuredGasProducts = gasRows || [];

    // Group 2: Other/Accessory Products (Category Name NOT like '%gas%' and Category ID NOT IN 1, 2, 4)
    let otherQuery = `
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = 1 AND NOT (LOWER(c.name) LIKE '%gas%' OR p.category_id IN (1, 2, 4))
    `;
    const safeOtherIds = Array.isArray(featuredOtherIds) 
      ? featuredOtherIds.map(id => Number(id)).filter(id => !isNaN(id)) 
      : [];
    if (safeOtherIds.length > 0) {
      otherQuery += ` AND p.id IN (${safeOtherIds.join(',')})`;
    } else {
      otherQuery += ` AND p.is_featured = 1`;
    }
    otherQuery += ` LIMIT 4`;
    const [otherRows] = await db.query(otherQuery);
    featuredOtherProducts = otherRows || [];

    // 3. Fetch posts
    const [postRows] = await db.query(`
      SELECT * FROM posts 
      WHERE is_published = 1 
      ORDER BY created_at DESC 
      LIMIT 3
    `);
    latestPosts = postRows || [];
  } catch (error) {
    console.error('Error fetching homepage data:', error);
  }

  // Proper fallback: Gas tab gets gas products, Accessory tab gets accessory products
  if (!featuredGasProducts || featuredGasProducts.length === 0) {
    featuredGasProducts = defaultGasProducts;
  }
  if (!featuredOtherProducts || featuredOtherProducts.length === 0) {
    featuredOtherProducts = defaultAccessoryProducts;
  }

  const rawPhone = settings.phone.replace(/[^0-9]/g, '');

  // Parse section order dynamically from Admin Settings
  const ALL_SECTIONS = ["gas-price-widget", "intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"];
  let sectionOrder = [];
  try {
    sectionOrder = JSON.parse(settings.home_sections_order || '[]');
  } catch (e) {
    sectionOrder = [];
  }
  if (!Array.isArray(sectionOrder)) sectionOrder = [];

  // Keep valid section IDs in saved order
  sectionOrder = sectionOrder.filter(id => ALL_SECTIONS.includes(id));

  // If gas-price-widget is missing, unshift to top (default position 0)
  if (!sectionOrder.includes('gas-price-widget')) {
    sectionOrder.unshift('gas-price-widget');
  }

  // Append any other missing sections at the end
  ALL_SECTIONS.forEach(id => {
    if (!sectionOrder.includes(id)) {
      sectionOrder.push(id);
    }
  });

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'gas-price-widget':
        if (settings.show_home_gas_price === '0') return null;
        return <GasPriceWidget key="gas-price-widget" settings={settings} />;

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

      case 'stats-counter':
        if (settings.show_home_stats === '0') return null;
        return <TestimonialsSection key="stats-counter" />;

      case 'latest-news':
        if (settings.show_home_news === '0' || !latestPosts || latestPosts.length === 0) return null;
        return (
          <section key="latest-news" className="section-padding bg-warm">
            <div className="container">
              <div className="section-header text-center">
                <span className="section-subtitle">TIN TỨC & KINH NGHIỆM</span>
                <h2 className="section-title">{settings.home_news_title || 'Cẩm Nang An Toàn & Khuyến Mãi Gas'}</h2>
                <p className="section-desc">{settings.home_news_subtitle || 'Cập nhật thông tin giá gas mới nhất, kinh nghiệm chọn gas chính hãng và mẹo sử dụng gas an toàn tiết kiệm.'}</p>
              </div>
              
              <div className="grid-3 posts-grid">
                {latestPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              <div className="text-center" style={{ marginTop: '40px' }}>
                <Link href="/tin-tuc" className="btn btn-outline">
                  Xem Tất Cả Bài Viết ↗
                </Link>
              </div>
            </div>
          </section>
        );

      case 'cta-section':
        if (settings.show_home_cta === '0') return null;
        return (
          <section key="cta-section" className="cta-banner">
            <div className="container text-center">
              <h2 className="cta-title">{settings.home_cta_title || 'Cần Giao Gas Nhanh Tận Nhà Tại Dĩ An & Thuận An?'}</h2>
              <p className="cta-desc">{settings.home_cta_desc || 'Đội ngũ Ngọc Gas túc trực 24/7. Gọi ngay tổng đài để được phục vụ trong 15-30 phút!'}</p>
              <div className="cta-buttons">
                <a href={`tel:${rawPhone}`} className="btn btn-primary btn-lg">
                  Gọi Hotline {settings.phone}
                </a>
                <Link href="/lien-he" className="btn btn-outline-white btn-lg">
                  Địa chỉ & Trạm giao gas
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
      {/* Hero Banner Section (Always Top) */}
      <HeroSection settings={settings} />

      {/* Dynamic Sections ordered and toggled by Admin Settings */}
      {sectionOrder.map(sectionId => renderSection(sectionId))}
    </>
  );
}
