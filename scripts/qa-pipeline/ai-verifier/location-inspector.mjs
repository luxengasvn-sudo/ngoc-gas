/**
 * location-inspector.mjs
 * ĐỘNG CƠ KIỂM TOÁN TỪNG ĐỊA ĐIỂM (LOCATION-BY-LOCATION AUDIT ENGINE)
 * 
 * Thực thi 6 bài kiểm tra chuẩn hóa độc lập (6-Check Protocol) trên từng cơ quan và tiện ích dân sinh.
 */

import {
  PROVINCIAL_AREA_CODES,
  PROVINCIAL_BOUNDING_BOXES,
  LEGAL_NAME_PATTERNS,
  MANDATORY_SYSTEM_HOTLINES
} from './authoritative-registries.mjs';

/**
 * Kiểm tra 1: Vị trí & Tọa độ GPS Geofencing
 */
export function checkGeofence(lat, lng, provinceSlug) {
  const box = PROVINCIAL_BOUNDING_BOXES[provinceSlug];
  if (!box) {
    return { valid: false, reason: `Không tìm thấy Bounding Box cho tỉnh: ${provinceSlug}` };
  }

  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return { valid: false, reason: `Tọa độ không hợp lệ (lat: ${lat}, lng: ${lng})` };
  }

  if (lat === 0 && lng === 0) {
    return { valid: false, reason: 'Tọa độ rỗng (0, 0)' };
  }

  const inLat = lat >= box.minLat && lat <= box.maxLat;
  const inLng = lng >= box.minLng && lng <= box.maxLng;

  if (!inLat || !inLng) {
    return {
      valid: false,
      reason: `Tọa độ (${lat}, ${lng}) nằm ngoài ranh giới tỉnh ${provinceSlug} [Lat: ${box.minLat}-${box.maxLat}, Lng: ${box.minLng}-${box.maxLng}]`
    };
  }

  return { valid: true };
}

/**
 * Kiểm tra 2: Tên gọi pháp lý chính thức cơ quan nhà nước
 */
export function checkLegalName(name, agencyType, unitName) {
  if (!name || typeof name !== 'string' || name.trim().length < 5) {
    return { valid: false, reason: 'Tên cơ quan bị thiếu hoặc quá ngắn' };
  }

  // Cấm từ khóa dummy / placeholder (không chặn địa danh như Mẫu Sơn)
  const dummyRegex = /\b(test|dummy|bản mẫu|dữ liệu mẫu|mẫu test|tạm thời|demo|null|undefined)\b/i;
  if (dummyRegex.test(name)) {
    return { valid: false, reason: `Tên chứa ký tự dummy/placeholder: "${name}"` };
  }

  const pattern = LEGAL_NAME_PATTERNS[agencyType];
  if (pattern && pattern.prefixRequired) {
    const hasValidPrefix = pattern.prefixRequired.some(prefix => 
      name.toLowerCase().startsWith(prefix.toLowerCase())
    );
    if (!hasValidPrefix) {
      return { 
        valid: false, 
        reason: `Tên "${name}" không đúng thể thức văn bản chuẩn (cần bắt đầu bằng một trong các tiền tố: ${pattern.prefixRequired.join(', ')})` 
      };
    }
  }

  return { valid: true };
}

/**
 * Kiểm tra 3: Địa chỉ hành chính đầy đủ 4 cấp
 */
export function checkAddress(address, provinceName, unitName) {
  if (!address || typeof address !== 'string' || address.trim().length < 12) {
    return { valid: false, reason: 'Địa chỉ quá ngắn hoặc bị bỏ trống' };
  }

  const lower = address.toLowerCase();
  
  // Kiểm tra không chứa ký tự dummy
  if (/(\btest\b|\bnull\b|\bundefined\b|địa chỉ tạm)/i.test(lower)) {
    return { valid: false, reason: `Địa chỉ chứa thông tin placeholder: "${address}"` };
  }

  // Địa chỉ chuẩn cần có thông tin đường/khu vực và tỉnh/thành
  const hasProvince = lower.includes(provinceName.toLowerCase().replace('tỉnh ', '').replace('thành phố ', ''));
  if (!hasProvince) {
    return { valid: false, reason: `Địa chỉ thiếu xác nhận thuộc địa phận tỉnh/thành (${provinceName}): "${address}"` };
  }

  return { valid: true };
}

/**
 * Kiểm tra 4: SĐT & Hotline theo chuẩn Viễn thông Quốc gia
 */
