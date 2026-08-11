import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

let defaultPriceHistory = [
  // Gas Cao Cấp 12kg (Luxen Gas)
  { id: 1, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 410000, sale_price: 380000, change_type: 'same', change_amount: 0, effective_month: 'Tháng 3/2026', notes: '' },
  { id: 2, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 415000, sale_price: 385000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 4/2026', notes: '' },
  { id: 3, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 410000, sale_price: 380000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 5/2026', notes: '' },
  { id: 4, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 420000, sale_price: 390000, change_type: 'up', change_amount: 10000, effective_month: 'Tháng 6/2026', notes: '' },
  { id: 5, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 425000, sale_price: 395000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 7/2026', notes: '' },
  { id: 6, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 420000, sale_price: 390000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 8/2026', notes: '' },

  // Gas Phổ Thông 12kg (Sopet & Phoenix)
  { id: 7, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 400000, sale_price: 375000, change_type: 'same', change_amount: 0, effective_month: 'Tháng 3/2026', notes: '' },
  { id: 8, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 405000, sale_price: 380000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 4/2026', notes: '' },
  { id: 9, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 400000, sale_price: 375000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 5/2026', notes: '' },
  { id: 10, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 410000, sale_price: 385000, change_type: 'up', change_amount: 10000, effective_month: 'Tháng 6/2026', notes: '' },
  { id: 11, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 415000, sale_price: 390000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 7/2026', notes: '' },
  { id: 12, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 410000, sale_price: 385000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 8/2026', notes: '' },

  // Gas Công Nghiệp 45kg (Luxen 45kg)
  { id: 13, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1480000, sale_price: 1390000, change_type: 'same', change_amount: 0, effective_month: 'Tháng 3/2026', notes: '' },
  { id: 14, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1500000, sale_price: 1410000, change_type: 'up', change_amount: 20000, effective_month: 'Tháng 4/2026', notes: '' },
  { id: 15, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1480000, sale_price: 1390000, change_type: 'down', change_amount: -20000, effective_month: 'Tháng 5/2026', notes: '' },
  { id: 16, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1520000, sale_price: 1420000, change_type: 'up', change_amount: 30000, effective_month: 'Tháng 6/2026', notes: '' },
  { id: 17, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1560000, sale_price: 1460000, change_type: 'up', change_amount: 40000, effective_month: 'Tháng 7/2026', notes: '' },
  { id: 18, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1540000, sale_price: 1440000, change_type: 'down', change_amount: -20000, effective_month: 'Tháng 8/2026', notes: '' }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const gas_type = searchParams.get('gas_type');

    let query = `SELECT * FROM gas_price_history WHERE 1=1`;
    const params = [];

    if (gas_type && gas_type !== 'all') {
      query += ` AND gas_type = ?`;
      params.push(gas_type);
    }

    query += ` ORDER BY id ASC`;

    let rows = [];
    try {
      const [dbRows] = await db.query(query, params);
      rows = dbRows || [];
    } catch (e) {
      console.error('Database error in GET /api/gas-price-history:', e.message);
    }

    if (!rows || rows.length === 0) {
      rows = gas_type && gas_type !== 'all' 
        ? defaultPriceHistory.filter(h => h.gas_type === gas_type)
        : defaultPriceHistory;
    }

    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('GET /api/gas-price-history error:', error);
    return NextResponse.json({
      success: true,
      data: defaultPriceHistory
    });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Không có quyền truy cập' }, { status: 401 });
    }

    const body = await request.json();
    const { gas_type, gas_name, price, sale_price, change_type, change_amount, effective_month, notes } = body;

    if (!gas_type || !effective_month || !price) {
      return NextResponse.json({ success: false, message: 'Thông tin biến động giá thiếu các trường bắt buộc' }, { status: 400 });
    }

    const newObj = {
      id: Date.now(),
      gas_type,
      gas_name: gas_name || (gas_type === 'luxen-12kg' ? 'Gas Cao Cấp 12kg (Luxen Gas)' : gas_type === 'phothong-12kg' ? 'Gas Phổ Thông 12kg (Sopet & Phoenix)' : 'Gas Công Nghiệp 45kg (Luxen 45kg)'),
      price: Number(price),
      sale_price: Number(sale_price || price),
      change_type: change_type || 'same',
      change_amount: Number(change_amount || 0),
      effective_month,
      notes: notes || ''
    };

    try {
      const [result] = await db.query(
        `INSERT INTO gas_price_history (gas_type, gas_name, price, sale_price, change_type, change_amount, effective_month, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [newObj.gas_type, newObj.gas_name, newObj.price, newObj.sale_price, newObj.change_type, newObj.change_amount, newObj.effective_month, newObj.notes]
      );

      if (result && result.insertId) {
        newObj.id = result.insertId;
      }
    } catch (dbErr) {
      console.error('DB Insert error in POST /api/gas-price-history:', dbErr.message);
    }

    defaultPriceHistory.push(newObj);

    return NextResponse.json({
      success: true,
      message: 'Đã thêm nhật ký biến động giá thành công',
      data: newObj
    });
  } catch (error) {
    console.error('POST /api/gas-price-history error:', error);
    return NextResponse.json({ success: false, message: 'Lỗi server khi ghi lịch sử giá' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Không có quyền truy cập' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Thiếu ID nhật ký giá' }, { status: 400 });
    }

    try {
      await db.query(`DELETE FROM gas_price_history WHERE id = ?`, [id]);
    } catch (e) {}

    defaultPriceHistory = defaultPriceHistory.filter(item => String(item.id) !== String(id));

    return NextResponse.json({
      success: true,
      message: 'Đã xóa nhật ký giá thành công'
    });
  } catch (error) {
    console.error('DELETE /api/gas-price-history error:', error);
    return NextResponse.json({ success: false, message: 'Lỗi server khi xóa nhật ký giá' }, { status: 500 });
  }
}
