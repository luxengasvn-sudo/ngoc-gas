import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/data/tinhthanh');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('administrative-units-') && f.endsWith('.json'));

const FAKE_STREET_REGEX = /Số\s+\d+\s+Đường\s+(Bà Triệu|Quang Trung|Nguyễn Trãi|Lê Lợi|Trần Phú|Hùng Vương|Điện Biên Phủ|Võ Nguyên Giáp)(,\s*)?/gi;

let totalReplacements = 0;

files.forEach(f => {
  const filePath = path.join(dataDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const matches = content.match(FAKE_STREET_REGEX);
  if (matches) {
    totalReplacements += matches.length;
    content = content.replace(FAKE_STREET_REGEX, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ${matches.length} matches in ${f}`);
  }
});

console.log(`\n🎉 HOÀN TẤT LOẠI BỎ TOÀN BỘ ${totalReplacements} CHUỖI TỰ SINH CỘNG 7 KHỎI MỌI TỆP!`);
