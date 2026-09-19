async function verifyBenThanh() {
  console.log('='.repeat(70));
  console.log('🔄 BƯỚC 4: AI PHÚC TRA — KIỂM TRA ĐẦU RA THỰC TẾ PHƯỜNG BẾN THÀNH (ID 68)');
  console.log('='.repeat(70));

  let passed = true;

  // 1. Kiểm tra trang chi tiết UBND
  const ubndRes = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-ben-thanh/co-quan/ubnd');
  const ubndHtml = await ubndRes.text();

  const hasUbndAddr = ubndHtml.includes('92 Nguyễn Trãi');
  const hasUbndPhone = ubndHtml.includes('028 3839 0856');
  const hasUbndWeb = ubndHtml.includes('https://phuongbenthanh.gov.vn/');

  console.log('🏛️ TRANG CHI TIẾT UBND:');
  console.log('   - Địa chỉ 92 Nguyễn Trãi:    ', hasUbndAddr ? '✅ ĐẠT CHUẨN' : '❌ THIẾU/SAI');
  console.log('   - SĐT bàn 028 3839 0856:     ', hasUbndPhone ? '✅ ĐẠT CHUẨN' : '❌ THIẾU/SAI');
  console.log('   - Cổng TTĐT phuongbenthanh:  ', hasUbndWeb ? '✅ ĐẠT CHUẨN' : '❌ THIẾU/SAI');

  if (!hasUbndAddr || !hasUbndPhone || !hasUbndWeb) passed = false;

  // 2. Kiểm tra trang chi tiết CÔNG AN
  const caRes = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-ben-thanh/co-quan/cong-an');
  const caHtml = await caRes.text();

  const hasCaAddr = caHtml.includes('82A Nguyễn Thái Học');
  const hasCaPhone = caHtml.includes('028 3829 7373');
  const hasCaFb = caHtml.includes('catphochiminhofficial');

  console.log('🛡️ TRANG CHI TIẾT CÔNG AN:');
  console.log('   - Địa chỉ 82A Nguyễn Thái Học:', hasCaAddr ? '✅ ĐẠT CHUẨN' : '❌ THIẾU/SAI');
  console.log('   - SĐT trực ban 028 3829 7373:', hasCaPhone ? '✅ ĐẠT CHUẨN' : '❌ THIẾU/SAI');
  console.log('   - Fanpage CATP Tích Xanh:    ', hasCaFb ? '✅ ĐẠT CHUẨN' : '❌ THIẾU/SAI');

  if (!hasCaAddr || !hasCaPhone || !hasCaFb) passed = false;

  // 3. Kiểm tra trang tổng quan Phường Bến Thành
  const wardRes = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-ben-thanh');
  const wardHtml = await wardRes.text();

  const wardHasUbnd = wardHtml.includes('92 Nguyễn Trãi');
  const wardHasCa = wardHtml.includes('82A Nguyễn Thái Học');

  console.log('📍 TRANG TỔNG QUAN PHƯỜNG BẾN THÀNH:');
  console.log('   - Thẻ UBND hiển thị 92 Nguyễn Trãi:    ', wardHasUbnd ? '✅ ĐẠT' : '❌ THIẾU');
  console.log('   - Thẻ Công an hiển thị 82A Nguyễn Thái Học:', wardHasCa ? '✅ ĐẠT' : '❌ THIẾU');

  if (!wardHasUbnd || !wardHasCa) passed = false;

  console.log('='.repeat(70));
  if (passed) {
    console.log('🎉 KẾT QUẢ PHÚC TRA: 100% TIÊU CHÍ ĐẠT YÊU CẦU! CHUYỂN BÁO CÁO CHO AI SENIOR DUYỆT PASS.');
  } else {
    console.error('❌ KẾT QUẢ PHÚC TRA: CÓ LỖI! YÊU CẦU LẶP LẠI QUY TRÌNH CHỈNH SỬA.');
    process.exit(1);
  }
}

verifyBenThanh();
