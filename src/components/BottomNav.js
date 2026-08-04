'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flame, Users, BookOpen, Phone, Store } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Trang chủ', path: '/', icon: <Home size={20} /> },
    { name: 'Sản phẩm', path: '/san-pham', icon: <Flame size={20} /> },
    { name: 'Cửa hàng', path: '/cua-hang', icon: <Store size={20} /> },
    { name: 'Giới thiệu', path: '/gioi-thieu', icon: <Users size={20} /> },
    { name: 'Tin tức', path: '/tin-tuc', icon: <BookOpen size={20} /> },
    { name: 'Liên hệ', path: '/lien-he', icon: <Phone size={20} /> },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <div className="bottom-nav-icon">{item.icon}</div>
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
          height: 65px;
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(15px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 2000;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
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
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          flex: 1;
          height: 100%;
          gap: 4px;
          transition: var(--transition);
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
          letter-spacing: 0.2px;
        }
        
        /* Add padding-bottom to the main body on mobile so footer/content is not blocked by bottom nav */
        @media (max-width: 1023px) {
          body {
            padding-bottom: 65px !important;
          }
        }
      `}</style>
    </>
  );
}
