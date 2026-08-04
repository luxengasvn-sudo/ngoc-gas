import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.query('SELECT * FROM stores WHERE id = ?', [id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy cửa hàng' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy chi tiết cửa hàng' },
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
    const { name, image_url, address, phone, store_phones, delivery_phones, map_embed, is_active } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { success: false, message: 'Tên, địa chỉ và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `UPDATE stores 
       SET name = ?, 
           image_url = ?, 
           address = ?, 
           phone = ?, 
           store_phones = ?, 
           delivery_phones = ?, 
           map_embed = ?, 
           is_active = ? 
       WHERE id = ?`,
      [
        name,
        image_url || '',
        address,
        phone,
        store_phones || '[]',
        delivery_phones || '[]',
        map_embed || '',
        is_active ? 1 : 0,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy cửa hàng' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cửa hàng thành công'
    });
  } catch (error) {
    console.error('Error updating store:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật cửa hàng' },
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

    const [result] = await db.query('DELETE FROM stores WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy cửa hàng' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa cửa hàng thành công'
    });
  } catch (error) {
    console.error('Error deleting store:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa cửa hàng' },
      { status: 500 }
    );
  }
}
