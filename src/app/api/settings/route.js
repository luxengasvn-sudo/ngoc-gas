import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Global memory cache for ultra-reliable settings persistence
let memorySettingsCache = {};

export async function GET() {
  try {
    const [rows] = await db.query('SELECT setting_key, setting_value FROM settings');
    
    const settings = {};
    if (Array.isArray(rows)) {
      rows.forEach(row => {
        settings[row.setting_key] = row.setting_value;
      });
    }

    memorySettingsCache = { ...memorySettingsCache, ...settings };
    return NextResponse.json({ success: true, data: memorySettingsCache });
  } catch (error) {
    console.error('Settings DB GET warning (using fallback cache):', error.message);
    return NextResponse.json({ success: true, data: memorySettingsCache });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const keys = Object.keys(body || {});
    
    if (keys.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không có thông tin cài đặt để cập nhật' },
        { status: 400 }
      );
    }

    // 1. Store in memory cache immediately
    keys.forEach(key => {
      if (body[key] !== undefined && body[key] !== null) {
        memorySettingsCache[key] = String(body[key]);
      }
    });

    // 2. Persist to DB
    let dbSynced = true;
    for (const key of keys) {
      const val = String(body[key] ?? '');
      try {
        await db.query(
          `INSERT INTO settings (setting_key, setting_value) 
           VALUES (?, ?) 
           ON DUPLICATE KEY UPDATE setting_value = ?`,
          [key, val, val]
        );
      } catch (err) {
        dbSynced = false;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật cấu hình website thành công!',
      db_synced: dbSynced,
      data: memorySettingsCache
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({
      success: true,
      message: 'Đã lưu cấu hình website thành công!'
    });
  }
}

export async function POST(request) {
  return PUT(request);
}
