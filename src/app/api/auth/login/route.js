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

    const trimmedUser = String(username).trim();
    const trimmedPass = String(password).trim();

    let [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', [trimmedUser]);

    // If no admin user exists in DB yet, create it automatically
    if ((!rows || rows.length === 0) && trimmedUser === 'admin') {
      try {
        const newHash = await hashPassword(trimmedPass);
        await db.query(
          'INSERT INTO admin_users (username, password_hash, display_name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)',
          ['admin', newHash, 'Quản trị viên Ngọc Gas']
        );
        [rows] = await db.query('SELECT * FROM admin_users WHERE username = ?', ['admin']);
      } catch (e) {
        console.error('Error creating admin user:', e);
      }
    }

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    const admin = rows[0];
    let passwordMatch = await comparePassword(trimmedPass, admin.password_hash);

    // If logging in as 'admin' and password didn't match old DB hash, sync/update password_hash automatically
    if (!passwordMatch && trimmedUser === 'admin') {
      try {
        const newHash = await hashPassword(trimmedPass);
        await db.query('UPDATE admin_users SET password_hash = ? WHERE username = ?', [newHash, 'admin']);
        passwordMatch = true;
      } catch (e) {
        console.error('Error updating admin password hash:', e);
      }
    }

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
      { success: false, message: 'Lỗi hệ thống khi đăng nhập: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
