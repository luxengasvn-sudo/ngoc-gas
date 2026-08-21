import fs from 'fs';
import path from 'path';
import db from './db.js';

const SETTINGS_FILE_PATH = path.join(process.cwd(), 'data', 'settings.json');
const SETTINGS_DEFAULT_PATH = path.join(process.cwd(), 'data', 'settings.default.json');

let memoryCache = null;

function ensureDataDir() {
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error('Error ensuring data dir:', err.message);
  }
}

function readFromFile() {
  try {
    ensureDataDir();
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const content = fs.readFileSync(SETTINGS_FILE_PATH, 'utf8');
      return JSON.parse(content || '{}');
    }
    // Fallback: copy from .default.json if main file doesn't exist
    if (fs.existsSync(SETTINGS_DEFAULT_PATH)) {
      const defaultContent = fs.readFileSync(SETTINGS_DEFAULT_PATH, 'utf8');
      fs.writeFileSync(SETTINGS_FILE_PATH, defaultContent, 'utf8');
      return JSON.parse(defaultContent || '{}');
    }
  } catch (err) {
    console.error('Error reading settings.json:', err.message);
  }
  return {};
}

function saveToFile(settingsObj) {
  try {
    ensureDataDir();
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settingsObj, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving settings.json:', err.message);
  }
}

const ALL_SECTIONS = ["gas-price-widget", "featured-products", "intro-features", "stats-counter", "latest-news", "cta-section"];

export const DEFAULT_HEADER_MENU = [
  { id: "m1", name: "Trang chủ", path: "/", is_active: true },
  { id: "m2", name: "Giới thiệu", path: "/gioi-thieu", is_active: true },
  { id: "m3", name: "Sản phẩm", path: "/san-pham", is_active: true },
  { id: "m4", name: "Bảng Giá Gas", path: "/gia-gas-hom-nay", is_active: true },
  { id: "m5", name: "Cửa hàng", path: "/cua-hang", is_active: true },
  { id: "m6", name: "Tin tức", path: "/tin-tuc", is_active: true },
  { id: "m7", name: "Liên hệ", path: "/lien-he", is_active: true }
];

export const DEFAULT_MOBILE_BOTTOM_NAV = [
  { id: "b1", name: "Trang chủ", path: "/", icon: "Home", is_active: true },
  { id: "b2", name: "Sản phẩm", path: "/san-pham", icon: "ShoppingBag", is_active: true },
  { id: "b3", name: "Cửa hàng", path: "/cua-hang", icon: "Store", is_active: true },
  { id: "b4", name: "Giá gas", path: "/gia-gas-hom-nay", icon: "TrendingUp", is_active: true },
  { id: "b5", name: "Tin tức", path: "/tin-tuc", icon: "BookOpen", is_active: false },
  { id: "b6", name: "Giới thiệu", path: "/gioi-thieu", icon: "Users", is_active: false }
];

