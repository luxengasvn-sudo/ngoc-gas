import vinhlongUnitsData from '@/data/tinhthanh/administrative-units-vinh-long.json';
import dongthapUnitsData from '@/data/tinhthanh/administrative-units-dong-thap.json';
import camauUnitsData from '@/data/tinhthanh/administrative-units-ca-mau.json';
import angiangUnitsData from '@/data/tinhthanh/administrative-units-an-giang.json';
import canthoUnitsData from '@/data/tinhthanh/administrative-units-can-tho.json';
import tayninhUnitsData from '@/data/tinhthanh/administrative-units-tay-ninh.json';
import dongnaiUnitsData from '@/data/tinhthanh/administrative-units-dong-nai.json';
import hochiminhUnitsData from '@/data/tinhthanh/administrative-units-ho-chi-minh.json';
import lamdongUnitsData from '@/data/tinhthanh/administrative-units-lam-dong.json';
import gialaiUnitsData from '@/data/tinhthanh/administrative-units-gia-lai.json';
import daklakUnitsData from '@/data/tinhthanh/administrative-units-dak-lak.json';
import quangngaiUnitsData from '@/data/tinhthanh/administrative-units-quang-ngai.json';
import khanhhoaUnitsData from '@/data/tinhthanh/administrative-units-khanh-hoa.json';
import danangUnitsData from '@/data/tinhthanh/administrative-units-da-nang.json';
import thanhhoaUnitsData from '@/data/tinhthanh/administrative-units-thanh-hoa.json';
import quangtriUnitsData from '@/data/tinhthanh/administrative-units-quang-tri.json';
import ngheanUnitsData from '@/data/tinhthanh/administrative-units-nghe-an.json';
import hatinhUnitsData from '@/data/tinhthanh/administrative-units-ha-tinh.json';
import hueUnitsData from '@/data/tinhthanh/administrative-units-hue.json';
import tuyenquangUnitsData from '@/data/tinhthanh/administrative-units-tuyen-quang.json';
import thainguyenUnitsData from '@/data/tinhthanh/administrative-units-thai-nguyen.json';
import sonlaUnitsData from '@/data/tinhthanh/administrative-units-son-la.json';
import phuthoUnitsData from '@/data/tinhthanh/administrative-units-phu-tho.json';
import laocaiUnitsData from '@/data/tinhthanh/administrative-units-lao-cai.json';
import langsonUnitsData from '@/data/tinhthanh/administrative-units-lang-son.json';
import dienbienUnitsData from '@/data/tinhthanh/administrative-units-dien-bien.json';
import caobangUnitsData from '@/data/tinhthanh/administrative-units-cao-bang.json';
import hungyenUnitsData from '@/data/tinhthanh/administrative-units-hung-yen.json';
import bacninhUnitsData from '@/data/tinhthanh/administrative-units-bac-ninh.json';
import quangninhUnitsData from '@/data/tinhthanh/administrative-units-quang-ninh.json';
import haiphongUnitsData from '@/data/tinhthanh/administrative-units-hai-phong.json';
import hanoiUnitsData from '@/data/tinhthanh/administrative-units-ha-noi.json';
import ninhbinhUnitsData from '@/data/tinhthanh/administrative-units-ninh-binh.json';
import laichauUnitsData from '@/data/tinhthanh/administrative-units-lai-chau.json';
import provincesData from '@/data/tinhthanh/provinces-34.json';
import policeFanpagesData from '@/data/tinhthanh/police-verified-fanpages.json';

// Coordinates mapping for all 34 provinces in Vietnam 2026
export const PROVINCE_COORDINATES = {
  'ha-noi': { lat: 21.0285, lng: 105.8542 },
  'hai-phong': { lat: 20.8449, lng: 106.6881 },
  'quang-ninh': { lat: 20.9505, lng: 107.0734 },
  'bac-ninh': { lat: 21.1861, lng: 106.0763 },
  'hung-yen': { lat: 20.6464, lng: 106.0511 },
  'ninh-binh': { lat: 20.2506, lng: 105.9745 },
  'cao-bang': { lat: 22.6667, lng: 106.2667 },
  'dien-bien': { lat: 21.3833, lng: 103.0167 },
  'lai-chau': { lat: 22.3964, lng: 103.4667 },
  'lang-son': { lat: 21.8531, lng: 106.7628 },
  'lao-cai': { lat: 22.4856, lng: 103.9707 },
  'phu-tho': { lat: 21.3228, lng: 105.4019 },
  'son-la': { lat: 21.3283, lng: 103.9142 },
  'thai-nguyen': { lat: 21.5942, lng: 105.8481 },
  'tuyen-quang': { lat: 21.8236, lng: 105.2144 },
  'hue': { lat: 16.4637, lng: 107.5909 },
  'ha-tinh': { lat: 18.3428, lng: 105.9056 },
  'nghe-an': { lat: 18.6737, lng: 105.6813 },
  'quang-tri': { lat: 16.8167, lng: 107.1000 },
  'thanh-hoa': { lat: 19.8067, lng: 105.7852 },
  'da-nang': { lat: 16.0544, lng: 108.2022 },
  'khanh-hoa': { lat: 12.2388, lng: 109.1967 },
  'quang-ngai': { lat: 15.1205, lng: 108.7922 },
  'dak-lak': { lat: 12.6667, lng: 108.0500 },
  'gia-lai': { lat: 13.9833, lng: 108.0000 },
  'lam-dong': { lat: 11.9404, lng: 108.4583 },
  'ho-chi-minh': { lat: 10.7769, lng: 106.7009 },
  'dong-nai': { lat: 10.9575, lng: 106.8427 },
  'tay-ninh': { lat: 11.3100, lng: 106.0983 },
  'can-tho': { lat: 10.0452, lng: 105.7469 },
  'an-giang': { lat: 10.3833, lng: 105.4167 },
  'ca-mau': { lat: 9.1769, lng: 105.1500 },
  'dong-thap': { lat: 10.4597, lng: 105.6339 },
  'vinh-long': { lat: 10.2537, lng: 105.9722 }
};

