import fs from 'fs';
import path from 'path';

const PROVINCES_FILE = path.resolve('src/data/tinhthanh/provinces-34.json');
const AUDIT_FILE = path.resolve('docs/qa-audit-log.json');
const MASTER_FILE = path.resolve('docs/TIEN_DO_QA_3321_PHUONG_XA.md');

const provinces = JSON.parse(fs.readFileSync(PROVINCES_FILE, 'utf8'));
const audit = fs.existsSync(AUDIT_FILE) ? JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8')) : { auditRecords: [] };
const auditRecords = audit.auditRecords || [];

// Helper để nạp data từng tỉnh theo đúng logic tinhthanhUnitsHelper.js
function loadUnitsForProvince(slug) {
  const fileMap = {
    'ho-chi-minh': 'administrative-units-hcm.json',
    'ha-noi': 'administrative-units-hanoi.json',
    'ninh-binh': 'administrative-units-ninhbinh.json',
    'lai-chau': 'administrative-units-laichau.json',
  };

  const filename = fileMap[slug] || `administrative-units-${slug}.json`;
  const filePath = path.resolve(`src/data/tinhthanh/${filename}`);

  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
}

// Map audit theo province và unit ID
// Lưu ý: Các audit record hiện tại đều thuộc ho-chi-minh (trừ Thường Tân, Bình Cơ)
const hcmUnits = loadUnitsForProvince('ho-chi-minh');
const hcmUnitMap = new Map(hcmUnits.map(u => [u.id, u]));

const lines = [];

lines.push('# 📋 TIẾN ĐỘ AI QA 3.321 PHƯỜNG / XÃ TOÀN QUỐC (TASK BOARD TẬP TRUNG)');
lines.push('');
lines.push('> **Tôn chỉ thực thi:** Truy tìm từng địa chỉ một thật chuẩn xác — Chậm mà chắc từng cơ quan một từ cấp Tỉnh đến cấp Phường/Xã. Tuyệt đối không bỏ sót bất kỳ điểm nào. Hoàn tất Vòng 1 sẽ quay lại kiểm toán đối chứng Vòng 2.');
lines.push('');

// Thu thập data của 34 tỉnh
const provinceStats = [];
let grandTotalUnits = 0;
let grandTotalDone = 0;

const provinceSections = [];

for (let i = 0; i < provinces.length; i++) {
  const p = provinces[i];
  const units = loadUnitsForProvince(p.slug);
  const total = units.length;
  grandTotalUnits += total;

  // Lọc các đơn vị đã pass trong tỉnh này
  const pDoneUnits = [];
  const pPendingUnits = [];

  units.forEach(u => {
    let isDone = false;
    let rec = null;

    // Match by province (or default ho-chi-minh) and id/name
    rec = auditRecords.find(r => {
      const pMatch = r.province ? (r.province === p.slug || r.province === p.name) : (p.slug === 'ho-chi-minh');
      return pMatch && r.id === u.id && (r.name === u.name || r.unitName === u.name);
    });
    if (rec) isDone = true;

    if (isDone) {
      pDoneUnits.push({ unit: u, record: rec });
    } else {
      pPendingUnits.push(u);
    }
  });

  const doneCount = pDoneUnits.length;
  grandTotalDone += doneCount;
  const pct = total > 0 ? ((doneCount / total) * 100).toFixed(1) : '0.0';

  provinceStats.push({
    index: i + 1,
    name: p.name,
    slug: p.slug,
    total,
    done: doneCount,
    remain: total - doneCount,
    pct,
    status: doneCount === total && total > 0 ? '✅ Hoàn thành 100%' : (doneCount > 0 ? `🔄 Đang làm (${doneCount}/${total})` : '⏳ Chờ duyệt')
  });

  // Gom nhóm theo Quận / Huyện
  const districtGroups = {};
  units.forEach(u => {
    const dist = u.district || 'Khu vực trực thuộc';
    if (!districtGroups[dist]) districtGroups[dist] = [];
    districtGroups[dist].push(u);
  });

  const pSecLines = [];
  pSecLines.push(`### 🗺️ ${p.name} (${doneCount}/${total} Đã Xong)`);
  pSecLines.push('');

  for (const [dist, dUnits] of Object.entries(districtGroups)) {
    const dDoneCount = dUnits.filter(u => pDoneUnits.some(du => du.unit.id === u.id)).length;
    pSecLines.push(`#### 🏙️ ${dist} (${dDoneCount}/${dUnits.length})`);
    pSecLines.push('');

    dUnits.forEach(u => {
      const doneObj = pDoneUnits.find(du => du.unit.id === u.id);
      if (doneObj) {
        const ubndAddr = u.ubnd?.address || '';
        const ubndPhone = u.ubnd?.phone ? ` | 📞 ${u.ubnd.phone}` : '';
        const ubndWeb = u.ubnd?.website ? ` | 🌐 ${u.ubnd.website}` : '';
        const polAddr = u.police?.address || '';
        const polPhone = u.police?.phone ? ` | 📞 ${u.police.phone}` : '';

        pSecLines.push(`- [x] **${u.name}** (ID ${u.id}) — ✅ *ĐÃ HOÀN TẤT*`);
        pSecLines.push(`  - 🏛️ Trụ sở: ${ubndAddr}${ubndPhone}${ubndWeb}`);
        if (polAddr) {
          pSecLines.push(`  - 🛡️ Công an: ${polAddr}${polPhone}`);
        }
      } else {
        pSecLines.push(`- [ ] **${u.name}** (ID ${u.id}) — ⏳ *Đang chờ xử lý*`);
      }
    });
    pSecLines.push('');
  }

  provinceSections.push(pSecLines.join('\n'));
}

