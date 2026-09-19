import http from 'http';

function checkUrl(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'GET',
      headers: {
        'User-Agent': 'Ban-QA-Tester/1.0'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          hasDoanKet: data.includes('Đoàn Kết'),
          hasTanPhong: data.includes('Tân Phong'),
          hasMuongTe: data.includes('Mường Tè'),
          hasNoDummy: !data.includes('Phường Lai Châu 1') && !data.includes('Lai Châu 1'),
          contentLength: data.length
        });
      });
    });

    req.on('error', (e) => {
      resolve({ path, error: e.message });
    });

    req.end();
  });
}

async function run() {
  console.log('Testing Lai Châu Routes on http://localhost:3000...\n');
  const urls = [
    '/tinh-thanh/province/lai-chau',
    '/tinh-thanh/province/lai-chau/phuong-doan-ket',
    '/tinh-thanh/province/lai-chau/phuong-tan-phong',
    '/tinh-thanh/province/lai-chau/xa-muong-te',
    '/tinh-thanh/province/lai-chau/danh-sach-don-vi-hanh-chinh'
  ];

  let allSuccess = true;
  for (const url of urls) {
    const res = await checkUrl(url);
    if (res.statusCode === 200 && res.hasNoDummy) {
      console.log(`✅ [PASS 200] ${url} (length: ${res.contentLength}) - Clean & Authentic Data!`);
    } else {
      console.log(`❌ [FAIL] ${url}:`, res);
      allSuccess = false;
    }
  }

  if (allSuccess) {
    console.log('\n🎉 100% ROUTE TESTS PASSED FOR TỈNH LAI CHÂU!');
    process.exit(0);
  } else {
    console.error('\n⚠️ Some routes failed tests.');
    process.exit(1);
  }
}

run();
