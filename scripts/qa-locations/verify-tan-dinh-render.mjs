async function verify() {
  const ubndRes = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-tan-dinh/co-quan/ubnd');
  const ubndHtml = await ubndRes.text();

  console.log('='.repeat(60));
  console.log('🏛️ TRANG CHI TIẾT CƠ QUAN UBND PHƯỜNG TÂN ĐỊNH');
  console.log('='.repeat(60));
  
  const title = ubndHtml.match(/<title>(.*?)<\/title>/)?.[1] || 'N/A';
  console.log('• Title:', title);

  const metaDesc = ubndHtml.match(/<meta name="description" content="(.*?)"/)?.[1] || 'N/A';
  console.log('• Meta Desc:', metaDesc);

  const hasAddr = ubndHtml.includes('58B Nguyễn Đình Chiểu, Phường Tân Định, Quận 1, TP. Hồ Chí Minh');
  console.log('• Địa chỉ chuẩn (58B Nguyễn Đình Chiểu):', hasAddr ? '✅ CHÍNH XÁC' : '❌ THIẾU');

  const hasPhone = ubndHtml.includes('028 3622 3922');
  console.log('• Số điện thoại chuẩn (028 3622 3922):', hasPhone ? '✅ CHÍNH XÁC' : '❌ THIẾU');

  const hasWeb = ubndHtml.includes('https://phuongtandinh.gov.vn/');
  console.log('• Cổng TTĐT chuẩn (phuongtandinh.gov.vn):', hasWeb ? '✅ CHÍNH XÁC' : '❌ THIẾU');

  const wardRes = await fetch('http://localhost:3000/tinh-thanh/province/ho-chi-minh/phuong-tan-dinh');
  const wardHtml = await wardRes.text();

  console.log('\n' + '='.repeat(60));
  console.log('📍 TRANG TỔNG QUAN PHƯỜNG TÂN ĐỊNH');
  console.log('='.repeat(60));
  console.log('• Thẻ UBND có 58B Nguyễn Đình Chiểu:', wardHtml.includes('58B Nguyễn Đình Chiểu') ? '✅ CÓ' : '❌ KHÔNG');
  console.log('• Thẻ UBND có 028 3622 3922:', wardHtml.includes('028 3622 3922') ? '✅ CÓ' : '❌ KHÔNG');
  console.log('• Thẻ CA có 62 Bà Lê Chân:', wardHtml.includes('62 Bà Lê Chân') ? '✅ CÓ' : '❌ KHÔNG');
  console.log('• Thẻ CA có 028 3829 9835:', wardHtml.includes('028 3829 9835') ? '✅ CÓ' : '❌ KHÔNG');
  console.log('• Fanpage CATP Tích Xanh:', wardHtml.includes('catphochiminhofficial') ? '✅ CÓ' : '❌ KHÔNG');
  console.log('='.repeat(60));
}

verify();
