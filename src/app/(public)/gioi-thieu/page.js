import { getAllSettings } from '@/lib/settingsHelper';
import Link from 'next/link';
import { Flame, Shield, Users, Heart, Award, ArrowRight, MapPin, ExternalLink } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata() {
  const settings = await getAllSettings();
  const brandName = settings.site_name || settings.company_name || 'Ngọc Gas';
  return {
    title: settings.about_hero_title || 'Giới Thiệu Về Chúng Tôi',
    description: settings.about_hero_desc || `Tìm hiểu về lịch sử hình thành, tầm nhìn, sứ mệnh và giá trị cốt lõi của ${brandName} - Nhà cung cấp gas uy tín tại Dĩ An, Bình Dương & TP.HCM.`,
  };
}

export default async function AboutPage() {
  let settings = {
    about_hero_title: 'Về Ngọc Gas',
    about_hero_desc: 'Hành trình xây dựng thương hiệu gas uy tín, an toàn và tận tâm tại TP. HCM & Bình Dương.',
    about_history_title: 'Lịch Sử Hình Thành',
    about_history: 'Ngọc Gas được thành lập từ những năm đầu khi TP. HCM bắt đầu phát triển mạnh mẽ về hạ tầng và dịch vụ. Trải qua hơn 10 năm hoạt động và phát triển, chúng tôi tự hào là đơn vị cung cấp gas uy tín và hệ thống gas công nghiệp đạt chuẩn an toàn phòng cháy chữa cháy tại TP. HCM & Bình Dương.',
    about_intro_partner_title: 'Đối tác năng lượng',
    about_intro_partner_desc: 'Chúng tôi là đối tác tin cậy cung cấp hệ thống gas công nghiệp cho hàng trăm nhà hàng, khách sạn lớn tại TP. HCM & Bình Dương.',
    about_vision_title: 'Tầm Nhìn',
    about_vision: 'Trở thành thương hiệu cung cấp sản phẩm gas và giải pháp thi công hệ thống gas uy tín tại TP. HCM & Bình Dương, được khách hàng tin tưởng lựa chọn nhờ sự uy tín, chuyên nghiệp và tiêu chuẩn an toàn cao nhất.',
    about_mission_title: 'Sứ Mệnh',
    about_mission: 'Cung cấp giải pháp năng lượng hiệu quả, sạch và an toàn cho cộng đồng. Góp phần vào sự phát triển bền vững của TP. HCM & Bình Dương bằng cách nâng cao tiêu chuẩn an toàn sử dụng gas trong sinh hoạt và sản xuất kinh doanh.',
    about_value_title: 'Giá Trị Cốt Lõi',
    about_value_subtitle: 'Những nguyên tắc định hướng cho mọi hành động và dịch vụ của chúng tôi.',
    about_value_1_title: 'An Toàn',
    about_value_1_desc: 'Là ưu tiên số một trong mọi hoạt động của công ty. An toàn cho nhân viên, cho khách hàng và cho cộng đồng.',
    about_value_2_title: 'Tận Tâm',
    about_value_2_desc: 'Luôn đặt lợi ích và sự an tâm của khách hàng lên vị trí ưu tiên. Phục vụ chu đáo, hỗ trợ kịp thời 24/7.',
    about_value_3_title: 'Chất Lượng',
    about_value_3_desc: 'Đảm bảo nguồn gas chính hãng từ các thương hiệu lớn như Sopet, Phoenix, Luxen Gas, đủ cân nặng, chất lượng ổn định.',
    about_cta_title: 'Đồng hành cùng sự phát triển của bạn',
    about_cta_desc: 'Hãy để Ngọc Gas mang đến giải pháp năng lượng tối ưu, an toàn nhất cho nhà bếp của bạn.',
    about_cta_btn: 'Liên hệ ngay với chúng tôi'
  };

  try {
    const fetchedSettings = await getAllSettings();
    settings = { ...settings, ...fetchedSettings };
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

      {/* Official Branches & Entity Verification */}
      <section className="section-padding branches-entity-section" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Hệ Thống Điểm Giao Gas &amp; Hồ Sơ Định Danh Doanh Nghiệp</h2>
            <p className="section-subtitle">
              Ngọc Gas xây dựng hệ sinh thái số minh bạch, cam kết 100% bình gas chính hãng đủ ký, bảo hiểm PCCC và giao siêu tốc 15 phút tại Dĩ An &amp; Bình Dương.
            </p>
          </div>
          <div className="grid-3">
            <div className="card branch-card" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin className="text-primary" size={24} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Trụ Sở Chính Dĩ An</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                <strong>Địa chỉ:</strong> 7 Nguyễn Trung Trực, Phường Dĩ An, TP. Dĩ An, Tỉnh Bình Dương
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                <strong>Hotline:</strong> 1900 9396 (Hỗ trợ 24/7)
              </p>
              <a 
                href="https://www.google.com/maps/place/Ng%E1%BB%8Dc+Gas+-+Giao+gas+nhanh+ch%C3%ADnh+h%C3%A3ng+-+D%C4%A9+An/data=!4m2!3m1!1s0x0:0x87aafab9287822cc" 
                target="_blank" 
                rel="noopener noreferrer me" 
                className="btn btn-outline-primary"
                style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13.5px', padding: '8px 16px' }}
              >
                <span>Xem trên Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="card branch-card" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin className="text-primary" size={24} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Chi Nhánh Cây Da</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                <strong>Địa chỉ:</strong> 7/14 Đường Cây Da, Khu phố Tân Phú 1, Phường Tân Đông Hiệp, Dĩ An
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                <strong>Hotline:</strong> 1900 9396 (Giao nhanh 15 phút)
              </p>
              <a 
                href="https://www.google.com/maps/place/Ng%E1%BB%8Dc+Gas+-+Giao+gas+nhanh+ch%C3%ADnh+h%C3%A3ng+-+C%C3%A2y+Da/data=!4m2!3m1!1s0x0:0xdb05b7c2cd1d4cd9" 
                target="_blank" 
                rel="noopener noreferrer me" 
                className="btn btn-outline-primary"
                style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13.5px', padding: '8px 16px' }}
              >
                <span>Xem trên Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="card branch-card" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin className="text-primary" size={24} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Chi Nhánh KDC VietSing</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                <strong>Địa chỉ:</strong> Kiot 5, Đường D5, KDC VietSing, Phường An Phú, Thuận An
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                <strong>Hotline:</strong> 1900 9396 (Phục vụ KCN &amp; Hộ gia đình)
              </p>
              <a 
                href="https://www.google.com/maps/place/C%E1%BB%ADa+h%C3%A0ng+Ng%E1%BB%8Dc+Gas+-+%C4%90%C6%B0%E1%BB%9Dng+D5+An+Ph%C3%BA+(C%E1%BB%ADa+h%C3%A0ng+Gas+Vietsing+Visip)/data=!4m2!3m1!1s0x0:0x96898a80c390391a" 
                target="_blank" 
                rel="noopener noreferrer me" 
                className="btn btn-outline-primary"
                style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13.5px', padding: '8px 16px' }}
              >
                <span>Xem trên Google Maps</span>
                <ExternalLink size={14} />
              </a>
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
