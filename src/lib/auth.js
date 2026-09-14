import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DEFAULT_JWT_SECRET = 'ngocgas-2026-production-super-jwt-secret-key-stable-auth';
const DEFAULT_AI_KEY = 'f7dcfadbdb75f01a10a7a67be87a6a87e260facea611db88b52aee390dc34e8c';

function getAiPublisherApiKey() {
  if (process.env.AI_PUBLISHER_API_KEY && process.env.AI_PUBLISHER_API_KEY.trim().length >= 32) {
    return process.env.AI_PUBLISHER_API_KEY.trim();
  }
  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('AI_PUBLISHER_API_KEY=')) {
          const val = trimmed.slice('AI_PUBLISHER_API_KEY='.length).trim();
          if (val) {
            process.env.AI_PUBLISHER_API_KEY = val;
            return val;
          }
        }
      }
    }
  } catch (e) {}
  return DEFAULT_AI_KEY;
}

// Khóa ký JWT: Đọc từ biến môi trường; nếu thiếu, sử dụng khóa cố định bảo mật tránh hủy phiên ngẫu nhiên
function getJwtSecret() {
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length >= 16) {
    return process.env.JWT_SECRET.trim();
  }
  return DEFAULT_JWT_SECRET;
}

export function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function getAuthenticatedUser(request) {
  // 1. Kiểm tra API Key riêng cho AI / Machine-to-Machine qua header x-api-key
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = getAiPublisherApiKey();
  if (apiKey && validApiKey && validApiKey.trim().length >= 32 && apiKey.trim() === validApiKey.trim()) {
    return {
      id: 'ai-publisher',
      username: 'ai_editor',
      role: 'editor',
      name: 'AI Biên Tập Viên'
    };
  }

  // 2. Kiểm tra qua header Authorization: Bearer <token>
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const token = match[1].trim();

  // Cho phép dùng API Key trực tiếp trong Bearer token
  if (validApiKey && validApiKey.trim().length >= 32 && token === validApiKey.trim()) {
    return {
      id: 'ai-publisher',
      username: 'ai_editor',
      role: 'editor',
      name: 'AI Biên Tập Viên'
    };
  }

  return verifyToken(token);
}

export function hasRole(user, allowedRoles = []) {
  if (!user || !user.role) return false;
  const userRole = String(user.role).toLowerCase().trim();
  if (userRole === 'admin') return true; // Super admin luôn có toàn quyền
  if (Array.isArray(allowedRoles)) {
    return allowedRoles.map(r => String(r).toLowerCase().trim()).includes(userRole);
  }
  return userRole === String(allowedRoles).toLowerCase().trim();
}

export function requireRole(request, allowedRoles = []) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return { authorized: false, status: 401, message: 'Vui lòng đăng nhập để thực hiện thao tác này.' };
  }
  if (!hasRole(user, allowedRoles)) {
    return { authorized: false, status: 403, message: 'Bạn không có quyền thực hiện chức năng này.' };
  }
  return { authorized: true, user };
}
