import { getAuthenticatedUser } from '@/lib/auth';
import { getUserById } from '@/lib/usersHelper';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/auth/me - Xác thực phiên làm việc thời gian thực với CSDL
export async function GET(request) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser || !authUser.id) {
      return NextResponse.json(
        { success: false, message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' },
        { status: 401 }
      );
    }

    // Truy vấn trực tiếp CSDL để kiểm tra tài khoản còn tồn tại và còn hoạt động không
    const dbUser = await getUserById(authUser.id);
    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản người dùng không còn tồn tại trong hệ thống.' },
        { status: 401 }
      );
    }

    if (dbUser.is_active === 0 || dbUser.is_active === false) {
      return NextResponse.json(
        { success: false, message: 'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ Quản trị viên.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: dbUser.id,
        username: dbUser.username,
        display_name: dbUser.display_name,
        role: dbUser.role || 'editor'
      }
    });
  } catch (error) {
    console.error('Error in /api/auth/me:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi xác thực phiên làm việc.' },
      { status: 500 }
    );
  }
}
