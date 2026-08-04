import db from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu' },
        { status: 400 }
      );
    }

    const [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    const admin = rows[0];
    const passwordMatch = await comparePassword(password, admin.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    const token = signToken({ id: admin.id, username: admin.username, name: admin.display_name });

    return NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        username: admin.username,
        display_name: admin.display_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi hệ thống khi đăng nhập' },
      { status: 500 }
    );
  }
}
