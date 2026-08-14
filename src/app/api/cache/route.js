import { getCacheStats, clearAllCaches, clearSpecificCache } from '@/lib/cacheManager';
import { requireRole } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/cache - View cache statistics
export async function GET(request) {
  try {
    const stats = getCacheStats();
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('GET /api/cache error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy thông tin bộ nhớ đệm: ' + error.message },
      { status: 500 }
    );
  }
}

// POST /api/cache - Purge cache
export async function POST(request) {
  try {
    const auth = requireRole(request, ['admin', 'editor']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const body = await request.json().catch(() => ({}));
    const category = body.category; // 'all' or 'settings' | 'products' | 'posts' | 'stores' | 'users'

    let result;
    if (!category || category === 'all') {
      result = clearAllCaches();
    } else {
      result = clearSpecificCache(category);
    }

    // Force Next.js revalidation
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/san-pham', 'page');
      revalidatePath('/gia-gas-hom-nay', 'page');
      revalidatePath('/tin-tuc', 'page');
      revalidatePath('/cua-hang', 'page');
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: result.message,
      data: getCacheStats()
    });
  } catch (error) {
    console.error('POST /api/cache error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa bộ nhớ đệm: ' + error.message },
      { status: 500 }
    );
  }
}
