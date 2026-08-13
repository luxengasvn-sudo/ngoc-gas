import { getAllSettings, updateAllSettings } from '@/lib/settingsHelper';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getAllSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy cài đặt' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập admin.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const keys = Object.keys(body || {});
    
    if (keys.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không có thông tin cài đặt để cập nhật' },
        { status: 400 }
      );
    }

    const updated = await updateAllSettings(body);

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cấu hình website thành công!',
      data: updated
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật cài đặt' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  return PUT(request);
}
