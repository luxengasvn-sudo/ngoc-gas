import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

let cachedToken = null;
let tokenExpiresAt = 0;

/**
 * Tạo JWT ký bằng Private Key của Service Account Google
 */
function createSignedJwt(serviceAccount) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64UrlEncode = (str) => {
    return Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const signature = signer.sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${signingInput}.${signature}`;
}

/**
 * Lấy Access Token từ Google OAuth2 (có cache đến khi hết hạn)
 */
async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 60) {
    return cachedToken;
  }

  const jwt = createSignedJwt(serviceAccount);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Google OAuth2 error: ${JSON.stringify(data)}`);
  }

  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 3600);
  return cachedToken;
}

/**
 * Gửi thông báo URL tới Google Indexing API (URL_UPDATED hoặc URL_DELETED)
 * @param {string} rawUrl - URL đầy đủ hoặc slug bài viết
 * @param {'URL_UPDATED' | 'URL_DELETED'} type - Loại thông báo
 */
export async function notifyGoogleIndex(rawUrl, type = 'URL_UPDATED') {
  if (!rawUrl) return { success: false, error: 'URL không được để trống' };

  const url = rawUrl.startsWith('http') 
    ? rawUrl 
    : `https://ngocgas.com/tin-tuc/${rawUrl.replace(/^\/+/, '')}`;

  const keyPath = path.join(process.cwd(), 'data', 'service-account.json');
  if (!fs.existsSync(keyPath)) {
    console.warn('⚠️ [Google Indexing API] Bỏ qua: Không tìm thấy data/service-account.json');
    return { success: false, error: 'Missing service-account.json' };
  }

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    if (!serviceAccount.client_email || !serviceAccount.private_key) {
      console.warn('⚠️ [Google Indexing API] Khóa Service Account không hợp lệ');
      return { success: false, error: 'Invalid service account file' };
    }

    const accessToken = await getAccessToken(serviceAccount);
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ url, type })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(`⚠️ [Google Indexing API] Thất bại (${res.status}):`, data);
      return { success: false, error: data };
    }

    console.log(`✅ [Google Indexing API] Thành công (${type}):`, data.urlNotificationMetadata?.latestUpdate?.url || url);
    return { success: true, data };
  } catch (err) {
    console.error(`❌ [Google Indexing API] Lỗi:`, err.message);
    return { success: false, error: err.message };
  }
}
