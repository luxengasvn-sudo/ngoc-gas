import db from '@/lib/db';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fresh database query always

export default async function ProductsPage({ searchParams }) {
  const sParams = await searchParams;
  const selectedCategorySlug = sParams.category || '';
  
  let products = [];
  let categories = [];
  let currentCategoryName = 'Tất cả sản phẩm';

  try {
    // 1. Fetch categories
    const [catRows] = await db.query('SELECT * FROM categories');
    categories = catRows;

    // 2. Fetch products based on category filter
    let query = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = 1
    `;
    const queryParams = [];

    if (selectedCategorySlug) {
      query += ' AND c.slug = ?';
      queryParams.push(selectedCategorySlug);
      
      const categoryObj = categories.find(c => c.slug === selectedCategorySlug);
      if (categoryObj) {
        currentCategoryName = categoryObj.name;
      }
    }

    query += ' ORDER BY p.created_at DESC';

    const [prodRows] = await db.query(query, queryParams);
    products = prodRows;
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <>
      <section className="products-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <span className="current">Sản phẩm</span>
          </div>
          <h1 className="products-hero-title">Sản Phẩm Của Chúng Tôi</h1>
          <p className="products-hero-desc">
            Cung cấp đầy đủ bình gas chính hãng dân dụng, công nghiệp và phụ kiện gas an toàn tại TP. HCM & Bình Dương.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container products-page-container">
          {/* Category Filter Tabs */}
          <div className="category-filter-tabs">
            <Link 
              href="/san-pham" 
              className={`filter-tab ${!selectedCategorySlug ? 'active' : ''}`}
            >
              Tất cả
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

          <h2 className="current-category-title">{currentCategoryName} ({products.length})</h2>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid-3 products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products-found">
              <h3>Không tìm thấy sản phẩm nào</h3>
              <p>Danh mục này hiện tại đang được cập nhật sản phẩm. Quý khách vui lòng quay lại sau.</p>
              <Link href="/san-pham" className="btn btn-outline" style={{ marginTop: '16px' }}>
                Quay lại tất cả sản phẩm
              </Link>
            </div>
          )}
        </div>
      </section>

      
    </>
  );
}
