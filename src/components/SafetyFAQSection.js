'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, ChevronDown, CheckCircle, AlertTriangle, PhoneCall } from 'lucide-react';

export default function SafetyFAQSection({ settings: initialSettings }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [settings, setSettings] = useState(initialSettings || {});

  useEffect(() => {
    if (initialSettings && Object.keys(initialSettings).length > 0) {
      setSettings(initialSettings);
    } else {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setSettings(data.data);
          }
        })
        .catch(e => {});
    }
  }, [initialSettings]);

  const defaultFaqs = [
    {
      q: 'Cách xử lý nhanh nhất khi phát hiện mùi gas rò rỉ trong căn bếp?',
      a: '1. Tuyệt đối KHÔNG bật/tắt công tắc điện, không dùng bật lửa hoặc diêm.\n2. Khóa ngay van bình gas bằng cách vặn theo chiều kim đồng hồ.\n3. Mở tất cả các cửa sổ, cửa chính để khí gas thoát ra ngoài tự nhiên.\n4. Di chuyển ra khu vực thoáng khí và gọi ngay cho hotline Ngọc Gas để kỹ thuật viên tới kiểm tra xử lý khẩn cấp.'
    },
    {
      q: 'Làm thế nào để phân biệt bình gas chính hãng Ngọc Gas với bình gas trôi nổi?',
      a: 'Bình gas chính hãng Ngọc Gas luôn có màng co niêm phong nguyên vẹn tại cổ van bình, tem chống hàng giả có logo thương hiệu rõ ràng, vỏ bình còn hạn kiểm định PCCC và được kỹ thuật viên cân trực tiếp trước mặt khách hàng khi giao.'
    },
    {
      q: 'Bao lâu nên kiểm tra và thay dây dẫn gas, van điều áp một lần?',
      a: 'Dây dẫn gas cao su nên thay định kỳ từ 1.5 - 2 năm/lần. Van điều áp tự động ngắt gas khẩn cấp nên thay sau mỗi 3 - 5 năm. Khi giao gas, đội ngũ Ngọc Gas luôn hỗ trợ vệ sinh bếp và kiểm tra dây dẫn van gas hoàn toàn miễn phí.'
    },
    {
      q: 'Quy trình giao gas & kiểm tra an toàn tận nhà tại Dĩ An & TP.HCM diễn ra như thế nào?',
      a: 'Khi nhận cuộc gọi đặt gas, Ngọc Gas điều phối nhân viên giao hàng nhanh trong 15-30 phút. Kỹ thuật viên sẽ vận chuyển bình gas vào tận bếp, tiến hành lắp đặt, dùng thiết bị chuyên dụng kiểm tra rò rỉ van gas, cân thử ký gas tại chỗ và dán tem bảo hành trước khi bàn giao.'
    }
  ];

  const faqs = [
    {
      q: settings.home_safety_faq_1_q || defaultFaqs[0].q,
      a: settings.home_safety_faq_1_a || defaultFaqs[0].a
    },
    {
      q: settings.home_safety_faq_2_q || defaultFaqs[1].q,
      a: settings.home_safety_faq_2_a || defaultFaqs[1].a
    },
    {
      q: settings.home_safety_faq_3_q || defaultFaqs[2].q,
      a: settings.home_safety_faq_3_a || defaultFaqs[2].a
    },
    {
      q: settings.home_safety_faq_4_q || defaultFaqs[3].q,
      a: settings.home_safety_faq_4_a || defaultFaqs[3].a
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-safety-section">
      <div className="container">
        <div className="faq-grid-container">
          <div className="faq-info-column">
            <div className="section-badge">
              <ShieldAlert size={16} />
              <span>{settings.home_safety_badge || 'An Toàn Là Trên Hết'}</span>
            </div>
            <h2>{settings.home_safety_title || 'CẨM NANG & HƯỚNG DẪN AN TOÀN SỬ DỤNG GAS'}</h2>
            <p className="faq-desc">
              {settings.home_safety_subtitle || 'Ngọc Gas cam kết mang đến giải pháp năng lượng an toàn tuyệt đối cho mọi gia đình và nhà hàng tại Dĩ An, Thuận An & TP. Hồ Chí Minh.'}
            </p>

            <div className="safety-tips-box">
              <div className="tip-item">
                <CheckCircle size={20} className="tip-icon" />
                <div>
                  <strong>{settings.home_safety_tip1_title || 'Cân đúng ký - Đủ trọng lượng'}</strong>
                  <p>{settings.home_safety_tip1_desc || '100% bình gas giao tới đều được cân trực tiếp trước mặt khách hàng.'}</p>
                </div>
              </div>
              <div className="tip-item">
                <CheckCircle size={20} className="tip-icon" />
                <div>
                  <strong>{settings.home_safety_tip2_title || 'Bảo hiểm cháy nổ PCCC'}</strong>
                  <p>{settings.home_safety_tip2_desc || 'Toàn bộ bình gas Ngọc Gas phân phối đều có bảo hiểm an toàn chính hãng.'}</p>
                </div>
              </div>
            </div>

            <div className="emergency-call-box">
              <AlertTriangle size={24} className="alert-icon" />
              <div>
                <span>{settings.home_safety_alert_label || 'Hỗ trợ kỹ thuật & Sự cố rò rỉ Gas 24/7:'}</span>
                <a href={`tel:${(settings.home_safety_alert_phone || '1900.9396').replace(/\./g, '')}`} className="emergency-phone">
                  <PhoneCall size={18} />
                  <span>Gọi Hotline {settings.home_safety_alert_phone || '1900.9396'}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="faq-accordion-column">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item-card ${openIndex === idx ? 'active' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  <ChevronDown size={20} className="chevron-icon" />
                </div>
                {openIndex === idx && (
                  <div className="faq-answer">
                    <p style={{ whiteSpace: 'pre-line' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-safety-section {
          padding: 60px 0;
          background-color: #FFFFFF;
        }

        .faq-grid-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: #FEF2F2;
          color: #DC2626;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .faq-info-column h2 {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 14px;
          line-height: 1.3;
        }

        .faq-desc {
          font-size: 15px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .safety-tips-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        .tip-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #F8FAFC;
          padding: 14px;
          border-radius: 10px;
          border-left: 4px solid #10B981;
        }

        .tip-item strong {
          font-size: 14px;
          color: #1E293B;
          display: block;
          margin-bottom: 2px;
        }

        .tip-item p {
          font-size: 13px;
          color: #64748B;
          margin: 0;
        }

        .tip-icon {
          color: #10B981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .emergency-call-box {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%);
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #FECDD3;
        }

        .alert-icon {
          color: #E11D48;
          flex-shrink: 0;
        }

        .emergency-call-box span {
          font-size: 13px;
          font-weight: 600;
          color: #9F1239;
          display: block;
          margin-bottom: 4px;
        }

        .emergency-phone {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #E11D48;
          color: #FFFFFF;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }

        .faq-accordion-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-item-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 18px 22px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item-card:hover {
          border-color: #CBD5E1;
          background: #F1F5F9;
        }

        .faq-item-card.active {
          background: #FFFFFF;
          border-color: #FF6B00;
          box-shadow: 0 4px 14px rgba(255, 107, 0, 0.08);
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .faq-question h3 {
          font-size: 15px;
          font-weight: 700;
          color: #1E293B;
          margin: 0;
          line-height: 1.4;
        }

        .chevron-icon {
          color: #64748B;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .faq-item-card.active .chevron-icon {
          transform: rotate(180deg);
          color: #FF6B00;
        }

        .faq-answer {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #E2E8F0;
        }

        .faq-answer p {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 900px) {
          .faq-grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
