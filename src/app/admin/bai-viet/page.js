'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, Upload, Bold, Italic, Type, Image as ImageIcon, Search, Check, Info, Globe, Link2 } from 'lucide-react';
import MediaLibraryModal from '@/components/MediaLibraryModal';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | published | draft

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    is_published: true
  });

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await fetch('/api/posts', { headers });
      const data = await res.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Không thể lấy danh sách bài viết.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API bài viết.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAddModal = () => {
    setCurrentPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      is_published: true
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      image_url: post.image_url || '',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      is_published: post.is_published === 1
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'title' && !currentPost) {
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
        title: value,
        slug: slugVal
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileUpload = async (e) => {
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
        const imgTag = `<img src="${data.url}" alt="ảnh bài viết" style="max-width:100%; height:auto; margin:15px 0; border-radius:8px; display:block;" />`;
        const textarea = document.getElementById('content');
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          const newVal = text.substring(0, start) + imgTag + text.substring(end);
          setFormData(prev => ({ ...prev, content: newVal }));
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + imgTag.length, start + imgTag.length);
          }, 10);
        }
      } else {
        setError(data.message || 'Lỗi khi upload ảnh cho bài viết');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối upload ảnh.');
    } finally {
      setUploading(false);
    }
  };

  const insertFormat = (tag) => {
    const textarea = document.getElementById('content');
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
    setFormData(prev => ({ ...prev, content: newVal }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formatted.length, start + formatted.length);
    }, 10);
  };

  const insertLink = () => {
    const textarea = document.getElementById('content');
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
    setFormData(prev => ({ ...prev, content: newVal }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + linkTag.length, start + linkTag.length);
    }, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.slug.trim()) {
      setError('Tiêu đề và slug là bắt buộc');
      return;
    }

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const url = currentPost ? `/api/posts/${currentPost.id}` : '/api/posts';
    const method = currentPost ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(currentPost ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!');
        setIsModalOpen(false);
        fetchPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Lưu bài viết thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi khi lưu bài viết.');
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    setError('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Đã xóa bài viết thành công!');
        fetchPosts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Xóa bài viết thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API xóa.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'published') matchesStatus = post.is_published === 1;
    else if (statusFilter === 'draft') matchesStatus = post.is_published === 0;

    return matchesSearch && matchesStatus;
  });

  // SEO Fallbacks
  const seoTitle = formData.meta_title || formData.title || 'Tiêu đề bài viết';
  const seoDesc = formData.meta_description || formData.excerpt || 'Nhập tóm tắt hoặc viết mô tả SEO để hiển thị tại đây trên kết quả tìm kiếm của Google...';

  return (
    <>
      <div className="admin-posts-page">
        {/* Banner header chuyên nghiệp */}
        <div className="admin-header-panel card">
          <div className="header-panel-left">
            <span className="panel-badge">Tin tức & Khuyến mãi</span>
            <h1 className="panel-main-title">Quản lý Bài viết</h1>
            <p className="panel-subtitle">Soạn thảo các hướng dẫn an toàn sử dụng gas, chương trình quà tặng, tin tức khuyến mãi và tối ưu hóa SEO bài viết.</p>
          </div>
          <button onClick={handleOpenAddModal} className="btn btn-primary btn-add-new-prod">
            <Plus size={18} />
            <span>Viết bài mới</span>
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

        {/* Toolbar panel */}
        <div className="admin-toolbar-panel card">
          <div className="toolbar-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tiêu đề, slug bài viết..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="toolbar-input"
            />
          </div>

          <div className="status-tabs-row">
            <button 
              type="button" 
              onClick={() => setStatusFilter('all')} 
              className={`status-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            >
              Tất cả ({posts.length})
            </button>
            <button 
              type="button" 
              onClick={() => setStatusFilter('published')} 
              className={`status-tab-btn ${statusFilter === 'published' ? 'active' : ''}`}
            >
              Đã xuất bản ({posts.filter(p => p.is_published === 1).length})
            </button>
            <button 
              type="button" 
              onClick={() => setStatusFilter('draft')} 
              className={`status-tab-btn ${statusFilter === 'draft' ? 'active' : ''}`}
            >
              Bản nháp ({posts.filter(p => p.is_published === 0).length})
            </button>
          </div>
        </div>

        {/* Table list */}
        {loading ? (
          <div className="admin-loading-skeleton card">
            <div className="skeleton-line header-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
            <div className="skeleton-line row-skeleton"></div>
          </div>
        ) : (
          <div className="admin-table-container card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>Tiêu đề bài viết</th>
                  <th style={{ width: '20%' }}>Ngày đăng</th>
                  <th style={{ width: '15%', textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <tr key={post.id} className="admin-table-row">
                      <td>
                        <div className="prod-meta-cell">
                          <div className="prod-thumb-container">
                            {post.image_url ? (
                              <img src={post.image_url} alt="" className="prod-table-thumb" style={{ objectFit: 'cover' }} />
                            ) : (
                              <ImageIcon size={20} className="prod-table-placeholder" />
                            )}
                          </div>
                          <div className="prod-title-box">
                            <span className="prod-name-bold">{post.title}</span>
                            <span className="prod-slug-sub">{post.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td>{formatDate(post.created_at)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-pill ${post.is_published === 1 ? 'active' : 'inactive'}`}>
                          {post.is_published === 1 ? 'Đã đăng' : 'Bản nháp'}
                        </span>
                      </td>
                      <td className="actions-cell-new">
                        <button onClick={() => handleOpenEditModal(post)} className="action-btn edit-btn-new" title="Sửa bài viết">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="action-btn delete-btn-new" title="Xóa bài viết">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                      Không tìm thấy bài viết nào khớp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Editor dạng 2 cột hỗ trợ SEO */}
        {isModalOpen && (
          <div className="admin-modal-overlay-new">
            <div className="admin-modal-content-new card" style={{ maxWidth: '900px' }}>
              <div className="modal-header-new">
                <div>
                  <span className="modal-badge-top">{currentPost ? 'Biên tập bài viết' : 'Viết bài mới'}</span>
                  <h2>{currentPost ? 'Chỉnh sửa nội dung & SEO Bài viết' : 'Soạn thảo bài viết mới'}</h2>
                </div>
                <button onClick={handleCloseModal} className="modal-close-btn-new">
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-body-form-new">
                <div className="modal-two-columns-layout">
                  
                  {/* CỘT TRÁI: SOẠN THẢO NỘI DUNG */}
                  <div className="modal-left-column">
                    <div className="form-section-card">
                      <h3 className="section-card-title">Nội dung bài viết</h3>
                      
                      <div className="form-group">
                        <label htmlFor="title" className="form-label-new">Tiêu đề bài viết *</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="form-control-new"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Nhập tiêu đề hấp dẫn thu hút người đọc"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="slug" className="form-label-new">URL Slug *</label>
                        <input
                          type="text"
                          id="slug"
                          name="slug"
                          className="form-control-new"
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="vd: huong-dan-doi-ga-an-toan"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="excerpt" className="form-label-new">Tóm tắt ngắn (Hiển thị ngoài danh mục tin tức)</label>
                        <textarea
                          id="excerpt"
                          name="excerpt"
                          className="form-control-new"
                          rows="3"
                          value={formData.excerpt}
                          onChange={handleChange}
                          placeholder="Tóm tắt ngắn gọn nội dung bài viết từ 1 đến 2 câu..."
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <label htmlFor="content" className="form-label-new" style={{ margin: 0 }}>Nội dung chi tiết bài viết</label>
                          <div className="editor-toolbar-new">
                            <button type="button" onClick={() => insertFormat('b')} className="editor-tool-btn" title="Chữ đậm"><Bold size={13} /></button>
                            <button type="button" onClick={() => insertFormat('i')} className="editor-tool-btn" title="Chữ nghiêng"><Italic size={13} /></button>
                            <button type="button" onClick={() => insertFormat('p')} className="editor-tool-btn" title="Đoạn văn"><Type size={13} /></button>
                            <button type="button" onClick={() => insertFormat('h2')} className="editor-tool-btn text-btn" title="Tiêu đề 2">H2</button>
                            <button type="button" onClick={() => insertFormat('h3')} className="editor-tool-btn text-btn" title="Tiêu đề 3">H3</button>
                            <button type="button" onClick={insertLink} className="editor-tool-btn" title="Chèn liên kết (Link)"><Link2 size={13} /></button>
                            <div className="tool-divider"></div>
                            
                            {/* Nút chèn ảnh bài viết */}
                            <label className="editor-tool-btn media-btn" title="Chèn ảnh vào bài viết">
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
                          id="content"
                          name="content"
                          className="form-control-new code-font-textarea"
                          rows="12"
                          value={formData.content}
                          onChange={handleChange}
                          placeholder="Soạn thảo nội dung bài viết. Bạn có thể định dạng HTML và chèn ảnh minh họa ở trên."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* CỘT PHẢI: COVER MEDIA & CẤU HÌNH SEO */}
                  <div className="modal-right-column">
                    
                    {/* Ảnh đại diện bài viết */}
                    <div className="form-section-card">
                      <h3 className="section-card-title">Ảnh bìa bài viết</h3>
                      <div className="main-image-upload-zone">
                        {formData.image_url ? (
                          <div className="uploaded-image-preview-box">
                            <img src={formData.image_url} alt="" className="preview-img-main" style={{ objectFit: 'cover' }} />
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))} className="remove-image-overlay-btn" title="Xóa ảnh">
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className="image-drop-zone-trigger">
                            <Upload size={28} className="upload-zone-icon" />
                            <strong>Tải ảnh bài viết</strong>
                            <span>Chấp nhận PNG, JPG, JPEG</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleFileUpload} 
                              style={{ display: 'none' }} 
                              disabled={uploading}
                            />
                          </label>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setIsMediaOpen(true)}
                          className="btn-add-album-new"
                          style={{ width: '100%', justifyContent: 'center', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E293B', cursor: 'pointer' }}
                        >
                          <ImageIcon size={14} color="#FF6B00" />
                          <span>🖼️ Chọn từ thư viện</span>
                        </button>
                      </div>
                      
                      <div className="form-group" style={{ marginTop: '12px' }}>
                        <label htmlFor="image_url" className="form-label-new">Đường dẫn URL ảnh</label>
                        <input
                          type="text"
                          id="image_url"
                          name="image_url"
                          className="form-control-new font-sm-input"
                          value={formData.image_url}
                          onChange={handleChange}
                          placeholder="Dán link ảnh từ bên ngoài hoặc chọn từ thư viện"
                        />
                      </div>
                    </div>

                    {/* CẤU HÌNH SEO PANEL */}
                    <div className="form-section-card">
                      <h3 className="section-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={16} className="text-primary" />
                        <span>Cấu hình SEO Google</span>
                      </h3>

                      {/* Google Search Result Preview */}
                      <div className="google-seo-preview-box" style={{ padding: '15px', backgroundColor: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontFamily: 'Arial, sans-serif' }}>
                        <span style={{ fontSize: '11px', color: '#5F6368', display: 'block', marginBottom: '4px' }}>Google Search Preview</span>
                        <div className="google-preview-title" style={{ color: '#1A0DAB', fontSize: '18px', textDecoration: 'none', cursor: 'pointer', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'normal', marginBottom: '2px' }}>
                          {seoTitle}
                        </div>
                        <div className="google-preview-url" style={{ color: '#006621', fontSize: '13px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                          https://daongocgas.com/tin-tuc/{formData.slug || 'slug-bai-viet'}
                        </div>
                        <div className="google-preview-desc" style={{ color: '#545454', fontSize: '13px', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                          {seoDesc}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="meta_title" className="form-label-new" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Tiêu đề SEO (Meta Title)</span>
                          <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>{formData.meta_title.length}/60 kí tự</span>
                        </label>
                        <input
                          type="text"
                          id="meta_title"
                          name="meta_title"
                          className="form-control-new font-sm-input"
                          value={formData.meta_title}
                          onChange={handleChange}
                          maxLength="60"
                          placeholder="Tiêu đề hiển thị trên thanh tìm kiếm Google"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="meta_description" className="form-label-new" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Mô tả SEO (Meta Description)</span>
                          <span style={{ fontWeight: 'normal', color: 'var(--text-secondary)' }}>{formData.meta_description.length}/160 kí tự</span>
                        </label>
                        <textarea
                          id="meta_description"
                          name="meta_description"
                          className="form-control-new font-sm-input"
                          rows="3"
                          maxLength="160"
                          value={formData.meta_description}
                          onChange={handleChange}
                          placeholder="Mô tả SEO ngắn gọn chứa từ khóa chính giúp tăng nhấp chuột..."
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="meta_keywords" className="form-label-new">Từ khóa SEO (Keywords)</label>
                        <input
                          type="text"
                          id="meta_keywords"
                          name="meta_keywords"
                          className="form-control-new font-sm-input"
                          value={formData.meta_keywords}
                          onChange={handleChange}
                          placeholder="gas ngoc gas, giao gas nhanh, gas binh duong, gas tp hcm"
                        />
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '4px' }}>Các từ khóa phân tách nhau bằng dấu phẩy.</span>
                      </div>
                    </div>

                    {/* Cài đặt xuất bản */}
                    <div className="form-section-card">
                      <h3 className="section-card-title">Cài đặt hiển thị</h3>
                      <div className="switch-settings-group">
                        <label className="switch-row-item">
                          <div className="switch-row-left">
                            <strong>Xuất bản hiển thị</strong>
                            <p>Cho phép người đọc xem tin</p>
                          </div>
                          <input
                            type="checkbox"
                            name="is_published"
                            checked={formData.is_published}
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
                    <span>Lưu bài viết</span>
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

      <MediaLibraryModal
        isOpen={isMediaOpen}
        onClose={() => setIsMediaOpen(false)}
        onSelectImage={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
      />
    </>
  );
}
