import fs from 'fs';
import path from 'path';

const MASTER_FILE = path.resolve('docs/TIEN_DO_QA_3321_PHUONG_XA.md');
const AUDIT_FILE = path.resolve('docs/qa-audit-log.json');
const HCM_FILE = path.resolve('src/data/tinhthanh/administrative-units-hcm.json');

if (!fs.existsSync(MASTER_FILE) || !fs.existsSync(AUDIT_FILE)) {
  console.error('Không tìm thấy file');
  process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
const records = audit.auditRecords || [];
const recordMap = new Map(records.map(r => [r.id, r]));

const hcmData = JSON.parse(fs.readFileSync(HCM_FILE, 'utf8'));
const hcmMap = new Map(hcmData.map(u => [u.id, u]));

let content = fs.readFileSync(MASTER_FILE, 'utf8');

// Duyệt qua từng record đã audit
records.forEach(rec => {
  const id = rec.id;
  const unit = hcmMap.get(id);
  if (!unit) return;

  const ubndAddr = unit.ubnd?.address || '';
  const ubndPhone = unit.ubnd?.phone ? ` | 📞 ${unit.ubnd.phone}` : '';
  const ubndWeb = unit.ubnd?.website ? ` | 🌐 ${unit.ubnd.website}` : '';
  const polAddr = unit.police?.address || '';
  const polPhone = unit.police?.phone ? ` | 📞 ${unit.police.phone}` : '';

  // Tìm dòng chưa tick hoặc đã tick của ID này
  const regPending = new RegExp(`- \\[ \\] \\*\\*([^\\*]+)\\*\\* \\(ID ${id}\\)[^\\n]*`, 'g');
  const regDone = new RegExp(`- \\[x\\] \\*\\*([^\\*]+)\\*\\* \\(ID ${id}\\)[^\\n]*(\\n\\s+- 🏛️[^\\n]+)?(\\n\\s+- 🛡️[^\\n]+)?`, 'g');

  const replacement = `- [x] **${unit.name}** (ID ${id}) — ✅ *ĐÃ HOÀN TẤT*\n  - 🏛️ Trụ sở: ${ubndAddr}${ubndPhone}${ubndWeb}\n  - 🛡️ Công an: ${polAddr}${polPhone}`;

  if (regPending.test(content)) {
    content = content.replace(regPending, replacement);
  } else if (regDone.test(content)) {
    content = content.replace(regDone, replacement);
  }
});

// Tính toán lại số lượng
// Đếm [x] trên toàn file
const doneMatches = content.match(/- \[x\] \*\*/g);
const totalDone = doneMatches ? doneMatches.length : 0;

// Cập nhật section header cho Quận 1 và Quận 3
content = content.replace(/#### 🏙️ Quận 1 \(\d+\/\d+\)/, '#### 🏙️ Quận 1 (4/4)');
content = content.replace(/#### 🏙️ Quận 3 \(\d+\/\d+\)/, '#### 🏙️ Quận 3 (3/3)');

// Cập nhật số lượng HCM
content = content.replace(/### 🗺️ Thành phố Hồ Chí Minh \(\d+\/168 Đã Xong\)/, `### 🗺️ Thành phố Hồ Chí Minh (${totalDone}/168 Đã Xong)`);

// Cập nhật bảng 34 tỉnh thành
content = content.replace(
  /\| 27 \| \*\*Thành phố Hồ Chí Minh\*\* \| 168 \| \d+ \| \d+ \| [^|]+ \| [^|]+ \|/,
  `| 27 | **Thành phố Hồ Chí Minh** | 168 | ${totalDone} | ${168 - totalDone} | ${((totalDone / 168) * 100).toFixed(1)}% | 🔄 Đang làm (${totalDone}/168) |`
);

// Cập nhật tổng quan
content = content.replace(
  /- \*\*Đã hoàn thành chuẩn hóa 100% \(Đã Tick \[x\]\):\*\* \d+ \/ 3319 \([^)]+\)/,
  `- **Đã hoàn thành chuẩn hóa 100% (Đã Tick [x]):** ${totalDone} / 3319 (${((totalDone / 3319) * 100).toFixed(2)}%)`
);
content = content.replace(
  /- \*\*Số lượng đang chờ thực hiện:\*\* \d+ địa điểm/,
  `- **Số lượng đang chờ thực hiện:** ${3319 - totalDone} địa điểm`
);
content = content.replace(
  /- \*\*Thời điểm cập nhật:\*\* [^\n]+/,
  `- **Thời điểm cập nhật:** ${new Date().toISOString()}`
);

fs.writeFileSync(MASTER_FILE, content, 'utf8');
console.log(`✅ Đã đồng bộ Master Progress Task Board! Tổng số hoàn tất: ${totalDone}/3319`);
