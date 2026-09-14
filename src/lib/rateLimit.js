/**
 * ULTRA-LIGHTWEIGHT IN-MEMORY RATE LIMITER
 * Bảo vệ chống tấn công Brute-Force, Credential Stuffing và DoS Flood
 */

const rateLimitStore = new Map();

// Tự động dọn dẹp các bản ghi hết hạn mỗi 5 phút
if (!global.__rateLimitCleanupTimer) {
  global.__rateLimitCleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
  
  if (global.__rateLimitCleanupTimer.unref) {
    global.__rateLimitCleanupTimer.unref();
  }
}

/**
 * Kiểm tra giới hạn tần suất gọi
 * @param {string} identifier - Địa chỉ IP hoặc ID người dùng
 * @param {string} action - Tên hành động (vd: 'login', 'contact', 'upload')
 * @param {number} maxAttempts - Số lần thử tối đa trong chu kỳ (vd: 5 lần)
 * @param {number} windowMs - Chu kỳ thời gian tính bằng milliseconds (vd: 15 * 60 * 1000)
 * @returns {{ allowed: boolean, remaining: number, resetTime: number, retryAfterSec: number }}
 */
export function checkRateLimit(identifier, action = 'default', maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const key = `${action}:${identifier || 'unknown'}`;
  const now = Date.now();
  let record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + windowMs
    };
    rateLimitStore.set(key, record);
  }

  const allowed = record.count < maxAttempts;
  const remaining = Math.max(0, maxAttempts - record.count);
  const retryAfterSec = Math.ceil((record.resetTime - now) / 1000);

  return {
    allowed,
    remaining,
    resetTime: record.resetTime,
    retryAfterSec: Math.max(1, retryAfterSec)
  };
}

/**
 * Ghi nhận một lần thử không thành công
 */
export function recordRateLimitAttempt(identifier, action = 'default', windowMs = 15 * 60 * 1000) {
  const key = `${action}:${identifier || 'unknown'}`;
  const now = Date.now();
  let record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs
    };
  } else {
    record.count += 1;
  }

  rateLimitStore.set(key, record);
  return record.count;
}

/**
 * Xóa bản ghi giới hạn khi thao tác thành công (vd: đăng nhập đúng)
 */
export function resetRateLimit(identifier, action = 'default') {
  const key = `${action}:${identifier || 'unknown'}`;
  rateLimitStore.delete(key);
}

/**
 * Lấy địa chỉ IP của Client từ Request Next.js
 */
export function getClientIp(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
      return realIp.trim();
    }
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    if (cfConnectingIp) {
      return cfConnectingIp.trim();
    }
  } catch (e) {}
  return '127.0.0.1';
}
