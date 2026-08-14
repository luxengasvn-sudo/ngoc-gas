import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/postsHelper';
import { getAllSettings } from '@/lib/settingsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata() {
  return {
    title: 'Tin Tức & Khuyến Mãi Gas - Ngọc Gas',
    description: 'Cập nhật tin tức khuyến mãi, cẩm nang sử dụng gas an toàn và thông tin giá gas mới nhất từ Ngọc Gas.',
  };
}

export default async function NewsPage() {
  let posts = [];
  let settings = {};

  try {
    const allPosts = await getAllPosts();
    posts = allPosts.filter(p => p.is_published == 1);
    settings = await getAllSettings();
  } catch (error) {
    console.error('Error fetching posts or settings:', error);
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
            Cập nhật những thông tin khuyến mãi mới nhất từ {settings.company_name || 'Ngọc Gas'} và kinh nghiệm sử dụng gas an toàn.
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
