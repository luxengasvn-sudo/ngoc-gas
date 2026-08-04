import db from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const [rows] = await db.query(
      'SELECT title, excerpt, meta_title, meta_description, meta_keywords FROM posts WHERE slug = ?', 
      [slug]
    );
    if (rows.length > 0) {
      const post = rows[0];
      return {
        title: post.meta_title || `${post.title} - NGỌC GAS`,
        description: post.meta_description || post.excerpt || 'Đọc tin tức mới nhất từ Ngọc Gas',
        keywords: post.meta_keywords || 'ngoc gas, giao gas nhanh, ngoc gas hcm'
      };
    }
  } catch (e) {
    console.error('Error generating metadata:', e);
  }
  
  return {
    title: 'Tin tức & Khuyến mãi - NGỌC GAS',
    description: 'Tin tức mới nhất, hướng dẫn sử dụng gas an toàn và các chương trình khuyến mãi của Ngọc Gas.'
  };
}

export default async function PostDetailPage({ params }) {
  const { slug } = await params;

  let post = null;
  let otherPosts = [];

  try {
    // 1. Fetch single post detail
    const [postRows] = await db.query('SELECT * FROM posts WHERE slug = ? AND is_published = 1', [slug]);
    if (postRows.length === 0) {
      notFound();
    }
    post = postRows[0];

    // 2. Fetch other recent posts
    const [otherRows] = await db.query('SELECT * FROM posts WHERE id != ? AND is_published = 1 ORDER BY created_at DESC LIMIT 3', [post.id]);
    otherPosts = otherRows;
  } catch (error) {
    console.error('Error fetching post detail:', error);
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="post-detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <Link href="/tin-tuc">Tin tức</Link>
            <span className="separator">/</span>
            <span className="current">{post.title}</span>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container post-detail-container">
          <article className="post-detail-article card">
            <div className="post-detail-meta">
              <span className="post-detail-date">
                <Calendar size={16} />
                <span>Đăng ngày: {formatDate(post.created_at)}</span>
              </span>
            </div>
            <h1 className="post-detail-title">{post.title}</h1>
            {post.excerpt && <p className="post-detail-excerpt">{post.excerpt}</p>}
            <div className="post-detail-divider"></div>
            
            {/* Render post body content */}
            <div 
              className="post-detail-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Other Posts Section */}
          {otherPosts.length > 0 && (
            <div className="other-posts-section">
              <h2 className="other-title">Bài Viết Khác</h2>
              <div className="grid-3">
                {otherPosts.map(otherPost => (
                  <PostCard key={otherPost.id} post={otherPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
