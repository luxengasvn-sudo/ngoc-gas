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

export async function updateAllSettings(newSettings) {
  const reg = getCacheRegistry();
  const current = await getAllSettings();
  const updated = {
    ...current,
    ...newSettings
  };

  reg.settings = updated;
  saveToFile(updated);

  try {
    const keys = Object.keys(newSettings);
    for (const key of keys) {
      let val = newSettings[key];
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
