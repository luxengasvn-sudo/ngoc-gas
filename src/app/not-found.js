import Link from 'next/link';
import { Flame, PhoneCall, Home, Tag, Store, FileText } from 'lucide-react';
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: '404 - Không Tìm Thấy Trang | Ngọc Gas',
    description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ mới. Vui lòng quay về trang chủ hoặc liên hệ hotline để được hỗ trợ.',
    robots: {
      index: false,
      follow: true,
    }
  };
}

export default async function NotFound() {
  let settings = {};
  try {
    settings = await getAllSettings();
  } catch (e) {}

  const phone = settings.phone || '19009396';
  const cleanPhone = phone.replace(/\./g, '').trim();
  const companyName = settings.company_name || 'Ngọc Gas';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8FAFC',
      padding: '40px 20px',
      fontFamily: 'var(--font-roboto), sans-serif'
    }}>
      <div style={{
        maxWidth: '640px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)',
        border: '1px solid #E2E8F0',
        padding: '48px 36px',
        textAlign: 'center'
      }}>
        {/* Brand Icon Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#EFF6FF',
          color: '#1D70B8',
          marginBottom: '20px'
        }}>
          <Flame size={44} style={{ color: '#E53E3E' }} />
        </div>

        {/* 404 Headline */}
        <h1 style={{
          fontSize: '72px',
          fontWeight: '900',
          lineHeight: '1',
          margin: '0 0 12px 0',
          color: '#1D70B8',
          letterSpacing: '-2px'
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#0F172A',
          margin: '0 0 12px 0'
        }}>
          Không Tìm Thấy Trang Yêu Cầu
        </h2>

        <p style={{
          fontSize: '15px',
          color: '#64748B',
          lineHeight: '1.6',
          margin: '0 0 32px 0'
        }}>
          Địa chỉ liên kết bạn vừa truy cập có thể đã hết hạn, bị đổi tên hoặc tạm thời không khả dụng trên hệ thống {companyName}.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '36px'
        }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1D70B8',
              color: '#FFFFFF',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
          >
            <Home size={18} />
            Về Trang Chủ
          </Link>

          <a
            href={`tel:${cleanPhone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FCA5A5',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none'
            }}
          >
            <PhoneCall size={18} />
            Gọi Hotline {phone}
          </a>
        </div>

        {/* Quick Links Section */}
        <div style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: '28px',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Hoặc khám phá nhanh các mục sau:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px'
          }}>
            <Link
              href="/gia-gas-hom-nay"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '500',
                border: '1px solid #E2E8F0'
              }}
            >
              <Tag size={16} color="#E53E3E" />
              Giá gas hôm nay
            </Link>

            <Link
              href="/san-pham"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '500',
                border: '1px solid #E2E8F0'
              }}
            >
              <Flame size={16} color="#1D70B8" />
              Sản phẩm gas
            </Link>

            <Link
              href="/cua-hang"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '500',
                border: '1px solid #E2E8F0'
              }}
            >
              <Store size={16} color="#16A34A" />
              Cửa hàng
            </Link>

            <Link
              href="/tin-tuc"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#334155',
                textDecoration: 'none',
                fontWeight: '500',
                border: '1px solid #E2E8F0'
              }}
            >
              <FileText size={16} color="#F59E0B" />
              Tin tức
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
