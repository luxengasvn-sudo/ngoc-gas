import fs from 'fs';
import path from 'path';
import db from './db';

const SETTINGS_FILE_PATH = path.join(process.cwd(), 'data', 'settings.json');

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

const ALL_SECTIONS = ["gas-price-widget", "intro-features", "featured-products", "stats-counter", "latest-news", "cta-section"];

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

export async function getAllSettings() {
  const fileSettings = readFromFile();
  let dbSettings = {};

  try {
    const [rows] = await db.query('SELECT setting_key, setting_value FROM settings');
    if (Array.isArray(rows)) {
      rows.forEach(row => {
        dbSettings[row.setting_key] = row.setting_value;
      });
    }
  } catch (err) {
    // MySQL query failed or not available - use file & memory fallback
  }

  // Critical fix: dbSettings first, then fileSettings, then memoryCache.
  // File & memory cache contain the latest Admin saves and MUST overwrite stale MySQL rows!
  const merged = {
    ...dbSettings,
    ...fileSettings,
    ...(memoryCache || {})
  };

  memoryCache = merged;
  return merged;
}

export async function updateAllSettings(newSettings) {
  const current = await getAllSettings();
  const updated = {
    ...current,
    ...newSettings
  };

  memoryCache = updated;
  saveToFile(updated);

  try {
    const keys = Object.keys(newSettings);
    for (const key of keys) {
      const val = String(newSettings[key] ?? '');
      await db.query(
        `INSERT INTO settings (setting_key, setting_value) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [key, val, val]
      );
    }
  } catch (err) {
    console.error('Warning: Could not sync settings to MySQL DB:', err.message);
  }

  return updated;
}
