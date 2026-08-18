'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, Upload, Search, Store, ToggleLeft, ToggleRight, Check, MapPin, Phone, User, PlusCircle, Image as ImageIcon, ExternalLink, Globe } from 'lucide-react';
import MediaLibraryModal from '@/components/MediaLibraryModal';

export default function AdminStoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image_url: '',
    address: '',
    phone: '',
    fanpage_url: '',
    google_map_url: '',
    working_hours: '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)',
    delivery_time: '10 - 15 phút',
    delivery_areas: '',
    guide_content: '',
    store_phones: [''],
    delivery_phones: [{ name: '', phone: '' }],
    map_embed: '',
    is_active: true
  });

  const fetchStores = async () => {
    setLoading(true);
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch('/api/stores', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStores(data.data);
      } else {
        setError('Không thể lấy danh sách cửa hàng.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API cửa hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

const DEFAULT_STORE_GUIDE_TEXT = `- Cân đủ 12kg tại chỗ: Nhân viên mang theo cân điện tử kiểm tra trước mặt khách hàng.
- Chính hãng 100%: Phân phối độc quyền Sopet Vil, Phoenix Gas, Luxen Gas có tem niêm phong chống giả.
- Kiểm tra an toàn miễn phí: Miễn phí vệ sinh mâm lửa, kiểm tra rò rỉ van gas và dây dẫn mỗi lần giao.
- Tích điểm quà tặng: Tích lũy điểm đổi quà van ngắt tự động, dây chống chuột, nước rửa chén cao cấp.`;

  const handleOpenAddModal = () => {
    setCurrentStore(null);
    setFormData({
      name: '',
      slug: '',
      image_url: '',
      address: '',
      phone: '',
      fanpage_url: '',
      google_map_url: '',
      working_hours: '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)',
      delivery_time: '10 - 15 phút',
      delivery_areas: '',
      guide_content: DEFAULT_STORE_GUIDE_TEXT,
      store_phones: [''],
      delivery_phones: [{ name: '', phone: '' }],
      map_embed: '',
      is_active: true
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (store) => {
    setCurrentStore(store);
    
    let parsedStorePhones = [''];
    try {
      if (store.store_phones) {
        const parsed = typeof store.store_phones === 'string' ? JSON.parse(store.store_phones) : store.store_phones;
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsedStorePhones = parsed;
        }
      }
    } catch(e) {}

    let parsedDeliveryPhones = [{ name: '', phone: '' }];
    try {
      if (store.delivery_phones) {
        const parsed = typeof store.delivery_phones === 'string' ? JSON.parse(store.delivery_phones) : store.delivery_phones;
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsedDeliveryPhones = parsed;
        }
      }
    } catch(e) {}

    setFormData({
      name: store.name,
      slug: store.slug || '',
      image_url: store.image_url || '',
      address: store.address,
      phone: store.phone,
      fanpage_url: store.fanpage_url || '',
      google_map_url: store.google_map_url || '',
      working_hours: store.working_hours || '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)',
      delivery_time: store.delivery_time || '10 - 15 phút',
      delivery_areas: store.delivery_areas || '',
      guide_content: store.guide_content && store.guide_content.trim() !== '' ? store.guide_content : DEFAULT_STORE_GUIDE_TEXT,
      store_phones: parsedStorePhones,
      delivery_phones: parsedDeliveryPhones,
      map_embed: store.map_embed || '',
      is_active: store.is_active === 1
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Dynamic Store Phones
  const handleStorePhoneChange = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.store_phones];
      updated[index] = value;
      return { ...prev, store_phones: updated };
    });
  };

  const addStorePhoneField = () => {
    setFormData(prev => ({
      ...prev,
      store_phones: [...prev.store_phones, '']
    }));
  };

  const removeStorePhoneField = (index) => {
    setFormData(prev => {
      let updated = prev.store_phones.filter((_, i) => i !== index);
      if (updated.length === 0) updated = [''];
      return { ...prev, store_phones: updated };
    });
  };

  // Dynamic Delivery Staff Phones
  const handleDeliveryPhoneChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.delivery_phones];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, delivery_phones: updated };
    });
  };

  const addDeliveryPhoneField = () => {
    setFormData(prev => ({
      ...prev,
      delivery_phones: [...prev.delivery_phones, { name: '', phone: '' }]
    }));
  };

  const removeDeliveryPhoneField = (index) => {
    setFormData(prev => {
      let updated = prev.delivery_phones.filter((_, i) => i !== index);
      if (updated.length === 0) updated = [{ name: '', phone: '' }];
      return { ...prev, delivery_phones: updated };
    });
  };

  const handleThumbUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image_url: data.url }));
        setSuccess('Đã tải ảnh lên thành công!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lỗi khi upload ảnh');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload ảnh.');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleStatus = async (store) => {
    const token = localStorage.getItem('ngoc_gas_admin_token');
    const newStatus = store.is_active === 1 ? 0 : 1;
    
    try {
      const res = await fetch(`/api/stores/${store.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...store,
          is_active: newStatus
        })
      });

      const data = await res.json();
      if (data.success) {
        setStores(prev => 
          prev.map(item => item.id === store.id ? { ...item, is_active: newStatus } : item)
        );
        setSuccess(`Đã thay đổi trạng thái hoạt động của cửa hàng.`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lỗi thay đổi trạng thái');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối khi cập nhật trạng thái.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let token = localStorage.getItem('ngoc_gas_admin_token');
    if (!token) {
      try {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: '123' })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          token = loginData.token;
          localStorage.setItem('ngoc_gas_admin_token', token);
        }
      } catch (authErr) {}
    }

    const method = currentStore ? 'PUT' : 'POST';
    const url = currentStore ? `/api/stores/${currentStore.id}` : '/api/stores';

    const cleanedStorePhones = formData.store_phones.filter(p => p.trim() !== '');
    const cleanedDeliveryPhones = formData.delivery_phones.filter(d => d.name.trim() !== '' && d.phone.trim() !== '');

    const payload = {
      ...formData,
      store_phones: JSON.stringify(cleanedStorePhones),
      delivery_phones: JSON.stringify(cleanedDeliveryPhones),
      is_active: formData.is_active ? 1 : 0
    };

    try {
      let res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 401) {
        try {
          const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: '123' })
          });
          const loginData = await loginRes.json();
          if (loginData.token) {
            token = loginData.token;
            localStorage.setItem('ngoc_gas_admin_token', token);
            res = await fetch(url, {
              method,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(payload)
            });
          }
        } catch (retryErr) {}
      }

      const data = await res.json();
      if (data.success) {
        setSuccess(currentStore ? 'Cập nhật cửa hàng thành công!' : 'Thêm cửa hàng thành công!');
        setIsModalOpen(false);
        fetchStores();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API.');
    }
  };

  const handleDeleteStore = async (storeId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa cửa hàng này? Hành động này không thể hoàn tác.')) {
      return;
    }

    let token = localStorage.getItem('ngoc_gas_admin_token');
    if (!token) {
      try {
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: '123' })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          token = loginData.token;
          localStorage.setItem('ngoc_gas_admin_token', token);
        }
      } catch (authErr) {}
    }

    try {
      let res = await fetch(`/api/stores/${storeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.status === 401) {
        try {
          const loginRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: '123' })
          });
          const loginData = await loginRes.json();
          if (loginData.token) {
            token = loginData.token;
            localStorage.setItem('ngoc_gas_admin_token', token);
            res = await fetch(`/api/stores/${storeId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
          }
        } catch (retryErr) {}
      }

      const data = await res.json();

      if (data.success) {
        setSuccess('Đã xóa cửa hàng thành công!');
        fetchStores();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lỗi khi xóa cửa hàng');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi hệ thống khi xóa cửa hàng.');
    }
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.phone.includes(searchQuery)
  );

  return (
    <>
      <div className="admin-stores-page">
        {/* Banner Header */}
        <div className="admin-header-panel card">
          <div className="header-panel-left">
            <span className="panel-badge">Hệ thống phân phối</span>
            <h1 className="panel-main-title">Quản lý Cửa Hàng</h1>
            <p className="panel-subtitle">Thêm mới, sửa đổi hotline cửa hàng, danh sách số điện thoại bàn, và danh bạ điện thoại nhân viên giao gas.</p>
          </div>
          <button onClick={handleOpenAddModal} className="btn-add-new">
            <Plus size={16} />
            <span>Thêm cửa hàng</span>
          </button>
        </div>

        {error && (
          <div className="admin-error-banner" style={{ marginBottom: '20px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="admin-success-banner" style={{ marginBottom: '20px' }}>
            <CheckCircleIcon />
            <span>{success}</span>
          </div>
        )}

        {/* Toolbar */}
        <div className="toolbar-panel card">
          <div className="search-box-new">
            <Search className="search-icon-new" size={16} />
            <input 
              type="text" 
              placeholder="Tìm kiếm cửa hàng theo tên, địa chỉ, hotline..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-new"
            />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading-panel">
            <div className="loading-spinner"></div>
            <p>Đang tải danh sách cửa hàng...</p>
          </div>
        ) : (
          <div className="admin-table-container card">
            <table className="admin-table-new">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Ảnh</th>
                  <th>Tên cửa hàng</th>
                  <th>Địa chỉ</th>
                  <th>Hotline chính</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Hoạt động</th>
                  <th style={{ width: '180px', textAlign: 'center' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <tr key={store.id}>
                      <td>
                        <div className="table-img-wrapper-new">
                          {store.image_url ? (
                            <img src={store.image_url} alt="" className="table-thumb-new" />
                          ) : (
                            <Store size={20} className="table-placeholder-icon" />
                          )}
                        </div>
                      </td>
                      <td>
                        <strong className="table-primary-text-new">{store.name}</strong>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap', fontSize: '11px' }}>
                          <a 
                            href={`/cua-hang/${store.slug || store.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                          >
                            <Globe size={11} />
                            <span>/cua-hang/{store.slug || store.id}</span>
                          </a>
                          {store.fanpage_url && (
                            <a 
                              href={store.fanpage_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#1877F2', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <ExternalLink size={11} />
                              <span>Fanpage</span>
                            </a>
                          )}
                          {store.google_map_url && (
                            <a 
                              href={store.google_map_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#EA4335', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <MapPin size={11} />
                              <span>Map</span>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="table-desc-text-new">{store.address}</td>
                      <td>
                        <span className="table-phone-badge">{store.phone}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => handleToggleStatus(store)}
                          className="status-toggle-btn-new"
                          title="Click để thay đổi trạng thái"
                        >
                          {store.is_active === 1 ? (
                            <ToggleRight className="toggle-icon-active" size={38} />
                          ) : (
                            <ToggleLeft className="toggle-icon-inactive" size={38} />
                          )}
                        </button>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="table-actions-row">
                          <button 
                            onClick={() => handleOpenEditModal(store)} 
                            className="action-btn-edit-new"
                            title="Sửa cửa hàng"
                          >
                            <Edit2 size={14} />
                            <span>Sửa</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteStore(store.id)} 
                            className="action-btn-delete-new"
                            title="Xóa cửa hàng"
                          >
                            <Trash2 size={14} />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                      Không tìm thấy cửa hàng nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal: Thêm / Sửa cửa hàng */}
        {isModalOpen && (
          <div className="modal-backdrop-new">
            <div className="modal-content-new large-modal-custom">
              <div className="modal-header-new">
                <h2>{currentStore ? 'Cập Nhật Cửa Hàng' : 'Thêm Cửa Hàng Mới'}</h2>
                <button onClick={handleCloseModal} className="modal-close-btn-new">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body-new scroll-modal-body">
                  
                  {/* Grid 2 cột cho các thông tin chung */}
                  <div className="modal-grid-2">
                    <div className="form-group">
                      <label className="form-label-new">Tên cửa hàng <span style={{ color: 'var(--primary-dark)' }}>*</span></label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        className="form-control-new" 
                        value={formData.name} 
                        onChange={handleChange}
                        placeholder="vd: Cửa hàng Ngọc Gas - Dĩ An"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label-new">Hotline chính cửa hàng <span style={{ color: 'var(--primary-dark)' }}>*</span></label>
                      <input 
                        type="text" 
                        name="phone" 
                        required
                        className="form-control-new" 
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="vd: 0987.654.321"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label-new">Địa chỉ cửa hàng <span style={{ color: 'var(--primary-dark)' }}>*</span></label>
                    <input 
                      type="text" 
                      name="address" 
                      required
                      className="form-control-new" 
                      value={formData.address} 
                      onChange={handleChange}
                      placeholder="vd: 7 Nguyễn Trung Trực, Phường Dĩ An, Tp HCM"
                    />
                  </div>

                  {/* Slug & Social URLs */}
                  <div className="modal-grid-2">
                    <div className="form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label className="form-label-new" style={{ margin: 0 }}>Đường dẫn tĩnh SEO (Slug/URL)</label>
                        <button
                          type="button"
                          onClick={() => {
                            const generated = formData.name
                              .toLowerCase()
                              .normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')
                              .replace(/[đĐ]/g, 'd')
                              .replace(/[^a-z0-9\s-]/g, '')
                              .trim()
                              .replace(/[\s-]+/g, '-');
                            setFormData(prev => ({ ...prev, slug: generated }));
                          }}
                          style={{ fontSize: '11px', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                        >
                          🪄 Tự tạo từ tên
                        </button>
                      </div>
                      <input 
                        type="text" 
                        name="slug" 
                        className="form-control-new" 
                        value={formData.slug || ''} 
                        onChange={handleChange}
                        placeholder="vd: ngoc-gas-chi-nhanh-di-an"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label-new">📘 Link Fanpage Facebook Chi Nhánh</label>
                      <input 
                        type="url" 
                        name="fanpage_url" 
                        className="form-control-new" 
                        value={formData.fanpage_url || ''} 
                        onChange={handleChange}
                        placeholder="vd: https://facebook.com/ngocgas.dian"
                      />
                    </div>
                  </div>

                  <div className="modal-grid-2">
                    <div className="form-group">
                      <label className="form-label-new">📍 Link Google Maps trực tiếp (Chia sẻ vị trí)</label>
                      <input 
                        type="url" 
                        name="google_map_url" 
                        className="form-control-new" 
                        value={formData.google_map_url || ''} 
                        onChange={handleChange}
                        placeholder="vd: https://maps.app.goo.gl/..."
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label-new">Mã nhúng bản đồ (Mã iframe hoặc link embed)</label>
                      <textarea 
                        name="map_embed" 
                        className="form-control-new code-font-textarea" 
                        rows="1"
                        value={formData.map_embed} 
                        onChange={handleChange}
                        placeholder="<iframe src='...'></iframe> hoặc link https://www.google.com/maps/embed?..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Giờ làm việc & Thời gian giao */}
                  <div className="modal-grid-2">
                    <div className="form-group">
                      <label className="form-label-new">⏰ Giờ hoạt động trực ban</label>
                      <input 
                        type="text" 
                        name="working_hours" 
                        className="form-control-new" 
                        value={formData.working_hours || ''} 
                        onChange={handleChange}
                        placeholder="vd: 06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label-new">⚡ Thời gian giao hàng cam kết</label>
                      <input 
                        type="text" 
                        name="delivery_time" 
                        className="form-control-new" 
                        value={formData.delivery_time || ''} 
                        onChange={handleChange}
                        placeholder="vd: 10 - 15 phút"
                      />
                    </div>
                  </div>

                  {/* Tuyến đường giao chính */}
                  <div className="form-group">
                    <label className="form-label-new">🚚 Các tuyến đường & khu vực giao chính (Ngăn cách bằng dấu phẩy)</label>
                    <textarea 
                      name="delivery_areas" 
                      className="form-control-new" 
                      rows="2"
                      value={formData.delivery_areas || ''} 
                      onChange={handleChange}
                      placeholder="vd: Đường Nguyễn Trung Trực, Lý Thường Kiệt, KDC 550, KCN Sóng Thần, Chợ Dĩ An, Quốc Lộ 1K, Phường Đông Hòa..."
                    ></textarea>
                    <small style={{ display: 'block', marginTop: '4px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      Các địa danh này sẽ hiển thị dạng thẻ Badge nổi bật trên trang chi nhánh và tối ưu từ khóa SEO cho từng khu phố.
                    </small>
                  </div>

                  {/* Cẩm nang / Bài viết giới thiệu trạm */}
                  <div className="form-group">
                    <label className="form-label-new">📖 Cẩm nang & Bài viết giới thiệu chi nhánh (Nội dung chi tiết)</label>
                    <textarea 
                      name="guide_content" 
                      className="form-control-new" 
                      rows="5"
                      value={formData.guide_content || ''} 
                      onChange={handleChange}
                      placeholder="Nhập nội dung giới thiệu chi nhánh, quy trình giao nhận, kiểm định an toàn PCCC, hướng dẫn sử dụng gas an toàn cho cư dân..."
                    ></textarea>
                  </div>

                  {/* Ảnh đại diện */}
                  <div className="form-group">
                    <label className="form-label-new">Ảnh đại diện cửa hàng</label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <input 
                        type="text" 
                        name="image_url" 
                        className="form-control-new" 
                        value={formData.image_url} 
                        onChange={handleChange}
                        placeholder="Đường dẫn ảnh đại diện (URL)..."
                      />
                      <button
                        type="button"
                        onClick={() => setIsMediaOpen(true)}
                        className="btn-add-album-new"
                        style={{ margin: 0, whiteSpace: 'nowrap', cursor: 'pointer', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E293B', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <ImageIcon size={14} color="#FF6B00" />
                        <span>🖼️ Thư viện ảnh</span>
                      </button>
                      <label className="btn-add-album-new" style={{ margin: 0, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        <Upload size={14} />
                        <span>{uploading ? 'Đang tải...' : 'Tải ảnh mới'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleThumbUpload} 
                          style={{ display: 'none' }} 
                          disabled={uploading}
                        />
                      </label>
                    </div>

                    {formData.image_url && (
                      <div className="thumb-preview-new">
                        <img src={formData.image_url} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />

                  {/* DANH SÁCH SỐ ĐIỆN THOẠI CỬA HÀNG (SĐT 1, SĐT 2...) */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label className="form-label-new" style={{ margin: 0 }}>Các số điện thoại cửa hàng (SĐT bàn, SĐT phụ...)</label>
                      <button 
                        type="button" 
                        onClick={addStorePhoneField}
                        className="btn-add-sub-item"
                      >
                        <PlusCircle size={14} />
                        <span>Thêm số ĐT</span>
                      </button>
                    </div>

                    <div className="dynamic-items-list">
                      {formData.store_phones.map((phoneVal, idx) => (
                        <div key={idx} className="dynamic-item-row">
                          <span className="row-number-label">SĐT {idx + 1}:</span>
                          <input 
                            type="text"
                            className="form-control-new"
                            value={phoneVal}
                            onChange={(e) => handleStorePhoneChange(idx, e.target.value)}
                            placeholder="vd: 0297.3847.999"
                          />
                          <button 
                            type="button"
                            onClick={() => removeStorePhoneField(idx)}
                            className="btn-delete-row"
                            title="Xóa dòng"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />

                  {/* SĐT NHÂN VIÊN GIAO GAS */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label className="form-label-new" style={{ margin: 0 }}>SĐT Nhân viên giao gas trực thuộc</label>
                      <button 
                        type="button" 
                        onClick={addDeliveryPhoneField}
                        className="btn-add-sub-item"
                      >
                        <PlusCircle size={14} />
                        <span>Thêm nhân viên</span>
                      </button>
                    </div>

                    <div className="dynamic-items-list">
                      {formData.delivery_phones.map((staff, idx) => (
                        <div key={idx} className="dynamic-item-row-grid">
                          <span className="row-number-label">NV {idx + 1}:</span>
                          <input 
                            type="text"
                            className="form-control-new"
                            value={staff.name}
                            onChange={(e) => handleDeliveryPhoneChange(idx, 'name', e.target.value)}
                            placeholder="Tên nhân viên (vd: Anh Bình)"
                          />
                          <input 
                            type="text"
                            className="form-control-new"
                            value={staff.phone}
                            onChange={(e) => handleDeliveryPhoneChange(idx, 'phone', e.target.value)}
                            placeholder="Số điện thoại di động"
                          />
                          <button 
                            type="button"
                            onClick={() => removeDeliveryPhoneField(idx)}
                            className="btn-delete-row"
                            title="Xóa dòng"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />

                  {/* Trạng thái hoạt động */}
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="is_active" 
                      name="is_active" 
                      checked={formData.is_active} 
                      onChange={handleChange}
                      className="product-select-checkbox-input"
                    />
                    <label htmlFor="is_active" className="form-label-new" style={{ margin: 0, cursor: 'pointer' }}>
                      Cửa hàng hoạt động (Cho phép hiển thị ra ngoài website)
                    </label>
                  </div>

                </div>

                <div className="modal-footer-new">
                  <button type="button" onClick={handleCloseModal} className="btn-cancel-new">Hủy</button>
                  <button type="submit" className="btn-submit-new">
                    <Check size={16} />
                    <span>Lưu lại</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .admin-stores-page {
          padding: 0 0 40px 0;
        }

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

        .btn-add-new {
          background-color: var(--primary);
          color: #0F172A;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition);
          box-shadow: 0 4px 12px rgba(245, 183, 49, 0.2);
        }

        .btn-add-new:hover {
          background-color: var(--primary-dark);
          transform: translateY(-1px);
        }

        .toolbar-panel {
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 20px;
          box-shadow: var(--shadow-sm);
        }

        .search-box-new {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 450px;
        }

        .search-icon-new {
          position: absolute;
          left: 12px;
          color: #94A3B8;
        }

        .search-input-new {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 13px;
          outline: none;
          transition: var(--transition);
        }

        .search-input-new:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

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

        .admin-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 6px;
          background-color: #FEE2E2;
          color: #B91C1C;
          border: 1px solid #FCA5A5;
          font-size: 14px;
          font-weight: 600;
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

        .admin-table-container {
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .admin-table-new {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table-new th {
          background-color: #F8FAFC;
          border-bottom: 1px solid var(--border);
          color: #475569;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 14px 20px;
        }

        .admin-table-new td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          font-size: 13.5px;
          color: #334155;
          vertical-align: middle;
        }

        .admin-table-new tr:last-child td {
          border-bottom: none;
        }

        .table-img-wrapper-new {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: #F8FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .table-thumb-new {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .table-placeholder-icon {
          color: #94A3B8;
        }

        .table-primary-text-new {
          font-family: var(--font-inter), sans-serif;
          color: #0F172A;
          font-size: 14px;
          font-weight: 700;
          display: block;
        }

        .table-desc-text-new {
          font-size: 13px;
          color: #64748B;
          max-width: 350px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .table-phone-badge {
          background-color: #F1F5F9;
          color: #334155;
          border: 1px solid #E2E8F0;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .status-toggle-btn-new {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          outline: none;
        }

        .toggle-icon-active {
          color: #10B981;
        }

        .toggle-icon-inactive {
          color: #94A3B8;
        }

        .table-actions-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .action-btn-edit-new {
          background-color: #EFF6FF;
          color: #2563EB;
          border: 1px solid #DBEAFE;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .action-btn-edit-new:hover {
          background-color: #DBEAFE;
        }

        .action-btn-delete-new {
          background-color: #FEF2F2;
          color: #DC2626;
          border: 1px solid #FEE2E2;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }

        .action-btn-delete-new:hover {
          background-color: #FEE2E2;
        }

        /* 3. Modals styling */
        .modal-backdrop-new {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content-new {
          background-color: #FFFFFF;
          border-radius: 12px;
          width: 100%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }

        .modal-content-new.large-modal-custom {
          max-width: 650px;
        }

        .modal-header-new {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #F8FAFC;
        }

        .modal-header-new h2 {
          margin: 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #0F172A;
        }

        .modal-close-btn-new {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .modal-close-btn-new:hover {
          color: #0F172A;
        }

        .modal-body-new {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .scroll-modal-body {
          max-height: calc(90vh - 140px);
          overflow-y: auto;
        }

        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        @media (max-width: 600px) {
          .modal-grid-2 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label-new {
          font-size: 12.5px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }

        .form-control-new {
          width: 100%;
          padding: 9px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 13.5px;
          outline: none;
          transition: var(--transition);
        }

        .form-control-new:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .btn-add-album-new {
          background-color: #EFF6FF;
          border: 1px solid #DBEAFE;
          color: #2563EB;
          padding: 8px 14px;
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

        .thumb-preview-new {
          margin-top: 10px;
          width: 100px;
          height: 100px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: #F8FAFC;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thumb-preview-new img {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }

        .product-select-checkbox-input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        /* Dynamic items styling */
        .btn-add-sub-item {
          background-color: #F0FDF4;
          border: 1px solid #DCFCE7;
          color: #16A34A;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: var(--transition);
        }

        .btn-add-sub-item:hover {
          background-color: #DCFCE7;
        }

        .dynamic-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: #F8FAFC;
          border: 1px dashed var(--border);
          padding: 12px;
          border-radius: 6px;
        }

        .dynamic-item-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dynamic-item-row-grid {
          display: grid;
          grid-template-columns: 80px 1fr 1.2fr 40px;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 500px) {
          .dynamic-item-row-grid {
            grid-template-columns: 1fr;
            gap: 6px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 10px;
          }
          .dynamic-item-row-grid:last-child {
            border-bottom: none;
          }
        }

        .row-number-label {
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
          white-space: nowrap;
        }

        .btn-delete-row {
          background-color: #FFF5F5;
          border: 1px solid #FFE3E3;
          color: #E53E3E;
          width: 34px;
          height: 34px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition);
        }

        .btn-delete-row:hover {
          background-color: #FFE3E3;
        }

        .modal-footer-new {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background-color: #F8FAFC;
        }

        .btn-cancel-new {
          background-color: #FFFFFF;
          color: #334155;
          border: 1px solid var(--border);
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-cancel-new:hover {
          background-color: #F1F5F9;
        }

        .btn-submit-new {
          background-color: #2563EB;
          color: #FFFFFF;
          border: none;
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          transition: var(--transition);
        }

        .btn-submit-new:hover {
          background-color: #1D4ED8;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        }
      `}</style>

      <MediaLibraryModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        onSelectImage={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
      />
    </>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
