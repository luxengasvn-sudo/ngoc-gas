'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const token = localStorage.getItem('ngoc_gas_admin_token');
    
    if (!token && !isLoginPage) {
      router.push('/admin/login');
    } else if (token && isLoginPage) {
      router.push('/admin');
    } else {
      setIsAuthenticated(!!token);
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
