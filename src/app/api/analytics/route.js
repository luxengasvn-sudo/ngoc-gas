import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Ensure table exists helper
async function ensureAnalyticsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS analytics_clicks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      click_type VARCHAR(50) NOT NULL,
      click_target VARCHAR(255) NOT NULL,
      click_date DATE NOT NULL,
      click_count INT DEFAULT 1,
      UNIQUE KEY uq_click (click_type, click_target, click_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

// GET analytics data - Admin protected
export async function GET(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    await ensureAnalyticsTable();

    // Query 1: Clicks sum by type & target
    const [summaryRows] = await db.query(`
      SELECT click_type, click_target, SUM(click_count) as total_clicks 
      FROM analytics_clicks 
      GROUP BY click_type, click_target 
      ORDER BY total_clicks DESC
    `);

    // Query 2: Daily clicks (last 15 days)
    const [dailyRows] = await db.query(`
      SELECT DATE_FORMAT(click_date, '%Y-%m-%d') as click_date, SUM(click_count) as daily_clicks 
      FROM analytics_clicks 
      GROUP BY click_date 
      ORDER BY click_date DESC 
      LIMIT 15
    `);

    return NextResponse.json({
      success: true,
      summary: summaryRows,
      daily: dailyRows
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy dữ liệu thống kê' },
      { status: 500 }
    );
  }
}

// POST tracking event - Public
export async function POST(request) {
  try {
    await ensureAnalyticsTable();

    const body = await request.json();
    const { click_type, click_target } = body;

    if (!click_type || !click_target) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin sự kiện click' },
        { status: 400 }
      );
    }

    // Get Vietnam date (GMT+7)
    const tzOffset = 7 * 60; // mins
    const localTime = new Date(new Date().getTime() + tzOffset * 60 * 1000);
    const today = localTime.toISOString().slice(0, 10); // YYYY-MM-DD

    await db.query(
      `INSERT INTO analytics_clicks (click_type, click_target, click_date, click_count) 
       VALUES (?, ?, ?, 1) 
       ON DUPLICATE KEY UPDATE click_count = click_count + 1`,
      [click_type, click_target, today]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging click event:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi ghi nhận lượt click' },
      { status: 500 }
    );
  }
}
