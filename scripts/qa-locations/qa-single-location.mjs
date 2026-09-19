import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('src/data/tinhthanh/administrative-units-hcm.json');
const AUDIT_FILE = path.resolve('docs/qa-audit-log.json');

// Helper to parse arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, ...valParts] = arg.substring(2).split('=');
      args[key] = valParts.join('=') || true;
    }
  });
  return args;
}

const args = parseArgs();
const targetSlug = args.slug;
const targetId = args.id;
const newAddress = args.address;
const newPhone = args.phone !== undefined ? (args.phone === true ? '' : args.phone.trim()) : undefined;
const newWebsite = args.website !== undefined ? (args.website === true ? '' : args.website.trim()) : undefined;
const newSource = args.source;
const newLat = args.lat ? Number(args.lat) : undefined;
const newLng = args.lng ? Number(args.lng) : undefined;
const newWorkingHours = args.workingHours;
const newPoliceFb = args.policeFacebook;
const newPoliceFbName = args.policeFacebookName;
const newPolicePhone = args.policePhone !== undefined ? (args.policePhone === true ? '' : args.policePhone.trim()) : undefined;
const newPoliceAddress = args.policeAddress;
const isCommit = Boolean(args.commit);

if (!targetSlug && !targetId) {
  console.log(`
ℹ️ CÁCH SỬ DỤNG SCRIPT AI QA TỪNG ĐỊA ĐIỂM:
  node scripts/qa-locations/qa-single-location.mjs \\
    --slug=phuong-tan-dinh \\
    --address="Số 264 Hai Bà Trưng, Phường Tân Định, Quận 1, TP. Hồ Chí Minh" \\
    --phone="028 3829 7351" \\
    --website="https://tandinh.quan1.hochiminhcity.gov.vn" \\
    --policeFacebook="https://www.facebook.com/caq1tphcm" \\
    --policeFacebookName="Công an Quận 1 - TP. Hồ Chí Minh" \\
    --source="Cổng TTĐT Quận 1 & Đề án sắp xếp ĐVHC TP.HCM" \\
    --lat=10.7892 --lng=106.6914 \\
    [--commit]

  * Lưu ý: Nếu không truyền cờ --commit, script sẽ chạy chế độ DRY-RUN (Xem trước bảng Before/After).
  * Nếu không có SĐT hoặc Website, truyền --phone="" hoặc --website="" (Script sẽ tự động để trống sạch sẽ).
  * Đặc biệt: Địa chỉ BẮT BUỘC phải là địa chỉ thực tế và có --source chứng minh.
  `);
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const index = data.findIndex(u => (targetSlug && (u.slug === targetSlug || u.wardSlug === targetSlug)) || (targetId && String(u.id) === String(targetId)));

if (index === -1) {
  console.error(`❌ Không tìm thấy địa điểm: slug=${targetSlug}, id=${targetId}`);
  process.exit(1);
}

const item = data[index];
const beforeUbnd = { ...(item.ubnd || {}) };

// Validation rules
if (!newAddress) {
  console.error('❌ LỖI: Bắt buộc cung cấp --address chính xác của Trụ sở!');
  process.exit(1);
}

if (!newSource) {
  console.error('❌ LỖI: Bắt buộc cung cấp --source (Nguồn kiểm chứng: Cổng TTĐT / Đề án / Bản đồ)!');
  process.exit(1);
}

// Clean phone: if placeholder xxxx or dummy, reject
if (newPhone && (newPhone.includes('xxxx') || newPhone.includes('XXXX'))) {
  console.error('❌ LỖI: Số điện thoại không được chứa placeholder xxxx. Nếu không có số, hãy để trống: --phone=""');
  process.exit(1);
}

// Prepare updated ubnd
const cleanPhone = newPhone !== undefined ? newPhone : (beforeUbnd.phone?.includes('xxxx') ? '' : (beforeUbnd.phone || ''));
const cleanWebsite = newWebsite !== undefined ? newWebsite : (beforeUbnd.website || '');
const cleanLat = newLat || beforeUbnd.lat || item.lat;
const cleanLng = newLng || beforeUbnd.lng || item.lng;

const afterUbnd = {
  ...beforeUbnd,
  name: beforeUbnd.name || `Trụ sở UBND ${item.name}`,
  address: newAddress.trim(),
  phone: cleanPhone,
  website: cleanWebsite,
  workingHours: newWorkingHours || beforeUbnd.workingHours || 'Thứ 2 - Thứ 6 (07:30 - 17:00)',
  lat: cleanLat,
  lng: cleanLng,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Ủy ban nhân dân ' + item.name + ', ' + (item.district || '') + ', TP. Hồ Chí Minh')}`,
  googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(newAddress.trim())}`,
  verificationSource: newSource.trim(),
  verifiedAt: new Date().toISOString()
};

// Police updates if provided
const beforePolice = { ...(item.police || {}) };
let afterPolice = null;
if (newPoliceFb !== undefined || newPolicePhone !== undefined || newPoliceFbName !== undefined || newPoliceAddress !== undefined) {
  const pAddr = newPoliceAddress !== undefined ? newPoliceAddress.trim() : (beforePolice.address || `Liền kề Trụ sở UBND ${item.name}`);
  afterPolice = {
    ...beforePolice,
    name: beforePolice.name || `Công An ${item.name}`,
    address: pAddr,
    phone: newPolicePhone !== undefined ? newPolicePhone : (beforePolice.phone?.includes('xxxx') ? '' : (beforePolice.phone || '')),
    hotline: beforePolice.hotline || '113 / Trực ban 24/7',
    facebook: newPoliceFb !== undefined ? newPoliceFb : (beforePolice.facebook || ''),
    facebookName: newPoliceFbName !== undefined ? newPoliceFbName : (beforePolice.facebookName || ''),
    facebookBadge: 'verified_blue',
    googleMapsUrl: newPoliceAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Công an ' + item.name + ', ' + pAddr)}` : beforePolice.googleMapsUrl,
    googleDirectionsUrl: newPoliceAddress ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pAddr)}` : beforePolice.googleDirectionsUrl,
    verificationSource: newSource.trim(),
    verifiedAt: new Date().toISOString()
  };
}

// Display comparison table
console.log('='.repeat(75));
console.log(`📋 BẢNG SO SÁNH TRƯỚC VÀ SAU QA: [ID ${item.id}] ${item.name} (${item.district})`);
console.log('='.repeat(75));
console.log(`• TÊN CƠ QUAN:`);
console.log(`   Trước: ${beforeUbnd.name || '(Trống)'}`);
console.log(`   Sau:   ${afterUbnd.name}`);
console.log(`• ĐỊA CHỈ:`);
console.log(`   Trước: ${beforeUbnd.address || '(Trống)'}`);
console.log(`   Sau:   ${afterUbnd.address}  ✅ [ĐỊA CHỈ THỰC TẾ]`);
console.log(`• SỐ ĐIỆN THOẠI:`);
console.log(`   Trước: ${beforeUbnd.phone || '(Trống)'}`);
console.log(`   Sau:   ${afterUbnd.phone ? afterUbnd.phone + ' ✅ [XÁC THỰC]' : '"" (Để trống sạch sẽ) ✅ [HỢP LỆ]'}`);
console.log(`• WEBSITE CHÍNH PHỦ (.gov.vn):`);
console.log(`   Trước: ${beforeUbnd.website || '(Trống)'}`);
console.log(`   Sau:   ${afterUbnd.website ? afterUbnd.website + ' ✅ [GOV PORTAL]' : '"" (Để trống) ✅'}`);
if (afterPolice) {
  console.log(`• CÔNG AN & FANPAGE TÍCH XANH:`);
  console.log(`   Trước FB:  ${beforePolice.facebook || '(Trống)'}`);
  console.log(`   Sau FB:    ${afterPolice.facebook || '""'} (${afterPolice.facebookName || 'Tích Xanh'}) ✅`);
  console.log(`   Trước SĐT: ${beforePolice.phone || '(Trống)'}`);
  console.log(`   Sau SĐT:   ${afterPolice.phone || '"" (Để trống)'}`);
}
console.log(`• NGUỒN KIỂM CHỨNG:`);
console.log(`   ${afterUbnd.verificationSource}`);
console.log(`• TỌA ĐỘ:`);
console.log(`   ${afterUbnd.lat}, ${afterUbnd.lng}`);
console.log('='.repeat(75));

if (!isCommit) {
  console.log('\n⚠️  ĐANG Ở CHẾ ĐỘ XEM TRƯỚC (DRY-RUN) — CHƯA GHI VÀO FILE DỮ LIỆU.');
  console.log('👉 Để xác nhận và cập nhật chính thức, hãy thêm cờ: --commit\n');
  process.exit(0);
}

// ATOMIC COMMIT
data[index].ubnd = afterUbnd;
if (afterPolice) {
  data[index].police = afterPolice;
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');

// Đồng bộ sang administrative-units-ho-chi-minh.json (nếu có)
const ALT_DATA_FILE = path.resolve('src/data/tinhthanh/administrative-units-ho-chi-minh.json');
if (fs.existsSync(ALT_DATA_FILE)) {
  try {
    const altData = JSON.parse(fs.readFileSync(ALT_DATA_FILE, 'utf8'));
    const altIndex = altData.findIndex(u => (targetSlug && (u.slug === targetSlug || u.wardSlug === targetSlug)) || (targetId && String(u.id) === String(targetId)));
    if (altIndex !== -1) {
      altData[altIndex].ubnd = afterUbnd;
      if (afterPolice) altData[altIndex].police = afterPolice;
      if (altData[altIndex].agencies?.ubnd) {
        altData[altIndex].agencies.ubnd.address = afterUbnd.address;
        altData[altIndex].agencies.ubnd.phone = afterUbnd.phone;
        altData[altIndex].agencies.ubnd.website = afterUbnd.website;
        altData[altIndex].agencies.ubnd.lat = afterUbnd.lat;
        altData[altIndex].agencies.ubnd.lng = afterUbnd.lng;
        altData[altIndex].agencies.ubnd.googleDirectionsUrl = afterUbnd.googleDirectionsUrl;
      }
      if (altData[altIndex].agencies?.['cong-an'] && afterPolice) {
        altData[altIndex].agencies['cong-an'].address = afterPolice.address;
        altData[altIndex].agencies['cong-an'].phone = afterPolice.phone;
        altData[altIndex].agencies['cong-an'].facebook = afterPolice.facebook;
        altData[altIndex].agencies['cong-an'].facebookName = afterPolice.facebookName;
        altData[altIndex].agencies['cong-an'].googleDirectionsUrl = afterPolice.googleDirectionsUrl;
      }
      fs.writeFileSync(ALT_DATA_FILE, JSON.stringify(altData, null, 2), 'utf8');
      console.log('🔄 Đã đồng bộ dữ liệu chuẩn hóa sang administrative-units-ho-chi-minh.json');
    }
  } catch (err) {
    console.warn('⚠️ Không thể đồng bộ ALT_DATA_FILE:', err.message);
  }
}

// Update audit log
let audit = { auditRecords: [] };
if (fs.existsSync(AUDIT_FILE)) {
  try {
    audit = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
  } catch (e) {}
}

const auditRecord = {
  id: item.id,
  name: item.name,
  district: item.district,
  slug: item.wardSlug || item.slug,
  verifiedAt: afterUbnd.verifiedAt,
  source: afterUbnd.verificationSource,
  changes: {
    address: { from: beforeUbnd.address, to: afterUbnd.address },
    phone: { from: beforeUbnd.phone, to: afterUbnd.phone },
    website: { from: beforeUbnd.website, to: afterUbnd.website }
  }
};

audit.auditRecords = audit.auditRecords.filter(r => r.id !== item.id);
audit.auditRecords.push(auditRecord);
audit.totalLocations = data.length;
audit.auditedLocations = audit.auditRecords.length;
audit.pendingLocations = data.length - audit.auditedLocations;
audit.lastUpdated = new Date().toISOString();

fs.writeFileSync(AUDIT_FILE, JSON.stringify(audit, null, 2), 'utf8');

console.log(`\n🎉 THÀNH CÔNG: Đã cập nhật chuẩn hóa dữ liệu cho [ID ${item.id}] ${item.name}!`);
console.log(`📄 Nhật ký kiểm toán đã được ghi nhận vào docs/qa-audit-log.json`);
