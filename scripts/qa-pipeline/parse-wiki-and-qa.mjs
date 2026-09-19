import fs from 'fs';
import path from 'path';

// 1. Read wikitext
const wikitext = fs.readFileSync('scripts/qa-pipeline/wiki-provincial-wikitext.txt', 'utf8');

// The table starts at {| class="wikitable sortable mw-collapsible"
const tableStart = wikitext.indexOf('{| class="wikitable sortable mw-collapsible"');
const tableEnd = wikitext.indexOf('|}', tableStart);
const tableContent = wikitext.slice(tableStart, tableEnd);

// Split rows by |-
const rawRows = tableContent.split('\n|-');
const parsedWikiProvinces = [];

function cleanWikiText(str) {
  if (!str) return '';
  return str
    .replace(/^\|/, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/'''?/g, '')
    .replace(/<ref[^>]*>.*?<\/ref>/g, '')
    .replace(/<ref[^>]*\/>/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function parseNumber(str) {
  if (!str) return 0;
  const cleaned = cleanWikiText(str).replace(/\s+/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

for (const row of rawRows) {
  const lines = row.split('\n').map(l => l.trim()).filter(l => l.startsWith('|') && !l.startsWith('|class=') && !l.startsWith('| style='));
  if (lines.length < 8) continue;

  const stt = parseInt(cleanWikiText(lines[0]));
  if (isNaN(stt) || stt < 1 || stt > 34) continue;

  const name = cleanWikiText(lines[1]);
  const center = cleanWikiText(lines[2]);

  // Last 3 cells are always Phường, Xã, Đặc khu
  const specialZones = parseNumber(lines[lines.length - 1]);
  const communes = parseNumber(lines[lines.length - 2]);
  const wards = parseNumber(lines[lines.length - 3]);
  const density = parseNumber(lines[lines.length - 4]);
  const population = parseNumber(lines[lines.length - 5]);
  const areaKm2 = parseNumber(lines[lines.length - 6]);

  parsedWikiProvinces.push({
    stt,
    name: name.replace(/^TP\.\s*/, 'Thành phố ').trim(),
    cleanName: name.replace(/^TP\.\s*/, '').replace(/^(Thành phố|Tỉnh)\s*/i, '').trim(),
    center,
    areaKm2,
    population,
    density,
    wards,
    communes,
    specialZones,
    totalUnits: wards + communes + specialZones
  });
}

console.log(`Đã bóc tách thành công ${parsedWikiProvinces.length}/34 Tỉnh Thành từ Wikipedia.`);
fs.writeFileSync('scripts/qa-pipeline/wiki-parsed-provinces.json', JSON.stringify(parsedWikiProvinces, null, 2), 'utf8');

// Print first 5 and last 5
console.log('Top 3:', parsedWikiProvinces.slice(0, 3));
console.log('Bottom 3:', parsedWikiProvinces.slice(-3));
