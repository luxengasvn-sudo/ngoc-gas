import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { getPostByIdOrSlug, getAllPosts } from '@/lib/postsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const post = await getPostByIdOrSlug(slug);
    if (post) {
      return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        keywords: post.meta_keywords || 'tin tuc gas, ngoc gas'
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
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
            "name": "Tin tức",
            "item": `${baseUrl}/tin-tuc`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `${baseUrl}/tin-tuc/${post.slug}`
          }
        ]
      }
    ]
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
            <Link href="/tin-tuc">Tin tức</Link>
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
          </div>
        </div>
      </div>

      <section className="post-detail-section-custom">
        <div className="container" style={{ padding: '0 20px' }}>
          <article className="post-card-container">
            {post.excerpt && (
              <div className="post-excerpt-lead-custom">
                <p>{post.excerpt}</p>
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