export function checkTelecom(phone, hotline, provinceSlug, agencyType) {
  const expectedAreaCode = PROVINCIAL_AREA_CODES[provinceSlug];
  if (!expectedAreaCode) {
    return { valid: false, reason: `Chưa cấu hình mã vùng cho tỉnh: ${provinceSlug}` };
  }

  // Kiểm tra số điện thoại bàn
  if (phone) {
    // Chuẩn hóa chuỗi số: bỏ khoảng trắng, gạch ngang, dấu chấm
    const cleanPhone = String(phone).replace(/[\s\.\-\(\)]/g, '');
    const validPrefix = cleanPhone.startsWith(expectedAreaCode) || cleanPhone.startsWith(`84${expectedAreaCode.slice(1)}`);
    
    if (!validPrefix) {
      return { 
        valid: false, 
        reason: `Số điện thoại "${phone}" không khớp với mã vùng Bộ TT&TT (${expectedAreaCode}) của tỉnh ${provinceSlug}` 
      };
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      return { valid: false, reason: `Độ dài số điện thoại không hợp lệ (${cleanPhone.length} số): "${phone}"` };
    }
  } else {
    return { valid: false, reason: 'Chưa có thông tin số điện thoại liên hệ' };
  }

  // Kiểm tra Hotline ngành khẩn cấp
  if (agencyType === 'cong-an') {
    if (!hotline || !hotline.includes('113')) {
      return { valid: false, reason: 'Công An xã/phường bắt buộc phải có hotline khẩn cấp 113' };
    }
  }

  return { valid: true };
}

/**
 * Kiểm tra 5: Liên kết bản đồ số Google Maps (Search & Directions)
 */
export function checkGoogleMaps(searchUrl, dirUrl, expectedKeywords = []) {
  if (!searchUrl || !searchUrl.startsWith('https://www.google.com/maps/search/?api=1&query=')) {
    return { valid: false, reason: `URL Google Maps Search không đúng cú pháp RFC: "${searchUrl}"` };
  }

  if (!dirUrl || !dirUrl.startsWith('https://www.google.com/maps/dir/?api=1&destination=')) {
    return { valid: false, reason: `URL Google Maps Directions không đúng cú pháp: "${dirUrl}"` };
  }

  // Kiểm tra không chứa khoảng trắng thô (chưa URL encoded)
  if (searchUrl.includes(' ') || dirUrl.includes(' ')) {
    return { valid: false, reason: 'URL Google Maps chứa khoảng trắng thô (chưa encodeURIComponent)' };
  }

  // Kiểm tra không có NaN, undefined trong URL
  if (searchUrl.includes('undefined') || searchUrl.includes('NaN') || dirUrl.includes('undefined') || dirUrl.includes('NaN')) {
    return { valid: false, reason: 'URL Google Maps chứa giá trị lỗi (undefined/NaN)' };
  }

  return { valid: true };
}

/**
 * Kiểm tra 6: Danh mục thủ tục hành chính công & Giờ làm việc
 */
export function checkProceduresAndHours(procedures, workingHours, agencyType) {
  if (!workingHours || workingHours.length < 10) {
    return { valid: false, reason: 'Chưa có thông tin giờ làm việc công quyền cụ thể' };
  }

  if (agencyType === 'cong-an') {
    const is24h = workingHours.includes('24/24') || workingHours.includes('24/7');
    if (!is24h) {
      return { valid: false, reason: 'Cơ quan Công an cần có chế độ thường trực ban 24/7' };
    }
  }

  if (!Array.isArray(procedures) || procedures.length < 3) {
    return { valid: false, reason: `Danh mục thủ tục hành chính không đủ số lượng (hiện có: ${procedures?.length || 0}/tối thiểu 3 thủ tục)` };
  }

  for (let i = 0; i < procedures.length; i++) {
    const proc = procedures[i];
    if (!proc.title || proc.title.length < 5) {
      return { valid: false, reason: `Thủ tục #${i + 1} thiếu tên hoặc tên quá ngắn` };
    }
    if (!proc.time || proc.time.length < 3) {
      return { valid: false, reason: `Thủ tục "${proc.title}" thiếu thời gian giải quyết` };
    }
    if (!proc.fee) {
      return { valid: false, reason: `Thủ tục "${proc.title}" thiếu thông tin lệ phí` };
    }
  }

  return { valid: true };
}

/**
 * Hàm kiểm tra toàn diện 1 Cơ quan Nhà nước (inspectAgency)
 */
