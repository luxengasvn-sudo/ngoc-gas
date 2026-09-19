import Link from 'next/link';
import PostCard from '@/components/PostCard';
import RecruitmentForm from '@/components/RecruitmentForm';
import { getAllPosts } from '@/lib/postsHelper';
import { getAllSettings, parseRecruitmentBenefits } from '@/lib/settingsHelper';
import { Briefcase, ShieldCheck, DollarSign, Award, Clock, MapPin, Phone, Users, CheckCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata() {
  const pageTitle = 'Tuyển Dụng Nhân Tài - Cơ Hội Việc Làm Thu Nhập Cao | Ngọc Gas';
  const pageDescription = 'Tuyển dụng nhân viên giao gas xe máy, kỹ thuật viên bảo trì hệ thống gas công nghiệp tại Bình Dương & TP.HCM. Thu nhập 10 - 18 triệu/tháng, chế độ đãi ngộ tốt.';

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: 'https://ngocgas.com/tuyen-dung'
    },
    openGraph: {
      title: pageTitle,
      description: 'Gia nhập đội ngũ Ngọc Gas - Đại lý phân phối gas hàng đầu Bình Dương & TP.HCM. Cơ hội việc làm ổn định, thu nhập hấp dẫn.',
      url: 'https://ngocgas.com/tuyen-dung',
      siteName: 'Ngọc Gas',
      locale: 'vi_VN',
      type: 'website'
    }
  };
}

