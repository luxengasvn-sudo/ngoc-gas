'use client';
import vinhlongUnitsData from '@/data/tinhthanh/administrative-units-vinh-long.json';
import dongthapUnitsData from '@/data/tinhthanh/administrative-units-dong-thap.json';
import camauUnitsData from '@/data/tinhthanh/administrative-units-ca-mau.json';
import angiangUnitsData from '@/data/tinhthanh/administrative-units-an-giang.json';
import canthoUnitsData from '@/data/tinhthanh/administrative-units-can-tho.json';
import tayninhUnitsData from '@/data/tinhthanh/administrative-units-tay-ninh.json';
import dongnaiUnitsData from '@/data/tinhthanh/administrative-units-dong-nai.json';
import hochiminhUnitsData from '@/data/tinhthanh/administrative-units-ho-chi-minh.json';
import lamdongUnitsData from '@/data/tinhthanh/administrative-units-lam-dong.json';
import gialaiUnitsData from '@/data/tinhthanh/administrative-units-gia-lai.json';
import daklakUnitsData from '@/data/tinhthanh/administrative-units-dak-lak.json';
import quangngaiUnitsData from '@/data/tinhthanh/administrative-units-quang-ngai.json';
import khanhhoaUnitsData from '@/data/tinhthanh/administrative-units-khanh-hoa.json';
import danangUnitsData from '@/data/tinhthanh/administrative-units-da-nang.json';
import thanhhoaUnitsData from '@/data/tinhthanh/administrative-units-thanh-hoa.json';
import quangtriUnitsData from '@/data/tinhthanh/administrative-units-quang-tri.json';
import ngheanUnitsData from '@/data/tinhthanh/administrative-units-nghe-an.json';
import hatinhUnitsData from '@/data/tinhthanh/administrative-units-ha-tinh.json';
import hueUnitsData from '@/data/tinhthanh/administrative-units-hue.json';
import tuyenquangUnitsData from '@/data/tinhthanh/administrative-units-tuyen-quang.json';
import thainguyenUnitsData from '@/data/tinhthanh/administrative-units-thai-nguyen.json';
import sonlaUnitsData from '@/data/tinhthanh/administrative-units-son-la.json';
import phuthoUnitsData from '@/data/tinhthanh/administrative-units-phu-tho.json';
import laocaiUnitsData from '@/data/tinhthanh/administrative-units-lao-cai.json';
import langsonUnitsData from '@/data/tinhthanh/administrative-units-lang-son.json';
import dienbienUnitsData from '@/data/tinhthanh/administrative-units-dien-bien.json';
import caobangUnitsData from '@/data/tinhthanh/administrative-units-cao-bang.json';
import hungyenUnitsData from '@/data/tinhthanh/administrative-units-hung-yen.json';
import bacninhUnitsData from '@/data/tinhthanh/administrative-units-bac-ninh.json';

import quangninhUnitsData from '@/data/tinhthanh/administrative-units-quang-ninh.json';
import haiphongUnitsData from '@/data/tinhthanh/administrative-units-hai-phong.json';
import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import hanoiUnitsData from '@/data/tinhthanh/administrative-units-ha-noi.json';
import ninhbinhUnitsData from '@/data/tinhthanh/administrative-units-ninh-binh.json';
import laichauUnitsData from '@/data/tinhthanh/administrative-units-lai-chau.json';
import WardUtilitiesMap from '../../components/WardUtilitiesMap';

