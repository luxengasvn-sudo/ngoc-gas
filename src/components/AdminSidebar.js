'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, FileText, Mail, Settings, LogOut, Flame, Store, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState('Quản trị viên');
  const [userRole, setUserRole] = useState('admin');

  useEffect(() => {
    const userStr = localStorage.getItem('ngoc_gas_admin_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.display_name) {
          setAdminName(user.display_name);
        }
        if (user && user.role) {
          setUserRole(user.role);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ngoc_gas_admin_token');
    localStorage.removeItem('ngoc_gas_admin_user');
    router.push('/admin/login');
  };

  const allMenuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, roles: ['admin', 'editor', 'sales'] },
    { name: 'Sản phẩm', path: '/admin/san-pham', icon: <ShoppingBag size={20} />, roles: ['admin', 'editor'] },
    { name: 'Bảng Giá Gas', path: '/admin/gia-gas', icon: <Flame size={20} />, roles: ['admin', 'editor', 'sales'] },
    { name: 'Bài viết', path: '/admin/bai-viet', icon: <FileText size={20} />, roles: ['admin', 'editor'] },
    { name: 'Cửa hàng', path: '/admin/cua-hang', icon: <Store size={20} />, roles: ['admin', 'sales'] },
    { name: 'Liên hệ', path: '/admin/lien-he', icon: <Mail size={20} />, roles: ['admin', 'sales'] },
    { name: 'Tài khoản', path: '/admin/tai-khoan', icon: <Users size={20} />, roles: ['admin'] },
    { name: 'Cài đặt', path: '/admin/cai-dat', icon: <Settings size={20} />, roles: ['admin'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  const isActive = (path) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return '👑 Quản trị viên';
      case 'editor':
        return '✍️ Biên tập viên';
      case 'sales':
        return '📞 Kinh doanh';
      default:
        return 'Thành viên';
    }
  };

  const [clearingCache, setClearingCache] = useState(false);
  const [cacheNotice, setCacheNotice] = useState(null);

  const handleClearCache = async () => {
    try {
      setClearingCache(true);
      const token = localStorage.getItem('ngoc_gas_admin_token');
      const res = await fetch('/api/cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ category: 'all' })
      });
      const data = await res.json();
      if (data.success) {
        setCacheNotice('Đã làm mới Cache thành công!');
        setTimeout(() => setCacheNotice(null), 3000);
      }
    } catch (e) {
      setCacheNotice('Lỗi khi xóa cache');
      setTimeout(() => setCacheNotice(null), 3000);
    } finally {
      setClearingCache(false);
    }
  };

  return (
    <>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Flame className="sidebar-logo-icon" size={24} />
          <div className="logo-text">
            <span className="brand-name">NGỌC</span>
            <span className="brand-sub">ADMIN</span>
          </div>
        </div>

        <div className="admin-profile">
          <div className="avatar">{adminName.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <span className="profile-name">{adminName}</span>
            <span className="profile-role">{getRoleLabel(userRole)}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {cacheNotice && (
            <div style={{
              padding: '8px 12px',
              backgroundColor: '#16A34A',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '8px'
            }}>
              {cacheNotice}
            </div>
          )}

          <button
            onClick={handleClearCache}
            disabled={clearingCache}
            className="logout-btn"
            style={{ color: '#F59E0B', marginBottom: '4px' }}
            title="Làm mới bộ nhớ đệm và dữ liệu website"
          >
            <span style={{ fontSize: '16px' }}>⚡</span>
            <span>{clearingCache ? 'Đang xóa...' : 'Làm mới Cache'}</span>
          </button>

          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <style jsx global>{`
        .admin-sidebar {
          width: 250px;
          height: 100vh;
          background-color: #1A1A1A;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar-logo-icon {
          color: var(--primary);
        }

        .admin-profile {
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary);
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-weight: 600;
          font-size: 14px;
        }

        .profile-role {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .sidebar-nav {
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.7);
          border-radius: var(--radius-sm);
          font-weight: 500;
          font-size: 15px;
        }

        .sidebar-link:hover {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .sidebar-link.active {
          background-color: var(--primary);
          color: #111111;
        }

        .sidebar-footer {
          padding: 20px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          border-radius: var(--radius-sm);
        }

        .logout-btn:hover {
          color: var(--error);
          background-color: rgba(220, 38, 38, 0.1);
        }
      `}</style>
    </>
  );
}
