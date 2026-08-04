import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách liên hệ' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Họ tên và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)',
      [name, phone, email || '', message || '']
    );

    return NextResponse.json({
      success: true,
      message: 'Gửi liên hệ thành công',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi gửi liên hệ' },
      { status: 500 }
    );
  }
}
