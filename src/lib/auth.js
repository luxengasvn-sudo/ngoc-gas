import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'ngoc-gas-secret-key-2026';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
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
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}

export function hasRole(user, allowedRoles = []) {
  if (!user) return false;
  const userRole = user.role || 'admin';
  if (userRole === 'admin') return true; // Super admin always has full access
  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(userRole);
  }
  return userRole === allowedRoles;
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
