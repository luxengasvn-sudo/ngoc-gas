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
