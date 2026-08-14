// Unified Cache Manager for Ngoc Gas system

let cacheStats = {
  lastCleared: new Date().toISOString(),
  clearCount: 0,
  cacheHits: 0,
  cacheMisses: 0
};

// Global in-memory cache registry
if (!global.__ngocGasCacheRegistry) {
  global.__ngocGasCacheRegistry = {
    settings: null,
    products: null,
    posts: null,
    stores: null,
    users: null,
    categories: null
  };
}

export function getCacheRegistry() {
  return global.__ngocGasCacheRegistry;
}

export function recordCacheHit() {
  cacheStats.cacheHits++;
}

export function recordCacheMiss() {
  cacheStats.cacheMisses++;
}

export function getCacheStats() {
  const reg = global.__ngocGasCacheRegistry;
  return {
    ...cacheStats,
    activeCaches: {
      settings: !!reg.settings,
      products: Array.isArray(reg.products) ? reg.products.length : 0,
      posts: Array.isArray(reg.posts) ? reg.posts.length : 0,
      stores: Array.isArray(reg.stores) ? reg.stores.length : 0,
      users: Array.isArray(reg.users) ? reg.users.length : 0,
      categories: Array.isArray(reg.categories) ? reg.categories.length : 0,
    }
  };
}

export function clearAllCaches() {
  global.__ngocGasCacheRegistry = {
    settings: null,
    products: null,
    posts: null,
    stores: null,
    users: null,
    categories: null
  };
  cacheStats.lastCleared = new Date().toISOString();
  cacheStats.clearCount++;
  return {
    success: true,
    message: 'Đã xóa toàn bộ bộ nhớ đệm (Cache) thành công!',
    lastCleared: cacheStats.lastCleared,
    clearCount: cacheStats.clearCount
  };
}

export function clearSpecificCache(category) {
  if (global.__ngocGasCacheRegistry && global.__ngocGasCacheRegistry[category] !== undefined) {
    global.__ngocGasCacheRegistry[category] = null;
  }
  cacheStats.lastCleared = new Date().toISOString();
  return {
    success: true,
    message: `Đã làm mới bộ nhớ đệm cho phân hệ ${category}!`,
    category,
    lastCleared: cacheStats.lastCleared
  };
}
