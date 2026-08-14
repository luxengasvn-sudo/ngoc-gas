'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const token = localStorage.getItem('ngoc_gas_admin_token');
    const userStr = localStorage.getItem('ngoc_gas_admin_user');
    
    if (!token && !isLoginPage) {
      router.push('/admin/login');
    } else if (token && isLoginPage) {
      router.push('/admin');
    } else {
      setIsAuthenticated(!!token);
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {}
      }
    }
    setLoading(false);
  }, [pathname, isLoginPage, router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)' }}>
        <p style={{ fontSize: '18px', fontWeight: '500' }}>Đang xác thực hệ thống...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Redirecting...
  }

  // Role permissions check for current path
  const userRole = currentUser?.role || 'admin';
  const rolePermissions = {
    '/admin/cai-dat': ['admin'],
    '/admin/tai-khoan': ['admin'],
    '/admin/cua-hang': ['admin', 'sales'],
    '/admin/lien-he': ['admin', 'sales'],
    '/admin/bai-viet': ['admin', 'editor'],
    '/admin/san-pham': ['admin', 'editor'],
    '/admin/gia-gas': ['admin', 'editor', 'sales'],
    '/admin': ['admin', 'editor', 'sales']
  };

  const isAllowed = Object.entries(rolePermissions).every(([routePrefix, allowedRoles]) => {
    if (pathname.startsWith(routePrefix)) {
      // Check if this route is restricted
      if (routePrefix === '/admin' && pathname !== '/admin') return true;
      return allowedRoles.includes(userRole);
    }
    return true;
  });

  if (!isAllowed) {
    return (
      <div className="admin-layout-container">
        <AdminSidebar />
        <main className="admin-main-content">
          <div style={{
            maxWidth: '560px',
            margin: '60px auto',
            padding: '40px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #FEE2E2',
            textAlign: 'center',
            boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.05)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#991B1B', margin: '0 0 8px 0' }}>
              Quyền Truy Cập Bị Giới Hạn
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6', margin: '0 0 24px 0' }}>
              Tài khoản của bạn với vai trò <strong>{userRole === 'editor' ? 'Biên tập viên' : userRole === 'sales' ? 'Nhân viên kinh doanh' : userRole}</strong> không được cấp quyền truy cập vào phân hệ này.
            </p>
            <button
              onClick={() => router.push('/admin')}
              style={{
                backgroundColor: '#1D70B8',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              Quay Về Trang Tổng Quan (Dashboard)
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout-container">
      <AdminSidebar />
      <main className="admin-main-content">
        {children}
      </main>

      <style jsx global>{`
        .admin-layout-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-surface);
        }

        .admin-main-content {
          flex-grow: 1;
          margin-left: 250px;
          padding: 40px;
          min-height: 100vh;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .admin-main-content {
            margin-left: 0;
            padding: 20px;
            padding-top: 80px; /* space for mobile toggle if any */
          }
        }
      `}</style>
    </div>
  );
}
