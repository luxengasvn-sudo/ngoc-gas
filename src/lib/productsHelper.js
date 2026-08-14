import fs from 'fs';
import path from 'path';
import db from './db.js';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.json');

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
  const sourceProducts = readProductsFromFile();

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

  // Merge: Use sourceProducts (JSON file + memory cache) as primary source of truth so user edits are NEVER overwritten by old MySQL rows
  let merged = [...sourceProducts];

  if (dbProducts.length > 0) {
    dbProducts.forEach(dbItem => {
      const idx = merged.findIndex(p => String(p.id) === String(dbItem.id) || p.slug === dbItem.slug);
      if (idx === -1) {
        merged.push(dbItem);
      }
    });
  }

  memoryProductsCache = merged;
  return merged;
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

export async function updateProductData(id, updateFields) {
  let all = readProductsFromFile();
  const index = all.findIndex(p => String(p.id) === String(id));

  let updatedProduct = null;
  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updateFields
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
      is_active: updateFields.is_active !== undefined ? (updateFields.is_active ? 1 : 0) : 1
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
           is_active = ? 
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
        id
      ]
    );
  } catch (err) {}

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
    is_active: productFields.is_active !== undefined ? (productFields.is_active ? 1 : 0) : 1
  };

  all.unshift(newProduct);
  memoryProductsCache = all;
  saveProductsToFile(all);

  // Sync to MySQL in background
  try {
    await db.query(
      `INSERT INTO products (name, slug, short_description, description, price, sale_price, image_url, images, category_id, is_featured, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        newProduct.is_active
      ]
    );
  } catch (err) {}

  return newProduct;
}