const allKnownUnits = [
  ...vinhlongUnitsData.map(u => ({ ...u, provinceSlug: 'vinh-long' })),
  ...dongthapUnitsData.map(u => ({ ...u, provinceSlug: 'dong-thap' })),
  ...camauUnitsData.map(u => ({ ...u, provinceSlug: 'ca-mau' })),
  ...angiangUnitsData.map(u => ({ ...u, provinceSlug: 'an-giang' })),
  ...canthoUnitsData.map(u => ({ ...u, provinceSlug: 'can-tho' })),
  ...tayninhUnitsData.map(u => ({ ...u, provinceSlug: 'tay-ninh' })),
  ...dongnaiUnitsData.map(u => ({ ...u, provinceSlug: 'dong-nai' })),
  ...hochiminhUnitsData.map(u => ({ ...u, provinceSlug: 'ho-chi-minh' })),
  ...lamdongUnitsData.map(u => ({ ...u, provinceSlug: 'lam-dong' })),
  ...gialaiUnitsData.map(u => ({ ...u, provinceSlug: 'gia-lai' })),
  ...daklakUnitsData.map(u => ({ ...u, provinceSlug: 'dak-lak' })),
  ...quangngaiUnitsData.map(u => ({ ...u, provinceSlug: 'quang-ngai' })),
  ...khanhhoaUnitsData.map(u => ({ ...u, provinceSlug: 'khanh-hoa' })),
  ...danangUnitsData.map(u => ({ ...u, provinceSlug: 'da-nang' })),
  ...thanhhoaUnitsData.map(u => ({ ...u, provinceSlug: 'thanh-hoa' })),
  ...quangtriUnitsData.map(u => ({ ...u, provinceSlug: 'quang-tri' })),
  ...ngheanUnitsData.map(u => ({ ...u, provinceSlug: 'nghe-an' })),
  ...hatinhUnitsData.map(u => ({ ...u, provinceSlug: 'ha-tinh' })),
  ...hueUnitsData.map(u => ({ ...u, provinceSlug: 'hue' })),
  ...tuyenquangUnitsData.map(u => ({ ...u, provinceSlug: 'tuyen-quang' })),
  ...thainguyenUnitsData.map(u => ({ ...u, provinceSlug: 'thai-nguyen' })),
  ...sonlaUnitsData.map(u => ({ ...u, provinceSlug: 'son-la' })),
  ...phuthoUnitsData.map(u => ({ ...u, provinceSlug: 'phu-tho' })),
  ...laocaiUnitsData.map(u => ({ ...u, provinceSlug: 'lao-cai' })),
  ...langsonUnitsData.map(u => ({ ...u, provinceSlug: 'lang-son' })),
  ...dienbienUnitsData.map(u => ({ ...u, provinceSlug: 'dien-bien' })),
  ...caobangUnitsData.map(u => ({ ...u, provinceSlug: 'cao-bang' })),
  ...hungyenUnitsData.map(u => ({ ...u, provinceSlug: 'hung-yen' })),
  ...bacninhUnitsData.map(u => ({ ...u, provinceSlug: 'bac-ninh' })),
  ...quangninhUnitsData.map(u => ({ ...u, provinceSlug: 'quang-ninh' })),
  ...haiphongUnitsData.map(u => ({ ...u, provinceSlug: 'hai-phong' })),
  ...hanoiUnitsData.map(u => ({ ...u, provinceSlug: 'ha-noi' })),
  ...ninhbinhUnitsData.map(u => ({ ...u, provinceSlug: 'ninh-binh' })),
  ...laichauUnitsData.map(u => ({ ...u, provinceSlug: 'lai-chau' }))
];

