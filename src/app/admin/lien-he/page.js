'use client';

import { useEffect, useState } from 'react';
import { Eye, Check, Trash2, X, AlertCircle, Mail, Phone, Calendar, User } from 'lucide-react';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch('/api/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setContacts(data.data);
      } else {
        setError('Không thể lấy danh sách liên hệ.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API liên hệ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenDetailModal = async (contact) => {
    setSelectedContact(contact);
    
    // Automatically mark as read if it is unread
    if (!contact.is_read) {
      const token = localStorage.getItem('ngoc_gas_admin_token');
      try {
        const res = await fetch(`/api/contacts/${contact.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ is_read: true })
        });
        const data = await res.json();
        if (data.success) {
          // Update local state without refetching all
          setContacts(prev =>
            prev.map(c => c.id === contact.id ? { ...c, is_read: true } : c)
          );
        }
      } catch (err) {
        console.error('Error marking contact as read:', err);
      }
    }
  };

  const handleMarkAsRead = async (contactId) => {
    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_read: true })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Đã đánh dấu liên hệ đã đọc thành công!');
        setContacts(prev =>
          prev.map(c => c.id === contactId ? { ...c, is_read: true } : c)
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi khi đánh dấu đã đọc.');
    }
  };

  const handleDelete = async (contactId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) return;
    setError('');

    const token = localStorage.getItem('ngoc_gas_admin_token');
    try {
      const res = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Đã xóa liên hệ thành công!');
        if (selectedContact && selectedContact.id === contactId) {
          setSelectedContact(null);
        }
        fetchContacts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Xóa liên hệ thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối API xóa liên hệ.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="admin-contacts-page">
        <h1 className="admin-page-title">Tin nhắn liên hệ từ khách hàng</h1>

        {success && (
          <div className="admin-success-banner" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Check className="success-icon" size={18} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="admin-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="admin-loading"><p>Đang tải hộp thư liên hệ...</p></div>
        ) : (
          <div className="admin-table-container card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Ngày gửi</th>
                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map(c => (
                    <tr key={c.id} className={!c.is_read ? 'unread-row' : ''}>
                      <td className="prod-name-cell">
                        <strong>{c.name}</strong>
                        <span>{c.email || 'Không có email'}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: '500' }}>
                        <a href={`tel:${c.phone}`} style={{ color: 'inherit' }}>{c.phone}</a>
                      </td>
                      <td>{formatDate(c.created_at)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-badge ${c.is_read ? 'neutral' : 'error'}`}>
                          {c.is_read ? 'Đã đọc' : 'Mới'}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button onClick={() => handleOpenDetailModal(c)} className="action-btn edit" title="Xem chi tiết">
                          <Eye size={16} />
                        </button>
                        {!c.is_read && (
                          <button onClick={() => handleMarkAsRead(c.id)} className="action-btn edit" style={{ color: 'var(--success)' }} title="Đánh dấu đã đọc">
                            <Check size={16} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(c.id)} className="action-btn delete" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                      Hộp thư trống. Chưa có tin nhắn liên hệ nào từ khách hàng.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* View Contact Detail Modal */}
        {selectedContact && (
          <div className="admin-modal-overlay">
            <div className="admin-modal-content card" style={{ maxWidth: '550px' }}>
              <div className="modal-header">
                <h2>Chi tiết thư liên hệ</h2>
                <button onClick={() => setSelectedContact(null)} className="modal-close-btn">
                  <X size={20} />
                </button>
              </div>

              <div className="contact-detail-body">
                <div className="contact-detail-item">
                  <User size={18} className="detail-icon" />
                  <div>
                    <label>Họ và tên khách hàng</label>
                    <p>{selectedContact.name}</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Phone size={18} className="detail-icon" />
                  <div>
                    <label>Số điện thoại</label>
                    <p><a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a></p>
                  </div>
                </div>

                {selectedContact.email && (
                  <div className="contact-detail-item">
                    <Mail size={18} className="detail-icon" />
                    <div>
                      <label>Email</label>
                      <p><a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a></p>
                    </div>
                  </div>
                )}

                <div className="contact-detail-item">
                  <Calendar size={18} className="detail-icon" />
                  <div>
                    <label>Thời gian gửi</label>
                    <p>{formatDate(selectedContact.created_at)}</p>
                  </div>
                </div>

                <div className="contact-detail-message-box">
                  <label>Nội dung tin nhắn</label>
                  <p>{selectedContact.message || '(Không có nội dung)'}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => handleDelete(selectedContact.id)} className="btn btn-outline" style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>
                  Xóa thư
                </button>
                <button onClick={() => setSelectedContact(null)} className="btn btn-primary">
                  Đóng lại
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .unread-row {
          background-color: rgba(245, 183, 49, 0.03);
        }

        .contact-detail-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-detail-item {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .detail-icon {
          color: var(--primary-dark);
          opacity: 0.8;
          flex-shrink: 0;
        }

        .contact-detail-item label, .contact-detail-message-box label {
          font-size: 12px;
          color: var(--text-secondary);
          display: block;
          font-weight: 500;
        }

        .contact-detail-item p {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .contact-detail-item p a {
          color: inherit;
        }

        .contact-detail-message-box {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          margin-top: 10px;
        }

        .contact-detail-message-box p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text);
          margin: 8px 0 0 0;
          white-space: pre-wrap;
        }
      `}</style>
    </>
  );
}
