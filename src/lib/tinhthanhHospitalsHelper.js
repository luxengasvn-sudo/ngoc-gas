import hospitalsData from '@/data/tinhthanh/hospitals-master.json';

/**
 * Lấy toàn bộ danh sách bệnh viện
 */
export function getAllHospitals() {
  return hospitalsData;
}

/**
 * Lấy chi tiết bệnh viện theo slug
 * @param {string} slug
 */
export function getHospitalBySlug(slug) {
  if (!slug) return null;
  return hospitalsData.find(h => h.slug === slug || h.id === slug) || null;
}

/**
 * Lấy danh sách bệnh viện theo tỉnh thành
 * @param {string} provinceSlug
 */
export function getHospitalsByProvince(provinceSlug) {
  if (!provinceSlug) return hospitalsData;
  return hospitalsData.filter(h => h.provinceSlug === provinceSlug);
}

/**
 * Lấy danh sách bệnh viện liên quan (cùng tỉnh hoặc cùng tuyến)
 * @param {string} currentSlug
 * @param {number} limit
 */
export function getRelatedHospitals(currentSlug, limit = 4) {
  const current = getHospitalBySlug(currentSlug);
  if (!current) return hospitalsData.slice(0, limit);

  // Ưu tiên cùng tỉnh thành trước, sau đó đến cùng tuyến
  const others = hospitalsData.filter(h => h.slug !== currentSlug);
  const sameProvince = others.filter(h => h.provinceSlug === current.provinceSlug);
  const sameTier = others.filter(h => h.provinceSlug !== current.provinceSlug && h.tier === current.tier);
  const rest = others.filter(h => h.provinceSlug !== current.provinceSlug && h.tier !== current.tier);

  return [...sameProvince, ...sameTier, ...rest].slice(0, limit);
}

/**
 * Lấy danh sách các tỉnh thành có bệnh viện
 */
export function getHospitalProvinces() {
  const map = new Map();
  for (const h of hospitalsData) {
    if (!map.has(h.provinceSlug)) {
      map.set(h.provinceSlug, {
        slug: h.provinceSlug,
        name: h.provinceName,
        count: 1
      });
    } else {
      map.get(h.provinceSlug).count++;
    }
  }
  return Array.from(map.values());
}

/**
 * Lấy danh sách các cấp tuyến quản lý
 */
export function getHospitalTiers() {
  const tiers = new Set(hospitalsData.map(h => h.tier).filter(Boolean));
  return Array.from(tiers);
}
