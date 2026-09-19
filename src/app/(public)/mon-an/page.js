import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/postsHelper';
import { getAllSettings } from '@/lib/settingsHelper';
import { Utensils, Search, Flame, ArrowRight, BookOpen, Clock, Sparkles, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ searchParams }) {
  const sParams = await searchParams;
  const q = sParams?.q ? String(sParams.q).trim() : '';

  let title = 'Món Ngon Vào Bếp - Công Thức & Mẹo Nấu Ăn Tiết Kiệm Gas | Ngọc Gas';
  if (q) title = `Tìm kiếm "${q}" | Món Ngon Vào Bếp | Ngọc Gas`;

  return {
    title,
    description: 'Khám phá công thức nấu các món ăn ngon mỗi ngày, bí quyết chế biến món ăn lửa lớn chuẩn vị nhà hàng và mẹo sử dụng gas tiết kiệm, an toàn từ Ngọc Gas.',
    alternates: {
      canonical: 'https://ngocgas.com/mon-an'
    },
    openGraph: {
      title,
      description: 'Công thức nấu ăn ngon chuẩn vị, mẹo vào bếp thông minh cùng bí quyết nấu nướng lửa chuẩn tiết kiệm gas từ Ngọc Gas.',
      url: 'https://ngocgas.com/mon-an',
      siteName: 'Ngọc Gas',
      locale: 'vi_VN',
      type: 'website'
    }
  };
}

