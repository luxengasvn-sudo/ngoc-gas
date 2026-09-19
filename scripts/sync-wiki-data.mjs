import fs from 'fs';
import path from 'path';

const wikiProvincesPath = path.join(process.cwd(), 'scripts', 'scratch', 'wiki-provinces-34.json');
const wikiHcmUnitsPath = path.join(process.cwd(), 'scripts', 'scratch', 'wiki-hcm-units-168.json');

const targetProvincesPath = path.join(process.cwd(), 'src', 'data', 'tinhthanh', 'provinces-34.json');
const targetHcmUnitsPath = path.join(process.cwd(), 'src', 'data', 'tinhthanh', 'administrative-units-hcm.json');

const wikiProvinces = JSON.parse(fs.readFileSync(wikiProvincesPath, 'utf8'));
const wikiHcmUnits = JSON.parse(fs.readFileSync(wikiHcmUnitsPath, 'utf8'));

const currentProvinces = JSON.parse(fs.readFileSync(targetProvincesPath, 'utf8'));
const currentHcmUnits = JSON.parse(fs.readFileSync(targetHcmUnitsPath, 'utf8'));

function normalize(s) {
  return (s || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/^(tinh|thanhpho|tp)\s*/, '')
    .replace(/[^a-z0-9]/g, '');
}

console.log('=== SYNCING 34 PROVINCES ===');
let provUpdated = 0;

for (const p of currentProvinces) {
  const pNorm = normalize(p.name);
  const pSlugNorm = (p.slug || '').replace(/[^a-z0-9]/g, '');

  const match = wikiProvinces.find(w => {
    const wNorm = normalize(w.name);
    return wNorm === pNorm || pSlugNorm === wNorm || pNorm.includes(wNorm) || wNorm.includes(pNorm);
  });

  if (match) {
    p.areaKm2 = match.areaKm2;
    p.population = match.population;
    p.density = match.density;
    p.totalUnits = match.totalUnits;
    p.wards = match.wards;
    p.communes = match.communes;
    p.specialZones = match.specialZones;
    if (match.center) {
      p.center = match.center;
    }
    provUpdated++;
    console.log(`Updated province: ${p.name} -> ${match.areaKm2} km², ${match.population.toLocaleString('vi-VN')} người, ${match.totalUnits} đơn vị (${match.wards}P, ${match.communes}X, ${match.specialZones}ĐK)`);
  } else {
    console.warn(`Could not match province: ${p.name} (${p.slug})`);
  }
}

console.log(`\nTotal provinces updated: ${provUpdated} / ${currentProvinces.length}`);

console.log('\n=== SYNCING 168 HCM UNITS ===');
let unitsUpdated = 0;

for (const u of currentHcmUnits) {
  const uNameNorm = normalize(u.name);
  const uSlugNorm = (u.slug || '').replace(/[^a-z0-9]/g, '');
  const uWardSlugNorm = (u.wardSlug || '').replace(/[^a-z0-9]/g, '');

  const match = wikiHcmUnits.find(w => {
    const wNameNorm = normalize(w.name);
    const wFullNorm = normalize(w.fullName);
    return wNameNorm === uNameNorm || 
           wFullNorm === uNameNorm || 
           uSlugNorm.includes(wNameNorm) || 
           uWardSlugNorm.includes(wNameNorm);
  });

  if (match) {
    u.areaKm2 = match.areaKm2;
    u.population = match.population;
    if (match.subdivisionRaw) {
      u.subdivision = match.subdivisionRaw;
    }

    const isXa = u.type === 'Xã';
    const stdPop = isXa ? 8000 : 21000;
    const stdArea = isXa ? 30 : 5.5;
    const calculatedDensity = u.areaKm2 > 0 ? Math.round(u.population / u.areaKm2) : 0;

    u.demographics = {
      standardPopulation: stdPop,
      standardAreaKm2: stdArea,
      populationRatio: Math.round((u.population / stdPop) * 100),
      areaRatio: Math.round((u.areaKm2 / stdArea) * 100),
      density: calculatedDensity,
      densityLevel: calculatedDensity > 10000 ? 'Rất cao' : (calculatedDensity > 3000 ? 'Cao' : (calculatedDensity > 1000 ? 'Trung bình' : 'Nông thôn sinh thái'))
    };

    unitsUpdated++;
  } else {
    console.warn(`Could not match unit: ${u.name} (${u.slug})`);
  }
}

console.log(`Total units updated: ${unitsUpdated} / ${currentHcmUnits.length}`);

// Write formatted JSON files
fs.writeFileSync(targetProvincesPath, JSON.stringify(currentProvinces, null, 2), 'utf8');
fs.writeFileSync(targetHcmUnitsPath, JSON.stringify(currentHcmUnits, null, 2), 'utf8');

console.log('\nSuccessfully saved updated files:');
console.log('1.', targetProvincesPath);
console.log('2.', targetHcmUnitsPath);
