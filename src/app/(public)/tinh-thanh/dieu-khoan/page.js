import Link from 'next/link';

export const metadata = {
  title: 'Điều Khoản Sử Dụng & Tâm Huyết Dự Án Số Hóa',
  description: 'Khám phá nguồn dữ liệu, sứ mệnh phụng sự cộng đồng, quyền sở hữu trí tuệ và lời tri ân tham khảo giao diện nền tảng Tinh Thành tại Cổng Tra Cứu Địa Giới Hành Chính 2026 — ĐịaGiớiVN.'
};

export default function DieuKhoanTinhThanhPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="tt-container">
        {/* Breadcrumb */}
        <div className="tt-breadcrumb" style={{ marginBottom: '16px' }}>
          <Link href="/">🏠 Trang chủ</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <Link href="/tinh-thanh">Địa Giới 2026</Link>
          <span className="tt-breadcrumb-separator">/</span>
          <span className="tt-breadcrumb-active">Điều Khoản Sử Dụng & Tâm Huyết</span>
        </div>

        {/* Hero Banner Header */}
        <div
          className="tt-card tt-card-padded"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
            marginBottom: '28px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, rgba(234, 88, 12, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <span
            style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(234, 88, 12, 0.2)',
              border: '1px solid rgba(234, 88, 12, 0.4)',
              color: '#fdba74',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '12px'
            }}
          >
            Quy Chế Hoạt Động & Minh Bạch Thông Tin · Năm {currentYear}
          </span>

          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 10px 0', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Điều Khoản Sử Dụng & Tâm Huyết Dự Án Số Hóa
          </h1>

          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', margin: 0, maxWidth: '820px' }}>
            Số hóa dữ liệu địa giới và phương án sắp xếp đơn vị hành chính vì một cộng đồng tiếp cận thông tin nhanh chóng, hiện đại, minh bạch và hoàn toàn phi lợi nhuận.
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Section 1: Nguồn dữ liệu tin cậy */}
          <div className="tt-card tt-card-padded">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}
              >
                🏛️
              </div>
              <div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  1. Nguồn Dữ Liệu Tin Cậy & Đối Soát Đa Tầng
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Tổng hợp chuẩn hóa từ hệ thống văn bản quy phạm pháp luật nhà nước
                </p>
              </div>
            </div>

            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#334155', margin: '0 0 12px 0' }}>
              Hơn 90% nội dung dữ liệu trên hệ thống Cổng Tra Cứu Địa Giới được đội ngũ chúng tôi tổng hợp, lập chỉ mục và số hóa từ các nguồn thông tin pháp lý chính thống hàng đầu:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#0284c7', marginBottom: '4px' }}>📜 CỔNG CHÍNH PHỦ & BỘ NỘI VỤ</div>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  Hệ thống các Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp đơn vị hành chính cấp huyện, cấp xã các giai đoạn 2023 - 2025 và 2026 - 2030.
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#0284c7', marginBottom: '4px' }}>🌐 THƯ VIỆN PHÁP LUẬT & CƠ SỞ DỮ LIỆU LUẬT</div>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  Văn bản chỉ đạo thi hành, quyết định thành lập mới, điều chỉnh địa giới hành chính các thị xã lên thành phố và xã lên phường.
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#0284c7', marginBottom: '4px' }}>📍 34 CỔNG ĐIỆN TỬ TỈNH THÀNH</div>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  10% dữ liệu thực địa (trụ sở UBND, trạm y tế, trường học) được đối soát đối chiếu từ cổng thông tin các sở ban ngành địa phương nhằm đảm bảo tính cập nhật.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Tâm huyết từ trái tim */}
          <div className="tt-card tt-card-padded">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#fff1f2',
                  border: '1px solid #fecdd3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}
              >
                ❤️
              </div>
              <div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  2. Tâm Huyết & Sứ Mệnh Phụng Sự Dân Sinh
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Đồng hành cùng nhân dân qua các đợt sáp nhập hành chính lịch sử
                </p>
              </div>
            </div>

            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#334155', margin: '0 0 12px 0' }}>
              Dự án số hóa này được khởi xướng xuất phát từ một mong muốn giản dị và thiết thực: <strong>Giúp mỗi người dân và các hộ gia đình Việt Nam không bị bỡ ngỡ, lúng túng giữa những đợt sắp xếp, sáp nhập quy mô lớn trên toàn quốc</strong>.
            </p>

            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#334155', margin: 0 }}>
              Đội ngũ phát triển đã dành hàng trăm giờ làm việc tỉ mỉ để phân tích, tổng hợp ma trận chuyển đổi từ hơn 3.320 đơn vị hành chính cũ sang các xã, phường mới. Thay vì phải đọc qua hàng trăm trang văn bản hành chính phức tạp, giờ đây người dân chỉ cần 1 cú nhấp chuột là có thể nắm rõ địa chỉ mới, nơi làm thủ tục căn cước, giấy tờ nhà đất và các thông số dân sinh cần thiết.
            </p>
          </div>

          {/* Section 3: Ghi nhận & Tri ân Tham khảo Giao diện TinhThanhVN */}
          <div
            className="tt-card tt-card-padded"
            style={{
              backgroundColor: '#fafaf9',
              border: '2px solid #fdba74',
              boxShadow: '0 4px 20px -2px rgba(234, 88, 12, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}
              >
                🤝
              </div>
              <div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#9a3412', margin: 0 }}>
                  3. Lời Tri Ân & Ghi Nhận Tham Khảo Ý Tưởng Giao Diện (Tinh Thành)
                </h2>
                <p style={{ fontSize: '12px', color: '#c2410c', margin: '2px 0 0 0' }}>
                  Tôn trọng công sức tiên phong và tinh thần chia sẻ vì cộng đồng
                </p>
              </div>
            </div>

            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #fed7aa',
                marginBottom: '16px'
              }}
            >
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#334155', margin: '0 0 12px 0' }}>
                Trong quá trình nghiên cứu và xây dựng Cổng Tra Cứu Địa Giới Hành Chính ĐịaGiớiVN, với tâm niệm mang đến cho bà con nhân dân một trải nghiệm tra cứu trực quan, thân thiện và khoa học nhất, đội ngũ chúng tôi <strong>đã trân trọng học hỏi, tham khảo có chọn lọc mô hình thiết kế giao diện (UI/UX) và giải pháp tổ chức tính năng tra cứu bản đồ từ nền tảng tiên phong Tinh Thành (<span style={{ color: '#ea580c', fontWeight: '700' }}>TinhThanhVN.com</span>)</strong>.
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#334155', margin: 0 }}>
                Chúng tôi xin gửi lời cảm ơn và sự trân trọng sâu sắc nhất tới tác giả và đội ngũ sáng lập <strong>TinhThanhVN</strong>. Sự tiên phong, tâm huyết và công sức số hóa của các bạn là nguồn cảm hứng rất lớn để chúng tôi tiếp tục hoàn thiện, tối ưu hóa công cụ này theo hướng tiện ích dân sinh, nhằm mục tiêu chung là phổ cập thông tin hành chính nhanh chóng và chuẩn xác tới mọi tầng lớp nhân dân.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#78350f' }}>
              <span>💡</span>
              <span>
                Toàn bộ dữ liệu số hóa trên hệ thống ĐịaGiớiVN được rà soát, đối soát và cập nhật hoàn toàn độc lập, đảm bảo tính chuẩn mực và tuân thủ các quyết định pháp lý có hiệu lực.
              </span>
            </div>
          </div>

          {/* Section 4: Quyền sở hữu & Miễn trừ trách nhiệm */}
          <div className="tt-card tt-card-padded">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#fefce8',
                  border: '1px solid #fef08a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}
              >
                ⚖️
              </div>
              <div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  4. Bản Quyền & Lưu Ý Quan Trọng (Miễn Trừ Trách Nhiệm)
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Phục vụ nhu cầu tham khảo dân sinh và đối soát thông tin nhanh
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#b91c1c', marginBottom: '4px' }}>
                  ⚠️ Dữ Liệu Mang Tính Chất Tham Khảo Đối Soát Nhanh:
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#7f1d1d', margin: 0 }}>
                  Thông tin trên Cổng tra cứu không thay thế các văn bản quy phạm pháp luật chính thức hoặc giấy xác nhận có con dấu đỏ từ cơ quan Nhà nước có thẩm quyền. Khi thực hiện các thủ tục công chứng, hộ tịch, đăng ký biến động đất đai, người dân vui lòng liên hệ trực tiếp Bộ phận Một cửa tại UBND xã, phường sở tại.
                </p>
              </div>

              <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#15803d', marginBottom: '4px' }}>
                  📢 Tự Do Chia Sẻ Có Ghi Rõ Nguồn:
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#166534', margin: 0 }}>
                  Chúng tôi khuyến khích các cơ quan báo chí, cộng đồng dân cư và các tổ chức chia sẻ rộng rãi thông tin tra cứu trên cổng để hỗ trợ bà con. Vui lòng ghi rõ nguồn trích dẫn trực tiếp để tôn trọng công sức số hóa của đội ngũ biên tập.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Hệ sinh thái tiện ích dân sinh */}
          <div className="tt-card tt-card-padded">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdfa',
                  border: '1px solid #ccfbf1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  flexShrink: 0
                }}
              >
                🚀
              </div>
              <div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  5. Hệ Sinh Thái Tiện Ích Dân Sinh Đa Năng
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  Mở rộng tiện ích phục vụ đời sống gia đình thiết thực
                </p>
              </div>
            </div>

            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#334155', margin: '0 0 14px 0' }}>
              Không dừng lại ở việc tra cứu hành chính tĩnh, hệ thống đang tiếp tục tích hợp nhiều công cụ tương tác phục vụ đời sống thường nhật của nhân dân:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>🗺️ Bản Đồ Vệ Tinh Trực Quan</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Định vị trụ sở UBND, Công an, Tòa án và Trạm y tế trên bản đồ số vệ tinh độ nét cao.</div>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>📮 Mã Bưu Chính Quốc Gia</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Tra cứu mã bưu chính 5 số chuẩn hóa đến từng phường, xã phục vụ gửi hàng chuyển phát.</div>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>📞 Tiếp Nhận Đóng Góp Dữ Liệu</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Đường dây nóng 1900 9396 và kênh liên hệ tiếp nhận ý kiến đóng góp chuẩn hóa dữ liệu số 24/7.</div>
              </div>
            </div>
          </div>

          {/* Sincere Thanks Card */}
          <div
            className="tt-card tt-card-padded"
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #1e293b',
              textAlign: 'center',
              padding: '32px 24px'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>✨</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 10px 0', color: '#ffffff' }}>
              Lời Cảm Ơn Chân Thành
            </h3>
            <blockquote
              style={{
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#cbd5e1',
                lineHeight: '1.8',
                maxWidth: '680px',
                margin: '0 auto 20px auto'
              }}
            >
              &ldquo;Sự tin cậy và đồng hành của bà con nhân dân cùng các tổ chức xã hội là động lực lớn nhất để chúng tôi không ngừng cải tiến Cổng Tra Cứu Địa Giới. Mỗi một phản hồi, mỗi một lượt tra cứu đều là viên gạch quý báu góp phần hoàn thiện bức tranh dữ liệu số cho nước nhà.&rdquo;
            </blockquote>

            <div style={{ fontSize: '13px', fontWeight: '800', color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              BAN ĐIỀU HÀNH DỰ ÁN SỐ HÓA ĐỊA GIỚI HÀNH CHÍNH
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              HỆ THỐNG CỔNG THÔNG TIN ĐỊAGIỚIVN · NĂM {currentYear}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/tinh-thanh"
                className="tt-btn tt-btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '8px', textDecoration: 'none' }}
              >
                🗺️ Trở Về Cổng Bản Đồ
              </Link>
              <Link
                href="/tinh-thanh/tra-cuu-sap-nhap"
                className="tt-btn"
                style={{
                  padding: '10px 20px',
                  fontSize: '13px',
                  borderRadius: '8px',
                  backgroundColor: '#334155',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                🔍 Tra Cứu Sáp Nhập Phường Xã
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
