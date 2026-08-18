'use client';

import { Star, Quote, MapPin, Building2, UserCheck } from 'lucide-react';

export default function TestimonialsSection({ settings = {} }) {
  const defaultReviews = [
    {
      name: 'Anh Minh (Chủ Quán Cơm Niêu)',
      location: 'Phường Dĩ An, TP. Dĩ An',
      role: 'Khách hàng Gas Công Nghiệp 3 năm',
      comment: 'Quán tôi nấu nướng liên tục, gas hết đột xuất lúc giờ cao điểm trưa là rất nguy hiểm. Gọi Ngọc Gas lúc nào cũng giao tới trong 15 phút, cân gas đàng hoàng tại chỗ, bình gas đỏ đẹp cháy đều lửa xanh vè vè. Rất yên tâm!',
      rating: 5,
      type: 'Nhà hàng / Quán ăn'
    },
    {
      name: 'Chị Thanh Hằng',
      location: 'Đường Nguyễn Trung Trực, Dĩ An',
      role: 'Hộ gia đình',
      comment: 'Tôi đổi gas Ngọc Gas mấy năm nay rồi. Nhân viên giao tới rất lịch sự, cân thử trực tiếp xem đủ 12kg không rồi mới tính tiền, lại còn giúp tôi kiểm tra van dây gas an toàn miễn phí. Đánh giá 5 sao dịch vụ chu đáo!',
      rating: 5,
      type: 'Hộ gia đình'
    },
    {
      name: 'Chú Hùng (Quán Phở Bò Nam Định)',
      location: 'TP. Thuận An, Bình Dương',
      role: 'Khách hàng dùng bình 45kg',
      comment: 'Tôi dùng dàn 4 bình gas 45kg ninh xương phở. Ngọc Gas thi công đường ống gas inox an toàn gọn gàng, kiểm định PCCC đầy đủ. Hàng tháng đều có thợ ghé kiểm tra định kỳ miễn phí nên tôi vô cùng tin tưởng.',
      rating: 5,
      type: 'Bếp ăn công nghiệp'
    }
  ];

  let reviews = defaultReviews;
  if (settings?.home_testimonials_json) {
    try {
      const parsed = typeof settings.home_testimonials_json === 'string' ? JSON.parse(settings.home_testimonials_json) : settings.home_testimonials_json;
      if (Array.isArray(parsed) && parsed.length > 0) {
        reviews = parsed;
      }
    } catch (e) {}
  }

  const badge = settings?.home_testimonials_badge || 'Cảm Nhận Khách Hàng';
  const title = settings?.home_testimonials_title || 'KHÁCH HÀNG NÓI GÌ VỀ DỊCH VỤ NGỌC GAS?';
  const subtitle = settings?.home_testimonials_subtitle || 'Sự hài lòng và tin tưởng của hàng nghìn hộ gia đình, nhà hàng tại Dĩ An, Thuận An và TP.HCM chính là niềm tự hào lớn nhất của chúng tôi.';

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header text-center">
          <span className="sub-title">{badge}</span>
          <h2>{title}</h2>
          <p className="description">{subtitle}</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="testimonial-card glass">
              <div className="quote-icon">
                <Quote size={28} />
              </div>
              <div className="stars-row">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>
              <p className="comment-text">"{rev.comment}"</p>
              
              <div className="reviewer-info">
                <div className="avatar-circle">
                  {(rev.type?.includes('Nhà hàng') || rev.type?.includes('Bếp')) ? (
                    <Building2 size={20} />
                  ) : (
                    <UserCheck size={20} />
                  )}
                </div>
                <div>
                  <h4 className="reviewer-name">{rev.name}</h4>
                  <span className="reviewer-role">{rev.role}</span>
                  <div className="reviewer-location">
                    <MapPin size={12} />
                    <span>{rev.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 60px 0;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
        }

        .testimonials-header {
          max-width: 650px;
          margin: 0 auto 40px auto;
          text-align: center;
        }

        .sub-title {
          font-size: 13px;
          font-weight: 700;
          color: #FF6B00;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 6px;
        }

        .testimonials-header h2 {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 12px;
        }

        .description {
          font-size: 15px;
          color: #64748B;
          line-height: 1.5;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .testimonial-card {
          background: #FFFFFF;
          border: 1px solid var(--border); /* Sử dụng viền ấm V2 */
          border-radius: var(--radius-lg); /* Tăng bo góc V2 */
          padding: 28px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: var(--transition);
        }
 
        .testimonial-card:hover {
          transform: translateY(-6px); /* Đẩy lên V2 */
          box-shadow: var(--shadow-lg); /* Đổ bóng V2 */
          border-color: var(--primary);
        }
 
        .quote-icon {
          position: absolute;
          top: 20px;
          right: 24px;
          color: rgba(12, 96, 105, 0.05); /* Tông màu teal mờ nhạt làm quote */
        }
 
        .stars-row {
          display: flex;
          gap: 4px;
          margin-bottom: 14px;
        }
 
        .stars-row :global(.star-filled) {
          color: #F59E0B;
          fill: #F59E0B;
        }
 
        .comment-text {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
 
        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border); /* Sử dụng viền ấm V2 */
        }

        .avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFF7ED;
          color: #FF6B00;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reviewer-name {
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 2px 0;
        }

        .reviewer-role {
          font-size: 12px;
          color: #FF6B00;
          font-weight: 600;
          display: block;
        }

        .reviewer-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #94A3B8;
          margin-top: 2px;
        }

        /* Mobile Horizontal Scroll Slider */
        @media (max-width: 768px) {
          .testimonials-section {
            padding: 40px 0;
          }

          .testimonials-header {
            margin-bottom: 24px;
            padding: 0 10px;
          }

          .testimonials-header h2 {
            font-size: 20px;
          }

          .description {
            font-size: 13px;
          }

          .testimonials-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding: 4px 16px 16px 16px;
            gap: 14px;
            margin: 0 -16px;
            scrollbar-width: none;
          }

          .testimonials-grid::-webkit-scrollbar {
            display: none;
          }

          .testimonial-card {
            min-width: 86vw;
            max-width: 86vw;
            flex-shrink: 0;
            scroll-snap-align: center;
            padding: 20px;
            border-radius: 14px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
          }

          .comment-text {
            font-size: 13.5px;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
}
