import { NextResponse } from 'next/server';
import { getStoreById, updateStoreData, deleteStoreData } from '@/lib/storesHelper';
import { requireRole } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const store = await getStoreById(id);

    if (!store) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy cửa hàng' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: store });
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
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, address, phone } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { success: false, message: 'Tên, địa chỉ và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const updatedStore = await updateStoreData(id, body);

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cửa hàng thành công',
      data: updatedStore
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
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    await deleteStoreData(id);

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
