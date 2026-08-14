import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getAllStores, createStoreData } from '@/lib/storesHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active');

    let stores = await getAllStores();

    if (activeOnly === 'true' || activeOnly === '1') {
      stores = stores.filter(s => s.is_active == 1);
    }

    return NextResponse.json({
      success: true,
      data: stores
    });
  } catch (error) {
    console.error('Error fetching stores:', error.message);
    const fallback = await getAllStores();
    return NextResponse.json({
      success: true,
      data: fallback
    });
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
    const { name, address, phone } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { success: false, message: 'Tên cửa hàng, địa chỉ và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const newStore = await createStoreData(body);

    return NextResponse.json({
      success: true,
      message: 'Tạo cửa hàng thành công',
      data: newStore
    });
  } catch (error) {
    console.error('Error creating store:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo cửa hàng: ' + error.message },
      { status: 500 }
    );
  }
}