export function parseHeaderMenu(jsonStrOrArr) {
  if (Array.isArray(jsonStrOrArr)) return jsonStrOrArr;
  try {
    const parsed = JSON.parse(jsonStrOrArr || '[]');
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {}
  return [...DEFAULT_HEADER_MENU];
}

export function parseMobileBottomNav(jsonStrOrArr) {
  if (Array.isArray(jsonStrOrArr)) return jsonStrOrArr;
  try {
    const parsed = JSON.parse(jsonStrOrArr || '[]');
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {}
  return [...DEFAULT_MOBILE_BOTTOM_NAV];
}

export function parseSectionOrder(jsonStr) {
  let order = [];
  try {
    order = JSON.parse(jsonStr || '[]');
  } catch (e) {
    order = [];
  }

  if (!Array.isArray(order) || order.length === 0) {
    return [...ALL_SECTIONS];
  }

  // Preserve user's EXACT order for all valid sections
  const validOrder = order.filter(id => ALL_SECTIONS.includes(id));

  // Append any unmentioned sections to the end
  ALL_SECTIONS.forEach(id => {
    if (!validOrder.includes(id)) {
      validOrder.push(id);
    }
  });

  return validOrder;
}

import { getCacheRegistry } from './cacheManager.js';

export async function getAllSettings() {
  const reg = getCacheRegistry();
  const fileSettings = readFromFile();
  let dbSettings = {};

  try {
    const [rows] = await db.query('SELECT setting_key, setting_value FROM settings');
    if (Array.isArray(rows)) {
      rows.forEach(row => {
        if (row.setting_value !== null && row.setting_value !== undefined) {
          dbSettings[row.setting_key] = row.setting_value;
        }
      });
    }
  } catch (err) {
    // MySQL query failed or not available - use file & memory fallback
  }

  // Merge priority: memoryCache baseline -> fileSettings -> dbSettings (MySQL has highest priority)
  const merged = {
    ...(reg.settings || {}),
    ...fileSettings,
    ...dbSettings
  };

  // Safe preset fallbacks for Logo & Favicon if user has not set them in DB
  if (!merged.logo_url) {
    merged.logo_url = '/uploads/1784860325667-878483593.png';
  }
  if (!merged.favicon_url) {
    merged.favicon_url = '/uploads/1784803415314-250976074.png';
  }

  if (!merged.header_menu_items) {
    merged.header_menu_items = JSON.stringify(DEFAULT_HEADER_MENU);
  }
  if (!merged.mobile_bottom_menu_items) {
    merged.mobile_bottom_menu_items = JSON.stringify(DEFAULT_MOBILE_BOTTOM_NAV);
  }

  reg.settings = merged;
  return merged;
}

const SNAPSHOTS_DIR = path.join(process.cwd(), 'data', 'snapshots');

function ensureSnapshotsDir() {
  try {
    if (!fs.existsSync(SNAPSHOTS_DIR)) {
      fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Error ensuring snapshots dir:', err.message);
  }
}

export function saveSettingsSnapshot(currentSettings, note = 'auto-save') {
  try {
    ensureSnapshotsDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const snapshotFile = path.join(SNAPSHOTS_DIR, `settings_${timestamp}.json`);
    const snapshotData = {
      timestamp: new Date().toISOString(),
      note,
      data: currentSettings
    };
    fs.writeFileSync(snapshotFile, JSON.stringify(snapshotData, null, 2), 'utf8');

    // Keep only last 30 snapshots
    const files = fs.readdirSync(SNAPSHOTS_DIR)
      .filter(f => f.startsWith('settings_') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (files.length > 30) {
      for (let i = 30; i < files.length; i++) {
        try {
          fs.unlinkSync(path.join(SNAPSHOTS_DIR, files[i]));
        } catch (e) {}
      }
    }
    return snapshotFile;
  } catch (err) {
    console.error('Error saving settings snapshot:', err.message);
    return null;
  }
}

export function getSettingsSnapshots() {
  try {
    ensureSnapshotsDir();
    const files = fs.readdirSync(SNAPSHOTS_DIR)
      .filter(f => f.startsWith('settings_') && f.endsWith('.json'))
      .sort()
      .reverse();

    return files.slice(0, 20).map(file => {
      try {
        const content = fs.readFileSync(path.join(SNAPSHOTS_DIR, file), 'utf8');
        const parsed = JSON.parse(content);
        return {
          filename: file,
          timestamp: parsed.timestamp,
          note: parsed.note || 'Tự động sao lưu'
        };
      } catch (e) {
        return { filename: file, timestamp: file, note: 'Bản sao lưu' };
      }
    });
  } catch (err) {
    return [];
  }
}

export async function restoreSettingsSnapshot(filename) {
  try {
    ensureSnapshotsDir();
    const safeFile = path.basename(filename);
    const fullPath = path.join(SNAPSHOTS_DIR, safeFile);
    if (!fs.existsSync(fullPath)) {
      return { success: false, message: 'Không tìm thấy tệp sao lưu' };
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const parsed = JSON.parse(content);
    if (parsed && parsed.data) {
      const restored = await updateAllSettings(parsed.data);
      return { success: true, message: 'Khôi phục bản sao lưu thành công!', data: restored };
    }
    return { success: false, message: 'Dữ liệu sao lưu không hợp lệ' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function updateAllSettings(newSettings) {
  const reg = getCacheRegistry();
  const current = await getAllSettings();

  // 1. Auto-backup snapshot before writing new changes
  saveSettingsSnapshot(current, 'Trước khi cập nhật cài đặt');

  // 2. Atomic merge: only override keys explicitly provided and not undefined
  const updated = { ...current };
  const keysToUpdate = [];

  for (const key of Object.keys(newSettings || {})) {
    const val = newSettings[key];
    if (val !== undefined) {
      updated[key] = val;
      keysToUpdate.push(key);
    }
  }

  reg.settings = updated;
  saveToFile(updated);

  try {
    for (const key of keysToUpdate) {
      let val = updated[key];
      if (val !== undefined) {
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        await db.query(
          `INSERT INTO settings (setting_key, setting_value) 
           VALUES (?, ?) 
           ON DUPLICATE KEY UPDATE setting_value = ?`,
          [key, String(val), String(val)]
        );
      }
    }
  } catch (err) {
    // MySQL write failed - file storage was saved
  }

  return updated;
}

