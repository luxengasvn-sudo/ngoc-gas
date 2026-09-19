import fs from 'fs';
import path from 'path';

const hcmPath = path.join(process.cwd(), 'src', 'data', 'tinhthanh', 'administrative-units-hcm.json');
const hcmUnits = JSON.parse(fs.readFileSync(hcmPath, 'utf8'));

async function searchNominatim(name, district) {
  const queries = [
    `${name}, Thành phố Hồ Chí Minh, Vietnam`,
    `${name}, Bình Dương, Vietnam`,
    `${name}, Bà Rịa - Vũng Tàu, Vietnam`,
    `${name}, ${district}, Vietnam`
  ];

  for (const q of queries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&polygon_geojson=1&format=json`;
      const res = await fetch(url, { headers: { 'User-Agent': 'NgocGasApp-Resolver/1.0' } });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Look for polygon first, or fallback to first result
        const poly = data.find(d => d.geojson && (d.geojson.type === 'Polygon' || d.geojson.type === 'MultiPolygon'));
        const chosen = poly || data[0];
        return {
          lat: parseFloat(chosen.lat),
          lng: parseFloat(chosen.lon),
          hasPolygon: !!poly,
          bbox: chosen.boundingbox
        };
      }
    } catch (e) {
      // Continue to next query
    }
  }
  return null;
}

async function main() {
  console.log(`Checking coordinates for ${hcmUnits.length} units...`);
  
  // Specific critical fixes first:
  const criticalUpdates = {
    'xa-thuong-tan': { lat: 11.1048, lng: 106.9194 },
    'phuong-di-an': { lat: 10.9080, lng: 106.7590 },
    'phuong-an-dong': { lat: 10.7548, lng: 106.6720 },
    'phuong-ben-cat': { lat: 11.1514, lng: 106.5987 },
    'phuong-binh-duong': { lat: 11.0528, lng: 106.6870 },
    'phuong-ban-co': { lat: 10.7710, lng: 106.6830 },
    'phuong-ben-thanh': { lat: 10.7725, lng: 106.6980 }
  };

  let updatedCount = 0;
  for (const u of hcmUnits) {
    const slug = u.wardSlug || u.slug.replace(/^giao-gas-/, '');
    if (criticalUpdates[slug]) {
      u.lat = criticalUpdates[slug].lat;
      u.lng = criticalUpdates[slug].lng;
      if (u.ubnd) {
        u.ubnd.lat = criticalUpdates[slug].lat;
        u.ubnd.lng = criticalUpdates[slug].lng;
      }
      updatedCount++;
      console.log(`Updated critical coords for ${u.name} (${slug}) -> ${u.lat}, ${u.lng}`);
    }
  }

  fs.writeFileSync(hcmPath, JSON.stringify(hcmUnits, null, 2), 'utf8');
  console.log(`Saved updated coordinates to ${hcmPath}`);
}

main().catch(console.error);
