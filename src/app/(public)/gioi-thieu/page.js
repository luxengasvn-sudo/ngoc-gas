import db from '@/lib/db';
import Link from 'next/link';
import { Flame, Shield, Users, Heart, Award, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export default async function AboutPage() {
  let settings = {
    about_hero_title: 'Về Ngọc Gas',
    about_hero_desc: 'Hành trình xây dựng thương hiệu gas uy tín, an toàn và tận tâm tại TP. HCM & Bình Dương.',
    about_history_title: 'Lịch Sử Hình Thành',
    about_history: 'Ngọc Gas được thành lập từ những năm đầu khi TP. HCM bắt đầu phát triển mạnh mẽ về hạ tầng và dịch vụ. Trải qua hơn 10 năm hoạt động và phát triển, chúng tôi tự hào là đơn vị cung cấp gas uy tín và hệ thống gas công nghiệp đạt chuẩn an toàn phòng cháy chữa cháy tại TP. HCM & Bình Dương.',
    about_intro_partner_title: 'Đối tác năng lượng',
    about_intro_partner_desc: 'Chúng tôi là đối tác tin cậy cung cấp hệ thống gas công nghiệp cho hàng trăm nhà hàng, khách sạn lớn tại TP. HCM & Bình Dương.',
    about_vision_title: 'Tầm Nhìn',
    about_vision: 'Trở thành thương hiệu cung cấp sản phẩm gas và giải pháp thi công hệ thống gas hàng đầu tại TP. HCM & Bình Dương, được khách hàng tin tưởng lựa chọn nhờ sự uy tín, chuyên nghiệp và tiêu chuẩn an toàn cao nhất.',
    about_mission_title: 'Sứ Mệnh',
    about_mission: 'Cung cấp giải pháp năng lượng hiệu quả, sạch và an toàn cho cộng đồng. Góp phần vào sự phát triển bền vững của TP. HCM & Bình Dương bằng cách nâng cao tiêu chuẩn an toàn sử dụng gas trong sinh hoạt và sản xuất kinh doanh.',
    about_value_title: 'Giá Trị Cốt Lõi',
    about_value_subtitle: 'Những nguyên tắc định hướng cho mọi hành động và dịch vụ của chúng tôi.',
    about_value_1_title: 'An Toàn',
    about_value_1_desc: 'Là ưu tiên số một trong mọi hoạt động của công ty. An toàn cho nhân viên, cho khách hàng và cho cộng đồng.',
    about_value_2_title: 'Tận Tâm',
    about_value_2_desc: 'Luôn đặt lợi ích và sự an tâm của khách hàng lên vị trí ưu tiên. Phục vụ chu đáo, hỗ trợ kịp thời 24/7.',
    about_value_3_title: 'Chất Lượng',
    about_value_3_desc: 'Đảm bảo nguồn gas chính hãng từ các thương hiệu lớn như Petrolimex, Shell, đủ cân nặng, chất lượng ổn định.',
    about_cta_title: 'Đồng hành cùng sự phát triển của bạn',
    about_cta_desc: 'Hãy để Ngọc Gas mang đến giải pháp năng lượng tối ưu, an toàn nhất cho nhà bếp của bạn.',
    about_cta_btn: 'Liên hệ ngay với chúng tôi'
  };

  try {
    const [rows] = await db.query('SELECT setting_key, setting_value FROM settings');
    rows.forEach(row => {
      if (row.setting_value && settings[row.setting_key] !== undefined) {
        settings[row.setting_key] = row.setting_value;
      }
    });
  } catch (error) {
    console.error('Error fetching about page settings:', error);
  }

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Giới thiệu</span>
          </div>
          <h1 className="about-hero-title">{settings.about_hero_title}</h1>
          <p className="about-hero-desc">{settings.about_hero_desc}</p>
        </div>
      </section>

      {/* History & Intro */}
      <section className="section-padding">
        <div className="container about-intro-container">
          <div className="about-intro-text">
            <h2>{settings.about_history_title}</h2>
            <div className="about-desc-content" dangerouslySetInnerHTML={{ __html: settings.about_history.replace(/\n/g, '<br />') }} />
          </div>
          <div className="about-intro-graphic">
            <div className="graphic-card card">
              <Flame size={48} className="graphic-icon" />
              <h3>{settings.about_intro_partner_title}</h3>
              <p>{settings.about_intro_partner_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding vision-mission-section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="container grid-2">
          <div className="vision-mission-card card">
            <div className="card-icon-wrapper">
              <Award size={32} className="card-icon" />
            </div>
            <h3>{settings.about_vision_title}</h3>
            <p>{settings.about_vision}</p>
          </div>
          <div className="vision-mission-card card">
            <div className="card-icon-wrapper">
              <Shield size={32} className="card-icon" />
            </div>
            <h3>{settings.about_mission_title}</h3>
            <p>{settings.about_mission}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding values-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">{settings.about_value_title}</h2>
            <p className="section-subtitle">{settings.about_value_subtitle}</p>
          </div>
          <div className="grid-3">
            <div className="card value-card">
              <Shield size={36} className="value-icon" />
              <h4>{settings.about_value_1_title}</h4>
              <p>{settings.about_value_1_desc}</p>
            </div>
            <div className="card value-card">
              <Users size={36} className="value-icon" />
              <h4>{settings.about_value_2_title}</h4>
              <p>{settings.about_value_2_desc}</p>
            </div>
            <div className="card value-card">
              <Heart size={36} className="value-icon" />
              <h4>{settings.about_value_3_title}</h4>
              <p>{settings.about_value_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding about-cta" style={{ backgroundColor: 'var(--primary-light)' }}>
        <div className="container about-cta-container">
          <h2>{settings.about_cta_title}</h2>
          <p>{settings.about_cta_desc}</p>
          <Link href="/lien-he" className="btn btn-primary">
            <span>{settings.about_cta_btn}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
