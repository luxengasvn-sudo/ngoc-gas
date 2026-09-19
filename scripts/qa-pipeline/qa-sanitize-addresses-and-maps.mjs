import fs from 'fs';
import path from 'path';

const provincesPath = path.resolve('src/data/tinhthanh/provinces-34.json');
const provinces = JSON.parse(fs.readFileSync(provincesPath, 'utf8'));

console.log('='.repeat(100));
console.log('🧹 CHUẨN HÓA SẠCH ĐỊA CHỈ HIỂN THỊ & LIÊN KẾT GOOGLE MAPS TRÊN 34 TỈNH THÀNH');
console.log('='.repeat(100));

function sanitizeAddress(addr, provinceName) {
  if (!addr) return '';
  let cleaned = addr.trim();

  // Remove trailing duplicate province additions
  if (/Tỉnh Bình Dương|Tỉnh Bà Rịa - Vũng Tàu|Tỉnh Đồng Nai|Tỉnh Tây Ninh/i.test(cleaned)) {
    cleaned = cleaned.replace(/,\s*(Thành phố Hồ Chí Minh|TP\.\s*Hồ Chí Minh)$/i, '');
  }

  cleaned = cleaned.replace(/,\s*Thành phố Hồ Chí Minh,\s*Thành phố Hồ Chí Minh/gi, ', TP. Hồ Chí Minh');
  cleaned = cleaned.replace(/,\s*Thành phố Hà Nội,\s*Thành phố Hà Nội/gi, ', TP. Hà Nội');
  cleaned = cleaned.replace(/,\s*Thành phố Hải Phòng,\s*Thành phố Hải Phòng/gi, ', TP. Hải Phòng');
  cleaned = cleaned.replace(/,\s*Thành phố Đà Nẵng,\s*Thành phố Đà Nẵng/gi, ', TP. Đà Nẵng');
  cleaned = cleaned.replace(/,\s*Thành phố Cần Thơ,\s*Thành phố Cần Thơ/gi, ', TP. Cần Thơ');
  cleaned = cleaned.replace(/,\s*Thành phố Huế,\s*Thành phố Huế/gi, ', TP. Huế');

  // Strip repeated identical endings like ", Tỉnh X, Tỉnh X"
  const parts = cleaned.split(',').map(s => s.trim()).filter(Boolean);
  const dedupParts = [];
  for (let i = 0; i < parts.length; i++) {
    if (i === 0 || parts[i].toLowerCase() !== parts[i - 1].toLowerCase()) {
      dedupParts.push(parts[i]);
    }
  }
  cleaned = dedupParts.join(', ');

  // If no province specified at all, add provinceName
  const hasProvince = /Tỉnh\s+[A-ZÀ-Ỹa-zà-ỹ\s-]+|Thành phố\s+[A-ZÀ-Ỹa-zà-ỹ\s-]+|TP\.\s*[A-ZÀ-Ỹa-zà-ỹ\s-]+/i.test(cleaned);
  if (!hasProvince) {
    cleaned = `${cleaned}, ${provinceName}`;
  }

  return cleaned;
}

let totalCleaned = 0;

for (const p of provinces) {
  const filePath = path.resolve('src/data/tinhthanh', `administrative-units-${p.slug}.json`);
  if (!fs.existsSync(filePath)) continue;

  const units = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (let i = 0; i < units.length; i++) {
    const u = units[i];

    // Clean UBND address
    if (u.ubnd) {
      u.ubnd.address = sanitizeAddress(u.ubnd.address, p.name);
      u.ubnd.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((u.ubnd.name || ('Ủy Ban Nhân Dân ' + u.name)) + ', ' + u.ubnd.address)}`;
      u.ubnd.googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((u.ubnd.name || ('Ủy Ban Nhân Dân ' + u.name)) + ', ' + u.ubnd.address)}`;
    }

    // Clean Police address
    if (u.police) {
      u.police.address = sanitizeAddress(u.police.address, p.name);
      u.police.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((u.police.name || ('Công An ' + u.name)) + ', ' + u.police.address)}`;
      u.police.googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((u.police.name || ('Công An ' + u.name)) + ', ' + u.police.address)}`;
    }

    totalCleaned++;
  }

  fs.writeFileSync(filePath, JSON.stringify(units, null, 2), 'utf8');

  // Sync alias files
  const aliasMap = {
    'ha-noi': 'hanoi',
    'ho-chi-minh': 'hcm',
    'lai-chau': 'laichau',
    'ninh-binh': 'ninhbinh'
  };

  if (aliasMap[p.slug]) {
    const aliasPath = path.resolve('src/data/tinhthanh', `administrative-units-${aliasMap[p.slug]}.json`);
    fs.writeFileSync(aliasPath, JSON.stringify(units, null, 2), 'utf8');
  }
}

console.log(`✅ Đã làm sạch và chuẩn hóa địa chỉ + link Google Maps cho toàn bộ ${totalCleaned} đơn vị hành chính!`);
