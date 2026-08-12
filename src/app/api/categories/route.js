import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

const defaultCategories = [
  { id: 1, name: 'Gas Dân Dụng 12kg', slug: 'gas-dan-dung-12kg', description: 'Các loại bình gas 12kg thương hiệu Sopet, Phoenix, Luxen' },
  { id: 2, name: 'Gas Công Nghiệp 45kg', slug: 'gas-cong-nghiep-45kg', description: 'Bình gas 45kg chuyên dùng cho nhà hàng, khách sạn và bếp ăn KCN' },
  { id: 3, name: 'Bếp & Phụ Kiện Gas', slug: 'bep-phu-kien-gas', description: 'Van ngắt tự động, dây dẫn gas inox và bếp gas chính hãng' }
];

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    const categories = (rows && rows.length > 0) ? rows : defaultCategories;
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: true, data: defaultCategories });
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

    const { name, slug, description } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: 'Tên danh mục và slug là bắt buộc' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
      [name, slug, description || '']
    );

    return NextResponse.json({
      success: true,
      message: 'Tạo danh mục thành công',
      data: { id: result.insertId, name, slug, description }
    });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Slug đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo danh mục' },
      { status: 500 }
    );
  }
}
