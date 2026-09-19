import fs from 'fs';
import path from 'path';

const STATE_FILE = path.resolve('docs/qa-pipeline-state.json');
const AUDIT_FILE = path.resolve('docs/qa-audit-log.json');
const HCM_FILE = path.resolve('src/data/tinhthanh/administrative-units-hcm.json');

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
const action = args.action || 'status';

if (!fs.existsSync(STATE_FILE)) {
  console.error('❌ Không tìm thấy docs/qa-pipeline-state.json');
  process.exit(1);
}

const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
const TASKBOARD_FILE = path.resolve('docs/qa-locations-taskboard.md');

function updateTaskboard() {
  const data = JSON.parse(fs.readFileSync(HCM_FILE, 'utf8'));
  const audit = fs.existsSync(AUDIT_FILE) ? JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8')) : { auditRecords: [] };
  const auditMap = new Map((audit.auditRecords || []).map(r => [r.id, r]));

  const groups = {};
  data.forEach(u => {
    const dist = u.district || 'Khác';
    if (!groups[dist]) groups[dist] = [];
    groups[dist].push(u);
  });

  const lines = [];
  lines.push('# 📋 BẢNG THEO DÕI NHIỆM VỤ AI QA TỪNG PHƯỜNG / XÃ (TASK BOARD)');
  lines.push('');
  lines.push('> **Tôn chỉ thực thi:** Truy tìm từng địa chỉ một thật chuẩn xác — Chậm mà chắc từng cơ quan một từ cấp Tỉnh đến cấp Phường/Xã. Không bỏ sót bất kỳ điểm nào.');
  lines.push('');

  const total = data.length;
  const doneCount = data.filter(u => auditMap.has(u.id)).length;
  const pct = ((doneCount / total) * 100).toFixed(1);

  lines.push('## 📊 Tiến Độ Tổng Quan');
  lines.push('');
  lines.push(`- **Tổng số đơn vị hành chính:** \`${total}\` địa điểm`);
  lines.push(`- **Đã hoàn thành chuẩn hóa (Đã Tick):** \`${doneCount}\` / \`${total}\` (${pct}%)`);
  lines.push(`- **Còn lại đang chờ:** \`${total - doneCount}\` địa điểm`);
  lines.push(`- **Giai đoạn hiện tại:** \`${state.currentPhase}\``);
  lines.push(`- **Cập nhật lần cuối:** \`${new Date().toISOString()}\``);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const [dist, wards] of Object.entries(groups)) {
    const distDone = wards.filter(w => auditMap.has(w.id)).length;
    lines.push(`### 🏙️ ${dist} (${distDone}/${wards.length})`);
    lines.push('');
    wards.forEach(w => {
      const isDone = auditMap.has(w.id);
      const rec = auditMap.get(w.id);
      if (isDone) {
        const ubndAddr = w.ubnd?.address || rec?.changes?.address?.to || '';
        const ubndPhone = w.ubnd?.phone ? (` | 📞 ${w.ubnd.phone}`) : '';
        const ubndWeb = w.ubnd?.website ? (` | 🌐 ${w.ubnd.website}`) : '';
        lines.push(`- [x] **[ID ${w.id}] ${w.name}** — ✅ *ĐÃ HOÀN TẤT*`);
        lines.push(`  - 🏛️ Trụ sở: \`${ubndAddr}\`${ubndPhone}${ubndWeb}`);
        if (w.police?.address) {
          lines.push(`  - 🛡️ Công an: \`${w.police.address}\`${w.police.phone ? (` | 📞 ${w.police.phone}`) : ''}`);
        }
      } else {
        lines.push(`- [ ] **[ID ${w.id}] ${w.name}** — ⏳ *Đang chờ xử lý*`);
      }
    });
    lines.push('');
  }

  fs.writeFileSync(TASKBOARD_FILE, lines.join('\n'), 'utf8');
}

