'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, Upload, Bold, Italic, Type, Image as ImageIcon, Search, Filter, Eye, Star, ToggleLeft, ToggleRight, Check, Link2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all | featured | active | inactive

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    description: '',
    price: '',
    sale_price: '',
    image_url: '',
    images: '[]',
    category_id: '',
    is_featured: false,
    is_active: true
  });

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const resProd = await fetch('/api/products', { headers });
      const dataProd = await resProd.json();
      
      const resCat = await fetch('/api/categories', { headers });
      const dataCat = await resCat.json();

      if (dataProd.success && dataCat.success) {
        setProducts(dataProd.data);
        setCategories(dataCat.data);
      } else {
        setError('Không thể lấy danh sách sản phẩm hoặc danh mục.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const handleOpenAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      slug: '',
      short_description: '',
      description: '',
      price: '',
      sale_price: '',
      image_url: '',
      images: '[]',
      category_id: categories[0]?.id || '',
      is_featured: false,
      is_active: true
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      short_description: product.short_description || '',
      description: product.description || '',
      price: product.price || '',
      sale_price: product.sale_price || '',
      image_url: product.image_url || '',
      images: product.images || '[]',
      category_id: product.category_id || '',
      is_featured: product.is_featured === 1,
      is_active: product.is_active === 1
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'name' && !currentProduct) {
      const slugVal = value
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: slugVal
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
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

  const handleAlbumUpload = async (e) => {
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
        const currentImages = JSON.parse(formData.images || '[]');
        currentImages.push(data.url);
        setFormData(prev => ({ ...prev, images: JSON.stringify(currentImages) }));
      } else {
        setError(data.message || 'Lỗi khi upload ảnh album');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload ảnh.');
    } finally {
      setUploading(false);
    }
  };

  const deleteAlbumImage = (index) => {
    const currentImages = JSON.parse(formData.images || '[]');
    currentImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: JSON.stringify(currentImages) }));
  };

  const handleInsertImageIntoDesc = async (e) => {
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
        const imgTag = `<img src="${data.url}" alt="ảnh chi tiết" style="max-width:100%; height:auto; margin:15px 0; border-radius:8px; display:block;" />`;
        const textarea = document.getElementById('description');
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const newVal = text.substring(0, start) + imgTag + text.substring(end);
          setFormData(prev => ({ ...prev, description: newVal }));
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + imgTag.length, start + imgTag.length);
          }, 10);
        }
      } else {
        setError(data.message || 'Lỗi khi upload ảnh cho mô tả');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload ảnh.');
    } finally {
      setUploading(false);
    }
  };

  const insertFormat = (tag) => {
    const textarea = document.getElementById('description');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    let formatted = '';

    if (tag === 'p') formatted = `<p>${selected || 'Đoạn văn bản'}</p>`;
    else if (tag === 'b') formatted = `<strong>${selected || 'Chữ đậm'}</strong>`;
    else if (tag === 'i') formatted = `<em>${selected || 'Chữ nghiêng'}</em>`;
    else if (tag === 'h2') formatted = `<h2>${selected || 'Tiêu đề 2'}</h2>`;
    else if (tag === 'h3') formatted = `<h3>${selected || 'Tiêu đề 3'}</h3>`;
    else if (tag === 'br') formatted = `${text.substring(0, start)}<br />${text.substring(end)}`;

    const newVal = tag === 'br' ? formatted : text.substring(0, start) + formatted + text.substring(end);
    setFormData(prev => ({ ...prev, description: newVal }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formatted.length, start + formatted.length);
    }, 10);
  };

  const insertLink = () => {
    const textarea = document.getElementById('description');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const url = prompt('Nhập địa chỉ liên kết (URL) của bạn:', 'https://');
    if (url === null) return; // User cancelled

    const linkText = selected || prompt('Nhập văn bản hiển thị cho liên kết:', 'Xem thêm tại đây') || url;
    
    // Determine if it is external or internal
    const isInternal = url.startsWith('/') || url.includes(window.location.hostname);
    const targetAttr = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
    
    const linkTag = `<a href="${url}"${targetAttr} style="color: var(--primary-dark); text-decoration: underline; font-weight: 600;">${linkText}</a>`;
    
    const newVal = text.substring(0, start) + linkTag + text.substring(end);
    setFormData(prev => ({ ...prev, description: newVal }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + linkTag.length, start + linkTag.length);
    }, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.slug.trim()) {
      setError('Tên sản phẩm và slug là bắt buộc');
      return;
    }

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const url = currentProduct ? `/api/products/${currentProduct.id}` : '/api/products';
    const method = currentProduct ? 'PUT' : 'POST';

    const submissionData = {
      ...formData,
      price: formData.price === '' ? null : Number(formData.price),
      sale_price: formData.sale_price === '' ? null : Number(formData.sale_price)
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(currentProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
        setIsModalOpen(false);
        fetchProductsAndCategories();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lưu sản phẩm thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi khi lưu sản phẩm.');
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    setError('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Đã xóa sản phẩm thành công!');
        fetchProductsAndCategories();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Xóa sản phẩm thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API xóa.');
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Client-side filtering logic
  const filteredProducts = products.filter(prod => {
    // Search query match
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category match
    const matchesCategory = selectedCategoryFilter === 'all' || prod.category_id.toString() === selectedCategoryFilter;
    
    // Status match
    let matchesStatus = true;
    if (statusFilter === 'featured') matchesStatus = prod.is_featured === 1;
    else if (statusFilter === 'active') matchesStatus = prod.is_active === 1;
    else if (statusFilter === 'inactive') matchesStatus = prod.is_active === 0;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const albumImages = JSON.parse(formData.images || '[]');

  return (
    <>
      <div className="admin-products-page">
        {/* Banner header mới sang trọng */}
        <div className="admin-header-panel card">
          <div className="header-panel-left">
            <span className="panel-badge">Danh mục quản lý</span>
            <h1 className="panel-main-title">Quản lý Sản phẩm</h1>
            <p className="panel-subtitle">Quản lý kho gas dân dụng, gas công nghiệp, thiết lập giá bán lẻ, giá khuyến mãi và album ảnh chi tiết.</p>
          </div>
          <button onClick={handleOpenAddModal} className="btn btn-primary btn-add-new-prod">
            <Plus size={18} />
            <span>Thêm sản phẩm mới</span>
          </button>
        </div>

        {success && (
          <div className="admin-success-banner" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Check size={18} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="admin-error-banner" style={{ marginTop: '20px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Toolbar Lọc và Tìm kiếm siêu chuyên nghiệp */}
        <div className="admin-toolbar-panel card">
          <div className="toolbar-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm tên sản phẩm, mã slug..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="toolbar-input"
            />
          </div>

          <div className="toolbar-filters-group">
            {/* Lọc danh mục */}
            <div className="filter-select-wrapper">
              <Filter size={16} className="filter-icon" />
              <select 
                value={selectedCategoryFilter} 
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="toolbar-select"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Lọc trạng thái */}
            <div className="status-tabs-row">
              <button 
                type="button" 
                onClick={() => setStatusFilter('all')} 
                className={`status-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
              >
                Tất cả ({products.length})
              </button>
              <button 
                type="button" 
                onClick={() => setStatusFilter('featured')} 
                className={`status-tab-btn ${statusFilter === 'featured' ? 'active' : ''}`}
              >
                Nổi bật ({products.filter(p => p.is_featured === 1).length})
              </button>
              <button 
                type="button" 
                onClick={() => setStatusFilter('active')} 
                className={`status-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
              >
                Hoạt động ({products.filter(p => p.is_active === 1).length})
              </button>
              <button 
                type="button" 
                onClick={() => setStatusFilter('inactive')} 
                className={`status-tab-btn ${statusFilter === 'inactive' ? 'active' : ''}`}
              >
                Tạm ẩn ({products.filter(p => p.is_active === 0).length})
              </button>
            </div>
          </div>
        </div>

        {/* Bảng sản phẩm hiện đại */}
        {loading ? (
          <div className="admin-loading-skeleton card">
            <div className="skeleton-line header-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
          </div>
        ) : (
          <div className="admin-table-container card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Sản phẩm</th>
                  <th style={{ width: '15%' }}>Danh mục</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Giá gốc</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Giá Khuyến mãi</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>Nổi bật</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ width: '10%', textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(prod => (
                    <tr key={prod.id} className="admin-table-row">
                      <td>
                        <div className="prod-meta-cell">
                          <div className="prod-thumb-container">
                            {prod.image_url ? (
                              <img src={prod.image_url} alt="" className="prod-table-thumb" />
                            ) : (
                              <ImageIcon size={20} className="prod-table-placeholder" />
                            )}
                          </div>
                          <div className="prod-title-box">
                            <span className="prod-name-bold">{prod.name}</span>
                            <span className="prod-slug-sub">{prod.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag">{prod.category_name}</span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '500', color: 'var(--text)' }}>
                        {formatPrice(prod.price)}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--error)' }}>
                        {prod.sale_price ? formatPrice(prod.sale_price) : '—'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {prod.is_featured === 1 ? (
                          <span className="badge-icon-featured" title="Sản phẩm nổi bật">
                            <Star size={16} fill="var(--primary)" color="var(--primary-dark)" />
                          </span>
                        ) : (
                          <span className="badge-icon-normal">—</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-pill ${prod.is_active === 1 ? 'active' : 'inactive'}`}>
                          {prod.is_active === 1 ? 'Hoạt động' : 'Tạm ẩn'}
                        </span>
                      </td>
                      <td className="actions-cell-new">
                        <button onClick={() => handleOpenEditModal(prod)} className="action-btn edit-btn-new" title="Chỉnh sửa">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(prod.id)} className="action-btn delete-btn-new" title="Xóa">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                      Không tìm thấy sản phẩm nào khớp với bộ lọc của bạn.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Editor dạng 2 Cột chuyên nghiệp giống WooCommerce / Shopify */}
        {isModalOpen && (
          <div className="admin-modal-overlay-new">
            <div className="admin-modal-content-new card">
              <div className="modal-header-new">
                <div>
                  <span className="modal-badge-top">{currentProduct ? 'ID: ' + currentProduct.id : 'Mới'}</span>
                  <h2>{currentProduct ? 'Chỉnh sửa chi tiết Sản phẩm' : 'Tạo mới Sản phẩm'}</h2>
                </div>
                <button onClick={handleCloseModal} className="modal-close-btn-new">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-body-form-new">
                <div className="modal-two-columns-layout">
                  
                  {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
                  <div className="modal-left-column">
                    <div className="form-section-card">
                      <h3 className="section-card-title">Thông tin tổng quan</h3>
                      
                      <div className="form-group">
                        <label htmlFor="name" className="form-label-new">Tên sản phẩm *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control-new"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Nhập tên sản phẩm (vd: Bình gas Petrolimex 12kg Xám)"
                        />
                      </div>

                      <div className="form-group grid-2-columns">
                        <div>
                          <label htmlFor="slug" className="form-label-new">URL Slug *</label>
                          <input
                            type="text"
                            id="slug"
                            name="slug"
                            className="form-control-new"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="binh-gas-petrolimex"
                          />
                        </div>
                        <div>
                          <label htmlFor="category_id" className="form-label-new">Danh mục sản phẩm *</label>
                          <select
                            id="category_id"
                            name="category_id"
                            className="form-control-new"
                            value={formData.category_id}
                            onChange={handleChange}
                          >
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group grid-2-columns">
                        <div>
                          <label htmlFor="price" className="form-label-new">Giá gốc (VNĐ)</label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control-new"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="430000"
                          />
                        </div>
                        <div>
                          <label htmlFor="sale_price" className="form-label-new">Giá khuyến mãi (VNĐ)</label>
                          <input
                            type="number"
                            id="sale_price"
                            name="sale_price"
                            className="form-control-new"
                            value={formData.sale_price}
                            onChange={handleChange}
                            placeholder="Để trống nếu không giảm giá"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section-card">
                      <h3 className="section-card-title">Mô tả sản phẩm</h3>
                      
                      <div className="form-group">
                        <label htmlFor="short_description" className="form-label-new">Mô tả ngắn (Hiển thị nổi bật cạnh giá bán)</label>
                        <textarea
                          id="short_description"
                          name="short_description"
                          className="form-control-new"
                          rows="3"
                          value={formData.short_description}
                          onChange={handleChange}
                          placeholder="Mô tả nhanh đặc trưng (vd: Vỏ bình dày, công nghệ chống cháy nổ...)"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label htmlFor="description" className="form-label-new" style={{ margin: 0 }}>Mô tả chi tiết (Long Description)</label>
                          <div className="editor-toolbar-new">
                            <button type="button" onClick={() => insertFormat('b')} className="editor-tool-btn" title="Chữ đậm"><Bold size={13} /></button>
                            <button type="button" onClick={() => insertFormat('i')} className="editor-tool-btn" title="Chữ nghiêng"><Italic size={13} /></button>
                            <button type="button" onClick={() => insertFormat('p')} className="editor-tool-btn" title="Đoạn văn"><Type size={13} /></button>
                            <button type="button" onClick={() => insertFormat('h2')} className="editor-tool-btn text-btn" title="Tiêu đề 2">H2</button>
                            <button type="button" onClick={() => insertFormat('h3')} className="editor-tool-btn text-btn" title="Tiêu đề 3">H3</button>
                            <button type="button" onClick={insertLink} className="editor-tool-btn" title="Chèn liên kết (Link)"><Link2 size={13} /></button>
                            <div className="tool-divider"></div>
                            
                            <label className="editor-tool-btn media-btn" title="Chèn ảnh vào mô tả">
                              <ImageIcon size={13} />
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleInsertImageIntoDesc} 
                                style={{ display: 'none' }} 
                                disabled={uploading}
                              />
                            </label>
                          </div>
                        </div>
                        <textarea
                          id="description"
                          name="description"
                          className="form-control-new code-font-textarea"
                          rows="8"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Soạn thảo thông số kỹ thuật, xuất xứ, hướng dẫn an toàn sử dụng..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* CỘT PHẢI: MEDIA & SETTINGS */}
                  <div className="modal-right-column">
                    {/* Ảnh đại diện */}
                    <div className="form-section-card">
                      <h3 className="section-card-title">Hình ảnh đại diện</h3>
                      <div className="main-image-upload-zone">
                        {formData.image_url ? (
                          <div className="uploaded-image-preview-box">
                            <img src={formData.image_url} alt="" className="preview-img-main" />
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))} className="remove-image-overlay-btn" title="Xóa ảnh">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="image-drop-zone-trigger">
                            <Upload size={28} className="upload-zone-icon" />
                            <strong>Tải ảnh chính lên</strong>
                            <span>Chấp nhận PNG, JPG, JPEG</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleThumbUpload} 
                              style={{ display: 'none' }} 
                              disabled={uploading}
                            />
                          </label>
                        )}
                      </div>
                      
                      <div className="form-group" style={{ marginTop: '12px' }}>
                        <label htmlFor="image_url" className="form-label-new">Đường dẫn ảnh chính (URL)</label>
                        <input
                          type="text"
                          id="image_url"
                          name="image_url"
                          className="form-control-new font-sm-input"
                          value={formData.image_url}
                          onChange={handleChange}
                          placeholder="Dán link ảnh từ bên ngoài nếu có"
                        />
                      </div>
                    </div>

                    {/* Album ảnh phụ */}
                    <div className="form-section-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h3 className="section-card-title" style={{ margin: 0 }}>Album ảnh phụ</h3>
                        <label className="btn-add-album-new">
                          <Plus size={14} />
                          <span>Tải ảnh phụ</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleAlbumUpload} 
                            style={{ display: 'none' }} 
                            disabled={uploading}
                          />
                        </label>
                      </div>

                      {albumImages.length > 0 ? (
                        <div className="album-preview-list-new">
                          {albumImages.map((url, idx) => (
                            <div key={idx} className="album-preview-item-new">
                              <img src={url} alt="" />
                              <button type="button" onClick={() => deleteAlbumImage(idx)} className="delete-album-item-btn">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-album-notice">
                          <ImageIcon size={24} />
                          <span>Chưa có ảnh phụ nào</span>
                        </div>
                      )}
                    </div>

                    {/* Cài đặt hiển thị */}
                    <div className="form-section-card">
                      <h3 className="section-card-title">Cài đặt hiển thị</h3>
                      
                      <div className="switch-settings-group">
                        <label className="switch-row-item">
                          <div className="switch-row-left">
                            <strong>Sản phẩm Nổi bật</strong>
                            <p>Hiển thị ở trang chủ</p>
                          </div>
                          <input
                            type="checkbox"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                            className="switch-toggle-input"
                          />
                        </label>

                        <label className="switch-row-item">
                          <div className="switch-row-left">
                            <strong>Kích hoạt hoạt động</strong>
                            <p>Cho phép khách thấy sản phẩm</p>
                          </div>
                          <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                            className="switch-toggle-input"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="modal-footer-new">
                  <button type="button" onClick={handleCloseModal} className="btn-outline-new">Đóng</button>
                  <button type="submit" className="btn-primary-new" disabled={uploading}>
                    <Check size={16} />
                    <span>Lưu sản phẩm</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
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

        .btn-add-new-prod {
          padding: 12px 24px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(245, 183, 49, 0.3);
        }

        /* 2. Toolbar Panel */
        .admin-toolbar-panel {
          background-color: #FFFFFF;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
          border: 1px solid var(--border);
        }

        @media (max-width: 900px) {
          .admin-toolbar-panel {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
        }

        .toolbar-search-box {
          position: relative;
          flex-grow: 1;
          max-width: 450px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .toolbar-input {
          width: 100%;
          padding: 10px 14px 10px 42px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 14px;
          background-color: #F8FAFC;
          transition: var(--transition);
        }

        .toolbar-input:focus {
          border-color: var(--primary-dark);
          background-color: #FFFFFF;
          outline: none;
          box-shadow: 0 0 0 3px rgba(245, 183, 49, 0.15);
        }

        .toolbar-filters-group {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .filter-icon {
          position: absolute;
          left: 12px;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .toolbar-select {
          padding: 10px 30px 10px 34px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 14px;
          background-color: #F8FAFC;
          cursor: pointer;
          font-weight: 600;
          color: var(--text);
          outline: none;
        }

        .status-tabs-row {
          display: flex;
          background-color: #F1F5F9;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
        }

        .status-tab-btn {
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
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

        /* 3. Table UI Styles */
        .prod-meta-cell {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .prod-thumb-container {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .prod-table-thumb {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .prod-table-placeholder {
          color: var(--text-secondary);
          opacity: 0.4;
        }

        .prod-title-box {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .prod-name-bold {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
        }

        .prod-slug-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .category-tag {
          display: inline-block;
          background-color: #F1F5F9;
          color: #475569;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid #E2E8F0;
        }

        .status-pill {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-align: center;
        }

        .status-pill.active {
          background-color: #DCFCE7;
          color: #15803D;
        }

        .status-pill.inactive {
          background-color: #F1F5F9;
          color: #64748B;
        }

        .badge-icon-featured {
          display: inline-flex;
          padding: 6px;
          background-color: #FFFDF5;
          border-radius: 50%;
          border: 1px solid rgba(245, 183, 49, 0.3);
        }

        .badge-icon-normal {
          color: var(--text-secondary);
          font-size: 13px;
        }

        .actions-cell-new {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
        }

        .edit-btn-new {
          background-color: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #2563EB;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .edit-btn-new:hover {
          background-color: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.15);
        }

        .delete-btn-new {
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #DC2626;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .delete-btn-new:hover {
          background-color: #DC2626;
          color: #FFFFFF;
          border-color: #DC2626;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.15);
        }

        /* 4. Skeleton Loader */
        .admin-loading-skeleton {
          padding: 30px;
          background-color: #FFFFFF;
          border: 1px solid var(--border);
        }

        .skeleton-line {
          height: 40px;
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%;
          animation: skeleton-wave 1.5s infinite;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .skeleton-line.header-skeleton {
          height: 50px;
          background-color: #E2E8F0;
        }

        @keyframes skeleton-wave {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* 5. 2-COLUMN MODERN MODAL */
        .admin-modal-overlay-new {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .admin-modal-content-new {
          width: 100%;
          max-height: 90vh;
          background-color: #F8FAFC;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 0;
          border: none;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modal-header-new {
          padding: 20px 30px;
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-badge-top {
          display: inline-block;
          background-color: #EFF6FF;
          color: #2563EB;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 6px;
          border: 1px solid #DBEAFE;
        }

        .modal-header-new h2 {
          font-family: var(--font-inter), sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
        }

        .modal-close-btn-new {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          transition: var(--transition);
        }

        .modal-close-btn-new:hover {
          color: #0F172A;
          transform: rotate(90deg);
        }

        .modal-body-form-new {
          padding: 30px;
          overflow-y: auto;
        }

        .modal-two-columns-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 30px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .modal-two-columns-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
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

        .grid-2-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .code-font-textarea {
          font-family: inherit;
          line-height: 1.6;
        }

        /* Editor Toolbar */
        .editor-toolbar-new {
          display: flex;
          gap: 4px;
          background-color: #F8FAFC;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px;
        }

        .editor-tool-btn {
          width: 26px;
          height: 26px;
          background-color: transparent;
          border: none;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .editor-tool-btn:hover {
          background-color: #E2E8F0;
          color: #0F172A;
        }

        .editor-tool-btn.text-btn {
          font-weight: 700;
          font-size: 10px;
        }

        .editor-tool-btn.media-btn {
          color: var(--primary-dark);
        }

        .tool-divider {
          width: 1px;
          height: 16px;
          background-color: var(--border);
          margin: 0 4px;
        }

        /* 6. Right Column media uploads */
        .main-image-upload-zone {
          border: 2px dashed var(--border);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          background-color: #F8FAFC;
          transition: var(--transition);
        }

        .main-image-upload-zone:hover {
          border-color: var(--primary);
          background-color: #FFFDF5;
        }

        .image-drop-zone-trigger {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          gap: 6px;
        }

        .upload-zone-icon {
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .image-drop-zone-trigger strong {
          font-size: 13px;
          color: #334155;
        }

        .image-drop-zone-trigger span {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .uploaded-image-preview-box {
          position: relative;
          width: 100%;
          height: 180px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .preview-img-main {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .remove-image-overlay-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: rgba(239, 68, 68, 0.9);
          color: #FFFFFF;
          border: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .remove-image-overlay-btn:hover {
          background-color: #DC2626;
          transform: scale(1.1);
        }

        .font-sm-input {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Album upload button and lists */
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

        .album-preview-list-new {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(65px, 1fr));
          gap: 10px;
          padding: 12px;
          background-color: #F8FAFC;
          border: 1px solid var(--border);
          border-radius: 6px;
        }

        .album-preview-item-new {
          position: relative;
          width: 100%;
          height: 65px;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .album-preview-item-new img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .delete-album-item-btn {
          position: absolute;
          top: 2px;
          right: 2px;
          background-color: rgba(239, 68, 68, 0.95);
          color: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 9px;
        }

        .empty-album-notice {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          border: 1px dashed var(--border);
          border-radius: 6px;
          color: var(--text-secondary);
          opacity: 0.6;
          font-size: 12px;
          gap: 6px;
        }

        /* Modern Switches for settings */
        .switch-settings-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .switch-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .switch-row-left strong {
          display: block;
          font-size: 13px;
          color: #0F172A;
        }

        .switch-row-left p {
          font-size: 11px;
          color: var(--text-secondary);
          margin: 2px 0 0 0;
        }

        .switch-toggle-input {
          width: 40px;
          height: 20px;
          appearance: none;
          background-color: #CBD5E1;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          outline: none;
          transition: background-color 0.3s;
        }

        .switch-toggle-input:checked {
          background-color: #22C55E;
        }

        .switch-toggle-input::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #FFFFFF;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .switch-toggle-input:checked::before {
          transform: translateX(20px);
        }

        /* Modal Footer */
        .modal-footer-new {
          padding: 20px 30px;
          background-color: #FFFFFF;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 15px;
        }

        .btn-outline-new {
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: transparent;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-outline-new:hover {
          background-color: #F1F5F9;
          color: #0F172A;
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
      `}</style>
    </>
  );
}
