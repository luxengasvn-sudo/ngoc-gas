'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Users, BookOpen, Store, TrendingUp, Phone, MessageSquare, Flame, MapPin, Sparkles } from 'lucide-react';

const DEFAULT_MOBILE_BOTTOM_NAV = [
  { id: "b1", name: 'Trang chủ', path: '/', icon: 'Home', is_active: true },
  { id: "b2", name: 'Sản phẩm', path: '/san-pham', icon: 'ShoppingBag', is_active: true },
  { id: "b3", name: 'Cửa hàng', path: '/cua-hang', icon: 'Store', is_active: true },
  { id: "b4", name: 'Giá gas', path: '/gia-gas-hom-nay', icon: 'TrendingUp', is_active: true },
  { id: "b5", name: 'Tin tức', path: '/tin-tuc', icon: 'BookOpen', is_active: false },
  { id: "b6", name: 'Giới thiệu', path: '/gioi-thieu', icon: 'Users', is_active: false }
];

export default function BottomNav({ initialSettings }) {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState(() => {
    let items = DEFAULT_MOBILE_BOTTOM_NAV;
    try {
      if (initialSettings && initialSettings.mobile_bottom_menu_items) {
        const parsed = typeof initialSettings.mobile_bottom_menu_items === 'string' 
          ? JSON.parse(initialSettings.mobile_bottom_menu_items) 
          : initialSettings.mobile_bottom_menu_items;
        if (Array.isArray(parsed) && parsed.length > 0) {
          items = parsed;
        }
      }
    } catch (e) {}
    return items.filter(item => item && item.is_active !== false);
  });

  useEffect(() => {
    const fetchBottomNav = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.data && data.data.mobile_bottom_menu_items) {
          const parsed = typeof data.data.mobile_bottom_menu_items === 'string'
            ? JSON.parse(data.data.mobile_bottom_menu_items)
            : data.data.mobile_bottom_menu_items;
          if (Array.isArray(parsed) && parsed.length > 0) {
            setNavItems(parsed.filter(item => item && item.is_active !== false));
          }
        }
      } catch (e) {}
    };

    fetchBottomNav();
  }, []);

  const renderNavIcon = (iconName) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag size={20} />;
      case 'Store': return <Store size={20} />;
      case 'TrendingUp': return <TrendingUp size={20} />;
      case 'Users': return <Users size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      case 'Phone': return <Phone size={20} />;
      case 'MessageSquare': return <MessageSquare size={20} />;
      case 'Flame': return <Flame size={20} />;
      case 'MapPin': return <MapPin size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Home':
      default:
        return <Home size={20} />;
    }
  };

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  if (!navItems || navItems.length === 0) return null;

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item, idx) => (
          <Link
            key={item.id || item.path || idx}
            href={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <div className="bottom-nav-icon">{renderNavIcon(item.icon)}</div>
            <span className="bottom-nav-label">{item.name}</span>
          </Link>
        ))}
      </nav>

      <style jsx global>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 62px;
          background: rgba(12, 96, 105, 0.96);
          backdrop-filter: blur(15px);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 2000;
          box-shadow: 0 -4px 20px rgba(12, 96, 105, 0.35);
          padding: 0 4px;
        }

        /* Hide on desktop screens */
        @media (min-width: 1024px) {
          .bottom-nav {
            display: none;
          }
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          flex: 1;
          height: 100%;
          gap: 3px;
          transition: var(--transition);
          min-width: 0;
        }

        .bottom-nav-item.active {
          color: var(--primary); /* Gold Gold */
        }

        .bottom-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .bottom-nav-item.active .bottom-nav-icon {
          transform: translateY(-2px);
        }

        .bottom-nav-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          padding: 0 2px;
        }
      `}</style>
    </>
  );
}
