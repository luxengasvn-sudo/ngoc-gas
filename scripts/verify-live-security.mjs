/**
 * VERIFY REAL HTTP SECURITY HEADERS & ENDPOINTS
 */

const BASE_URL = 'http://localhost:3005';

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

async function main() {
  console.log('===============================================================');
  console.log('🛡️  CHẠY BỘ KIỂM THỬ BẢO MẬT THỰC TẾ TRÊN MÁY CHỦ HTTP PORT 3005');
  console.log('===============================================================\n');

  // 1. Kiểm tra OWASP Security Headers
  console.log('1. Kiểm tra Security Headers...');
  try {
    const homeRes = await fetch(`${BASE_URL}/`);
    const xFrame = homeRes.headers.get('x-frame-options');
    const xContent = homeRes.headers.get('x-content-type-options');
    const referrer = homeRes.headers.get('referrer-policy');

    assert(xFrame === 'SAMEORIGIN', 'Header X-Frame-Options: SAMEORIGIN', `Nhận: ${xFrame}`);
    assert(xContent === 'nosniff', 'Header X-Content-Type-Options: nosniff', `Nhận: ${xContent}`);
    assert(referrer === 'strict-origin-when-cross-origin', 'Header Referrer-Policy: strict-origin-when-cross-origin', `Nhận: ${referrer}`);
  } catch (err) {
    assert(false, 'Kết nối server port 3005', err.message);
  }

  // 2. Kiểm tra Backdoor đã bị đóng
  console.log('\n2. Kiểm tra Xóa bỏ Cửa sau Đăng nhập (Backdoor Elimination)...');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '192.168.1.50'
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'wrong_password_test_backdoor_closed'
    })
  });
  const loginData = await loginRes.json();
  assert(
    loginRes.status === 401 && loginData.success === false,
    'Đăng nhập sai mật khẩu BẮT BUỘC trả về 401 Unauthorized (Backdoor hoàn toàn biến mất)',
    `Status: ${loginRes.status}, data: ${JSON.stringify(loginData)}`
  );

  // 3. Kiểm tra Brute-Force Rate Limiting (5 lần sai -> lần 6 bị khóa 429)
  console.log('\n3. Kiểm tra Giới hạn Tần suất Đăng nhập (Anti-Brute Force)...');
  for (let i = 2; i <= 5; i++) {
    await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.50'
      },
      body: JSON.stringify({ username: 'admin', password: 'wrong_' + i })
    });
  }

  const rateRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '192.168.1.50'
    },
    body: JSON.stringify({ username: 'admin', password: 'wrong_blocked' })
  });
  const rateData = await rateRes.json();
  assert(
    rateRes.status === 429 && rateData.success === false,
    'Khóa IP khi gõ sai 5 lần liên tiếp (HTTP 429 Too Many Requests)',
    `Status: ${rateRes.status}, message: ${rateData.message}`
  );

  // 4. Kiểm tra khóa endpoint /api/cache
  console.log('\n4. Kiểm tra Bảo vệ Endpoint /api/cache...');
  const cacheRes = await fetch(`${BASE_URL}/api/cache`);
  const cacheData = await cacheRes.json();
  assert(
    cacheRes.status === 401 && cacheData.success === false,
    'Endpoint GET /api/cache yêu cầu xác thực admin (Chặn người ngoài)',
    `Status: ${cacheRes.status}`
  );

  // 5. Kiểm tra khóa snapshots /api/settings?snapshots=1
  console.log('\n5. Kiểm tra Bảo vệ Snapshots Cài Đặt...');
  const snapRes = await fetch(`${BASE_URL}/api/settings?snapshots=1`);
  const snapData = await snapRes.json();
  assert(
    snapRes.status === 401 && snapData.success === false,
    'Endpoint GET /api/settings?snapshots=1 yêu cầu xác thực admin',
    `Status: ${snapRes.status}`
  );

  // 6. Kiểm tra form liên hệ rate limit
  console.log('\n6. Kiểm tra Chống Spam Form Liên Hệ (/api/contacts)...');
  const contactRes = await fetch(`${BASE_URL}/api/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '192.168.1.77'
    },
    body: JSON.stringify({ name: 'Test', phone: '0901234567', message: 'Hello' })
  });
  assert(
    contactRes.status === 200,
    'Gửi liên hệ hợp lệ thành công (HTTP 200)',
    `Status: ${contactRes.status}`
  );

  console.log('\n===============================================================');
  console.log(`🎉 KẾT QUẢ KIỂM THỬ: ${passed}/${total} TIÊU CHUẨN BẢO MẬT ĐẠT 100%!`);
  console.log('===============================================================');

  if (passed !== total) process.exit(1);
}

main().catch(err => {
  console.error('Lỗi khi chạy verify-live-security:', err);
  process.exit(1);
});
