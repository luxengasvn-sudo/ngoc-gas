'use client';

import { useEffect, useState } from 'react';
import { Save, AlertCircle, CheckCircle2, Check, Upload, MapPin, Phone, Mail, Clock, ShieldAlert, Image as ImageIcon, Home, Info, HelpCircle, ArrowUp, ArrowDown, Plus, Trash2, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import MediaLibraryModal from '@/components/MediaLibraryModal';

function CollapsibleSection({ id, title, subtitle, isOpen, onToggle, toggleSwitch, children }) {
  return (
    <div 
      className="form-section-card" 
      style={{ 
        padding: '0', 
        overflow: 'hidden', 
        transition: 'all 0.25s ease',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        marginBottom: '20px',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      <div 
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          cursor: 'pointer',
          userSelect: 'none',
          backgroundColor: isOpen ? 'var(--bg-surface-hover, rgba(255,255,255,0.03))' : 'var(--bg-surface)',
          borderBottom: isOpen ? '1px solid var(--border)' : 'none',
          transition: 'background-color 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--primary)', flexShrink: 0 }}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 className="section-card-title" style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>
              {title}
            </h3>
            {subtitle && !isOpen && (
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          {toggleSwitch}
          <button
            type="button"
            onClick={onToggle}
            className="btn-outline-new"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <span>{isOpen ? 'Thu nhỏ' : 'Mở rộng'}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="animate-fade-in-up" style={{ padding: '20px' }}>
          {subtitle && (
            <p className="section-subtitle-text" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general'); // general | homepage | about
  const [allProducts, setAllProducts] = useState([]);

  // Price History & Notes Management State
  const [priceHistoryList, setPriceHistoryList] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [newPriceEntry, setNewPriceEntry] = useState({
    gas_type: 'luxen-12kg',
    effective_month: `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    price: 420000,
    sale_price: 395000,
    change_type: 'same',
    change_amount: 0,
    notes: ''
  });

  const fetchPriceHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch('/api/gas-price-history');
      const data = await res.json();
      if (data.success) {
        setPriceHistoryList(data.data);
      }
    } catch (e) {
      console.error('Error fetching price history:', e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleAddPriceEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const gasNameMap = {
        'luxen-12kg': 'Gas Cao Cấp 12kg (Luxen Gas)',
        'phothong-12kg': 'Gas Phổ Thông 12kg (Sopet & Phoenix)',
        'congnghiep-45kg': 'Gas Công Nghiệp 45kg (Luxen 45kg)'
      };

      const res = await fetch('/api/gas-price-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newPriceEntry,
          gas_name: gasNameMap[newPriceEntry.gas_type] || 'Gas Dân Dụng 12kg'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess('Đã lưu nhật ký và ghi chú điều chỉnh giá gas thành công!');
        fetchPriceHistory();
        setNewPriceEntry(prev => ({ ...prev, notes: '' }));
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lỗi thêm nhật ký giá');
      }
    } catch (err) {
      setError('Lỗi kết nối khi lưu nhật ký giá');
    }
  };

  const handleDeletePriceEntry = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa dòng nhật ký lịch sử giá này?')) return;
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/gas-price-history?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Đã xóa dòng nhật ký giá.');
        fetchPriceHistory();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Lỗi khi xóa nhật ký giá');
    }
  };

  const [settings, setSettings] = useState({
    // Promo announcement bar
    show_promo_bar: '0',
    promo_bar_text: '🔥 Đổi gas hôm nay - Tặng ngay bộ van khóa tự động bảo vệ an toàn cho cả gia đình!',

    // General & Contact
    company_name: '',
    phone: '',
    email: '',
    address: '',
    working_hours: '',
    slogan: '',
    google_maps_embed: '',
    logo_url: '',
    favicon_url: '',
    footer_copyright: '',
    social_facebook: '',
    social_zalo: '',
    social_youtube: '',
    social_tiktok: '',
    
    // Homepage content
    home_feature_1_title: 'An Toàn Tuyệt Đối',
    home_feature_1_desc: 'Tất cả sản phẩm bình gas và hệ thống dẫn gas đều tuân thủ các quy định phòng cháy chữa cháy nghiêm ngặt nhất.',
    home_feature_2_title: 'Đảm Bảo Chất Lượng',
    home_feature_2_desc: 'Cam kết gas chính hãng, đủ trọng lượng, lửa xanh tiết kiệm và dịch vụ bảo trì định kỳ miễn phí cho mọi khách hàng.',
    home_feature_3_title: 'Giao Hàng Nhanh Chóng',
    home_feature_3_desc: 'Đội ngũ giao gas túc trực 24/7 sẵn sàng vận chuyển gas đến gia đình, quán ăn của bạn chỉ trong vòng 10-15 phút.',
    home_products_title: 'Sản Phẩm Nổi Bật',
    home_products_subtitle: 'Các dòng sản phẩm gas dân dụng, công nghiệp và phụ kiện chất lượng cao bán chạy nhất tại Ngọc Gas.',
    home_stat_1_num: '10+',
    home_stat_1_label: 'Năm kinh nghiệm',
    home_stat_2_num: '5.000+',
    home_stat_2_label: 'Khách hàng tin dùng',
    home_stat_3_num: '50+',
    home_stat_3_label: 'Đại lý và đối tác',
    home_stat_4_num: '24/7',
    home_stat_4_label: 'Phục vụ liên tục',
    home_news_title: 'Tin Tức & Kiến Thức',
    home_news_subtitle: 'Cập nhật tin tức khuyến mãi mới nhất và cẩm nang hướng dẫn sử dụng gas an toàn trong nhà bếp.',
    home_cta_title: 'Bạn Cần Hỗ Trợ Tư Vấn Hoặc Báo Giá Hệ Thống Gas?',
    home_cta_desc: 'Ngọc Gas cung cấp dịch vụ khảo sát và thiết kế hệ thống gas công nghiệp miễn phí tại TP. HCM & Bình Dương.',
    home_cta_phone: '19009396',
    featured_product_ids: '[]',
    featured_gas_ids: '[]',
    featured_other_ids: '[]',
    hero_call_title: 'Khách gọi đặt gas...',
    hero_call_desc: 'Bình Sopet 12kg Xám',
    hero_delivery_title: 'Đang giao gas...',
    hero_delivery_desc: 'Dự kiến đến trong 15 phút',
    hero_mode: 'slide',
    hero_slide_speed: '5',
    hero_video_url: '',
    hero_slide_1: '',
    hero_slide_2: '',
    hero_slide_3: '',
    hero_show_text_block: '1',
    hero_badge_text: 'Năng lượng xanh - An tâm cho mọi nhà',
    hero_title_text: 'CÔNG TY CỔ PHẦN NĂNG LƯỢNG XANH NGỌC GAS',
    hero_subtitle_text: 'Năng lượng xanh - An tâm cho mọi nhà',
    hero_btn1_text: 'Xem sản phẩm',
    hero_btn1_link: '/san-pham',
    hero_btn2_text: 'Thử đặt gas nhanh (Demo)',
    hero_show_btn2: '1',
    
    // Homepage toggles & icons
    show_home_features: '1',
    show_home_products: '1',
    show_home_stats: '1',
    show_home_news: '1',
    show_home_cta: '1',
    home_feature_1_icon: 'Shield',
    home_feature_2_icon: 'ThumbsUp',
    home_feature_3_icon: 'Truck',
    home_features_list: '[]',
    home_sections_order: '["gas-price-widget", "featured-products", "intro-features", "stats-counter", "latest-news", "cta-section"]',
    
    // Gas Price Card content customization
    home_gas_price_title: 'BẢNG GIÁ GAS THÁNG {month}/{year}',
    home_gas_price_subtitle: 'Bảng giá niêm yết chính hãng - Ngọc Gas cam kết giá tốt nhất & hỗ trợ vận chuyển nhanh 15 phút.',
    gas_card_1_badge: 'CHẤT LƯỢNG CAO',
    gas_card_1_title: 'Gas Cao Cấp 12kg',
    gas_card_1_subtitle: 'Thương hiệu Luxen Gas Bình Dương',
    gas_card_1_feat_1: 'Lửa xanh siêu xoáy & tiết kiệm gas',
    gas_card_1_feat_2: 'Vỏ bình đúc thép chịu lực chuẩn PCCC',
    gas_card_1_feat_3: 'Cân đúng 12kg đủ ký tận nhà',
    gas_card_2_badge: 'TIẾT KIỆM GIA ĐÌNH',
    gas_card_2_title: 'Gas Phổ Thông 12kg',
    gas_card_2_subtitle: 'Thương hiệu Sopet & Phoenix Gas',
    gas_card_2_feat_1: 'Giá mềm tiết kiệm chi phí đun nấu',
    gas_card_2_feat_2: 'Khí gas lọc sạch không đen đít nồi',
    gas_card_2_feat_3: 'Cân đúng 12kg đủ ký tận nhà',
    gas_card_3_badge: 'BÌNH BÒ CÔNG NGHIỆP',
    gas_card_3_title: 'Gas Công Nghiệp 45kg',
    gas_card_3_subtitle: 'Chuyên dùng cho Nhà hàng & Bếp ăn KCN',
    gas_card_3_feat_1: 'Dung tích lớn 45kg đun nấu liên tục',
    gas_card_3_feat_2: 'Áp suất gas mạnh mẽ cho bếp khè',
    gas_card_3_feat_3: 'Hỗ trợ kỹ thuật & giao nhận tận nơi',
    
    // About page content
    about_hero_title: 'Về Ngọc Gas',
    about_hero_desc: 'Hành trình xây dựng thương hiệu gas uy tín, an toàn và tận tâm tại TP. HCM & Bình Dương.',
    about_history_title: 'Lịch Sử Hình Thành',
    about_history: 'Ngọc Gas được thành lập từ những năm đầu khi TP. HCM bắt đầu phát triển mạnh mẽ về hạ tầng và dịch vụ. Trải qua hơn 10 năm hoạt động và phát triển, chúng tôi tự hào là đơn vị cung cấp gas uy tín và hệ thống gas công nghiệp đạt chuẩn an toàn phòng cháy chữa cháy tại TP. HCM & Bình Dương.',
    about_intro_partner_title: 'Đối tác năng lượng',
    about_intro_partner_desc: 'Chúng tôi là đối tác tin cậy cung cấp hệ thống gas công nghiệp cho hàng trăm nhà hàng, khách sạn lớn tại TP. HCM & Bình Dương.',
    about_vision_title: 'Tầm Nhìn',
    about_vision: 'Trở thành thương hiệu cung cấp sản phẩm gas và giải pháp thi công hệ thống gas uy tín tại TP. HCM & Bình Dương, được khách hàng tin tưởng lựa chọn nhờ sự uy tín, chuyên nghiệp và tiêu chuẩn an toàn cao nhất.',
    about_mission_title: 'Sứ Mệnh',
    about_mission: 'Cung cấp giải pháp năng lượng hiệu quả, sạch và an toàn cho cộng đồng. Góp phần vào sự phát triển bền vững của TP. HCM & Bình Dương bằng cách nâng cao tiêu chuẩn an toàn sử dụng gas trong sinh hoạt và sản xuất kinh doanh.',
    about_value_title: 'Giá Trị Cốt Lõi',
    about_value_subtitle: 'Những nguyên tắc định hướng cho mọi hành động và dịch vụ của chúng tôi.',
    about_value_1_title: 'An Toàn',
    about_value_1_desc: 'Là ưu tiên số một trong mọi hoạt động của công ty. An toàn cho nhân viên, cho khách hàng và cho cộng đồng.',
    about_value_2_title: 'Tận Tâm',
    about_value_2_desc: 'Luôn đặt lợi ích và sự an tâm của khách hàng lên vị trí ưu tiên. Phục vụ chu đáo, hỗ trợ kịp thời 24/7.',
    about_value_3_title: 'Chất Lượng',
    about_value_3_desc: 'Đảm bảo nguồn gas chính hãng từ các thương hiệu lớn như Petrolimex, Shell, đủ cân nặng, chất lượng ổn định.',
    about_cta_title: 'Đồng hành cùng sự phát triển của bạn',
    about_cta_desc: 'Hãy để Ngọc Gas mang đến giải pháp năng lượng tối ưu, an toàn nhất cho nhà bếp của bạn.',
    about_cta_btn: 'Liên hệ ngay với chúng tôi'
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaModalConfig, setMediaModalConfig] = useState({ isOpen: false, targetKey: '' });

  const openMediaLibrary = (targetKey) => {
    setMediaModalConfig({ isOpen: true, targetKey });
  };

  const handleSelectMediaImage = (url) => {
    if (mediaModalConfig.targetKey) {
      const key = mediaModalConfig.targetKey;
      setSettings(prev => ({ ...prev, [key]: url }));
      const token = localStorage.getItem('ngoc_gas_admin_token');
      fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ [key]: url })
      });
      setSuccess('🎉 Đã chọn và lưu ảnh mới từ Thư viện thành công!');
      setShowSaveSuccessModal(true);
    }
  };

  const renderImageUploadField = (fieldKey, fieldLabel, placeholder, isVideo = false) => {
    const value = settings[fieldKey] || '';
    return (
      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label-new">{fieldLabel}</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            name={fieldKey}
            className="form-control-new"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={() => openMediaLibrary(fieldKey)}
            className="btn-add-album-new"
            style={{ margin: 0, whiteSpace: 'nowrap', cursor: 'pointer', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E293B', display: 'inline-flex', alignItems: 'center', gap: '6px', height: '42px', padding: '0 14px' }}
          >
            <ImageIcon size={15} color="#FF6B00" />
            <span>Thư viện</span>
          </button>
          <label className="btn-add-album-new" style={{ margin: 0, whiteSpace: 'nowrap', cursor: 'pointer', height: '42px', padding: '0 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Upload size={15} />
            <span>{uploading ? 'Đang tải...' : 'Tải tệp mới'}</span>
            <input
              type="file"
              accept={isVideo ? 'video/*' : 'image/*'}
              onChange={(e) => handleGenericFileUpload(e, fieldKey)}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>

        {value && (
          <div style={{ marginTop: '10px', padding: '12px 14px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>
                🟢 Link tệp vừa lưu:
              </span>
              <button
                type="button"
                onClick={() => { navigator.clipboard.writeText(value); alert('Đã sao chép link!'); }}
                style={{ padding: '3px 8px', fontSize: '11px', background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', borderRadius: '4px', cursor: 'pointer', fontWeight: '700' }}
              >
                📋 Sao chép link
              </button>
            </div>
            <code style={{ display: 'block', wordBreak: 'break-all', fontSize: '12px', background: '#FFFFFF', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '4px', color: '#0F172A', fontWeight: '700', marginBottom: '8px' }}>
              {value}
            </code>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Xem trước:</span>
              {isVideo ? (
                <video src={value} controls style={{ height: '60px', width: 'auto', borderRadius: '4px' }} />
              ) : (
                <img src={value} alt="Preview" style={{ height: '40px', maxWidth: '180px', objectFit: 'contain', background: '#1A202C', padding: '4px', borderRadius: '4px' }} />
              )}
              <button
                type="button"
                onClick={() => {
                  setSettings(prev => ({ ...prev, [fieldKey]: '' }));
                  const token = localStorage.getItem('ngoc_gas_admin_token');
                  fetch('/api/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ [fieldKey]: '' })
                  });
                }}
                style={{ padding: '4px 8px', fontSize: '11px', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: '4px', cursor: 'pointer', fontWeight: '700' }}
              >
                🗑️ Xóa tệp
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const token = localStorage.getItem('ngoc_gas_admin_token');
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const res = await fetch('/api/settings', {
          headers
        });
        const data = await res.json();

        let loadedSettings = {};
        if (data.success && data.data) {
          loadedSettings = data.data;
        } else {
          setError('Không thể lấy thông tin cấu hình website.');
        }

        let loadedProducts = [];
        const resProd = await fetch('/api/products', { headers });
        const dataProd = await resProd.json();
        if (dataProd.success) {
          setAllProducts(dataProd.data);
          loadedProducts = dataProd.data;
        }

        // Apply loaded values with fallbacks and handle old product migration!
        setSettings((prev) => {
          const updated = { ...prev };
          Object.keys(prev).forEach((key) => {
            if (loadedSettings[key] !== undefined && loadedSettings[key] !== '') {
              updated[key] = loadedSettings[key];
            }
          });

          // Check if new keys are empty and old key is not
          const oldIdsStr = loadedSettings.featured_product_ids || '[]';
          const gasIdsStr = loadedSettings.featured_gas_ids || '[]';
          const otherIdsStr = loadedSettings.featured_other_ids || '[]';

          if (gasIdsStr === '[]' && otherIdsStr === '[]' && oldIdsStr !== '[]' && loadedProducts.length > 0) {
            try {
              const oldIds = JSON.parse(oldIdsStr).map(id => Number(id));
              const migratedGas = [];
              const migratedOther = [];

              oldIds.forEach(id => {
                const prod = loadedProducts.find(p => Number(p.id) === id);
                if (prod) {
                  const catName = (prod.category_name || '').toLowerCase();
                  const isGas = catName.includes('gas') || [1, 2, 4].includes(Number(prod.category_id));
                  if (isGas) {
                    migratedGas.push(id);
                  } else {
                    migratedOther.push(id);
                  }
                }
              });

              updated.featured_gas_ids = JSON.stringify(migratedGas);
              updated.featured_other_ids = JSON.stringify(migratedOther);
              console.log('Migrated old product selections:', { migratedGas, migratedOther });
            } catch (e) {
              console.error('Error migrating old selections:', e);
            }
          }

          // Parse or initialize home_features_list
          let parsedFeatures = [];
          try {
            if (loadedSettings.home_features_list) {
              parsedFeatures = JSON.parse(loadedSettings.home_features_list);
            }
          } catch (e) {}

          if (!Array.isArray(parsedFeatures) || parsedFeatures.length === 0) {
            const defaultFeatures = [
              {
                id: 'feat_1',
                title: loadedSettings.home_feature_1_title || 'An Toàn Tuyệt Đối',
                desc: loadedSettings.home_feature_1_desc || 'Tất cả sản phẩm bình gas và hệ thống dẫn gas đều tuân thủ các quy định phòng cháy chữa cháy nghiêm ngặt nhất.',
                icon: loadedSettings.home_feature_1_icon || 'Shield'
              },
              {
                id: 'feat_2',
                title: loadedSettings.home_feature_2_title || 'Đảm Bảo Chất Lượng',
                desc: loadedSettings.home_feature_2_desc || 'Cam kết gas chính hãng, đủ trọng lượng, lửa xanh tiết kiệm và dịch vụ bảo trì định kỳ miễn phí cho mọi khách hàng.',
                icon: loadedSettings.home_feature_2_icon || 'ThumbsUp'
              },
              {
                id: 'feat_3',
                title: loadedSettings.home_feature_3_title || 'Giao Hàng Nhanh Chóng',
                desc: loadedSettings.home_feature_3_desc || 'Đội ngũ giao gas túc trực 24/7 sẵn sàng vận chuyển gas đến gia đình, quán ăn của bạn chỉ trong vòng 10-15 phút.',
                icon: loadedSettings.home_feature_3_icon || 'Truck'
              }
            ];
            updated.home_features_list = JSON.stringify(defaultFeatures);
          } else {
            updated.home_features_list = JSON.stringify(parsedFeatures);
          }

          return updated;
        });

      } catch (err) {
        console.error(err);
        setError('Lỗi kết nối API cấu hình.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    fetchPriceHistory();
  }, []);

  const getFeaturesList = () => {
    try {
      if (settings.home_features_list) {
        const arr = JSON.parse(settings.home_features_list);
        if (Array.isArray(arr)) return arr;
      }
    } catch(e) {}
    return [];
  };

  const handleAddFeatureItem = () => {
    const current = getFeaturesList();
    const newItem = {
      id: 'feat_' + Date.now(),
      title: 'Đặc điểm mới',
      desc: 'Mô tả chi tiết cho đặc điểm này...',
      icon: 'Flame'
    };
    const updated = [...current, newItem];
    setSettings(prev => ({ ...prev, home_features_list: JSON.stringify(updated) }));
  };

  const handleRemoveFeatureItem = (index) => {
    const current = getFeaturesList();
    const updated = current.filter((_, idx) => idx !== index);
    setSettings(prev => ({ ...prev, home_features_list: JSON.stringify(updated) }));
  };

  const handleUpdateFeatureItem = (index, field, value) => {
    const current = getFeaturesList();
    const updated = current.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setSettings(prev => ({ ...prev, home_features_list: JSON.stringify(updated) }));
  };

  const [openFeatureIds, setOpenFeatureIds] = useState({});

  const toggleFeatureCollapse = (id) => {
    setOpenFeatureIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const collapseAllFeatures = () => {
    setOpenFeatureIds({});
  };

  const expandAllFeatures = () => {
    const list = getFeaturesList();
    const map = {};
    list.forEach((item, idx) => {
      const idKey = item.id || idx;
      map[idKey] = true;
    });
    setOpenFeatureIds(map);
  };

  // Section collapse state: default is empty object {} -> ALL SECTIONS COLLAPSED BY DEFAULT!
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const expandAllTabSections = (sectionIds) => {
    const next = { ...openSections };
    sectionIds.forEach(id => { next[id] = true; });
    setOpenSections(next);
  };

  const collapseAllTabSections = (sectionIds) => {
    const next = { ...openSections };
    sectionIds.forEach(id => { next[id] = false; });
    setOpenSections(next);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId) => {
    let currentSelected = [];
    try {
      currentSelected = JSON.parse(settings.featured_product_ids || '[]')
        .map(id => Number(id))
        .filter(id => !isNaN(id));
    } catch (e) {
      currentSelected = [];
    }

    const numericProductId = Number(productId);
    if (currentSelected.includes(numericProductId)) {
      currentSelected = currentSelected.filter(id => id !== numericProductId);
    } else {
      currentSelected.push(numericProductId);
    }

    setSettings(prev => ({
      ...prev,
      featured_product_ids: JSON.stringify(currentSelected)
    }));
  };

  const handleGasProductSelect = (productId) => {
    let currentSelected = [];
    try {
      currentSelected = JSON.parse(settings.featured_gas_ids || '[]')
        .map(id => Number(id))
        .filter(id => !isNaN(id));
    } catch (e) {
      currentSelected = [];
    }

    const numericProductId = Number(productId);
    if (currentSelected.includes(numericProductId)) {
      currentSelected = currentSelected.filter(id => id !== numericProductId);
    } else {
      if (currentSelected.length >= 4) {
        alert('Chỉ chọn tối đa 4 bình gas nổi bật.');
        return;
      }
      currentSelected.push(numericProductId);
    }

    setSettings(prev => ({
      ...prev,
      featured_gas_ids: JSON.stringify(currentSelected)
    }));
  };

  const handleOtherProductSelect = (productId) => {
    let currentSelected = [];
    try {
      currentSelected = JSON.parse(settings.featured_other_ids || '[]')
        .map(id => Number(id))
        .filter(id => !isNaN(id));
    } catch (e) {
      currentSelected = [];
    }

    const numericProductId = Number(productId);
    if (currentSelected.includes(numericProductId)) {
      currentSelected = currentSelected.filter(id => id !== numericProductId);
    } else {
      if (currentSelected.length >= 4) {
        alert('Chỉ chọn tối đa 4 phụ kiện/thiết bị nổi bật.');
        return;
      }
      currentSelected.push(numericProductId);
    }

    setSettings(prev => ({
      ...prev,
      featured_other_ids: JSON.stringify(currentSelected)
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        setSettings(prev => ({ ...prev, logo_url: data.url }));
        // Auto save immediately
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ logo_url: data.url })
        });
        setSuccess('🎉 Đã tải và lưu Logo mới thành công!');
        setShowSaveSuccessModal(true);
      } else {
        setError(data.message || 'Lỗi khi upload logo');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload logo.');
    } finally {
      setUploading(false);
    }
  };

  const handleFaviconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        setSettings(prev => ({ ...prev, favicon_url: data.url }));
        // Auto save immediately
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ favicon_url: data.url })
        });
        setSuccess('🎉 Đã tải và lưu Favicon mới thành công!');
        setShowSaveSuccessModal(true);
      } else {
        setError(data.message || 'Lỗi khi upload favicon');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload favicon.');
    } finally {
      setUploading(false);
    }
  };

  const handleGenericFileUpload = async (e, keyName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        setSettings(prev => ({ ...prev, [keyName]: data.url }));
        // Auto save immediately for all file uploads
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ [keyName]: data.url })
        });
        setSuccess('🎉 Đã tải tệp lên và tự động lưu cấu hình thành công!');
        setShowSaveSuccessModal(true);
      } else {
        setError(data.message || 'Lỗi khi upload file');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('🎉 ĐÃ LƯU CẤU HÌNH WEBSITE THÀNH CÔNG!');
        setShowSaveSuccessModal(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.message || 'Lưu cài đặt thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi hệ thống khi lưu cài đặt.');
    } finally {
      setSaving(false);
    }
  };

  const getNormalizedSectionOrder = (jsonStr) => {
    const ALL_SECTIONS = ["gas-price-widget", "intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"];
    let order = [];
    try {
      order = JSON.parse(jsonStr || '[]');
    } catch(e) {
      order = [];
    }
    if (!Array.isArray(order) || order.length === 0) {
      return [...ALL_SECTIONS];
    }

    order = order.filter(id => ALL_SECTIONS.includes(id));
    if (!order.includes('gas-price-widget')) {
      order.unshift('gas-price-widget');
    }
    ALL_SECTIONS.forEach(id => {
      if (!order.includes(id)) {
        order.push(id);
      }
    });

    return order;
  };

  const handleMoveSection = async (index, direction) => {
    const order = getNormalizedSectionOrder(settings.home_sections_order);
    const newOrder = [...order];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    const newOrderJson = JSON.stringify(newOrder);

    setSettings(prev => ({
      ...prev,
      home_sections_order: newOrderJson
    }));

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ home_sections_order: newOrderJson })
      });
      setSuccess('🎉 Đã cập nhật và lưu vị trí thứ tự hiển thị mới ra ngoài Website thành công!');
      setShowSaveSuccessModal(true);
    } catch (err) {
      console.error('Lỗi tự động lưu vị trí khối:', err);
    }
  };

  const handleToggleSectionVisibility = async (statusKey, isHidden) => {
    const newValue = isHidden ? '1' : '0';
    setSettings(prev => ({ ...prev, [statusKey]: newValue }));

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ [statusKey]: newValue })
      });
      setSuccess(`🎉 Đã ${newValue === '1' ? 'BẬT' : 'ẨN'} khối hiển thị trên Website thành công!`);
      setShowSaveSuccessModal(true);
    } catch (err) {
      console.error('Lỗi tự động lưu ẩn hiện khối:', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-panel">
        <div className="loading-spinner"></div>
        <p>Đang tải cấu hình cài đặt website...</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-settings-page">
        {/* Banner Header giống trang sản phẩm */}
        <div className="admin-header-panel card">
          <div className="header-panel-left">
            <span className="panel-badge">Thiết lập hệ thống</span>
            <h1 className="panel-main-title">Cài đặt Website</h1>
            <p className="panel-subtitle">Điều chỉnh linh hoạt từng khối thông tin trên Trang chủ, Trang giới thiệu, Logo và Thông tin liên lạc toàn cục.</p>
          </div>
        </div>

        {error && (
          <div className="admin-error-banner" style={{ marginBottom: '20px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="admin-success-banner" style={{ marginBottom: '20px' }}>
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* Tab Headers điều hướng đồng bộ tab bài viết / sản phẩm */}
        <div className="status-tabs-row" style={{ marginBottom: '24px', display: 'inline-flex' }}>
          <button 
            type="button" 
            onClick={() => setActiveTab('general')} 
            className={`status-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          >
            <HelpCircle size={15} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>Cài đặt chung & Logo</span>
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('homepage')} 
            className={`status-tab-btn ${activeTab === 'homepage' ? 'active' : ''}`}
          >
            <Home size={15} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>Giao diện Trang chủ</span>
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('about')} 
            className={`status-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          >
            <Info size={15} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>Giao diện Giới thiệu</span>
          </button>
        </div>

        <div className="settings-form-wrapper">
          <form onSubmit={handleSubmit} className="settings-form">
            
            {/* ======================= TAB 1: GENERAL & LOGO ======================= */}
            {activeTab === 'general' && (
              <div className="tab-pane animate-fade-in-up">
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    💡 Các khối đang thu nhỏ mặc định. Nhấp vào tiêu đề từng khối để mở rộng chỉnh sửa.
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => collapseAllTabSections(['gen_promo', 'gen_info', 'gen_social', 'gen_logo'])}
                      className="btn-outline-new"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <Minimize2 size={13} />
                      <span>Thu nhỏ tất cả khối</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => expandAllTabSections(['gen_promo', 'gen_info', 'gen_social', 'gen_logo'])}
                      className="btn-outline-new"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <Maximize2 size={13} />
                      <span>Mở rộng tất cả khối</span>
                    </button>
                  </div>
                </div>

                <CollapsibleSection
                  id="gen_promo"
                  title="Chương trình Khuyến mãi & Quảng cáo (Promotions)"
                  subtitle="Chọn loại hình hiển thị khuyến mãi khi khách truy cập vào website của bạn."
                  isOpen={!!openSections.gen_promo}
                  onToggle={() => toggleSection('gen_promo')}
                >
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="promo_type" className="form-label-new">Loại hình hiển thị</label>
                    <select
                      id="promo_type"
                      name="promo_type"
                      className="form-control-new"
                      value={settings.promo_type}
                      onChange={handleChange}
                    >
                      <option value="none">Không hiển thị (Tắt hết)</option>
                      <option value="bar">Thanh thông báo chạy chữ trên đầu trang</option>
                      <option value="popup">Popup ảnh khuyến mãi giữa màn hình</option>
                    </select>
                  </div>

                  {settings.promo_type === 'bar' && (
                    <div className="form-group animate-fade-in-up">
                      <label htmlFor="promo_bar_text" className="form-label-new">Nội dung thông báo khuyến mãi</label>
                      <input
                        type="text"
                        id="promo_bar_text"
                        name="promo_bar_text"
                        className="form-control-new"
                        value={settings.promo_bar_text}
                        onChange={handleChange}
                        placeholder="vd: 🔥 Đổi gas hôm nay - Nhận ngay quà tặng van khóa tự động bảo vệ gia đình!"
                      />
                    </div>
                  )}

                  {settings.promo_type === 'popup' && (
                    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {renderImageUploadField('promo_popup_image', 'Ảnh Banner Popup Khuyến mãi', 'vd: /uploads/promo_banner.jpg')}

                      <div className="form-group">
                        <label htmlFor="promo_popup_link" className="form-label-new">Đường dẫn liên kết khi nhấn vào ảnh (Tùy chọn)</label>
                        <input
                          type="text"
                          id="promo_popup_link"
                          name="promo_popup_link"
                          className="form-control-new"
                          value={settings.promo_popup_link}
                          onChange={handleChange}
                          placeholder="vd: /lien-he hoặc /san-pham"
                        />
                      </div>
                    </div>
                  )}
                </CollapsibleSection>

                <CollapsibleSection
                  id="gen_info"
                  title="Thông tin cửa hàng & Liên hệ"
                  isOpen={!!openSections.gen_info}
                  onToggle={() => toggleSection('gen_info')}
                >
                  <div className="settings-grid-2">
                    <div className="form-group">
                      <label htmlFor="company_name" className="form-label-new">Tên cửa hàng / Công ty</label>
                      <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        className="form-control-new"
                        value={settings.company_name}
                        onChange={handleChange}
                        placeholder="vd: CÔNG TY TNHH NGỌC GAS"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="slogan" className="form-label-new">Slogan Banner chính</label>
                      <input
                        type="text"
                        id="slogan"
                        name="slogan"
                        className="form-control-new"
                        value={settings.slogan}
                        onChange={handleChange}
                        placeholder="Nhà cung cấp gas chuyên nghiệp, uy tín tại TP. HCM..."
                      />
                    </div>
                  </div>

                  <div className="settings-grid-2">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label-new">Hotline điện thoại</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control-new"
                        value={settings.phone}
                        onChange={handleChange}
                        placeholder="vd: 19009396"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label-new">Email liên hệ</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control-new"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="lienhe@ngocgas.com"
                      />
                    </div>
                  </div>

                  <div className="settings-grid-2">
                    <div className="form-group">
                      <label htmlFor="address" className="form-label-new">Địa chỉ văn phòng</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control-new"
                        value={settings.address}
                        onChange={handleChange}
                        placeholder="Dĩ An, Bình Dương / TP. HCM"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="working_hours" className="form-label-new">Giờ hoạt động</label>
                      <input
                        type="text"
                        id="working_hours"
                        name="working_hours"
                        className="form-control-new"
                        value={settings.working_hours}
                        onChange={handleChange}
                        placeholder="06:00 - 22:00 (Hàng ngày)"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="google_maps_embed" className="form-label-new">Mã nhúng bản đồ Google Maps (Mã HTML iframe)</label>
                    <textarea
                      id="google_maps_embed"
                      name="google_maps_embed"
                      className="form-control-new code-font-textarea"
                      rows="3"
                      value={settings.google_maps_embed}
                      onChange={handleChange}
                      placeholder="Dán thẻ <iframe> bản đồ từ Google Maps..."
                    ></textarea>
                  </div>
                </CollapsibleSection>

                <CollapsibleSection
                  id="gen_social"
                  title="Mạng xã hội (Social Media Links)"
                  isOpen={!!openSections.gen_social}
                  onToggle={() => toggleSection('gen_social')}
                >
                  <div className="settings-grid-2">
                    <div className="form-group">
                      <label htmlFor="social_facebook" className="form-label-new">Đường dẫn Facebook</label>
                      <input
                        type="text"
                        id="social_facebook"
                        name="social_facebook"
                        className="form-control-new"
                        value={settings.social_facebook || ''}
                        onChange={handleChange}
                        placeholder="vd: https://facebook.com/ngocgas"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="social_zalo" className="form-label-new">Đường dẫn Zalo (Số điện thoại hoặc link Zalo OA)</label>
                      <input
                        type="text"
                        id="social_zalo"
                        name="social_zalo"
                        className="form-control-new"
                        value={settings.social_zalo || ''}
                        onChange={handleChange}
                        placeholder="vd: https://zalo.me/19009396"
                      />
                    </div>
                  </div>
                  <div className="settings-grid-2">
                    <div className="form-group">
                      <label htmlFor="social_youtube" className="form-label-new">Đường dẫn Kênh YouTube</label>
                      <input
                        type="text"
                        id="social_youtube"
                        name="social_youtube"
                        className="form-control-new"
                        value={settings.social_youtube || ''}
                        onChange={handleChange}
                        placeholder="vd: https://youtube.com/c/ngocgas"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="social_tiktok" className="form-label-new">Đường dẫn Kênh TikTok</label>
                      <input
                        type="text"
                        id="social_tiktok"
                        name="social_tiktok"
                        className="form-control-new"
                        value={settings.social_tiktok || ''}
                        onChange={handleChange}
                        placeholder="vd: https://tiktok.com/@ngocgas"
                      />
                    </div>
                  </div>
                  {renderImageUploadField('social_zalo_qr', 'Ảnh Mã QR Zalo (Hiển thị cho khách quét kết bạn)', 'vd: /uploads/zalo_qr.jpg')}
                </CollapsibleSection>

                <CollapsibleSection
                  id="gen_logo"
                  title="Logo thương hiệu & Chân trang"
                  isOpen={!!openSections.gen_logo}
                  onToggle={() => toggleSection('gen_logo')}
                >
                  {renderImageUploadField('logo_url', 'Ảnh Logo đại diện website', 'Dán link ảnh logo hoặc bấm chọn Thư viện')}
                  {renderImageUploadField('favicon_url', 'Ảnh Favicon Website (Biểu tượng thanh địa chỉ tab trình duyệt)', 'Dán link ảnh favicon (.ico/.png) hoặc bấm chọn Thư viện')}

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="footer_copyright" className="form-label-new">Dòng bản quyền Footer Copyright</label>
                    <input
                      type="text"
                      id="footer_copyright"
                      name="footer_copyright"
                      className="form-control-new"
                      value={settings.footer_copyright}
                      onChange={handleChange}
                      placeholder="© 2026 NGỌC GAS. Bảo lưu mọi quyền."
                    />
                  </div>
                </CollapsibleSection>

              </div>
            )}

            {/* ======================= TAB 2: HOMEPAGE SETTINGS ======================= */}
            {activeTab === 'homepage' && (
              <div className="tab-pane animate-fade-in-up">
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    💡 Các khối đang thu nhỏ mặc định. Nhấp vào tiêu đề từng khối để mở rộng chỉnh sửa.
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => collapseAllTabSections(['home_hero_bg', 'home_hero_text', 'home_hero_anim', 'home_order', 'home_features', 'home_products', 'home_stats', 'home_news', 'home_cta'])}
                      className="btn-outline-new"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <Minimize2 size={13} />
                      <span>Thu nhỏ tất cả khối</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => expandAllTabSections(['home_hero_bg', 'home_hero_text', 'home_hero_anim', 'home_order', 'home_features', 'home_products', 'home_stats', 'home_news', 'home_cta'])}
                      className="btn-outline-new"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <Maximize2 size={13} />
                      <span>Mở rộng tất cả khối</span>
                    </button>
                  </div>
                </div>

                {/* Section -1: Cấu hình Banner Hero (Background Slide/Video) */}
                <CollapsibleSection
                  id="home_hero_bg"
                  title="Cấu hình Background Banner Hero (Slide/Video)"
                  isOpen={!!openSections.home_hero_bg}
                  onToggle={() => toggleSection('home_hero_bg')}
                >
                  <div className="settings-grid-2">
                    <div className="form-group">
                      <label className="form-label-new">Chế độ hiển thị Banner</label>
                      <select 
                        name="hero_mode" 
                        className="form-control-new" 
                        value={settings.hero_mode || 'slide'} 
                        onChange={handleChange}
                      >
                        <option value="slide">🎬 Ảnh dạng Slide chạy tự động</option>
                        <option value="video">🎥 Video chạy nền (Loop/Muted)</option>
                      </select>
                    </div>

                    {settings.hero_mode === 'slide' && (
                      <div className="form-group">
                        <label className="form-label-new">Tốc độ chuyển slide (giây)</label>
                        <input 
                          type="number" 
                          name="hero_slide_speed" 
                          className="form-control-new" 
                          min="1" 
                          max="60" 
                          value={settings.hero_slide_speed || '5'} 
                          onChange={handleChange} 
                          placeholder="vd: 5" 
                        />
                      </div>
                    )}
                  </div>

                  {settings.hero_mode === 'video' && (
                    renderImageUploadField('hero_video_url', 'Đường dẫn Video nền (.mp4)', 'vd: /uploads/video.mp4 hoặc link ngoài...', true)
                  )}

                  {settings.hero_mode === 'slide' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                      {renderImageUploadField('hero_slide_1', 'Hình ảnh Banner Slide 1', 'vd: /images/delivery-motorcycle.jpg')}
                      {renderImageUploadField('hero_slide_2', 'Hình ảnh Banner Slide 2', 'vd: /images/gas-cylinder.jpg')}
                      {renderImageUploadField('hero_slide_3', 'Hình ảnh Banner Slide 3 (Tùy chọn)', 'vd: /images/banner3.jpg')}
                    </div>
                  )}
                </CollapsibleSection>

                {/* Section -0.5: Cấu hình Nội dung chữ & Nút bấm Banner Hero */}
                <CollapsibleSection
                  id="home_hero_text"
                  title="Cấu hình Nội dung chữ & Nút bấm Banner Hero"
                  isOpen={!!openSections.home_hero_text}
                  onToggle={() => toggleSection('home_hero_text')}
                >
                  <div className="form-group">
                    <label className="checkbox-container-new" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
                      <input 
                        type="checkbox" 
                        name="hero_show_text_block" 
                        checked={settings.hero_show_text_block !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, hero_show_text_block: e.target.checked ? '1' : '0' }))} 
                        style={{ cursor: 'pointer' }}
                      />
                      <span className="checkbox-label-new" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>Hiển thị khối nội dung chữ và nút bấm trên Banner</span>
                    </label>
                  </div>

                  {settings.hero_show_text_block !== '0' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
                      <div className="settings-grid-2">
                        <div className="form-group">
                          <label className="form-label-new">Nhãn phụ phía trên (Badge)</label>
                          <input 
                            type="text" 
                            name="hero_badge_text" 
                            className="form-control-new" 
                            value={settings.hero_badge_text || ''} 
                            onChange={handleChange} 
                            placeholder="vd: Năng lượng xanh - An tâm cho mọi nhà" 
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label-new">Tiêu đề chính Banner (H1)</label>
                          <input 
                            type="text" 
                            name="hero_title_text" 
                            className="form-control-new" 
                            value={settings.hero_title_text || ''} 
                            onChange={handleChange} 
                            placeholder="Để trống sẽ tự động lấy Tên công ty" 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label-new">Mô tả phụ Banner</label>
                        <textarea 
                          name="hero_subtitle_text" 
                          className="form-control-new" 
                          rows="2"
                          value={settings.hero_subtitle_text || ''} 
                          onChange={handleChange} 
                          placeholder="Để trống sẽ tự động lấy Slogan công ty" 
                        ></textarea>
                      </div>

                      <div className="form-card-sub-new">
                        <strong className="sub-card-header-new">Cấu hình Nút hành động 1 (Xem sản phẩm)</strong>
                        <div className="settings-grid-2" style={{ marginTop: '10px' }}>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label-new">Tên nút bấm 1</label>
                            <input 
                              type="text" 
                              name="hero_btn1_text" 
                              className="form-control-new" 
                              value={settings.hero_btn1_text || ''} 
                              onChange={handleChange} 
                              placeholder="vd: Xem sản phẩm" 
                            />
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label-new">Liên kết nút bấm 1</label>
                            <input 
                              type="text" 
                              name="hero_btn1_link" 
                              className="form-control-new" 
                              value={settings.hero_btn1_link || ''} 
                              onChange={handleChange} 
                              placeholder="vd: /san-pham" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-card-sub-new">
                        <strong className="sub-card-header-new">Cấu hình Nút hành động 2 (Chạy thử đặt gas nhanh)</strong>
                        <div className="form-group" style={{ marginTop: '10px' }}>
                          <label className="checkbox-container-new" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
                            <input 
                              type="checkbox" 
                              name="hero_show_btn2" 
                              checked={settings.hero_show_btn2 !== '0'} 
                              onChange={(e) => setSettings(prev => ({ ...prev, hero_show_btn2: e.target.checked ? '1' : '0' }))} 
                              style={{ cursor: 'pointer' }}
                            />
                            <span className="checkbox-label-new" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text)' }}>Hiển thị nút bấm Demo đặt gas nhanh</span>
                          </label>
                        </div>
                        
                        {settings.hero_show_btn2 !== '0' && (
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label-new">Tên nút bấm 2</label>
                            <input 
                              type="text" 
                              name="hero_btn2_text" 
                              className="form-control-new" 
                              value={settings.hero_btn2_text || ''} 
                              onChange={handleChange} 
                              placeholder="vd: Thử đặt gas nhanh (Demo)" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CollapsibleSection>

                {/* Sắp xếp thứ tự hiển thị các khối */}
                <CollapsibleSection
                  id="home_order"
                  title="🎨 Sắp xếp thứ tự hiển thị các khối nội dung trên Trang chủ"
                  subtitle="Nhấn vào các nút Mũi tên ⬆️ Lên / ⬇️ Xuống để thay đổi vị trí xuất hiện của 6 khối nội dung ngoài Trang chủ."
                  isOpen={!!openSections.home_order}
                  onToggle={() => toggleSection('home_order')}
                >
                  <div className="sections-order-list-new" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(() => {
                      const order = getNormalizedSectionOrder(settings.home_sections_order);

                      const sectionConfig = {
                        'gas-price-widget': {
                          title: '🔥 Khối 1: Bảng Giá Gas & Lịch Sử Biến Động Giá',
                          bg: '#FFF7ED',
                          border: '#FFD8A8',
                          color: '#C2410C'
                        },
                        'intro-features': {
                          title: '🛡️ Khối 2: Cẩm Nang & Hướng Dẫn An Toàn (FAQs & Cam Kết)',
                          bg: '#FEF2F2',
                          border: '#FCA5A5',
                          color: '#B91C1C'
                        },
                        'featured-products': {
                          title: '📦 Khối 3: Sản Phẩm Nổi Bật (Tabs Gas & Phụ Kiện)',
                          bg: '#EFF6FF',
                          border: '#BFDBFE',
                          color: '#1D4ED8'
                        },
                        'stats-counter': {
                          title: '⭐ Khối 4: Cảm Nhận Khách Hàng (Testimonials Slider)',
                          bg: '#FFFBEB',
                          border: '#FDE68A',
                          color: '#B45309'
                        },
                        'latest-news': {
                          title: '📰 Khối 5: Tin Tức & Cẩm Nang Kinh Nghiệm',
                          bg: '#ECFDF5',
                          border: '#A7F3D0',
                          color: '#047857'
                        },
                        'cta-section': {
                          title: '📞 Khối 6: Banner Kêu Gọi Đổi Gas (CTA Hotline)',
                          bg: '#F3E8FF',
                          border: '#DDD6FE',
                          color: '#6D28D9'
                        }
                      };

                      const statusKeys = {
                        'gas-price-widget': 'show_home_gas_price',
                        'intro-features': 'show_home_features',
                        'featured-products': 'show_home_products',
                        'stats-counter': 'show_home_stats',
                        'latest-news': 'show_home_news',
                        'cta-section': 'show_home_cta'
                      };

                      return order.map((sectionId, index) => {
                        const cfg = sectionConfig[sectionId] || { title: sectionId, bg: '#F8FAFC', border: '#E2E8F0', color: '#0F172A' };
                        const isHidden = settings[statusKeys[sectionId]] === '0';

                        return (
                          <div 
                            key={sectionId} 
                            style={{ 
                              display: 'flex', 
                              justify: 'space-between', 
                              alignItems: 'center', 
                              padding: '14px 18px', 
                              borderRadius: '10px', 
                              background: isHidden ? '#F1F5F9' : cfg.bg, 
                              border: `2px solid ${isHidden ? '#CBD5E1' : cfg.border}`,
                              opacity: isHidden ? 0.65 : 1,
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <span 
                                style={{ 
                                  width: '28px', 
                                  height: '28px', 
                                  borderRadius: '50%', 
                                  background: isHidden ? '#94A3B8' : cfg.color, 
                                  color: '#FFF', 
                                  fontSize: '13px', 
                                  fontWeight: '800', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  flexShrink: 0 
                                }}
                              >
                                {index + 1}
                              </span>

                              <div>
                                <strong style={{ fontSize: '14px', fontWeight: '800', color: isHidden ? '#64748B' : cfg.color }}>
                                  {cfg.title}
                                </strong>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleToggleSectionVisibility(statusKeys[sectionId], isHidden)}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: '12px',
                                  background: isHidden ? '#EF4444' : '#10B981',
                                  color: '#FFF',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                                }}
                                title={isHidden ? "Nhấp để BẬT hiển thị khối này" : "Nhấp để ẨN khối này"}
                              >
                                {isHidden ? '🔴 Đang ẩn (Click để mở)' : '🟢 Đang hiện (Click để ẩn)'}
                              </button>
                            </div>

                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button 
                                type="button"
                                onClick={() => handleMoveSection(index, -1)} 
                                disabled={index === 0}
                                style={{ 
                                  padding: '6px 12px', 
                                  borderRadius: '6px', 
                                  border: '1px solid #CBD5E1', 
                                  background: '#FFF', 
                                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                                  opacity: index === 0 ? 0.4 : 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '12px',
                                  fontWeight: '700',
                                  color: '#334155'
                                }}
                                title="Di chuyển lên trên"
                              >
                                <ArrowUp size={16} />
                                <span>Lên</span>
                              </button>

                              <button 
                                type="button"
                                onClick={() => handleMoveSection(index, 1)} 
                                disabled={index === order.length - 1}
                                style={{ 
                                  padding: '6px 12px', 
                                  borderRadius: '6px', 
                                  border: '1px solid #CBD5E1', 
                                  background: '#FFF', 
                                  cursor: index === order.length - 1 ? 'not-allowed' : 'pointer',
                                  opacity: index === order.length - 1 ? 0.4 : 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '12px',
                                  fontWeight: '700',
                                  color: '#334155'
                                }}
                                title="Di chuyển xuống dưới"
                              >
                                <ArrowDown size={16} />
                                <span>Xuống</span>
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </CollapsibleSection>

                {/* Section: Quản lý Nhật Ký Biến Động Giá Gas */}
                <CollapsibleSection
                  id="home_gas_price"
                  title="Khối Bảng Giá Gas & Nhật Ký Biến Động Giá"
                  subtitle="Thiết lập trạng thái hiển thị và tự động đồng bộ lịch sử tăng/giảm giá gas ngoài trang chủ."
                  isOpen={!!openSections.home_gas_price}
                  onToggle={() => toggleSection('home_gas_price')}
                  toggleSwitch={(
                    <label className="toggle-switch-wrapper-new">
                      <input 
                        type="checkbox" 
                        name="show_home_gas_price" 
                        checked={settings.show_home_gas_price !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, show_home_gas_price: e.target.checked ? '1' : '0' }))} 
                      />
                      <span className="toggle-slider-new"></span>
                      <span className="toggle-label-text-new">
                        {settings.show_home_gas_price !== '0' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </label>
                  )}
                >
                  {/* Card: Chỉnh sửa Nội Dung & Tiêu Đề Bảng Giá Gas */}
                  <div className="form-card-sub-new" style={{ marginBottom: '20px' }}>
                    <strong className="sub-card-header-new">✏️ Chỉnh Sửa Tiêu Đề & Nội Dung Từng Dòng Giá Gas</strong>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                      Tại đây bạn có thể tùy chỉnh tiêu đề khối, nhãn góc thẻ, tên gọi từng dòng gas, phụ đề thương hiệu và các dòng ưu điểm nổi bật ngoài trang chủ.
                    </p>

                    {/* Tiêu đề chung */}
                    <div className="settings-grid-2" style={{ marginBottom: '16px' }}>
                      <div className="form-group">
                        <label className="form-label-new">Nhãn nhỏ trên tiêu đề (Tag badge)</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_gas_price_tag_badge || 'Bảng Giá Niêm Yết Giá Thấp Nhất'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_gas_price_tag_badge: e.target.value }))}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label-new">Nhãn cam kết góc phải (Trust badge)</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_gas_price_trust_badge || '100% Chính Hãng Sopet, Phoenix, Luxen'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_gas_price_trust_badge: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="settings-grid-2" style={{ marginBottom: '16px' }}>
                      <div className="form-group">
                        <label className="form-label-new">Tiêu đề chính khối bảng giá</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_gas_price_title || 'BẢNG GIÁ GAS THÁNG {month}/{year}'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_gas_price_title: e.target.value }))}
                          placeholder="vd: BẢNG GIÁ GAS THÁNG {month}/{year}"
                        />
                        <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'block' }}>Dùng {'{month}'} và {'{year}'} để tự động hiện tháng/năm hiện tại.</span>
                      </div>

                      <div className="form-group">
                        <label className="form-label-new">Dòng ghi chú chân bảng giá (Footnote)</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_gas_price_footnote || '* Giá gas được cập nhật tự động theo giá ưu đãi thị trường. Đã bao gồm thuế VAT, giao hàng và cân thử tại nhà ở Dĩ An, Thuận An, VietSing, TP. Hồ Chí Minh & Bình Dương.'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_gas_price_footnote: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Từng mục / Thẻ giá gas */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
                      
                      {/* Thẻ 1 */}
                      <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <strong style={{ fontSize: '14px', color: '#FF6B00', display: 'block', marginBottom: '10px' }}>🔥 1. Mục 1: Gas Cao Cấp 12kg (Luxen Gas)</strong>
                        <div className="settings-grid-3" style={{ marginBottom: '10px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                          <div className="form-group">
                            <label className="form-label-new">Nhãn góc thẻ</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_1_badge || 'CHẤT LƯỢNG CAO'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_1_badge: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Tên dòng gas</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_1_title || 'Gas Cao Cấp 12kg'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_1_title: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Phụ đề thương hiệu</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_1_subtitle || 'Thương hiệu Luxen Gas Bình Dương'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_1_subtitle: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 1</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_1_feat_1 || 'Lửa xanh siêu xoáy & tiết kiệm gas'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_1_feat_1: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 2</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_1_feat_2 || 'Vỏ bình đúc thép chịu lực chuẩn PCCC'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_1_feat_2: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 3</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_1_feat_3 || 'Cân đúng 12kg đủ ký tận nhà'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_1_feat_3: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Thẻ 2 */}
                      <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <strong style={{ fontSize: '14px', color: '#10B981', display: 'block', marginBottom: '10px' }}>🟢 2. Mục 2: Gas Phổ Thông 12kg (Sopet & Phoenix)</strong>
                        <div className="settings-grid-3" style={{ marginBottom: '10px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                          <div className="form-group">
                            <label className="form-label-new">Nhãn góc thẻ</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_2_badge || 'TIẾT KIỆM GIA ĐÌNH'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_2_badge: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Tên dòng gas</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_2_title || 'Gas Phổ Thông 12kg'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_2_title: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Phụ đề thương hiệu</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_2_subtitle || 'Thương hiệu Sopet & Phoenix Gas'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_2_subtitle: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 1</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_2_feat_1 || 'Giá mềm tiết kiệm chi phí đun nấu'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_2_feat_1: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 2</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_2_feat_2 || 'Khí gas lọc sạch không đen đít nồi'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_2_feat_2: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 3</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_2_feat_3 || 'Cân đúng 12kg đủ ký tận nhà'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_2_feat_3: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Thẻ 3 */}
                      <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <strong style={{ fontSize: '14px', color: '#6366F1', display: 'block', marginBottom: '10px' }}>🟣 3. Mục 3: Gas Công Nghiệp 45kg (Luxen 45kg)</strong>
                        <div className="settings-grid-3" style={{ marginBottom: '10px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                          <div className="form-group">
                            <label className="form-label-new">Nhãn góc thẻ</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_3_badge || 'BÌNH BÒ CÔNG NGHIỆP'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_3_badge: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Tên dòng gas</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_3_title || 'Gas Công Nghiệp 45kg'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_3_title: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Phụ đề thương hiệu</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_3_subtitle || 'Chuyên dùng cho Nhà hàng & Bếp ăn KCN'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_3_subtitle: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 1</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_3_feat_1 || 'Dung tích lớn 45kg đun nấu liên tục'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_3_feat_1: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 2</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_3_feat_2 || 'Áp suất gas mạnh mẽ cho bếp khè'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_3_feat_2: e.target.value }))}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label-new">Ưu điểm 3</label>
                            <input 
                              type="text" 
                              className="form-control-new" 
                              value={settings.gas_card_3_feat_3 || 'Hỗ trợ kỹ thuật & giao nhận tận nơi'}
                              onChange={(e) => setSettings(prev => ({ ...prev, gas_card_3_feat_3: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="form-card-sub-new" style={{ marginBottom: '20px' }}>
                    <strong className="sub-card-header-new">➕ Thêm Nhật Ký Biến Động Giá Mới</strong>
                    <form onSubmit={handleAddPriceEntry} style={{ marginTop: '12px' }}>
                      <div className="settings-grid-2" style={{ marginBottom: '12px' }}>
                        <div className="form-group">
                          <label className="form-label-new">Chủng loại Gas</label>
                          <select 
                            className="form-control-new" 
                            value={newPriceEntry.gas_type}
                            onChange={(e) => setNewPriceEntry(prev => ({ ...prev, gas_type: e.target.value }))}
                          >
                            <option value="luxen-12kg">Gas Cao Cấp 12kg (Luxen Gas)</option>
                            <option value="phothong-12kg">Gas Phổ Thông 12kg (Sopet & Phoenix)</option>
                            <option value="congnghiep-45kg">Gas Công Nghiệp 45kg (Luxen 45kg)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label-new">Thời gian áp dụng (Tháng/Năm)</label>
                          <input 
                            type="text" 
                            className="form-control-new" 
                            value={newPriceEntry.effective_month}
                            onChange={(e) => setNewPriceEntry(prev => ({ ...prev, effective_month: e.target.value }))}
                            placeholder="vd: Tháng 9/2026"
                            required
                          />
                        </div>
                      </div>

                      <div className="settings-grid-3" style={{ marginBottom: '12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label-new">Giá bán niêm yết (VNĐ)</label>
                          <input 
                            type="number" 
                            className="form-control-new" 
                            value={newPriceEntry.sale_price}
                            onChange={(e) => setNewPriceEntry(prev => ({ ...prev, sale_price: e.target.value, price: e.target.value }))}
                            placeholder="vd: 395000"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label-new">Biến động giá</label>
                          <select 
                            className="form-control-new" 
                            value={newPriceEntry.change_type}
                            onChange={(e) => setNewPriceEntry(prev => ({ ...prev, change_type: e.target.value }))}
                          >
                            <option value="up">🔺 Tăng giá (+)</option>
                            <option value="down">🔻 Giảm giá (-)</option>
                            <option value="same">➖ Giữ nguyên giá</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label-new">Mức tăng/giảm (VNĐ)</label>
                          <input 
                            type="number" 
                            className="form-control-new" 
                            value={newPriceEntry.change_amount}
                            onChange={(e) => setNewPriceEntry(prev => ({ ...prev, change_amount: e.target.value }))}
                            placeholder="vd: 5000"
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-primary-new" style={{ padding: '8px 18px', fontSize: '13px' }}>
                        <Plus size={14} />
                        <span>Lưu Nhật Ký Giá Mới</span>
                      </button>
                    </form>
                  </div>

                  <div className="form-card-sub-new">
                    <strong className="sub-card-header-new">📋 Danh sách Nhật ký biến động giá gas hiện tại</strong>
                    <div style={{ overflowX: 'auto', marginTop: '12px' }}>
                      <table className="admin-table-new" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>Tháng</th>
                            <th style={{ padding: '10px' }}>Loại Gas</th>
                            <th style={{ padding: '10px' }}>Giá Bán</th>
                            <th style={{ padding: '10px' }}>Biến Động</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {priceHistoryList && priceHistoryList.length > 0 ? (
                            [...priceHistoryList].reverse().map(item => (
                              <tr key={item.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                <td style={{ padding: '10px', fontWeight: '700' }}>{item.effective_month}</td>
                                <td style={{ padding: '10px' }}>{item.gas_name}</td>
                                <td style={{ padding: '10px', fontWeight: '700', color: '#E11D48' }}>
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sale_price || item.price)}
                                </td>
                                <td style={{ padding: '10px' }}>
                                  {item.change_type === 'up' ? (
                                    <span style={{ color: '#E11D48', fontWeight: '700' }}>🔺 +{item.change_amount?.toLocaleString()}đ</span>
                                  ) : item.change_type === 'down' ? (
                                    <span style={{ color: '#059669', fontWeight: '700' }}>🔻 -{Math.abs(item.change_amount)?.toLocaleString()}đ</span>
                                  ) : (
                                    <span style={{ color: '#64748B' }}>➖ Giữ giá</span>
                                  )}
                                </td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>
                                  <button 
                                    type="button" 
                                    onClick={() => handleDeletePriceEntry(item.id)}
                                    style={{ background: 'none', border: 'none', color: '#E11D48', cursor: 'pointer' }}
                                    title="Xóa nhật ký này"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>Chưa có dữ liệu nhật ký giá.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Section: Khối Cẩm Nang & Hướng Dẫn An Toàn */}
                <CollapsibleSection
                  id="home_features"
                  title="Khối Cẩm Nang & Hướng Dẫn An Toàn Sử Dụng Gas (FAQs & Cam Kết)"
                  subtitle="Tùy chỉnh tiêu đề, cam kết chất lượng, số điện thoại hotline khẩn cấp và 4 câu hỏi thường gặp (FAQ) ngoài trang chủ."
                  isOpen={!!openSections.home_features}
                  onToggle={() => toggleSection('home_features')}
                  toggleSwitch={(
                    <label className="toggle-switch-wrapper-new">
                      <input 
                        type="checkbox" 
                        name="show_home_features" 
                        checked={settings.show_home_features !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, show_home_features: e.target.checked ? '1' : '0' }))} 
                      />
                      <span className="toggle-slider-new"></span>
                      <span className="toggle-label-text-new">
                        {settings.show_home_features !== '0' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </label>
                  )}
                >
                  {/* Card: Tiêu đề & Cam Kết */}
                  <div className="form-card-sub-new" style={{ marginBottom: '20px' }}>
                    <strong className="sub-card-header-new">🛡️ Tiêu Đề Khối & Cam Kết An Toàn</strong>
                    <div className="settings-grid-3" style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div className="form-group">
                        <label className="form-label-new">Nhãn Badge Đỏ</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_safety_badge || 'An Toàn Là Trên Hết'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_badge: e.target.value }))}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="form-label-new">Tiêu Đề Khối Chữ In Hoa</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_safety_title || 'CẨM NANG & HƯỚNG DẪN AN TOÀN SỬ DỤNG GAS'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_title: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label className="form-label-new">Mô Tả Phụ Ngắn</label>
                      <input 
                        type="text" 
                        className="form-control-new" 
                        value={settings.home_safety_subtitle || 'Ngọc Gas cam kết mang đến giải pháp năng lượng an toàn tuyệt đối cho mọi gia đình và nhà hàng tại Dĩ An, Thuận An & TP. Hồ Chí Minh.'}
                        onChange={(e) => setSettings(prev => ({ ...prev, home_safety_subtitle: e.target.value }))}
                      />
                    </div>

                    <div className="settings-grid-2" style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block', marginBottom: '8px' }}>Cam Kết 1:</strong>
                        <div className="form-group" style={{ marginBottom: '8px' }}>
                          <label className="form-label-new">Tiêu đề cam kết 1</label>
                          <input 
                            type="text" 
                            className="form-control-new" 
                            value={settings.home_safety_tip1_title || 'Cân đúng ký - Đủ trọng lượng'}
                            onChange={(e) => setSettings(prev => ({ ...prev, home_safety_tip1_title: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label-new">Nội dung chi tiết 1</label>
                          <input 
                            type="text" 
                            className="form-control-new" 
                            value={settings.home_safety_tip1_desc || '100% bình gas giao tới đều được cân trực tiếp trước mặt khách hàng.'}
                            onChange={(e) => setSettings(prev => ({ ...prev, home_safety_tip1_desc: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block', marginBottom: '8px' }}>Cam Kết 2:</strong>
                        <div className="form-group" style={{ marginBottom: '8px' }}>
                          <label className="form-label-new">Tiêu đề cam kết 2</label>
                          <input 
                            type="text" 
                            className="form-control-new" 
                            value={settings.home_safety_tip2_title || 'Bảo hiểm cháy nổ PCCC'}
                            onChange={(e) => setSettings(prev => ({ ...prev, home_safety_tip2_title: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label-new">Nội dung chi tiết 2</label>
                          <input 
                            type="text" 
                            className="form-control-new" 
                            value={settings.home_safety_tip2_desc || 'Toàn bộ bình gas Ngọc Gas phân phối đều có bảo hiểm an toàn chính hãng.'}
                            onChange={(e) => setSettings(prev => ({ ...prev, home_safety_tip2_desc: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="settings-grid-2" style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div className="form-group">
                        <label className="form-label-new">Dòng chữ Khẩn Cấp (Khung đỏ)</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_safety_alert_label || 'Hỗ trợ kỹ thuật & Sự cố rò rỉ Gas 24/7:'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_alert_label: e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label-new">Số Hotline Khẩn Cấp</label>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          value={settings.home_safety_alert_phone || '1900.9396'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_alert_phone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card: 4 Câu Hỏi Thường Gặp (FAQs) */}
                  <div className="form-card-sub-new">
                    <strong className="sub-card-header-new">❓ Danh Sách 4 Câu Hỏi Thường Gặp (Accordion FAQs)</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '14px', marginTop: '12px' }}>
                      
                      {/* FAQ 1 */}
                      <div style={{ padding: '14px', background: '#FFF8F5', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
                        <strong style={{ fontSize: '13px', color: '#FF6B00', display: 'block', marginBottom: '8px' }}>Câu hỏi 1:</strong>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          style={{ marginBottom: '8px', fontWeight: '700' }}
                          value={settings.home_safety_faq_1_q || 'Cách xử lý nhanh nhất khi phát hiện mùi gas rò rỉ trong căn bếp?'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_1_q: e.target.value }))}
                        />
                        <textarea 
                          className="form-control-new" 
                          rows={3}
                          value={settings.home_safety_faq_1_a || '1. Tuyệt đối KHÔNG bật/tắt công tắc điện, không dùng bật lửa hoặc diêm.\n2. Khóa ngay van bình gas bằng cách vặn theo chiều kim đồng hồ.\n3. Mở tất cả các cửa sổ, cửa chính để khí gas thoát ra ngoài tự nhiên.\n4. Di chuyển ra khu vực thoáng khí và gọi ngay cho hotline Ngọc Gas để kỹ thuật viên tới kiểm tra xử lý khẩn cấp.'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_1_a: e.target.value }))}
                        />
                      </div>

                      {/* FAQ 2 */}
                      <div style={{ padding: '14px', background: '#FFF8F5', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
                        <strong style={{ fontSize: '13px', color: '#FF6B00', display: 'block', marginBottom: '8px' }}>Câu hỏi 2:</strong>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          style={{ marginBottom: '8px', fontWeight: '700' }}
                          value={settings.home_safety_faq_2_q || 'Làm thế nào để phân biệt bình gas chính hãng Ngọc Gas với bình gas trôi nổi?'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_2_q: e.target.value }))}
                        />
                        <textarea 
                          className="form-control-new" 
                          rows={3}
                          value={settings.home_safety_faq_2_a || 'Bình gas chính hãng Ngọc Gas luôn có màng co niêm phong nguyên vẹn tại cổ van bình, tem chống hàng giả có logo thương hiệu rõ ràng, vỏ bình còn hạn kiểm định PCCC và được kỹ thuật viên cân trực tiếp trước mặt khách hàng khi giao.'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_2_a: e.target.value }))}
                        />
                      </div>

                      {/* FAQ 3 */}
                      <div style={{ padding: '14px', background: '#FFF8F5', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
                        <strong style={{ fontSize: '13px', color: '#FF6B00', display: 'block', marginBottom: '8px' }}>Câu hỏi 3:</strong>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          style={{ marginBottom: '8px', fontWeight: '700' }}
                          value={settings.home_safety_faq_3_q || 'Bao lâu nên kiểm tra và thay dây dẫn gas, van điều áp một lần?'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_3_q: e.target.value }))}
                        />
                        <textarea 
                          className="form-control-new" 
                          rows={3}
                          value={settings.home_safety_faq_3_a || 'Dây dẫn gas cao su nên thay định kỳ từ 1.5 - 2 năm/lần. Van điều áp tự động ngắt gas khẩn cấp nên thay sau mỗi 3 - 5 năm. Khi giao gas, đội ngũ Ngọc Gas luôn hỗ trợ vệ sinh bếp và kiểm tra dây dẫn van gas hoàn toàn miễn phí.'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_3_a: e.target.value }))}
                        />
                      </div>

                      {/* FAQ 4 */}
                      <div style={{ padding: '14px', background: '#FFF8F5', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
                        <strong style={{ fontSize: '13px', color: '#FF6B00', display: 'block', marginBottom: '8px' }}>Câu hỏi 4:</strong>
                        <input 
                          type="text" 
                          className="form-control-new" 
                          style={{ marginBottom: '8px', fontWeight: '700' }}
                          value={settings.home_safety_faq_4_q || 'Quy trình giao gas & kiểm tra an toàn tận nhà tại Dĩ An & TP.HCM diễn ra như thế nào?'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_4_q: e.target.value }))}
                        />
                        <textarea 
                          className="form-control-new" 
                          rows={3}
                          value={settings.home_safety_faq_4_a || 'Khi nhận cuộc gọi đặt gas, Ngọc Gas điều phối nhân viên giao hàng nhanh trong 15-30 phút. Kỹ thuật viên sẽ vận chuyển bình gas vào tận bếp, tiến hành lắp đặt, dùng thiết bị chuyên dụng kiểm tra rò rỉ van gas, cân thử ký gas tại chỗ và dán tem bảo hành trước khi bàn giao.'}
                          onChange={(e) => setSettings(prev => ({ ...prev, home_safety_faq_4_a: e.target.value }))}
                        />
                      </div>

                    </div>
                  </div>
                </CollapsibleSection>

                {/* Section 2: Khối sản phẩm */}
                <CollapsibleSection
                  id="home_products"
                  title="Khối Sản phẩm nổi bật"
                  isOpen={!!openSections.home_products}
                  onToggle={() => toggleSection('home_products')}
                  toggleSwitch={(
                    <label className="toggle-switch-wrapper-new">
                      <input 
                        type="checkbox" 
                        name="show_home_products" 
                        checked={settings.show_home_products !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, show_home_products: e.target.checked ? '1' : '0' }))} 
                      />
                      <span className="toggle-slider-new"></span>
                      <span className="toggle-label-text-new">
                        {settings.show_home_products !== '0' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </label>
                  )}
                >
                  <div className="settings-grid-2" style={{ marginBottom: '20px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Tiêu đề chính</label>
                      <input type="text" name="home_products_title" className="form-control-new" value={settings.home_products_title} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Mô tả phụ</label>
                      <input type="text" name="home_products_subtitle" className="form-control-new" value={settings.home_products_subtitle} onChange={handleChange} />
                    </div>
                  </div>
                  
                  {/* Hộp chọn 1: Bình Gas nổi bật */}
                  <div className="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <label className="form-label-new" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Chọn các Bình Gas hiển thị trên Trang chủ (Tối đa 4 sản phẩm)</span>
                      <span className="badge-count-new">
                        Đã chọn: {(() => {
                          try {
                            return JSON.parse(settings.featured_gas_ids || '[]').length;
                          } catch (e) {
                            return 0;
                          }
                        })()} / 4 bình gas
                      </span>
                    </label>
                    
                    <div className="products-checkbox-list-scrollable">
                      {(() => {
                        const gasProducts = allProducts.filter(prod => {
                          const catName = (prod.category_name || '').toLowerCase();
                          return catName.includes('gas') || [1, 2, 4].includes(Number(prod.category_id));
                        });

                        return gasProducts.length > 0 ? (
                          gasProducts.map(prod => {
                            let isChecked = false;
                            try {
                              const selectedIds = JSON.parse(settings.featured_gas_ids || '[]').map(id => Number(id));
                              isChecked = selectedIds.includes(Number(prod.id));
                            } catch (e) {}

                            return (
                              <label key={prod.id} className={`product-selection-row ${isChecked ? 'selected' : ''}`}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked} 
                                  onChange={() => handleGasProductSelect(prod.id)}
                                  className="product-select-checkbox-input"
                                />
                                <div className="product-select-row-meta">
                                  <div className="product-select-row-thumb">
                                    {prod.image_url ? (
                                      <img src={prod.image_url} alt="" />
                                    ) : (
                                      <ImageIcon size={14} style={{ opacity: 0.4 }} />
                                    )}
                                  </div>
                                  <div className="product-select-row-info">
                                    <strong>{prod.name}</strong>
                                    <span>{prod.category_name || 'Bình Gas'} — {prod.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price) : 'Liên hệ'}</span>
                                  </div>
                                </div>
                              </label>
                            );
                          })
                        ) : (
                          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Chưa có sản phẩm Bình Gas nào hoạt động để lựa chọn.
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Hộp chọn 2: Phụ kiện & Thiết bị khác nổi bật */}
                  <div className="form-group" style={{ marginTop: '20px', marginBottom: 0 }}>
                    <label className="form-label-new" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Chọn Phụ kiện & Thiết bị khác hiển thị trên Trang chủ (Tối đa 4 sản phẩm)</span>
                      <span className="badge-count-new">
                        Đã chọn: {(() => {
                          try {
                            return JSON.parse(settings.featured_other_ids || '[]').length;
                          } catch (e) {
                            return 0;
                          }
                        })()} / 4 sản phẩm
                      </span>
                    </label>
                    
                    <div className="products-checkbox-list-scrollable">
                      {(() => {
                        const otherProducts = allProducts.filter(prod => {
                          const catName = (prod.category_name || '').toLowerCase();
                          return !catName.includes('gas') && ![1, 2, 4].includes(Number(prod.category_id));
                        });

                        return otherProducts.length > 0 ? (
                          otherProducts.map(prod => {
                            let isChecked = false;
                            try {
                              const selectedIds = JSON.parse(settings.featured_other_ids || '[]').map(id => Number(id));
                              isChecked = selectedIds.includes(Number(prod.id));
                            } catch (e) {}

                            return (
                              <label key={prod.id} className={`product-selection-row ${isChecked ? 'selected' : ''}`}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked} 
                                  onChange={() => handleOtherProductSelect(prod.id)}
                                  className="product-select-checkbox-input"
                                />
                                <div className="product-select-row-meta">
                                  <div className="product-select-row-thumb">
                                    {prod.image_url ? (
                                      <img src={prod.image_url} alt="" />
                                    ) : (
                                      <ImageIcon size={14} style={{ opacity: 0.4 }} />
                                    )}
                                  </div>
                                  <div className="product-select-row-info">
                                    <strong>{prod.name}</strong>
                                    <span>{prod.category_name || 'Phụ kiện'} — {prod.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price) : 'Liên hệ'}</span>
                                  </div>
                                </div>
                              </label>
                            );
                          })
                        ) : (
                          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Chưa có sản phẩm Phụ kiện & Bếp nào hoạt động để lựa chọn.
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Section 3: Các chỉ số thống kê */}
                <CollapsibleSection
                  id="home_stats"
                  title="Khối Thống kê & Chỉ số"
                  isOpen={!!openSections.home_stats}
                  onToggle={() => toggleSection('home_stats')}
                  toggleSwitch={(
                    <label className="toggle-switch-wrapper-new">
                      <input 
                        type="checkbox" 
                        name="show_home_stats" 
                        checked={settings.show_home_stats !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, show_home_stats: e.target.checked ? '1' : '0' }))} 
                      />
                      <span className="toggle-slider-new"></span>
                      <span className="toggle-label-text-new">
                        {settings.show_home_stats !== '0' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </label>
                  )}
                >
                  <div className="settings-grid-4">
                    <div className="form-card-sub-new">
                      <label className="form-label-new">Thống kê 1</label>
                      <input type="text" name="home_stat_1_num" className="form-control-new" value={settings.home_stat_1_num} onChange={handleChange} />
                      <label className="form-label-new" style={{ marginTop: '8px' }}>Nhãn</label>
                      <input type="text" name="home_stat_1_label" className="form-control-new" value={settings.home_stat_1_label} onChange={handleChange} />
                    </div>
                    <div className="form-card-sub-new">
                      <label className="form-label-new">Thống kê 2</label>
                      <input type="text" name="home_stat_2_num" className="form-control-new" value={settings.home_stat_2_num} onChange={handleChange} />
                      <label className="form-label-new" style={{ marginTop: '8px' }}>Nhãn</label>
                      <input type="text" name="home_stat_2_label" className="form-control-new" value={settings.home_stat_2_label} onChange={handleChange} />
                    </div>
                    <div className="form-card-sub-new">
                      <label className="form-label-new">Thống kê 3</label>
                      <input type="text" name="home_stat_3_num" className="form-control-new" value={settings.home_stat_3_num} onChange={handleChange} />
                      <label className="form-label-new" style={{ marginTop: '8px' }}>Nhãn</label>
                      <input type="text" name="home_stat_3_label" className="form-control-new" value={settings.home_stat_3_label} onChange={handleChange} />
                    </div>
                    <div className="form-card-sub-new">
                      <label className="form-label-new">Thống kê 4</label>
                      <input type="text" name="home_stat_4_num" className="form-control-new" value={settings.home_stat_4_num} onChange={handleChange} />
                      <label className="form-label-new" style={{ marginTop: '8px' }}>Nhãn</label>
                      <input type="text" name="home_stat_4_label" className="form-control-new" value={settings.home_stat_4_label} onChange={handleChange} />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Section 4: Tin tức & Kiến thức */}
                <CollapsibleSection
                  id="home_news"
                  title="Khối Tin tức & Kiến thức"
                  isOpen={!!openSections.home_news}
                  onToggle={() => toggleSection('home_news')}
                  toggleSwitch={(
                    <label className="toggle-switch-wrapper-new">
                      <input 
                        type="checkbox" 
                        name="show_home_news" 
                        checked={settings.show_home_news !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, show_home_news: e.target.checked ? '1' : '0' }))} 
                      />
                      <span className="toggle-slider-new"></span>
                      <span className="toggle-label-text-new">
                        {settings.show_home_news !== '0' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </label>
                  )}
                >
                  <div className="settings-grid-2">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Tiêu đề Tin tức</label>
                      <input type="text" name="home_news_title" className="form-control-new" value={settings.home_news_title} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Mô tả Tin tức</label>
                      <input type="text" name="home_news_subtitle" className="form-control-new" value={settings.home_news_subtitle} onChange={handleChange} />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Section 5: Kêu gọi hành động (CTA) */}
                <CollapsibleSection
                  id="home_cta"
                  title="📞 Khối Banner Kêu Gọi Báo Giá & Đặt Gas (CTA Hotline Chân Trang)"
                  subtitle='Khối banner xuất hiện gần cuối Trang chủ (ngay phía trên Chân trang Footer): "Bạn Cần Hỗ Trợ Tư Vấn Hoặc Báo Giá Hệ Thống Gas?"'
                  isOpen={!!openSections.home_cta}
                  onToggle={() => toggleSection('home_cta')}
                  toggleSwitch={(
                    <label className="toggle-switch-wrapper-new">
                      <input 
                        type="checkbox" 
                        name="show_home_cta" 
                        checked={settings.show_home_cta !== '0'} 
                        onChange={(e) => setSettings(prev => ({ ...prev, show_home_cta: e.target.checked ? '1' : '0' }))} 
                      />
                      <span className="toggle-slider-new"></span>
                      <span className="toggle-label-text-new">
                        {settings.show_home_cta !== '0' ? 'Đang hiển thị' : 'Đang ẩn'}
                      </span>
                    </label>
                  )}
                >
                  <div className="form-card-sub-new" style={{ marginBottom: 0, background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px' }}>
                    <strong style={{ fontSize: '14px', color: '#6D28D9', display: 'block', marginBottom: '12px' }}>
                      ✏️ Chỉnh sửa nội dung Banner Báo Giá / Hotline:
                    </strong>
                    <div className="form-group">
                      <label className="form-label-new">Tiêu đề lớn chính</label>
                      <input 
                        type="text" 
                        name="home_cta_title" 
                        className="form-control-new" 
                        value={settings.home_cta_title || 'Bạn Cần Hỗ Trợ Tư Vấn Hoặc Báo Giá Hệ Thống Gas?'} 
                        onChange={handleChange} 
                        placeholder="Bạn Cần Hỗ Trợ Tư Vấn Hoặc Báo Giá Hệ Thống Gas?"
                      />
                    </div>
                    <div className="settings-grid-2">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Dòng mô tả phụ ngắn</label>
                        <input 
                          type="text" 
                          name="home_cta_desc" 
                          className="form-control-new" 
                          value={settings.home_cta_desc || 'Ngọc Gas cung cấp dịch vụ khảo sát và thiết kế hệ thống gas công nghiệp miễn phí tại TP. HCM & Bình Dương.'} 
                          onChange={handleChange} 
                          placeholder="Mô tả phụ..."
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Số Hotline hiển thị trên nút bấm 1 (Mặc định lấy Hotline chung)</label>
                        <input 
                          type="text" 
                          name="home_cta_phone" 
                          className="form-control-new" 
                          value={settings.home_cta_phone || ''} 
                          onChange={handleChange} 
                          placeholder="Để trống sẽ tự dùng hotline chung 1900.9396" 
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
                      <label className="form-label-new">Chữ hiển thị trên Nút Bấm Thứ 2 (Bên cạnh nút Gọi Hotline)</label>
                      <input 
                        type="text" 
                        name="home_cta_btn_2_text" 
                        className="form-control-new" 
                        value={settings.home_cta_btn_2_text || 'Địa chỉ & Trạm giao gas'} 
                        onChange={handleChange} 
                        placeholder="vd: Địa chỉ & Trạm giao gas hoặc Danh Sách Cửa Hàng" 
                      />
                    </div>
                  </div>
                </CollapsibleSection>

              </div>
            )}

            {/* ======================= TAB 3: ABOUT PAGE SETTINGS ======================= */}
            {activeTab === 'about' && (
              <div className="tab-pane animate-fade-in-up">
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    💡 Các khối đang thu nhỏ mặc định. Nhấp vào tiêu đề từng khối để mở rộng chỉnh sửa.
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => collapseAllTabSections(['about_hero', 'about_history', 'about_vision', 'about_values', 'about_cta'])}
                      className="btn-outline-new"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <Minimize2 size={13} />
                      <span>Thu nhỏ tất cả khối</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => expandAllTabSections(['about_hero', 'about_history', 'about_vision', 'about_values', 'about_cta'])}
                      className="btn-outline-new"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      <Maximize2 size={13} />
                      <span>Mở rộng tất cả khối</span>
                    </button>
                  </div>
                </div>

                {/* Banner đầu trang giới thiệu */}
                <CollapsibleSection
                  id="about_hero"
                  title="Khối đầu trang (Hero)"
                  isOpen={!!openSections.about_hero}
                  onToggle={() => toggleSection('about_hero')}
                >
                  <div className="settings-grid-2">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Tiêu đề chính</label>
                      <input type="text" name="about_hero_title" className="form-control-new" value={settings.about_hero_title} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Dòng mô tả phụ</label>
                      <input type="text" name="about_hero_desc" className="form-control-new" value={settings.about_hero_desc} onChange={handleChange} />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Phần lịch sử hình thành */}
                <CollapsibleSection
                  id="about_history"
                  title="Khối Lịch sử & Đối tác"
                  isOpen={!!openSections.about_history}
                  onToggle={() => toggleSection('about_history')}
                >
                  <div className="form-group">
                    <label className="form-label-new">Tiêu đề lịch sử</label>
                    <input type="text" name="about_history_title" className="form-control-new" value={settings.about_history_title} onChange={handleChange} />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label-new">Nội dung Lịch sử hình thành (Chấp nhận viết dạng HTML)</label>
                    <textarea
                      name="about_history"
                      className="form-control-new code-font-textarea"
                      rows="6"
                      value={settings.about_history}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="settings-grid-2" style={{ marginTop: '20px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Tiêu đề khối đồ họa đối tác</label>
                      <input type="text" name="about_intro_partner_title" className="form-control-new" value={settings.about_intro_partner_title} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Nội dung khối đồ họa đối tác</label>
                      <input type="text" name="about_intro_partner_desc" className="form-control-new" value={settings.about_intro_partner_desc} onChange={handleChange} />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Phần Tầm nhìn & Sứ mệnh */}
                <CollapsibleSection
                  id="about_vision"
                  title="Tầm nhìn & Sứ mệnh"
                  isOpen={!!openSections.about_vision}
                  onToggle={() => toggleSection('about_vision')}
                >
                  <div className="settings-grid-2">
                    <div className="form-card-sub-new">
                      <div className="form-group">
                        <label className="form-label-new">Tiêu đề Tầm nhìn</label>
                        <input type="text" name="about_vision_title" className="form-control-new" value={settings.about_vision_title} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Nội dung Tầm nhìn</label>
                        <textarea name="about_vision" rows="3" className="form-control-new" value={settings.about_vision} onChange={handleChange} />
                      </div>
                    </div>
                    
                    <div className="form-card-sub-new">
                      <div className="form-group">
                        <label className="form-label-new">Tiêu đề Sứ mệnh</label>
                        <input type="text" name="about_mission_title" className="form-control-new" value={settings.about_mission_title} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Nội dung Sứ mệnh</label>
                        <textarea name="about_mission" rows="3" className="form-control-new" value={settings.about_mission} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Phần giá trị cốt lõi */}
                <CollapsibleSection
                  id="about_values"
                  title="Khối Giá trị cốt lõi"
                  isOpen={!!openSections.about_values}
                  onToggle={() => toggleSection('about_values')}
                >
                  <div className="settings-grid-2" style={{ marginBottom: '20px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Tiêu đề chính</label>
                      <input type="text" name="about_value_title" className="form-control-new" value={settings.about_value_title} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Mô tả phụ</label>
                      <input type="text" name="about_value_subtitle" className="form-control-new" value={settings.about_value_subtitle} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="settings-grid-3">
                    <div className="form-card-sub-new">
                      <strong className="sub-card-header-new">Giá trị 1</strong>
                      <div className="form-group" style={{ marginTop: '8px' }}>
                        <label className="form-label-new">Tiêu đề</label>
                        <input type="text" name="about_value_1_title" className="form-control-new" value={settings.about_value_1_title} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Mô tả</label>
                        <textarea name="about_value_1_desc" rows="3" className="form-control-new" value={settings.about_value_1_desc} onChange={handleChange} />
                      </div>
                    </div>
                    
                    <div className="form-card-sub-new">
                      <strong className="sub-card-header-new">Giá trị 2</strong>
                      <div className="form-group" style={{ marginTop: '8px' }}>
                        <label className="form-label-new">Tiêu đề</label>
                        <input type="text" name="about_value_2_title" className="form-control-new" value={settings.about_value_2_title} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Mô tả</label>
                        <textarea name="about_value_2_desc" rows="3" className="form-control-new" value={settings.about_value_2_desc} onChange={handleChange} />
                      </div>
                    </div>
                    
                    <div className="form-card-sub-new">
                      <strong className="sub-card-header-new">Giá trị 3</strong>
                      <div className="form-group" style={{ marginTop: '8px' }}>
                        <label className="form-label-new">Tiêu đề</label>
                        <input type="text" name="about_value_3_title" className="form-control-new" value={settings.about_value_3_title} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Mô tả</label>
                        <textarea name="about_value_3_desc" rows="3" className="form-control-new" value={settings.about_value_3_desc} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Phần kêu gọi CTA */}
                <CollapsibleSection
                  id="about_cta"
                  title="Khối Kêu gọi chân trang"
                  isOpen={!!openSections.about_cta}
                  onToggle={() => toggleSection('about_cta')}
                >
                  <div className="settings-grid-3">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Tiêu đề chính CTA</label>
                      <input type="text" name="about_cta_title" className="form-control-new" value={settings.about_cta_title} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Dòng mô tả phụ</label>
                      <input type="text" name="about_cta_desc" className="form-control-new" value={settings.about_cta_desc} onChange={handleChange} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label-new">Chữ hiển thị trên nút liên kết</label>
                      <input type="text" name="about_cta_btn" className="form-control-new" value={settings.about_cta_btn} onChange={handleChange} />
                    </div>
                  </div>
                </CollapsibleSection>

              </div>
            )}

            {/* Sticky Floating Action Bar at the Bottom */}
            <div style={{
              position: 'sticky',
              bottom: '16px',
              zIndex: 900,
              marginTop: '30px',
              background: 'rgba(15, 23, 42, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '14px 24px',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
              color: '#FFF',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <strong style={{ fontSize: '15px', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚙️ Cấu Hình Website Ngọc Gas
                </strong>
                <span style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>
                  Bấm nút bên phải để lưu tất cả thông tin, giá gas & thứ tự hiển thị các khối.
                </span>
              </div>

              <button
                type="submit"
                disabled={saving}
                style={{
                  backgroundColor: '#FF6B00',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 28px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <Save size={18} />
                <span>{saving ? 'ĐANG LƯU CẤU HÌNH...' : '💾 LƯU CẤU HÌNH NGAY'}</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Success Notification Modal Popup */}
      {showSaveSuccessModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '480px',
            width: '100%',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            border: '2px solid #22C55E',
            animation: 'fade-in-up 0.2s ease'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
            }}>
              <Check size={36} strokeWidth={3} />
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
              🎉 ĐÃ LƯU CẤU HÌNH THÀNH CÔNG!
            </h2>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
              Tất cả các thay đổi về giá gas, nội dung các khối và thứ tự sắp xếp giao diện trang chủ đã được lưu trữ thành công.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowSaveSuccessModal(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#FF6B00',
                  color: '#FFF',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  flex: 1,
                  boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)'
                }}
              >
                Đồng Ý / Đóng
              </button>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  background: '#F8FAFC',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justify: 'center'
                }}
              >
                Xem Trang Chủ ↗
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .admin-loading-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          color: var(--text-secondary);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(245, 183, 49, 0.15);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* 1. Header Banner Panel */
        .admin-header-panel {
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          color: #FFFFFF;
          padding: 24px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 24px;
        }

        .panel-badge {
          display: inline-block;
          background: rgba(245, 183, 49, 0.15);
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .panel-main-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 6px 0;
          color: #FFFFFF;
        }

        .panel-subtitle {
          font-size: 14px;
          color: #94A3B8;
          margin: 0;
          max-width: 700px;
          line-height: 1.5;
        }

        /* 2. Global Admin Style overloads */
        .status-tabs-row {
          display: flex;
          background-color: #F1F5F9;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
        }

        .status-tab-btn {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: var(--transition);
        }

        .status-tab-btn:hover {
          color: var(--text);
        }

        .status-tab-btn.active {
          background-color: #FFFFFF;
          color: var(--primary-dark);
          box-shadow: var(--shadow-sm);
        }

        .form-section-card {
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }

        .section-card-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 20px 0;
          border-left: 4px solid var(--primary);
          padding-left: 10px;
          line-height: 1;
        }

        .form-label-new {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 8px;
        }

        .form-control-new {
          width: 100%;
          padding: 10px 14px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 14px;
          transition: var(--transition);
          outline: none;
        }

        .form-control-new:focus {
          border-color: var(--primary-dark);
          box-shadow: 0 0 0 3px rgba(245, 183, 49, 0.1);
        }

        .settings-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .settings-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .settings-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        @media (max-width: 900px) {
          .settings-grid-3, .settings-grid-4, .settings-grid-2 {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        .form-card-sub-new {
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 18px;
          box-shadow: var(--shadow-sm);
        }

        .sub-card-header-new {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          border-bottom: 1px dashed #CBD5E1;
          padding-bottom: 6px;
        }

        .btn-add-album-new {
          background-color: #EFF6FF;
          border: 1px solid #DBEAFE;
          color: #2563EB;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .btn-add-album-new:hover {
          background-color: #DBEAFE;
        }

        .admin-success-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 6px;
          background-color: #DCFCE7;
          color: #15803D;
          border: 1px solid #BBF7D0;
          font-size: 14px;
          font-weight: 600;
        }

        .settings-submit-box {
          margin-top: 30px;
          border-top: 1px solid var(--border);
          padding-top: 20px;
          display: flex;
          justify-content: flex-end;
        }

        .btn-primary-new {
          padding: 10px 24px;
          border-radius: 6px;
          background-color: #2563EB;
          color: #FFFFFF;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          transition: var(--transition);
        }

        .btn-primary-new:hover {
          background-color: #1D4ED8;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        }

        .code-font-textarea {
          font-family: inherit;
          line-height: 1.6;
        }

        .badge-count-new {
          background-color: #EFF6FF;
          color: #2563EB;
          border: 1px solid #DBEAFE;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .products-checkbox-list-scrollable {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          max-height: 280px;
          overflow-y: auto;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 12px;
          background-color: #F8FAFC;
          margin-top: 8px;
        }

        .product-selection-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
        }

        .product-selection-row.selected {
          border-color: #2563EB;
          background-color: #EFF6FF;
        }

        .product-select-checkbox-input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .product-select-row-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-grow: 1;
        }

        .product-select-row-thumb {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid var(--border);
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .product-select-row-thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          padding: 2px;
        }

        .product-select-row-info {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .product-select-row-info strong {
          font-size: 13px;
          color: #0F172A;
        }

        .product-select-row-info span {
          font-size: 11px;
          color: var(--text-secondary);
        }

        @media (max-width: 640px) {
          .products-checkbox-list-scrollable {
            grid-template-columns: 1fr;
          }
        }

        .section-header-row-new {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }

        .section-header-row-new .section-card-title {
          margin-bottom: 0 !important;
        }

        .toggle-switch-wrapper-new {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .toggle-switch-wrapper-new input {
          display: none;
        }

        .toggle-slider-new {
          position: relative;
          width: 44px;
          height: 22px;
          background-color: #CBD5E1;
          border-radius: 999px;
          transition: 0.3s;
        }

        .toggle-slider-new::before {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #FFFFFF;
          top: 3px;
          left: 3px;
          transition: 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }

        .toggle-switch-wrapper-new input:checked + .toggle-slider-new {
          background-color: #10B981;
        }

        .toggle-switch-wrapper-new input:checked + .toggle-slider-new::before {
          transform: translateX(22px);
        }

        .toggle-label-text-new {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
        }

        .toggle-switch-wrapper-new input:checked ~ .toggle-label-text-new {
          color: #059669;
        }

        .sections-order-list-new {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .section-order-row-new {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 12px 16px;
          transition: var(--transition);
        }

        .section-order-row-new:hover {
          border-color: rgba(245, 183, 49, 0.4);
          background-color: #F1F5F9;
        }

        .section-order-row-new.hidden-section {
          opacity: 0.6;
          background-color: #F1F5F9;
          border-style: dashed;
        }

        .section-order-info-new {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-order-index-new {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: var(--primary);
          color: #1A202C;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 800;
        }

        .section-order-name-new {
          font-size: 14px;
          color: #0F172A;
        }

        .section-order-hidden-badge-new {
          font-size: 11px;
          font-weight: 700;
          background-color: #E2E8F0;
          color: #64748B;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .section-order-actions-new {
          display: flex;
          gap: 6px;
        }

        .order-btn-new {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background-color: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          color: #475569;
          cursor: pointer;
          transition: var(--transition);
        }

        .order-btn-new:hover:not(:disabled) {
          background-color: var(--primary);
          border-color: var(--primary);
          color: #1A202C;
        }

        .order-btn-new:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background-color: #F1F5F9;
        }
      `}</style>

      <MediaLibraryModal 
        isOpen={mediaModalConfig.isOpen} 
        onClose={() => setMediaModalConfig({ isOpen: false, targetKey: '' })} 
        onSelectImage={handleSelectMediaImage} 
      />
    </>
  );
}
