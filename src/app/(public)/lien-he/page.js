
import { getAllSettings } from '@/lib/settingsHelper';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata() {
  const settings = await getAllSettings();
  const brandName = settings.site_name || settings.company_name || 'Ngọc Gas';
  return {
    title: 'Liên Hệ Đặt Gas & Hỗ Trợ Kỹ Thuật 24/7',
    description: `Liên hệ ${brandName} để đặt gas, tư vấn hệ thống gas công nghiệp hoặc yêu cầu hỗ trợ kỹ thuật. Hotline 24/7, giao gas nhanh 15 phút.`,
  };
}

export default async function ContactPage() {
  let settings = {
    address: '7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương',
    phone: '19009396',
    email: 'contact@ngocgas.com',
    working_hours: '06:00 - 22:00 (Thứ 2 - Chủ nhật)',
    google_maps_embed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.9892!2d106.7725!3d10.9073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d817454f0a0d%3A0x6b77227d82531a7f!2zNyBOZ3V54buFbiBUcnVuZyBUcuG7sWMsINAEaSBBbiwgQsOsbmggRMawxqFuZw!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
  };

  try {
    const fetchedSettings = await getAllSettings();
    settings = { ...settings, ...fetchedSettings };
  } catch (error) {
    console.error('Error fetching contact settings:', error);
  }

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Liên hệ</span>
          </div>
          <h1 className="contact-hero-title">Liên Hệ Với Chúng Tôi</h1>
          <p className="contact-hero-desc">
            Vui lòng gửi tin nhắn hoặc liên hệ trực tiếp qua số hotline để nhận báo giá gas và hỗ trợ dịch vụ kỹ thuật nhanh nhất.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container contact-container">
          <div className="contact-info-panel">
            <h2>Thông Tin Liên Hệ</h2>
            <p className="contact-info-intro">
              {settings.company_name || 'Ngọc Gas'} hân hạnh được phục vụ Quý khách hàng. Quý khách có thể liên lạc với chúng tôi qua các kênh dưới đây:
            </p>

            <ul className="contact-info-list">
              <li>
                <div className="info-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>Địa chỉ văn phòng:</strong>
                  <p>{settings.address}</p>
                </div>
              </li>
              <li>
                <div className="info-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <strong>Số điện thoại:</strong>
                  <p><a href={`tel:${(settings.phone || '19009396').replace(/\./g, '')}`}>{settings.phone || '19009396'}</a></p>
                </div>
              </li>
              <li>
                <div className="info-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <strong>Địa chỉ email:</strong>
                  <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
                </div>
              </li>
              <li>
                <div className="info-icon-box">
                  <Clock size={20} />
                </div>
                <div>
                  <strong>Giờ làm việc:</strong>
                  <p>{settings.working_hours}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form-panel">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map embed */}
      {settings.google_maps_embed && (
        <section className="map-section">
          <div 
            className="map-wrapper"
            dangerouslySetInnerHTML={{ __html: settings.google_maps_embed }}
          />
        </section>
      )}

      
    </>
  );
}
