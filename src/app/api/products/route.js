import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAllProducts, createProductData, updateProductData } from '@/lib/productsHelper';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get('category_id');
    const is_featured = searchParams.get('is_featured');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    const allProducts = await getAllProducts();

    let filtered = Array.isArray(allProducts) ? allProducts : [];
    if (category_id) {
      filtered = filtered.filter(p => String(p.category_id) === String(category_id));
    }
    if (is_featured === 'true' || is_featured === '1') {
      filtered = filtered.filter(p => p.is_featured == 1);
    }
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(p => p.name?.toLowerCase().includes(lower) || p.slug?.toLowerCase().includes(lower));
    }
    if (limit) {
      filtered = filtered.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      success: true,
      data: filtered
    });
  } catch (error) {
    console.error('GET /api/products error:', error.message);
    const fallback = await getAllProducts();
    return NextResponse.json({
      success: true,
      data: Array.isArray(fallback) ? fallback : []
    });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Không có quyền truy cập' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, short_description, description, price, sale_price, image_url, images, category_id, is_featured, is_active, rating_value, rating_count, reviews_json, gas_type } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: 'Tên và slug sản phẩm là bắt buộc' }, { status: 400 });
    }

    const newProd = await createProductData({
      name,
      slug,
      short_description,
      description,
      price: price !== undefined && price !== '' && price !== null ? Number(price) : null,
      sale_price: sale_price !== undefined && sale_price !== '' && sale_price !== null ? Number(sale_price) : null,
      image_url,
      images,
      category_id,
      is_featured,
      is_active,
      rating_value: rating_value !== undefined ? Number(rating_value) : 4.9,
      rating_count: rating_count !== undefined ? Number(rating_count) : 86,
      reviews_json: reviews_json || '[]',
      gas_type: gas_type || null
    });

    return NextResponse.json({
      success: true,
      message: 'Thêm sản phẩm mới thành công',
      data: newProd
    });
  } catch (error) {
    console.error('POST /api/products error:', error.message);
    return NextResponse.json({ success: false, message: 'Lỗi khi tạo sản phẩm mới' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Không có quyền truy cập' }, { status: 401 });
    }

    const body = await request.json();
    const {
      target_type, // '12kg' | '45kg' | 'all'
      adjust_price, // boolean
      price_action, // 'up' | 'down'
      price_amount, // number
      adjust_sale_price, // boolean
      sale_price_action, // 'up' | 'down'
      sale_price_amount // number
    } = body;

    const pAmt = Number(price_amount || 0);
    const sAmt = Number(sale_price_amount || 0);

    let updatedCount = 0;

    // 1. Fetch current products from DB or fallback
    let dbRows = [];
    const itemsToUpdate = await getAllProducts();

    for (const item of itemsToUpdate) {
      const nameLower = (item.name || '').toLowerCase();
      const slugLower = (item.slug || '').toLowerCase();
      const is12kg = nameLower.includes('12kg') || slugLower.includes('12kg');
      const is45kg = nameLower.includes('45kg') || slugLower.includes('45kg');

      let isMatch = false;
      if (target_type === '12kg' && is12kg) isMatch = true;
      else if (target_type === '45kg' && is45kg) isMatch = true;
      else if (target_type === 'all') isMatch = true;

      if (isMatch) {
        let newPrice = item.price;
        let newSalePrice = item.sale_price;

        if (adjust_price && pAmt > 0) {
          const delta = price_action === 'up' ? pAmt : -pAmt;
          newPrice = Math.max(0, Number(item.price || 0) + delta);
        }

        if (adjust_sale_price && sAmt > 0) {
          const delta = sale_price_action === 'up' ? sAmt : -sAmt;
          newSalePrice = Math.max(0, Number(item.sale_price || item.price || 0) + delta);
        }

        updatedCount++;
        await updateProductData(item.id, { price: newPrice, sale_price: newSalePrice });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Đã cập nhật giá đồng loạt thành công cho ${updatedCount} sản phẩm!`,
      updated_count: updatedCount
    });
  } catch (error) {
    console.error('PATCH /api/products error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật giá đồng loạt: ' + error.message },
      { status: 500 }
    );
  }
}
