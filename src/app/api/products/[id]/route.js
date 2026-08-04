import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.query(
      `SELECT p.*, c.name AS category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy chi tiết sản phẩm' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const { id } = await params;
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
      `UPDATE products 
       SET name = ?, 
           slug = ?, 
           short_description = ?, 
           description = ?, 
           price = ?, 
           sale_price = ?, 
           image_url = ?, 
           images = ?, 
           category_id = ?, 
           is_featured = ?, 
           is_active = ? 
       WHERE id = ?`,
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
        is_active ? 1 : 0, 
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật sản phẩm thành công'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Slug đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật sản phẩm' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa sản phẩm thành công'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa sản phẩm' },
      { status: 500 }
    );
  }
}
