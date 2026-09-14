import fs from 'fs';
import path from 'path';

// Load .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  });
}

const API_KEY = process.env.AI_PUBLISHER_API_KEY;
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Bắt đầu kiểm thử toàn diện AI Direct API Publisher...');
  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passCount++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      failCount++;
    }
  }

  // Test 1: Truy cập không có API key bị từ chối
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test No Auth' })
    });
    assert(res.status === 401, `Chặn yêu cầu không có xác thực (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Test 1 error: ${e.message}`);
  }

  // Test 2: Truy cập với API key sai bị từ chối
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'invalid-fake-key-123456789012345678901234567890'
      },
      body: JSON.stringify({ title: 'Test Fake Key' })
    });
    assert(res.status === 401, `Chặn yêu cầu với API key sai (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Test 2 error: ${e.message}`);
  }

  // Test 3: Upload ảnh thành công với API key hợp lệ
  let uploadedImageUrl = null;
  try {
    const sampleImagePath = path.join(process.cwd(), 'public', 'images', 'luxen-gas.webp');
    const fileBuffer = fs.readFileSync(sampleImagePath);
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: 'image/webp' });
    formData.append('file', blob, 'test-api-luxen.webp');

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: { 'x-api-key': API_KEY },
      body: formData
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.url, `Upload ảnh trực tiếp qua API (URL: ${data.url})`);
    uploadedImageUrl = data.url;
  } catch (e) {
    assert(false, `Test 3 error: ${e.message}`);
  }

  // Test 4: Đăng bài viết mới thành công với API key hợp lệ
  let createdPostId = null;
  const testSlug = `test-api-post-${Date.now()}`;
  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        title: 'Bài Viết Thử Nghiệm Kết Nối Trực Tiếp API',
        slug: testSlug,
        summary: 'Tóm tắt bài viết test API',
        content: '<p>Nội dung bài viết được AI đăng trực tiếp qua mạng REST API không cần qua Git!</p>',
        image_url: uploadedImageUrl,
        is_published: 1
      })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.data?.id, `Đăng bài viết mới vào MySQL trực tiếp qua API (ID: ${data.data?.id})`);
    createdPostId = data.data?.id;
  } catch (e) {
    assert(false, `Test 4 error: ${e.message}`);
  }

  // Test 5: Làm mới Cache (Purge Cache) qua API key hợp lệ
  try {
    const res = await fetch(`${BASE_URL}/api/cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ category: 'posts' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success, `Làm mới Cache On-Demand qua API (HTTP 200)`);
  } catch (e) {
    assert(false, `Test 5 error: ${e.message}`);
  }

  // Test 6: Kiểm tra phòng chống leo thang đặc quyền (Privilege Escalation Protection)
  // API Key chỉ có quyền editor, CẤM truy cập /api/auth/users
  try {
    const res = await fetch(`${BASE_URL}/api/auth/users`, {
      method: 'GET',
      headers: { 'x-api-key': API_KEY }
    });
    assert(res.status === 403, `Chống leo thang đặc quyền: Cấm API Key truy cập quản lý tài khoản (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Test 6 error: ${e.message}`);
  }

  // Test 7: API Key CẤM đổi mật khẩu tài khoản quản trị
  try {
    const res = await fetch(`${BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({ oldPassword: '1', newPassword: '2' })
    });
    assert(res.status === 403, `Chống leo thang đặc quyền: Cấm API Key đổi mật khẩu admin (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Test 7 error: ${e.message}`);
  }

  // Cleanup test post & uploaded test image
  if (createdPostId) {
    try {
      await fetch(`${BASE_URL}/api/posts/${createdPostId}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY }
      });
      console.log(`  🧹 [CLEANUP] Đã dọn dẹp bài viết thử nghiệm (ID ${createdPostId})`);
    } catch (e) {}
  }
  if (uploadedImageUrl) {
    try {
      await fetch(`${BASE_URL}/api/upload?url=${encodeURIComponent(uploadedImageUrl)}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY }
      });
      console.log(`  🧹 [CLEANUP] Đã dọn dẹp tệp ảnh thử nghiệm`);
    } catch (e) {}
  }

  console.log(`\n🎉 KẾT QUẢ KIỂM THỬ: ${passCount} ĐẠT / ${failCount} LỖI`);
  if (failCount > 0) process.exit(1);
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});