export default async function CookingRecipesPage({ searchParams }) {
  const sParams = await searchParams;
  const searchQuery = sParams?.q ? String(sParams.q).trim().toLowerCase() : '';
  const currentPage = Math.max(1, parseInt(sParams?.page || '1', 10));

  let allPosts = [];
  let settings = {};

  try {
    const all = await getAllPosts();
    allPosts = all.filter(p => p.is_published == 1 && p.category === 'mon-an');
    settings = await getAllSettings();
  } catch (error) {
    console.error('Error fetching cooking posts:', error);
  }

  // Lọc theo từ khóa tìm kiếm (nếu có)
  let filteredPosts = allPosts;
  if (searchQuery) {
    filteredPosts = filteredPosts.filter(p => {
      const title = (p.title || '').toLowerCase();
      const excerpt = (p.excerpt || '').toLowerCase();
      const slug = (p.slug || '').toLowerCase();
      return title.includes(searchQuery) || excerpt.includes(searchQuery) || slug.includes(searchQuery);
    });
  }

  const PAGE_SIZE = 12;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * PAGE_SIZE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

  // Hàm tạo URL giữ nguyên các query params
  function buildUrl(pageNumber, queryParam = searchQuery) {
    const params = new URLSearchParams();
    if (queryParam) params.set('q', queryParam);
    if (pageNumber && pageNumber > 1) params.set('page', String(pageNumber));
    const qs = params.toString();
    return qs ? `/mon-an?${qs}` : '/mon-an';
  }

  // Thuật toán hiển thị dải số trang thông minh (1 2 3 4 ...)
  function getPaginationPages(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  }

  const paginationPages = getPaginationPages(validPage, totalPages);

  const cleanPhone = (settings.phone || '19009396').replace(/\./g, '').trim();

  return (
    <>
      {/* Hero Banner Chuyên Đề Món Ăn */}
      <section className="cooking-hero" style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2A1705 50%, #0F172A 100%)',
        padding: '50px 0 40px',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '16px', fontSize: '14px', color: '#94A3B8' }}>
            <Link href="/" style={{ color: '#E2E8F0', textDecoration: 'none' }}>Trang chủ</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#F97316', fontWeight: '600' }}>Món ngon vào bếp</span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.4)', borderRadius: '20px', padding: '6px 14px', marginBottom: '16px', color: '#FB923C', fontSize: '13px', fontWeight: '600' }}>
              <Utensils size={15} />
              <span>Góc Ẩm Thực &amp; Bí Quyết Nấu Nướng</span>
            </div>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '800', lineHeight: '1.25', marginBottom: '14px', color: '#FFFFFF' }}>
              Món Ngon Vào Bếp &amp; Bí Quyết Lửa Xanh Chuẩn Vị
            </h1>
            <p style={{ fontSize: '16px', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '24px' }}>
              Bộ sưu tập công thức món ăn ngon mỗi ngày cho gia đình và nhà hàng, quán ăn. Mẹo canh lửa gas chuẩn, giữ trọn hương vị và dưỡng chất thơm ngon từ các chuyên gia Ngọc Gas.
            </p>

            {/* Thanh tìm kiếm món ăn */}
            <form action="/mon-an" method="GET" style={{ display: 'flex', maxWidth: '560px', gap: '8px', background: '#FFFFFF', borderRadius: '12px', padding: '6px 8px 6px 14px', boxShadow: '0 10px 25px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <Search size={18} color="#64748B" />
                <input
                  type="text"
                  name="q"
                  defaultValue={sParams?.q || ''}
                  placeholder="Tìm món ngon, cách nấu, mẹo canh lửa gas..."
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px', color: '#1E293B' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'opacity 0.2s'
                }}
              >
                <span>Tìm kiếm</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '50px 0 70px', background: '#F8FAFC' }}>
        <div className="container">
          {/* Header kết quả */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                {searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : 'Tất cả công thức & Món ngon'}
              </h2>
              <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
                Hiển thị {paginatedPosts.length} / {totalPosts} bài viết chuyên mục Món ăn
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link 
                href="/tin-tuc" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#475569', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}
              >
                <BookOpen size={16} />
                <span>Xem tin tức &amp; Cẩm nang</span>
              </Link>
            </div>
          </div>

          {/* Danh sách bài viết hoặc Empty State */}
          {paginatedPosts.length > 0 ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {paginatedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Thanh điều hướng phân trang 1 2 3 4 (Pagination Bar) */}
              {totalPages > 1 && (
                <nav className="pagination-wrap" aria-label="Điều hướng trang món ăn" style={{ marginBottom: '40px' }}>
                  <div className="pagination">
                    {/* Nút Về Trang Đầu */}
                    {validPage > 1 && (
                      <Link href={buildUrl(1)} className="page-btn page-edge-btn" title="Trang đầu tiên">
                        <ChevronsLeft size={16} />
                      </Link>
                    )}

                    {/* Nút Trang Trước */}
                    {validPage > 1 && (
                      <Link href={buildUrl(validPage - 1)} className="page-btn page-nav-btn" title="Trang trước">
                        <ChevronLeft size={16} />
                        <span className="page-nav-text">Trước</span>
                      </Link>
                    )}

                    {/* Dãy số trang 1 2 3 4 ... */}
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
                          style={isCurrent ? { background: '#EA580C', color: '#FFFFFF', boxShadow: '0 2px 8px rgba(234, 88, 12, 0.35)' } : {}}
                        >
                          {p}
                        </Link>
                      );
                    })}

                    {/* Nút Trang Sau */}
                    {validPage < totalPages && (
                      <Link href={buildUrl(validPage + 1)} className="page-btn page-nav-btn" title="Trang sau">
                        <span className="page-nav-text">Sau</span>
                        <ChevronRight size={16} />
                      </Link>
                    )}

                    {/* Nút Đến Trang Cuối */}
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
              padding: '60px 24px',
              textAlign: 'center',
              border: '1px dashed #CBD5E1',
              maxWidth: '680px',
              margin: '0 auto 50px'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#FFF7ED',
                color: '#EA580C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Utensils size={36} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                {searchQuery ? 'Không tìm thấy món ăn phù hợp' : 'Chuyên mục Món Ngon đang được cập nhật'}
              </h3>
              <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 24px' }}>
                {searchQuery 
                  ? 'Vui lòng thử tìm kiếm bằng từ khóa khác hoặc quay lại danh mục tất cả bài viết.'
                  : 'Ngọc Gas đang biên soạn những công thức món ăn đặc sắc và mẹo nấu nướng chuẩn lửa. Quý khách vui lòng quay lại sau!'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {searchQuery && (
                  <Link
                    href="/mon-an"
                    style={{
                      padding: '10px 20px',
                      background: '#F1F5F9',
                      color: '#334155',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Xóa tìm kiếm
                  </Link>
                )}
                <Link
                  href="/san-pham"
                  style={{
                    padding: '10px 20px',
                    background: '#EA580C',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Flame size={16} />
                  <span>Xem bình gas &amp; Bếp gas chính hãng</span>
                </Link>
              </div>
            </div>
          )}

          {/* CTA Box Đổi Gas Giao Nhanh Cho Gian Bếp */}
          <div style={{
            background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
            borderRadius: '16px',
            padding: '36px 32px',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: '0 12px 30px rgba(234, 88, 12, 0.25)'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Sparkles size={14} />
                <span>Nấu ăn trọn vị - Lửa xanh tiết kiệm</span>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px', color: '#FFFFFF' }}>
                Hết Gas Khi Đang Nấu? Gọi Ngay Giao Hỏa Tốc 15 Phút!
              </h3>
              <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.5' }}>
                Ngọc Gas phân phối chính hãng Sopet Gas One, Phoenix Gas, Luxen Gas. Cân đủ ký tận mắt, kiểm tra an toàn miễn phí tại Dĩ An, Thuận An, Thủ Đức &amp; TP.HCM.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`tel:${cleanPhone}`}
                style={{
                  background: '#FFFFFF',
                  color: '#C2410C',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <Flame size={18} />
                <span>Gọi đổi gas: {settings.phone || '19009396'}</span>
              </a>
              <Link
                href="/gia-gas-hom-nay"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '15px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Bảng giá hôm nay</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
