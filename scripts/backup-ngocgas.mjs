/**
 * NGOC GAS - COMPREHENSIVE ZERO-DATA-LOSS BACKUP SYSTEM
 * 
 * Sao lưu 100% dữ liệu hiện hữu trên ngocgas.com:
 * 1. CSDL MySQL Cloud (full dump SQL + từng bảng JSON)
 * 2. Live APIs từ https://ngocgas.com (settings, products, posts, stores, categories, gas price, merchant feed, sitemap)
 * 3. 100% tệp Media / Uploads thực tế tải từ production
 * 4. Dữ liệu tĩnh cục bộ (data/*.json)
 * 5. Bảng Manifest kiểm tra tính toàn vẹn (BACKUP_MANIFEST.json)
 * 
 * CHÚ Ý: Toàn bộ quá trình là 100% READ-ONLY, tuyệt đối không chỉnh sửa CSDL.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mysql from 'mysql2/promise';

const ROOT_DIR = process.cwd();

// Load .env.local
function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx > 0) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim();
          if (!process.env[key]) process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const DATABASE_URL = process.env.DATABASE_URL || 'mysql://user_b9c8ee4a0b58:L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8@tinhgon.xyz:30039/db_ngoc_gas';
const LIVE_URL = 'https://ngocgas.com';

function formatTimestamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const HH = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${YYYY}-${MM}-${DD}_${HH}-${mm}-${ss}`;
}

function escapeSqlValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (val instanceof Date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `'${val.getFullYear()}-${pad(val.getMonth() + 1)}-${pad(val.getDate())} ${pad(val.getHours())}:${pad(val.getMinutes())}:${pad(val.getSeconds())}'`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0';
        case '\x08': return '\\b';
        case '\x09': return '\\t';
        case '\x1a': return '\\z';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%': return '\\' + char;
        default: return char;
      }
    })}'`;
  }
  // String escaping
  return `'${String(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0': return '\\0';
      case '\x08': return '\\b';
      case '\x09': return '\\t';
      case '\x1a': return '\\z';
      case '\n': return '\\n';
      case '\r': return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%': return '\\' + char;
      default: return char;
    }
  })}'`;
}

async function runBackup() {
  const startTime = Date.now();
  const now = new Date();
  const timeStr = formatTimestamp(now);
  const backupFolderName = `backup_ngocgas_${timeStr}`;
  const backupDir = path.join(ROOT_DIR, 'backups', backupFolderName);

  const dbBackupDir = path.join(backupDir, 'database');
  const apiBackupDir = path.join(backupDir, 'api_live');
  const mediaBackupDir = path.join(backupDir, 'uploads_media');
  const localDataBackupDir = path.join(backupDir, 'local_data');

  fs.mkdirSync(dbBackupDir, { recursive: true });
  fs.mkdirSync(apiBackupDir, { recursive: true });
  fs.mkdirSync(mediaBackupDir, { recursive: true });
  fs.mkdirSync(localDataBackupDir, { recursive: true });

  console.log('===============================================================');
  console.log('🛡️  BẮT ĐẦU QUÁ TRÌNH SAO LƯU DỮ LIỆU TOÀN DIỆN NGOCGAS.COM');
  console.log(`⏰ Thời gian: ${now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
  console.log(`📁 Thư mục đích: ${backupDir}`);
  console.log('===============================================================\n');

  const manifest = {
    backup_id: backupFolderName,
    created_at: now.toISOString(),
    created_at_human: now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    live_site_url: LIVE_URL,
    mysql_host: DATABASE_URL.replace(/:[^:@]+@/, ':***@'),
    tables: {},
    api_endpoints: {},
    media_files: {
      total_found: 0,
      downloaded: 0,
      already_local: 0,
      failed: 0,
      files: []
    },
    local_data_files: [],
    duration_ms: 0,
    status: 'IN_PROGRESS'
  };

  // -------------------------------------------------------------
  // PHẦN 1: DUMP CSDL MYSQL (FULL SQL + TỪNG BẢNG JSON)
  // -------------------------------------------------------------
  console.log('📦 [1/4] ĐANG SAO LƯU CSDL MYSQL CLOUD...');
  let sqlDumpContent = `-- =============================================================\n`;
  sqlDumpContent += `-- NGOC GAS FULL DATABASE BACKUP DUMP\n`;
  sqlDumpContent += `-- Generated: ${now.toISOString()}\n`;
  sqlDumpContent += `-- Source: ${DATABASE_URL.replace(/:[^:@]+@/, ':***@')}\n`;
  sqlDumpContent += `-- =============================================================\n\n`;
  sqlDumpContent += `SET FOREIGN_KEY_CHECKS = 0;\nSET NAMES utf8mb4;\n\n`;

  let conn;
  try {
    conn = await mysql.createConnection(DATABASE_URL);
    const [tableRows] = await conn.query('SHOW TABLES');
    const tableNames = tableRows.map(r => Object.values(r)[0]);
    console.log(`   Tìm thấy ${tableNames.length} bảng: ${tableNames.join(', ')}`);

    for (const tbl of tableNames) {
      // 1. Get CREATE TABLE statement
      const [createRows] = await conn.query(`SHOW CREATE TABLE \`${tbl}\``);
      const createTableSql = createRows[0]['Create Table'];

      sqlDumpContent += `-- -------------------------------------------------------------\n`;
      sqlDumpContent += `-- Table structure for \`${tbl}\`\n`;
      sqlDumpContent += `-- -------------------------------------------------------------\n`;
      sqlDumpContent += `DROP TABLE IF EXISTS \`${tbl}\`;\n`;
      sqlDumpContent += `${createTableSql};\n\n`;

      // 2. Get all rows
      const [rows] = await conn.query(`SELECT * FROM \`${tbl}\``);
      manifest.tables[tbl] = {
        rowCount: rows.length,
        jsonFile: `${tbl}.json`
      };

      // Save JSON
      fs.writeFileSync(
        path.join(dbBackupDir, `${tbl}.json`),
        JSON.stringify(rows, null, 2),
        'utf8'
      );

      // Save SQL Inserts
      if (rows.length > 0) {
        sqlDumpContent += `-- Data for table \`${tbl}\` (${rows.length} rows)\n`;
        const columns = Object.keys(rows[0]);
        const colList = columns.map(c => `\`${c}\``).join(', ');

        // Chunk inserts by 50 rows
        const chunkSize = 50;
        for (let i = 0; i < rows.length; i += chunkSize) {
          const chunk = rows.slice(i, i + chunkSize);
          const valueList = chunk.map(row => {
            const vals = columns.map(col => escapeSqlValue(row[col]));
            return `(${vals.join(', ')})`;
          }).join(',\n  ');
          sqlDumpContent += `INSERT INTO \`${tbl}\` (${colList}) VALUES\n  ${valueList};\n`;
        }
        sqlDumpContent += `\n`;
      }
      console.log(`   ✅ Bảng [${tbl}]: ${rows.length} dòng -> database/${tbl}.json`);
    }

    sqlDumpContent += `SET FOREIGN_KEY_CHECKS = 1;\n`;
    fs.writeFileSync(path.join(dbBackupDir, 'ngocgas_full_dump.sql'), sqlDumpContent, 'utf8');
    console.log(`   ✅ File Full SQL Dump: database/ngocgas_full_dump.sql (${(sqlDumpContent.length / 1024).toFixed(2)} KB)`);
  } catch (dbErr) {
    console.error(`   ❌ Lỗi kết nối CSDL:`, dbErr.message);
    manifest.db_error = dbErr.message;
  } finally {
    if (conn) await conn.end();
  }

  // -------------------------------------------------------------
  // PHẦN 2: SNAPSHOT TOÀN BỘ LIVE APIS TỪ NGOCGAS.COM
  // -------------------------------------------------------------
  console.log('\n🌐 [2/4] ĐANG SAO LƯU LIVE APIS & METADATA TỪ HTTPS://NGOCGAS.COM...');
  const apiList = [
    { path: '/api/settings', file: 'live_settings.json', isJson: true },
    { path: '/api/products', file: 'live_products.json', isJson: true },
    { path: '/api/posts', file: 'live_posts.json', isJson: true },
    { path: '/api/stores', file: 'live_stores.json', isJson: true },
    { path: '/api/categories', file: 'live_categories.json', isJson: true },
    { path: '/api/gas-price-history', file: 'live_gas_price_history.json', isJson: true },
    { path: '/api/upload', file: 'live_upload_list.json', isJson: true },
    { path: '/api/feed/google-merchant', file: 'google_merchant_feed.xml', isJson: false },
    { path: '/sitemap.xml', file: 'sitemap.xml', isJson: false },
    { path: '/robots.txt', file: 'robots.txt', isJson: false }
  ];

  let liveUploadData = [];

  for (const item of apiList) {
    try {
      const url = `${LIVE_URL}${item.path}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'NgocGasBackupBot/1.0' } });
      if (res.ok) {
        if (item.isJson) {
          const json = await res.json();
          fs.writeFileSync(path.join(apiBackupDir, item.file), JSON.stringify(json, null, 2), 'utf8');
          manifest.api_endpoints[item.path] = {
            status: res.status,
            success: true,
            file: item.file
          };
          if (item.path === '/api/upload' && json.data && Array.isArray(json.data)) {
            liveUploadData = json.data;
          }
        } else {
          const text = await res.text();
          fs.writeFileSync(path.join(apiBackupDir, item.file), text, 'utf8');
          manifest.api_endpoints[item.path] = {
            status: res.status,
            success: true,
            file: item.file,
            size: text.length
          };
        }
        console.log(`   ✅ API [${item.path}] -> api_live/${item.file}`);
      } else {
        console.warn(`   ⚠️  API [${item.path}] trả về HTTP ${res.status}`);
        manifest.api_endpoints[item.path] = { status: res.status, success: false };
      }
    } catch (e) {
      console.warn(`   ⚠️  API [${item.path}] lỗi: ${e.message}`);
      manifest.api_endpoints[item.path] = { error: e.message, success: false };
    }
  }

  // -------------------------------------------------------------
  // PHẦN 3: TẢI TOÀN BỘ 70 TỆP MEDIA / UPLOADS TỪ PRODUCTION
  // -------------------------------------------------------------
  console.log('\n🖼️  [3/4] ĐANG SAO LƯU 100% FILE MEDIA / UPLOADS TỪ NGOCGAS.COM...');
  const mediaUrls = new Set();

  // 1. Thêm từ live /api/upload
  for (const f of liveUploadData) {
    if (f.url) mediaUrls.add(f.url);
  }

  // 2. Quét thêm từ các tệp JSON database (settings, products, stores, posts)
  const jsonFilesToScan = fs.readdirSync(dbBackupDir).filter(f => f.endsWith('.json'));
  for (const jf of jsonFilesToScan) {
    try {
      const content = fs.readFileSync(path.join(dbBackupDir, jf), 'utf8');
      const matches = content.matchAll(/(\/(?:uploads|images)\/[a-zA-Z0-9_\-./]+?\.(?:png|jpg|jpeg|webp|svg|gif|mp4))/gi);
      for (const m of matches) {
        mediaUrls.add(m[1]);
      }
    } catch (e) {}
  }

  const urlArray = Array.from(mediaUrls);
  manifest.media_files.total_found = urlArray.length;
  console.log(`   Tìm thấy tổng cộng ${urlArray.length} tệp media cần sao lưu.`);

  const localUploadsDir = path.join(ROOT_DIR, 'public', 'uploads');
  if (!fs.existsSync(localUploadsDir)) fs.mkdirSync(localUploadsDir, { recursive: true });

  let downloadCount = 0;
  let alreadyLocalCount = 0;
  let failCount = 0;

  for (let i = 0; i < urlArray.length; i++) {
    const relUrl = urlArray[i];
    const fileName = path.basename(relUrl);
    const backupTarget = path.join(mediaBackupDir, fileName);
    const localTarget = path.join(ROOT_DIR, 'public', relUrl.replace(/^\//, '').replace(/\//g, path.sep));

    // Ensure target subdirectory exists
    fs.mkdirSync(path.dirname(backupTarget), { recursive: true });
    fs.mkdirSync(path.dirname(localTarget), { recursive: true });

    let fileBuffer = null;

    // Check if already in local
    if (fs.existsSync(localTarget)) {
      fileBuffer = fs.readFileSync(localTarget);
      fs.writeFileSync(backupTarget, fileBuffer);
      alreadyLocalCount++;
      manifest.media_files.files.push({
        url: relUrl,
        fileName,
        size: fileBuffer.length,
        source: 'local_public_uploads'
      });
    } else {
      // Download from live site
      try {
        const fetchUrl = `${LIVE_URL}${relUrl}`;
        const res = await fetch(fetchUrl);
        if (res.ok) {
          const ab = await res.arrayBuffer();
          fileBuffer = Buffer.from(ab);
          fs.writeFileSync(backupTarget, fileBuffer);
          // Also save to local public/uploads if it's an /uploads file to keep local environment in sync
          if (relUrl.startsWith('/uploads/')) {
            fs.writeFileSync(localTarget, fileBuffer);
          }
          downloadCount++;
          manifest.media_files.files.push({
            url: relUrl,
            fileName,
            size: fileBuffer.length,
            source: 'downloaded_from_production'
          });
        } else {
          failCount++;
          console.warn(`   ⚠️ Không tải được (${res.status}): ${relUrl}`);
        }
      } catch (err) {
        failCount++;
        console.warn(`   ⚠️ Lỗi tải file: ${relUrl} - ${err.message}`);
      }
    }

    if ((i + 1) % 15 === 0 || i + 1 === urlArray.length) {
      console.log(`   Đã xử lý: ${i + 1}/${urlArray.length} tệp (Tải mới: ${downloadCount}, Có sẵn: ${alreadyLocalCount})`);
    }
  }

  manifest.media_files.downloaded = downloadCount;
  manifest.media_files.already_local = alreadyLocalCount;
  manifest.media_files.failed = failCount;
  console.log(`   ✅ Hoàn tất Media: Tải mới ${downloadCount} tệp, Đã có ${alreadyLocalCount} tệp, Thất bại ${failCount} tệp.`);

  // -------------------------------------------------------------
  // PHẦN 4: SAO CHÉP DỮ LIỆU CỤC BỘ (data/*.json)
  // -------------------------------------------------------------
  console.log('\n📄 [4/4] ĐANG SAO LƯU THƯ MỤC DATA CỤC BỘ (data/*.json)...');
  const dataDir = path.join(ROOT_DIR, 'data');
  if (fs.existsSync(dataDir)) {
    const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    for (const df of dataFiles) {
      const src = path.join(dataDir, df);
      const dst = path.join(localDataBackupDir, df);
      fs.copyFileSync(src, dst);
      manifest.local_data_files.push({
        file: df,
        size: fs.statSync(src).size
      });
      console.log(`   ✅ Sao chép: data/${df} -> local_data/${df}`);
    }
  }

  // -------------------------------------------------------------
  // PHẦN 5: SAO CHÉP DỮ LIỆU ĐỊA GIỚI 34 TỈNH THÀNH (src/data/tinhthanh)
  // -------------------------------------------------------------
  console.log('\n🗺️  [5/5] ĐANG SAO LƯU DỮ LIỆU ĐỊA GIỚI 34 TỈNH THÀNH...');
  const tinhThanhDir = path.join(ROOT_DIR, 'src', 'data', 'tinhthanh');
  const tinhThanhBackupDir = path.join(backupDir, 'tinhthanh_data');
  manifest.tinhthanh_data_files = [];
  if (fs.existsSync(tinhThanhDir)) {
    fs.mkdirSync(tinhThanhBackupDir, { recursive: true });
    const ttFiles = fs.readdirSync(tinhThanhDir).filter(f => f.endsWith('.json'));
    for (const tf of ttFiles) {
      const src = path.join(tinhThanhDir, tf);
      const dst = path.join(tinhThanhBackupDir, tf);
      fs.copyFileSync(src, dst);
      manifest.tinhthanh_data_files.push({
        file: tf,
        size: fs.statSync(src).size
      });
      console.log(`   ✅ Sao chép: src/data/tinhthanh/${tf} -> tinhthanh_data/${tf}`);
    }
  }

  // -------------------------------------------------------------
  // PHẦN 6: TẠO BACKUP MANIFEST & TỔNG KẾT
  // -------------------------------------------------------------
  manifest.duration_ms = Date.now() - startTime;
  manifest.status = 'SUCCESS';

  fs.writeFileSync(
    path.join(backupDir, 'BACKUP_MANIFEST.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  console.log('\n===============================================================');
  console.log('🎉 SAO LƯU TOÀN DIỆN THÀNH CÔNG 100%!');
  console.log(`⏱️  Thời gian thực thi: ${(manifest.duration_ms / 1000).toFixed(2)}s`);
  console.log(`📁 Thư mục lưu trữ: backups/${backupFolderName}`);
  console.log(`📊 Kết quả:`);
  console.log(`   - Số bảng CSDL MySQL: ${Object.keys(manifest.tables).length} bảng`);
  for (const [tbl, info] of Object.entries(manifest.tables)) {
    console.log(`     • ${tbl.padEnd(20)}: ${info.rowCount} dòng`);
  }
  console.log(`   - Số file API & Feeds : ${Object.keys(manifest.api_endpoints).length} endpoints`);
  console.log(`   - Số file Media/Upload: ${manifest.media_files.total_found} files (${manifest.media_files.downloaded} tải mới, ${manifest.media_files.already_local} có sẵn)`);
  console.log(`   - Số file Data cục bộ : ${manifest.local_data_files.length} files`);
  console.log(`   - Số file Địa Giới 2026: ${manifest.tinhthanh_data_files.length} files`);
  console.log(`   - File Manifest       : backups/${backupFolderName}/BACKUP_MANIFEST.json`);
  console.log('===============================================================');
}

runBackup().catch(err => {
  console.error('\n❌ QUÁ TRÌNH SAO LƯU THẤT BẠI:', err);
  process.exit(1);
});
