import fs from 'fs';
import path from 'path';

console.log('='.repeat(100));
console.log('🛡️ TRẢ LẠI 100% SỰ THẬT CHO DỮ LIỆU: HỦY BỎ TOÀN BỘ CỜ VERIFIED GIẢ ĐỊNH');
console.log('='.repeat(100));

const dataDir = path.resolve('src/data/tinhthanh');
const provincesFile = path.join(dataDir, 'provinces-34.json');
const provinces = JSON.parse(fs.readFileSync(provincesFile, 'utf8'));

let revertedCount = 0;
let honestVerifiedCount = 0;

for (const p of provinces) {
  const f = path.join(dataDir, `administrative-units-${p.slug}.json`);
  if (!fs.existsSync(f)) continue;

  const units = JSON.parse(fs.readFileSync(f, 'utf8'));
  let changed = false;

  units.forEach(u => {
    const notes = u.ubnd?.reviewNotes || '';
    
    // Đặc cách giữ nguyên Phường Vân Hà vì User vừa đối soát thực địa Google Maps
    if (u.name.includes('Vân Hà')) {
      honestVerifiedCount++;
      return;
    }

    // Nếu bị gán cờ bởi kịch bản template vừa rồi thì trả về đúng trạng thái CHỜ TRA CỨU
    if (notes.includes('chuẩn hóa vị trí khu phố đô thị') || notes.includes('chuẩn hóa thôn/xóm/ấp thực tế theo quy chuẩn')) {
      changed = true;
      revertedCount++;
      
      u.ubnd.reviewStatus = 'pending';
      u.ubnd.reviewNotes = 'Chưa tra cứu Google Maps thực địa — Đang xếp hàng chờ AI lấy địa chỉ/tọa độ thật';
    } else if (u.ubnd?.reviewStatus === 'verified') {
      honestVerifiedCount++;
    }
  });

  if (changed) {
    fs.writeFileSync(f, JSON.stringify(units, null, 2), 'utf8');
  }
}

console.log(`\n📊 KẾT QUẢ ĐỐI SOÁT TRUNG THỰC:`);
console.log(`- Đã hủy cờ xác minh ảo của: ${revertedCount} đơn vị (Chuyển về PENDING)`);
console.log(`- Số đơn vị ĐÃ XÁC MINH THỰC ĐỊA THẬT: ${honestVerifiedCount} đơn vị`);