export default async function RecruitmentPage({ searchParams }) {
  const sParams = await searchParams;
  const currentPage = Math.max(1, parseInt(sParams?.page || '1', 10));

  let allPosts = [];
  let settings = {};

  try {
    const all = await getAllPosts();
    allPosts = all.filter(p => p.is_published == 1 && p.category === 'tuyen-dung');
    settings = await getAllSettings();
  } catch (error) {
    console.error('Error fetching recruitment posts:', error);
  }

  const PAGE_SIZE = 8;
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * PAGE_SIZE;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + PAGE_SIZE);

  function buildUrl(pageNumber) {
    if (pageNumber && pageNumber > 1) return `/tuyen-dung?page=${pageNumber}#jobs`;
    return '/tuyen-dung#jobs';
  }

  function getPaginationPages(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '...', current - 1, current, current + 1, '...', total];
  }

  const paginationPages = getPaginationPages(validPage, totalPages);

  const cleanPhone = (settings.phone || '19009396').replace(/\./g, '').trim();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';

  const schemaList = allPosts.map(p => {
    const jobMeta = p.job_meta || {};
    const salaryMin = Number(jobMeta.salary_min) || 10000000;
    const salaryMax = Number(jobMeta.salary_max) || 18000000;
    const validThrough = jobMeta.deadline 
      ? new Date(jobMeta.deadline).toISOString() 
      : new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();

    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": p.title,
      "description": p.content || p.excerpt || p.title,
      "datePosted": p.created_at ? new Date(p.created_at).toISOString() : new Date().toISOString(),
      "validThrough": validThrough,
      "employmentType": jobMeta.employment_type || "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Ngọc Gas",
        "sameAs": baseUrl,
        "logo": `${baseUrl}/uploads/1784860325667-878483593.png`
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": jobMeta.location || "7 Nguyễn Trung Trực, Phường Dĩ An",
          "addressLocality": "Dĩ An",
          "addressRegion": "Bình Dương",
          "postalCode": "75000",
          "addressCountry": "VN"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "VND",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": salaryMin,
          "maxValue": salaryMax,
          "unitText": "MONTH"
        }
      },
      "directApply": true
    };
  });

  if (schemaList.length === 0) {
    schemaList.push({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "Nhân Viên Giao Gas Xe Máy - Thu Nhập 10 Đến 18 Triệu",
      "description": "Ngọc Gas tuyển dụng nhân viên giao gas xe máy tại Dĩ An, Thuận An, Thủ Đức. Yêu cầu có xe máy, thông thạo đường phố, trung thực, nhiệt tình. Quyền lợi: Lương 10 - 18 triệu/tháng, BHXH đầy đủ, thưởng lễ tết.",
      "datePosted": new Date().toISOString(),
      "validThrough": new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString(),
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Ngọc Gas",
        "sameAs": baseUrl,
        "logo": `${baseUrl}/uploads/1784860325667-878483593.png`
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7 Nguyễn Trung Trực, Phường Dĩ An",
          "addressLocality": "Dĩ An",
          "addressRegion": "Bình Dương",
          "postalCode": "75000",
          "addressCountry": "VN"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "VND",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 10000000,
          "maxValue": 18000000,
          "unitText": "MONTH"
        }
      },
      "directApply": true
    });
  }

  const iconMap = {
    DollarSign,
    ShieldCheck,
    Award,
    Users,
    Clock,
    MapPin,
    Briefcase,
    CheckCircle,
    Phone
  };

  const heroTitle = settings.recruitment_hero_title || 'Cơ Hội Nghề Nghiệp & Việc Làm Thu Nhập Cao';
  const heroDesc = settings.recruitment_hero_desc || 'Ngọc Gas liên tục tuyển dụng các vị trí Nhân viên giao gas, Kỹ thuật viên bảo trì và Nhân viên chăm sóc khách hàng tại khu vực Bình Dương, TP.HCM & Vũng Tàu. Công việc ổn định, đãi ngộ công bằng, phát triển bền vững.';
  const benefitsTitle = settings.recruitment_benefits_title || 'Quyền Lợi & Phúc Lợi Tại Ngọc Gas';
  const benefitsSubtitle = settings.recruitment_benefits_subtitle || 'Chúng tôi cam kết xây dựng môi trường làm việc minh bạch, an toàn và thu nhập xứng đáng với công sức đóng góp của bạn.';
  const benefits = parseRecruitmentBenefits(settings.recruitment_benefits_list);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />
      {/* Hero Banner Tuyển Dụng */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1E3A8A 100%)',
        padding: '55px 0 45px',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '16px', fontSize: '14px', color: '#94A3B8' }}>
            <Link href="/" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Trang chủ</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#60A5FA', fontWeight: '600' }}>Tuyển dụng</span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.18)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '20px', padding: '6px 14px', marginBottom: '16px', color: '#93C5FD', fontSize: '13px', fontWeight: '600' }}>
              <Briefcase size={15} />
              <span>Gia Nhập Đội Ngũ Ngọc Gas</span>
            </div>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '800', lineHeight: '1.25', marginBottom: '14px', color: '#FFFFFF' }}>
              {heroTitle}
            </h1>
            <p style={{ fontSize: '16px', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '24px' }}>
              {heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '50px 0 70px', background: '#F8FAFC' }}>
        <div className="container">
          {/* Phúc lợi nổi bật */}
          {benefits.length > 0 && (
            <div style={{ marginBottom: '50px' }}>
              <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 36px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                  {benefitsTitle}
                </h2>
                {benefitsSubtitle && (
                  <p style={{ color: '#64748B', fontSize: '15px' }}>
                    {benefitsSubtitle}
                  </p>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {benefits.map((b, idx) => {
                  const IconComponent = iconMap[b.icon] || Briefcase;
                  return (
                    <div key={b.id || idx} style={{
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      padding: '24px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        background: '#EFF6FF',
                        color: '#2563EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                      }}>
                        <IconComponent size={24} />
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                        {b.title}
                      </h3>
                      <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                        {b.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2 Cột: Danh sách bài tuyển dụng & Form ứng tuyển nhanh */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}>
            {/* Cột trái: Danh sách vị trí tuyển dụng */}
            <div id="jobs">
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px' }}>
                  Các Vị Trí Đang Tuyển Dụng
                </h2>
                <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
                  Hiện có {allPosts.length} thông báo tuyển dụng đang mở
                </p>
              </div>

              {paginatedPosts.length > 0 ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {paginatedPosts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Thanh điều hướng phân trang 1 2 3 4 */}
                  {totalPages > 1 && (
                    <nav className="pagination-wrap" aria-label="Điều hướng trang tuyển dụng" style={{ marginTop: '28px', marginBottom: '20px' }}>
                      <div className="pagination">
                        {validPage > 1 && (
                          <Link href={buildUrl(1)} className="page-btn page-edge-btn" title="Trang đầu tiên">
                            <ChevronsLeft size={16} />
                          </Link>
                        )}

                        {validPage > 1 && (
                          <Link href={buildUrl(validPage - 1)} className="page-btn page-nav-btn" title="Trang trước">
                            <ChevronLeft size={16} />
                            <span className="page-nav-text">Trước</span>
                          </Link>
                        )}

                        {paginationPages.map((p, idx) => {
                          if (p === '...') {
                            return <span key={`ellipsis-${idx}`} className="page-ellipsis">...</span>;
                          }
                          const isCurrent = p === validPage;
                          return (
                            <Link
                              key={`page-${p}`}
                              href={buildUrl(p)}
                              className={`page-btn page-num ${isCurrent ? 'active' : ''}`}
                              aria-current={isCurrent ? 'page' : undefined}
                            >
                              {p}
                            </Link>
                          );
                        })}

                        {validPage < totalPages && (
                          <Link href={buildUrl(validPage + 1)} className="page-btn page-nav-btn" title="Trang sau">
                            <span className="page-nav-text">Sau</span>
                            <ChevronRight size={16} />
                          </Link>
                        )}

                        {validPage < totalPages && (
                          <Link href={buildUrl(totalPages)} className="page-btn page-edge-btn" title="Trang cuối cùng">
                            <ChevronsRight size={16} />
                          </Link>
                        )}
                      </div>
                      <div className="pagination-info">
                        Trang <strong>{validPage}</strong> trên tổng số <strong>{totalPages}</strong> trang
                      </div>
                    </nav>
                  )}
                </>
              ) : (
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  border: '1px dashed #CBD5E1'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#EFF6FF',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <Briefcase size={32} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                    Tuyển Dụng Thường Xuyên &amp; Liên Tục
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 20px' }}>
                    Ngọc Gas liên tục tiếp nhận hồ sơ cho các vị trí <strong>Nhân viên giao gas xe máy</strong> và <strong>Thợ kỹ thuật</strong>. Quý ứng viên vui lòng gửi hồ sơ qua biểu mẫu bên cạnh để được gọi phỏng vấn ngay.
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', padding: '8px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#475569' }}>
                    <MapPin size={16} color="#2563EB" />
                    <span>Nơi làm việc: Dĩ An, Thuận An (Bình Dương) &amp; TP.HCM</span>
                  </div>
                </div>
              )}
            </div>

            {/* Cột phải: Form Ứng Tuyển Nhanh */}
            <div id="apply">
              <RecruitmentForm phone={settings.phone} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
