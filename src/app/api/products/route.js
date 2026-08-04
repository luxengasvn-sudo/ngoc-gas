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

    const [rows] = await db.query(query, queryParams);
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
