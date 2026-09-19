import fs from 'fs';
import path from 'path';

console.log('='.repeat(105));
console.log('📊 SENIOR ORCHESTRATOR: XUẤT BẢNG MASTER EXCEL ĐỐI SOÁT 3.319 PHƯỜNG XÃ CHO ĐỘI NGŨ AI');
console.log('='.repeat(105));

const provincesPath = path.resolve('src/data/tinhthanh/provinces-34.json');
const provinces = JSON.parse(fs.readFileSync(provincesPath, 'utf8'));

const columns = [
  'STT',
  'Mã Đơn Vị',
  'Tỉnh / Thành Phố',
  'Quận / Huyện / Khu Vực',
  'Tên Phường / Xã',
  'Phân Loại',
  'Diện Tích (km²)',
  'Dân Số (người)',
  'Mật Độ (người/km²)',
  'Tên Trụ Sở UBND',
  'Địa Chỉ UBND Thực Tế',
  'Vĩ Độ UBND (Lat)',
  'Kinh Độ UBND (Lng)',
  'Google Maps UBND',
  'Tên Trụ Sở Công An',
  'Địa Chỉ Công An Thực Tế',
  'Google Maps Công An',
  'Website / Cổng TTĐT',
  'Nguồn Đối Soát',
  'Trạng Thái Kiểm Tra',
  'Ghi Chú AI Senior'
];

function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

let globalIdx = 0;
const allMasterRows = [];

for (const p of provinces) {
  const filePath = path.resolve('src/data/tinhthanh', `administrative-units-${p.slug}.json`);
  if (!fs.existsSync(filePath)) continue;

  const units = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const u of units) {
    globalIdx++;
    const ubnd = u.ubnd || {};
    const police = u.police || {};

    const isVerified = ubnd.reviewStatus === 'verified';
    const statusLabel = isVerified ? 'ĐÃ XÁC MINH THỰC ĐỊA' : 'CẦN RÀ SOÁT TAY';
    const notes = ubnd.reviewNotes || (isVerified ? 'Đã đối soát tọa độ & địa chỉ số nhà thực tế' : 'Địa chỉ ước lượng - Đang chờ AI thực địa rà soát Google Maps');

    let cleanUbndMaps = ubnd.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((ubnd.name || `UBND ${u.name}`) + ', ' + p.name)}`;
    if (cleanUbndMaps.includes('Trung%20t%C3%A2m%20H%C3%A0nh%20ch%C3%ADnh') || cleanUbndMaps.includes('Th%C3%B4n%201')) {
      cleanUbndMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((ubnd.name || `UBND ${u.name}`) + ', ' + p.name)}`;
    }

    let cleanPoliceMaps = police.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((police.name || `Công An ${u.name}`) + ', ' + p.name)}`;
    if (cleanPoliceMaps.includes('Trung%20t%C3%A2m%20H%C3%A0nh%20ch%C3%ADnh') || cleanPoliceMaps.includes('Th%C3%B4n%201')) {
      cleanPoliceMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((police.name || `Công An ${u.name}`) + ', ' + p.name)}`;
    }

    allMasterRows.push({
      stt: globalIdx,
      code: u.administrativeCode || `${p.postalCode?.slice(0, 2) || '10'}${String(u.id).padStart(3, '0')}`,
      province: p.name,
      district: u.district || p.name,
      name: u.name,
      type: u.type || (u.name.startsWith('Phường') ? 'Phường' : u.name.startsWith('Thị trấn') ? 'Thị trấn' : 'Xã'),
      areaKm2: u.areaKm2 || 0,
      population: u.population || 0,
      density: u.density || (u.areaKm2 > 0 ? Math.round(u.population / u.areaKm2) : 0),
      ubndName: ubnd.name || `Ủy Ban Nhân Dân ${u.name}`,
      ubndAddress: ubnd.address || '',
      ubndLat: ubnd.lat || u.lat || 0,
      ubndLng: ubnd.lng || u.lng || 0,
      ubndMaps: cleanUbndMaps,
      policeName: police.name || `Công An ${u.name}`,
      policeAddress: police.address || '',
      policeMaps: cleanPoliceMaps,
      website: ubnd.website || '',
      source: ubnd.verificationSource || 'Cơ sở dữ liệu ĐVHC',
      status: statusLabel,
      notes
    });
  }
}

console.log(`Đã thu thập dữ liệu tổng cộng: ${allMasterRows.length} đơn vị hành chính.`);

// 1. XUẤT TỆP CSV VỚI UTF-8 BOM (Dành cho Excel / Google Sheets)
const csvLines = [];
csvLines.push(columns.map(escapeCsv).join(','));

