'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';

export default function SubPortalNavbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);

  // Group provinces by region
  const regions = [
    {
      id: 'dong-bang-song-hong',
      name: 'Đồng bằng sông Hồng',
      provinces: provincesData.filter(p => p.regionSlug === 'dong-bang-song-hong')
    },
    {
      id: 'trung-du-mien-nui-phia-bac',
      name: 'Trung du & miền núi phía Bắc',
      provinces: provincesData.filter(p => p.regionSlug === 'trung-du-mien-nui-phia-bac')
    },
    {
      id: 'bac-trung-bo',
      name: 'Bắc Trung Bộ',
      provinces: provincesData.filter(p => p.regionSlug === 'bac-trung-bo')
    },
    {
      id: 'duyen-hai-nam-trung-bo',
      name: 'Duyên hải Nam Trung Bộ',
      provinces: provincesData.filter(p => p.regionSlug === 'duyen-hai-nam-trung-bo')
    },
    {
      id: 'dong-nam-bo',
      name: 'Đông Nam Bộ & Tây Nguyên',
      provinces: provincesData.filter(p => p.regionSlug === 'dong-nam-bo' || p.regionSlug === 'tay-nguyen')
    },
    {
      id: 'dong-bang-song-cuu-long',
      name: 'Đồng bằng sông Cửu Long',
      provinces: provincesData.filter(p => p.regionSlug === 'dong-bang-song-cuu-long')
    }
  ];

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smart Auto-Hide on scroll down, Reveal on scroll up
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 15);

      // Always show when near the very top of page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else {
        const delta = currentScrollY - lastScrollYRef.current;
        if (delta > 8) {
          // Scrolling down -> hide navbar
          setIsVisible(false);
          setIsMegaMenuOpen(false);
        } else if (delta < -6) {
          // Scrolling up -> reveal navbar
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tinh-thanh/tra-cuu-sap-nhap?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`tt-navbar ${isVisible ? 'tt-nav-visible' : 'tt-nav-hidden'} ${isScrolled ? 'tt-nav-scrolled' : ''}`}>
      <div className="tt-container">
        <div className="tt-nav-container">
          {/* Logo / Sub-portal Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="tt-mobile-menu-btn"
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <Link href="/tinh-thanh" className="tt-brand" title="ĐịaGiớiVN — Cổng Tra Cứu Địa Giới Hành Chính 2026">
              <div className="tt-brand-pin">
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="dgPinGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1e40af" />
                      <stop offset="1" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="dgGoldGrad" x1="16" y1="12" x2="32" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f59e0b" />
                      <stop offset="1" stopColor="#d97706" />
                    </linearGradient>
                    <filter id="dgPinShadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1e3a8a" floodOpacity="0.25" />
                    </filter>
                  </defs>
                  <path
                    d="M24 4C14.0589 4 6 12.0589 6 22C6 32.5 21.5 43.2 23.1 44.3C23.65 44.68 24.35 44.68 24.9 44.3C26.5 43.2 42 32.5 42 22C42 12.0589 33.9411 4 24 4Z"
                    fill="url(#dgPinGrad)"
                    filter="url(#dgPinShadow)"
                  />
                  <circle cx="24" cy="20" r="13" fill="#ffffff" fillOpacity="0.12" stroke="url(#dgGoldGrad)" strokeWidth="1.5" />
                  <path
                    d="M22 11C23 11 25.5 12 26 13.5C26.5 15 25 16 23.5 17C21.8 18.2 22.2 19.5 23 20.8C23.8 22 25.8 23 25.5 25C25.2 27 23.8 28.5 22 29.5"
                    stroke="url(#dgGoldGrad)"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="27.5" cy="19.5" r="1.2" fill="#fbbf24" />
                  <circle cx="26.8" cy="24.8" r="1.2" fill="#fbbf24" />
                  <circle cx="24" cy="20" r="2.2" fill="#38bdf8" />
                </svg>
              </div>
              <div>
                <div className="tt-brand-text">
                  <span style={{ color: '#0f172a' }}>ĐịaGiới</span>
                  <span style={{ color: '#d97706', marginLeft: '1px' }}>VN</span>
                </div>
                <span style={{ display: 'block', fontSize: '10px', color: '#64748b', fontWeight: '700', letterSpacing: '0.4px', lineHeight: 1.1 }}>
                  CỔNG TRA CỨU ĐỊA GIỚI 2026
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="tt-nav-links">
            <Link href="/tinh-thanh/tra-cuu-sap-nhap" className="tt-nav-item tt-nav-item-highlight-green">
              Tra Cứu Sáp Nhập
            </Link>

            {/* Mega Dropdown: 34 Tỉnh Thành Mới */}
            <div style={{ position: 'relative' }} ref={megaMenuRef}>
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isMegaMenuOpen ? '#ea580c' : '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>34 Tỉnh Thành Mới</span>
                <span style={{ fontSize: '10px', transform: isMegaMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {isMegaMenuOpen && (
                <div
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-100px',
                    width: '800px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                    padding: '20px',
                    zIndex: 200
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '16px' }}>
                    <strong style={{ fontSize: '13px', color: '#ea580c', textTransform: 'uppercase' }}>
                      Danh Mục 34 Tỉnh Thành Theo 6 Vùng Kinh Tế
                    </strong>
                    <Link
                      href="/tinh-thanh/34-tinh-thanh"
                      onClick={() => setIsMegaMenuOpen(false)}
                      style={{ fontSize: '12px', color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}
                    >
                      Xem toàn quốc →
                    </Link>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxHeight: '420px', overflowY: 'auto' }}>
                    {regions.map(r => (
                      <div key={r.id}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '6px' }}>
                          {r.name}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
                          {r.provinces.map(p => (
                            <li key={p.slug} style={{ margin: '4px 0' }}>
                              <Link
                                href={`/tinh-thanh/province/${p.slug}`}
                                onClick={() => setIsMegaMenuOpen(false)}
                                style={{ color: '#475569', textDecoration: 'none' }}
                              >
                                {p.name.replace('Thành phố ', 'TP. ').replace('Tỉnh ', '')}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/tinh-thanh/tinh-thanh-cu" className="tt-nav-item">
              63 Tỉnh Thành Cũ
            </Link>

            <Link href="/tinh-thanh/tra-cuu-ma-buu-chinh" className="tt-nav-item tt-nav-item-highlight-orange">
              Mã Bưu Chính
            </Link>
          </nav>

          {/* Search Box on Navbar */}
          <form onSubmit={handleHeaderSearch} className="tt-nav-search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập Tên phường xã, tên tỉnh..."
              className="tt-nav-search-input"
            />
            <button type="submit" className="tt-nav-search-btn" aria-label="Tìm kiếm">
              🔍
            </button>
          </form>


        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '290px',
              backgroundColor: '#ffffff',
              height: '100%',
              padding: '20px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="26" height="26" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 4C14.0589 4 6 12.0589 6 22C6 32.5 21.5 43.2 23.1 44.3C23.65 44.68 24.35 44.68 24.9 44.3C26.5 43.2 42 32.5 42 22C42 12.0589 33.9411 4 24 4Z"
                    fill="#1e40af"
                  />
                  <circle cx="24" cy="20" r="13" fill="#ffffff" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
                  <path
                    d="M22 11C23 11 25.5 12 26 13.5C26.5 15 25 16 23.5 17C21.8 18.2 22.2 19.5 23 20.8C23.8 22 25.8 23 25.5 25C25.2 27 23.8 28.5 22 29.5"
                    stroke="#f59e0b"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <strong style={{ fontSize: '18px', display: 'flex', alignItems: 'baseline' }}>
                  <span style={{ color: '#0f172a' }}>ĐịaGiới</span>
                  <span style={{ color: '#d97706', marginLeft: '1px' }}>VN</span>
                </strong>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleHeaderSearch} style={{ marginBottom: '16px', display: 'flex' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm xã, phường..."
                style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px 0 0 6px', fontSize: '13px' }}
              />
              <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '0 6px 6px 0' }}>🔍</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', fontWeight: '600' }}>
              <Link href="/tinh-thanh" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#1e293b', textDecoration: 'none' }}>🏠 Trang chủ tra cứu</Link>
              <Link href="/tinh-thanh/tra-cuu-sap-nhap" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#16a34a', textDecoration: 'none' }}>🔍 Tra Cứu Sáp Nhập</Link>
              <Link href="/tinh-thanh/34-tinh-thanh" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#1e293b', textDecoration: 'none' }}>📍 34 Tỉnh Thành Mới</Link>
              <Link href="/tinh-thanh/tinh-thanh-cu" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#1e293b', textDecoration: 'none' }}>🏛️ 63 Tỉnh Thành Cũ</Link>
              <Link href="/tinh-thanh/tra-cuu-ma-buu-chinh" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#ea580c', textDecoration: 'none' }}>📮 Mã Bưu Chính</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
