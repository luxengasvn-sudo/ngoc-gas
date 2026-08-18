import fs from 'fs';
import path from 'path';
import db from './db.js';

const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'data', 'categories.json');
const CATEGORIES_DEFAULT_PATH = path.join(process.cwd(), 'data', 'categories.default.json');

const initialCategoriesData = [
  {
    id: 1,
    name: 'Gas Dân Dụng & Công Nghiệp',
    slug: 'gas-dan-dung-cong-nghiep',
    description: 'Các loại bình gas 12kg và 45kg chính hãng Sopet, Phoenix, Luxen'
  },
  {
    id: 2,
    name: 'Gas Công Nghiệp Khè',
    slug: 'gas-cong-nghiep-khe',
    description: 'Bình gas công nghiệp 45kg chuyên dùng cho nhà hàng, quán ăn, bếp ăn tập thể'
  },
  {
    id: 3,
    name: 'Phụ Kiện & Bếp Gas',
    slug: 'phu-kien-bep-gas',
    description: 'Van điều áp tự động ngắt, dây dẫn gas bọc inox chống chuột, bếp gas chính hãng'
  }
];

export function readCategoriesFromFile() {
  try {
    const dir = path.dirname(CATEGORIES_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      const content = fs.readFileSync(CATEGORIES_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    // Fallback: copy from .default.json if main file doesn't exist
    if (fs.existsSync(CATEGORIES_DEFAULT_PATH)) {
      const defaultContent = fs.readFileSync(CATEGORIES_DEFAULT_PATH, 'utf8');
      fs.writeFileSync(CATEGORIES_FILE_PATH, defaultContent, 'utf8');
      const parsed = JSON.parse(defaultContent || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading categories.json:', err.message);
  }
  return initialCategoriesData;
}

export function saveCategoriesToFile(categoriesArr) {
  try {
    const dir = path.dirname(CATEGORIES_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categoriesArr, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving categories.json:', err.message);
  }
}

export async function getAllCategories() {
  const fileCategories = readCategoriesFromFile();

  let dbCategories = [];
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');
    if (Array.isArray(rows) && rows.length > 0) {
      dbCategories = rows;
    }
  } catch (err) {}

  // Merge priority: MySQL (user edits) OVERRIDES JSON (stale defaults)
  if (dbCategories.length > 0) {
    let merged = [...dbCategories];
    fileCategories.forEach(fileCat => {
      const existsInDb = merged.some(c => String(c.id) === String(fileCat.id) || c.slug === fileCat.slug);
      if (!existsInDb) {
        merged.push(fileCat);
      }
    });
    return merged;
  }

  return fileCategories;
}
