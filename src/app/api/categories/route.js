import db from '@/lib/db.js';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getAllCategories, saveCategoriesToFile, readCategoriesFromFile } from '@/lib/categoriesHelper';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: true, data: readCategoriesFromFile() });
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
