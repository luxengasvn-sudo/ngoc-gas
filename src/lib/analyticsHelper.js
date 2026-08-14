import fs from 'fs';
import path from 'path';
import db from './db.js';

const ANALYTICS_FILE_PATH = path.join(process.cwd(), 'data', 'analytics.json');

export function readAnalyticsFromFile() {
  try {
    const dir = path.dirname(ANALYTICS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(ANALYTICS_FILE_PATH)) {
      const content = fs.readFileSync(ANALYTICS_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading analytics.json:', err.message);
  }
  return [];
}

export function saveAnalyticsToFile(records) {
  try {
    const dir = path.dirname(ANALYTICS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(ANALYTICS_FILE_PATH, JSON.stringify(records, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving analytics.json:', err.message);
  }
}

export async function ensureAnalyticsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS analytics_clicks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        click_type VARCHAR(50) NOT NULL,
        click_target VARCHAR(255) NOT NULL,
        click_date DATE NOT NULL,
        click_count INT DEFAULT 1,
        UNIQUE KEY uq_click (click_type, click_target, click_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  } catch (err) {
    // DB offline warning handled gracefully
  }
}

export async function recordClick(clickType, clickTarget) {
  if (!clickType || !clickTarget) return;

  const tzOffset = 7 * 60; // mins
  const localTime = new Date(new Date().getTime() + tzOffset * 60 * 1000);
  const today = localTime.toISOString().slice(0, 10); // YYYY-MM-DD

  // 1. Record to JSON file immediately
  try {
    const all = readAnalyticsFromFile();
    const existingIndex = all.findIndex(
      r => r.click_type === clickType && r.click_target === clickTarget && r.click_date === today
    );

    if (existingIndex !== -1) {
      all[existingIndex].click_count = (all[existingIndex].click_count || 1) + 1;
    } else {
      all.push({
        click_type: clickType,
        click_target: clickTarget,
        click_date: today,
        click_count: 1
      });
    }

    saveAnalyticsToFile(all);
  } catch (fileErr) {
    console.error('Error saving click to file:', fileErr.message);
  }

  // 2. Sync to MySQL in background
  try {
    await ensureAnalyticsTable();
    await db.query(
      `INSERT INTO analytics_clicks (click_type, click_target, click_date, click_count) 
       VALUES (?, ?, ?, 1) 
       ON DUPLICATE KEY UPDATE click_count = click_count + 1`,
      [clickType, clickTarget, today]
    );
  } catch (dbErr) {
    // DB offline handled
  }
}

export async function getAnalyticsData() {
  let fileRecords = readAnalyticsFromFile();

  let dbSummary = null;
  let dbDaily = null;

  try {
    await ensureAnalyticsTable();

    const [summaryRows] = await db.query(`
      SELECT click_type, click_target, SUM(click_count) as total_clicks 
      FROM analytics_clicks 
      GROUP BY click_type, click_target 
      ORDER BY total_clicks DESC
    `);

    const [dailyRows] = await db.query(`
      SELECT DATE_FORMAT(click_date, '%Y-%m-%d') as click_date, SUM(click_count) as daily_clicks 
      FROM analytics_clicks 
      GROUP BY click_date 
      ORDER BY click_date DESC 
      LIMIT 15
    `);

    if (Array.isArray(summaryRows) && summaryRows.length > 0) {
      dbSummary = summaryRows;
    }
    if (Array.isArray(dailyRows) && dailyRows.length > 0) {
      dbDaily = dailyRows;
    }
  } catch (err) {
    // MySQL query failed or offline
  }

  // If DB results exist, merge or return
  if (dbSummary && dbDaily) {
    return {
      summary: dbSummary,
      daily: dbDaily
    };
  }

  // Otherwise calculate from fileRecords
  const summaryMap = {};
  const dailyMap = {};

  fileRecords.forEach(r => {
    const key = `${r.click_type}___${r.click_target}`;
    if (!summaryMap[key]) {
      summaryMap[key] = {
        click_type: r.click_type,
        click_target: r.click_target,
        total_clicks: 0
      };
    }
    summaryMap[key].total_clicks += Number(r.click_count || 1);

    const dKey = r.click_date;
    if (dKey) {
      dailyMap[dKey] = (dailyMap[dKey] || 0) + Number(r.click_count || 1);
    }
  });

  const summary = Object.values(summaryMap).sort((a, b) => b.total_clicks - a.total_clicks);
  const daily = Object.entries(dailyMap)
    .map(([click_date, daily_clicks]) => ({ click_date, daily_clicks }))
    .sort((a, b) => b.click_date.localeCompare(a.click_date))
    .slice(0, 15);

  return { summary, daily };
}
