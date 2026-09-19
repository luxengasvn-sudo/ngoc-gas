import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/postsHelper';
import { getAllSettings } from '@/lib/settingsHelper';
import { Search, MapPin, BookOpen, RotateCcw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Newspaper } from 'lucide-react';

export const revalidate = 60;

function getPostRegion(post) {
  const title = (post.title || '').toLowerCase();
  const slug = (post.slug || '').toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  const text = `${title} ${slug} ${excerpt}`;

  // 1. Bình Dương
  if (
    text.includes('bình dương') ||
    text.includes('dĩ an') ||
    text.includes('thuận an') ||
    text.includes('thủ dầu một') ||
    text.includes('tân uyên') ||
    text.includes('bến cát') ||
    text.includes('lái thiêu') ||
    text.includes('vĩnh phú') ||
    text.includes('bình chuẩn') ||
    text.includes('hưng định') ||
    text.includes('an thạnh') ||
    text.includes('bình nhâm') ||
    text.includes('phú cường') ||
    text.includes('phú hòa') ||
    text.includes('chánh nghĩa') ||
    text.includes('hiệp thành') ||
    text.includes('hòa phú') ||
    text.includes('thái hòa') ||
    text.includes('tân phước khánh') ||
    text.includes('tân bình (tp. dĩ an)')
  ) {
    return 'binh-duong';
  }

  // 2. Vũng Tàu
  if (
    text.includes('vũng tàu') ||
    text.includes('bà rịa') ||
    text.includes('long sơn') ||
    text.includes('thắng nhất') ||
    text.includes('thắng nhì') ||
    text.includes('thắng tam') ||
    text.includes('rạch dừa') ||
    text.includes('nguyễn an ninh') ||
    text.includes('bãi sau') ||
    text.includes('bãi trước') ||
    text.includes('bến đình')
  ) {
    return 'vung-tau';
  }

  // 3. TP. Hồ Chí Minh
  if (
    text.includes('tp. thủ đức') ||
    text.includes('thủ đức') ||
    text.includes('hồ chí minh') ||
    text.includes('tp.hcm') ||
    text.includes('bình thạnh') ||
    text.includes('gò vấp') ||
    text.includes('phú nhuận') ||
    text.includes('tân bình') ||
    text.includes('tân phú') ||
    text.includes('bình tân') ||
    text.includes('bình chánh') ||
    text.includes('hóc môn') ||
    text.includes('củ chi') ||
    text.includes('nhà bè') ||
    text.includes('cần giờ') ||
    text.includes('quận 1') ||
    text.includes('quận 3') ||
    text.includes('quận 4') ||
    text.includes('quận 5') ||
    text.includes('quận 6') ||
    text.includes('quận 7') ||
    text.includes('quận 8') ||
    text.includes('quận 10') ||
    text.includes('quận 11') ||
    text.includes('quận 12')
  ) {
    return 'hcm';
  }

  // 4. Cẩm nang & Khuyến mãi chung
  return 'cam-nang';
}

export async function generateMetadata({ searchParams }) {
  const sParams = await searchParams;
  const page = parseInt(sParams?.page || '1', 10);
  const region = sParams?.region || 'all';
  const q = sParams?.q ? String(sParams.q).trim() : '';

  let title = 'Tin Tức & Khuyến Mãi Gas - Ngọc Gas';
  if (region === 'hcm') title = 'Tin Tức & Điểm Giao Gas TP. Hồ Chí Minh - Ngọc Gas';
  else if (region === 'binh-duong') title = 'Tin Tức & Điểm Giao Gas Bình Dương - Ngọc Gas';
  else if (region === 'vung-tau') title = 'Tin Tức & Điểm Giao Gas Vũng Tàu - Ngọc Gas';
  else if (region === 'cam-nang') title = 'Cẩm Nang An Toàn & Khuyến Mãi Gas - Ngọc Gas';

  if (q) title = `Tìm kiếm "${q}" | ` + title;
  if (page > 1) title = `${title} (Trang ${page})`;

  return {
    title,
    description: 'Cập nhật tin tức khuyến mãi, cẩm nang sử dụng gas an toàn và thông tin mạng lưới điểm giao gas chính hãng hỏa tốc 15 phút tại TP.HCM, Bình Dương và Vũng Tàu.',
  };
}

