import fs from 'fs';
import path from 'path';

async function fetchWikiPage(title) {
  const url = `https://vi.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.parse || !data.parse.wikitext) {
    throw new Error(`Failed to fetch ${title}: ` + JSON.stringify(data));
  }
  return data.parse.wikitext['*'];
}

function parseWikiNumber(str) {
  if (!str) return 0;
  // Vietnam format: dot is thousands separator, comma is decimal separator
  // e.g. "6.700,39" -> 6700.39, "1.404.587" -> 1404587, "120,70" -> 120.7
  const cleaned = str.replace(/\./g, '').replace(/,/g, '.').replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
}

async function extractProvinces() {
  console.log('Fetching Đơn vị hành chính cấp tỉnh (Việt Nam)...');
  const wikitext = await fetchWikiPage('Đơn vị hành chính cấp tỉnh (Việt Nam)');
  
  // Find the table in == Danh sách ==
  const dsIndex = wikitext.indexOf('== Danh sách ==');
  const tablePart = wikitext.slice(dsIndex);
  const rows = tablePart.split('\n|-');
  
  const provinces = [];
  let currentRegion = '';

  for (let r of rows) {
    const clean = r.replace(/<ref[\s\S]*?<\/ref>/gi, '').replace(/<ref[^\/>]*\/>/gi, '');
    const cells = clean.split('\n|').map(c => c.trim()).filter(c => c && !c.startsWith('class=') && !c.startsWith('-'));
    
    // Check if cell 0 is numeric order 1..34
    if (cells.length >= 9 && /^\d+$/.test(cells[0])) {
      const stt = parseInt(cells[0]);
      const rawName = cells[1].replace(/'''/g, '').replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1').trim();
      const center = cells[2].replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1').trim();
      
      let region = currentRegion;
      let estYear = '';
      let areaRaw = '';
      let popRaw = '';
      let densityRaw = '';
      let wardsRaw = '';
      let communesRaw = '';
      let specialZonesRaw = '0';

      if (!/^\d{4}$/.test(cells[3])) {
        // This row defines a new region with rowspan
        const regMatch = cells[3].replace(/rowspan="\d+"\s*\|\s*/i, '').replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1').replace(/<br\s*\/?>/gi, ' ').trim();
        currentRegion = regMatch;
        region = currentRegion;
        estYear = cells[4].trim();
        areaRaw = cells[5].trim();
        popRaw = cells[6].trim();
        densityRaw = cells[7].trim();
        wardsRaw = cells[8].trim();
        communesRaw = cells[9].trim();
        specialZonesRaw = cells[10] ? cells[10].replace(/\|\}$/, '').trim() : '0';
      } else {
        // Region inherited from currentRegion, cell 3 is estYear
        estYear = cells[3].trim();
        areaRaw = cells[4].trim();
        popRaw = cells[5].trim();
        densityRaw = cells[6].trim();
        wardsRaw = cells[7].trim();
        communesRaw = cells[8].trim();
        specialZonesRaw = cells[9] ? cells[9].replace(/\|\}$/, '').trim() : '0';
      }
      
      const areaKm2 = parseWikiNumber(areaRaw);
      const population = parseWikiNumber(popRaw);
      const density = parseWikiNumber(densityRaw);
      const wards = parseInt(wardsRaw) || 0;
      const communes = parseInt(communesRaw) || 0;
      const specialZones = parseInt(specialZonesRaw) || 0;
      const totalUnits = wards + communes + specialZones;
      
      provinces.push({
        stt,
        name: rawName,
        center,
        region,
        estYear,
        areaRaw,
        areaKm2,
        popRaw,
        population,
        density,
        wards,
        communes,
        specialZones,
        totalUnits
      });
    }
  }
  return provinces;
}

async function extractHcmUnits() {
  console.log('Fetching Danh sách đơn vị hành chính thuộc Thành phố Hồ Chí Minh...');
  const wikitext = await fetchWikiPage('Danh sách đơn vị hành chính thuộc Thành phố Hồ Chí Minh');
  
  const rows = wikitext.split('\n|-');
  const units = [];
  
  for (let r of rows) {
    const clean = r.replace(/<ref[\s\S]*?<\/ref>/gi, '').replace(/<ref[^\/>]*\/>/gi, '');
    const cells = clean.split('\n|').map(c => c.trim()).filter(c => c && !c.startsWith('class=') && !c.startsWith('-'));
    
    if (cells.length >= 4 && /^\d+$/.test(cells[0])) {
      const stt = parseInt(cells[0]);
      const fullName = cells[1].replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1').replace(/\s+/g, ' ').trim();
      const areaRaw = cells[2].trim();
      const popRaw = cells[3].trim();
      const subdivisionRaw = cells[4] ? cells[4].trim() : '';
      
      const areaKm2 = parseWikiNumber(areaRaw);
      const population = parseWikiNumber(popRaw);
      const density = areaKm2 > 0 ? Math.round(population / areaKm2) : 0;
      
      let type = 'Phường';
      let name = fullName;
      if (fullName.startsWith('Phường ')) {
        type = 'Phường';
        name = fullName.replace(/^Phường /, '');
      } else if (fullName.startsWith('Xã ')) {
        type = 'Xã';
        name = fullName.replace(/^Xã /, '');
      } else if (fullName.startsWith('Đặc khu ')) {
        type = 'Đặc khu';
        name = fullName.replace(/^Đặc khu /, '');
      }
      
      units.push({
        stt,
        fullName,
        name,
        type,
        areaRaw,
        areaKm2,
        popRaw,
        population,
        density,
        subdivisionRaw
      });
    }
  }
  return units;
}

async function main() {
  const provinces = await extractProvinces();
  console.log(`Successfully parsed ${provinces.length} provinces from Wikipedia!`);
  
  const hcmUnits = await extractHcmUnits();
  console.log(`Successfully parsed ${hcmUnits.length} HCM units from Wikipedia!`);
  
  // Save to scratch files for audit and comparison
  const outDir = path.join(process.cwd(), 'scripts', 'scratch');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outDir, 'wiki-provinces-34.json'),
    JSON.stringify(provinces, null, 2),
    'utf-8'
  );
  
  fs.writeFileSync(
    path.join(outDir, 'wiki-hcm-units-168.json'),
    JSON.stringify(hcmUnits, null, 2),
    'utf-8'
  );
  
  console.log('Saved to scripts/scratch/wiki-provinces-34.json and scripts/scratch/wiki-hcm-units-168.json');
}

main().catch(console.error);
