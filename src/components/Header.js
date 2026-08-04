'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Flame } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

export default function Header({ initialSettings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const init = initialSettings || {};
    return {
      phone: init.phone || '19009396',
      logo_url: init.logo_url || '',
      promo_type: init.promo_type || 'none', // none | bar | popup
      promo_bar_text: init.promo_bar_text || '',
      promo_popup_image: init.promo_popup_image || '',
      promo_popup_link: init.promo_popup_link || ''
    };
  });
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  const hasPromo = settings.promo_type === 'bar' && settings.promo_bar_text;

  useEffect(() => {
    if (hasPromo) {
      document.body.classList.add('has-promo-bar');
    } else {
      document.body.classList.remove('has-promo-bar');
    }
    return () => {
      document.body.classList.remove('has-promo-bar');
    };
  }, [hasPromo]);

  useEffect(() => {
    if (settings.promo_type === 'popup' && settings.promo_popup_image) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [settings.promo_type, settings.promo_popup_image]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    if (!initialSettings) {
      const fetchHeaderSettings = async () => {
        try {
          const res = await fetch('/api/settings');
          const data = await res.json();
          if (data.success && data.data) {
            setSettings({
              phone: data.data.phone || '19009396',
              logo_url: data.data.logo_url || '',
              promo_type: data.data.promo_type || 'none',
              promo_bar_text: data.data.promo_bar_text || '',
              promo_popup_image: data.data.promo_popup_image || '',
              promo_popup_link: data.data.promo_popup_link || ''
            });
          }
        } catch (e) {
          console.error('Error loading header settings:', e);
        }
      };
      fetchHeaderSettings();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialSettings]);

  useEffect(() => {
    let autoCloseTimer;
    if (showPopup) {
      autoCloseTimer = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Auto close after 5 seconds
    }
    return () => clearTimeout(autoCloseTimer);
  }, [showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Sản phẩm', path: '/san-pham' },
    { name: 'Cửa hàng', path: '/cua-hang' },
    { name: 'Tin tức', path: '/tin-tuc' },
    { name: 'Liên hệ', path: '/lien-he' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const cleanPhone = settings.phone.replace(/\./g, '').trim();
  const isHomepage = pathname === '/';

  return (
    <>
      {hasPromo && (
        <div className="promo-announcement-bar">
          <div className="promo-ticker-wrap">
            <div className="promo-ticker">
              <span className="promo-text">{settings.promo_bar_text}</span>
            </div>
          </div>
        </div>
      )}
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${!isHomepage ? 'solid-black' : ''} ${hasPromo ? 'has-promo-bar' : ''}`}>
        <div className="container header-container">
          <Link href="/" className="logo">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Ngọc Gas Logo" className="logo-img" />
            ) : (
              <Flame className="logo-icon" size={32} />
            )}
            <div className="logo-text">
              <span className="brand-name">NGỌC</span>
              <span className="brand-sub">GAS</span>
            </div>
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a href={`tel:${cleanPhone}`} className="hotline-btn" onClick={() => trackClick('hotline_click', settings.phone)}>
              <Phone size={18} />
              <span>{settings.phone}</span>
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <Link href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Ngọc Gas Logo" className="logo-img" />
              ) : (
                <Flame className="logo-icon" size={32} />
              )}
              <div className="logo-text">
                <span className="brand-name" style={{ color: '#FFFFFF' }}>NGỌC</span>
                <span className="brand-sub">GAS</span>
              </div>
            </Link>
            <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a href={`tel:${cleanPhone}`} className="mobile-hotline-btn" onClick={() => { trackClick('hotline_click', settings.phone); setIsMobileMenuOpen(false); }}>
              <Phone size={18} />
              <span>Gọi ngay: {settings.phone}</span>
            </a>
          </nav>
        </div>
      </div>

      {showPopup && settings.promo_popup_image && (
        <div className="promo-popup-overlay" onClick={handleClosePopup}>
          <div className="promo-popup-content animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="promo-popup-close-btn" onClick={handleClosePopup}>
              <X size={20} />
            </button>
            {settings.promo_popup_link ? (
              <Link href={settings.promo_popup_link} onClick={handleClosePopup}>
                <img src={settings.promo_popup_image} alt="Khuyến mãi" className="promo-popup-img" />
              </Link>
            ) : (
              <img src={settings.promo_popup_image} alt="Khuyến mãi" className="promo-popup-img" />
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .promo-announcement-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 36px;
          background: linear-gradient(90deg, #facc15 0%, #eab308 100%);
          color: #111111;
          font-weight: 700;
          font-size: 13.5px;
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }

        .promo-ticker-wrap {
          overflow: hidden;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .promo-ticker {
          display: inline-block;
          white-space: nowrap;
          padding-left: 100%;
          animation: marquee 25s linear infinite;
        }

        .promo-text {
          padding-right: 50px;
        }

        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: var(--transition);
          height: 80px;
          display: flex;
          align-items: center;
        }

        .header.has-promo-bar {
          top: 36px;
        }

        .header.solid-black {
          background: #111111;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .header.scrolled {
          background: #111111;
          box-shadow: var(--shadow-md);
          height: 70px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-img {
          height: 44px;
          width: auto;
          object-fit: contain;
        }

        .logo-icon {
          color: var(--primary);
          filter: drop-shadow(0 0 8px rgba(245, 183, 49, 0.6));
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .brand-name {
          font-family: var(--font-inter), sans-serif;
          font-weight: 800;
          font-size: 20px;
          letter-spacing: 0.5px;
          color: #FFFFFF;
        }

        .brand-sub {
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--primary);
        }

        .desktop-nav {
          display: flex;
          gap: 30px;
        }

        .nav-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: var(--transition);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .hotline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--primary);
          color: #111111;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 14px;
        }

        .hotline-btn:hover {
          background-color: var(--primary-dark);
          box-shadow: 0 0 15px rgba(245, 183, 49, 0.4);
          transform: translateY(-1px);
        }

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
        }

        /* Mobile Menu */
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          transition: opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
        }

        .mobile-nav-overlay.open {
          right: 0;
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          max-width: 80%;
          height: 100%;
          background: #1a1a1a;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
          transform: translateX(100%);
        }

        .mobile-nav-overlay.open .mobile-nav-content {
          transform: translateX(0);
        }

        .mobile-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .mobile-nav-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--primary);
        }

        .mobile-hotline-btn {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: var(--primary);
          color: #111111;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: none;
          }
          .hotline-btn {
            display: none;
          }
        }

        .promo-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        }

        .promo-popup-content {
          position: relative;
          max-width: 500px;
          width: 90%;
          border-radius: 12px;
          overflow: hidden;
          background: transparent;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .promo-popup-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .promo-popup-close-btn:hover {
          background: rgba(0, 0, 0, 0.85);
          transform: scale(1.1);
        }

        .promo-popup-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: 12px;
        }

        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