for (const r of allMasterRows) {
  csvLines.push([
    escapeCsv(r.stt),
    escapeCsv(r.code),
    escapeCsv(r.province),
    escapeCsv(r.district),
    escapeCsv(r.name),
    escapeCsv(r.type),
    escapeCsv(r.areaKm2),
    escapeCsv(r.population),
    escapeCsv(r.density),
    escapeCsv(r.ubndName),
    escapeCsv(r.ubndAddress),
    escapeCsv(r.ubndLat),
    escapeCsv(r.ubndLng),
    escapeCsv(r.ubndMaps),
    escapeCsv(r.policeName),
    escapeCsv(r.policeAddress),
    escapeCsv(r.policeMaps),
    escapeCsv(r.website),
    escapeCsv(r.source),
    escapeCsv(r.status),
    escapeCsv(r.notes)
  ].join(','));
}

const csvContent = '\uFEFF' + csvLines.join('\r\n');
const csvFilePath = path.resolve('docs/BANG_MASTER_QA_3321_PHUONG_XA.csv');
fs.writeFileSync(csvFilePath, csvContent, 'utf8');
console.log(`✅ Đã xuất tệp CSV Master (UTF-8 BOM): ${csvFilePath}`);

// 2. XUẤT TỆP EXCEL NATIVE (.XLS HTML Spreadsheet có styling, kẻ bảng và màu sắc)
let xlsHtml = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<style>
  th { background-color: #1e3a8a; color: #ffffff; font-family: Arial, sans-serif; font-size: 11pt; font-weight: bold; border: 1px solid #000000; padding: 6px; text-align: center; }
  td { font-family: Arial, sans-serif; font-size: 10pt; border: 1px solid #cbd5e1; padding: 5px; vertical-align: middle; }
  .status-verified { background-color: #dcfce7; color: #166534; font-weight: bold; text-align: center; }
  .status-pending { background-color: #fef9c3; color: #854d0e; font-weight: bold; text-align: center; }
  .num { text-align: right; }
  .center { text-align: center; }
</style>
</head>
<body>
<table border="1">
  <thead>
    <tr>
      ${columns.map(c => `<th>${c}</th>`).join('')}
    </tr>
  </thead>
  <tbody>
`;

for (const r of allMasterRows) {
  const isV = r.status === 'ĐÃ XÁC MINH THỰC ĐỊA';
  xlsHtml += `    <tr>
      <td class="center">${r.stt}</td>
      <td class="center">${r.code}</td>
      <td><strong>${r.province}</strong></td>
      <td>${r.district}</td>
      <td><strong>${r.name}</strong></td>
      <td class="center">${r.type}</td>
      <td class="num">${r.areaKm2}</td>
      <td class="num">${r.population}</td>
      <td class="num">${r.density}</td>
      <td>${r.ubndName}</td>
      <td>${r.ubndAddress}</td>
      <td class="num">${r.ubndLat}</td>
      <td class="num">${r.ubndLng}</td>
      <td><a href="${r.ubndMaps}">${r.ubndMaps ? 'Mở Google Maps' : ''}</a></td>
      <td>${r.policeName}</td>
      <td>${r.policeAddress}</td>
      <td><a href="${r.policeMaps}">${r.policeMaps ? 'Mở Google Maps' : ''}</a></td>
      <td><a href="${r.website}">${r.website}</a></td>
      <td>${r.source}</td>
      <td class="${isV ? 'status-verified' : 'status-pending'}">${r.status}</td>
      <td>${r.notes}</td>
    </tr>\n`;
}

xlsHtml += `  </tbody>
</table>
</body>
</html>`;

const xlsFilePath = path.resolve('docs/BANG_MASTER_QA_3321_PHUONG_XA.xls');
try {
  fs.writeFileSync(xlsFilePath, xlsHtml, 'utf8');
  console.log(`✅ Đã xuất tệp Excel Master (.xls): ${xlsFilePath}`);
} catch (err) {
  if (err.code === 'EBUSY') {
    const fallbackXls = path.resolve('docs/BANG_MASTER_QA_3321_PHUONG_XA_MOI_NHAT.xls');
    fs.writeFileSync(fallbackXls, xlsHtml, 'utf8');
    console.log(`⚠️ Tệp BANG_MASTER_QA_3321_PHUONG_XA.xls đang được mở trong phần mềm Excel.`);
    console.log(`✅ Đã xuất tệp Excel Master mới nhất vào: ${fallbackXls}`);
  } else {
    throw err;
  }
}

// Thống kê sơ bộ
const verifiedCount = allMasterRows.filter(r => r.status === 'ĐÃ XÁC MINH THỰC ĐỊA').length;
const pendingCount = allMasterRows.length - verifiedCount;
console.log(`\n📈 TỔNG KẾT BẢNG EXCEL MASTER:`);
console.log(`- Tổng đơn vị: ${allMasterRows.length}`);
console.log(`- Đã xác minh thực địa 100%: ${verifiedCount} đơn vị (${((verifiedCount/allMasterRows.length)*100).toFixed(1)}%)`);
console.log(`- Đang xếp lịch chờ AI thực địa rà soát tay: ${pendingCount} đơn vị (${((pendingCount/allMasterRows.length)*100).toFixed(1)}%)`);
