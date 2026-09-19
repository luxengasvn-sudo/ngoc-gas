import http from 'http';

// Province slug to Wikipedia page title mapping
export const WIKI_PAGE_TITLES = {
  'ha-noi': 'Hà_Nội',
  'hai-phong': 'Hải_Phòng',
  'quang-ninh': 'Quảng_Ninh',
  'bac-ninh': 'Bắc_Ninh',
  'hung-yen': 'Hưng_Yên',
  'ninh-binh': 'Ninh_Bình',
  'cao-bang': 'Cao_Bằng',
  'dien-bien': 'Điện_Biên',
  'lai-chau': 'Lai_Châu',
  'lang-son': 'Lạng_Sơn',
  'lao-cai': 'Lào_Cai',
  'phu-tho': 'Phú_Thọ',
  'son-la': 'Sơn_La',
  'thai-nguyen': 'Thái_Nguyên',
  'tuyen-quang': 'Tuyên_Quang',
  'hue': 'Huế',
  'ha-tinh': 'Hà_Tĩnh',
  'nghe-an': 'Nghệ_An',
  'quang-tri': 'Quảng_Trị',
  'thanh-hoa': 'Thanh_Hóa',
  'da-nang': 'Đà_Nẵng',
  'khanh-hoa': 'Khánh_Hòa',
  'quang-ngai': 'Quảng_Ngãi',
  'dak-lak': 'Đắk_Lắk',
  'gia-lai': 'Gia_Lai',
  'lam-dong': 'Lâm_Đồng',
  'ho-chi-minh': 'Thành_phố_Hồ_Chí_Minh',
  'dong-nai': 'Đồng_Nai',
  'tay-ninh': 'Tây_Ninh',
  'can-tho': 'Cần_Thơ',
  'an-giang': 'An_Giang',
  'ca-mau': 'Cà_Mau',
  'dong-thap': 'Đồng_Tháp',
  'vinh-long': 'Vĩnh_Long'
};

async function fetchWikiWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'NgocGas-BanQA-Auditor/2.0 (vietnam-administrative-pipeline; contact: info@ngocgas.com)'
        }
      });
      if (res.status === 429) {
        console.log(`[WORKER AI] Wikipedia rate limit (429). Waiting ${attempt * 2000}ms before retry...`);
        await new Promise(r => setTimeout(r, attempt * 2000));
        continue;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1500));
      } else {
        throw err;
      }
    }
  }
}

/**
 * Worker AI function: Scrapes Wikipedia for administrative units of a province.
 */
export async function scrapeWikiUnits(provinceSlug) {
  const pageTitle = WIKI_PAGE_TITLES[provinceSlug];
  if (!pageTitle) {
    throw new Error(`No Wikipedia page title mapped for slug: ${provinceSlug}`);
  }

  // Add 400ms delay between consecutive province queries
  await new Promise(r => setTimeout(r, 400));

  // 1. Get all sections of the Wikipedia page
  const secUrl = `https://vi.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=sections&format=json`;
  const secData = await fetchWikiWithRetry(secUrl);
  const sections = secData?.parse?.sections || [];

  // Find section corresponding to "Hành chính" or "Đơn vị hành chính"
  const hcSection = sections.find(s => 
    s.line.toLowerCase().includes('hành chính') || 
    s.line.toLowerCase().includes('đơn vị hành chính')
  );

  let htmlContent = '';
  if (hcSection) {
    const textUrl = `https://vi.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&section=${hcSection.index}&prop=text&format=json`;
    const textData = await fetchWikiWithRetry(textUrl);
    htmlContent = textData?.parse?.text?.['*'] || '';
  } else {
    // Fallback: parse entire page text
    const fullUrl = `https://vi.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=text&format=json`;
    const fullData = await fetchWikiWithRetry(fullUrl);
    htmlContent = fullData?.parse?.text?.['*'] || '';
  }

  // Parse HTML tables
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  let currentType = 'Phường';
  const units = [];

  while ((m = rowRegex.exec(htmlContent)) !== null) {
    const row = m[1];
    if (row.includes('Phường (')) currentType = 'Phường';
    else if (row.includes('Xã (')) currentType = 'Xã';
    else if (row.includes('Đặc khu (')) currentType = 'Đặc khu';
    else if (row.includes('Thị trấn (')) currentType = 'Thị trấn';

    if (row.includes('<th')) continue;

    const cells = (row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []).map(c => 
      c.replace(/<[^>]+>/g, '').replace(/&#91;.*?&#93;/g, '').replace(/\[.*?\]/g, '').trim()
    );

    if (cells.length === 3) {
      const name = cells[0];
      const area = parseFloat(cells[1].replace(/\./g, '').replace(',', '.'));
      const pop = parseInt(cells[2].replace(/\./g, ''), 10);
      if (name && !isNaN(area) && !isNaN(pop) && area > 0 && pop > 0) {
        const cleanName = name.replace(/^(Phường|Xã|Đặc khu|Thị trấn)\s*/i, '');
        units.push({
          type: currentType,
          name: name.startsWith(currentType) ? name : `${currentType} ${name}`,
          cleanName,
          areaKm2: area,
          population: pop
        });
      }
    }
  }

  return {
    provinceSlug,
    pageTitle,
    totalUnits: units.length,
    units
  };
}

/**
 * Worker AI function: Verifies local web routes for a province with HMR delay & retry.
 */
function fetchSingleUrl(url, provinceSlug, maxRetries = 3) {
  return new Promise((resolve) => {
    let attempts = 0;

    function tryFetch() {
      attempts++;
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: url,
        method: 'GET',
        headers: { 'User-Agent': 'NgocGas-QA-Worker/1.0' }
      };

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            // Check for synthetic dummy text e.g. "Phường Lạng Sơn 1", "Xã Lạng Sơn 2"
            const hasDummy = body.includes(`Phường ${provinceSlug} 1`) ||
                             body.includes(`Xã ${provinceSlug} 1`) ||
                             body.includes(`Phường ${provinceSlug} 2`);
            if (hasDummy) {
              return resolve({ ok: false, error: `URL ${url} contains dummy synthetic text!` });
            }
            return resolve({ ok: true });
          }
          if (attempts < maxRetries) {
            setTimeout(tryFetch, 1200);
          } else {
            resolve({ ok: false, error: `URL ${url} returned status ${res.statusCode}` });
          }
        });
      });

      req.on('error', (e) => {
        if (attempts < maxRetries) {
          setTimeout(tryFetch, 1200);
        } else {
          resolve({ ok: false, error: `URL ${url} connection error: ${e.message}` });
        }
      });

      req.end();
    }

    tryFetch();
  });
}

export async function verifyWebRoutes(provinceSlug, sampleWards = []) {
  // Give Next.js dev server 1.5s to settle HMR compilation
  await new Promise(r => setTimeout(r, 1500));

  const checkUrls = [
    `/tinh-thanh/province/${provinceSlug}`,
    `/tinh-thanh/province/${provinceSlug}/danh-sach-don-vi-hanh-chinh`,
    ...sampleWards.map(w => `/tinh-thanh/province/${provinceSlug}/${w}`)
  ];

  const errors = [];
  for (const url of checkUrls) {
    const res = await fetchSingleUrl(url, provinceSlug);
    if (!res.ok) {
      errors.push(res.error);
    }
  }

  return {
    pass: errors.length === 0,
    checkedCount: checkUrls.length,
    errors
  };
}
