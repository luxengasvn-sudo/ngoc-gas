import { requireRole, hashPassword } from '@/lib/auth';
import { getAllUsers, createUserData } from '@/lib/usersHelper';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/auth/users - List all admin accounts (admin only)
export async function GET(request) {
  try {
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const users = await getAllUsers();
    // Return sanitized users without password_hash
    const sanitized = users.map(u => ({
      id: u.id,
      username: u.username,
      display_name: u.display_name,
      role: u.role || 'editor',
      is_active: u.is_active !== undefined ? (u.is_active ? 1 : 0) : 1,
      created_at: u.created_at
    }));

    return NextResponse.json({
      success: true,
      data: sanitized
    });
  } catch (error) {
    console.error('Error fetching admin users:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách tài khoản: ' + error.message },
      { status: 500 }
    );
  }
}

// POST /api/auth/users - Create new admin account (admin only)
export async function POST(request) {
  try {
    const auth = requireRole(request, ['admin']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const body = await request.json().catch(() => ({}));
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '').trim();
    const display_name = String(body.display_name || '').trim();
    const role = String(body.role || 'editor').trim().toLowerCase();

    if (!username || !password || !display_name) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập, mật khẩu và tên hiển thị là bắt buộc' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    const validRoles = ['admin', 'editor', 'sales'];
    const finalRole = validRoles.includes(role) ? role : 'editor';

    // Check if username already exists
    const users = await getAllUsers();
    if (users.some(u => u.username.toLowerCase() === username)) {
      return NextResponse.json(
        { success: false, message: `Tên đăng nhập "${username}" đã tồn tại. Vui lòng chọn tên khác.` },
        { status: 409 }
      );
    }

    const password_hash = await hashPassword(password);

    const newUser = await createUserData({
      username,
      password_hash,
      display_name,
      role: finalRole,
      is_active: 1
    });

    return NextResponse.json({
      success: true,
      message: 'Tạo tài khoản người dùng mới thành công',
      data: {
        id: newUser.id,
        username: newUser.username,
        display_name: newUser.display_name,
        role: newUser.role,
        is_active: newUser.is_active
      }
    });
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo tài khoản: ' + error.message },
      { status: 500 }
    );
  }
}
