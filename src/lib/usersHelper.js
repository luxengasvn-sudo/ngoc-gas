import fs from 'fs';
import path from 'path';
import db from './db.js';
import bcrypt from 'bcryptjs';

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

let memoryUsersCache = null;

const defaultUsersData = [
  {
    id: 1,
    username: 'admin',
    password_hash: '$2a$10$wE96rV2k789fXpGqXqE1.eHk3kIuB7v8rF0hRzQ9qY8gV3jO5m8eW', // admin123
    display_name: 'Quản trị viên Ngọc Gas',
    role: 'admin',
    is_active: 1,
    created_at: new Date().toISOString()
  }
];

function readUsersFromFile() {
  try {
    const dir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(USERS_FILE_PATH)) {
      const content = fs.readFileSync(USERS_FILE_PATH, 'utf8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Notice reading users.json:', err.message);
    }
  }
  return defaultUsersData;
}

function saveUsersToFile(usersArr) {
  try {
    const dir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(usersArr, null, 2), 'utf8');
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Notice saving users.json:', err.message);
    }
  }
}

export async function getAllUsers() {
  const fileUsers = readUsersFromFile();

  let dbUsers = [];
  try {
    const [rows] = await db.query('SELECT * FROM admin_users ORDER BY id ASC');
    if (Array.isArray(rows) && rows.length > 0) {
      dbUsers = rows;
    }
  } catch (err) {}

  let merged = [...fileUsers];

  if (dbUsers.length > 0) {
    dbUsers.forEach(dbItem => {
      const idx = merged.findIndex(u => String(u.id) === String(dbItem.id) || u.username === dbItem.username);
      if (idx !== -1) {
        merged[idx] = { ...merged[idx], ...dbItem };
      } else {
        merged.push(dbItem);
      }
    });
  }

  // Ensure main admin account is always present
  if (!merged.some(u => u.username === 'admin')) {
    merged.unshift(defaultUsersData[0]);
  }

  memoryUsersCache = merged;
  return merged;
}

export async function getUserByUsername(username) {
  const all = await getAllUsers();
  const lower = String(username || '').toLowerCase().trim();
  return all.find(u => String(u.username || '').toLowerCase() === lower) || null;
}

export async function getUserById(id) {
  const all = await getAllUsers();
  return all.find(u => String(u.id) === String(id)) || null;
}

export async function createUserData({ username, password_hash, display_name, role = 'editor', is_active = 1 }) {
  let all = await getAllUsers();
  const maxId = all.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0);
  const newId = maxId + 1;

  const newUser = {
    id: newId,
    username: username.toLowerCase().trim(),
    password_hash,
    display_name,
    role: role || 'editor',
    is_active: is_active !== undefined ? (is_active ? 1 : 0) : 1,
    created_at: new Date().toISOString()
  };

  all.push(newUser);
  memoryUsersCache = all;
  saveUsersToFile(all);

  try {
    await db.query(
      `INSERT INTO admin_users (username, password_hash, display_name, role, is_active) 
       VALUES (?, ?, ?, ?, ?)`,
      [newUser.username, newUser.password_hash, newUser.display_name, newUser.role, newUser.is_active]
    );
  } catch (err) {}

  return newUser;
}

export async function updateUserData(id, updateFields) {
  let all = await getAllUsers();
  const index = all.findIndex(u => String(u.id) === String(id));

  let updatedUser = null;
  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updateFields
    };
    updatedUser = all[index];
  } else {
    return null;
  }

  memoryUsersCache = all;
  saveUsersToFile(all);

  try {
    const updates = [];
    const values = [];

    if (updateFields.display_name !== undefined) {
      updates.push('display_name = ?');
      values.push(updateFields.display_name);
    }
    if (updateFields.role !== undefined) {
      updates.push('role = ?');
      values.push(updateFields.role);
    }
    if (updateFields.is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(updateFields.is_active ? 1 : 0);
    }
    if (updateFields.password_hash !== undefined) {
      updates.push('password_hash = ?');
      values.push(updateFields.password_hash);
    }

    if (updates.length > 0) {
      values.push(id);
      await db.query(`UPDATE admin_users SET ${updates.join(', ')} WHERE id = ?`, values);
    }
  } catch (err) {}

  return updatedUser;
}

export async function deleteUserData(id) {
  let all = await getAllUsers();
  all = all.filter(u => String(u.id) !== String(id));

  memoryUsersCache = all;
  saveUsersToFile(all);

  try {
    await db.query('DELETE FROM admin_users WHERE id = ?', [id]);
  } catch (err) {}

  return true;
}
