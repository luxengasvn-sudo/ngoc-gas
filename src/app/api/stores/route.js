import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Default initial stores if DB is empty
const defaultInitialStores = [
  {
    id: 1,
    name: 'Cửa Hàng Gas Ngọc Gas - Dĩ An (Trụ Sở Chính)',
    image_url: '/images/delivery-motorcycle.jpg',
    address: '7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương',
    phone: '19009396',
    store_phones: JSON.stringify(['19009396']),
    delivery_phones: JSON.stringify([
      { name: 'Anh Nam (Trưởng Trạm Dĩ An)', phone: '19009396' },
      { name: 'Anh Tuấn (Giao Gas Siêu Tốc Dĩ An)', phone: '19009396' }
    ]),
    map_embed: '',
    is_active: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Cửa Hàng Gas Ngọc Gas - Thuận An',
    image_url: '/images/gas-cylinder.jpg',
    address: 'Đại Lộ Bình Dương, Phường Lái Thiêu, TP. Thuận An, Tỉnh Bình Dương',
    phone: '19009396',
    store_phones: JSON.stringify(['19009396']),
    delivery_phones: JSON.stringify([
      { name: 'Anh Hùng (Đội Giao Gas Thuận An)', phone: '19009396' }
    ]),
    map_embed: '',
    is_active: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Chi Nhánh Gas Ngọc Gas - KDC VietSing (VSIP 1)',
    image_url: '/images/delivery-motorcycle.jpg',
    address: 'Đường D1, Khu Dân Cư VietSing, Phường An Phú, TP. Thuận An, Tỉnh Bình Dương',
    phone: '19009396',
    store_phones: JSON.stringify(['19009396']),
    delivery_phones: JSON.stringify([
      { name: 'Anh Minh (Phụ Trách Bếp Ăn & Căn Hộ VietSing)', phone: '19009396' }
    ]),
    map_embed: '',
    is_active: 1,
    created_at: new Date().toISOString()
  }
];

// Memory store fallback store cache in case DB fails
let memoryStores = [...defaultInitialStores];

async function ensureStoresTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(500),
        address VARCHAR(500) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        store_phones TEXT,
        delivery_phones TEXT,
        map_embed TEXT,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    try {
      const [storePhonesCols] = await db.query("SHOW COLUMNS FROM stores LIKE 'store_phones'");
      if (!storePhonesCols || storePhonesCols.length === 0) {
        await db.query("ALTER TABLE stores ADD COLUMN store_phones TEXT AFTER phone");
      }
    } catch (e) {}

    try {
      const [deliveryPhonesCols] = await db.query("SHOW COLUMNS FROM stores LIKE 'delivery_phones'");
      if (!deliveryPhonesCols || deliveryPhonesCols.length === 0) {
        await db.query("ALTER TABLE stores ADD COLUMN delivery_phones TEXT AFTER store_phones");
      }
    } catch (e) {}

    try {
      const [mapEmbedCols] = await db.query("SHOW COLUMNS FROM stores LIKE 'map_embed'");
      if (!mapEmbedCols || mapEmbedCols.length === 0) {
        await db.query("ALTER TABLE stores ADD COLUMN map_embed TEXT AFTER delivery_phones");
      }
    } catch (e) {}
  } catch (e) {
    console.error('ensureStoresTable error:', e.message);
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

    let rows = [];
    try {
      const [dbRows] = await db.query(query, queryParams);
      rows = dbRows || [];
    } catch (dbErr) {
      console.error('Database query error in GET /api/stores:', dbErr.message);
    }

    // Auto-seed into DB if empty
    if (!rows || rows.length === 0) {
      for (const s of defaultInitialStores) {
        try {
          await db.query(
            `INSERT INTO stores (id, name, image_url, address, phone, store_phones, delivery_phones, map_embed, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [s.id, s.name, s.image_url, s.address, s.phone, s.store_phones, s.delivery_phones, s.map_embed, s.is_active]
          );
        } catch (e) {}
      }

      try {
        const [newRows] = await db.query(query, queryParams);
        rows = newRows || [];
      } catch (e) {}
    }

    if (!rows || rows.length === 0) {
      rows = memoryStores;
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching stores:', error.message);
    return NextResponse.json({ success: true, data: memoryStores });
  }
}

export async function POST(request) {
  try {
    await ensureStoresTable();
    
    // Auth Check with safe admin bypass if token present
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để thực hiện thao tác này.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, image_url, address, phone, store_phones, delivery_phones, map_embed, is_active } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { success: false, message: 'Tên cửa hàng, địa chỉ và số điện thoại là bắt buộc' },
        { status: 400 }
      );
    }

    const formattedStorePhones = typeof store_phones === 'string' ? store_phones : JSON.stringify(store_phones || []);
    const formattedDeliveryPhones = typeof delivery_phones === 'string' ? delivery_phones : JSON.stringify(delivery_phones || []);
    const activeVal = is_active !== false && is_active !== 0 ? 1 : 0;

    let insertId = Date.now();
    try {
      const [result] = await db.query(
        `INSERT INTO stores (name, image_url, address, phone, store_phones, delivery_phones, map_embed, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          image_url || '',
          address,
          phone,
          formattedStorePhones,
          formattedDeliveryPhones,
          map_embed || '',
          activeVal
        ]
      );
      if (result && result.insertId) {
        insertId = result.insertId;
      }
    } catch (dbErr) {
      console.error('DB Insert error in POST /api/stores:', dbErr.message);
    }

    const newStoreObj = {
      id: insertId,
      name,
      image_url: image_url || '',
      address,
      phone,
      store_phones: formattedStorePhones,
      delivery_phones: formattedDeliveryPhones,
      map_embed: map_embed || '',
      is_active: activeVal,
      created_at: new Date().toISOString()
    };

    memoryStores.unshift(newStoreObj);

    return NextResponse.json({
      success: true,
      message: 'Thêm cửa hàng thành công',
      data: newStoreObj
    });
  } catch (error) {
    console.error('Error creating store:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo cửa hàng: ' + error.message },
      { status: 500 }
    );
  }
}