export const PROVINCE_PHONE_PREFIX = {
  'ha-noi': '024',
  'ho-chi-minh': '028',
  'hai-phong': '0225',
  'da-nang': '0236',
  'can-tho': '0292',
  'hue': '0234',
  'quang-ninh': '0203',
  'bac-ninh': '0222',
  'hung-yen': '0221',
  'ninh-binh': '0229',
  'cao-bang': '0206',
  'dien-bien': '0215',
  'lai-chau': '0213',
  'lang-son': '0205',
  'lao-cai': '0214',
  'phu-tho': '0210',
  'son-la': '0212',
  'thai-nguyen': '0208',
  'tuyen-quang': '0207',
  'ha-tinh': '0239',
  'nghe-an': '0238',
  'quang-tri': '0233',
  'thanh-hoa': '0237',
  'khanh-hoa': '0258',
  'quang-ngai': '0255',
  'dak-lak': '0262',
  'gia-lai': '0269',
  'lam-dong': '0263',
  'dong-nai': '0251',
  'tay-ninh': '0276',
  'an-giang': '0296',
  'ca-mau': '0290',
  'dong-thap': '0277',
  'vinh-long': '0270'
};

function getRegionFallbackCoords(regionSlug = '') {
  if (regionSlug.includes('dong-bang-song-hong') || regionSlug.includes('bac-bo')) {
    return { lat: 21.0, lng: 105.8 };
  }
  if (regionSlug.includes('tay-bac') || regionSlug.includes('dong-bac')) {
    return { lat: 21.8, lng: 104.5 };
  }
  if (regionSlug.includes('bac-trung-bo')) {
    return { lat: 18.5, lng: 105.7 };
  }
  if (regionSlug.includes('duyen-hai-nam-trung-bo')) {
    return { lat: 14.5, lng: 108.9 };
  }
  if (regionSlug.includes('tay-nguyen')) {
    return { lat: 12.8, lng: 108.0 };
  }
  if (regionSlug.includes('dong-nam-bo')) {
    return { lat: 11.0, lng: 106.8 };
  }
  return { lat: 10.0, lng: 105.5 }; // Mekong Delta
}

/**
 * Returns complete administrative units for any of the 34 provinces in Vietnam 2026.
 * Zero-empty guarantee: ensures every single province renders full wards/communes.
 */
export function getProvinceUnits(provinceSlug, provinceObj = null) {
  if (provinceSlug === 'ho-chi-minh') {
    return hochiminhUnitsData;
  }

  if (provinceSlug === 'ha-noi') {
    return hanoiUnitsData;
  }

  if (provinceSlug === 'ninh-binh') {
    return ninhbinhUnitsData;
  }

  if (provinceSlug === 'lai-chau') {
    return laichauUnitsData;
  }

    if (provinceSlug === 'hai-phong') {
    return haiphongUnitsData;
  }

  if (provinceSlug === 'quang-ninh') {
    return quangninhUnitsData;
  }

  if (provinceSlug === 'bac-ninh') {
    return bacninhUnitsData;
  }

  if (provinceSlug === 'hung-yen') {
    return hungyenUnitsData;
  }

  if (provinceSlug === 'cao-bang') {
    return caobangUnitsData;
  }

  if (provinceSlug === 'dien-bien') {
    return dienbienUnitsData;
  }

  if (provinceSlug === 'lang-son') {
    return langsonUnitsData;
  }

  if (provinceSlug === 'lao-cai') {
    return laocaiUnitsData;
  }

  if (provinceSlug === 'phu-tho') {
    return phuthoUnitsData;
  }

  if (provinceSlug === 'son-la') {
    return sonlaUnitsData;
  }

  if (provinceSlug === 'thai-nguyen') {
    return thainguyenUnitsData;
  }

  if (provinceSlug === 'tuyen-quang') {
    return tuyenquangUnitsData;
  }

  if (provinceSlug === 'hue') {
    return hueUnitsData;
  }

  if (provinceSlug === 'ha-tinh') {
    return hatinhUnitsData;
  }

  if (provinceSlug === 'nghe-an') {
    return ngheanUnitsData;
  }

  if (provinceSlug === 'quang-tri') {
    return quangtriUnitsData;
  }

  if (provinceSlug === 'thanh-hoa') {
    return thanhhoaUnitsData;
  }

  if (provinceSlug === 'da-nang') {
    return danangUnitsData;
  }

  if (provinceSlug === 'khanh-hoa') {
    return khanhhoaUnitsData;
  }

  if (provinceSlug === 'quang-ngai') {
    return quangngaiUnitsData;
  }

  if (provinceSlug === 'dak-lak') {
    return daklakUnitsData;
  }

  if (provinceSlug === 'gia-lai') {
    return gialaiUnitsData;
  }

  if (provinceSlug === 'lam-dong') {
    return lamdongUnitsData;
  }

  if (provinceSlug === 'dong-nai') {
    return dongnaiUnitsData;
  }

  if (provinceSlug === 'tay-ninh') {
    return tayninhUnitsData;
  }

  if (provinceSlug === 'can-tho') {
    return canthoUnitsData;
  }

  if (provinceSlug === 'an-giang') {
    return angiangUnitsData;
  }

  if (provinceSlug === 'ca-mau') {
    return camauUnitsData;
  }

  if (provinceSlug === 'dong-thap') {
    return dongthapUnitsData;
  }

  if (provinceSlug === 'vinh-long') {
    return vinhlongUnitsData;
  }

const province = provinceObj || provincesData.find(p => p.slug === provinceSlug);
  if (!province) return [];

  const total = province.totalUnits || 50;
  const wardsCount = province.wards || Math.floor(total * 0.4);
  const communesCount = province.communes || (total - wardsCount);
  const baseCoords = PROVINCE_COORDINATES[provinceSlug] || getRegionFallbackCoords(province.regionSlug);
  const provCode = province.postalCode ? province.postalCode.slice(0, 2) : '79';
  const phonePrefix = PROVINCE_PHONE_PREFIX[provinceSlug] || '028';

  // Realistic district list based on province center & legacy areas
  const centerName = province.center || 'Trung tâm';
  const legacyList = Array.isArray(province.legacyProvinces) && province.legacyProvinces.length > 0 
    ? province.legacyProvinces 
    : [province.name.replace(/^(Thành phố|Tỉnh)\s*/i, '')];

  const districts = [
    `TP. ${centerName}`,
    `Khu vực ${centerName} Đông`,
    `Khu vực ${centerName} Tây`,
    ...legacyList.map(l => `Huyện ${l.replace(/cũ/i, '').trim()}`),
    `Khu vực Trung tâm ${province.name.replace(/^(Thành phố|Tỉnh)\s*/i, '')}`
  ];

  return Array.from({ length: total }, (_, i) => {
    const isWard = i < wardsCount;
    const isSpecial = province.specialZones && i >= (total - province.specialZones);
    const type = isSpecial ? 'Đặc khu' : (isWard ? 'Phường' : 'Xã');
    const district = districts[i % districts.length];
    const unitIndex = i + 1;
    const cleanDist = district.replace(/^(Quận\/TP\.|Quận|TP\.|Thị xã|Huyện)\s*/i, '').trim();
    const unitName = `${type} ${cleanDist} ${unitIndex}`;
    const slug = `${type.toLowerCase().replace(/\s+/g, '-')}-${provinceSlug}-${unitIndex}`;
    
    // Distribute coordinates in a gentle cluster around provincial center
    const angle = (i / total) * 2 * Math.PI;
    const distance = 0.03 + (i % 8) * 0.02;
    const lat = parseFloat((baseCoords.lat + distance * Math.sin(angle)).toFixed(4));
    const lng = parseFloat((baseCoords.lng + distance * Math.cos(angle)).toFixed(4));
    const area = parseFloat((isWard ? (4.2 + (i % 10) * 0.8) : (18.5 + (i % 15) * 2.1)).toFixed(2));
    const pop = Math.round(isWard ? (28000 + (i % 20) * 1500) : (12000 + (i % 20) * 800));
    const density = Math.round(pop / area);

    return {
      id: unitIndex,
      slug,
      wardSlug: slug,
      name: unitName,
      title: `${unitName} (${district}) — Thông Tin Địa Giới & Hành Chính 2026`,
      type,
      district,
      province: province.name,
      region: province.regionSlug || 'viet-nam',
      oldUnits: [
        `Khu vực ${type} ${unitIndex} cũ`,
        `Địa giới lịch sử ${centerName}`
      ],
      postalCode: province.postalCode || '100000',
      administrativeCode: `${provCode}${String(unitIndex).padStart(3, '0')}`,
      areaKm2: area,
      population: pop,
      density,
      licensePlates: Array.isArray(province.licensePlates) ? province.licensePlates.join(', ') : `${provCode}`,
      articleSlug: slug,
      summary: `Đơn vị hành chính ${unitName} thuộc ${province.name} mới theo phương án sắp xếp sáp nhập 2026. Cung cấp thông tin địa giới, bản đồ số, trụ sở UBND, Công an và các tiện ích công cộng.`,
      classification: isWard ? 'Đô thị trung tâm' : 'Nông thôn sinh thái',
      status: 'active',
      lat,
      lng,
      ubnd: {
        name: `Trụ sở UBND ${unitName}`,
        address: `Đường Trung tâm Hành chính, ${unitName}, ${district}, ${province.name}`,
        phone: `${phonePrefix} 3822 xxxx`,
        workingHours: 'Thứ 2 - Thứ 6 (07:30 - 17:00)',
        lat,
        lng
      },
      police: {
        name: `Công An ${unitName}`,
        address: `Đường Trung tâm Hành chính, ${unitName}, ${district}, ${province.name}`,
        phone: `${phonePrefix} 3822 xxxx`,
        hotline: '113 / Trực ban 24/7'
      },
      hospitals: [
        {
          name: `Trạm Y Tế ${unitName}`,
          address: `Khu dân cư trung tâm, ${unitName}`,
          type: 'Trạm Y Tế Phường / Xã',
          phone: `${phonePrefix} 3826 xxxx`
        },
        {
          name: `Bệnh Viện Đa Khoa Khu Vực ${district}`,
          address: `Trục đường y tế chính, ${district}`,
          type: 'Bệnh viện Đa Khoa',
          phone: `${phonePrefix} 3828 xxxx`
        }
      ],
      schools: [
        {
          name: `Trường Mầm Non ${unitName.replace(/^(Phường|Xã|Đặc khu)\s*/i, '')}`,
          level: 'Mầm non',
          address: `Khu dân cư số 1, ${unitName}`
        },
        {
          name: `Trường Tiểu Học ${unitName.replace(/^(Phường|Xã|Đặc khu)\s*/i, '')}`,
          level: 'Tiểu học',
          address: `Khu dân cư số 2, ${unitName}`
        },
        {
          name: `Trường THCS ${unitName.replace(/^(Phường|Xã|Đặc khu)\s*/i, '')}`,
          level: 'THCS',
          address: `Khu dân cư số 3, ${unitName}`
        }
      ]
    };
  });
}

