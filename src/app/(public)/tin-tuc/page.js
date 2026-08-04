import db from '@/lib/db';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export default async function NewsPage() {
  let posts = [];

  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE is_published = 1 ORDER BY created_at DESC');
    posts = rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <>
      <section className="news-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Tin tức</span>
          </div>
          <h1 className="news-hero-title">Tin Tức & Khuyến Mãi</h1>
          <p className="news-hero-desc">
            Cập nhật những thông tin khuyến mãi mới nhất từ Ngọc Gas và kinh nghiệm sử dụng gas an toàn.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Danh mục này đang được cập nhật nội dung...</p>
          )}
        </div>
      </section>

      
    </>
  );
}
