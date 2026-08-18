import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, MapPin, Store, ArrowLeft, Clock, ShieldCheck, Truck, CheckCircle2, Navigation, User, ExternalLink, BookOpen, Compass } from 'lucide-react';
import { getStoreBySlug, getAllStores } from '@/lib/storesHelper';
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  const settings = await getAllSettings();

  if (!store) {
    return {
      title: 'Không tìm thấy cửa hàng',
      description: 'Địa chỉ cửa hàng không tồn tại hoặc đã được cập nhật.'
    };
  }

  const title = `${store.name} - Giao Gas Nhanh 15 Phút`;
  const description = `${store.name} tại ${store.address}. Dịch vụ đổi gas chính hãng Sopet, Phoenix, Luxen 12kg & 45kg giao nhanh trong ${store.delivery_time || '10-15 phút'}, cân đủ ký. Hotline: ${store.phone}.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Ngọc Gas`,
      description,
      images: [{ url: store.image_url || settings.logo_url || '/images/sopet-xam.png' }],
      type: 'website'
    }
  };
}

export default async function StoreDetailPage({ params }) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  const allStores = await getAllStores();

  if (!store) {
    notFound();
  }

  const otherStores = allStores.filter(s => String(s.id) !== String(store.id) && s.is_active == 1).slice(0, 3);

  // Parse store phones & delivery phones
  let storePhones = [];
  try {
    if (store.store_phones) {
      const parsed = typeof store.store_phones === 'string' ? JSON.parse(store.store_phones) : store.store_phones;
      if (Array.isArray(parsed)) storePhones = parsed.filter(p => p && p.trim() !== '');
    }
  } catch (e) {}

  let deliveryPhones = [];
  try {
    if (store.delivery_phones) {
      const parsed = typeof store.delivery_phones === 'string' ? JSON.parse(store.delivery_phones) : store.delivery_phones;
      if (Array.isArray(parsed)) deliveryPhones = parsed.filter(d => d && d.name && d.phone);
    }
  } catch (e) {}

  // Parse delivery areas
  let deliveryAreaTags = [];
  if (store.delivery_areas && typeof store.delivery_areas === 'string') {
    deliveryAreaTags = store.delivery_areas
      .split(/[,;\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  // Smart Map Embed Helper: handles full <iframe> tags or direct https URLs
  const renderMapEmbed = (rawMap) => {
    if (!rawMap) return null;
    const trimmed = rawMap.trim();
    if (trimmed.startsWith('<iframe')) {
      return <div className="map-iframe-container" dangerouslySetInnerHTML={{ __html: trimmed }} />;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return (
        <div className="map-iframe-container">
          <iframe
            src={trimmed}
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      );
    }
    return null;
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Ngọc Gas - ${store.name}`,
    "image": store.image_url ? `https://ngocgas.com${store.image_url}` : "https://ngocgas.com/images/sopet-xam.png",
    "telephone": store.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": store.address,
      "addressLocality": "Dĩ An",
      "addressRegion": "Bình Dương",
      "addressCountry": "VN"
    },
    "url": `https://ngocgas.com/cua-hang/${store.slug || store.id}`,
    ...(store.fanpage_url ? { "sameAs": [store.fanpage_url] } : {}),
    ...(store.google_map_url ? { "hasMap": store.google_map_url } : {}),
    "priceRange": "$$",
    "openingHours": store.working_hours || "Mo-Su 06:00-21:30"
  };

  const mapRenderResult = renderMapEmbed(store.map_embed);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <section className="store-detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <Link href="/cua-hang">Hệ thống cửa hàng</Link>
            <span className="separator">/</span>
            <span className="current">{store.name}</span>
          </div>

          <div className="hero-content-box">
            <span className="store-badge">📍 Trạm Giao Gas Trọng Điểm</span>
            <h1 className="store-title">{store.name}</h1>
            <p className="store-address-subtitle">
              <MapPin size={18} className="icon-red" />
              <span>{store.address}</span>
            </p>

            <div className="store-quick-actions">
              <a href={`tel:${store.phone.replace(/\./g, '').trim()}`} className="btn btn-call">
                <Phone size={18} />
                <span>Gọi Trạm: {store.phone}</span>
              </a>

              {store.fanpage_url && (
                <a 
                  href={store.fanpage_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-fanpage"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Fanpage Chi Nhánh</span>
                </a>
              )}

              {store.google_map_url && (
                <a 
                  href={store.google_map_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-map-direct"
                >
                  <Navigation size={18} />
                  <span>Chỉ đường Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="store-detail-body">
        <div className="container">
          <div className="store-detail-grid">
            
            {/* Cột trái: Thông tin chi tiết, Tuyến đường & Danh bạ */}
            <div className="detail-left-col">
              
              {/* Card thông tin trạm */}
              <div className="content-card">
                <h2 className="card-section-title">
                  <Store size={20} className="title-icon" />
                  <span>Thông Tin Trực Ban & Dịch Vụ</span>
                </h2>

                <div className="info-list">
                  <div className="info-row">
                    <span className="info-label">📍 Địa chỉ cụ thể:</span>
                    <strong className="info-value">{store.address}</strong>
                  </div>

                  <div className="info-row">
                    <span className="info-label">📞 Hotline đặt gas:</span>
                    <strong className="info-value text-primary">
                      <a href={`tel:${store.phone.replace(/\./g, '').trim()}`} style={{ color: 'var(--primary-dark)', textDecoration: 'none' }}>
                        {store.phone}
                      </a>
                    </strong>
                  </div>

                  <div className="info-row">
                    <span className="info-label">⏰ Giờ hoạt động:</span>
                    <span className="info-value">{store.working_hours || '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)'}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-label">⚡ Thời gian giao:</span>
                    <span className="info-value">Cam kết {store.delivery_time || '10 - 15 phút'} tại khu vực phụ trách</span>
                  </div>
                </div>

                {/* SĐT phụ nếu có */}
                {storePhones.length > 0 && (
                  <div className="sub-phones-box">
                    <h4 className="sub-box-title">Số điện thoại bàn & Hotline phụ:</h4>
                    <div className="phones-pills-list">
                      {storePhones.map((p, idx) => (
                        <a key={idx} href={`tel:${p.replace(/\./g, '').trim()}`} className="phone-pill">
                          <Phone size={13} />
                          <span>{p}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Danh bạ nhân viên giao hàng */}
                {deliveryPhones.length > 0 && (
                  <div className="delivery-staff-box">
                    <h4 className="sub-box-title">Đội ngũ kỹ thuật viên trực ban giao gas:</h4>
                    <div className="staff-grid">
                      {deliveryPhones.map((staff, idx) => (
                        <div key={idx} className="staff-card">
                          <div className="staff-avatar">
                            <User size={16} />
                          </div>
                          <div className="staff-info">
                            <span className="staff-name">{staff.name}</span>
                            <a href={`tel:${staff.phone.replace(/\./g, '').trim()}`} className="staff-phone">
                              <Phone size={11} />
                              <span>{staff.phone}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Khối Tuyến Đường & Khu Vực Giao Nhanh */}
              {deliveryAreaTags.length > 0 && (
                <div className="content-card">
                  <h3 className="card-section-title">
                    <Truck size={20} className="title-icon" />
                    <span>Tuyến Đường & Khu Vực Giao Siêu Tốc 15 Phút</span>
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Trạm phụ trách trực tiếp các tuyến đường và khu dân cư sau:
                  </p>
                  <div className="routes-tags-list">
                    {deliveryAreaTags.map((tag, idx) => (
                      <span key={idx} className="route-tag-pill">
                        <Compass size={13} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Khối Cẩm nang & Cam kết chất lượng - Đồng bộ 100% với Admin */}
              <div className="content-card">
                <h3 className="card-section-title">
                  <ShieldCheck size={20} className="title-icon text-success" />
                  <span>Cẩm Nang & Cam Kết Dịch Vụ Tại {store.name}</span>
                </h3>

                {(() => {
                  const content = store.guide_content || '';
                  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
                  const isBulletList = lines.some(l => l.startsWith('-') || l.startsWith('*') || l.startsWith('•'));

                  if (isBulletList) {
                    return (
                      <ul className="commitments-list">
                        {lines.map((line, idx) => {
                          const clean = line.replace(/^[-*•]\s*/, '');
                          const colonIdx = clean.indexOf(':');
                          if (colonIdx !== -1) {
                            const heading = clean.slice(0, colonIdx + 1);
                            const rest = clean.slice(colonIdx + 1);
                            return (
                              <li key={idx}>
                                <CheckCircle2 size={16} className="icon-check" />
                                <span><strong>{heading}</strong>{rest}</span>
                              </li>
                            );
                          }
                          return (
                            <li key={idx}>
                              <CheckCircle2 size={16} className="icon-check" />
                              <span>{clean}</span>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  return (
                    <div className="guide-content-body">
                      {content}
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Cột phải: Bản đồ & Hình ảnh & Fanpage */}
            <div className="detail-right-col">
              
              {/* Hình ảnh trạm */}
              {store.image_url && (
                <div className="store-photo-card content-card">
                  <img src={store.image_url} alt={store.name} className="store-main-photo" />
                </div>
              )}

              {/* Bản đồ Google Maps */}
              <div className="map-embed-card">
                <h3 className="map-card-title">
                  <MapPin size={18} className="icon-red" />
                  <span>Vị Trí Cửa Hàng Trên Bản Đồ</span>
                </h3>

                {mapRenderResult ? (
                  mapRenderResult
                ) : (
                  <div className="map-fallback-box">
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      📍 {store.address}
                    </p>
                    <a 
                      href={store.google_map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary"
                      style={{ padding: '10px 18px', fontSize: '14px' }}
                    >
                      <Navigation size={15} />
                      <span>Xem chỉ đường Google Maps</span>
                    </a>
                  </div>
                )}

                {store.google_map_url && (
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <a 
                      href={store.google_map_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="google-maps-link"
                    >
                      <ExternalLink size={13} />
                      <span>Mở ứng dụng Google Maps để nhận chỉ đường</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Box liên hệ Fanpage */}
              {store.fanpage_url && (
                <div className="fanpage-promo-card">
                  <div className="fb-big-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <h4>Fanpage Facebook Chi Nhánh</h4>
                  <p>Nhắn tin trực tiếp qua Facebook để nhận tư vấn khuyến mãi và hỗ trợ kỹ thuật.</p>
                  <a 
                    href={store.fanpage_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-fb-block"
                  >
                    <span>Truy cập Fanpage ngay</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              )}

            </div>

          </div>

          {/* Danh sách các chi nhánh khác */}
          {otherStores.length > 0 && (
            <div className="other-stores-section">
              <h3 className="section-title">Các Chi Nhánh Khác Trong Hệ Thống Ngọc Gas</h3>
              <div className="other-stores-grid">
                {otherStores.map(other => (
                  <div key={other.id} className="other-store-card">
                    <h4>{other.name}</h4>
                    <p><MapPin size={13} style={{ flexShrink: 0, color: '#EA4335' }} /> <span>{other.address}</span></p>
                    <div className="other-store-footer">
                      <span className="other-phone">Hotline: {other.phone}</span>
                      <Link href={`/cua-hang/${other.slug || other.id}`} className="view-link">
                        <span>Chi tiết trạm</span>
                        <ArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '35px', textAlign: 'center' }}>
            <Link href="/cua-hang" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} />
              <span>Quay lại danh sách tất cả cửa hàng</span>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
