import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [rows] = await db.query('SELECT setting_key, setting_value FROM settings');
    
    // Transform list to object key-value
    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });

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
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // We expect a key-value dictionary in body
    // e.g. { company_name: "...", phone: "..." }
    const keys = Object.keys(body);
    
    if (keys.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không có thông tin cài đặt để cập nhật' },
        { status: 400 }
      );
    }

    // Run updates in parallel or loop
    for (const key of keys) {
      const val = body[key];
      await db.query(
        `INSERT INTO settings (setting_key, setting_value) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [key, String(val), String(val)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cài đặt thành công'
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật cài đặt' },
      { status: 500 }
    );
  }
}
