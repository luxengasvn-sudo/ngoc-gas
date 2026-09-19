'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Briefcase, Phone, User, MapPin } from 'lucide-react';

export default function RecruitmentForm({ phone }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    position: 'Nhân viên giao gas xe máy',
    location: 'Dĩ An, Bình Dương',
    notes: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Vui lòng nhập họ và tên của bạn.' });
      return;
    }
    if (!formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Vui lòng nhập số điện thoại liên hệ.' });
      return;
    }

    setLoading(true);
    try {
      const fullMessage = `[ỨNG TUYỂN VIỆC LÀM] Vị trí: ${formData.position} | Khu vực/Địa chỉ: ${formData.location || 'Chưa ghi'} | Ghi chú: ${formData.notes || 'Không có'}`;

      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: '',
          message: fullMessage
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Gửi hồ sơ ứng tuyển thành công! Bộ phận nhân sự Ngọc Gas sẽ liên hệ bạn trong vòng 24 giờ.'
        });
        setFormData({
          name: '',
          phone: '',
          position: 'Nhân viên giao gas xe máy',
          location: 'Dĩ An, Bình Dương',
          notes: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Có lỗi xảy ra khi nộp hồ sơ. Vui lòng thử lại hoặc gọi trực tiếp Hotline.'
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'Lỗi mạng khi nộp hồ sơ. Quý ứng viên vui lòng gọi Hotline tuyển dụng để được phỏng vấn trực tiếp.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      border: '1px solid #E2E8F0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: '#EFF6FF',
          color: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Briefcase size={20} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
          Ứng Tuyển Nhanh Trực Tuyến
        </h3>
      </div>
      <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '22px', lineHeight: '1.5' }}>
        Điền thông tin ngắn gọn dưới đây, phòng nhân sự sẽ gọi lại trao đổi công việc và sắp xếp lịch phỏng vấn sớm nhất.
      </p>

      {status.message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '20px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: status.type === 'success' ? '#F0FDF4' : '#FEF2F2',
          color: status.type === 'success' ? '#166534' : '#991B1B',
          border: `1px solid ${status.type === 'success' ? '#BBF7D0' : '#FECACA'}`
        }}>
          {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
            Họ và tên ứng viên *
          </label>
          <div style={{ position: 'relative' }}>
            <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="vd: Nguyễn Văn An"
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
            Số điện thoại liên hệ *
          </label>
          <div style={{ position: 'relative' }}>
            <Phone size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="vd: 0987654321"
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Vị trí mong muốn *
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                outline: 'none',
                background: '#FFFFFF',
                boxSizing: 'border-box',
                fontWeight: '500'
              }}
            >
              <option value="Nhân viên giao gas xe máy">🛵 Nhân viên giao gas xe máy</option>
              <option value="Kỹ thuật viên hệ thống gas">🔧 Kỹ thuật viên hệ thống gas</option>
              <option value="Tài xế xe tải giao gas">🚚 Tài xế xe tải giao gas</option>
              <option value="Nhân viên trực tổng đài / Bán hàng">📞 Trực tổng đài / Bán hàng</option>
              <option value="Vị trí khác">✨ Vị trí khác</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Khu vực muốn làm việc
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="vd: Dĩ An, Thuận An, Thủ Đức..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
            Ghi chú / Kinh nghiệm làm việc
          </label>
          <textarea
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Kinh nghiệm lái xe, giao hàng, bằng lái (nếu có)..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontWeight: '700',
            fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
          }}
        >
          <Send size={16} />
          <span>{loading ? 'Đang gửi hồ sơ...' : 'Nộp Hồ Sơ Ứng Tuyển'}</span>
        </button>

        <p style={{ margin: '4px 0 0', textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
          Hoặc liên hệ trực tiếp Hotline tuyển dụng: <strong style={{ color: '#2563EB' }}>{phone || '19009396'}</strong>
        </p>
      </form>
    </div>
  );
}