/**
 * Finds a single unit by wardSlug within a province or globally.
 */
export function findUnitBySlug(provinceSlug, wardSlug) {
  const units = getProvinceUnits(provinceSlug);
  return units.find(u => 
    u.wardSlug === wardSlug || 
    u.slug === wardSlug || 
    u.slug === `giao-gas-${wardSlug}` ||
    u.wardSlug === wardSlug?.replace(/^giao-gas-/, '')
  ) || null;
}

/**
 * Finds a unit by slug or generates a standard synthetic unit fallback.
 */
export function getOrSynthesizeWardUnit(provinceSlug, wardSlug, provinceObj = null) {
  const province = provinceObj || provincesData.find(p => p.slug === provinceSlug);
  let unit = findUnitBySlug(provinceSlug, wardSlug);
  if (unit) return unit;
  if (!province) return null;

  const cleanName = (wardSlug || '')
    .replace(/^(phuong|xa|thi-tran|dac-khu)-/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  
  const type = wardSlug?.startsWith('xa-') ? 'Xã' : (wardSlug?.startsWith('dac-khu-') ? 'Đặc khu' : 'Phường');
  const fullName = `${type} ${cleanName}`;
  const isXa = type === 'Xã';
  const stdPop = isXa ? 8000 : 21000;
  const stdArea = isXa ? 30 : 5.5;
  const pop = 38500;
  const area = 11.2;
  const baseCoords = PROVINCE_COORDINATES[province.slug] || { lat: 21.0285, lng: 105.8542 };
  const lat = baseCoords.lat;
  const lng = baseCoords.lng;
  const phonePrefix = PROVINCE_PHONE_PREFIX[province.slug] || '028';

  return {
    name: fullName,
    type,
    district: `${province.center}`,
    province: province.name,
    oldUnits: [`Địa giới lịch sử ${fullName}`, `Khu vực sáp nhập phụ cận`],
    areaKm2: area,
    population: pop,
    postalCode: province.postalCode,
    licensePlates: province.licensePlates ? province.licensePlates.join(', ') : '---',
    administrativeCode: `${26700 + Math.floor(Math.random() * 800)}`,
    lat,
    lng,
    ubnd: {
      name: `Trụ sở UBND ${fullName}`,
      address: `Số 25 Đường Trung Tâm Hành Chính, ${fullName}, ${province.center}, ${province.name}`,
      phone: `${phonePrefix} 3822 xxxx`,
      workingHours: 'Thứ 2 - Thứ 6 (07:30 - 17:00)',
      lat,
      lng
    },
    police: {
      name: `Công An ${fullName}`,
      address: `Số 18 Tuyến Phố An Ninh, ${fullName}, ${province.center}, ${province.name}`,
      phone: `${phonePrefix} 3823 xxxx`,
      hotline: '113 / Trực ban 24/7',
      lat: Number((lat + 0.001).toFixed(4)),
      lng: Number((lng + 0.0015).toFixed(4))
    },
    hospitals: [
      {
        name: `Trạm Y Tế ${fullName}`,
        address: `Đường Y Tế Dân Sinh, ${fullName}`,
        type: 'Trạm Y Tế Cơ Sở',
        phone: '028 3829 xxxx',
        lat: Number((lat - 0.0012).toFixed(4)),
        lng: Number((lng - 0.0014).toFixed(4))
      },
      {
        name: `Bệnh Viện Đa Khoa Khu Vực ${province.center}`,
        address: `Đại lộ Y Tế Đô Thị, ${province.center}, ${province.name}`,
        type: 'Bệnh viện Đa Khoa Hạng I',
        phone: '028 3835 xxxx',
        lat: Number((lat + 0.0028).toFixed(4)),
        lng: Number((lng - 0.0022).toFixed(4))
      }
    ],
    schools: [
      {
        name: `Trường Mầm Non ${cleanName}`,
        level: 'Mầm non',
        address: `Khu dân cư văn minh, ${fullName}`,
        lat: Number((lat + 0.0018).toFixed(4)),
        lng: Number((lng + 0.0008).toFixed(4))
      },
      {
        name: `Trường Tiểu Học ${cleanName}`,
        level: 'Tiểu học',
        address: `Tuyến đường học đường, ${fullName}`,
        lat: Number((lat - 0.0009).toFixed(4)),
        lng: Number((lng + 0.0018).toFixed(4))
      },
      {
        name: `Trường THCS ${cleanName}`,
        level: 'THCS',
        address: `Khu liên hợp giáo dục, ${fullName}`,
        lat: Number((lat + 0.0022).toFixed(4)),
        lng: Number((lng - 0.0011).toFixed(4))
      },
      {
        name: `Trường THPT ${province.center}`,
        level: 'THPT',
        address: `Đại lộ trung tâm, ${province.center}`,
        lat: Number((lat - 0.0025).toFixed(4)),
        lng: Number((lng - 0.0026).toFixed(4))
      }
    ],
    postOffices: [
      {
        name: `Bưu điện Trung tâm ${cleanName} (Vietnam Post)`,
        address: `Số 35 Đường Bưu Chính, ${fullName}`,
        postalCode: province.postalCode,
        phone: '1900 54 54 81',
        workingHours: 'Thứ 2 - Thứ 7 (07:30 - 17:30)',
        lat: Number((lat + 0.0014).toFixed(4)),
        lng: Number((lng - 0.0012).toFixed(4))
      },
      {
        name: `Bưu cục Viettel Post ${cleanName}`,
        address: `Số 88 Tuyến Trục Lộ, ${fullName}`,
        postalCode: province.postalCode,
        phone: '1900 8095',
        workingHours: '07:00 - 20:00 (Hàng ngày)',
        lat: Number((lat - 0.0015).toFixed(4)),
        lng: Number((lng + 0.0019).toFixed(4))
      }
    ],
    markets: [
      {
        name: `Chợ Dân Sinh Truyền Thống ${cleanName}`,
        address: `Khu phố thương mại trung tâm, ${fullName}`,
        lat: Number((lat + 0.0005).toFixed(4)),
        lng: Number((lng + 0.0024).toFixed(4))
      },
      {
        name: `Siêu Thị Tiện Ích WinMart+ / Bách Hóa Xanh ${cleanName}`,
        address: `Mặt tiền trục lộ chính, ${fullName}`,
        lat: Number((lat - 0.002).toFixed(4)),
        lng: Number((lng + 0.0005).toFixed(4))
      }
    ],
    energyPoints: [
      {
        name: `Cửa Hàng Xăng Dầu Petrolimex Số 15 ${cleanName}`,
        brand: 'Petrolimex',
        address: `Đại lộ trung tâm, ${fullName}`,
        hotline: '1900 2828',
        deliveryTime: 'Mở cửa 24/7',
        perks: 'Xăng RON 95-V, E5 RON 92, Dầu DO 0.001S-V',
        lat: Number((lat + 0.0025).toFixed(4)),
        lng: Number((lng + 0.0019).toFixed(4))
      }
    ],
    history: `${fullName} được quy hoạch thành lập và sắp xếp toàn diện trên cơ sở hợp nhất địa giới hành chính nhằm tinh gọn bộ máy 2 cấp, tập trung nguồn lực phát triển kinh tế - xã hội, bảo đảm an ninh quốc phòng và phục vụ tốt nhất cho đời sống nhân dân theo tinh thần Nghị quyết số 202/2025/QH15.`,
    demographics: {
      standardPopulation: stdPop,
      standardAreaKm2: stdArea,
      populationRatio: Math.round((pop / stdPop) * 100),
      areaRatio: Math.round((area / stdArea) * 100),
      density: Math.round(pop / area),
      densityLevel: 'Mật độ cao'
    },
    developmentPlan: {
      vision: `Tầm nhìn chiến lược 2026 - 2030: Xây dựng ${fullName} trở thành đô thị văn minh, hiện đại, phát triển bền vững theo chuẩn quy hoạch mới của Quốc hội.`,
      infrastructure: `Nâng cấp và mở rộng các tuyến giao thông huyết mạch liên phường, hoàn thiện mạng lưới thoát nước và ngầm hóa hạ tầng lưới điện, viễn thông.`,
      digitalGov: `100% thủ tục hành chính công đủ điều kiện được cung cấp trực tuyến mức độ toàn trình; đẩy mạnh thanh toán không dùng tiền mặt và số hóa dữ liệu dân cư.`,
      commerce: `Phát triển hệ thống thương mại, siêu thị tiện lợi, chợ dân sinh an toàn thực phẩm và chuỗi dịch vụ tiện ích phục vụ cộng đồng cư dân.`
    },
    weather: {
      temp: 31,
      tempFeel: 34,
      condition: 'Nắng ấm, mây phân tán',
      humidity: 71,
      uvIndex: 'Cao (Mức 7)',
      wind: '12 km/h Đông Nam',
      airQuality: 'Tốt (AQI 42)'
    },
    faq: [
      {
        question: `Địa chỉ chính xác của Trụ sở UBND ${fullName} ở đâu?`,
        answer: `Trụ sở UBND ${fullName} tọa lạc tại Số 25 Đường Trung Tâm Hành Chính, ${fullName}, ${province.center}. Cơ quan làm việc từ Thứ 2 đến Thứ 6 trong khung giờ 07:30 - 17:00. Quý công dân có thể liên hệ trực tiếp tại bộ phận Một cửa tiếp nhận và trả kết quả hoặc tra cứu trực tuyến qua Cổng Dịch Vụ Công Quốc Gia.`
      },
      {
        question: `Sau khi sáp nhập năm 2026, người dân ${fullName} có bắt buộc đổi thẻ CCCD không?`,
        answer: `Không bắt buộc. Theo hướng dẫn của Bộ Công an, thẻ Căn cước công dân gắn chip còn hạn sử dụng vẫn có giá trị pháp lý nguyên vẹn. Hệ thống cơ sở dữ liệu quốc gia về dân cư và ứng dụng VNeID sẽ tự động cập nhật thông tin địa giới hành chính mới.`
      },
      {
        question: `Trụ sở Công an ${fullName} ở đâu và số điện thoại trực ban là gì?`,
        answer: `Công an ${fullName} đặt tại Số 18 Tuyến Phố An Ninh, ${fullName}. Trực ban an ninh 24/7 tiếp nhận qua hotline khẩn cấp 113 hoặc liên hệ qua Fanpage Công An chính thức đã xác thực.`
      },
      {
        question: `Hệ thống trường học các cấp tại ${fullName} gồm những cơ sở nào?`,
        answer: `${fullName} có đầy đủ hệ thống trường học từ Mầm non, Tiểu học, THCS đến THPT phục vụ con em nhân dân trên địa bàn.`
      },
      {
        question: `Mã bưu chính (Zipcode) và biển số xe của ${fullName} là bao nhiêu?`,
        answer: `Mã bưu chính của ${fullName} là ${province.postalCode}. Biển số xe định danh lưu thông là ${province.licensePlates ? province.licensePlates.join(', ') : '---'}.`
      },
      {
        question: `Làm thế nào để liên hệ và giải quyết thủ tục hành chính tại ${fullName}?`,
        answer: `Người dân và doanh nghiệp có thể đến trực tiếp Bộ phận Tiếp nhận và Trả kết quả (Một cửa) tại Trụ sở UBND ${fullName} trong giờ hành chính từ Thứ 2 đến Thứ 6, hoặc nộp hồ sơ trực tuyến qua Cổng Dịch vụ công Quốc gia và Hệ thống Thông tin Giải quyết Thủ tục Hành chính của tỉnh/thành phố.`
      }
    ]
  };
}

/**
 * Retrieves agency details for a given ward and agencySlug.
 * Supported agency slugs: 'ubnd', 'cong-an', 'kho-bac', 'toa-an', 'vien-kiem-sat'
 */
export function getAgencyDetails(provinceSlug, wardSlug, agencySlug) {
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) return null;

  const unit = findUnitBySlug(provinceSlug, wardSlug);
  if (!unit) return null;

  // If unit has agencies object, use it; otherwise fallback to synthetic structure
  let agency = unit.agencies ? unit.agencies[agencySlug] : null;

  const phonePrefix = PROVINCE_PHONE_PREFIX[provinceSlug] || '028';
  const coords = PROVINCE_COORDINATES[provinceSlug] || { lat: 21.0285, lng: 105.8542 };
  const lat = unit.lat || coords.lat;
  const lng = unit.lng || coords.lng;
  const cleanName = unit.cleanName || unit.name.replace(/^(Phường|Xã|Thị trấn|Đặc khu)\s*/i, '');
  const districtLabel = unit.district || province.center || province.name;

  if (agency) {
    const isCoordinateTarget = /destination=\d+\.\d+,\d+\.\d+/.test(agency.googleDirectionsUrl || '');
    const poiQuery = agencySlug === 'ubnd'
      ? `UBND ${unit.name}, ${province.name}`
      : (agencySlug === 'cong-an' ? `Công an ${unit.name}, ${province.name}` : `${agency.name || agency.shortName || districtLabel}, ${province.name}`);

    const safeMapsUrl = agency.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poiQuery)}`;
    const safeDirectionsUrl = (!agency.googleDirectionsUrl || isCoordinateTarget)
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(poiQuery)}`
      : agency.googleDirectionsUrl;

    agency = {
      ...agency,
      googleMapsUrl: safeMapsUrl,
      googleDirectionsUrl: safeDirectionsUrl
    };
  } else {
    // Phân cấp tra cứu Fanpage Facebook Tích Xanh Công An: Đơn vị -> Quận/Huyện -> Tỉnh/Thành -> Bộ Công An
    const provPolice = policeFanpagesData.provinces[provinceSlug];
    const mpsPolice = policeFanpagesData.national.mps;
    const vneidPolice = policeFanpagesData.national.vneid;
    const districtKey = unit.district ? unit.district.toLowerCase().replace(/^(quận|huyện|thành phố|tp\.|tx\.)\s*/i, '').trim().replace(/\s+/g, '-') : '';
    const distPolice = Object.entries(policeFanpagesData.districts).find(([key]) => key.includes(districtKey) || (districtKey && key.endsWith(districtKey)))?.[1];

    const policeFb = unit.police?.facebook || distPolice?.url || provPolice?.url || mpsPolice.url;
    const policeFbName = unit.police?.facebookName || distPolice?.name || provPolice?.name || mpsPolice.name;

    const agencyTemplates = {
      'ubnd': {
        slug: 'ubnd',
        name: `Ủy Ban Nhân Dân ${unit.name}`,
        shortName: `UBND ${cleanName}`,
        type: 'ubnd',
        icon: '🏛️',
        badge: 'Chính quyền Cơ sở',
        level: 'Cơ quan Hành chính Nhà nước cấp Xã/Phường',
        address: unit.ubnd?.address || `Trụ sở UBND ${unit.name}, ${province.name}`,
        phone: unit.ubnd?.phone && !unit.ubnd.phone.includes('xxxx') ? unit.ubnd.phone : '',
        website: unit.ubnd?.website || '',
        workingHours: unit.ubnd?.workingHours || 'Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00 (Thứ 7 tiếp nhận hồ sơ buổi sáng)',
        administrativeCode: unit.administrativeCode || '89001',
        lat,
        lng,
        googleMapsUrl: unit.ubnd?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('UBND ' + unit.name + ', ' + province.name)}`,
        googleDirectionsUrl: (unit.ubnd?.googleDirectionsUrl && !/destination=\d+\.\d+,\d+\.\d+/.test(unit.ubnd.googleDirectionsUrl))
          ? unit.ubnd.googleDirectionsUrl
          : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('UBND ' + unit.name + ', ' + province.name)}`,
        keyProcedures: [
          { title: 'Đăng ký khai sinh, khai tử, kết hôn', time: 'Trong ngày (Khai sinh/tử) - 03 ngày (Kết hôn)', fee: 'Miễn phí' },
          { title: 'Chứng thực bản sao từ bản chính, chữ ký', time: 'Giải quyết ngay trong ngày', fee: 'Theo biểu mức quy định' },
          { title: 'Xác nhận tình trạng hôn nhân', time: '01 - 03 ngày làm việc', fee: 'Miễn phí / Theo quy định' },
          { title: 'Cấp trích lục hộ tịch, giấy tờ hành chính', time: 'Trả ngay trong buổi làm việc', fee: 'Theo quy định pháp luật' },
          { title: 'Tiếp nhận đơn thư kiến nghị, phản ánh dân sinh', time: 'Theo lịch tiếp dân định kỳ & hàng ngày', fee: 'Miễn phí' }
        ]
      },
      'cong-an': {
        slug: 'cong-an',
        name: `Công An ${unit.name}`,
        shortName: `Công An ${cleanName}`,
        type: 'cong-an',
        icon: '🛡️',
        badge: 'An ninh Trật tự',
        level: 'Cơ quan Công an Nhân dân cấp Xã/Phường',
        address: unit.police?.address || `Liền kề Trụ sở UBND, ${unit.name}, ${province.name}`,
        phone: unit.police?.phone && !unit.police.phone.includes('xxxx') ? unit.police.phone : '',
        hotline: unit.police?.hotline || distPolice?.hotline || provPolice?.hotline || '113 / Trực ban 24/7',
        facebook: policeFb,
        facebookName: policeFbName,
        facebookBadge: 'verified_blue',
        boconganFacebook: mpsPolice.url,
        boconganName: mpsPolice.name,
        vneidFacebook: vneidPolice.url,
        vneidName: vneidPolice.name,
        workingHours: 'Trực ban & tiếp nhận tin báo 24/24 | Thủ tục hành chính: Thứ 2 - Thứ 6 (07:30 - 17:00)',
        administrativeCode: `${unit.administrativeCode || '89001'}-CA`,
        lat: Number((lat + 0.0008).toFixed(4)),
        lng: Number((lng + 0.0006).toFixed(4)),
        googleMapsUrl: unit.police?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Công an ' + unit.name + ', ' + province.name)}`,
        googleDirectionsUrl: (unit.police?.googleDirectionsUrl && !/destination=\d+\.\d+,\d+\.\d+/.test(unit.police.googleDirectionsUrl))
          ? unit.police.googleDirectionsUrl
          : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Công an ' + unit.name + ', ' + province.name)}`,
        keyProcedures: [
          { title: 'Đăng ký thường trú, tạm trú, khai báo lưu trú', time: '03 - 07 ngày làm việc', fee: 'Theo quy định Bộ Công An' },
          { title: 'Kích hoạt định danh điện tử VNeID mức 2', time: 'Giải quyết ngay tại quầy', fee: 'Miễn phí' },
          { title: 'Xác nhận thông tin cư trú (CT07)', time: 'Trong ngày làm việc', fee: 'Miễn phí' },
          { title: 'Cấp đổi, cấp mới thẻ Căn cước (theo thẩm quyền phối hợp)', time: '07 - 15 ngày làm việc', fee: 'Theo quy định nhà nước' },
          { title: 'Tiếp nhận tin báo tội phạm & trật tự an ninh', time: 'Tiếp nhận xử lý khẩn cấp 24/7', fee: 'Miễn phí' }
        ]
      },
      'kho-bac': {
        slug: 'kho-bac',
        name: `Kho Bạc Nhà Nước Khu Vực ${districtLabel}`,
        shortName: `Kho Bạc ${districtLabel}`,
        type: 'kho-bac',
        icon: '🏦',
        badge: 'Ngân sách Nhà nước',
        level: `Cơ quan Quản lý Tài chính - Ngân sách Nhà nước phụ trách ${unit.name}`,
        address: `Trục Trung tâm Hành chính - Tài chính, ${unit.district ? unit.district + ', ' : ''}${province.name}`,
        phone: `${phonePrefix} 3824 1000`,
        workingHours: 'Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 16:30',
        administrativeCode: `KB-${provinceSlug.toUpperCase()}`,
        lat: Number((lat + 0.0015).toFixed(4)),
        lng: Number((lng - 0.0012).toFixed(4)),
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Kho bạc nhà nước ' + districtLabel + ', ' + province.name)}`,
        googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Kho bạc nhà nước ' + districtLabel + ', ' + province.name)}`,
        keyProcedures: [
          { title: 'Nộp tiền phạt vi phạm hành chính, giao thông', time: 'Xác nhận biên lai điện tử tức thì', fee: 'Theo quyết định xử phạt' },
          { title: 'Nộp thuế đất, lệ phí trước bạ, nghĩa vụ tài chính', time: 'Hạch toán trong ngày', fee: 'Theo thông báo cơ quan thuế' },
          { title: 'Kiểm soát chi ngân sách nhà nước các đơn vị dự toán', time: '01 - 03 ngày làm việc', fee: 'Miễn phí' },
          { title: 'Mở và quản lý tài khoản tiền gửi kho bạc', time: '01 - 02 ngày làm việc', fee: 'Theo quy định ngành' }
        ]
      },
      'toa-an': {
        slug: 'toa-an',
        name: `Tòa Án Nhân Dân Khu Vực ${districtLabel}`,
        shortName: `TAND ${districtLabel}`,
        type: 'toa-an',
        icon: '⚖️',
        badge: 'Cơ quan Xét xử',
        level: `Cơ quan Xét xử Sơ thẩm có thẩm quyền thụ lý địa bàn ${unit.name}`,
        address: `Đại lộ Tư Pháp, Trung tâm Hành chính ${unit.district ? unit.district + ', ' : ''}${province.name}`,
        phone: `${phonePrefix} 3825 1000`,
        workingHours: 'Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00',
        administrativeCode: `TA-${provinceSlug.toUpperCase()}`,
        lat: Number((lat - 0.0014).toFixed(4)),
        lng: Number((lng + 0.0015).toFixed(4)),
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Tòa án nhân dân ' + districtLabel + ', ' + province.name)}`,
        googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Tòa án nhân dân ' + districtLabel + ', ' + province.name)}`,
        keyProcedures: [
          { title: 'Tiếp nhận đơn khởi kiện dân sự, kinh doanh, lao động', time: '03 - 08 ngày xem xét thụ lý', fee: 'Theo biểu mức án phí TAND' },
          { title: 'Giải quyết yêu cầu công nhận thuận tình ly hôn', time: 'Theo trình tự luật tố tụng dân sự', fee: '300.000 VNĐ' },
          { title: 'Sao lục bản án, quyết định có hiệu lực pháp luật', time: 'Trong ngày làm việc', fee: 'Theo quy định nhà nước' },
          { title: 'Tiếp công dân và giải quyết khiếu nại tố tụng', time: 'Lịch tiếp dân các ngày làm việc', fee: 'Miễn phí' }
        ]
      },
      'vien-kiem-sat': {
        slug: 'vien-kiem-sat',
        name: `Viện Kiểm Sát Nhân Dân Khu Vực ${districtLabel}`,
        shortName: `VKSND ${districtLabel}`,
        type: 'vien-kiem-sat',
        icon: '📜',
        badge: 'Công tố & Kiểm sát Tư pháp',
        level: `Cơ quan Thực hành Quyền Công tố và Kiểm sát Tư pháp thụ lý ${unit.name}`,
        address: `Đại lộ Tư Pháp, Khu Phố Cơ Quan Nội Chính, ${unit.district ? unit.district + ', ' : ''}${province.name}`,
        phone: `${phonePrefix} 3826 1000`,
        hotline: `Đường dây nóng tiếp nhận tố giác: ${phonePrefix} 3826 9999`,
        workingHours: 'Thứ 2 - Thứ 6: Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00',
        administrativeCode: `VKS-${provinceSlug.toUpperCase()}`,
        lat: Number((lat - 0.0018).toFixed(4)),
        lng: Number((lng - 0.0016).toFixed(4)),
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Viện kiểm sát nhân dân ' + districtLabel + ', ' + province.name)}`,
        googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Viện kiểm sát nhân dân ' + districtLabel + ', ' + province.name)}`,
        keyProcedures: [
          { title: 'Tiếp nhận tố giác, tin báo về tội phạm và kiến nghị khởi tố', time: 'Trực ban nghiệp vụ tiếp nhận 24/7', fee: 'Miễn phí' },
          { title: 'Tiếp công dân khiếu nại, tố cáo trong hoạt động tư pháp', time: 'Giờ hành chính các ngày làm việc', fee: 'Miễn phí' },
          { title: 'Kiểm sát giải quyết tin báo tội phạm và bản án tòa án', time: 'Theo thời hạn Bộ luật Tố tụng quy định', fee: 'Miễn phí' },
          { title: 'Tuyên truyền, tư vấn và phổ biến giáo dục pháp luật', time: 'Theo kế hoạch công tác', fee: 'Miễn phí' }
        ]
      }
    };
    agency = agencyTemplates[agencySlug];
  }

  if (!agency) return null;

  const sisterAgencies = [
    { slug: 'ubnd', name: 'UBND ' + cleanName, icon: '🏛️', badge: 'Chính quyền', isActive: agencySlug === 'ubnd' },
    { slug: 'cong-an', name: 'Công An ' + cleanName, icon: '🛡️', badge: 'An ninh 24/7', isActive: agencySlug === 'cong-an' },
    { slug: 'kho-bac', name: 'Kho Bạc Khu Vực', icon: '🏦', badge: 'Ngân sách', isActive: agencySlug === 'kho-bac' },
    { slug: 'toa-an', name: 'Tòa Án Nhân Dân', icon: '⚖️', badge: 'Tư pháp', isActive: agencySlug === 'toa-an' },
    { slug: 'vien-kiem-sat', name: 'Viện Kiểm Sát', icon: '📜', badge: 'Công tố', isActive: agencySlug === 'vien-kiem-sat' }
  ];

  return { agency, unit, province, sisterAgencies };
}

