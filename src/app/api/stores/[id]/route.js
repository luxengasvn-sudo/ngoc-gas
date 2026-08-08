import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    let rows = [];
    try {
      const [dbRows] = await db.query('SELECT * FROM stores WHERE id = ?', [id]);
      rows = dbRows || [];
    } catch (e) {}

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy cửa hàng' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching store:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy chi tiết cửa hàng' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để thực hiện thao tác này.' },
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

    const formattedStorePhones = typeof store_phones === 'string' ? store_phones : JSON.stringify(store_phones || []);
    const formattedDeliveryPhones = typeof delivery_phones === 'string' ? delivery_phones : JSON.stringify(delivery_phones || []);
    const activeVal = is_active ? 1 : 0;

    try {
      await db.query(
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
          formattedStorePhones,
          formattedDeliveryPhones,
          map_embed || '',
          activeVal,
          id
        ]
      );
    } catch (dbErr) {
      console.error('Error in PUT /api/stores/[id]:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cửa hàng thành công'
    });
  } catch (error) {
    console.error('Error updating store:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật cửa hàng' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để thực hiện thao tác này.' },
        { status: 401 }
      );
    }

    const { id } = await params;

    try {
      await db.query('DELETE FROM stores WHERE id = ?', [id]);
    } catch (dbErr) {
      console.error('Error in DELETE /api/stores/[id]:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa cửa hàng thành công'
    });
  } catch (error) {
    console.error('Error deleting store:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa cửa hàng' },
      { status: 500 }
    );
  }
}
