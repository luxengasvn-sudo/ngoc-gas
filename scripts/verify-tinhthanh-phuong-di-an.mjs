// scripts/verify-tinhthanh-phuong-di-an.mjs
import http from 'http';

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== KIỂM THỬ XÁC MINH DỮ LIỆU & GIAO DIỆN PHƯỜNG DĨ AN (1:1 VỚI TINHTHANHVN.COM) ===');
  const url = 'http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-di-an';
  
  try {
    const { status, data } = await fetchPage(url);
    console.log(`[PASS] HTTP Status: ${status}`);
    if (status !== 200) {
      throw new Error(`Expected status 200, got ${status}`);
    }

    const checks = [
      { name: 'Mã đơn vị hành chính (25942)', pattern: /25942/ },
      { name: 'Diện tích chuẩn (21\.38)', pattern: /21\.38/ },
      { name: 'Dân số sáp nhập (227\.817)', pattern: /227\.817/ },
      { name: 'Mật độ dân cư (10\.656)', pattern: /10\.656/ },
      { name: 'Mã bưu chính Zip Code (75306)', pattern: /75306/ },
      { name: 'Trụ sở UBND Phường Dĩ An (Trung tâm hành chính)', pattern: /Trung tâm hành chính/ },
      { name: '3 đơn vị cũ hợp nhất: Phường An Bình', pattern: /Phường An Bình/ },
      { name: '3 đơn vị cũ hợp nhất: Phường Dĩ An', pattern: /Phường Dĩ An/ },
      { name: '3 đơn vị cũ hợp nhất: Phường Tân Đông Hiệp', pattern: /Phường Tân Đông Hiệp/ },
      { name: 'Nghị quyết 112/2025/UBTVQH15', pattern: /112\/2025\/UBTVQH15/ },
      { name: 'Cổng thông tin điện tử dian.hochiminhcity.gov.vn', pattern: /dian\.hochiminhcity\.gov\.vn/ },
      { name: 'Thủ tục hành chính sau sáp nhập (CCCD & VNeID)', pattern: /CCCD &amp; VNeID|CCCD & VNeID/ },
      { name: 'Hỏi đáp thường gặp FAQ (8 câu)', pattern: /Giải Đáp Nhanh Về/ },
      { name: 'Tiện ích Ngọc Gas giao gas hỏa tốc (1900 9396)', pattern: /1900 9396|19009396/ },
    ];

    let passed = 0;
    for (const check of checks) {
      if (check.pattern.test(data)) {
        console.log(`[PASS] ✓ ${check.name}`);
        passed++;
      } else {
        console.error(`[FAIL] ✗ ${check.name}`);
      }
    }

    console.log(`\nKết quả: ${passed}/${checks.length} tiêu chí đạt chuẩn.`);
    if (passed === checks.length) {
      console.log('>>> TOÀN BỘ DỮ LIỆU & GIAO DIỆN ĐÃ ĐỒNG BỘ 100% CHUẨN XÁC! <<<');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('[ERROR] Kiểm thử thất bại:', err);
    process.exit(1);
  }
}

verify();