// 1. Tổng quan
lines.push('## 📊 1. BẢNG TIẾN ĐỘ TỔNG QUAN HỆ THỐNG');
lines.push('');
lines.push(`- **Tổng số đơn vị hành chính toàn quốc:** ${grandTotalUnits} Phường / Xã / Thị trấn (34 Tỉnh / Thành phố)`);
lines.push(`- **Đã hoàn thành chuẩn hóa 100% (Đã Tick [x]):** ${grandTotalDone} / ${grandTotalUnits} (${((grandTotalDone / grandTotalUnits) * 100).toFixed(2)}%)`);
lines.push(`- **Số lượng đang chờ thực hiện:** ${grandTotalUnits - grandTotalDone} địa điểm`);
lines.push(`- **Giai đoạn hiện tại:** VÒNG 1 (Chuẩn hóa tuần tự từng địa điểm)`);
lines.push(`- **Thời điểm cập nhật:** ${new Date().toISOString()}`);
lines.push('');
lines.push('---');
lines.push('');

// 2. Bảng 34 tỉnh thành
lines.push('## 🏛️ 2. BẢNG TIẾN ĐỘ THEO 34 TỈNH / THÀNH PHỐ');
lines.push('');
lines.push('| STT | Tỉnh / Thành Phố | Tổng Số Phường/Xã | Đã Xong (Tick) | Còn Lại | Tiến Độ | Trạng Thái |');
lines.push('| :---: | :--- | :---: | :---: | :---: | :---: | :---: |');

provinceStats.forEach(st => {
  lines.push(`| ${st.index} | **${st.name}** | ${st.total} | ${st.done} | ${st.remain} | ${st.pct}% | ${st.status} |`);
});

lines.push('');
lines.push('---');
lines.push('');

// 3. Chi tiết từng địa điểm
lines.push(`## 📝 3. CHI TIẾT NHIỆM VỤ TỪNG ĐỊA ĐIỂM (DANH MỤC ${grandTotalUnits} PHƯỜNG / XÃ)`);
lines.push('');
lines.push(provinceSections.join('\n'));

fs.writeFileSync(MASTER_FILE, lines.join('\n'), 'utf8');

console.log(`🎉 ĐÃ XUẤT MASTER TASK BOARD THÀNH CÔNG:`);
console.log(`• Tổng số ĐVHC: ${grandTotalUnits}`);
console.log(`• Đã hoàn tất:  ${grandTotalDone}`);
console.log(`• Tệp xuất:     ${MASTER_FILE}`);
