import db from '@/lib/db';
import HeroSection from '@/components/HeroSection';
import FeaturedProductsTabs from '@/components/FeaturedProductsTabs';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Users, Flame, Award, Clock } from 'lucide-react';

const DynamicIcon = ({ name, size = 32, className = "" }) => {
  // Safe resolver for dynamic icon components
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle || LucideIcons.Info;
  return <IconComponent size={size} className={className} />;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable cache so it always fetches fresh data from tinhgon DB

export default async function HomePage() {
  let featuredGasProducts = [];
  let featuredOtherProducts = [];
  let latestPosts = [];

  let settings = {
    // Hero details are fetched inside HeroSection.js, but let's define other sections
    home_feature_1_title: 'An Toàn Tuyệt Đối',
    home_feature_1_desc: 'Tất cả sản phẩm bình gas và hệ thống dẫn gas đều tuân thủ các quy định phòng cháy chữa cháy nghiêm ngặt nhất.',
    home_feature_2_title: 'Đảm Bảo Chất Lượng',
    home_feature_2_desc: 'Cam kết gas chính hãng, đủ trọng lượng, lửa xanh tiết kiệm và dịch vụ bảo trì định kỳ miễn phí cho mọi khách hàng.',
    home_feature_3_title: 'Giao Hàng Nhanh Chóng',
    home_feature_3_desc: 'Đội ngũ giao gas túc trực 24/7 sẵn sàng vận chuyển gas đến gia đình, quán ăn của bạn chỉ trong vòng 10-15 phút.',
    
    home_feature_1_icon: 'Shield',
    home_feature_2_icon: 'ThumbsUp',
    home_feature_3_icon: 'Truck',
    
    show_home_features: '1',
    show_home_products: '1',
    show_home_stats: '1',
    show_home_news: '1',
    show_home_cta: '1',
    
    home_products_title: 'Sản Phẩm Nổi Bật',
    home_products_subtitle: 'Các dòng sản phẩm gas dân dụng, công nghiệp và phụ kiện chất lượng cao bán chạy nhất tại Ngọc Gas.',
    
    home_stat_1_num: '10+',
    home_stat_1_label: 'Năm kinh nghiệm',
    home_stat_2_num: '5.000+',
    home_stat_2_label: 'Khách hàng tin dùng',
    home_stat_3_num: '50+',
    home_stat_3_label: 'Đại lý và đối tác',
    home_stat_4_num: '24/7',
    home_stat_4_label: 'Phục vụ liên tục',
    
    home_news_title: 'Tin Tức & Kiến Thức',
    home_news_subtitle: 'Cập nhật tin tức khuyến mãi mới nhất và cẩm nang hướng dẫn sử dụng gas an toàn trong nhà bếp.',
    
    home_cta_title: 'Bạn Cần Hỗ Trợ Tư Vấn Hoặc Báo Giá Hệ Thống Gas?',
    home_cta_desc: 'Ngọc Gas cung cấp dịch vụ khảo sát và thiết kế hệ thống gas công nghiệp miễn phí tại TP. HCM & Bình Dương.',
    home_cta_phone: '19009396',
    phone: '19009396', // fallback phone number
    featured_product_ids: '',
    home_sections_order: '["intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"]'
  };

  let allSettings = {};

  try {
    // 1. Fetch homepage settings first
    const [settingRows] = await db.query('SELECT setting_key, setting_value FROM settings');
    settingRows.forEach(row => {
      allSettings[row.setting_key] = row.setting_value;
      if (row.setting_value && settings[row.setting_key] !== undefined) {
        settings[row.setting_key] = row.setting_value;
      }
      if (row.setting_key === 'phone') {
        settings.phone = row.setting_value;
      }
    });

    // 2. Fetch featured products split by category groups
    let featuredGasIds = [];
    let featuredOtherIds = [];
    try {
      featuredGasIds = JSON.parse(settings.featured_gas_ids || '[]');
    } catch (e) {}
    try {
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
    featuredGasProducts = gasRows;

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
    featuredOtherProducts = otherRows;

    // 3. Fetch posts
    const [postRows] = await db.query(`
      SELECT * FROM posts 
      WHERE is_published = 1 
      ORDER BY created_at DESC 
      LIMIT 3
    `);
    latestPosts = postRows;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
  }

  const rawPhone = settings.phone.replace(/[^0-9]/g, '');

  return (
    <>
      <HeroSection initialSettings={allSettings} />

      {(() => {
        let order = [];
        try {
          if (settings.home_sections_order) {
            const parsed = JSON.parse(settings.home_sections_order);
            if (Array.isArray(parsed) && parsed.length > 0) {
              order = parsed;
            }
          }
        } catch(e) {}
        
        if (order.length === 0) {
          order = ["intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"];
        }

        let featuresList = [];
        try {
          if (settings.home_features_list) {
            const parsed = JSON.parse(settings.home_features_list);
            if (Array.isArray(parsed) && parsed.length > 0) {
              featuresList = parsed;
            }
          }
        } catch(e) {}

        if (featuresList.length === 0) {
          featuresList = [
            { title: settings.home_feature_1_title, desc: settings.home_feature_1_desc, icon: settings.home_feature_1_icon || 'Shield' },
            { title: settings.home_feature_2_title, desc: settings.home_feature_2_desc, icon: settings.home_feature_2_icon || 'ThumbsUp' },
            { title: settings.home_feature_3_title, desc: settings.home_feature_3_desc, icon: settings.home_feature_3_icon || 'Truck' }
          ];
        }

        return order.map((sectionId) => {
          switch (sectionId) {
            case 'intro-features':
              return settings.show_home_features !== '0' && (
                <section key="intro-features" className="section-padding intro-section">
                  <div className="container">
                    <div className="intro-features-grid">
                      {featuresList.map((item, idx) => (
                        <div key={idx} className="card feature-card animate-fade-in-up">
                          <div className="feature-icon-wrapper">
                            <DynamicIcon name={item.icon || 'Shield'} size={32} className="feature-icon" />
                          </div>
                          <h3 className="feature-title">{item.title}</h3>
                          <p className="feature-desc">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            case 'featured-products':
              return settings.show_home_products !== '0' && (
                <section key="featured-products" className="section-padding products-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <div className="container">
                    <div className="section-title-wrapper">
                      <h2 className="section-title">{settings.home_products_title}</h2>
                      <p className="section-subtitle">{settings.home_products_subtitle}</p>
                    </div>
                    
                    <FeaturedProductsTabs 
                      gasProducts={featuredGasProducts} 
                      otherProducts={featuredOtherProducts} 
                    />

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                      <Link href="/san-pham" className="btn btn-primary">
                        Xem tất cả sản phẩm
                      </Link>
                    </div>
                  </div>
                </section>
              );
            case 'stats-counter':
              return settings.show_home_stats !== '0' && (
                <section key="stats-counter" className="section-padding stats-section">
                  <div className="container stats-container">
                    <div className="stat-item">
                      <Award size={48} className="stat-icon" />
                      <h3 className="stat-number">{settings.home_stat_1_num}</h3>
                      <p className="stat-label">{settings.home_stat_1_label}</p>
                    </div>
                    <div className="stat-item">
                      <Users size={48} className="stat-icon" />
                      <h3 className="stat-number">{settings.home_stat_2_num}</h3>
                      <p className="stat-label">{settings.home_stat_2_label}</p>
                    </div>
                    <div className="stat-item">
                      <Flame size={48} className="stat-icon" />
                      <h3 className="stat-number">{settings.home_stat_3_num}</h3>
                      <p className="stat-label">{settings.home_stat_3_label}</p>
                    </div>
                    <div className="stat-item">
                      <Clock size={48} className="stat-icon" />
                      <h3 className="stat-number">{settings.home_stat_4_num}</h3>
                      <p className="stat-label">{settings.home_stat_4_label}</p>
                    </div>
                  </div>
                </section>
              );
            case 'latest-news':
              return settings.show_home_news !== '0' && (
                <section key="latest-news" className="section-padding news-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
                  <div className="container">
                    <div className="section-title-wrapper">
                      <h2 className="section-title">{settings.home_news_title}</h2>
                      <p className="section-subtitle">{settings.home_news_subtitle}</p>
                    </div>
                    {latestPosts.length > 0 ? (
                      <div className="grid-3">
                        {latestPosts.map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Đang cập nhật tin tức mới...</p>
                    )}
                  </div>
                </section>
              );
            case 'cta-section':
              return settings.show_home_cta !== '0' && (
                <section key="cta-section" className="cta-section">
                  <div className="container cta-container">
                    <h2 className="cta-title">{settings.home_cta_title}</h2>
                    <p className="cta-desc">{settings.home_cta_desc}</p>
                    <div className="cta-actions">
                      <a href={`tel:${rawPhone}`} className="btn btn-primary btn-lg">
                        Gọi ngay: {settings.home_cta_phone}
                      </a>
                      <Link href="/lien-he" className="btn btn-white-outline btn-lg">
                        Gửi form liên hệ
                      </Link>
                    </div>
                  </div>
                </section>
              );
            default:
              return null;
          }
        });
      })()}
    </>
  );
}
