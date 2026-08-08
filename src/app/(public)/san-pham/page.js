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
    products = prodRows || [];
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  // Fallback products if DB is empty or syncing
  if (!products || products.length === 0) {
    const allFallback = [
      { id: 1, name: 'Bình Gas Sopet 12kg (Xám)', slug: 'binh-gas-sopet-12kg-xam', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', price: 420000, sale_price: 395000, image_url: '/images/sopet-xam.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 2, name: 'Bình Gas Sopet 12kg (Xanh Đen)', slug: 'binh-gas-sopet-12kg-xanh-den', short_description: 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', price: 425000, sale_price: 400000, image_url: '/images/sopet-xanh-den.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 3, name: 'Bình Gas Sopet 12kg (Xanh)', slug: 'binh-gas-sopet-12kg-xanh', short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', price: 420000, sale_price: 395000, image_url: '/images/sopet-xanh.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 4, name: 'Bình Gas Sopet 12kg (Đỏ)', slug: 'binh-gas-sopet-12kg-do', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', price: 430000, sale_price: 405000, image_url: '/images/sopet.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 5, name: 'Bình Gas Phoenix Gas 12kg (Xám)', slug: 'binh-gas-phoenix-gas-12kg-xam', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', price: 410000, sale_price: 385000, image_url: '/images/phoenix-xam.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 6, name: 'Bình Gas Phoenix Gas 12kg (Xanh)', slug: 'binh-gas-phoenix-gas-12kg-xanh', short_description: 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', price: 415000, sale_price: 390000, image_url: '/images/phoenix-lg-xanh.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 7, name: 'Bình Gas Phoenix Gas 12kg (Đỏ)', slug: 'binh-gas-phoenix-gas-12kg-do', short_description: 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', price: 420000, sale_price: 395000, image_url: '/images/phoenix-do.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 8, name: 'Bình Gas Luxen Gas 12kg', slug: 'binh-gas-luxen-gas-12kg', short_description: 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', price: 420000, sale_price: 395000, image_url: '/images/luxen-gas.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 9, name: 'Bình Gas Luxen Gas 12kg (Xám)', slug: 'binh-gas-luxen-gas-12kg-xam', short_description: 'Dịch vụ giao gas nhanh tại Dĩ An & VietSing. Bình gas Luxen Gas 12kg vỏ xám tiêu chuẩn, an toàn PCCC.', price: 415000, sale_price: 390000, image_url: '/images/luxen-gas.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 10, name: 'Bình Gas Luxen Gas 45kg (Công Nghiệp)', slug: 'binh-gas-luxen-gas-45kg-cong-nghiep', short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', price: 1550000, sale_price: 1450000, image_url: '/images/luxen-45.png', category_id: 1, is_featured: 1, is_active: 1 },
      { id: 11, name: 'Bình Gas Luxen Gas 45kg (Xám)', slug: 'binh-gas-luxen-gas-45kg-xam', short_description: 'Dịch vụ giao gas nhanh tại KCN VSIP 1, Dĩ An & Thuận An. Bình gas công nghiệp Luxen 45kg màu xám tiêu chuẩn.', price: 1540000, sale_price: 1440000, image_url: '/images/luxen-45.png', category_id: 1, is_featured: 1, is_active: 1 }
    ];
    products = allFallback;
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