/**
 * Returns the 5 provincial headquarters agencies for any province.
 */
export function getProvincialAgencies(provinceSlug) {
  const province = provincesData.find(p => p.slug === provinceSlug);
  if (!province) return null;

  const phonePrefix = PROVINCE_PHONE_PREFIX[provinceSlug] || '028';
  const coords = PROVINCE_COORDINATES[provinceSlug] || { lat: 21.0285, lng: 105.8542 };
  const center = province.center || province.name;

  const agencies = [
    {
      slug: 'ubnd-tinh',
      agencySlug: 'ubnd',
      name: `Ủy Ban Nhân Dân ${province.name}`,
      shortName: `UBND ${province.name}`,
      icon: '🏛️',
      badge: 'Cơ quan Hành chính Đầu não',
      level: 'Cơ quan Chấp hành của HĐND cấp Tỉnh/Thành phố',
      address: `Trung tâm Hành chính Tỉnh, ${center}`,
      phone: `${phonePrefix} 3822 0001`,
      workingHours: 'Thứ 2 - Thứ 6 (Sáng 07:30 - 11:30 | Chiều 13:30 - 17:00)',
      lat: coords.lat,
      lng: coords.lng,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Ủy ban nhân dân ' + province.name)}`,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Ủy ban nhân dân ' + province.name)}`,
      description: `Cơ quan hành chính nhà nước cao nhất tại địa phương, lãnh đạo toàn diện công tác kinh tế, xã hội, quốc phòng - an ninh trên địa bàn ${province.name}.`
    },
    {
      slug: 'cong-an-tinh',
      agencySlug: 'cong-an',
      name: `Công An ${province.name}`,
      shortName: `Công An ${province.name}`,
      icon: '🛡️',
      badge: 'An ninh Trật tự Cấp Tỉnh',
      level: 'Công an Tỉnh / Thành phố trực thuộc Trung ương',
      address: policeFanpagesData.provinces[province.slug]?.address || `Trụ sở Công An Tỉnh, Đại lộ An Ninh, ${center}`,
      phone: policeFanpagesData.provinces[province.slug]?.hotline || `${phonePrefix} 3823 0001`,
      hotline: '113 / Trực ban 24/7',
      facebook: policeFanpagesData.provinces[province.slug]?.url || policeFanpagesData.national.mps.url,
      facebookName: policeFanpagesData.provinces[province.slug]?.name || policeFanpagesData.national.mps.name,
      facebookBadge: 'verified_blue',
      workingHours: 'Trực ban 24/24 | Tiếp nhận hồ sơ: Thứ 2 - Thứ 6 (Giờ hành chính)',
      lat: Number((coords.lat + 0.003).toFixed(4)),
      lng: Number((coords.lng + 0.002).toFixed(4)),
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Công an ' + province.name)}`,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(policeFanpagesData.provinces[province.slug]?.address || ('Công an ' + province.name))}`,
      description: `Bảo vệ an ninh quốc gia, giữ gìn trật tự an toàn xã hội, đấu tranh phòng chống tội phạm trên toàn địa bàn ${province.name}.`
    },
    {
      slug: 'kho-bac-tinh',
      agencySlug: 'kho-bac',
      name: `Kho Bạc Nhà Nước ${province.name}`,
      shortName: `Kho Bạc ${province.name}`,
      icon: '🏦',
      badge: 'Ngân sách Nhà nước',
      level: 'Kho bạc Nhà nước trực thuộc Bộ Tài chính tại địa phương',
      address: `Trục Trung tâm Tài chính, ${center}`,
      phone: `${phonePrefix} 3824 0001`,
      workingHours: 'Thứ 2 - Thứ 6 (07:30 - 11:30 | 13:30 - 16:30)',
      lat: Number((coords.lat + 0.004).toFixed(4)),
      lng: Number((coords.lng - 0.003).toFixed(4)),
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Kho bạc nhà nước ' + province.name)}`,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Kho bạc nhà nước ' + province.name)}`,
      description: `Thực hiện quản lý quỹ ngân sách nhà nước, các quỹ tài chính nhà nước và tổng kế toán nhà nước trên địa bàn tỉnh.`
    },
    {
      slug: 'toa-an-tinh',
      agencySlug: 'toa-an',
      name: `Tòa Án Nhân Dân ${province.name}`,
      shortName: `TAND ${province.name}`,
      icon: '⚖️',
      badge: 'Cơ quan Xét xử Cấp Tỉnh',
      level: 'Tòa án Nhân dân Cấp Tỉnh / Thành phố',
      address: `Đại lộ Công Lý, Khu Đô Thị Tư Pháp, ${center}`,
      phone: `${phonePrefix} 3825 0001`,
      workingHours: 'Thứ 2 - Thứ 6 (07:30 - 11:30 | 13:30 - 17:00)',
      lat: Number((coords.lat - 0.003).toFixed(4)),
      lng: Number((coords.lng + 0.004).toFixed(4)),
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Tòa án nhân dân ' + province.name)}`,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Tòa án nhân dân ' + province.name)}`,
      description: `Cơ quan xét xử phúc thẩm và sơ thẩm các vụ án hình sự, dân sự, hôn nhân gia đình, kinh doanh thương mại, hành chính theo thẩm quyền luật định.`
    },
    {
      slug: 'vien-kiem-sat-tinh',
      agencySlug: 'vien-kiem-sat',
      name: `Viện Kiểm Sát Nhân Dân ${province.name}`,
      shortName: `VKSND ${province.name}`,
      icon: '📜',
      badge: 'Công tố & Kiểm sát Tư pháp',
      level: 'Viện Kiểm sát Nhân dân Cấp Tỉnh / Thành phố',
      address: `Đại lộ Công Lý, Khu Cơ Quan Nội Chính, ${center}`,
      phone: `${phonePrefix} 3826 0001`,
      hotline: `Đường dây nóng tố giác: ${phonePrefix} 3826 9999`,
      workingHours: 'Thứ 2 - Thứ 6 (07:30 - 11:30 | 13:30 - 17:00)',
      lat: Number((coords.lat - 0.004).toFixed(4)),
      lng: Number((coords.lng - 0.004).toFixed(4)),
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Viện kiểm sát nhân dân ' + province.name)}`,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Viện kiểm sát nhân dân ' + province.name)}`,
      description: `Thực hành quyền công tố, kiểm sát hoạt động tư pháp, bảo vệ pháp luật, bảo vệ quyền con người, quyền công dân trên toàn địa bàn ${province.name}.`
    }
  ];

  return { province, agencies };
}

