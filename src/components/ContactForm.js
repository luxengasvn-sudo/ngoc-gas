'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Vui lòng nhập họ và tên.' });
      return false;
    }
    if (!formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Vui lòng nhập số điện thoại.' });
      return false;
    }
    // Simple Vietnamese phone number validation: starts with 0 and has 10 digits
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setStatus({ type: 'error', message: 'Số điện thoại không hợp lệ (vd: 0987654321).' });
      return false;
    }
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setStatus({ type: 'error', message: 'Địa chỉ email không hợp lệ.' });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Cảm ơn bạn! Liên hệ của bạn đã được gửi thành công.' });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Có lỗi xảy ra, vui lòng thử lại.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="contact-form card" onSubmit={handleSubmit}>
        <h3 className="form-title">Gửi tin nhắn cho chúng tôi</h3>
        
        {status.type && (
          <div className={`form-status ${status.type}`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{status.message}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name" className="form-label">Họ và tên *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Số điện thoại *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại liên hệ"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email (Tùy chọn)</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập địa chỉ email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Nội dung *</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Bạn cần tư vấn hoặc báo giá sản phẩm nào?"
            disabled={loading}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
          {loading ? (
            <span>Đang gửi...</span>
          ) : (
            <>
              <span>Gửi liên hệ</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>

      <style jsx global>{`
        .contact-form {
          width: 100%;
          background-color: #FFFFFF;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }

        .form-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--text);
        }

        .form-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .form-status.success {
          background-color: rgba(22, 163, 74, 0.1);
          color: var(--success);
          border: 1px solid rgba(22, 163, 74, 0.2);
        }

        .form-status.error {
          background-color: rgba(220, 38, 38, 0.1);
          color: var(--error);
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .btn-submit {
          width: 100%;
          margin-top: 10px;
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
