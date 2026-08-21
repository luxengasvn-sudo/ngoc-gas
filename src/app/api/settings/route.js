import { requireRole } from '@/lib/auth';
import { getAllSettings, updateAllSettings, getSettingsSnapshots, restoreSettingsSnapshot } from '@/lib/settingsHelper';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('snapshots') === '1') {
      const snapshots = getSettingsSnapshots();
      return NextResponse.json({ success: true, data: snapshots });
    }

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
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const body = await request.json();

    // Check for snapshot rollback action
    if (body && body.action === 'restore_snapshot' && body.filename) {
      const result = await restoreSettingsSnapshot(body.filename);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

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

