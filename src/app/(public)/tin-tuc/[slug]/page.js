import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { getPostByIdOrSlug, getAllPosts } from '@/lib/postsHelper';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  
  try {
    const post = await getPostByIdOrSlug(slug);
    if (post) {
      const title = post.meta_title || post.title;
      const description = post.meta_description || post.excerpt;
      const canonicalUrl = `${baseUrl}/tin-tuc/${post.slug}`;

      let imageUrl = post.image_url;
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }

      const images = imageUrl ? [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title
      }] : [];

      return {
        title,
        description,
        keywords: post.meta_keywords || 'tin tuc gas, ngoc gas',
        alternates: {
          canonical: canonicalUrl
        },
        openGraph: {
          title,
          description,
          url: canonicalUrl,
          siteName: 'Ngọc Gas',
          locale: 'vi_VN',
          type: 'article',
          images: images.length > 0 ? images : undefined
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: imageUrl ? [imageUrl] : undefined
        }
      };
    }
  } catch (e) {
    console.error('Error generating post metadata:', e.message);
  }

  return {
    title: 'Tin tức & Khuyến mãi',
    description: 'Tin tức mới nhất, hướng dẫn sử dụng gas an toàn và các chương trình khuyến mãi của Ngọc Gas.'
  };
}

export default async function PostDetailPage({ params }) {
  const { slug } = await params;

  let post = await getPostByIdOrSlug(slug);
  let otherPosts = [];

  if (post) {
    const all = await getAllPosts();
    otherPosts = all.filter(p => p.id !== post.id && p.is_published == 1).slice(0, 3);
  } else {
    notFound();
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ngocgas.com';
  const isJob = post.category === 'tuyen-dung';
  const isCooking = post.category === 'mon-an';
  const jobMeta = post.job_meta || {};

  const categoryName = isJob ? 'Tuyển dụng' : (isCooking ? 'Món ngon vào bếp' : 'Tin tức');
  const categoryPath = isJob ? '/tuyen-dung' : (isCooking ? '/mon-an' : '/tin-tuc');

  const schemaGraph = [
    {
      "@type": "Article",
      "@id": `${baseUrl}/tin-tuc/${post.slug}#article`,
      "headline": post.title,
      "description": post.excerpt || post.meta_description || post.title,
      "image": post.image_url ? (post.image_url.startsWith('http') ? post.image_url : `${baseUrl}${post.image_url}`) : `${baseUrl}/favicon.ico`,
      "datePublished": post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString(),
      "dateModified": post.updated_at ? new Date(post.updated_at).toISOString() : (post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString()),
      "author": {
        "@type": "Organization",
        "name": post.author || "Ngọc Gas"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ngọc Gas",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon.ico`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/tin-tuc/${post.slug}`
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/tin-tuc/${post.slug}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryName,
          "item": `${baseUrl}${categoryPath}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `${baseUrl}/tin-tuc/${post.slug}`
        }
      ]
    }
  ];

  // Google for Jobs (Schema.org JobPosting)
  if (isJob) {
    const salaryMin = Number(jobMeta.salary_min) || 10000000;
    const salaryMax = Number(jobMeta.salary_max) || 18000000;
    const validThrough = jobMeta.deadline 
      ? new Date(jobMeta.deadline).toISOString() 
      : new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();

    schemaGraph.push({
      "@type": "JobPosting",
      "@id": `${baseUrl}/tin-tuc/${post.slug}#jobposting`,
      "title": post.title,
      "description": post.content || post.excerpt || post.title,
      "datePosted": post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString(),
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
    });
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": schemaGraph
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="post-detail-header-custom">
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 20px' }}>
          <div className="post-breadcrumb-custom">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <Link href={categoryPath}>{categoryName}</Link>
            <span className="separator">/</span>
            <span className="current">{post.title}</span>
          </div>

          <h1 className="post-title-custom">{post.title}</h1>

          <div className="post-meta-bar-custom">
            <div className="meta-pill-item">
              <Calendar size={15} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="meta-pill-item">
              <User size={15} />
              <span>Ngọc Gas Team</span>
            </div>
            <div className="meta-pill-item">
              <Clock size={15} />
              <span>3 phút đọc</span>
            </div>
            {isJob && (
              <div className="meta-pill-item" style={{ background: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE' }}>
                <span>💼 Việc làm Google Jobs</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="post-detail-section-custom">
        <div className="container" style={{ padding: '0 20px' }}>
          <article className="post-card-container">
            {/* Hộp Thông Tin Việc Làm Nhanh (Nếu là bài Tuyển dụng) */}
            {isJob && (
              <div style={{
                background: 'linear-gradient(135deg, #F0F9FF 0%, #EFF6FF 100%)',
                border: '1.5px solid #BFDBFE',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '28px',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1E3A8A', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>💼</span>
                    <span>Thông Tin Tuyển Dụng Nhanh</span>
                  </h2>
                  <span style={{ fontSize: '12px', background: '#DBEAFE', color: '#1E40AF', padding: '3px 10px', borderRadius: '20px', fontWeight: '700' }}>
                    Đạt chuẩn Google for Jobs
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Mức thu nhập</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#166534', marginTop: '3px' }}>
                      {jobMeta.salary_min || jobMeta.salary_max ? (
                        <>
                          {jobMeta.salary_min ? `${Number(jobMeta.salary_min).toLocaleString('vi-VN')} đ` : ''}
                          {jobMeta.salary_max ? ` - ${Number(jobMeta.salary_max).toLocaleString('vi-VN')} đ` : ''}
                        </>
                      ) : (
                        '10.000.000 đ - 18.000.000 đ'
                      )}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Hình thức làm việc</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', marginTop: '3px' }}>
                      {jobMeta.employment_type === 'PART_TIME' ? 'Bán thời gian' : (jobMeta.employment_type === 'CONTRACT' ? 'Hợp đồng' : 'Toàn thời gian')}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Hạn nộp hồ sơ</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#92400E', marginTop: '3px' }}>
                      {jobMeta.deadline || 'Tuyển liên tục'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ fontSize: '13px', color: '#475569' }}>
                    📍 <strong>Nơi làm việc:</strong> {jobMeta.location || '7 Nguyễn Trung Trực, Phường Dĩ An, Tỉnh Bình Dương'}
                  </div>
                  <Link
                    href="/tuyen-dung"
                    style={{
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: '#FFFFFF',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                    }}
                  >
                    <span>Nộp đơn ứng tuyển ngay</span>
                    <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                  </Link>
                </div>
              </div>
            )}

            {post.excerpt && (
              <div className="post-excerpt-lead-custom">
                <p>{post.excerpt}</p>
              </div>
            )}

            {post.image_url && !post.content?.includes(post.image_url) && (
              <div className="post-featured-image-wrapper" style={{ margin: '0 0 28px 0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '520px', objectFit: 'cover' }} 
                />
              </div>
            )}

            <div 
              className="post-content-body-custom"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="post-footer-nav-custom">
              <Link href="/tin-tuc" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>
                <ArrowLeft size={16} />
                Quay lại danh sách tin tức
              </Link>
            </div>
          </article>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <div className="related-posts-section-custom">
              <h3 className="related-title-custom">Bài Viết Liên Quan Khác</h3>
              <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {otherPosts.map(relPost => (
                  <PostCard key={relPost.id} post={relPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
