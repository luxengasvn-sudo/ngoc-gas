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
      address: init.address || 'Đường Song Hành, Quận 12, TP. Hồ Chí Minh (Bình Dương cũ)',
      phone: init.phone || '19009396',
      email: init.email || 'contact@ngocgas.com',
      working_hours: init.working_hours || '06:00 - 22:00 (Thứ 2 - Chủ nhật)',
      footer_copyright: init.footer_copyright || '© 2024 NGỌC GAS. Tất cả quyền được bảo lưu.',
      social_facebook: init.social_facebook || '',
      social_zalo: init.social_zalo || '',
      social_youtube: init.social_youtube || '',
      social_tiktok: init.social_tiktok || ''
    };
  });

  useEffect(() => {
    if (!initialSettings) {
      const fetchFooterSettings = async () => {
        try {
          const res = await fetch('/api/settings');
          const data = await res.json();
          if (data.success && data.data) {
            setSettings(prev => ({
              ...prev,
              logo_url: data.data.logo_url || prev.logo_url,
              address: data.data.address || prev.address,
              phone: data.data.phone || prev.phone,
              email: data.data.email || prev.email,
              working_hours: data.data.working_hours || prev.working_hours,
              footer_copyright: data.data.footer_copyright || prev.footer_copyright,
              social_facebook: data.data.social_facebook || '',
              social_zalo: data.data.social_zalo || '',
              social_youtube: data.data.social_youtube || '',
              social_tiktok: data.data.social_tiktok || ''
            }));
          }
        } catch (e) {
          console.error('Error fetching footer settings:', e);
        }
      };

      fetchFooterSettings();
    }
  }, [initialSettings]);

  const cleanPhone = settings.phone.replace(/\./g, '').trim();

  return (
    <>
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col brand-col">
            <Link href="/" className="footer-logo">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Đảo Ngọc Gas Logo" className="logo-img" />
              ) : (
                <Flame className="footer-logo-icon" size={32} />
              )}
              <div className="logo-text">
                <span className="brand-name">NGỌC</span>
                <span className="brand-sub">GAS</span>
              </div>
            </Link>
            <p className="footer-desc">
              NGỌC GAS là đơn vị uy tín chuyên cung cấp các giải pháp năng lượng gas an toàn, chất lượng và tiết kiệm tại TP. HCM & Bình Dương.
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
                    title="Kênh YouTube Ngọc Gas"
                    onClick={() => trackClick('social_click', 'YouTube: ' + settings.social_youtube)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.54 12 3.54 12 3.54s-7.522 0-9.388.515a3.003 3.003 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.866.515 9.388.515 9.388.515s7.522 0 9.388-.515a3.003 3.003 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {settings.social_tiktok && (
                  <a 
                    href={settings.social_tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-btn-new tt"
                    title="Kênh TikTok Ngọc Gas"
                    onClick={() => trackClick('social_click', 'TikTok: ' + settings.social_tiktok)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.85.98 2.02 1.7 3.32 2.05v3.91c-1.21-.14-2.39-.58-3.41-1.27-.79-.53-1.46-1.23-1.97-2.04v7.4c-.03 1.52-.45 3.03-1.25 4.31-.79 1.15-1.92 2.06-3.21 2.63-1.54.67-3.28.84-4.92.48-1.54-.34-2.98-1.18-4.04-2.39a9.58 9.58 0 0 1-2.12-4.52c-.41-1.92-.09-3.96.91-5.69a9.7 9.7 0 0 1 3.66-3.8c1.32-.78 2.82-1.21 4.37-1.23.01 1.25 0 2.5 0 3.75-.82-.01-1.65.17-2.4.53-.78.37-1.43.98-1.85 1.74-.53.94-.65 2.07-.33 3.11.26.85.79 1.6 1.48 2.14a4.98 4.98 0 0 0 3.39.95c1.02-.07 1.99-.54 2.67-1.31.7-.8 1.05-1.85 1.01-2.9v-13.4z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="footer-col links-col">
            <h3 className="footer-title">Liên kết nhanh</h3>
            <ul className="footer-links">
              <li><Link href="/">Trang chủ</Link></li>
              <li><Link href="/gioi-thieu">Giới thiệu</Link></li>
              <li><Link href="/san-pham">Sản phẩm</Link></li>
              <li><Link href="/cua-hang">Cửa hàng</Link></li>
              <li><Link href="/tin-tuc">Tin tức & Khuyến mãi</Link></li>
              <li><Link href="/lien-he">Liên hệ</Link></li>
            </ul>
          </div>

          <div className="footer-col info-col">
            <h3 className="footer-title">Liên hệ</h3>
            <ul className="footer-info-list">
              <li>
                <MapPin size={18} className="info-icon" />
                <span>{settings.address}</span>
              </li>
              <li>
                <Phone size={18} className="info-icon" />
                <a href={`tel:${cleanPhone}`}>{settings.phone}</a>
              </li>
              <li>
                <Mail size={18} className="info-icon" />
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
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
              Năng lượng xanh - An tâm cho mọi nhà
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
          grid-template-columns: 2fr 1fr 2fr;
          gap: 50px;
          padding-bottom: 40px;
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          .brand-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .brand-col {
            grid-column: span 1;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
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
          font-size: 15px;
        }

        .footer-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #FFFFFF;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
        }

        .footer-links a:hover {
          color: var(--primary);
          padding-left: 5px;
        }

        .footer-info-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-info-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          line-height: 1.4;
        }

        .footer-info-list a {
          color: rgba(255, 255, 255, 0.7);
        }

        .footer-info-list a:hover {
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
