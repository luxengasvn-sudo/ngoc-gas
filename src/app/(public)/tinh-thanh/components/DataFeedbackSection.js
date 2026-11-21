'use client';

import React, { useState } from 'react';

/**
 * DataFeedbackSection Component
 * Lá chắn pháp lý (Legal Disclaimer) & Công cụ tiếp nhận phản ánh/báo lỗi dữ liệu
 * Tiếp nhận thông tin và gửi về email: coin62.com@gmail.com
 */
export default function DataFeedbackSection({ itemName, itemAddress, itemType = 'cơ sở y tế' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [suggestedAddress, setSuggestedAddress] = useState('');
  const [suggestedPhone, setSuggestedPhone] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const targetRecipientEmail = 'coin62.com@gmail.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackContent.trim() && !suggestedAddress.trim() && !suggestedPhone.trim()) {
      alert('Vui lòng nhập nội dung thông tin cần đính chính hoặc địa chỉ/SĐT mới.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    try {
      const res = await fetch('/api/tinh-thanh/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetName: itemName,
          targetUrl: currentUrl,
          senderName,
          senderContact,
          suggestedAddress,
          suggestedPhone,
          feedbackContent
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Cảm ơn bạn đã đóng góp! Thông tin đã được gửi về ban quản trị.');
        // Reset form
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
          setFeedbackContent('');
          setSuggestedAddress('');
          setSuggestedPhone('');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage('Lỗi kết nối máy chủ. Bạn có thể gửi email trực tiếp qua nút bên dưới.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEmailClient = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const subject = encodeURIComponent(`[Báo Lỗi Dữ Liệu Tỉnh Thành] - ${itemName}`);
    const bodyContent = `Kính gửi Ban Quản Trị Website,

Tôi muốn thông báo đính chính dữ liệu cho ${itemType}: ${itemName}
Địa chỉ hiện tại trên web: ${itemAddress || 'Chưa rõ'}
Đường link bài viết: ${currentUrl}

1. Địa chỉ chính xác đề xuất: ${suggestedAddress || '...'}
2. Số điện thoại chính xác đề xuất: ${suggestedPhone || '...'}
3. Nội dung ghi chú thêm:
${feedbackContent || '...'}

Thông tin người gửi:
- Họ tên/Đơn vị: ${senderName || 'Người dân'}
- Liên hệ (SĐT/Email): ${senderContact || '...'}

Trân trọng!`;

    const mailtoUrl = `mailto:${targetRecipientEmail}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div style={{ marginTop: '28px' }}>
      {/* KHỐI MIỄN TRỪ TRÁCH NHIỆM & NÚT BÁO LỖI DƯỚI CÙNG */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '20px 24px',
        boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '18px' }}>⚖️</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                Lưu Ý & Miễn Trừ Trách Nhiệm Dữ Liệu Dân Sinh
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.65 }}>
              Dữ liệu về địa chỉ, vị trí Google Maps, số điện thoại trực ban và giờ làm việc của <strong>{itemName}</strong> được đội ngũ chúng tôi tổng hợp độc lập từ các nguồn thông tin công khai nhằm mục đích tra cứu tiện ích dân sinh và hỗ trợ cứu hộ khẩn cấp phi lợi nhuận. Thông tin mang tính chất tham khảo đối soát nhanh, không thay thế văn bản quy phạm pháp luật chính thức.
            </p>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '6px 0 0 0', fontStyle: 'italic' }}>
              Trường hợp thông tin có sự thay đổi sau sáp nhập hoặc chưa chính xác, quý cơ quan và người dân vui lòng phản ánh để Ban Quản trị tiếp nhận và cập nhật kịp thời.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'center' }}>
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #f59e0b',
                color: '#b45309',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef3c7';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '16px' }}>⚠️</span>
              <span>Báo Lỗi / Đề Xuất Cập Nhật</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL POPUP BÁO LỖI THÔNG TIN */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '18px 24px',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '0 0 2px 0' }}>
                  📬 Tiếp Nhận Đính Chính / Báo Lỗi Dữ Liệu
                </h3>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                  Đối tượng: <strong>{itemName}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  lineHeight: 1
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
              {submitStatus === 'success' ? (
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  color: '#166534'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                  <div style={{ fontSize: '15px', fontWeight: '800', marginBottom: '6px' }}>Gửi Phản Hồi Thành Công!</div>
                  <p style={{ fontSize: '13px', margin: 0, lineHeight: 1.6 }}>{statusMessage}</p>
                </div>
              ) : (
                <>
                  {submitStatus === 'error' && (
                    <div style={{
                      padding: '12px 16px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      color: '#991b1b',
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      ⚠️ {statusMessage}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        Họ tên / Đơn vị (Tùy chọn)
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="VD: Cán bộ tiếp dân / Người dân"
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                        SĐT hoặc Email liên hệ
                      </label>
                      <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="Để ban quản trị đối soát lại"
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Địa chỉ chính xác mới (nếu có)
                    </label>
                    <input
                      type="text"
                      value={suggestedAddress}
                      onChange={(e) => setSuggestedAddress(e.target.value)}
                      placeholder="VD: Số nhà, tên đường, phường/xã chuẩn sau sáp nhập"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Số điện thoại / Hotline đúng (nếu có)
                    </label>
                    <input
                      type="text"
                      value={suggestedPhone}
                      onChange={(e) => setSuggestedPhone(e.target.value)}
                      placeholder="VD: 028 xxxx xxxx hoặc số trực ban mới"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '4px' }}>
                      Nội dung chi tiết thông tin cần đính chính <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      placeholder="Mô tả cụ thể thông tin sai lệch cần sửa đổi..."
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handleOpenEmailClient}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>✉️</span>
                      <span>Mở Gửi Mail ({targetRecipientEmail})</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: submitting ? '#94a3b8' : '#0284c7',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
                      }}
                    >
                      {submitting ? 'Đang gửi...' : 'Gửi Đính Chính Ngay'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
