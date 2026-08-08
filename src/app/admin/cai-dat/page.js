'use client';

import { useEffect, useState } from 'react';
import { Save, AlertCircle, CheckCircle2, Upload, MapPin, Phone, Mail, Clock, ShieldAlert, Image as ImageIcon, Home, Info, HelpCircle, ArrowUp, ArrowDown, Plus, Trash2, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

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
    home_sections_order: '["intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"]',
    
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
  const [uploading, setUploading] = useState(false);

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
        setSuccess('Đã tải logo lên. Hãy nhấn "Lưu tất cả thay đổi" để áp dụng chính thức.');
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
        setSuccess('Đã tải favicon lên. Hãy nhấn "Lưu tất cả thay đổi" để áp dụng chính thức.');
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
        setSuccess('Đã tải tệp lên thành công. Hãy nhấn "Lưu tất cả thay đổi" để áp dụng chính thức.');
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
    e.preventDefault();
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
        setSuccess('Cập nhật cấu hình website thành công!');
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

  const handleMoveSection = (index, direction) => {
    let order = [];
    try {
      order = JSON.parse(settings.home_sections_order || '["intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"]');
    } catch(e) {
      order = ["intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"];
    }

    const newOrder = [...order];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setSettings(prev => ({
      ...prev,
      home_sections_order: JSON.stringify(newOrder)
    }));
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
                      <div className="form-group">
                        <label className="form-label-new">Ảnh Banner Popup Khuyến mãi</label>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <input
                            type="text"
                            name="promo_popup_image"
                            className="form-control-new"
                            value={settings.promo_popup_image}
                            onChange={handleChange}
                            placeholder="vd: /uploads/promo_banner.jpg"
                            style={{ flex: 1 }}
                          />
                          <label className="upload-btn-new" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--primary)', color: '#111111', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>
                            <Upload size={14} />
                            <span>{uploading ? 'Đang tải...' : 'Tải ảnh lên'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleGenericFileUpload(e, 'promo_popup_image')}
                              style={{ display: 'none' }}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                        {settings.promo_popup_image && (
                          <div style={{ marginTop: '12px' }}>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Xem trước ảnh popup:</p>
                            <img
                              src={settings.promo_popup_image}
                              alt="Popup Preview"
                              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px', border: '1px solid var(--border)', objectFit: 'contain' }}
                            />
                          </div>
                        )}
                      </div>

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
                </CollapsibleSection>

                <CollapsibleSection
                  id="gen_logo"
                  title="Logo thương hiệu & Chân trang"
                  isOpen={!!openSections.gen_logo}
                  onToggle={() => toggleSection('gen_logo')}
                >
                  <div className="form-group">
                    <label htmlFor="logo_url" className="form-label-new">Ảnh Logo đại diện website</label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <input
                        type="text"
                        id="logo_url"
                        name="logo_url"
                        className="form-control-new"
                        value={settings.logo_url}
                        onChange={handleChange}
                        placeholder="Dán link ảnh logo hoặc bấm Tải lên bên phải"
                      />
                      <label className="btn-add-album-new" style={{ margin: 0, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        <Upload size={14} />
                        <span>{uploading ? 'Đang tải...' : 'Tải ảnh logo'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload} 
                          style={{ display: 'none' }} 
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    {settings.logo_url && (
                      <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#1A202C', borderRadius: '6px', display: 'inline-block' }}>
                        <span style={{ color: '#A0AEC0', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Xem trước Logo trên thanh Header tối:</span>
                        <img src={settings.logo_url} alt="Logo" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>

                  <div className="form-group" style={{ marginTop: '20px' }}>
                    <label htmlFor="favicon_url" className="form-label-new">Ảnh Favicon Website (Biểu tượng thanh địa chỉ tab trình duyệt)</label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <input
                        type="text"
                        id="favicon_url"
                        name="favicon_url"
                        className="form-control-new"
                        value={settings.favicon_url}
                        onChange={handleChange}
                        placeholder="Dán link ảnh favicon (.ico/.png) hoặc bấm Tải lên bên phải"
                      />
                      <label className="btn-add-album-new" style={{ margin: 0, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        <Upload size={14} />
                        <span>{uploading ? 'Đang tải...' : 'Tải ảnh favicon'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFaviconUpload} 
                          style={{ display: 'none' }} 
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    {settings.favicon_url && (
                      <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Xem trước biểu tượng tab trình duyệt:</span>
                        <img src={settings.favicon_url} alt="Favicon" style={{ height: '24px', width: '24px', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>

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
                    <div className="form-group">
                      <label className="form-label-new">Đường dẫn Video nền (.mp4)</label>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <input 
                          type="text" 
                          name="hero_video_url" 
                          className="form-control-new" 
                          value={settings.hero_video_url || ''} 
                          onChange={handleChange} 
                          placeholder="vd: /uploads/video.mp4 hoặc link ngoài..." 
                        />
                        <label className="upload-btn-new" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--primary)', color: '#111111', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                          <Upload size={14} />
                          <span>{uploading ? 'Đang tải...' : 'Tải Video (.mp4)'}</span>
                          <input 
                            type="file" 
                            accept="video/mp4" 
                            style={{ display: 'none' }} 
                            onChange={(e) => handleGenericFileUpload(e, 'hero_video_url')} 
                            disabled={uploading} 
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {settings.hero_mode === 'slide' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Hình ảnh Slide 1</label>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <input 
                            type="text" 
                            name="hero_slide_1" 
                            className="form-control-new" 
                            value={settings.hero_slide_1 || ''} 
                            onChange={handleChange} 
                            placeholder="vd: /images/banner1.jpg" 
                          />
                          <label className="upload-btn-new" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--primary)', color: '#111111', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                            <Upload size={14} />
                            <span>Tải ảnh</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: 'none' }} 
                              onChange={(e) => handleGenericFileUpload(e, 'hero_slide_1')} 
                              disabled={uploading} 
                            />
                          </label>
                        </div>
                        {/* Slide 1 Image Preview */}
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                          <img 
                            src={settings.hero_slide_1 || '/images/delivery-motorcycle.jpg'} 
                            alt="Slide 1 Preview" 
                            style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                          />
                          <div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', display: 'block' }}>Xem trước Slide 1</span>
                            <span style={{ fontSize: '12px', color: '#64748B' }}>
                              {settings.hero_slide_1 ? 'Đang dùng ảnh tải lên' : 'Đang dùng ảnh mặc định hệ thống (/images/delivery-motorcycle.jpg)'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Hình ảnh Slide 2</label>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <input 
                            type="text" 
                            name="hero_slide_2" 
                            className="form-control-new" 
                            value={settings.hero_slide_2 || ''} 
                            onChange={handleChange} 
                            placeholder="vd: /images/banner2.jpg" 
                          />
                          <label className="upload-btn-new" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--primary)', color: '#111111', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                            <Upload size={14} />
                            <span>Tải ảnh</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: 'none' }} 
                              onChange={(e) => handleGenericFileUpload(e, 'hero_slide_2')} 
                              disabled={uploading} 
                            />
                          </label>
                        </div>
                        {/* Slide 2 Image Preview */}
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                          <img 
                            src={settings.hero_slide_2 || '/images/gas-cylinder.jpg'} 
                            alt="Slide 2 Preview" 
                            style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                          />
                          <div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', display: 'block' }}>Xem trước Slide 2</span>
                            <span style={{ fontSize: '12px', color: '#64748B' }}>
                              {settings.hero_slide_2 ? 'Đang dùng ảnh tải lên' : 'Đang dùng ảnh mặc định hệ thống (/images/gas-cylinder.jpg)'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Hình ảnh Slide 3 (Tùy chọn)</label>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <input 
                            type="text" 
                            name="hero_slide_3" 
                            className="form-control-new" 
                            value={settings.hero_slide_3 || ''} 
                            onChange={handleChange} 
                            placeholder="vd: /images/banner3.jpg" 
                          />
                          <label className="upload-btn-new" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--primary)', color: '#111111', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px' }}>
                            <Upload size={14} />
                            <span>Tải ảnh</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: 'none' }} 
                              onChange={(e) => handleGenericFileUpload(e, 'hero_slide_3')} 
                              disabled={uploading} 
                            />
                          </label>
                        </div>
                        {/* Slide 3 Image Preview */}
                        {settings.hero_slide_3 ? (
                          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                            <img 
                              src={settings.hero_slide_3} 
                              alt="Slide 3 Preview" 
                              style={{ width: '120px', height: '65px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                            />
                            <div>
                              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', display: 'block' }}>Xem trước Slide 3</span>
                              <span style={{ fontSize: '12px', color: '#64748B' }}>Đang dùng ảnh tùy chỉnh</span>
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '6px', display: 'block' }}>Chưa thiết lập (Slide 3 hiện đang ẩn)</span>
                        )}
                      </div>
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

                {/* Section 0: Banner Hero & Hoạt cảnh giao gas */}
                <CollapsibleSection
                  id="home_hero_anim"
                  title="Khối Banner Hero & Hoạt cảnh giao gas"
                  isOpen={!!openSections.home_hero_anim}
                  onToggle={() => toggleSection('home_hero_anim')}
                >
                  <div className="settings-grid-2">
                    <div className="form-card-sub-new">
                      <strong className="sub-card-header-new">Trạng thái 1: Khách gọi điện</strong>
                      <div className="form-group">
                        <label className="form-label-new">Tiêu đề thông báo gọi điện</label>
                        <input type="text" name="hero_call_title" className="form-control-new" value={settings.hero_call_title} onChange={handleChange} placeholder="vd: Khách gọi đặt gas..." />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Nội dung chi tiết (Tên bình gas)</label>
                        <input type="text" name="hero_call_desc" className="form-control-new" value={settings.hero_call_desc} onChange={handleChange} placeholder="vd: Bình Ngọc Gas 12kg Xám" />
                      </div>
                    </div>

                    <div className="form-card-sub-new">
                      <strong className="sub-card-header-new">Trạng thái 2: Đang đi giao gas</strong>
                      <div className="form-group">
                        <label className="form-label-new">Tiêu đề thông báo giao gas</label>
                        <input type="text" name="hero_delivery_title" className="form-control-new" value={settings.hero_delivery_title} onChange={handleChange} placeholder="vd: Đang giao gas..." />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Nội dung chi tiết (Thời gian dự kiến)</label>
                        <input type="text" name="hero_delivery_desc" className="form-control-new" value={settings.hero_delivery_desc} onChange={handleChange} placeholder="vd: Dự kiến đến trong 15 phút" />
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Sắp xếp thứ tự hiển thị các khối */}
                <CollapsibleSection
                  id="home_order"
                  title="Sắp xếp thứ tự hiển thị các khối nội dung trên Trang chủ"
                  subtitle="Nhấn vào các nút Mũi tên lên/xuống để sắp xếp thứ tự hiển thị của các khối bên ngoài Trang chủ."
                  isOpen={!!openSections.home_order}
                  onToggle={() => toggleSection('home_order')}
                >
                  <div className="sections-order-list-new">
                    {(() => {
                      let order = [];
                      try {
                        order = JSON.parse(settings.home_sections_order || '["gas-price-widget", "intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"]');
                      } catch(e) {
                        order = ["gas-price-widget", "intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"];
                      }

                      const names = {
                        'gas-price-widget': 'Khối Bảng giá Gas Niêm Yết Tháng',
                        'intro-features': 'Khối Đặc điểm nổi bật (An toàn, Chất lượng, Giao nhanh)',
                        'featured-products': 'Khối Sản phẩm nổi bật',
                        'stats-counter': 'Khối Chỉ số thống kê (Số năm kinh nghiệm, khách hàng...)',
                        'latest-news': 'Khối Tin tức & Kiến thức',
                        'cta-section': 'Khối gọi tư vấn / Liên hệ nhanh (CTA)'
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
                        const isHidden = settings[statusKeys[sectionId]] === '0';
                        return (
                          <div key={sectionId} className={`section-order-row-new ${isHidden ? 'hidden-section' : ''}`}>
                            <div className="section-order-info-new">
                              <span className="section-order-index-new">{index + 1}</span>
                              <strong className="section-order-name-new">{names[sectionId]}</strong>
                              {isHidden && <span className="section-order-hidden-badge-new">Đang ẩn</span>}
                            </div>
                            <div className="section-order-actions-new">
                              <button 
                                type="button"
                                onClick={() => handleMoveSection(index, -1)} 
                                disabled={index === 0}
                                className="order-btn-new"
                                title="Di chuyển lên"
                              >
                                <ArrowUp size={16} />
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleMoveSection(index, 1)} 
                                disabled={index === order.length - 1}
                                className="order-btn-new"
                                title="Di chuyển xuống"
                              >
                                <ArrowDown size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </CollapsibleSection>

                {/* Section 1: Đặc điểm giới thiệu */}
                <CollapsibleSection
                  id="home_features"
                  title="Khối Đặc điểm nổi bật (Dưới Banner Hero)"
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <p className="section-subtitle-text" style={{ margin: 0, color: 'var(--text-secondary)' }}>
                      Bạn có thể tự do thêm, bớt các ô đặc điểm nổi bật và chọn biểu tượng (icon) hiển thị phù hợp.
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={collapseAllFeatures}
                        className="btn-outline-new"
                        style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        title="Thu nhỏ tất cả ô đặc điểm"
                      >
                        <Minimize2 size={13} />
                        <span>Thu nhỏ tất cả</span>
                      </button>
                      <button
                        type="button"
                        onClick={expandAllFeatures}
                        className="btn-outline-new"
                        style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        title="Mở rộng tất cả ô đặc điểm"
                      >
                        <Maximize2 size={13} />
                        <span>Mở rộng tất cả</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {getFeaturesList().map((item, index) => {
                      const itemKey = item.id || index;
                      const isCollapsed = !openFeatureIds[itemKey];

                      return (
                        <div 
                          key={itemKey} 
                          className="form-card-sub-new" 
                          style={{ 
                            position: 'relative', 
                            padding: isCollapsed ? '12px 16px' : '16px',
                            transition: 'all 0.2s ease',
                            border: isCollapsed ? '1px solid var(--border)' : '1px solid var(--border)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div 
                              onClick={() => toggleFeatureCollapse(itemKey)}
                              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none', flex: 1, minWidth: 0 }}
                            >
                              <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                              </span>
                              <strong className="sub-card-header-new" style={{ margin: 0, whiteSpace: 'nowrap' }}>
                                Đặc điểm #{index + 1}:
                              </strong>
                              <span style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.title ? item.title : '(Chưa đặt tiêu đề)'}
                              </span>
                              {isCollapsed && item.desc && (
                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.8 }}>
                                  — {item.desc}
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px', shrink: 0 }}>
                              <button
                                type="button"
                                onClick={() => toggleFeatureCollapse(itemKey)}
                                style={{
                                  background: 'var(--bg-surface-hover, rgba(255, 255, 255, 0.05))',
                                  color: 'var(--text-secondary)',
                                  border: '1px solid var(--border)',
                                  borderRadius: '6px',
                                  padding: '5px 10px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '500'
                                }}
                              >
                                {isCollapsed ? 'Mở rộng' : 'Thu nhỏ'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeatureItem(index)}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  color: '#ef4444',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '5px 10px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}
                              >
                                <Trash2 size={13} />
                                <span>Xóa</span>
                              </button>
                            </div>
                          </div>

                          {!isCollapsed && (
                            <div className="animate-fade-in-up" style={{ marginTop: '16px' }}>
                              <div className="grid-2" style={{ gap: '16px', marginBottom: '12px' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label-new">Tiêu đề</label>
                                  <input
                                    type="text"
                                    className="form-control-new"
                                    value={item.title || ''}
                                    onChange={(e) => handleUpdateFeatureItem(index, 'title', e.target.value)}
                                    placeholder="Nhập tiêu đề đặc điểm..."
                                  />
                                </div>

                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label-new">Biểu tượng (Icon)</label>
                                  <select
                                    className="form-control-new"
                                    value={item.icon || 'Shield'}
                                    onChange={(e) => handleUpdateFeatureItem(index, 'icon', e.target.value)}
                                  >
                                    <option value="Shield">🛡️ Khiên an toàn (Shield)</option>
                                    <option value="ThumbsUp">👍 Like / Chất lượng (ThumbsUp)</option>
                                    <option value="Truck">🚚 Xe tải vận chuyển (Truck)</option>
                                    <option value="Flame">🔥 Lửa xanh / Năng lượng (Flame)</option>
                                    <option value="Award">🏆 Cúp giải thưởng (Award)</option>
                                    <option value="Clock">🕒 Đồng hồ / 24/7 (Clock)</option>
                                    <option value="Heart">❤️ Trái tim / Tận tâm (Heart)</option>
                                    <option value="Star">⭐ Ngôi sao / Đánh giá (Star)</option>
                                    <option value="Activity">⚡ Năng suất (Activity)</option>
                                    <option value="Gift">🎁 Quà tặng / Ưu đãi (Gift)</option>
                                    <option value="Headphones">🎧 Hỗ trợ tư vấn (Headphones)</option>
                                    <option value="Smile">😊 Thân thiện (Smile)</option>
                                    <option value="CheckCircle">✅ Tích xanh chuẩn (CheckCircle)</option>
                                    <option value="Zap">⚡ Nhanh chóng (Zap)</option>
                                    <option value="Lock">🔒 Bảo mật / Khóa gas (Lock)</option>
                                    <option value="Package">📦 Đóng gói / Giao nhận (Package)</option>
                                    <option value="Users">👥 Đội ngũ / Khách hàng (Users)</option>
                                    <option value="Sparkles">✨ Sparkles / Nổi bật (Sparkles)</option>
                                  </select>
                                </div>
                              </div>

                              <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label-new">Mô tả chi tiết</label>
                                <textarea
                                  rows="2"
                                  className="form-control-new"
                                  value={item.desc || ''}
                                  onChange={(e) => handleUpdateFeatureItem(index, 'desc', e.target.value)}
                                  placeholder="Nhập nội dung mô tả..."
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <button
                      type="button"
                      onClick={handleAddFeatureItem}
                      className="btn-outline-new"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px'
                      }}
                    >
                      <Plus size={16} />
                      <span>Thêm đặc điểm nổi bật mới</span>
                    </button>
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
                  title="Khối gọi tư vấn / Kêu gọi hành động (CTA)"
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
                  <div className="form-card-sub-new" style={{ marginBottom: 0 }}>
                    <div className="form-group">
                      <label className="form-label-new">Tiêu đề chính CTA (Khối gọi tư vấn)</label>
                      <input type="text" name="home_cta_title" className="form-control-new" value={settings.home_cta_title} onChange={handleChange} />
                    </div>
                    <div className="settings-grid-2">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Dòng mô tả phụ CTA</label>
                        <input type="text" name="home_cta_desc" className="form-control-new" value={settings.home_cta_desc} onChange={handleChange} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label-new">Số Hotline hiển thị trên nút bấm CTA</label>
                        <input type="text" name="home_cta_phone" className="form-control-new" value={settings.home_cta_phone} onChange={handleChange} placeholder="vd: 0987.654.321" />
                      </div>
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

            <div className="settings-submit-box">
              <button type="submit" className="btn-primary-new" disabled={saving}>
                <Save size={16} />
                <span>{saving ? 'Đang lưu cài đặt...' : 'Lưu tất cả thay đổi'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

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
    </>
  );
}
