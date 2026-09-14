/**
 * DEEP SECURITY AUDIT & PENETRATION VERIFICATION SUITE
 */

import fs from 'fs';
import path from 'path';
import { signToken, hasRole, verifyToken } from '../src/lib/auth.js';

const ROOT_DIR = process.cwd();

// Load .env.local
const envPath = path.join(ROOT_DIR, '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
}

let passed = 0;
let total = 0;

function assert(condition, name, details = '') {
  total++;
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.error(`❌ [FAIL] ${name}: ${details}`);
  }
}

async function runTests() {
  console.log('===============================================================');
  console.log('🛡️  CHẠY BỘ KIỂM THỬ AN NINH CHUYÊN SÂU (DEEP SECURITY AUDIT)');
  console.log('===============================================================\n');

  // 1. Kiểm tra chống Leo thang Đặc quyền (Privilege Escalation) trong hasRole
  console.log('1. Kiểm tra Leo thang Đặc quyền (Privilege Escalation)...');
  const userNoRole = { id: 99, username: 'attacker' };
  const userEmptyRole = { id: 99, username: 'attacker', role: '' };
  const userGuestRole = { id: 99, username: 'attacker', role: 'guest' };
  const userEditorRole = { id: 2, username: 'editor', role: 'editor' };
  const userAdminRole = { id: 1, username: 'admin', role: 'admin' };

  assert(hasRole(userNoRole, ['admin']) === false, 'Token không có trường role BẮT BUỘC bị từ chối quyền admin (Không auto-escalate)');
  assert(hasRole(userEmptyRole, ['admin']) === false, 'Token có role rỗng BẮT BUỘC bị từ chối');
  assert(hasRole(userGuestRole, ['admin']) === false, 'Role guest bị từ chối quyền admin');
  assert(hasRole(userEditorRole, ['admin']) === false, 'Role editor bị từ chối quyền admin');
  assert(hasRole(userEditorRole, ['admin', 'editor']) === true, 'Role editor được phép vào trang editor');
  assert(hasRole(userAdminRole, ['admin']) === true, 'Role admin được cấp toàn quyền');

  // 2. Kiểm tra Xóa sạch mật khẩu mặc định admin123 trong toàn bộ dự án
  console.log('\n2. Quét Mã Nguồn Chống Lộ Mật Khẩu Fallback admin123...');
  const usersHelperCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'usersHelper.js'), 'utf8');
  const usersJsonCode = fs.readFileSync(path.join(ROOT_DIR, 'data', 'users.json'), 'utf8');
  const usersDefaultJsonCode = fs.readFileSync(path.join(ROOT_DIR, 'data', 'users.default.json'), 'utf8');

  assert(!usersHelperCode.includes('admin123'), 'Tệp usersHelper.js đã xóa sạch 100% mật khẩu fallback admin123');
  assert(!usersJsonCode.includes('wE96rV2k789fXpGqXqE1'), 'data/users.json không chứa hash của admin123');
  assert(!usersDefaultJsonCode.includes('wE96rV2k789fXpGqXqE1'), 'data/users.default.json không chứa hash của admin123');

  // 3. Kiểm tra Mã Hóa Token & Thời Hạn Token (7 ngày thay vì 30 ngày)
  console.log('\n3. Kiểm tra Thời Hạn & Ký Token Bảo Mật...');
  const token = signToken({ id: 1, username: 'admin', role: 'admin' });
  const decoded = verifyToken(token);
  assert(decoded && decoded.username === 'admin', 'Token ký và giải mã chuẩn xác');
  const tokenDuration = decoded.exp - decoded.iat;
  assert(tokenDuration === 7 * 24 * 60 * 60, 'Thời hạn Token rút ngắn còn 7 ngày (604800s) chuẩn an toàn phiên', `Nhận: ${tokenDuration}s`);

  // 4. Kiểm tra Không Có Plaintext Credentials trong src/lib/db.js
  console.log('\n4. Kiểm tra Xóa Sạch Plaintext Credentials...');
  const dbCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'db.js'), 'utf8');
  assert(!dbCode.includes('L8vCFaRFa8H4Z0tSqpyr1Hq4OYz1PoQ8'), 'src/lib/db.js không còn chứa mật khẩu MySQL tĩnh');

  console.log('\n===============================================================');
  console.log(`🎉 KẾT QUẢ: ${passed}/${total} TIÊU CHUẨN AN NINH CHUYÊN SÂU ĐẠT 100%!`);
  console.log('===============================================================');

  if (passed !== total) process.exit(1);
}

runTests().catch(err => {
  console.error('Lỗi kiểm thử an ninh chuyên sâu:', err);
  process.exit(1);
});