if (action === 'status') {
  const total = state.units.length;
  const passedP1 = state.units.filter(u => u.status_pass1 === 'PASSED').length;
  const passedP2 = state.units.filter(u => u.status_pass2 === 'VERIFIED').length;
  const active = state.units.find(u => u.status_pass1 === 'PENDING' || u.status_pass1 === 'IN_PROGRESS');

  console.log('='.repeat(70));
  console.log('📊 TIẾN ĐỘ QUY TRÌNH AI QA (TỈNH -> HUYỆN -> PHƯỜNG XÃ)');
  console.log('='.repeat(70));
  console.log(`• Giai đoạn hiện tại: ${state.currentPhase}`);
  console.log(`• Tổng số địa điểm:   ${total}`);
  console.log(`• Vòng 1 (Chuẩn hóa): ${passedP1}/${total} (${((passedP1/total)*100).toFixed(1)}%)`);
  console.log(`• Vòng 2 (Hồi quy):   ${passedP2}/${total} (${((passedP2/total)*100).toFixed(1)}%)`);
  if (active) {
    console.log(`• Địa điểm đang chờ:  [ID ${active.id}] ${active.name} (${active.district})`);
    console.log(`  Slug: ${active.slug}`);
  } else {
    console.log(`🎉 ĐÃ HOÀN TẤT VÒNG 1!`);
  }
  console.log('='.repeat(70));
  process.exit(0);
}

if (action === 'current') {
  const active = state.units.find(u => u.id === Number(args.id)) || state.units.find(u => u.status_pass1 === 'PENDING' || u.status_pass1 === 'IN_PROGRESS');
  if (!active) {
    console.log('🎉 Không còn đơn vị nào PENDING.');
    process.exit(0);
  }
  const hcm = JSON.parse(fs.readFileSync(HCM_FILE, 'utf8'));
  const raw = hcm.find(u => u.id === active.id);
  console.log(JSON.stringify({
    pipelineItem: active,
    currentData: raw
  }, null, 2));
  process.exit(0);
}

if (action === 'pass') {
  const targetId = Number(args.id);
  if (!targetId) {
    console.error('❌ Cần truyền --id=<id>');
    process.exit(1);
  }
  const idx = state.units.findIndex(u => u.id === targetId);
  if (idx === -1) {
    console.error(`❌ Không tìm thấy ID ${targetId}`);
    process.exit(1);
  }

  if (state.currentPhase === 'PASS_1') {
    state.units[idx].status_pass1 = 'PASSED';
    state.units[idx].lastUpdated = new Date().toISOString();
    state.passedPass1 = state.units.filter(u => u.status_pass1 === 'PASSED').length;
  } else {
    state.units[idx].status_pass2 = 'VERIFIED';
    state.units[idx].pass2VerifiedAt = new Date().toISOString();
    state.passedPass2 = state.units.filter(u => u.status_pass2 === 'VERIFIED').length;
  }

  state.activeUnit = state.units.find(u => u.status_pass1 === 'PENDING') || null;
  state.updatedAt = new Date().toISOString();

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  updateTaskboard();
  console.log(`✅ [AI SENIOR APPROVAL]: Đã duyệt PASS và TICK [x] trên Task Board cho [ID ${targetId}] ${state.units[idx].name}!`);
  if (state.activeUnit) {
    console.log(`👉 Bàn giao điểm kế tiếp cho AI Check Thông Tin: [ID ${state.activeUnit.id}] ${state.activeUnit.name} (${state.activeUnit.district})`);
  } else {
    console.log('🎉 ĐÃ HOÀN TẤT VÒNG 1! Có thể kích hoạt VÒNG LẶP 2 với --action=start-pass2');
  }
  process.exit(0);
}

if (action === 'start-pass2') {
  state.currentPhase = 'PASS_2';
  state.units.forEach(u => {
    u.status_pass2 = 'PENDING';
  });
  state.passedPass2 = 0;
  state.activeUnit = state.units[0];
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  console.log('🔄 ĐÃ KHỞI ĐỘNG VÒNG LẶP 2 (REGRESSION TEST TOÀN DIỆN)!');
  process.exit(0);
}
