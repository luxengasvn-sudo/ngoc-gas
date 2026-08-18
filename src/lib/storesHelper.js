import fs from 'fs';
import path from 'path';
import db from './db.js';

const STORES_FILE_PATH = path.join(process.cwd(), 'data', 'stores.json');
const STORES_DEFAULT_PATH = path.join(process.cwd(), 'data', 'stores.default.json');

let memoryStoresCache = null;

const initialStoresData = [];

export const DEFAULT_STORE_GUIDE = `- Cân đủ 12kg tại chỗ: Nhân viên mang theo cân điện tử kiểm tra trước mặt khách hàng.
- Chính hãng 100%: Phân phối độc quyền Sopet Vil, Phoenix Gas, Luxen Gas có tem niêm phong chống giả.
- Kiểm tra an toàn miễn phí: Miễn phí vệ sinh mâm lửa, kiểm tra rò rỉ van gas và dây dẫn mỗi lần giao.
- Tích điểm quà tặng: Tích lũy điểm đổi quà van ngắt tự động, dây chống chuột, nước rửa chén cao cấp.`;

export function slugify(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

function readStoresFromFile() {
  try {
    const dir = path.dirname(STORES_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(STORES_FILE_PATH)) {
      const content = fs.readFileSync(STORES_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    // Fallback: copy from .default.json if main file doesn't exist
    if (fs.existsSync(STORES_DEFAULT_PATH)) {
      const defaultContent = fs.readFileSync(STORES_DEFAULT_PATH, 'utf8');
      fs.writeFileSync(STORES_FILE_PATH, defaultContent, 'utf8');
      const parsed = JSON.parse(defaultContent || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Error reading stores.json:', err.message);
  }
  return initialStoresData;
}

function saveStoresToFile(storesArr) {
  try {
    const dir = path.dirname(STORES_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STORES_FILE_PATH, JSON.stringify(storesArr, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving stores.json:', err.message);
  }
}

export async function getAllStores() {
  const fileStores = readStoresFromFile();

  let dbStores = [];
  try {
    const [rows] = await db.query('SELECT * FROM stores ORDER BY created_at DESC');
    if (Array.isArray(rows) && rows.length > 0) {
      dbStores = rows;
    }
  } catch (err) {}

  // Merge priority: MySQL (user edits) OVERRIDES JSON (stale defaults)
  let merged;
  if (dbStores.length > 0) {
    merged = [...dbStores];
    // Add any file-only stores that don't exist in DB
    fileStores.forEach(fileStore => {
      const existsInDb = merged.some(s => String(s.id) === String(fileStore.id));
      if (!existsInDb) {
        merged.push(fileStore);
      }
    });
  } else {
    merged = [...fileStores];
  }

  // Ensure each store has slug, url, working_hours, delivery_areas fields
  const enriched = merged.map(store => {
    const safeSlug = store.slug || slugify(store.name) || `chi-nhanh-${store.id}`;
    return {
      ...store,
      slug: safeSlug,
      fanpage_url: store.fanpage_url || '',
      google_map_url: store.google_map_url || '',
      map_embed: store.map_embed || store.map_embed_url || '',
      working_hours: store.working_hours || '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)',
      delivery_time: store.delivery_time || '10 - 15 phút',
      delivery_areas: store.delivery_areas || '',
      guide_content: store.guide_content && store.guide_content.trim() !== '' ? store.guide_content : DEFAULT_STORE_GUIDE
    };
  });

  memoryStoresCache = enriched;
  return enriched;
}

export async function getStoreById(id) {
  const all = await getAllStores();
  const found = all.find(s => String(s.id) === String(id));
  return found || null;
}

export async function getStoreBySlug(slug) {
  const all = await getAllStores();
  const cleanSlug = String(slug).trim().toLowerCase();
  const found = all.find(s => 
    String(s.slug || '').toLowerCase() === cleanSlug || 
    slugify(s.name) === cleanSlug || 
    String(s.id) === cleanSlug
  );
  return found || null;
}

export async function createStoreData(storeFields) {
  let all = readStoresFromFile();
  const maxId = all.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0);
  const newId = maxId + 1;

  const safeSlug = storeFields.slug ? slugify(storeFields.slug) : slugify(storeFields.name || `chi-nhanh-${newId}`);

  const newStore = {
    id: newId,
    name: storeFields.name,
    slug: safeSlug,
    address: storeFields.address || '',
    phone: storeFields.phone || '19009396',
    hotline: storeFields.hotline || storeFields.phone || '19009396',
    image_url: storeFields.image_url || '/images/phoenix-do.png',
    map_embed: storeFields.map_embed || storeFields.map_embed_url || '',
    fanpage_url: storeFields.fanpage_url || '',
    google_map_url: storeFields.google_map_url || '',
    working_hours: storeFields.working_hours || '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)',
    delivery_time: storeFields.delivery_time || '10 - 15 phút',
    delivery_areas: storeFields.delivery_areas || '',
    guide_content: storeFields.guide_content || DEFAULT_STORE_GUIDE,
    store_phones: typeof storeFields.store_phones === 'string' ? storeFields.store_phones : JSON.stringify(storeFields.store_phones || []),
    delivery_phones: typeof storeFields.delivery_phones === 'string' ? storeFields.delivery_phones : JSON.stringify(storeFields.delivery_phones || []),
    is_active: storeFields.is_active !== undefined ? (storeFields.is_active ? 1 : 0) : 1,
    created_at: new Date().toISOString()
  };

  all.unshift(newStore);
  memoryStoresCache = all;
  saveStoresToFile(all);

  try {
    await db.query(
      `INSERT INTO stores (name, slug, address, phone, image_url, map_embed, fanpage_url, google_map_url, working_hours, delivery_time, delivery_areas, guide_content, store_phones, delivery_phones, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newStore.name,
        newStore.slug,
        newStore.address,
        newStore.phone,
        newStore.image_url,
        newStore.map_embed,
        newStore.fanpage_url,
        newStore.google_map_url,
        newStore.working_hours,
        newStore.delivery_time,
        newStore.delivery_areas,
        newStore.guide_content,
        newStore.store_phones,
        newStore.delivery_phones,
        newStore.is_active
      ]
    );
  } catch (err) {
    try {
      await db.query(
        `INSERT INTO stores (name, slug, address, phone, image_url, map_embed, fanpage_url, google_map_url, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newStore.name,
          newStore.slug,
          newStore.address,
          newStore.phone,
          newStore.image_url,
          newStore.map_embed,
          newStore.fanpage_url,
          newStore.google_map_url,
          newStore.is_active
        ]
      );
    } catch (e2) {}
  }

  return newStore;
}

export async function updateStoreData(id, updateFields) {
  let all = readStoresFromFile();
  const index = all.findIndex(s => String(s.id) === String(id));

  const safeSlug = updateFields.slug ? slugify(updateFields.slug) : slugify(updateFields.name || `chi-nhanh-${id}`);

  let updatedStore = null;
  const storeData = {
    name: updateFields.name || 'Trạm Gas mới',
    slug: safeSlug,
    address: updateFields.address || '',
    phone: updateFields.phone || '19009396',
    hotline: updateFields.hotline || updateFields.phone || '19009396',
    image_url: updateFields.image_url || '/images/phoenix-do.png',
    map_embed: updateFields.map_embed || updateFields.map_embed_url || '',
    fanpage_url: updateFields.fanpage_url || '',
    google_map_url: updateFields.google_map_url || '',
    working_hours: updateFields.working_hours || '06:00 - 21:30 (Phục vụ cả Chủ Nhật & Ngày Lễ)',
    delivery_time: updateFields.delivery_time || '10 - 15 phút',
    delivery_areas: updateFields.delivery_areas || '',
    guide_content: updateFields.guide_content || DEFAULT_STORE_GUIDE,
    store_phones: typeof updateFields.store_phones === 'string' ? updateFields.store_phones : JSON.stringify(updateFields.store_phones || []),
    delivery_phones: typeof updateFields.delivery_phones === 'string' ? updateFields.delivery_phones : JSON.stringify(updateFields.delivery_phones || []),
    is_active: updateFields.is_active !== undefined ? (updateFields.is_active ? 1 : 0) : 1
  };

  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...storeData
    };
    updatedStore = all[index];
  } else {
    const newId = Number(id) || Date.now();
    updatedStore = {
      id: newId,
      ...storeData,
      created_at: new Date().toISOString()
    };
    all.unshift(updatedStore);
  }

  memoryStoresCache = all;
  saveStoresToFile(all);

  try {
    await db.query(
      `UPDATE stores 
       SET name = ?, slug = ?, address = ?, phone = ?, image_url = ?, map_embed = ?, fanpage_url = ?, google_map_url = ?, working_hours = ?, delivery_time = ?, delivery_areas = ?, guide_content = ?, store_phones = ?, delivery_phones = ?, is_active = ? 
       WHERE id = ?`,
      [
        updatedStore.name,
        updatedStore.slug,
        updatedStore.address,
        updatedStore.phone,
        updatedStore.image_url,
        updatedStore.map_embed,
        updatedStore.fanpage_url,
        updatedStore.google_map_url,
        updatedStore.working_hours,
        updatedStore.delivery_time,
        updatedStore.delivery_areas,
        updatedStore.guide_content,
        updatedStore.store_phones,
        updatedStore.delivery_phones,
        updatedStore.is_active ? 1 : 0,
        id
      ]
    );
  } catch (err) {
    try {
      await db.query(
        `UPDATE stores 
         SET name = ?, slug = ?, address = ?, phone = ?, image_url = ?, map_embed = ?, fanpage_url = ?, google_map_url = ?, is_active = ? 
         WHERE id = ?`,
        [
          updatedStore.name,
          updatedStore.slug,
          updatedStore.address,
          updatedStore.phone,
          updatedStore.image_url,
          updatedStore.map_embed,
          updatedStore.fanpage_url,
          updatedStore.google_map_url,
          updatedStore.is_active ? 1 : 0,
          id
        ]
      );
    } catch (e2) {}
  }

  return updatedStore;
}

export async function deleteStoreData(id) {
  let all = readStoresFromFile();
  all = all.filter(s => String(s.id) !== String(id));

  memoryStoresCache = all;
  saveStoresToFile(all);

  try {
    await db.query('DELETE FROM stores WHERE id = ?', [id]);
  } catch (err) {}

  return true;
}
