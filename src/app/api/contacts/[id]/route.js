import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

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
    const { is_read } = await request.json();

    const [result] = await db.query(
      'UPDATE contacts SET is_read = ? WHERE id = ?',
      [is_read ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy liên hệ' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật trạng thái liên hệ thành công'
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật trạng thái liên hệ' },
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

    const [result] = await db.query('DELETE FROM contacts WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy liên hệ' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa liên hệ thành công'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa liên hệ' },
      { status: 500 }
    );
  }
}
