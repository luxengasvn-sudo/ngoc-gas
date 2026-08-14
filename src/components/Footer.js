'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { trackClick } from '@/lib/analytics';

export default function Footer({ initialSettings }) {
  const [settings, setSettings] = useState(() => {
    const init = initialSettings || {};
    return {
      logo_url: init.logo_url || '',
      address: init.address || '7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương',
      phone: init.phone || '19009396',
      email: init.email || 'contact@ngocgas.com',
      working_hours: init.working_hours || '06:00 - 22:00 (Thứ 2 - Chủ nhật)',
      footer_copyright: init.footer_copyright || `© ${new Date().getFullYear()} NGỌC GAS. Tất cả quyền được bảo lưu.`,
      social_facebook: init.social_facebook || '',
      social_zalo: init.social_zalo || '',
      social_youtube: init.social_youtube || '',
      social_tiktok: init.social_tiktok || ''
    };
  });

  useEffect(() => {
    if (initialSettings) {
      setSettings(prev => ({
        ...prev,
        ...initialSettings
      }));
    }

    const fetchFooterSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.data) {
          setSettings(prev => ({
            ...prev,
            ...data.data
          }));
        }
      } catch (e) {
        console.error('Error fetching footer settings:', e);
      }
    };

    fetchFooterSettings();
  }, [initialSettings]);

  const cleanPhone = settings.phone.replace(/\./g, '').trim();

  return (
    <>
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Ngọc Gas Logo" className="logo-img" />
              ) : (
                <Flame className="footer-logo-icon" size={32} />
              )}
              <div className="logo-text">
                <span className="brand-name">NGỌC</span>
                <span className="brand-sub">GAS</span>
              </div>
            </Link>
            <p className="footer-desc">
              {settings.footer_desc || settings.slogan || 'NGỌC GAS là đơn vị uy tín chuyên cung cấp các giải pháp năng lượng gas an toàn, chất lượng và tiết kiệm tại TP. HCM & Bình Dương.'}
            </p>

            {/* Social Links List */}
            {(settings.social_facebook || settings.social_zalo || settings.social_youtube || settings.social_tiktok) && (
              <div className="footer-social-links-new">
                {settings.social_facebook && (
                  <a 
                    href={settings.social_facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-btn-new fb"
                    title="Facebook Ngọc Gas"
                    onClick={() => trackClick('social_click', 'Facebook: ' + settings.social_facebook)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3 0-4 2-4 4v3z"/>
                    </svg>
                  </a>
                )}
                {settings.social_zalo && (
                  <a 
                    href={settings.social_zalo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-btn-new zalo"
                    title="Zalo Chat Ngọc Gas"
                    onClick={() => trackClick('social_click', 'Zalo: ' + settings.social_zalo)}
                  >
                    <span className="zalo-text-icon-new">Zalo</span>
                  </a>
                )}
                {settings.social_youtube && (
                  <a 
                    href={settings.social_youtube} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-btn-new yt"
                    title="YouTube Ngọc Gas"
                    onClick={() => trackClick('social_click', 'YouTube: ' + settings.social_youtube)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {settings.social_tiktok && (
                  <a 
                    href={settings.social_tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-btn-new tt"
                    title="TikTok Ngọc Gas"
                    onClick={() => trackClick('social_click', 'TikTok: ' + settings.social_tiktok)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="footer-col links-col">
            <h4 className="footer-title">Về Chúng Tôi</h4>
            <ul className="footer-links">
              <li><Link href="/gioi-thieu">Giới thiệu công ty</Link></li>
              <li><Link href="/san-pham">Sản phẩm gas chính hãng</Link></li>
              <li><Link href="/gia-gas-hom-nay">Bảng giá gas hôm nay</Link></li>
              <li><Link href="/cua-hang">Hệ thống cửa hàng</Link></li>
              <li><Link href="/tin-tuc">Tin tức &amp; Khuyến mãi</Link></li>
              <li><Link href="/lien-he">Liên hệ hỗ trợ</Link></li>
            </ul>
          </div>

          <div className="footer-col links-col">
            <h4 className="footer-title">Hỗ Trợ Khách Hàng</h4>
            <ul className="footer-links">
              <li><Link href="/tin-tuc/huong-dan-kiem-tra-ro-ri-gas">Cẩm nang an toàn gas</Link></li>
              <li><Link href="/tin-tuc">Chính sách bảo hành bình</Link></li>
              <li><Link href="/lien-he">Quy trình giao nhận &amp; Cân gas</Link></li>
              <li><Link href="/lien-he">Hỗ trợ sự cố khẩn cấp 24/7</Link></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-title">Thông Tin Liên Hệ</h4>
            <ul className="footer-contact-info">
              <li>
                <MapPin size={18} className="info-icon" />
                <span>{settings.address}</span>
              </li>
              <li>
                <Phone size={18} className="info-icon" />
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="contact-link"
                  onClick={() => trackClick('hotline_call', 'Footer: ' + cleanPhone)}
                >
                  {settings.phone}
                </a>
              </li>
              <li>
                <Mail size={18} className="info-icon" />
                <a href={`mailto:${settings.email}`} className="contact-link">{settings.email}</a>
              </li>
              <li>
                <Clock size={18} className="info-icon" />
                <span>{settings.working_hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-container">
            <p className="copyright">
              {settings.footer_copyright}
            </p>
            <p className="designed-by">
              {settings.footer_slogan || 'Năng lượng xanh - An tâm cho mọi nhà'}
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .footer {
          background-color: var(--header-bg);
          color: var(--header-text);
          padding-top: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.1fr 1.5fr;
          gap: 40px;
          padding-bottom: 40px;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 600px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-img {
          height: 44px;
          width: auto;
          object-fit: contain;
        }

        .footer-logo-icon {
          color: var(--primary);
          filter: drop-shadow(0 0 8px rgba(245, 183, 49, 0.6));
        }

        .footer-desc {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          font-size: 14.5px;
        }

        .footer-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #FFFFFF;
          position: relative;
          padding-bottom: 8px;
          margin-bottom: 4px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 36px;
          height: 2px;
          background-color: var(--primary);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14.5px;
          transition: all 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--primary);
          padding-left: 4px;
        }

        .footer-contact-info {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-contact-info li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 14px;
          line-height: 1.5;
        }

        .contact-link {
          color: rgba(255, 255, 255, 0.75);
          transition: color 0.2s ease;
        }

        .contact-link:hover {
          color: var(--primary);
        }

        .info-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .footer-bottom {
          background-color: #111111;
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 600px) {
          .footer-bottom-container {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }

        /* Footer Social Media Styles */
        .footer-social-links-new {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          align-items: center;
        }

        .social-icon-btn-new {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          transition: var(--transition);
          text-decoration: none;
        }

        .social-icon-btn-new:hover {
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .social-icon-btn-new.fb:hover {
          background-color: #1877F2;
        }

        .social-icon-btn-new.zalo {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .social-icon-btn-new.zalo:hover {
          background-color: #0068FF;
        }

        .social-icon-btn-new.yt:hover {
          background-color: #FF0000;
        }

        .social-icon-btn-new.tt:hover {
          background-color: #010101;
        }

        .zalo-text-icon-new {
          font-family: var(--font-inter), sans-serif;
          letter-spacing: -0.5px;
        }
      `}</style>
    </>
  );
}
