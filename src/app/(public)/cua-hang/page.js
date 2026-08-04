'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Search, Store, ArrowRight, Loader2, User, X } from 'lucide-react';
import { trackClick } from '@/lib/analytics';

export default function StoresPublicPage() {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeMapEmbed, setActiveMapEmbed] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch('/api/stores?active=true');
        const data = await res.json();
        if (data.success) {
          setStores(data.data);
        }
      } catch (e) {
        console.error('Error fetching stores:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.phone.includes(searchTerm)
  );

  return (
    <>
      <section className="stores-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Hệ thống cửa hàng</span>
          </div>
          <h1 className="stores-hero-title">Hệ Thống Cửa Hàng</h1>
          <p className="stores-hero-desc">
            Tìm kiếm địa chỉ cửa hàng Ngọc Gas gần bạn nhất để được phục vụ và giao gas siêu tốc trong vòng 10-15 phút.
          </p>
        </div>
      </section>

      <section className="section-padding stores-list-section">
        <div className="container">
          {/* Search bar */}
          <div className="search-bar-wrapper">
            <div className="search-input-container">
              <Search className="search-icon" size={20} />
              <input 
                type="text"
                className="store-search-input"
                placeholder="Nhập tên cửa hàng, địa chỉ hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-meta">
              Tìm thấy <strong>{filteredStores.length}</strong> cửa hàng
            </div>
          </div>

          {loading ? (
            <div className="stores-loading">
              <Loader2 size={36} className="spinner" />
              <p>Đang tìm kiếm cửa hàng...</p>
            </div>
          ) : filteredStores.length > 0 ? (
            <div className="stores-grid">
              {filteredStores.map(store => (
                <div key={store.id} className="store-card card animate-fade-in-up">
                  <div className="store-image-box">
                    {store.image_url ? (
                      <img src={store.image_url} alt={store.name} className="store-img" />
                    ) : (
                      <div className="store-img-placeholder">
                        <Store size={48} className="placeholder-icon" />
                      </div>
                    )}
                  </div>
                  <div className="store-card-body">
                    <h3 className="store-name">{store.name}</h3>
                    
                    <div className="store-meta-list">
                      {/* Địa chỉ */}
                      <div className="store-meta-item">
                        <MapPin size={16} className="meta-icon" />
                        <span>{store.address}</span>
                      </div>

                      {/* Hotline */}
                      <div className="store-meta-item">
                        <Phone size={16} className="meta-icon" />
                        <span><strong>Hotline chính: </strong> 
                          <a 
                            href={`tel:${store.phone.replace(/\./g, '').trim()}`} 
                            className="store-phone-link"
                            onClick={() => trackClick('store_hotline_click', store.name + ' - ' + store.phone)}
                          >
                            {store.phone}
                          </a>
                        </span>
                      </div>

                      {/* Store Phones list */}
                      {(() => {
                        try {
                          if (store.store_phones) {
                            const parsed = JSON.parse(store.store_phones);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                              return (
                                <div className="store-meta-item-nested">
                                  <span className="nested-title">SĐT bàn / SĐT phụ:</span>
                                  <div className="nested-phones-list">
                                    {parsed.map((p, i) => (
                                      <a 
                                        key={i} 
                                        href={`tel:${p.replace(/\./g, '').trim()}`} 
                                        className="nested-phone-badge"
                                        onClick={() => trackClick('store_secondary_phone_click', store.name + ' - ' + p)}
                                      >
                                        <Phone size={12} />
                                        <span>{p}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                          }
                        } catch(e) {}
                        return null;
                      })()}

                      {/* Delivery Staff Phones list */}
                      {(() => {
                        try {
                          if (store.delivery_phones) {
                            const parsed = JSON.parse(store.delivery_phones);
                            if (Array.isArray(parsed) && parsed.length > 0) {
                              return (
                                <div className="store-meta-item-nested">
                                  <span className="nested-title">Nhân viên giao gas:</span>
                                  <div className="nested-delivery-list">
                                    {parsed.map((d, i) => (
                                      <div key={i} className="delivery-staff-row">
                                        <div className="staff-info">
                                          <User size={12} className="staff-icon" />
                                          <span>{d.name}</span>
                                        </div>
                                        <a 
                                          href={`tel:${d.phone.replace(/\./g, '').trim()}`} 
                                          className="staff-phone-btn"
                                          onClick={() => trackClick('shipper_phone_click', store.name + ' - ' + d.name + ' (' + d.phone + ')')}
                                        >
                                          <Phone size={12} />
                                          <span>{d.phone}</span>
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                          }
                        } catch(e) {}
                        return null;
                      })()}
                    </div>

                    <div className="store-actions">
                      <a 
                        href={`tel:${store.phone.replace(/\./g, '').trim()}`} 
                        className="btn btn-primary btn-block"
                        onClick={() => trackClick('store_hotline_click', store.name + ' - ' + store.phone)}
                      >
                        <Phone size={16} />
                        <span>Gọi đặt gas ngay</span>
                      </a>
                      {store.map_embed ? (
                        <button 
                          type="button"
                          onClick={() => {
                            trackClick('map_view_click', store.name + ' (nhúng)');
                            setActiveMapEmbed({ name: store.name, iframe: store.map_embed });
                          }}
                          className="btn btn-outline btn-block"
                        >
                          <span>Xem bản đồ cửa hàng</span>
                          <ArrowRight size={16} />
                        </button>
                      ) : (
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-outline btn-block"
                          onClick={() => trackClick('map_view_click', store.name + ' (Google Search)')}
                        >
                          <span>Chỉ đường trên bản đồ</span>
                          <ArrowRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-stores-found">
              <Store size={64} className="no-stores-icon" />
              <h3>Không tìm thấy cửa hàng nào</h3>
              <p>Vui lòng thử tìm kiếm lại với từ khóa khác (ví dụ: tên đường, phường, hoặc số điện thoại).</p>
            </div>
          )}
        </div>
      </section>

      {activeMapEmbed && (
        <div className="map-modal-backdrop" onClick={() => setActiveMapEmbed(null)}>
          <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-header">
              <h3>Bản đồ: {activeMapEmbed.name}</h3>
              <button className="map-modal-close" onClick={() => setActiveMapEmbed(null)}>
                <X size={20} />
              </button>
            </div>
            <div 
              className="map-modal-body" 
              dangerouslySetInnerHTML={{ __html: activeMapEmbed.iframe }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .stores-hero {
          background-color: var(--bg-surface);
          padding: 60px 0;
          border-bottom: 1px solid var(--border);
        }

        .stores-hero-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 12px;
        }

        .stores-hero-desc {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.6;
        }

        .stores-list-section {
          background-color: var(--bg-body);
        }

        .search-bar-wrapper {
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .search-input-container {
          position: relative;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          color: var(--text-secondary);
        }

        .store-search-input {
          width: 100%;
          padding: 12px 12px 12px 48px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: var(--transition);
        }

        .store-search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(245, 183, 49, 0.1);
        }

        .search-meta {
          font-size: 14px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .search-meta strong {
          color: var(--primary-dark);
        }

        .stores-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          color: var(--text-secondary);
          gap: 15px;
        }

        .spinner {
          animation: spin 1s linear infinite;
          color: var(--primary);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .stores-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .stores-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .stores-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .search-bar-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .search-meta {
            text-align: right;
          }
          .stores-hero-title {
            font-size: 32px;
          }
        }

        .store-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .store-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow);
          border-color: rgba(245, 183, 49, 0.3);
        }

        .store-image-box {
          height: 200px;
          width: 100%;
          overflow: hidden;
          position: relative;
          background-color: #F8FAFC;
        }

        .store-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .store-card:hover .store-img {
          transform: scale(1.05);
        }

        .store-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #E2E8F0;
          color: #94A3B8;
        }

        .store-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .store-name {
          font-family: var(--font-inter), sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 15px 0;
          line-height: 1.4;
        }

        .store-meta-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .store-meta-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .meta-icon {
          color: var(--primary-dark);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .store-phone-link {
          color: var(--text);
          font-weight: 600;
          transition: var(--transition);
        }

        .store-phone-link:hover {
          color: var(--primary-dark);
        }

        .store-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }

        .store-actions .btn {
          justify-content: center;
          padding: 10px 16px;
        }

        .no-stores-found {
          text-align: center;
          padding: 60px 20px;
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-secondary);
          box-shadow: var(--shadow-sm);
        }

        .no-stores-icon {
          color: #CBD5E1;
          margin-bottom: 15px;
        }

        .no-stores-found h3 {
          font-size: 18px;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .no-stores-found p {
          max-width: 450px;
          margin: 0 auto;
          font-size: 14px;
        }

        .store-meta-item-nested {
          margin-top: 10px;
          border-top: 1px dashed var(--border);
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nested-title {
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nested-phones-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .nested-phone-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #334155;
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          transition: var(--transition);
        }

        .nested-phone-badge:hover {
          background-color: #E2E8F0;
          color: var(--primary-dark);
          border-color: rgba(245, 183, 49, 0.4);
        }

        .nested-delivery-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .delivery-staff-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #F8FAFC;
          border: 1px solid #F1F5F9;
          border-radius: 6px;
          padding: 6px 10px;
        }

        .staff-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #334155;
          font-weight: 600;
        }

        .staff-icon {
          color: #64748B;
        }

        .staff-phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background-color: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #047857;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          transition: var(--transition);
        }

        .staff-phone-btn:hover {
          background-color: #D1FAE5;
          box-shadow: 0 2px 8px rgba(4, 120, 87, 0.1);
        }

        .map-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .map-modal-content {
          background-color: #FFFFFF;
          border-radius: 12px;
          width: 100%;
          max-width: 700px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .map-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }

        .map-modal-header h3 {
          margin: 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
        }

        .map-modal-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
        }

        .map-modal-close:hover {
          color: #0F172A;
        }

        .map-modal-body {
          padding: 0;
          height: 450px;
        }

        .map-modal-body :global(iframe) {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
        }

        @media (max-width: 768px) {
          .map-modal-body {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
}
