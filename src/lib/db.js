import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

let isInitialized = false;

async function initTables(pool) {
  if (isInitialized) return;
  isInitialized = true;
  try {
    const conn = await pool.getConnection();
    try {
      await conn.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          display_name VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          slug VARCHAR(100) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          short_description TEXT,
          description LONGTEXT,
          price DECIMAL(12, 2),
          sale_price DECIMAL(12, 2),
          image_url VARCHAR(500),
          images JSON,
          category_id INT,
          is_featured TINYINT(1) DEFAULT 0,
          is_active TINYINT(1) DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          excerpt TEXT,
          content LONGTEXT,
          image_url VARCHAR(500),
          meta_title VARCHAR(255),
          meta_description TEXT,
          meta_keywords TEXT,
          is_published TINYINT(1) DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS stores (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          image_url VARCHAR(500),
          address TEXT NOT NULL,
          phone VARCHAR(50) NOT NULL,
          store_phones JSON,
          delivery_phones JSON,
          map_embed TEXT,
          is_active TINYINT(1) DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          email VARCHAR(100),
          address TEXT,
          note TEXT,
          is_read TINYINT(1) DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS settings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          setting_key VARCHAR(100) NOT NULL UNIQUE,
          setting_value LONGTEXT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await conn.query(`
        CREATE TABLE IF NOT EXISTS analytics_clicks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          click_type VARCHAR(50) NOT NULL,
          label VARCHAR(255),
          page_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Seed default admin user
      const [admins] = await conn.query('SELECT * FROM admin_users WHERE username = ?', ['admin']);
      if (admins.length === 0) {
        const passwordHash = await bcrypt.hash('admin123', 10);
        await conn.query(
          'INSERT INTO admin_users (username, password_hash, display_name) VALUES (?, ?, ?)',
          ['admin', passwordHash, 'Quản trị viên Ngọc Gas']
        );
      }

      // Seed core products from D:\Dự Án PX\Sản phẩm
      const [prodCount] = await conn.query('SELECT COUNT(*) as count FROM products');
      if (prodCount[0].count === 0) {
        const defaultProducts = [
          ['Bình Gas Sopet Vil 12kg (Xám)', 'binh-gas-sopet-vil-12kg-xam', 'Bình gas Sopet Vil 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 420000, 395000, '/images/sopet-xam.png', 1, 1],
          ['Bình Gas Sopet Vil 12kg (Xanh Đen)', 'binh-gas-sopet-vil-12kg-xanh-den', 'Bình gas Sopet Vil 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 425000, 400000, '/images/sopet-xanh-den.png', 1, 1],
          ['Bình Gas Sopet Vil 12kg (Xanh)', 'binh-gas-sopet-vil-12kg-xanh', 'Bình gas Sopet Vil 12kg vỏ xanh tiêu chuẩn gia đình.', 420000, 395000, '/images/sopet-xanh.png', 1, 1],
          ['Bình Gas Sopet Vil 12kg (Đỏ)', 'binh-gas-sopet-vil-12kg-do', 'Bình gas Sopet Vil 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 430000, 405000, '/images/sopet.png', 1, 1],
          ['Bình Gas Phoenix Gas 12kg (Xám)', 'binh-gas-phoenix-gas-12kg-xam', 'Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình tại Dĩ An & Thuận An.', 410000, 385000, '/images/phoenix-xam.png', 1, 1],
          ['Bình Gas Phoenix Gas 12kg (Xanh)', 'binh-gas-phoenix-gas-12kg-xanh', 'Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', 415000, 390000, '/images/phoenix-lg-xanh.png', 1, 1],
          ['Bình Gas Phoenix Gas 12kg (Đỏ)', 'binh-gas-phoenix-gas-12kg-do', 'Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', 420000, 395000, '/images/phoenix-do.png', 1, 1],
          ['Bình Gas Luxen Gas 12kg', 'binh-gas-luxen-gas-12kg', 'Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', 420000, 395000, '/images/luxen-gas.png', 1, 1],
          ['Bình Gas Luxen Gas 45kg (Công Nghiệp)', 'binh-gas-luxen-gas-45kg-cong-nghiep', 'Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn KCN VietSing & Dĩ An.', 1550000, 1450000, '/images/luxen-45.png', 1, 1]
        ];

        for (const p of defaultProducts) {
          await conn.query(
            `INSERT INTO products (name, slug, short_description, price, sale_price, image_url, category_id, is_featured) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)`,
            p
          );
        }
      }

      // Seed local SEO posts for Dĩ An, Thuận An, VietSing, TP.HCM
      const [postCount] = await conn.query('SELECT COUNT(*) as count FROM posts');
      if (postCount[0].count === 0) {
        const defaultPosts = [
          [
            'Đại Lý Giao Gas Tận Nhà Uy Tín Tại Dĩ An, Thuận An & KDC VietSing - Đổi Gas Sopet Vil, Phoenix, Luxen 12kg',
            'dai-ly-giao-gas-tan-nha-di-an-thuan-an-vietsing',
            'Ngọc Gas chuyên cung cấp và giao lẻ gas tận nhà 24/7 tại Dĩ An, Thuận An, VietSing & TP.HCM. Cam kết bình gas Sopet Vil, Phoenix Gas, Luxen Gas chính hãng, cân đủ ký tại chỗ.',
            `<h2>Dịch Vụ Giao Gas Tận Nhà Nhanh Chóng Tại Dĩ An, Thuận An & KDC VietSing</h2>
            <p>Bạn đang tìm kiếm một <strong>đại lý giao gas uy tín tại Dĩ An, Thuận An hay Khu Dân Cư VietSing (KCN VSIP 1)</strong>? Ngọc Gas (Địa chỉ: <em>7 Nguyễn Trung Trực, TP. Dĩ An</em>) tự hào là đơn vị phân phối chính hãng các thương hiệu gas hàng đầu như <strong>Sopet Vil, Phoenix Gas, Luxen Gas</strong> với dịch vụ vận chuyển nhanh chỉ từ 15-30 phút.</p>
            
            <h3>1. Các Dòng Sản Phẩm Gas Phổ Biến Ngọc Gas Phân Phối</h3>
            <ul>
              <li><strong>Bình Gas Sopet Vil 12kg (Xám, Xanh Đen, Đỏ):</strong> Thương hiệu Nhật Bản uy tín, vỏ bình chịu lực cao, khí gas cháy sạch lửa xanh tiết kiệm.</li>
              <li><strong>Bình Gas Phoenix Gas 12kg (Xám, Xanh, Đỏ):</strong> Áp suất gas cực kỳ ổn định, phù hợp hộ gia đình và quán ăn tại Dĩ An & VietSing.</li>
              <li><strong>Bình Gas Luxen Gas 12kg & 45kg:</strong> Giải pháp năng lượng hoàn hảo cho căn bếp gia đình và các nhà hàng tại KCN VSIP 1, Thuận An.</li>
            </ul>

            <h3>2. Lý Do Khách Hàng Tại Dĩ An & Thuận An Tin Chọn Ngọc Gas</h3>
            <ol>
              <li><strong>Cân trực tiếp tại nhà:</strong> 100% bình gas giao tới đều được kỹ thuật viên cân công khai trước mặt khách hàng để đảm bảo đủ ký.</li>
              <li><strong>Kiểm tra an toàn miễn phí:</strong> Đội ngũ giao hàng luôn dùng thiết bị đo rò rỉ van gas và dây dẫn miễn phí khi lắp đặt.</li>
              <li><strong>Phục vụ liên tục 24/7:</strong> Giao gas xuyên suốt kể cả ngày nghỉ lễ tại các khu vực Dĩ An, An Phú, Thuận Giao, Lái Thiêu và TP.HCM.</li>
            </ol>

            <p>Liên hệ hotline <strong>0900.000.000 (Ngọc Gas)</strong> hoặc ghé đại lý tại <em>7 Nguyễn Trung Trực, Dĩ An</em> để đổi gas chính hãng ngay hôm nay!</p>`,
            '/images/sopet-xam.png',
            'Đại Lý Giao Gas Dĩ An, Thuận An & VietSing - Ngọc Gas 7 Nguyễn Trung Trực',
            'Giao gas tận nhà nhanh 15 phút tại Dĩ An, Thuận An, KDC VietSing. Đổi gas Sopet Vil, Phoenix, Luxen 12kg chính hãng, cân đủ ký.',
            'giao gas dĩ an, đổi gas thuận an, giao gas vietsing, gas sopet vil, gas phoenix, luxen gas, ngọc gas dĩ an',
            1
          ],
          [
            'Bảng Giá Gas Công Nghiệp Luxen 45kg Cho Nhà Hàng, Bếp Ăn KCN VietSing & Dĩ An',
            'bang-gia-gas-cong-nghiep-45kg-di-an-thuan-an-vietsing',
            'Ngọc Gas tư vấn, thi công hệ thống dẫn gas và cung cấp bình gas công nghiệp Luxen 45kg, Sopet 45kg cho nhà hàng, quán ăn, bếp ăn công nghiệp tại Dĩ An, VietSing & TP.HCM.',
            `<h2>Giải Pháp Gas Công Nghiệp 45kg Cho Nhà Hàng, Quán Ăn Tại VietSing & Dĩ An</h2>
            <p>Đối với các nhà hàng, quán ăn, bếp ăn tập thể tại <strong>Khu Dân Cư VietSing, KCN VSIP 1, Dĩ An & Thuận An</strong>, việc đảm bảo nguồn gas ổn định, an toàn và tối ưu chi phí là yếu tố sống còn.</p>

            <h3>Ưu Điểm Của Bình Gas Công Nghiệp Luxen 45kg & Sopet 45kg</h3>
            <ul>
              <li><strong>Dung tích lớn:</strong> Giảm tần suất đổi bình, đảm bảo quá trình nấu nướng liên tục giờ cao điểm.</li>
              <li><strong>Chi phí ưu đãi:</strong> Báo giá chiết khấu đặc biệt dành cho hợp đồng tiêu thụ số lượng lớn.</li>
              <li><strong>Thi công đường ống inox đạt chuẩn PCCC:</strong> Đội ngũ kỹ sư Ngọc Gas hỗ trợ khảo sát và lắp đặt hệ thống giàn gom gas 2-4-8 bình an toàn tuyệt đối.</li>
            </ul>

            <p>Nhận báo giá gas công nghiệp mới nhất tại Dĩ An & VietSing qua hotline: <strong>0900.000.000</strong>.</p>`,
            '/images/luxen-45.png',
            'Cung Cấp Gas Công Nghiệp Luxen 45kg Dĩ An, Thuận An & KCN VietSing',
            'Phân phối bình gas công nghiệp Luxen 45kg, Sopet 45kg cho nhà hàng, quán ăn tại Dĩ An, Thuận An, VietSing. Kiểm định PCCC đầy đủ.',
            'gas công nghiệp dĩ an, bình gas 45kg luxen, gas nhà hàng vietsing, thi công hệ thống gas thuận an',
            1
          ]
        ];

        for (const post of defaultPosts) {
          await conn.query(
            `INSERT INTO posts (title, slug, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title)`,
            post
          );
        }
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Auto DB Initialization error:', err);
    isInitialized = false;
  }
}

function getPool() {
  if (!global.mysqlPool) {
    const connectionString = process.env.DATABASE_URL || 'mysql://localhost:3306/ngoc_gas';
    global.mysqlPool = mysql.createPool({
      uri: connectionString,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    });
  }
  initTables(global.mysqlPool).catch(err => {
    console.error('Safe catch initTables error:', err.message);
  });
  return global.mysqlPool;
}

const db = {
  query: async (...args) => {
    try {
      return await getPool().query(...args);
    } catch (err) {
      console.error('DB Query Error Handled:', err.message);
      return [[], []];
    }
  },
  execute: async (...args) => {
    try {
      return await getPool().execute(...args);
    } catch (err) {
      console.error('DB Execute Error Handled:', err.message);
      return [{ affectedRows: 0, insertId: 0 }, []];
    }
  },
  getConnection: async (...args) => {
    return await getPool().getConnection(...args);
  }
};

export default db;
