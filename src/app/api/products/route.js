import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const createKeywordTrustSEOArticle = (productName, imageSrc, productTypeDesc) => {
  return `
<h2>Thông Tin & Hướng Dẫn Đổi ${productName} Tận Nhà</h2>
<p>Chào anh chị, Ngọc Gas xin gửi tới anh chị những thông tin chi tiết nhất về sản phẩm <strong>${productName}</strong>. Là đơn vị chuyên cung cấp gas chính hãng nhiều năm qua tại khu vực Dĩ An, Thuận An, KDC VietSing cũng như khắp Bình Dương và TP.HCM, chúng tôi luôn thấu hiểu rằng một bình gas an toàn, ngọn lửa xanh đều và dịch vụ phục vụ chu đáo chính là điều quan trọng nhất đối với mỗi căn bếp gia đình hay nhà hàng.</p>

<img src="${imageSrc}" alt="${productName} giao gas nhanh tại Dĩ An Thuận An VietSing TP.HCM Bình Dương" style="width: 100%; max-width: 500px; height: auto; border-radius: 12px; margin: 24px auto; display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.12);" />

<h3>1. Đánh Giá Thực Tế Về ${productName}</h3>
<p>${productTypeDesc}</p>
<ul>
  <li><strong>Lửa xanh tiết kiệm:</strong> Khí gas tinh khiết được lọc kỹ, cho ngọn lửa xanh cháy đều, đun nấu nhanh chín mà không sợ đen đít nồi.</li>
  <li><strong>Vỏ bình dày dặn, an toàn:</strong> Đạt tiêu chuẩn kiểm định PCCC, sơn tĩnh điện chống rỉ sét và chịu lực va đập cực tốt.</li>
  <li><strong>Nguyên màng co niêm phong:</strong> Mỗi bình gas xuất kho đều được bọc màng co bảo vệ cổ van cẩn thận, đảm bảo hàng mới 100%.</li>
</ul>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<h3>2. Dịch Vụ Giao Gas Nhanh - Có Mặt Ngay Sau 15-30 Phút</h3>
<p>Đang nấu dở bữa cơm hay đang chuẩn bị món ăn cho khách mà hết gas đột ngột thì thật bất tiện! Hiểu được điều đó, dịch vụ <strong>giao gas nhanh</strong> của Ngọc Gas luôn sẵn sàng 24/7. Ngay khi nhận được cuộc gọi, đội ngũ anh em giao gas sẽ lập tức lên đường chở bình <strong>${productName}</strong> đến tận bếp nhà mình.</p>

<h3>3. Giao Gas Nhanh Tại Dĩ An - Phục Vụ Tận Tình Mọi Phường Xã</h3>
<p>Nếu anh chị đang sinh sống tại TP. Dĩ An, dịch vụ <strong>giao gas nhanh tại Dĩ An</strong> của chúng tôi sẽ có mặt chỉ sau 15 phút. Cửa hàng nằm ngay số <em>7 Nguyễn Trung Trực, Dĩ An</em> nên việc <strong>giao gas nhanh tại Dĩ An</strong> vô cùng thuận tiện.</p>

<h3>4. Giao Gas Nhanh Tại Thuận An - Đồng Hành Cùng Các Bếp Gia Đình & Quán Ăn</h3>
<p>Tại khu vực Thuận An, dịch vụ <strong>giao gas nhanh tại Thuận An</strong> của Ngọc Gas luôn đảm bảo cung cấp bình gas chính hãng <strong>${productName}</strong> chất lượng cao.</p>

<h3>5. Giao Gas Nhanh Tại VietSing - Tận Căn Hộ, Nhà Trọ & Bếp Ăn KCN VSIP 1</h3>
<p>Khu dân cư VietSing (VSIP 1) có nhiều chung cư, nhà trọ và quán ăn. Dịch vụ <strong>giao gas nhanh tại VietSing</strong> chuyên phục vụ giao gas siêu tốc tận căn hộ, phòng trọ.</p>

<h3>6. Giao Gas Nhanh Tại TP.HCM - Phục Vụ Nhanh Chóng Các Khu Vực Giáp Ranh</h3>
<p>Bên cạnh Bình Dương, Ngọc Gas cũng mở rộng dịch vụ <strong>giao gas nhanh tại TP.HCM</strong> cho các khu vực giáp ranh như TP. Thủ Đức, Quận 12, Bình Thạnh...</p>

<h3>7. Giao Gas Nhanh Tại Bình Dương - Hệ Thống Cửa Hàng Phủ Sóng Khắp Tỉnh</h3>
<p>Giải pháp <strong>giao gas nhanh tại Bình Dương</strong> của Ngọc Gas đã và đang phục vụ cho hàng ngàn hộ gia đình, quán ăn và doanh nghiệp.</p>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #E2E8F0;" />

<h3>8. Hệ Thống Cửa Hàng & Tổng Đài Đổi Gas Ngay</h3>
<p>Để tìm cửa hàng trạm gas gần nhất, anh chị có thể bấm xem tại đây: <a href="/cua-hang" style="color: #FF6B00; font-weight: bold; text-decoration: underline;">Danh Sách Cửa Hàng & Chi Nhánh Trạm Gas Ngọc Gas</a>.</p>
<ul style="list-style: none; padding-left: 0; line-height: 2;">
  <li>📞 <strong>Hotline Hỗ Trợ 24/7:</strong> <a href="tel:19009396" style="color: #FF6B00; font-weight: bold; font-size: 20px;">19009396</a></li>
  <li>📍 <strong>Trụ sở chính:</strong> 7 Nguyễn Trung Trực, TP. Dĩ An, Tỉnh Bình Dương</li>
</ul>
`;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get('category_id');
    const is_featured = searchParams.get('is_featured');
    const is_active = searchParams.get('is_active');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    let query = `
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    if (category_id) {
      query += ' AND p.category_id = ?';
      params.push(category_id);
    }

    if (is_featured !== null && is_featured !== undefined) {
      query += ' AND p.is_featured = ?';
      params.push(is_featured === 'true' || is_featured === '1' ? 1 : 0);
    }

    if (is_active !== null && is_active !== undefined) {
      query += ' AND p.is_active = ?';
      params.push(is_active === 'true' || is_active === '1' ? 1 : 0);
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.slug LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    let [rows] = await db.query(query, params);

    // Auto-seed into DB & fallback sync if products table in DB is empty
    if (!rows || rows.length === 0) {
      const defaultProducts = [
        ['Bình Gas Sopet 12kg (Xám)', 'binh-gas-sopet-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', createKeywordTrustSEOArticle('Bình Gas Sopet 12kg (Xám)', '/images/sopet-xam.png', 'Bình Gas Sopet 12kg màu xám là dòng gas dân dụng sản xuất theo công nghệ Nhật Bản tiên tiến, mang lại ngọn lửa xanh sạch và hiệu suất truyền nhiệt vượt trội.'), 420000, 395000, '/images/sopet-xam.png', 1, 1, 1],
        ['Bình Gas Sopet 12kg (Xanh Đen)', 'binh-gas-sopet-12kg-xanh-den', 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', createKeywordTrustSEOArticle('Bình Gas Sopet 12kg (Xanh Đen)', '/images/sopet-xanh-den.png', 'Bình Gas Sopet 12kg vỏ xanh đen sang trọng, sở hữu nước sơn tĩnh điện chịu nhiệt cao, tích hợp van điều áp tự động ngắt gas khẩn cấp khi gặp sự cố.'), 425000, 400000, '/images/sopet-xanh-den.png', 1, 1, 1],
        ['Bình Gas Sopet 12kg (Xanh)', 'binh-gas-sopet-12kg-xanh', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', createKeywordTrustSEOArticle('Bình Gas Sopet 12kg (Xanh)', '/images/sopet-xanh.png', 'Bình Gas Sopet 12kg vỏ xanh tiêu chuẩn là sự lựa chọn quen thuộc của hàng nghìn căn bếp gia đình tại Việt Nam nhờ lửa xanh khỏe và tiết kiệm nhiên liệu.'), 420000, 395000, '/images/sopet-xanh.png', 1, 1, 1],
        ['Bình Gas Sopet 12kg (Đỏ)', 'binh-gas-sopet-12kg-do', 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', createKeywordTrustSEOArticle('Bình Gas Sopet 12kg (Đỏ)', '/images/sopet.png', 'Bình Gas Sopet 12kg vỏ đỏ nổi bật với kết cấu thép đúc siêu bền, bề mặt dập nổi logo Sopet chính hãng đảm bảo an toàn tuyệt đối cho người sử dụng.'), 430000, 405000, '/images/sopet.png', 1, 1, 1],
        ['Bình Gas Phoenix Gas 12kg (Xám)', 'binh-gas-phoenix-gas-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', createKeywordTrustSEOArticle('Bình Gas Phoenix Gas 12kg (Xám)', '/images/phoenix-xam.png', 'Bình Gas Phoenix Gas 12kg vỏ xám mang đến giải pháp nhiên liệu đun nấu tiết kiệm chi phí nhưng vẫn đảm bảo áp suất gas ổn định và an toàn PCCC.'), 410000, 385000, '/images/phoenix-xam.png', 1, 1, 1],
        ['Bình Gas Phoenix Gas 12kg (Xanh)', 'binh-gas-phoenix-gas-12kg-xanh', 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', createKeywordTrustSEOArticle('Bình Gas Phoenix Gas 12kg (Xanh)', '/images/phoenix-lg-xanh.png', 'Bình Gas Phoenix Gas 12kg vỏ xanh lá tươi sáng, được kiểm định chất lượng khí gas tinh khiết không tạo cặn bẩn hay làm đen kiềng bếp nấu.'), 415000, 390000, '/images/phoenix-lg-xanh.png', 1, 1, 1],
        ['Bình Gas Phoenix Gas 12kg (Đỏ)', 'binh-gas-phoenix-gas-12kg-do', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', createKeywordTrustSEOArticle('Bình Gas Phoenix Gas 12kg (Đỏ)', '/images/phoenix-do.png', 'Bình Gas Phoenix Gas 12kg màu đỏ nổi bật với áp suất duy trì đều đặn từ lúc bắt đầu cho tới khi hết bình gas, giúp món ăn đun nấu nhanh chín thơm ngon.'), 420000, 395000, '/images/phoenix-do.png', 1, 1, 1],
        ['Bình Gas Luxen Gas 12kg', 'binh-gas-luxen-gas-12kg', 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', createKeywordTrustSEOArticle('Bình Gas Luxen Gas 12kg', '/images/luxen-gas.png', 'Bình Gas Luxen Gas 12kg là thương hiệu gas uy tín sản xuất ngay tại tỉnh Bình Dương, có vỏ bình đúc dày chịu lực tốt và ngọn lửa xanh cực mạnh.'), 420000, 395000, '/images/luxen-gas.png', 1, 1, 1],
        ['Bình Gas Luxen Gas 12kg (Xám)', 'binh-gas-luxen-gas-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An & VietSing. Bình gas Luxen Gas 12kg vỏ xám tiêu chuẩn, an toàn PCCC.', createKeywordTrustSEOArticle('Bình Gas Luxen Gas 12kg (Xám)', '/images/luxen-gas.png', 'Bình Gas Luxen Gas 12kg vỏ màu xám tiêu chuẩn chính hãng Luxen Gas Bình Dương, vỏ bình chắc chắn, ngọn lửa xanh xoáy đun nấu cực kỳ tiết kiệm.'), 415000, 390000, '/images/luxen-gas.png', 1, 1, 1],
        ['Bình Gas Luxen Gas 45kg (Công Nghiệp)', 'binh-gas-luxen-gas-45kg-cong-nghiep', 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', createKeywordTrustSEOArticle('Bình Gas Luxen Gas 45kg (Công Nghiệp)', '/images/luxen-45.png', 'Bình Gas Luxen Gas 45kg công nghiệp (Bình bò) dung tích cực lớn chuyên dùng cho các giàn gom bếp khè nhà hàng, khách sạn và bếp ăn công nghiệp KCN VSIP 1.'), 1550000, 1450000, '/images/luxen-45.png', 1, 1, 1],
        ['Bình Gas Luxen Gas 45kg (Xám)', 'binh-gas-luxen-gas-45kg-xam', 'Dịch vụ giao gas nhanh tại KCN VSIP 1, Dĩ An & Thuận An. Bình gas công nghiệp Luxen 45kg màu xám tiêu chuẩn.', createKeywordTrustSEOArticle('Bình Gas Luxen Gas 45kg (Xám)', '/images/luxen-45.png', 'Bình Gas Luxen Gas 45kg vỏ màu xám công nghiệp dung tích lớn, vỏ đúc chịu áp suất cực cao, chuyên dùng cho bếp ăn công nghiệp, nhà hàng, khách sạn và quán ăn lớn.'), 1540000, 1440000, '/images/luxen-45.png', 1, 1, 1]
      ];

      for (const p of defaultProducts) {
        try {
          await db.query(
            `INSERT INTO products (name, slug, short_description, description, price, sale_price, image_url, category_id, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            p
          );
        } catch (e) {
          console.error('Error seeding product:', e.message);
        }
      }

      const [newRows] = await db.query(query, params);
      rows = newRows || [];
    }

    // Ensure description is populated for Admin Panel editing even if DB column had empty text
    const processedRows = (rows || []).map(p => {
      if (!p.description || p.description.trim().length < 50) {
        p.description = createKeywordTrustSEOArticle(p.name, p.image_url || '/images/sopet-xam.png', `${p.name} là sản phẩm gas chính hãng chất lượng cao tại Ngọc Gas.`);
      }
      return p;
    });

    return NextResponse.json({
      success: true,
      data: processedRows
    });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách sản phẩm' },
      { status: 500 }
    );
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
    const { name, slug, short_description, description, price, sale_price, image_url, images, category_id, is_featured, is_active } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: 'Tên và slug sản phẩm là bắt buộc' }, { status: 400 });
    }

    const [result] = await db.query(
      `INSERT INTO products (name, slug, short_description, description, price, sale_price, image_url, images, category_id, is_featured, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        slug,
        short_description || null,
        description || null,
        price || null,
        sale_price || null,
        image_url || null,
        images || '[]',
        category_id || 1,
        is_featured ? 1 : 0,
        is_active ? 1 : 0
      ]
    );

    return NextResponse.json({
      success: true,
      data: { id: result.insertId, ...body }
    });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo sản phẩm: ' + error.message },
      { status: 500 }
    );
  }
}
