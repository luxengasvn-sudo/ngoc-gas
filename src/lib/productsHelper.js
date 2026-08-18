import fs from 'fs';
import path from 'path';
import db from './db.js';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.json');

const PRODUCTS_DEFAULT_PATH = path.join(process.cwd(), 'data', 'products.default.json');

let memoryProductsCache = null;

const initialProductsData = [];

function readProductsFromFile() {
  try {
    const dir = path.dirname(PRODUCTS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const content = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    // Fallback: copy from .default.json if main file doesn't exist
    if (fs.existsSync(PRODUCTS_DEFAULT_PATH)) {
      const defaultContent = fs.readFileSync(PRODUCTS_DEFAULT_PATH, 'utf8');
      fs.writeFileSync(PRODUCTS_FILE_PATH, defaultContent, 'utf8');
      const parsed = JSON.parse(defaultContent || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading products.json:', err.message);
  }
  return initialProductsData;
}

function saveProductsToFile(productsArr) {
  try {
    const dir = path.dirname(PRODUCTS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(productsArr, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving products.json:', err.message);
  }
}

export async function getAllProducts() {
  const fileProducts = readProductsFromFile();

  let dbProducts = [];
  try {
    const [rows] = await db.query(`
      SELECT p.*, c.name AS category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `);
    if (Array.isArray(rows) && rows.length > 0) {
      dbProducts = rows;
    }
  } catch (err) {}

  // Merge priority: MySQL (user edits) OVERRIDES JSON (stale defaults)
  // Start with DB products as the base (source of truth)
  if (dbProducts.length > 0) {
    let merged = [...dbProducts];

    // Add any file-only products that don't exist in DB (edge case: DB empty or new items in JSON)
    fileProducts.forEach(fileProd => {
      const existsInDb = merged.some(p => String(p.id) === String(fileProd.id) || p.slug === fileProd.slug);
      if (!existsInDb) {
        merged.push(fileProd);
      }
    });

    memoryProductsCache = merged;
    return merged;
  }

  // If DB is empty/unavailable, fall back to file products
  memoryProductsCache = fileProducts;
  return fileProducts;
}

export async function getProductByIdOrSlug(idOrSlug) {
  const all = await getAllProducts();
  const search = String(idOrSlug).toLowerCase();
  
  // 1. Exact match by ID or Slug
  let found = all.find(p => String(p.id) === search || p.slug?.toLowerCase() === search);
  if (found) return found;

  // 2. Normalize common slug variations
  const cleanSearch = search.replace(/-sopet-vil-/g, '-sopet-');
  found = all.find(p => p.slug?.toLowerCase() === cleanSearch);
  if (found) return found;

  // 3. Match without trailing digits from rename edits
  const strippedSearch = search.replace(/[0-9]+$/, '');
  if (strippedSearch && strippedSearch.length > 5) {
    found = all.find(p => p.slug?.toLowerCase()?.replace(/[0-9]+$/, '') === strippedSearch);
    if (found) return found;
  }

  return null;
}

export function getDefaultProductReviews(productName = 'Bình Gas') {
  return [
    {
      id: 'rev-1',
      name: 'Anh Hoàng Minh',
      location: 'Phường Dĩ An, TP. Dĩ An',
      rating: 5,
      date: '2026-07-28',
      comment: `Đặt đổi ${productName} lúc 11h trưa, đúng 15 phút sau anh nhân viên giao tới tận bếp. Có cân điện tử cân thử đủ ký ngay tại chỗ, lửa xanh đều đặn rất ưng ý.`,
      verified: true
    },
    {
      id: 'rev-2',
      name: 'Chị Ngọc Thảo',
      location: 'KDC VietSing, Thuận An',
      rating: 5,
      date: '2026-08-02',
      comment: 'Bình gas còn nguyên màng co niêm phong và tem chống hàng giả. Nhân viên hỗ trợ kiểm tra van dây gas an toàn miễn phí rất nhiệt tình.',
      verified: true
    },
    {
      id: 'rev-3',
      name: 'Chú Ba Hùng',
      location: 'Đường Nguyễn Trung Trực, Dĩ An',
      rating: 5,
      date: '2026-08-10',
      comment: 'Đổi gas ở Ngọc Gas mấy năm nay rồi, giá cả rõ ràng, giao nhanh đủ ký. Đánh giá 5 sao cho dịch vụ chu đáo!',
      verified: true
    }
  ];
}

export async function updateProductData(id, updateFields) {
  let all = readProductsFromFile();
  const index = all.findIndex(p => String(p.id) === String(id));
  const oldProduct = index !== -1 ? { ...all[index] } : null;

  let updatedProduct = null;
  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updateFields,
      gas_type: updateFields.gas_type !== undefined ? (updateFields.gas_type || null) : all[index].gas_type
    };
    updatedProduct = all[index];
  } else {
    const newId = Number(id) || Date.now();
    updatedProduct = {
      id: newId,
      name: updateFields.name || 'Sản phẩm mới',
      slug: updateFields.slug || `san-pham-${newId}`,
      short_description: updateFields.short_description || '',
      description: updateFields.description || '',
      price: updateFields.price ?? null,
      sale_price: updateFields.sale_price ?? null,
      image_url: updateFields.image_url || '',
      images: updateFields.images || '[]',
      category_id: updateFields.category_id || 1,
      category_name: updateFields.category_name || 'Gas Dân Dụng & Công Nghiệp',
      is_featured: updateFields.is_featured ? 1 : 0,
      is_active: updateFields.is_active !== undefined ? (updateFields.is_active ? 1 : 0) : 1,
      rating_value: updateFields.rating_value !== undefined ? Number(updateFields.rating_value) : 4.9,
      rating_count: updateFields.rating_count !== undefined ? Number(updateFields.rating_count) : 86,
      reviews_json: updateFields.reviews_json || '[]',
      gas_type: updateFields.gas_type || null
    };
    all.unshift(updatedProduct);
  }

  memoryProductsCache = all;
  saveProductsToFile(all);

  // Sync to MySQL in background
  try {
    await db.query(
      `UPDATE products 
       SET name = ?, 
           slug = ?, 
           short_description = ?, 
           description = ?, 
           price = ?, 
           sale_price = ?, 
           image_url = ?, 
           images = ?, 
           category_id = ?, 
           is_featured = ?, 
           is_active = ?,
           rating_value = ?,
           rating_count = ?,
           reviews_json = ?,
           gas_type = ?
       WHERE id = ?`,
      [
        updateFields.name,
        updateFields.slug,
        updateFields.short_description || '',
        updateFields.description || '',
        updateFields.price ?? null,
        updateFields.sale_price ?? null,
        updateFields.image_url || '',
        updateFields.images || '[]',
        updateFields.category_id || null,
        updateFields.is_featured ? 1 : 0,
        updateFields.is_active ? 1 : 0,
        updateFields.rating_value !== undefined ? Number(updateFields.rating_value) : 4.9,
        updateFields.rating_count !== undefined ? Number(updateFields.rating_count) : 86,
        updateFields.reviews_json || '[]',
        updateFields.gas_type !== undefined ? (updateFields.gas_type || null) : (oldProduct ? oldProduct.gas_type : null),
        id
      ]
    );
  } catch (err) {}

  // Auto-log price change into gas_price_history
  if (oldProduct) {
    try {
      const oldPrice = oldProduct.sale_price && Number(oldProduct.sale_price) > 0 ? Number(oldProduct.sale_price) : Number(oldProduct.price || 0);
      const newPrice = updateFields.sale_price && Number(updateFields.sale_price) > 0 ? Number(updateFields.sale_price) : Number(updateFields.price || 0);

      if (oldPrice > 0 && newPrice > 0 && oldPrice !== newPrice) {
        const gas_type = updateFields.gas_type !== undefined ? (updateFields.gas_type || null) : (oldProduct.gas_type || null);

        if (gas_type) {
          const change_type = newPrice > oldPrice ? 'up' : 'down';
          const change_amount = Math.abs(newPrice - oldPrice);
          const effective_month = `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
          const notes = `Hệ thống tự động ghi nhận thay đổi giá sản phẩm: ${updateFields.name || oldProduct.name}`;
          const gas_name = updateFields.name || oldProduct.name;
          const histPrice = updateFields.price !== undefined && updateFields.price !== '' && updateFields.price !== null ? Number(updateFields.price) : null;
          const histSalePrice = updateFields.sale_price !== undefined && updateFields.sale_price !== '' && updateFields.sale_price !== null ? Number(updateFields.sale_price) : null;

          const newHistObj = {
            id: Date.now(),
            gas_type,
            gas_name,
            price: histPrice || newPrice,
            sale_price: histSalePrice || newPrice,
            change_type,
            change_amount,
            effective_month,
            notes
          };

          // 1. Save to Database
          try {
            const [histRes] = await db.query(
              `INSERT INTO gas_price_history (gas_type, gas_name, price, sale_price, change_type, change_amount, effective_month, notes)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [newHistObj.gas_type, newHistObj.gas_name, newHistObj.price, newHistObj.sale_price, newHistObj.change_type, newHistObj.change_amount, newHistObj.effective_month, newHistObj.notes]
            );
            if (histRes && histRes.insertId) {
              newHistObj.id = histRes.insertId;
            }
          } catch (dbErr) {
            console.error('DB Auto Insert history error:', dbErr.message);
          }

          // 2. Save to JSON File
          try {
            const HIST_FILE = path.join(process.cwd(), 'data', 'gas_price_history.json');
            let fileHistory = [];
            if (fs.existsSync(HIST_FILE)) {
              const fileData = fs.readFileSync(HIST_FILE, 'utf8');
              fileHistory = JSON.parse(fileData || '[]');
            }
            fileHistory.push(newHistObj);
            const dir = path.dirname(HIST_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(HIST_FILE, JSON.stringify(fileHistory, null, 2), 'utf8');
          } catch (fileErr) {
            console.error('File Auto Save history error:', fileErr.message);
          }
        }
      }
    } catch (e) {
      console.error('Auto log gas price history error:', e.message);
    }
  }

  return updatedProduct;
}

export async function createProductData(productFields) {
  let all = readProductsFromFile();
  const maxId = all.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
  const newId = maxId + 1;

  const newProduct = {
    id: newId,
    name: productFields.name,
    slug: productFields.slug,
    short_description: productFields.short_description || '',
    description: productFields.description || '',
    price: productFields.price ?? null,
    sale_price: productFields.sale_price ?? null,
    image_url: productFields.image_url || '',
    images: productFields.images || '[]',
    category_id: productFields.category_id || 1,
    category_name: productFields.category_name || 'Gas Dân Dụng & Công Nghiệp',
    is_featured: productFields.is_featured ? 1 : 0,
    is_active: productFields.is_active !== undefined ? (productFields.is_active ? 1 : 0) : 1,
    rating_value: productFields.rating_value !== undefined ? Number(productFields.rating_value) : 4.9,
    rating_count: productFields.rating_count !== undefined ? Number(productFields.rating_count) : 86,
    reviews_json: productFields.reviews_json || '[]',
    gas_type: productFields.gas_type || null
  };

  all.unshift(newProduct);
  memoryProductsCache = all;
  saveProductsToFile(all);

  // Sync to MySQL in background
  try {
    await db.query(
      `INSERT INTO products (name, slug, short_description, description, price, sale_price, image_url, images, category_id, is_featured, is_active, rating_value, rating_count, reviews_json, gas_type) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newProduct.name,
        newProduct.slug,
        newProduct.short_description,
        newProduct.description,
        newProduct.price,
        newProduct.sale_price,
        newProduct.image_url,
        newProduct.images,
        newProduct.category_id,
        newProduct.is_featured,
        newProduct.is_active,
        newProduct.rating_value,
        newProduct.rating_count,
        newProduct.reviews_json,
        newProduct.gas_type
      ]
    );
  } catch (err) {}

  return newProduct;
}
