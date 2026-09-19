import http from 'http';
import fs from 'fs';

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + path, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ path, status: res.statusCode, length: data.length, body: data }));
    }).on('error', err => resolve({ path, status: 500, error: err.message }));
  });
}

async function verifyAllProvinces() {
  const provinces = JSON.parse(fs.readFileSync('src/data/tinhthanh/provinces-34.json', 'utf8'));
  console.log(`Checking all ${provinces.length} provinces on dev server...`);

  let passCount = 0;
  let failCount = 0;

  for (const p of provinces) {
    const url = `/tinh-thanh/province/${p.slug}`;
    const res = await checkUrl(url);
    if (res.status === 200) {
      passCount++;
      const hasName = res.body.includes(p.name);
      const hasCenter = res.body.includes(p.center);
      console.log(`✓ [200] ${p.name.padEnd(25)} | Center: ${p.center.padEnd(15)} | Legacy: ${p.legacyProvinces.join(', ')}`);
    } else {
      failCount++;
      console.error(`✗ [${res.status}] ${p.name} failed!`);
    }
  }

  console.log(`\nResults: ${passCount} passed, ${failCount} failed out of ${provinces.length} provinces.`);
}

verifyAllProvinces();