export default function BanDoTienIchPage({ params }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const rawParams = resolvedParams.params || [];
  const typeParam = searchParams.get('type') || 'all';

  // Map URL type param to internal category
  const initialCategory = useMemo(() => {
    switch (typeParam) {
      case 'y_te':
      case 'benh_vien':
        return 'hospital';
      case 'truong_hoc':
        return 'school';
      case 'ubnd':
        return 'ubnd';
      case 'cong_an':
        return 'police';
      case 'buu_dien':
        return 'post';
      default:
        return 'all';
    }
  }, [typeParam]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(0);

  // Identify ward slug from params array
  let wardSlug = rawParams[0] || 'phuong-di-an';
  let unit = allKnownUnits.find(u => u.wardSlug === wardSlug || u.slug === wardSlug);
  if (!unit && rawParams.length > 1) {
    unit = allKnownUnits.find(u => u.wardSlug === rawParams[1] || u.slug === rawParams[1]);
    if (unit) wardSlug = rawParams[1];
  }

  // Fallback to Di An if not found
  if (!unit) {
    unit = allKnownUnits.find(u => u.wardSlug === 'phuong-di-an') || allKnownUnits[0];
  }

  const province = provincesData.find(p => p.slug === (unit?.provinceSlug || 'ho-chi-minh')) || provincesData[0];

  const ubnd = useMemo(() => unit.ubnd || {
    name: `Trụ sở UBND ${unit.name}`,
    address: `Trung tâm hành chính, ${unit.name}, ${unit.district}`,
    phone: '028 3822 xxxx',
    workingHours: 'Thứ 2 - Thứ 6 (07:30 - 17:00)',
    lat: unit.lat || 10.9034,
    lng: unit.lng || 106.759
  }, [unit]);

  const police = useMemo(() => unit.police || {
    name: `Công An ${unit.name}`,
    address: `Tuyến Phố An Ninh, ${unit.name}, ${unit.district}`,
    phone: '028 3823 xxxx',
    hotline: '113 / Trực ban 24/7',
    lat: Number(((unit.lat || 10.9034) + 0.001).toFixed(4)),
    lng: Number(((unit.lng || 106.759) + 0.0015).toFixed(4))
  }, [unit]);

  const hospitals = useMemo(() => unit.hospitals || [
    {
      name: `Trạm Y Tế ${unit.name}`,
      address: `Khu phố trung tâm, ${unit.name}`,
      phone: '0274 3751 xxx',
      lat: Number(((unit.lat || 10.9034) - 0.0012).toFixed(4)),
      lng: Number(((unit.lng || 106.759) - 0.001).toFixed(4))
    }
  ], [unit]);

  const schools = useMemo(() => unit.schools || [
    {
      name: `Trường Tiểu Học & THCS ${unit.name}`,
      address: `Trục đường chính, ${unit.name}`,
      phone: '0274 3742 xxx',
      lat: Number(((unit.lat || 10.9034) + 0.002).toFixed(4)),
      lng: Number(((unit.lng || 106.759) - 0.0018).toFixed(4))
    }
  ], [unit]);

  const postOffices = useMemo(() => unit.postOffices || [
    {
      name: `Bưu Điện Văn Hóa ${unit.name}`,
      address: `Số 12 Đường Trung Tâm, ${unit.name}`,
      phone: '0274 3733 xxx',
      lat: Number(((unit.lat || 10.9034) - 0.002).toFixed(4)),
      lng: Number(((unit.lng || 106.759) + 0.002).toFixed(4))
    }
  ], [unit]);

  const faqList = unit.faq || [
    {
      question: `Trụ sở UBND ${unit.name} nằm ở đâu và làm việc vào khung giờ nào?`,
      answer: `Trụ sở UBND ${unit.name} tọa lạc tại ${ubnd.address}. Cơ quan tiếp nhận và giải quyết thủ tục hành chính từ Thứ Hai đến Thứ Sáu (Sáng 07:30 - 11:30, Chiều 13:30 - 17:00).`
    },
    {
      question: `Người dân cần cấp cứu hoặc khám chữa bệnh ban đầu thì liên hệ cơ sở y tế nào?`,
      answer: `Cư dân có thể đến khám và sơ cấp cứu trực tiếp tại Trạm Y Tế ${unit.name}, hoặc liên hệ đường dây nóng cấp cứu 115.`
    },
    {
      question: `Làm thế nào để tra cứu thông tin quy hoạch và địa giới hành chính của ${unit.name}?`,
      answer: `Người dân có thể tra cứu trực tiếp trên Cổng thông tin bản đồ tiện ích số của tỉnh/thành phố hoặc liên hệ trực tiếp Bộ phận Địa chính - Xây dựng tại Trụ sở UBND ${unit.name} để được hướng dẫn chi tiết.`
    }
  ];

  // Combined POIs filtered by activeCategory
  const filteredPOIs = useMemo(() => {
    const list = [];
    if (activeCategory === 'all' || activeCategory === 'ubnd') {
      list.push({ ...ubnd, category: 'ubnd', categoryName: 'Trụ sở UBND', icon: '🏛️', color: 'amber' });
    }
    if (activeCategory === 'all' || activeCategory === 'police') {
      list.push({ ...police, category: 'police', categoryName: 'Công an phường/xã', icon: '👮', color: 'blue' });
    }
    if (activeCategory === 'all' || activeCategory === 'hospital') {
      hospitals.forEach(h => list.push({ ...h, category: 'hospital', categoryName: 'Cơ sở y tế', icon: '🏥', color: 'purple' }));
    }
    if (activeCategory === 'all' || activeCategory === 'school') {
      schools.forEach(s => list.push({ ...s, category: 'school', categoryName: 'Trường học', icon: '🏫', color: 'emerald' }));
    }
    if (activeCategory === 'all' || activeCategory === 'post') {
      postOffices.forEach(p => list.push({ ...p, category: 'post', categoryName: 'Bưu điện & Bưu chính', icon: '📮', color: 'indigo' }));
    }
    return list;
  }, [activeCategory, ubnd, police, hospitals, schools, postOffices]);

  const handleSelectPOIAndScroll = (poi) => {
    setSelectedPOI(poi);
    const mapEl = document.getElementById('utilities-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '14px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href={`/tinh-thanh/province/${province.slug}`}>{province.name}</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href={`/tinh-thanh/province/${province.slug}/${unit.wardSlug}`}>{unit.name}</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Bản Đồ Tiện Ích Số</span>
        </div>

        {/* HERO COVER BANNER */}
        <div
          className="tt-card tt-card-padded"
          style={{
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            color: '#ffffff',
            borderRadius: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#fef08a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  HỆ THỐNG ĐỊNH VỊ TIỆN ÍCH DÂN SINH 2026
                </span>
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.5px' }}>
                Bản Đồ Số Tiện Ích {unit.name}
              </h1>
              <p style={{ fontSize: '13px', color: '#e0f2fe', lineHeight: '1.6', margin: 0 }}>
                Định vị trực quan trụ sở cơ quan hành chính, trường học các cấp, cơ sở y tế khám chữa bệnh và điểm dịch vụ bưu chính tại {unit.name}.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link
                href={`/tinh-thanh/province/${province.slug}/${unit.wardSlug}`}
                className="tt-btn-secondary"
                style={{ fontSize: '12px', padding: '8px 16px', textDecoration: 'none', backgroundColor: '#ffffff', color: '#0f172a' }}
              >
                ← Về Trang Tổng Quan
              </Link>
              <Link
                href="/lien-he"
                className="tt-btn-primary"
                style={{ fontSize: '12px', padding: '8px 16px', textDecoration: 'none', backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                💬 Góp Ý Bản Đồ
              </Link>
            </div>
          </div>
        </div>

        {/* POI CATEGORY FILTER BAR */}
        <div className="tt-card tt-card-padded" style={{ marginBottom: '20px', padding: '14px 20px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            CHỌN NHÓM TIỆN ÍCH HIỂN THỊ TRÊN BẢN ĐỒ:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Tất Cả Tiện Ích', icon: '📍' },
              { id: 'ubnd', label: 'Trụ Sở UBND', icon: '🏛️' },
              { id: 'police', label: 'Công An Phường/Xã', icon: '👮' },
              { id: 'hospital', label: 'Y Tế & Bệnh Viện', icon: '🏥' },
              { id: 'school', label: 'Trường Học Các Cấp', icon: '🏫' },
              { id: 'post', label: 'Bưu Điện & Bưu Chính', icon: '📮' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedPOI(null);
                }}
                className={`tt-region-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* BẢN ĐỒ TIỆN ÍCH LEAFLET 5 LỚP */}
        <div id="utilities-map-section">
          <WardUtilitiesMap
            unit={unit}
            pois={filteredPOIs}
            selectedPOI={selectedPOI}
            onSelectPOI={(poi) => setSelectedPOI(poi)}
            height="520px"
          />
        </div>

        {/* DANH SÁCH THẺ ĐỊA ĐIỂM TIỆN ÍCH */}
        <div style={{ marginTop: '28px' }}>
          <div className="tt-section-title-row">
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 4px 0' }}>
                Danh Sách Cơ Sở Tiện Ích Dân Sinh ({filteredPOIs.length} địa điểm)
              </h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Bấm vào thẻ bất kỳ để bản đồ lướt mượt đến vị trí và mở popup thông tin
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px', marginTop: '14px' }}>
            {filteredPOIs.map((poi, idx) => {
              const isSelected = selectedPOI && selectedPOI.name === poi.name;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectPOIAndScroll(poi)}
                  className={`tt-card tt-card-padded ${isSelected ? 'active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #ea580c' : '1px solid #e2e8f0',
                    boxShadow: isSelected ? '0 8px 24px rgba(234, 88, 12, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '26px', lineHeight: 1 }}>{poi.icon || '📍'}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>
                          {poi.categoryName}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#ea580c' }}>
                          📍 Xem bản đồ →
                        </span>
                      </div>

                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
                        {poi.name}
                      </h4>

                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                        📍 {poi.address}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                        <span>🕒 Giờ hành chính</span>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}
                        >
                          Chỉ đường ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GIẢI ĐÁP THỦ TỤC & TIỆN ÍCH DÂN SINH (FAQS) */}
        {faqList.length > 0 && (
          <div className="tt-card tt-card-padded" style={{ marginTop: '36px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '0 0 16px 0' }}>
              Giải Đáp Nhanh Về Tiện Ích & Thủ Tục Tại {unit.name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqList.map((f, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? -1 : idx)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        textAlign: 'left',
                        fontWeight: '800',
                        fontSize: '13px',
                        color: '#0f172a',
                        backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <span>0{idx + 1}. {f.question}</span>
                      <span style={{ color: isOpen ? '#ea580c' : '#94a3b8', fontSize: '12px', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        ▼
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '14px 18px', fontSize: '13px', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                        {f.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FOOTER CALLOUT TIỆN ÍCH DÂN SINH 2026 */}
        <div style={{ marginTop: '36px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            border: '1px solid #334155'
          }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                BẢN ĐỒ TIỆN ÍCH DÂN SINH 2026
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '4px 0 8px 0', color: '#ffffff' }}>
                Hạ Tầng Tiện Ích Hành Chính {unit.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, maxWidth: '620px', lineHeight: '1.5' }}>
                Tra cứu vị trí chính xác của Trụ sở UBND, Công an phường/xã, Trạm Y tế và các dịch vụ dân sinh thiết yếu phục vụ đời sống cư dân trên địa bàn.
              </p>
            </div>

            <Link
              href={`/tinh-thanh/province/${province.slug}/${unit.wardSlug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '14px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
              }}
            >
              <span>🏛️ XEM CHI TIẾT ĐỊA GIỚI</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
