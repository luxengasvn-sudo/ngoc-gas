import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/productsHelper';
import { getAllCategories } from '@/lib/categoriesHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export async function generateMetadata() {
  return {
    title: 'Sản Phẩm Bình Gas Chính Hãng - Ngọc Gas',
    description: 'Danh sách sản phẩm bình gas dân dụng, gas công nghiệp và phụ kiện gas chính hãng Sopet, Phoenix, Luxen tại Ngọc Gas.',
  };
}

export default async function ProductsPage({ searchParams }) {
  const sParams = await searchParams;
  const selectedCategorySlug = sParams?.category || '';
  
  let products = [];
  let categories = [];
  let currentCategoryName = 'Tất cả sản phẩm';

  try {
    categories = await getAllCategories();
  } catch (e) {
    categories = [];
  }

  try {
    const all = await getAllProducts();
    let filtered = all.filter(p => p.is_active === undefined || p.is_active === 1 || p.is_active === true || p.is_active === '1');

    if (selectedCategorySlug) {
      const categoryObj = categories.find(c => c.slug === selectedCategorySlug);
      if (categoryObj) {
        currentCategoryName = categoryObj.name;
        filtered = filtered.filter(p => 
          String(p.category_id) === String(categoryObj.id) || 
          p.category_slug === selectedCategorySlug ||
          (p.category_name && categoryObj.name && p.category_name.toLowerCase().trim() === categoryObj.name.toLowerCase().trim())
        );
      }
    }

    products = filtered;
  } catch (error) {
    console.error('Error fetching products page data:', error);
  }

  return (
    <>
      <section className="products-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Sản phẩm</span>
          </div>
          <h1 className="products-hero-title">Sản Phẩm Của Chúng Tôi</h1>
          <p className="products-hero-desc">
            Cung cấp đầy đủ bình gas chính hãng dân dụng, công nghiệp và phụ kiện gas an toàn tại TP. HCM & Bình Dương.
          </p>
        </div>
      </section>

      <section className="products-content-section">
        <div className="container products-page-container">
          {/* Category Filter Tabs */}
          {categories.length > 0 && (
            <div className="category-filter-tabs">
              <Link 
                href="/san-pham" 
                className={`filter-tab ${!selectedCategorySlug ? 'active' : ''}`}
              >
                Tất cả ({products.length})
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/san-pham?category=${cat.slug}`}
                  className={`filter-tab ${selectedCategorySlug === cat.slug ? 'active' : ''}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Current Category Title & Count */}
          <div className="products-grid-header">
            <div>
              <h2 className="current-cat-title">{currentCategoryName}</h2>
              <p className="current-cat-subtitle">Giao gas nhanh 15 phút • Đủ ký • Kiểm tra an toàn miễn phí</p>
            </div>
            <span className="products-count-badge">{products.length} sản phẩm</span>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="products-page-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="products-empty-state">
              <div className="empty-icon">📦</div>
              <h3>Hiện chưa có sản phẩm nào trong danh mục này</h3>
              <p>Vui lòng chọn danh mục khác hoặc quay lại danh sách tất cả sản phẩm.</p>
              <Link href="/san-pham" className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
                Xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

