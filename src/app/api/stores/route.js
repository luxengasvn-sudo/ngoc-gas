import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Ensure table exists helper with migration check
async function ensureStoresTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS stores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image_url VARCHAR(500),
      address VARCHAR(500) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Add store_phones column if not exists
  const [storePhonesCols] = await db.query("SHOW COLUMNS FROM stores LIKE 'store_phones'");
  if (storePhonesCols.length === 0) {
    await db.query("ALTER TABLE stores ADD COLUMN store_phones TEXT AFTER phone");
  }

  // Add delivery_phones column if not exists
  const [deliveryPhonesCols] = await db.query("SHOW COLUMNS FROM stores LIKE 'delivery_phones'");
  if (deliveryPhonesCols.length === 0) {
    await db.query("ALTER TABLE stores ADD COLUMN delivery_phones TEXT AFTER store_phones");
  }

  // Add map_embed column if not exists
  const [mapEmbedCols] = await db.query("SHOW COLUMNS FROM stores LIKE 'map_embed'");
  if (mapEmbedCols.length === 0) {
    await db.query("ALTER TABLE stores ADD COLUMN map_embed TEXT AFTER delivery_phones");
  }
}

export async function GET(request) {
  try {
    await ensureStoresTable();
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    let query = 'SELECT * FROM stores WHERE 1=1';
    const queryParams = [];

    if (active === 'true' || active === '1') {
      query += ' AND is_active = 1';
    } else if (active === 'false' || active === '0') {
      query += ' AND is_active = 0';
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.query(query, queryParams);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách cửa hàng' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ensureStoresTable();
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, image_url, address, phone, store_phones, delivery_phones, map_embed, is_active } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { success: false, message: 'Tên, địa chỉ và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `INSERT INTO stores (name, image_url, address, phone, store_phones, delivery_phones, map_embed, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        image_url || '',
        address,
        phone,
        store_phones || '[]',
        delivery_phones || '[]',
        map_embed || '',
        is_active !== false ? 1 : 0
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Thêm cửa hàng thành công',
      data: { id: result.insertId, name }
    });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo cửa hàng' },
      { status: 500 }
    );
  }
}
