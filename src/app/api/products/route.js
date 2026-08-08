import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');

    let query = `
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const queryParams = [];

    if (categoryId) {
      query += ' AND p.category_id = ?';
      queryParams.push(categoryId);
    }
    if (featured === 'true' || featured === '1') {
      query += ' AND p.is_featured = 1';
    } else if (featured === 'false' || featured === '0') {
      query += ' AND p.is_featured = 0';
    }
    if (active === 'true' || active === '1') {
      query += ' AND p.is_active = 1';
    } else if (active === 'false' || active === '0') {
      query += ' AND p.is_active = 0';
    }

    query += ' ORDER BY p.created_at DESC';

    let [rows] = await db.query(query, queryParams);

    // Auto-seed into DB & fallback sync if products table in DB is empty
    if (!rows || rows.length === 0) {
      const defaultProducts = [
        ['Bình Gas Sopet 12kg (Xám)', 'binh-gas-sopet-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 420000, 395000, '/images/sopet-xam.png', 1, 1],
        ['Bình Gas Sopet 12kg (Xanh Đen)', 'binh-gas-sopet-12kg-xanh-den', 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 425000, 400000, '/images/sopet-xanh-den.png', 1, 1],
        ['Bình Gas Sopet 12kg (Xanh)', 'binh-gas-sopet-12kg-xanh', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', 420000, 395000, '/images/sopet-xanh.png', 1, 1],
        ['Bình Gas Sopet 12kg (Đỏ)', 'binh-gas-sopet-12kg-do', 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 430000, 405000, '/images/sopet.png', 1, 1],
        ['Bình Gas Phoenix Gas 12kg (Xám)', 'binh-gas-phoenix-gas-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', 410000, 385000, '/images/phoenix-xam.png', 1, 1],
        ['Bình Gas Phoenix Gas 12kg (Xanh)', 'binh-gas-phoenix-gas-12kg-xanh', 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', 415000, 390000, '/images/phoenix-lg-xanh.png', 1, 1],
        ['Bình Gas Phoenix Gas 12kg (Đỏ)', 'binh-gas-phoenix-gas-12kg-do', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', 420000, 395000, '/images/phoenix-do.png', 1, 1],
        ['Bình Gas Luxen Gas 12kg', 'binh-gas-luxen-gas-12kg', 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', 420000, 395000, '/images/luxen-gas.png', 1, 1],
        ['Bình Gas Luxen Gas 12kg (Xám)', 'binh-gas-luxen-gas-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An & VietSing. Bình gas Luxen Gas 12kg vỏ xám tiêu chuẩn, an toàn PCCC.', 415000, 390000, '/images/luxen-gas.png', 1, 1],
        ['Bình Gas Luxen Gas 45kg (Công Nghiệp)', 'binh-gas-luxen-gas-45kg-cong-nghiep', 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', 1550000, 1450000, '/images/luxen-45.png', 1, 1]
      ];

      for (const p of defaultProducts) {
        try {
          await db.query(
            `INSERT INTO products (name, slug, short_description, price, sale_price, image_url, category_id, is_featured, is_active) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1) ON DUPLICATE KEY UPDATE name=VALUES(name)`,
            p
          );
        } catch (e) {
          console.error('Error auto-seeding product in GET route:', e.message);
        }
      }

      const [refetched] = await db.query(query, queryParams);
      if (refetched && refetched.length > 0) {
        rows = refetched;
      } else {
        rows = defaultProducts.map((p, idx) => ({
          id: idx + 1,
          name: p[0],
          slug: p[1],
          short_description: p[2],
          price: p[3],
          sale_price: p[4],
          image_url: p[5],
          category_id: p[6],
          is_featured: p[7],
          is_active: 1,
          category_name: 'Gas Dân Dụng & Công Nghiệp'
        }));
      }
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách sản phẩm' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      name, 
      slug, 
      short_description, 
      description, 
      price, 
      sale_price, 
      image_url, 
      images, 
      category_id, 
      is_featured, 
      is_active 
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: 'Tên sản phẩm và slug là bắt buộc' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `INSERT INTO products (name, slug, short_description, description, price, sale_price, image_url, images, category_id, is_featured, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        slug, 
        short_description || '',
        description || '', 
        price || null, 
        sale_price || null,
        image_url || '', 
        images || '[]',
        category_id || null, 
        is_featured ? 1 : 0, 
        is_active !== false ? 1 : 0
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      data: { id: result.insertId, name, slug }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Slug đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo sản phẩm' },
      { status: 500 }
    );
  }
}
