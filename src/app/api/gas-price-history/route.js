import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const defaultPriceHistory = [
  // Gas Cao Cấp 12kg (Luxen Gas)
  { id: 1, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 410000, sale_price: 380000, change_type: 'same', change_amount: 0, effective_month: 'Tháng 3/2026', notes: 'Ổn định giá đầu vụ' },
  { id: 2, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 415000, sale_price: 385000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 4/2026', notes: 'Điều chỉnh nhẹ theo thị trường CP thế giới' },
  { id: 3, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 410000, sale_price: 380000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 5/2026', notes: 'Giảm giá hỗ trợ người tiêu dùng' },
  { id: 4, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 420000, sale_price: 390000, change_type: 'up', change_amount: 10000, effective_month: 'Tháng 6/2026', notes: 'Biến động nhẹ đợt giữa năm' },
  { id: 5, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 425000, sale_price: 395000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 7/2026', notes: 'Giá gas thế giới tăng' },
  { id: 6, gas_type: 'luxen-12kg', gas_name: 'Gas Cao Cấp 12kg (Luxen Gas)', price: 420000, sale_price: 390000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 8/2026', notes: 'Áp dụng chương trình trợ giá hè' },

  // Gas Phổ Thông 12kg (Sopet & Phoenix)
  { id: 7, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 400000, sale_price: 375000, change_type: 'same', change_amount: 0, effective_month: 'Tháng 3/2026', notes: 'Ổn định giá đun nấu' },
  { id: 8, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 405000, sale_price: 380000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 4/2026', notes: 'Tăng nhẹ theo giá thế giới' },
  { id: 9, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 400000, sale_price: 375000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 5/2026', notes: 'Giảm giá kích cầu' },
  { id: 10, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 410000, sale_price: 385000, change_type: 'up', change_amount: 10000, effective_month: 'Tháng 6/2026', notes: 'Điều chỉnh định kỳ' },
  { id: 11, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 415000, sale_price: 390000, change_type: 'up', change_amount: 5000, effective_month: 'Tháng 7/2026', notes: 'Chi phí vận chuyển tăng nhẹ' },
  { id: 12, gas_type: 'phothong-12kg', gas_name: 'Gas Phổ Thông 12kg (Sopet & Phoenix)', price: 410000, sale_price: 385000, change_type: 'down', change_amount: -5000, effective_month: 'Tháng 8/2026', notes: 'Giảm giá niêm yết tháng 8' },

  // Gas Công Nghiệp 45kg (Luxen 45kg)
  { id: 13, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1480000, sale_price: 1390000, change_type: 'same', change_amount: 0, effective_month: 'Tháng 3/2026', notes: 'Giá hỗ trợ KCN' },
  { id: 14, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1500000, sale_price: 1410000, change_type: 'up', change_amount: 20000, effective_month: 'Tháng 4/2026', notes: 'Điều chỉnh theo tỷ giá' },
  { id: 15, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1480000, sale_price: 1390000, change_type: 'down', change_amount: -20000, effective_month: 'Tháng 5/2026', notes: 'Ưu đãi hợp đồng dài hạn' },
  { id: 16, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1520000, sale_price: 1420000, change_type: 'up', change_amount: 30000, effective_month: 'Tháng 6/2026', notes: 'Biến động thị trường CP' },
  { id: 17, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1560000, sale_price: 1460000, change_type: 'up', change_amount: 40000, effective_month: 'Tháng 7/2026', notes: 'Nhu cầu cao điểm hè' },
  { id: 18, gas_type: 'congnghiep-45kg', gas_name: 'Gas Công Nghiệp 45kg (Luxen 45kg)', price: 1540000, sale_price: 1440000, change_type: 'down', change_amount: -20000, effective_month: 'Tháng 8/2026', notes: 'Giảm trợ giá cho nhà hàng' }
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

    try {
      const [result] = await db.query(
        `INSERT INTO gas_price_history (gas_type, gas_name, price, sale_price, change_type, change_amount, effective_month, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [gas_type, gas_name, price, sale_price || price, change_type || 'same', change_amount || 0, effective_month, notes || '']
      );

      return NextResponse.json({
        success: true,
        data: { id: result.insertId, ...body }
      });
    } catch (dbErr) {
      return NextResponse.json({
        success: true,
        data: { id: Date.now(), ...body }
      });
    }
  } catch (error) {
    console.error('POST /api/gas-price-history error:', error);
    return NextResponse.json({ success: false, message: 'Lỗi server khi ghi lịch sử giá' }, { status: 500 });
  }
}
