import fs from 'fs';

async function testPage(url, label) {
  console.log(`\n--- KIỂM TRA TRANG: ${label} (${url}) ---`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ HTTP Lỗi: ${res.status}`);
      return;
    }
    const html = await res.text();
    console.log(`✅ HTTP 200 OK (${html.length} bytes)`);

    // Check Maps links
    const mapsMatches = [...html.matchAll(/href="([^"]*google\.com\/maps\/search[^"]*)"/g)];
    const dirMatches = [...html.matchAll(/href="([^"]*google\.com\/maps\/dir[^"]*)"/g)];

    console.log(`📍 Tìm thấy ${mapsMatches.length} liên kết Google Maps Search`);
    if (mapsMatches.length > 0) {
      console.log(`   Sample: ${decodeURIComponent(mapsMatches[0][1]).slice(0, 120)}...`);
    }

    console.log(`↗ Tìm thấy ${dirMatches.length} liên kết Chỉ đường (Directions)`);
    if (dirMatches.length > 0) {
      console.log(`   Sample: ${decodeURIComponent(dirMatches[0][1]).slice(0, 120)}...`);
    }

    // Check if phone number is exposed
    const hasPhone = /024\s*3825|028\s*3829|0274\s*3656/.test(html);
    console.log(`🛡️ SĐT bàn cơ quan hành chính: ${hasPhone ? '⚠️ BỊ LỘ (CẦN ẨN)' : '✅ ĐÃ ẨN AN TOÀN'}`);

    // Check if 113 or hours is shown
    const hasSafeNotice = html.includes('113') && html.includes('07:30');
    console.log(`🕒 Giờ làm việc & Hotline 113: ${hasSafeNotice ? '✅ HIỂN THỊ ĐẦY ĐỦ' : '⚠️ THIẾU'}`);
  } catch (err) {
    console.error(`❌ Lỗi kết nối:`, err.message);
  }
}

async function main() {
  await testPage('http://localhost:3000/tinh-thanh/province/ha-noi/phuong-hang-bac', 'Phường Hàng Bạc (Hà Nội)');
  await testPage('http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-tan-dinh', 'Phường Tân Định (TP.HCM)');
  await testPage('http://localhost:3000/tinh-thanh/34-tinh-thanh', 'Trang 34 Tỉnh Thành');
}

main();