export default async function NewsPage({ searchParams }) {
  const sParams = await searchParams;
  const currentPage = Math.max(1, parseInt(sParams?.page || '1', 10));
  const currentRegion = sParams?.region || 'all';
  const searchQuery = sParams?.q ? String(sParams.q).trim() : '';

  let allLivePosts = [];
  let settings = {};

  try {
    const all = await getAllPosts();
    allLivePosts = all.filter(p => p.is_published == 1);
    settings = await getAllSettings();
  } catch (error) {
    console.error('Error fetching posts or settings:', error);
  }

  // Tính số lượng bài viết theo từng tab khu vực
  const counts = {
    all: allLivePosts.length,
    hcm: 0,
    binhDuong: 0,
    vungTau: 0,
    camNang: 0
  };

  allLivePosts.forEach(post => {
    const reg = getPostRegion(post);
    if (reg === 'hcm') counts.hcm++;
    else if (reg === 'binh-duong') counts.binhDuong++;
    else if (reg === 'vung-tau') counts.vungTau++;
    else counts.camNang++;
  });

  // 1. Lọc theo khu vực
  let filteredPosts = allLivePosts;
  if (currentRegion !== 'all') {
    filteredPosts = filteredPosts.filter(p => getPostRegion(p) === currentRegion);
  }

  // 2. Lọc theo từ khóa tìm kiếm (nếu có)
  if (searchQuery) {
    const lowerQ = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(p => {
      const title = (p.title || '').toLowerCase();
      const excerpt = (p.excerpt || '').toLowerCase();
      const slug = (p.slug || '').toLowerCase();
      return title.includes(lowerQ) || excerpt.includes(lowerQ) || slug.includes(lowerQ);
    });
  }

  // 3. Phân trang 12 bài/trang
  const PAGE_SIZE = 12;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * PAGE_SIZE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);

  // Hàm tạo URL giữ nguyên các query params
  function buildUrl(pageNumber, regionParam = currentRegion, queryParam = searchQuery) {
    const params = new URLSearchParams();
    if (regionParam && regionParam !== 'all') params.set('region', regionParam);
    if (queryParam) params.set('q', queryParam);
    if (pageNumber && pageNumber > 1) params.set('page', String(pageNumber));
    const qs = params.toString();
    return qs ? `/tin-tuc?${qs}` : '/tin-tuc';
  }

  // Thuật toán hiển thị dải số trang thông minh (Smart Pagination Range)
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

  return (
    <>
      <section className="news-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Tin tức</span>
          </div>
          <h1 className="news-hero-title">Tin Tức, Cẩm Nang & Điểm Giao Gas</h1>
          <p className="news-hero-desc">
            Cập nhật mạng lưới trạm giao gas hỏa tốc 15 phút, chương trình khuyến mãi và cẩm nang sử dụng gas an toàn từ {settings.company_name || 'Ngọc Gas'}.
          </p>

          {/* Thanh tìm kiếm & lọc nhanh */}
          <div className="news-filter-toolbar">
            <form action="/tin-tuc" method="GET" className="news-search-form">
              {currentRegion !== 'all' && (
                <input type="hidden" name="region" value={currentRegion} />
              )}
              <div className="search-input-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Tìm theo tên phường, quận huyện, địa danh (vd: Đông Hòa, Sala, Lái Thiêu...)"
                  className="search-input"
                />
                {searchQuery && (
                  <Link href={buildUrl(1, currentRegion, '')} className="search-clear-btn" title="Xóa tìm kiếm">
                    ✕
                  </Link>
                )}
              </div>
              <button type="submit" className="search-submit-btn">
                Tìm kiếm
              </button>
            </form>

            {/* Các Tab Lọc Khu Vực */}
            <div className="region-tabs-scroll">
              <div className="region-tabs">
                <Link
                  href={buildUrl(1, 'all', searchQuery)}
                  className={`region-tab ${currentRegion === 'all' ? 'active' : ''}`}
                >
                  <Newspaper size={16} />
                  <span>Tất cả</span>
                  <span className="tab-badge">{counts.all}</span>
                </Link>

                <Link
                  href={buildUrl(1, 'hcm', searchQuery)}
                  className={`region-tab ${currentRegion === 'hcm' ? 'active' : ''}`}
                >
                  <MapPin size={16} />
                  <span>TP. Hồ Chí Minh</span>
                  <span className="tab-badge">{counts.hcm}</span>
                </Link>

                <Link
                  href={buildUrl(1, 'binh-duong', searchQuery)}
                  className={`region-tab ${currentRegion === 'binh-duong' ? 'active' : ''}`}
                >
                  <MapPin size={16} />
                  <span>Bình Dương</span>
                  <span className="tab-badge">{counts.binhDuong}</span>
                </Link>

                <Link
                  href={buildUrl(1, 'vung-tau', searchQuery)}
                  className={`region-tab ${currentRegion === 'vung-tau' ? 'active' : ''}`}
                >
                  <MapPin size={16} />
                  <span>TP. Vũng Tàu</span>
                  <span className="tab-badge">{counts.vungTau}</span>
                </Link>

                <Link
                  href={buildUrl(1, 'cam-nang', searchQuery)}
                  className={`region-tab ${currentRegion === 'cam-nang' ? 'active' : ''}`}
                >
                  <BookOpen size={16} />
                  <span>Cẩm nang & Ưu đãi</span>
                  <span className="tab-badge">{counts.camNang}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding news-content-section">
        <div className="container">
          {/* Thanh hiển thị trạng thái kết quả */}
          <div className="results-header">
            <div className="results-count">
              {searchQuery ? (
                <span>
                  Tìm thấy <strong>{totalPosts}</strong> bài viết cho từ khóa <em>&ldquo;{searchQuery}&rdquo;</em>
                </span>
              ) : (
                <span>
                  Hiển thị <strong>{paginatedPosts.length}</strong> / <strong>{totalPosts}</strong> bài viết
                  {currentRegion !== 'all' && ` (${currentRegion === 'hcm' ? 'TP. Hồ Chí Minh' : currentRegion === 'binh-duong' ? 'Bình Dương' : currentRegion === 'vung-tau' ? 'TP. Vũng Tàu' : 'Cẩm nang'})`}
                </span>
              )}
            </div>

            {(searchQuery || currentRegion !== 'all') && (
              <Link href="/tin-tuc" className="reset-filter-btn">
                <RotateCcw size={14} />
                <span>Đặt lại bộ lọc</span>
              </Link>
            )}
          </div>

          {/* Danh sách bài viết */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid-3 news-grid">
                {paginatedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Thanh điều hướng phân trang (Pagination Bar) */}
              {totalPages > 1 && (
                <nav className="pagination-wrap" aria-label="Điều hướng trang bài viết">
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

                    {/* Các số trang */}
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
            <div className="empty-state">
              <div className="empty-icon-box">
                <Newspaper size={48} className="empty-icon" />
              </div>
              <h3 className="empty-title">Không tìm thấy bài viết nào phù hợp</h3>
              <p className="empty-desc">
                {searchQuery
                  ? `Không có bài viết nào khớp với từ khóa "${searchQuery}". Quý khách vui lòng thử lại với từ khóa khác.`
                  : 'Hiện tại chưa có bài viết nào trong danh mục được chọn.'}
              </p>
              <Link href="/tin-tuc" className="empty-reset-btn">
                <RotateCcw size={16} />
                <span>Xem tất cả bài viết</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

