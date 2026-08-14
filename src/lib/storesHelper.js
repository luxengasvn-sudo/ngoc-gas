import fs from 'fs';
import path from 'path';
import db from './db.js';

const STORES_FILE_PATH = path.join(process.cwd(), 'data', 'stores.json');

let memoryStoresCache = null;

const initialStoresData = [];

function readStoresFromFile() {
  try {
    const dir = path.dirname(STORES_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(STORES_FILE_PATH)) {
      const content = fs.readFileSync(STORES_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
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
  const sourceStores = readStoresFromFile();

  let dbStores = [];
  try {
    const [rows] = await db.query('SELECT * FROM stores ORDER BY created_at DESC');
    if (Array.isArray(rows) && rows.length > 0) {
      dbStores = rows;
    }
  } catch (err) {}

  let merged = [...sourceStores];

  if (dbStores.length > 0) {
    dbStores.forEach(dbItem => {
      const idx = merged.findIndex(s => String(s.id) === String(dbItem.id));
      if (idx === -1) {
        merged.push(dbItem);
      }
    });
  }

  memoryStoresCache = merged;
  return merged;
}

export async function getStoreById(id) {
  const all = await getAllStores();
  const found = all.find(s => String(s.id) === String(id));
  return found || null;
}

export async function createStoreData(storeFields) {
  let all = readStoresFromFile();
  const maxId = all.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0);
  const newId = maxId + 1;

  const newStore = {
    id: newId,
    name: storeFields.name,
    address: storeFields.address || '',
    phone: storeFields.phone || '19009396',
    hotline: storeFields.hotline || '19009396',
    image_url: storeFields.image_url || '/images/phoenix-do.png',
    map_embed_url: storeFields.map_embed_url || '',
    is_active: storeFields.is_active !== undefined ? (storeFields.is_active ? 1 : 0) : 1,
    created_at: new Date().toISOString()
  };

  all.unshift(newStore);
  memoryStoresCache = all;
  saveStoresToFile(all);

  try {
    await db.query(
      `INSERT INTO stores (name, address, phone, hotline, image_url, map_embed_url, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newStore.name,
        newStore.address,
        newStore.phone,
        newStore.hotline,
        newStore.image_url,
        newStore.map_embed_url,
        newStore.is_active
      ]
    );
  } catch (err) {}

  return newStore;
}

export async function updateStoreData(id, updateFields) {
  let all = readStoresFromFile();
  const index = all.findIndex(s => String(s.id) === String(id));

  let updatedStore = null;
  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updateFields
    };
    updatedStore = all[index];
  } else {
    const newId = Number(id) || Date.now();
    updatedStore = {
      id: newId,
      name: updateFields.name || 'Trạm Gas mới',
      address: updateFields.address || '',
      phone: updateFields.phone || '19009396',
      hotline: updateFields.hotline || '19009396',
      image_url: updateFields.image_url || '/images/phoenix-do.png',
      map_embed_url: updateFields.map_embed_url || '',
      is_active: updateFields.is_active !== undefined ? (updateFields.is_active ? 1 : 0) : 1,
      created_at: new Date().toISOString()
    };
    all.unshift(updatedStore);
  }

  memoryStoresCache = all;
  saveStoresToFile(all);

  try {
    await db.query(
      `UPDATE stores 
       SET name = ?, address = ?, phone = ?, hotline = ?, image_url = ?, map_embed_url = ?, is_active = ? 
       WHERE id = ?`,
      [
        updateFields.name,
        updateFields.address || '',
        updateFields.phone || '19009396',
        updateFields.hotline || '19009396',
        updateFields.image_url || '',
        updateFields.map_embed_url || '',
        updateFields.is_active ? 1 : 0,
        id
      ]
    );
  } catch (err) {}

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
