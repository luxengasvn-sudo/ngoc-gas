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

  const merged = {
    ...fileSettings,
    ...dbSettings,
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