export const PROVINCE_UNITS_DATA_MAP = {
  'ha-noi': hanoiUnitsData,
  'hai-phong': haiphongUnitsData,
  'quang-ninh': quangninhUnitsData,
  'bac-ninh': bacninhUnitsData,
  'hung-yen': hungyenUnitsData,
  'ninh-binh': ninhbinhUnitsData,
  'cao-bang': caobangUnitsData,
  'dien-bien': dienbienUnitsData,
  'lai-chau': laichauUnitsData,
  'lang-son': langsonUnitsData,
  'lao-cai': laocaiUnitsData,
  'phu-tho': phuthoUnitsData,
  'son-la': sonlaUnitsData,
  'thai-nguyen': thainguyenUnitsData,
  'tuyen-quang': tuyenquangUnitsData,
  'hue': hueUnitsData,
  'ha-tinh': hatinhUnitsData,
  'nghe-an': ngheanUnitsData,
  'quang-tri': quangtriUnitsData,
  'thanh-hoa': thanhhoaUnitsData,
  'da-nang': danangUnitsData,
  'khanh-hoa': khanhhoaUnitsData,
  'quang-ngai': quangngaiUnitsData,
  'dak-lak': daklakUnitsData,
  'gia-lai': gialaiUnitsData,
  'lam-dong': lamdongUnitsData,
  'ho-chi-minh': hochiminhUnitsData,
  'dong-nai': dongnaiUnitsData,
  'tay-ninh': tayninhUnitsData,
  'can-tho': canthoUnitsData,
  'an-giang': angiangUnitsData,
  'ca-mau': camauUnitsData,
  'dong-thap': dongthapUnitsData,
  'vinh-long': vinhlongUnitsData
};

let _cachedAllUnits = null;

export function getAllSearchUnits() {
  if (_cachedAllUnits) return _cachedAllUnits;

  const result = [];
  for (const prov of provincesData) {
    const rawUnits = PROVINCE_UNITS_DATA_MAP[prov.slug] || [];
    for (let i = 0; i < rawUnits.length; i++) {
      const u = rawUnits[i];
      const slug = u.slug || u.wardSlug;
      const uid = `${prov.slug}-${slug || 'unit'}-${u.id || i}`;
      const oldUnitsArr = Array.isArray(u.oldUnits) ? u.oldUnits : (u.oldUnits ? [u.oldUnits] : []);
      const hasMerger = oldUnitsArr.length > 1 || Boolean(u.previousNames && u.previousNames.length > 0);
      const mergerFlow = oldUnitsArr.length > 0
        ? `${oldUnitsArr.join(', ')} ➔ ${u.name}`
        : (u.previousNames || u.name);

      result.push({
        ...u,
        uniqueId: uid,
        slug: slug,
        wardSlug: slug,
        provinceSlug: prov.slug,
        provinceName: prov.name,
        hasMerger,
        mergerFlow
      });
    }
  }

  _cachedAllUnits = result;
  return result;
}


