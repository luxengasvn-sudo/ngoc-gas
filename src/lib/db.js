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
          role VARCHAR(20) DEFAULT 'admin',
          is_active TINYINT(1) DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Safe column migration
      try {
        await conn.query(`ALTER TABLE admin_users ADD COLUMN role VARCHAR(20) DEFAULT 'admin'`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE admin_users ADD COLUMN is_active TINYINT(1) DEFAULT 1`);
      } catch (e) {}

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
          slug VARCHAR(255),
          image_url VARCHAR(500),
          address TEXT NOT NULL,
          phone VARCHAR(50) NOT NULL,
          store_phones JSON,
          delivery_phones JSON,
          map_embed TEXT,
          fanpage_url VARCHAR(500),
          google_map_url VARCHAR(500),
          working_hours VARCHAR(255),
          delivery_time VARCHAR(100),
          delivery_areas TEXT,
          guide_content LONGTEXT,
          is_active TINYINT(1) DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Safe column migration for products
      try {
        await conn.query(`ALTER TABLE products ADD COLUMN rating_value DECIMAL(3,2) DEFAULT 4.9`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE products ADD COLUMN rating_count INT DEFAULT 86`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE products ADD COLUMN reviews_json LONGTEXT`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE products ADD COLUMN gas_type VARCHAR(50) DEFAULT NULL`);
      } catch (e) {}

      // Safe column migration for stores
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN slug VARCHAR(255)`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN fanpage_url VARCHAR(500)`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN google_map_url VARCHAR(500)`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN working_hours VARCHAR(255)`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN delivery_time VARCHAR(100)`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN delivery_areas TEXT`);
      } catch (e) {}
      try {
        await conn.query(`ALTER TABLE stores ADD COLUMN guide_content LONGTEXT`);
      } catch (e) {}

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

      await conn.query(`
        CREATE TABLE IF NOT EXISTS gas_price_history (
          id INT AUTO_INCREMENT PRIMARY KEY,
          gas_type VARCHAR(50) NOT NULL,
          gas_name VARCHAR(255) NOT NULL,
          price DECIMAL(12, 0) NOT NULL DEFAULT 0,
          sale_price DECIMAL(12, 0) NOT NULL DEFAULT 0,
          change_type VARCHAR(20) DEFAULT 'same',
          change_amount DECIMAL(12, 0) DEFAULT 0,
          effective_month VARCHAR(50) NOT NULL,
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
          ['Bình Gas Sopet 12kg (Xám)', 'binh-gas-sopet-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An & VietSing. Bình gas Sopet 12kg xám tiêu chuẩn chính hãng, lửa xanh tiết kiệm.', 420000, 395000, '/images/sopet-xam.png', 1, 1],
          ['Bình Gas Sopet 12kg (Xanh Đen)', 'binh-gas-sopet-12kg-xanh-den', 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 'Dịch vụ giao gas nhanh tại Thuận An & VietSing. Bình gas Sopet 12kg vỏ xanh đen cao cấp, kiểm định an toàn PCCC.', 425000, 400000, '/images/sopet-xanh-den.png', 1, 1],
          ['Bình Gas Sopet 12kg (Xanh)', 'binh-gas-sopet-12kg-xanh', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Sopet 12kg vỏ xanh tiêu chuẩn gia đình.', 420000, 395000, '/images/sopet-xanh.png', 1, 1],
          ['Bình Gas Sopet 12kg (Đỏ)', 'binh-gas-sopet-12kg-do', 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 'Dịch vụ giao gas nhanh tại Dĩ An. Bình gas Sopet 12kg vỏ đỏ chính hãng, an toàn tuyệt đối.', 430000, 405000, '/images/sopet.png', 1, 1],
          ['Bình Gas Phoenix Gas 12kg (Xám)', 'binh-gas-phoenix-gas-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', 'Dịch vụ giao gas nhanh tại Dĩ An & Thuận An. Bình gas Phoenix 12kg vỏ xám tiết kiệm cho hộ gia đình.', 410000, 385000, '/images/phoenix-xam.png', 1, 1],
          ['Bình Gas Phoenix Gas 12kg (Xanh)', 'binh-gas-phoenix-gas-12kg-xanh', 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', 'Dịch vụ giao gas nhanh tại KDC VietSing. Bình gas Phoenix 12kg vỏ xanh lá chính hãng Phoenix Gas.', 415000, 390000, '/images/phoenix-lg-xanh.png', 1, 1],
          ['Bình Gas Phoenix Gas 12kg (Đỏ)', 'binh-gas-phoenix-gas-12kg-do', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', 'Dịch vụ giao gas nhanh tại TP.HCM & Bình Dương. Bình gas Phoenix 12kg vỏ đỏ nổi bật, áp suất ổn định.', 420000, 395000, '/images/phoenix-do.png', 1, 1],
          ['Bình Gas Luxen Gas 12kg', 'binh-gas-luxen-gas-12kg', 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', 'Dịch vụ giao gas nhanh tại VietSing & Thuận An. Bình gas Luxen Gas 12kg chất lượng cao, vỏ bình chịu lực tiêu chuẩn.', 420000, 395000, '/images/luxen-gas.png', 1, 1],
          ['Bình Gas Luxen Gas 12kg (Xám)', 'binh-gas-luxen-gas-12kg-xam', 'Dịch vụ giao gas nhanh tại Dĩ An & VietSing. Bình gas Luxen Gas 12kg vỏ xám tiêu chuẩn, an toàn PCCC.', 'Dịch vụ giao gas nhanh tại Dĩ An & VietSing. Bình gas Luxen Gas 12kg vỏ xám tiêu chuẩn, an toàn PCCC.', 415000, 390000, '/images/luxen-xam-12kg.png', 1, 1],
          ['Bình Gas Luxen Gas 45kg (Công Nghiệp)', 'binh-gas-luxen-gas-45kg-cong-nghiep', 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', 'Dịch vụ giao gas nhanh tại KCN VSIP 1 & Dĩ An. Bình gas công nghiệp Luxen 45kg chuyên dùng cho Nhà hàng, Bếp ăn.', 1550000, 1450000, '/images/luxen-45.png', 1, 1],
          ['Bình Gas Luxen Gas 45kg (Xám)', 'binh-gas-luxen-gas-45kg-xam', 'Dịch vụ giao gas nhanh tại KCN VSIP 1, Dĩ An & Thuận An. Bình gas công nghiệp Luxen 45kg màu xám tiêu chuẩn.', 'Dịch vụ giao gas nhanh tại KCN VSIP 1, Dĩ An & Thuận An. Bình gas công nghiệp Luxen 45kg màu xám tiêu chuẩn.', 1540000, 1440000, '/images/luxen-xam-45.png', 1, 1]
        ];

        for (const p of defaultProducts) {
          await conn.query(
            `INSERT INTO products (name, slug, short_description, description, price, sale_price, image_url, category_id, is_featured) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)`,
            p
          );
        }
      }

      // Seed local SEO posts for Dĩ An, Thuận An, VietSing, TP.HCM
      const [postCount] = await conn.query('SELECT COUNT(*) as count FROM posts');
      if (postCount[0].count === 0) {
        const defaultPosts = [
          [
            'Dịch Vụ Giao Gas Nhanh Tại Dĩ An, Thuận An & KDC VietSing - Đổi Gas Sopet Vil, Phoenix, Luxen 12kg',
            'dai-ly-giao-gas-tan-nha-di-an-thuan-an-vietsing',
            'Ngọc Gas chuyên dịch vụ giao gas nhanh tại Dĩ An, Thuận An, VietSing & TP.HCM. Cam kết bình gas Sopet Vil, Phoenix Gas, Luxen Gas chính hãng, giao gas nhanh tận nhà, cân đủ ký tại chỗ.',
            `<h2>Dịch Vụ Giao Gas Nhanh Tận Nhà Tại Dĩ An, Thuận An & KDC VietSing</h2>
            <p>Bạn đang tìm kiếm dịch vụ <strong>giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An hay Khu Dân Cư VietSing (KCN VSIP 1)</strong>? Ngọc Gas (Địa chỉ: <em>7 Nguyễn Trung Trực, TP. Dĩ An</em>) chuyên phân phối chính hãng các thương hiệu gas như <strong>Sopet Vil, Phoenix Gas, Luxen Gas</strong> với dịch vụ <strong>giao gas nhanh trong vòng 15-30 phút</strong>.</p>
            
            <h3>1. Các Dòng Sản Phẩm Gas Phổ Biến Ngọc Gas Phân Phối</h3>
            <ul>
              <li><strong>Bình Gas Sopet Vil 12kg (Xám, Xanh Đen, Đỏ):</strong> Thương hiệu công nghệ Nhật Bản uy tín, vỏ bình chịu lực cao, khí gas cháy sạch lửa xanh tiết kiệm.</li>
              <li><strong>Bình Gas Phoenix Gas 12kg (Xám, Xanh, Đỏ):</strong> Áp suất gas ổn định, phù hợp hộ gia đình và quán ăn có nhu cầu giao gas nhanh tại Dĩ An & VietSing.</li>
              <li><strong>Bình Gas Luxen Gas 12kg & 45kg:</strong> Giải pháp năng lượng cho căn bếp gia đình và các nhà hàng cần dịch vụ giao gas nhanh tại KCN VSIP 1, Thuận An.</li>
            </ul>

            <h3>2. Lý Do Khách Hàng Chọn Dịch Vụ Giao Gas Nhanh Ngọc Gas</h3>
            <ol>
              <li><strong>Giao gas nhanh tận nhà:</strong> Đội ngũ kỹ thuật viên túc trực liên tục tại các trạm giao gas Dĩ An, Thuận An, VietSing, TP.HCM & Bình Dương.</li>
              <li><strong>Cân trực tiếp tại chỗ:</strong> 100% bình gas giao tới đều được cân công khai trước mặt khách hàng để đảm bảo đủ ký.</li>
              <li><strong>Kiểm tra an toàn miễn phí:</strong> Kỹ thuật viên giao gas nhanh luôn kiểm tra kỹ van gas và dây dẫn miễn phí khi lắp đặt.</li>
            </ol>

            <p>Liên hệ hotline chính thức <strong>19009396 (Ngọc Gas)</strong> hoặc ghé đại lý tại <em>7 Nguyễn Trung Trực, Dĩ An</em> để trải nghiệm dịch vụ giao gas nhanh ngay hôm nay!</p>`,
            '/images/sopet-xam.png',
            'Giao Gas Nhanh Tại Dĩ An, Thuận An & VietSing - Ngọc Gas Hotline 19009396',
            'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An, KDC VietSing. Đổi gas Sopet Vil, Phoenix, Luxen 12kg chính hãng, cân đủ ký.',
            'giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại Thuận An, giao gas nhanh tại VietSing, giao gas nhanh tại TP.HCM, giao gas nhanh tại Bình Dương, ngọc gas 19009396',
            1
          ],
          [
            'Bảng Giá & Dịch Vụ Giao Gas Nhanh Cho Nhà Hàng, Quán Ăn KCN VietSing & Dĩ An - Bình Gas Luxen 45kg',
            'bang-gia-gas-cong-nghiep-45kg-di-an-thuan-an-vietsing',
            'Ngọc Gas chuyên dịch vụ giao gas nhanh tại Dĩ An & VietSing cho nhà hàng, quán ăn, bếp ăn công nghiệp. Phân phối bình gas công nghiệp Luxen 45kg, Sopet 45kg chính hãng.',
            `<h2>Dịch Vụ Giao Gas Nhanh Cho Nhà Hàng, Quán Ăn Tại VietSing & Dĩ An</h2>
            <p>Đối với các nhà hàng, quán ăn, bếp ăn tập thể tại <strong>Khu Dân Cư VietSing, KCN VSIP 1, Dĩ An & Thuận An</strong>, dịch vụ <strong>giao gas nhanh tại chỗ</strong> là ưu tiên tối quan trọng để không làm gián đoạn việc nấu nướng giờ cao điểm.</p>

            <h3>Ưu Điểm Của Bình Gas Công Nghiệp Luxen 45kg & Sopet 45kg</h3>
            <ul>
              <li><strong>Dung tích 45kg:</strong> Giảm tần suất đổi bình, đáp ứng công suất nấu lớn.</li>
              <li><strong>Giao gas nhanh 24/7:</strong> Kỹ thuật viên hỗ trợ giao gas nhanh tại Bình Dương & TP.HCM bất kể thời gian.</li>
              <li><strong>Thi công đường ống inox đạt chuẩn PCCC:</strong> Đội ngũ kỹ sư Ngọc Gas hỗ trợ khảo sát và lắp đặt hệ thống giàn gom gas an toàn.</li>
            </ul>

            <p>Liên hệ ngay hotline chính thức <strong>19009396</strong> để được giao gas nhanh và tư vấn báo giá ưu đãi.</p>`,
            '/images/luxen-45.png',
            'Giao Gas Nhanh Cho Nhà Hàng - Bình Gas Luxen 45kg Dĩ An & VietSing',
            'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An, VietSing. Phân phối bình gas công nghiệp Luxen 45kg, Sopet 45kg cho nhà hàng. Gọi 19009396.',
            'giao gas nhanh, giao gas nhanh tại Dĩ An, giao gas nhanh tại VietSing, giao gas nhanh tại Thuận An, gas công nghiệp luxen 45kg',
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
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Auto DB Initialization notice:', err.message);
    }
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
    // Suppress dev overlay popup on fallback
    if (process.env.NODE_ENV !== 'production') {
      console.warn('DB Init notice:', err.message);
    }
  });
  return global.mysqlPool;
}

const db = {
  query: async (...args) => {
    try {
      return await getPool().query(...args);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('DB Query fallback:', err.message);
      }
      return [[], []];
    }
  },
  execute: async (...args) => {
    try {
      return await getPool().execute(...args);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('DB Execute fallback:', err.message);
      }
      return [{ affectedRows: 0, insertId: 0 }, []];
    }
  },
  getConnection: async (...args) => {
    return await getPool().getConnection(...args);
  }
};

export default db;
