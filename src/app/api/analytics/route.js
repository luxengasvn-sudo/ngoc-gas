import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getAnalyticsData, recordClick } from '@/lib/analyticsHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET analytics data - Admin protected
export async function GET(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const { summary, daily } = await getAnalyticsData();

    return NextResponse.json({
      success: true,
      summary,
      daily
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy dữ liệu thống kê' },
      { status: 500 }
    );
  }
}

// POST tracking event - Public
export async function POST(request) {
  try {
    const body = await request.json();
    const { click_type, click_target } = body;

    if (!click_type || !click_target) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin sự kiện click' },
        { status: 400 }
      );
    }

    await recordClick(click_type, click_target);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging click event:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi ghi nhận lượt click' },
      { status: 500 }
    );
  }
}
