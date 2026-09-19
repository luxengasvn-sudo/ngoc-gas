import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('src/data/tinhthanh/administrative-units-hcm.json');
const AUDIT_FILE = path.resolve('docs/qa-audit-log.json');

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Parse CLI args
const args = process.argv.slice(2);
const targetSlug = args.find(a => a.startsWith('--slug='))?.split('=')[1];
const targetId = args.find(a => a.startsWith('--id='))?.split('=')[1];

function isAddressPlaceholder(addr) {
  if (!addr) return true;
  const placeholderPatterns = [
    /Trung Tâm Hành Chính/i,
    /Đường Trục Chính/i,
    /Tuyến Phố An Ninh/i,
    /Số \d+ Đường Trung Tâm/i,
    /Đại lộ trung tâm/i,
    /Tuyến đường học đường/i,
    /Đường Y Tế/i
  ];
  return placeholderPatterns.some(pattern => pattern.test(addr));
}

function isPhonePlaceholder(phone) {
  if (!phone) return false; // Empty is valid if no phone exists!
  return phone.includes('xxxx') || phone.includes('XXXX') || phone.includes('3822 1000');
}

if (targetSlug || targetId) {
  const item = data.find(u => (targetSlug && (u.slug === targetSlug || u.wardSlug === targetSlug)) || (targetId && String(u.id) === String(targetId)));
  if (!item) {
    console.error(`❌ Không tìm thấy địa điểm: slug=${targetSlug}, id=${targetId}`);
    process.exit(1);
  }
  console.log('='.repeat(60));
  console.log(`📌 CHI TIẾT ĐỊA ĐIỂM [ID ${item.id}]: ${item.name} (${item.district})`);
  console.log('='.repeat(60));
  console.log('📍 Trụ sở UBND:');
  console.log('   - Tên:     ', item.ubnd?.name || '(Chưa có)');
  console.log('   - Địa chỉ: ', item.ubnd?.address || '(Chưa có)', isAddressPlaceholder(item.ubnd?.address) ? '⚠️ [PLACEHOLDER]' : '✅ [REAL]');
  console.log('   - SĐT:     ', item.ubnd?.phone || '(Trống)', isPhonePlaceholder(item.ubnd?.phone) ? '⚠️ [PLACEHOLDER xxxx]' : (item.ubnd?.phone ? '✅ [VERIFIED]' : '⚪ [EMPTY]'));
  console.log('   - Website: ', item.ubnd?.website || '(Trống)');
  console.log('   - Nguồn:   ', item.ubnd?.verificationSource || '(Chưa kiểm chứng)');
  console.log('   - Tọa độ:  ', `${item.ubnd?.lat || item.lat}, ${item.ubnd?.lng || item.lng}`);
  console.log('='.repeat(60));
  process.exit(0);
}

// Global stats
let total = data.length;
let cleanCount = 0;
let placeholderAddrCount = 0;
let placeholderPhoneCount = 0;
let hasWebsiteCount = 0;
let verifiedCount = 0;

const pendingByDistrict = {};

data.forEach(item => {
  const addr = item.ubnd?.address;
  const phone = item.ubnd?.phone;
  const web = item.ubnd?.website;
  const isVerified = Boolean(item.ubnd?.verificationSource);

  const hasAddrPlaceholder = isAddressPlaceholder(addr);
  const hasPhonePlaceholder = isPhonePlaceholder(phone);

  if (hasAddrPlaceholder) placeholderAddrCount++;
  if (hasPhonePlaceholder) placeholderPhoneCount++;
  if (web) hasWebsiteCount++;
  if (isVerified) verifiedCount++;

  if (!hasAddrPlaceholder && !hasPhonePlaceholder && isVerified) {
    cleanCount++;
  } else {
    const dist = item.district || 'Khác';
    if (!pendingByDistrict[dist]) pendingByDistrict[dist] = [];
    pendingByDistrict[dist].push({
      id: item.id,
      slug: item.wardSlug || item.slug,
      name: item.name,
      issues: [
        hasAddrPlaceholder ? 'Địa chỉ ảo' : null,
        hasPhonePlaceholder ? 'SĐT xxxx' : null,
        !isVerified ? 'Chưa xác thực nguồn' : null
      ].filter(Boolean)
    });
  }
});

console.log('='.repeat(70));
console.log('📊 BÁO CÁO TIẾN ĐỘ AI QA ĐỊA ĐIỂM (src/data/tinhthanh/administrative-units-hcm.json)');
console.log('='.repeat(70));
console.log(`• Tổng số địa điểm:                  ${total}`);
console.log(`• Đã QA chuẩn 100% (Clean & Verified): ${cleanCount} / ${total} (${((cleanCount / total) * 100).toFixed(1)}%)`);
console.log(`• Còn tồn địa chỉ placeholder:       ${placeholderAddrCount} / ${total}`);
console.log(`• Còn tồn SĐT rác (xxxx):            ${placeholderPhoneCount} / ${total}`);
console.log(`• Đã có Cổng TTĐT Gov (.gov.vn):     ${hasWebsiteCount} / ${total}`);
console.log('='.repeat(70));

console.log('\n🗺️ DANH SÁCH ĐỊA ĐIỂM CẦN QA THEO QUẬN/HUYỆN:');
for (const [dist, items] of Object.entries(pendingByDistrict)) {
  console.log(`\n🏢 ${dist} (${items.length} địa điểm cần QA):`);
  items.forEach(i => {
    console.log(`   - [ID ${i.id}] ${i.name} (--slug=${i.slug}) | Vấn đề: ${i.issues.join(', ')}`);
  });
}
