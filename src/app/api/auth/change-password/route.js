import { getAuthenticatedUser, comparePassword, hashPassword } from '@/lib/auth';
import { getUserById, updateUserData } from '@/lib/usersHelper';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// POST /api/auth/change-password - Change current user's password
export async function POST(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để đổi mật khẩu' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const current_password = String(body.current_password || '').trim();
    const new_password = String(body.new_password || '').trim();

    if (!current_password || !new_password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới' },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    const currentUser = await getUserById(user.id);
    if (!currentUser) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy tài khoản người dùng' }, { status: 404 });
    }

    const isMatch = await comparePassword(current_password, currentUser.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu hiện tại không chính xác' },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(new_password);
    await updateUserData(user.id, { password_hash: newHash });

    return NextResponse.json({
      success: true,
      message: 'Đổi mật khẩu thành công!'
    });
  } catch (error) {
    console.error('Change password error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi đổi mật khẩu: ' + error.message },
      { status: 500 }
    );
  }
}