export function inspectAgency(agency, agencyType, unit, province) {
  const issues = [];

  if (!agency) {
    return {
      pass: false,
      issues: [`Thiếu hoàn toàn hồ sơ cơ quan [${agencyType}] tại đơn vị ${unit.name}`]
    };
  }

  // 1. Tọa độ GPS
  const geoRes = checkGeofence(agency.lat || unit.lat, agency.lng || unit.lng, province.slug);
  if (!geoRes.valid) issues.push(`[GPS] ${geoRes.reason}`);

  // 2. Tên pháp lý
  const nameRes = checkLegalName(agency.name, agencyType, unit.name);
  if (!nameRes.valid) issues.push(`[TÊN] ${nameRes.reason}`);

  // 3. Địa chỉ hành chính
  const addrRes = checkAddress(agency.address, province.name, unit.name);
  if (!addrRes.valid) issues.push(`[ĐỊA CHỈ] ${addrRes.reason}`);

  // 4. SĐT & Viễn thông
  const telecomRes = checkTelecom(agency.phone, agency.hotline, province.slug, agencyType);
  if (!telecomRes.valid) issues.push(`[VIỄN THÔNG] ${telecomRes.reason}`);

  // 5. Bản đồ số
  const mapRes = checkGoogleMaps(agency.googleMapsUrl, agency.googleDirectionsUrl);
  if (!mapRes.valid) issues.push(`[BẢN ĐỒ] ${mapRes.reason}`);

  // 6. Thủ tục & Giờ làm việc
  const procRes = checkProceduresAndHours(agency.keyProcedures, agency.workingHours, agencyType);
  if (!procRes.valid) issues.push(`[THỦ TỤC] ${procRes.reason}`);

  return {
    pass: issues.length === 0,
    issues
  };
}

/**
 * Hàm kiểm tra toàn bộ 1 Đơn vị Hành chính Xã/Phường (inspectUnit)
 */
export function inspectUnit(unit, province) {
  const unitIssues = [];
  const agencyAudit = {};
  const REQUIRED_AGENCIES = ['ubnd', 'cong-an', 'kho-bac', 'toa-an', 'vien-kiem-sat'];

  // 1. Kiểm tra tọa độ trung tâm đơn vị
  const centerGeo = checkGeofence(unit.lat, unit.lng, province.slug);
  if (!centerGeo.valid) {
    unitIssues.push(`[TỌA ĐỘ TRUNG TÂM] ${centerGeo.reason}`);
  }

  // 2. Kiểm tra Hotline Ngọc Gas (Bắt buộc 1900 9396 theo Quy tắc 4)
  if (unit.gasStationHotline !== MANDATORY_SYSTEM_HOTLINES.ngocGasDeliveryHotline) {
    unitIssues.push(`[HOTLINE NGỌC GAS] Phát hiện số lạ: "${unit.gasStationHotline}". Bắt buộc phải là "${MANDATORY_SYSTEM_HOTLINES.ngocGasDeliveryHotline}"`);
  }

  // 3. Kiểm tra Bản đồ tổng thể đơn vị
  if (!unit.googleMapsUrl || !unit.googleMapsUrl.includes('google.com/maps')) {
    unitIssues.push('[BẢN ĐỒ XÃ/PHƯỜNG] Thiếu liên kết Google Maps của xã/phường');
  }

  // 4. Kiểm tra 5 cơ quan trực thuộc
  let passedAgenciesCount = 0;
  for (const agencyKey of REQUIRED_AGENCIES) {
    const agencyData = unit.agencies ? unit.agencies[agencyKey] : null;
    const auditRes = inspectAgency(agencyData, agencyKey, unit, province);
    agencyAudit[agencyKey] = auditRes;

    if (auditRes.pass) {
      passedAgenciesCount++;
    } else {
      auditRes.issues.forEach(err => {
        unitIssues.push(`[CƠ QUAN ${agencyKey.toUpperCase()}] ${err}`);
      });
    }
  }

  // 5. Kiểm tra Tiện ích Y tế & Trường học
  if (!Array.isArray(unit.hospitals) || unit.hospitals.length === 0) {
    unitIssues.push('[Y TẾ] Thiếu danh sách trạm y tế / cơ sở y tế phụ trách');
  }
  if (!Array.isArray(unit.schools) || unit.schools.length === 0) {
    unitIssues.push('[GIÁO DỤC] Thiếu danh sách trường học dân sinh');
  }

  return {
    pass: unitIssues.length === 0,
    unitId: unit.id,
    unitName: unit.name,
    unitSlug: unit.slug,
    passedAgenciesCount,
    totalAgenciesCount: REQUIRED_AGENCIES.length,
    issues: unitIssues,
    agencyAudit
  };
}
