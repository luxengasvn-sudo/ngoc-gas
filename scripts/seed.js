const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Helper to parse .env.local manually
function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      // Ignore comments and empty lines
      if (line.trim().startsWith('#') || !line.includes('=')) return;
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    });
  }
}

loadEnv();

const dbUrl = process.env.DATABASE_URL || 'mysql://user_fdc43e65776d:X1hCZExuJbFvdRaCcO5kaXHO4o9gdy1F@tinhgon.xyz:30050/ngoc_gas';

async function main() {
  console.log('Connecting to database...');
  const connection = await mysql.createConnection(dbUrl);
  console.log('Connected successfully.');

  try {
    // 1. Categories
    console.log('Creating categories table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Products
    console.log('Creating products table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(12,0),
        image_url VARCHAR(500),
        category_id INT,
        is_featured BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Posts
    console.log('Creating posts table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT,
        excerpt VARCHAR(500),
        image_url VARCHAR(500),
        is_published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Contacts
    console.log('Creating contacts table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        message TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Settings
    console.log('Creating settings table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Admin Users
    console.log('Creating admin_users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        display_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed Categories if empty
    const [categories] = await connection.query('SELECT COUNT(*) as count FROM categories');
    if (categories[0].count === 0) {
      console.log('Seeding categories...');
      await connection.query(`
        INSERT INTO categories (name, slug, description) VALUES
        ('Bình gas dân dụng', 'binh-gas-dan-dung', 'Các loại bình gas sử dụng cho gia đình, nhà bếp công suất nhỏ'),
        ('Bình gas công nghiệp', 'binh-gas-cong-nghiep', 'Các loại bình gas lớn phục vụ cho nhà hàng, khách sạn, xí nghiệp'),
        ('Phụ kiện gas', 'phu-kien-gas', 'Van gas, dây dẫn gas, bếp gas và các phụ kiện chính hãng an toàn')
      `);
    }

    // Seed Products if empty
    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (products[0].count === 0) {
      console.log('Seeding products...');
      // Get category IDs
      const [catRows] = await connection.query('SELECT id, name FROM categories');
      const catMap = {};
      catRows.forEach(row => {
        catMap[row.name] = row.id;
      });

      await connection.query(`
        INSERT INTO products (name, slug, description, price, image_url, category_id, is_featured, is_active) VALUES
        ('Bình gas Petrolimex 12kg Xám', 'binh-gas-petrolimex-12kg-xam', 'Bình gas Petrolimex chính hãng 12kg màu xám. Đảm bảo an toàn, đủ trọng lượng, lửa xanh tiết kiệm gas.', 430000, '/images/gas-petrolimex-12kg.jpg', ${catMap['Bình gas dân dụng']}, true, true),
        ('Bình gas Gia Đình 12kg Xanh', 'binh-gas-gia-dinh-12kg-xanh', 'Bình gas Gia Đình 12kg xanh vỏ dày siêu bền, công nghệ sản xuất hiện đại, chất lượng gas nhập khẩu cao cấp.', 420000, '/images/gas-giadinh-12kg.jpg', ${catMap['Bình gas dân dụng']}, true, true),
        ('Bình gas Đảo Ngọc 45kg Công Nghiệp', 'binh-gas-dao-ngoc-45kg-cong-nghiep', 'Bình gas công nghiệp 45kg Đảo Ngọc chuyên dùng cho nhà hàng, quán ăn lớn và các hệ thống bếp công nghiệp.', 1200000, '/images/gas-daongoc-45kg.jpg', ${catMap['Bình gas công nghiệp']}, true, true),
        ('Van gas an toàn Namilux NA-337S', 'van-gas-an-toan-namilux-na-337s', 'Van điều áp gas Namilux NA-337S tự động ngắt gas khi có sự cố rò rỉ đường ống, sản phẩm chất lượng cao của Nhật Bản.', 85000, '/images/van-namilux.jpg', ${catMap['Phụ kiện gas']}, false, true),
        ('Dây dẫn gas nhập khẩu Thái Lan', 'day-dan-gas-nhap-khau-thai-lan', 'Dây dẫn gas 3 lớp lõi thép siêu bền chống chuột cắn, nhập khẩu trực tiếp từ Thái Lan, độ bền trên 5 năm.', 65000, '/images/day-dan-gas.jpg', ${catMap['Phụ kiện gas']}, false, true),
        ('Bếp gas đôi inox Đảo Ngọc GD-200', 'bep-gas-doi-inox-dao-ngoc-gd-200', 'Bếp gas đôi mặt inox Đảo Ngọc GD-200, đầu đốt đồng thau siêu bền, tiết kiệm gas, thiết kế sang trọng dễ vệ sinh.', 650000, '/images/bep-gas-doi.jpg', ${catMap['Phụ kiện gas']}, true, true)
      `);
    }

    // Seed Posts if empty
    const [posts] = await connection.query('SELECT COUNT(*) as count FROM posts');
    if (posts[0].count === 0) {
      console.log('Seeding posts...');
      await connection.query(`
        INSERT INTO posts (title, slug, excerpt, content, image_url, is_published) VALUES
        ('Hướng dẫn sử dụng gas an toàn và tiết kiệm trong gia đình', 'huong-dan-su-dung-gas-an-toan', 'Gas là nguồn năng lượng tiện ích nhưng tiềm ẩn rủi ro nếu sử dụng sai cách. Dưới đây là các lưu ý quan trọng...', '<h2>Các lưu ý khi dùng gas gia đình</h2><p>1. Chọn bình gas từ các đại lý uy tín như Đảo Ngọc Gas.</p><p>2. Luôn khóa van bình gas sau khi nấu ăn xong.</p><p>3. Kiểm tra định kỳ dây dẫn gas và van gas bằng nước xà phòng để phát hiện rò rỉ sớm.</p><p>4. Không để các vật liệu dễ cháy gần bếp gas.</p>', '/images/blog-safety.jpg', true),
        ('5 dấu hiệu nhận biết rò rỉ gas và cách xử lý khẩn cấp', '5-dau-hieu-nhan-biet-ro-ri-gas', 'Mùi gas nồng nặc hay tiếng rít nhẹ ở đầu van là những dấu hiệu rò rỉ gas nguy hiểm. Hãy đọc ngay bài viết này...', '<h2>Cách xử lý khi phát hiện rò rỉ gas</h2><p>Khi ngửi thấy mùi gas hoặc nghi ngờ rò rỉ gas:</p><ul><li>Tuyệt đối không bật/tắt các công tắc điện, không dùng diêm hay bật lửa.</li><li>Mở ngay tất cả các cửa sổ, cửa đi để thông thoáng khí.</li><li>Khóa van bình gas ngay lập tức nếu an toàn.</li><li>Di chuyển ra ngoài và gọi điện cho đại lý Đảo Ngọc Gas hoặc đội cứu hộ.</li></ul>', '/images/blog-leak.jpg', true),
        ('Khuyến mãi lớn đón hè cùng Đảo Ngọc Gas', 'khuyen-mai-lon-don-he', 'Đảo Ngọc Gas tưng bừng khuyến mãi tri ân khách hàng: Giảm ngay 30.000đ khi đổi bình gas 12kg bất kỳ...', '<p>Từ ngày 01/08 đến hết ngày 31/08/2026, Đảo Ngọc Gas triển khai chương trình khuyến mãi đặc biệt:</p><ul><li>Tặng kèm nước rửa chén hoặc bộ vệ sinh bếp khi đổi bình gas 12kg.</li><li>Miễn phí kiểm tra an toàn hệ thống gas định kỳ.</li><li>Bảo dưỡng bếp gas miễn phí tại nhà cho khách hàng thân thiết.</li></ul>', '/images/blog-promo.jpg', true)
      `);
    }

    // Seed Settings if empty
    const [settings] = await connection.query('SELECT COUNT(*) as count FROM settings');
    if (settings[0].count === 0) {
      console.log('Seeding settings...');
      await connection.query(`
        INSERT INTO settings (setting_key, setting_value) VALUES
        ('company_name', 'CÔNG TY TNHH ĐẢO NGỌC GAS'),
        ('phone', '0987.654.321'),
        ('email', 'contact@daongocgas.com'),
        ('address', '123 Đường Đảo Ngọc, Phường Dương Đông, Phú Quốc, Kiên Giang'),
        ('working_hours', '06:00 - 22:00 (Thứ 2 - Chủ nhật)'),
        ('slogan', 'Năng lượng xanh - An tâm cho mọi nhà'),
        ('google_maps_embed', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.172960683693!2d103.95995777598858!3d10.206411989908873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c005b4b9b9b%3A0x7d0a273de01b3d7!2zRMawxqFuZyDEkMO0bmcsIFBowwogUXXhu5FjLCBLaeG7hW4gR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')
      `);
    }

    // Seed Admin if empty
    const [admins] = await connection.query('SELECT COUNT(*) as count FROM admin_users');
    if (admins[0].count === 0) {
      console.log('Seeding admin user...');
      const passwordHash = bcrypt.hashSync('admin123', 10);
      await connection.query(`
        INSERT INTO admin_users (username, password_hash, display_name) VALUES
        ('admin', '${passwordHash}', 'Quản trị viên Đảo Ngọc')
      `);
    }

    console.log('Database seeding finished successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await connection.end();
  }
}

main().catch(console.error);
