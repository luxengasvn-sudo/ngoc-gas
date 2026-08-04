'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, FileText, Mail, FolderHeart } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    posts: 0,
    contacts: 0,
    unreadContacts: 0,
    categories: 0
  });
  const [analytics, setAnalytics] = useState({ summary: [], daily: [] });
  const [activeAnalTab, setActiveAnalTab] = useState('calls');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('ngoc_gas_admin_token');
      if (!token) return;

      try {
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch products
        const resProd = await fetch('/api/products', { headers });
        const dataProd = await resProd.json();

        // Fetch posts
        const resPost = await fetch('/api/posts', { headers });
        const dataPost = await resPost.json();

        // Fetch contacts
        const resCont = await fetch('/api/contacts', { headers });
        const dataCont = await resCont.json();

        // Fetch categories
        const resCat = await fetch('/api/categories', { headers });
        const dataCat = await resCat.json();

        // Fetch analytics
        const resAnal = await fetch('/api/analytics', { headers });
        const dataAnal = await resAnal.json();
        let analData = { summary: [], daily: [] };
        if (dataAnal.success) {
          analData = {
            summary: dataAnal.summary || [],
            daily: dataAnal.daily || []
          };
        }

        if (dataProd.success && dataPost.success && dataCont.success && dataCat.success) {
          const unread = dataCont.data.filter(c => !c.is_read).length;
          setStats({
            products: dataProd.data.length,
            posts: dataPost.data.length,
            contacts: dataCont.data.length,
            unreadContacts: unread,
            categories: dataCat.data.length
          });
          setAnalytics(analData);
        } else {
          setError('Không thể tải một số dữ liệu thống kê');
        }
      } catch (err) {
        console.error(err);
        setError('Lỗi khi kết nối hệ thống.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="admin-loading"><p>Đang tải dữ liệu dashboard...</p></div>;
  }

  return (
    <>
      <div className="dashboard-page">
        <h1 className="admin-page-title">Tổng quan hệ thống</h1>
        
        {error && <div className="admin-error-banner">{error}</div>}

        <div className="grid-3 dashboard-stats-grid">
          <div className="card stat-card">
            <div className="stat-card-icon products">
              <ShoppingBag size={24} />
            </div>
            <div className="stat-card-info">
              <h3>{stats.products}</h3>
              <p>Sản phẩm hoạt động</p>
            </div>
            <Link href="/admin/san-pham" className="stat-card-link">Quản lý →</Link>
          </div>

          <div className="card stat-card">
            <div className="stat-card-icon posts">
              <FileText size={24} />
            </div>
            <div className="stat-card-info">
              <h3>{stats.posts}</h3>
              <p>Bài viết tin tức</p>
            </div>
            <Link href="/admin/bai-viet" className="stat-card-link">Quản lý →</Link>
          </div>

          <div className="card stat-card">
            <div className="stat-card-icon contacts">
              <Mail size={24} />
            </div>
            <div className="stat-card-info">
              <h3>{stats.unreadContacts} <span className="unread-badge">mới</span></h3>
              <p>Liên hệ chưa đọc ({stats.contacts} tổng số)</p>
            </div>
            <Link href="/admin/lien-he" className="stat-card-link">Xem thư →</Link>
          </div>
        </div>

        <div className="dashboard-welcome card">
          <h2>Chào mừng trở lại trang quản trị!</h2>
          <p>Tại đây bạn có thể cập nhật thông tin sản phẩm gas, soạn thảo tin tức hướng dẫn an toàn, xem thư liên hệ từ khách hàng, và thay đổi thông tin liên lạc hiển thị trên website.</p>
        </div>

        {/* Click Analytics Section */}
        <div className="analytics-section card" style={{ marginTop: '30px', padding: '24px', backgroundColor: '#FFFFFF' }}>
          <div className="analytics-header">
            <h2>Thống Kê Lượt Tương Tác Khách Hàng (Realtime Click Tracking)</h2>
            <p>Hệ thống tự động ghi nhận lượt click gọi hotline, chat zalo, click shipper, xem sản phẩm và bản đồ của khách hàng trên toàn website.</p>
          </div>

          {/* Analytics Tabs */}
          <div className="analytics-tabs">
            <button 
              type="button"
              onClick={() => setActiveAnalTab('calls')} 
              className={`anal-tab-btn ${activeAnalTab === 'calls' ? 'active' : ''}`}
            >
              ☎️ Gọi Hotline & Chat Zalo
            </button>
            <button 
              type="button"
              onClick={() => setActiveAnalTab('shippers')} 
              className={`anal-tab-btn ${activeAnalTab === 'shippers' ? 'active' : ''}`}
            >
              🚚 Gọi Shipper Giao Gas
            </button>
            <button 
              type="button"
              onClick={() => setActiveAnalTab('products')} 
              className={`anal-tab-btn ${activeAnalTab === 'products' ? 'active' : ''}`}
            >
              🔥 Clicks & Xem Sản Phẩm
            </button>
            <button 
              type="button"
              onClick={() => setActiveAnalTab('daily')} 
              className={`anal-tab-btn ${activeAnalTab === 'daily' ? 'active' : ''}`}
            >
              📅 Thống kê Theo Ngày
            </button>
          </div>

          <div className="analytics-content" style={{ marginTop: '20px' }}>
            {activeAnalTab === 'calls' && (
              <div className="analytics-table-wrapper">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Loại tương tác</th>
                      <th>Số điện thoại / Mục tiêu</th>
                      <th style={{ width: '150px', textAlign: 'center' }}>Số lượt click</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const callTypes = ['hotline_click', 'store_hotline_click', 'store_secondary_phone_click', 'zalo_click', 'product_hotline_click'];
                      const filtered = analytics.summary.filter(r => callTypes.includes(r.click_type));
                      
                      const typeLabel = {
                        'hotline_click': '📞 Gọi Hotline chính',
                        'store_hotline_click': '🏢 Gọi Hotline cửa hàng',
                        'store_secondary_phone_click': '☎️ Gọi SĐT phụ cửa hàng',
                        'zalo_click': '💬 Click Chat Zalo',
                        'product_hotline_click': '🛍️ Gọi đặt từ Trang sản phẩm'
                      };

                      if (filtered.length === 0) {
                        return <tr><td colSpan="3" style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>Chưa ghi nhận lượt tương tác hotline/zalo nào.</td></tr>;
                      }

                      return filtered.map((r, i) => (
                        <tr key={i}>
                          <td><strong>{typeLabel[r.click_type] || r.click_type}</strong></td>
                          <td><code>{r.click_target}</code></td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-dark)', fontSize: '15px' }}>{r.total_clicks}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            )}

            {activeAnalTab === 'shippers' && (
              <div className="analytics-table-wrapper">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Cửa hàng quản lý</th>
                      <th>Nhân viên giao gas (Shipper)</th>
                      <th style={{ width: '150px', textAlign: 'center' }}>Số lượt gọi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const filtered = analytics.summary.filter(r => r.click_type === 'shipper_phone_click');

                      if (filtered.length === 0) {
                        return <tr><td colSpan="3" style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>Chưa ghi nhận cuộc gọi nào cho nhân viên giao gas.</td></tr>;
                      }

                      return filtered.map((r, i) => {
                        const parts = r.click_target.split(' - ');
                        const storeName = parts[0] || 'Chưa rõ';
                        const shipperName = parts[1] || r.click_target;
                        return (
                          <tr key={i}>
                            <td>{storeName}</td>
                            <td><strong>👤 {shipperName}</strong></td>
                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#047857', fontSize: '15px' }}>{r.total_clicks}</td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            )}

            {activeAnalTab === 'products' && (
              <div className="analytics-table-wrapper">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Loại tương tác</th>
                      <th>Tên sản phẩm / Điểm đến</th>
                      <th style={{ width: '180px', textAlign: 'center' }}>Số lượt click/view</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const productTypes = ['product_view', 'product_card_click', 'map_view_click'];
                      const filtered = analytics.summary.filter(r => productTypes.includes(r.click_type));

                      const typeLabel = {
                        'product_view': '👁️ Xem Chi tiết sản phẩm',
                        'product_card_click': '🛍️ Click vào Card sản phẩm',
                        'map_view_click': '🗺️ Xem Bản đồ cửa hàng'
                      };

                      if (filtered.length === 0) {
                        return <tr><td colSpan="3" style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>Chưa ghi nhận click xem sản phẩm/bản đồ nào.</td></tr>;
                      }

                      return filtered.map((r, i) => (
                        <tr key={i}>
                          <td><strong>{typeLabel[r.click_type] || r.click_type}</strong></td>
                          <td>{r.click_target}</td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#1E40AF', fontSize: '15px' }}>{r.total_clicks}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            )}

            {activeAnalTab === 'daily' && (
              <div className="analytics-table-wrapper">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Ngày tương tác</th>
                      <th style={{ textAlign: 'center' }}>Tổng số lượt tương tác (Tổng các click)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.daily.length > 0 ? (
                      analytics.daily.map((r, i) => (
                        <tr key={i}>
                          <td><strong>📅 {r.click_date}</strong></td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#B91C1C', fontSize: '16px' }}>{r.daily_clicks} clicks</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="2" style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>Chưa ghi nhận dữ liệu theo ngày.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .admin-page-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 30px;
          color: var(--text);
        }

        .admin-loading {
          text-align: center;
          padding: 50px 0;
          font-size: 16px;
          color: var(--text-secondary);
        }

        .admin-error-banner {
          background-color: rgba(220, 38, 38, 0.1);
          color: var(--error);
          border: 1px solid rgba(220, 38, 38, 0.2);
          padding: 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 500;
        }

        .dashboard-stats-grid {
          margin-bottom: 40px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          position: relative;
          background-color: #FFFFFF;
        }

        .stat-card-icon {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-card-icon.products {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }

        .stat-card-icon.posts {
          background-color: rgba(30, 64, 175, 0.1);
          color: #1e40af;
        }

        .stat-card-icon.contacts {
          background-color: rgba(22, 163, 74, 0.1);
          color: var(--success);
        }

        .stat-card-info h3 {
          font-family: var(--font-inter), sans-serif;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.2;
        }

        .unread-badge {
          font-size: 11px;
          font-weight: 600;
          background-color: var(--error);
          color: #FFFFFF;
          padding: 2px 6px;
          border-radius: 10px;
          vertical-align: middle;
          text-transform: uppercase;
        }

        .stat-card-info p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .stat-card-link {
          position: absolute;
          bottom: 12px;
          right: 16px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .stat-card-link:hover {
          color: var(--primary-dark);
        }

        .dashboard-welcome {
          background-color: #FFFFFF;
          border: 1px solid var(--border);
        }

        .dashboard-welcome h2 {
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .dashboard-welcome p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 15px;
        }

        /* Click Analytics Dashboard CSS */
        .analytics-header {
          margin-bottom: 20px;
        }

        .analytics-header h2 {
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .analytics-header p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .analytics-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }

        .anal-tab-btn {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
        }

        .anal-tab-btn:hover {
          background-color: #F1F5F9;
          color: #0F172A;
        }

        .anal-tab-btn.active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: #1A202C;
        }

        .analytics-table-wrapper {
          overflow-x: auto;
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        .analytics-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .analytics-table th {
          background-color: #F8FAFC;
          color: #475569;
          font-weight: 700;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .analytics-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          color: #334155;
        }

        .analytics-table tr:last-child td {
          border-bottom: none;
        }

        .analytics-table tr:hover td {
          background-color: #F8FAFC;
        }

        .analytics-table code {
          background-color: #F1F5F9;
          color: #0F172A;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
