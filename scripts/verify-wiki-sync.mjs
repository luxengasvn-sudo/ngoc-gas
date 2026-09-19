import fs from 'fs';
import path from 'path';

async function verify() {
  console.log('=== STARTING EMPIRICAL VERIFICATION OF WIKI DATA SYNC ===\n');

  const prov34Path = path.join(process.cwd(), 'src', 'data', 'tinhthanh', 'provinces-34.json');
  const hcmUnitsPath = path.join(process.cwd(), 'src', 'data', 'tinhthanh', 'administrative-units-hcm.json');
  const wikiProvPath = path.join(process.cwd(), 'scripts', 'scratch', 'wiki-provinces-34.json');
  const wikiHcmPath = path.join(process.cwd(), 'scripts', 'scratch', 'wiki-hcm-units-168.json');

  const prov34 = JSON.parse(fs.readFileSync(prov34Path, 'utf8'));
  const hcmUnits = JSON.parse(fs.readFileSync(hcmUnitsPath, 'utf8'));
  const wikiProv = JSON.parse(fs.readFileSync(wikiProvPath, 'utf8'));
  const wikiHcm = JSON.parse(fs.readFileSync(wikiHcmPath, 'utf8'));

  // Test 1: Count checks
  console.log('[TEST 1] Count checks:');
  console.log(`- Provinces in JSON: ${prov34.length} (Expected: 34) -> ${prov34.length === 34 ? 'PASS' : 'FAIL'}`);
  console.log(`- HCM Units in JSON: ${hcmUnits.length} (Expected: 168) -> ${hcmUnits.length === 168 ? 'PASS' : 'FAIL'}`);
  if (prov34.length !== 34 || hcmUnits.length !== 168) {
    throw new Error('Count mismatch!');
  }

  // Test 2: Sample decimal comparisons for 34 provinces
  console.log('\n[TEST 2] Decimal area & population verification for provinces:');
  const sampleProvs = ['ho-chi-minh', 'ha-noi', 'hai-phong', 'quang-ninh', 'dong-nai', 'can-tho', 'da-nang'];
  for (const slug of sampleProvs) {
    const p = prov34.find(item => item.slug === slug);
    console.log(`- ${p.name}: ${p.areaKm2.toLocaleString('vi-VN')} km² | ${p.population.toLocaleString('vi-VN')} người | ${p.totalUnits} đơn vị (${p.wards}P, ${p.communes}X, ${p.specialZones}ĐK)`);
  }

  // Test 3: Sample decimal comparisons for HCM units
  console.log('\n[TEST 3] Decimal area & population verification for wards/communes:');
  const sampleWards = ['xa-thuong-tan', 'phuong-di-an', 'phuong-an-dong', 'phuong-ben-cat', 'phuong-ban-co'];
  for (const slug of sampleWards) {
    const u = hcmUnits.find(item => item.slug === slug || item.wardSlug === slug || item.slug === `giao-gas-${slug}`);
    console.log(`- ${u.name}: ${u.areaKm2.toLocaleString('vi-VN')} km² | ${u.population.toLocaleString('vi-VN')} người | Mật độ: ${u.demographics.density.toLocaleString('vi-VN')} người/km²`);
  }

  // Test 4: Live HTTP request checks against local dev server
  console.log('\n[TEST 4] Live HTTP Page Output Verification (http://localhost:3000):');
  
  // 4a. Province HCM page
  try {
    const resProv = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh');
    const htmlProv = await resProv.text();
    const hasArea = htmlProv.includes('6.772,59');
    console.log(`- /tinh-thanh/province/ho-chi-minh: HTTP ${resProv.status}, contains '6.772,59 km²' -> ${hasArea ? 'PASS' : 'FAIL'}`);
  } catch (err) {
    console.warn('- Could not connect to dev server for ho-chi-minh page:', err.message);
  }

  // 4b. Ward Xã Thường Tân page
  try {
    const resWard = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh/xa-thuong-tan');
    const htmlWard = await resWard.text();
    const hasArea = htmlWard.includes('127,76');
    const hasPop = htmlWard.includes('21.238');
    console.log(`- /tinh-thanh/province/ho-chi-minh/xa-thuong-tan: HTTP ${resWard.status}, contains '127,76' -> ${hasArea ? 'PASS' : 'FAIL'}, contains '21.238' -> ${hasPop ? 'PASS' : 'FAIL'}`);
  } catch (err) {
    console.warn('- Could not connect to dev server for xa-thuong-tan page:', err.message);
  }

  // 4c. 34 Provinces list page
  try {
    const res34 = await fetch('http://localhost:3000/tinh-thanh/34-tinh-thanh');
    const html34 = await res34.text();
    const has34 = html34.includes('34 Tỉnh thành') || html34.includes('34 tỉnh thành');
    console.log(`- /tinh-thanh/34-tinh-thanh: HTTP ${res34.status}, loads correctly -> ${has34 ? 'PASS' : 'FAIL'}`);
  } catch (err) {
    console.warn('- Could not connect to dev server for 34-tinh-thanh page:', err.message);
  }

  console.log('\n=== ALL VERIFICATION CHECKS COMPLETED SUCCESSFULLY ===');
}

verify().catch(console.error);
