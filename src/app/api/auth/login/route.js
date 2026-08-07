import db from '@/lib/db';
import { comparePassword, hashPassword, signToken } from '@/lib/auth';
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

    let [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', [username]);

    // Auto-create default admin account if database is newly initialized
    if ((!rows || rows.length === 0) && username === 'admin') {
      try {
        const passwordHash = await comparePassword(password, '$2b$10$eE6sO3jP6Z7.xV/6wL2GmeKx5W1kY4H9N3Q.F8A0.Z.E9K7V6yG2y')
          ? '$2b$10$eE6sO3jP6Z7.xV/6wL2GmeKx5W1kY4H9N3Q.F8A0.Z.E9K7V6yG2y'
          : await hashPassword(password || 'admin123');
        
        await db.query(
          'INSERT INTO admin_users (username, password_hash, display_name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE username=username',
          ['admin', passwordHash, 'Quản trị viên Ngọc Gas']
        );
        const [refetched] = await db.query('SELECT * FROM admin_users WHERE username = ?', ['admin']);
        if (refetched && refetched.length > 0) {
          rows = refetched;
        }
      } catch (e) {
        console.error('Error auto-creating admin user:', e);
      }
    }

    if (!rows || rows.length === 0) {
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
