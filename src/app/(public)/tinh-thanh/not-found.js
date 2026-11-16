import Link from 'next/link';

export const metadata = {
  title: '404 - Không Tìm Thấy Trang Địa Giới | ĐịaGiớiVN',
  description: 'Địa chỉ xã/phường, tỉnh thành hoặc cơ quan nhà nước bạn đang tìm kiếm không tồn tại hoặc đã thay đổi sau sáp nhập địa giới 2026. Vui lòng quay lại Cổng Địa Giới VN để tra cứu chính xác.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function TinhThanhNotFound() {
  return (
    <div style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 16px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        maxWidth: '680px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        padding: '48px 32px',
        textAlign: 'center',
        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)'
      }}>
        {/* Badge nhận diện */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#eff6ff',
          color: '#1d4ed8',
          fontSize: '13px',
          fontWeight: '700',
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '20px'
        }}>
          <span>🗺️ CỔNG ĐỊA GIỚI HÀNH CHÍNH VN</span>
        </div>

        {/* Số 404 lớn */}
        <h1 style={{
          fontSize: '76px',
          fontWeight: '900',
          color: '#1e40af',
          lineHeight: '1',
          margin: '0 0 12px 0',
          letterSpacing: '-2px'
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#0f172a',
          margin: '0 0 12px 0',
          lineHeight: 1.35
        }}>
          Không Tìm Thấy Đơn Vị Hành Chính Hoặc Trang Yêu Cầu
        </h2>

        <p style={{
          fontSize: '15px',
          color: '#475569',
          lineHeight: '1.65',
          maxWidth: '540px',
          margin: '0 auto 32px auto'
        }}>
          Địa chỉ xã/phường, tỉnh thành hoặc cơ quan bạn đang tìm kiếm có thể đã được sắp xếp lại sau đợt sáp nhập địa giới hành chính năm 2026, hoặc liên kết đã chuyển sang định dạng mới.
        </p>

        {/* Cụm nút hành động chính: Về trang Cổng Địa Giới */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '36px'
        }}>
          {/* NÚT VỀ TRANG TỈNH THÀNH (YÊU CẦU CỐT LÕI) */}
          <Link
            href="/tinh-thanh"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              padding: '13px 26px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            <span>🏠</span>
            <span>Về Cổng Địa Giới VN</span>
          </Link>

          {/* Nút Tra cứu sáp nhập */}
          <Link
            href="/tinh-thanh/tra-cuu-sap-nhap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f0fdf4',
              color: '#15803d',
              border: '1px solid #bbf7d0',
              padding: '13px 22px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            <span>🔍</span>
            <span>Tra Cứu Sáp Nhập</span>
          </Link>
        </div>

        {/* Khám phá nhanh các tiện ích địa giới */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '28px',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '800',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Khám phá nhanh các phân hệ dữ liệu địa giới:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '10px'
          }}>
            <Link
              href="/tinh-thanh/34-tinh-thanh"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                fontSize: '13.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '600',
                border: '1px solid #e2e8f0'
              }}
            >
              <span>📍</span>
              <span>34 Tỉnh Thành Mới</span>
            </Link>

            <Link
              href="/tinh-thanh/benh-vien"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#f0f9ff',
                borderRadius: '10px',
                fontSize: '13.5px',
                color: '#0369a1',
                textDecoration: 'none',
                fontWeight: '700',
                border: '1px solid #bfdbfe'
              }}
            >
              <span>🏥</span>
              <span>Danh Mục Bệnh Viện</span>
            </Link>

            <Link
              href="/tinh-thanh/tra-cuu-ma-buu-chinh"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                fontSize: '13.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '600',
                border: '1px solid #e2e8f0'
              }}
            >
              <span>📮</span>
              <span>Mã Bưu Chính</span>
            </Link>

            <Link
              href="/tinh-thanh/bien-so-xe"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                fontSize: '13.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '600',
                border: '1px solid #e2e8f0'
              }}
            >
              <span>🚗</span>
              <span>Biển Số Xe 2026</span>
            </Link>

            <Link
              href="/tinh-thanh/tinh-thanh-cu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                fontSize: '13.5px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '600',
                border: '1px solid #e2e8f0'
              }}
            >
              <span>🏛️</span>
              <span>63 Tỉnh Thành Cũ</span>
            </Link>

            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#fef2f2',
                borderRadius: '10px',
                fontSize: '13.5px',
                color: '#dc2626',
                textDecoration: 'none',
                fontWeight: '700',
                border: '1px solid #fecaca'
              }}
            >
              <span>🔥</span>
              <span>Trang Chủ Ngọc Gas</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
