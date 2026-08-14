import { requireRole, hashPassword } from '@/lib/auth';
import { getUserById, updateUserData, deleteUserData } from '@/lib/usersHelper';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// PUT /api/auth/users/[id] - Update admin account (admin only)
export async function PUT(request, { params }) {
  try {
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'ID tài khoản không hợp lệ' }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const { display_name, role, is_active, new_password } = body;

    const targetUser = await getUserById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy tài khoản' }, { status: 404 });
    }

    // Protect main admin account from being demoted or locked
    if (targetUser.username === 'admin') {
      if (role && role !== 'admin') {
        return NextResponse.json({ success: false, message: 'Không thể thay đổi vai trò của tài khoản Admin chính' }, { status: 400 });
      }
      if (is_active === 0 || is_active === false) {
        return NextResponse.json({ success: false, message: 'Không thể vô hiệu hóa tài khoản Admin chính' }, { status: 400 });
      }
    }

    const updates = {};

    if (display_name && display_name.trim()) {
      updates.display_name = display_name.trim();
    }

    if (role) {
      const validRoles = ['admin', 'editor', 'sales'];
      if (validRoles.includes(role)) {
        updates.role = role;
      }
    }

    if (is_active !== undefined) {
      updates.is_active = is_active ? 1 : 0;
    }

    if (new_password && new_password.trim()) {
      if (new_password.trim().length < 6) {
        return NextResponse.json({ success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }, { status: 400 });
      }
      updates.password_hash = await hashPassword(new_password.trim());
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, message: 'Không có dữ liệu thay đổi' }, { status: 400 });
    }

    await updateUserData(userId, updates);

    return NextResponse.json({
      success: true,
      message: 'Cập nhật thông tin tài khoản thành công'
    });
  } catch (error) {
    console.error('Error updating admin user:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật tài khoản: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/users/[id] - Delete admin account (admin only)
export async function DELETE(request, { params }) {
  try {
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'ID tài khoản không hợp lệ' }, { status: 400 });
    }

    const targetUser = await getUserById(userId);
    if (!targetUser) {
      return NextResponse.json({ success: false, message: 'Không tìm thấy tài khoản để xóa' }, { status: 404 });
    }

    if (targetUser.username === 'admin') {
      return NextResponse.json({ success: false, message: 'Không thể xóa tài khoản Admin hệ thống' }, { status: 403 });
    }

    if (auth.user.id === userId) {
      return NextResponse.json({ success: false, message: 'Bạn không thể tự xóa tài khoản của chính mình' }, { status: 400 });
    }

    await deleteUserData(userId);

    return NextResponse.json({
      success: true,
      message: `Đã xóa tài khoản "${targetUser.username}" thành công`
    });
  } catch (error) {
    console.error('Error deleting admin user:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa tài khoản: ' + error.message },
      { status: 500 }
    );
  }
}
