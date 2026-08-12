'use client';

import { useState, useEffect } from 'react';
import { X, Search, Upload, Check, Trash2, Copy, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function MediaLibraryModal({ isOpen, onClose, onSelectImage }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');
  const [notification, setNotification] = useState('');

  const fetchMediaList = async () => {
    setLoading(true);
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch('/api/upload', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMediaList(data.data);
      }
    } catch (e) {
      console.error('Lỗi khi lấy danh sách media:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMediaList();
      setSelectedUrl('');
      setNotification('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUploadNewFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setNotification('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setNotification('🎉 Tải ảnh mới lên thư viện thành công!');
        fetchMediaList();
        if (data.url) setSelectedUrl(data.url);
      } else {
        alert(data.message || 'Lỗi khi tải ảnh lên');
      }
    } catch (err) {
      alert('Lỗi kết nối tải ảnh lên.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (url, e) => {
    e.stopPropagation();
    if (!confirm('Bạn có chắc chắn muốn xóa ảnh này khỏi thư mục server không?')) return;

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setNotification('Đã xóa ảnh khỏi server!');
        fetchMediaList();
        if (selectedUrl === url) setSelectedUrl('');
      } else {
        alert(data.message || 'Không thể xóa file');
      }
    } catch (err) {
      alert('Lỗi khi gửi yêu cầu xóa file.');
    }
  };

  const filteredMedia = mediaList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmSelect = () => {
    if (!selectedUrl) {
      alert('Vui lòng nhấp chọn 1 ảnh trong thư viện trước.');
      return;
    }
    onSelectImage(selectedUrl);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={22} color="#FF6B00" />
              Thư Viện Hình Ảnh & Tệp Upload (Media Library)
            </h3>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Chọn ảnh sẵn có từ server hoặc tải ảnh mới lên
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              border: 'none',
              background: '#E2E8F0',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              color: '#475569'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Action & Search Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          backgroundColor: '#FFFFFF'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Tìm kiếm ảnh theo tên..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={fetchMediaList}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFF',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#475569'
              }}
              title="Tải lại danh sách ảnh"
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span>Làm mới</span>
            </button>

            <label style={{
              padding: '9px 18px',
              borderRadius: '8px',
              background: '#FF6B00',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(255, 107, 0, 0.3)'
            }}>
              <Upload size={16} />
              <span>{uploading ? 'Đang tải lên...' : '📤 Tải ảnh mới lên'}</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleUploadNewFile} 
                style={{ display: 'none' }}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {notification && (
          <div style={{ padding: '8px 24px', background: '#ECFDF5', borderBottom: '1px solid #A7F3D0', color: '#047857', fontSize: '13px', fontWeight: '600' }}>
            {notification}
          </div>
        )}

        {/* Gallery Grid Container */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          backgroundColor: '#F8FAFC'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>🔄 Đang tải kho ảnh từ server...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
              <ImageIcon size={48} style={{ marginBottom: '12px', opacity: 0.4 }} />
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#475569' }}>Chưa tìm thấy hình ảnh nào</p>
              <span style={{ fontSize: '13px' }}>Hãy bấm nút "📤 Tải ảnh mới lên" ở góc trên để thêm ảnh vào kho.</span>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              {filteredMedia.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <div
                    key={item.url}
                    onClick={() => setSelectedUrl(item.url)}
                    style={{
                      position: 'relative',
                      borderRadius: '10px',
                      border: isSelected ? '3px solid #FF6B00' : '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 14px rgba(255, 107, 0, 0.25)' : '0 2px 4px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ height: '110px', width: '100%', backgroundColor: '#1A202C', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                      />
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#FF6B00',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center'
                        }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div style={{ padding: '8px 10px', fontSize: '11px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '700', color: '#1E293B', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.name}>
                        {item.name}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', color: '#64748B' }}>
                        <span>{item.size}</span>
                        {item.folder === 'uploads' && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteFile(item.url, e)}
                            style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                            title="Xóa ảnh khỏi server"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ flex: 1, overflow: 'hidden', paddingRight: '16px' }}>
            {selectedUrl ? (
              <span style={{ fontSize: '12px', color: '#047857', fontWeight: '700', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                🟢 Đã chọn: {selectedUrl}
              </span>
            ) : (
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                Chưa chọn ảnh nào (nhấn vào 1 ảnh ở trên để chọn)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFF',
                color: '#475569',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleConfirmSelect}
              disabled={!selectedUrl}
              style={{
                padding: '9px 24px',
                borderRadius: '8px',
                border: 'none',
                background: selectedUrl ? '#FF6B00' : '#CBD5E1',
                color: '#FFFFFF',
                cursor: selectedUrl ? 'pointer' : 'not-allowed',
                fontSize: '13px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: selectedUrl ? '0 2px 6px rgba(255, 107, 0, 0.3)' : 'none'
              }}
            >
              <Check size={16} />
              <span>Dùng Ảnh Này</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
