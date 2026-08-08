import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultInitialPosts = [
  {
    id: 1,
    title: 'Giao Gas Nhanh Cho Nhà Hàng - Bình Gas Luxen 45kg Dĩ An & VietSing',
    slug: 'bang-gia-gas-cong-nghiep-45kg-di-an-thuan-an-vietsing',
    excerpt: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An, VietSing. Phân phối bình gas công nghiệp Luxen 45kg, Sopet 45kg cho nhà hàng. Gọi 19009396.',
    content: `<h2>Dịch Vụ Giao Gas Nhanh Cho Nhà Hàng, Quán Ăn Tại VietSing & Dĩ An</h2>
<p>Đối với các nhà hàng, quán ăn, bếp ăn tập thể tại <strong>Khu Dân Cư VietSing, KCN VSIP 1, Dĩ An & Thuận An</strong>, dịch vụ <strong>giao gas nhanh tại chỗ</strong> là ưu tiên tối quan trọng để không làm gián đoạn việc nấu nướng giờ cao điểm.</p>
<p>Liên hệ ngay hotline chính thức <strong>19009396</strong> để được giao gas nhanh và tư vấn báo giá ưu đãi.</p>`,
    image_url: '/images/luxen-45.png',
    meta_title: 'Giao Gas Nhanh Cho Nhà Hàng - Bình Gas Luxen 45kg Dĩ An & VietSing',
    meta_description: 'Dịch vụ giao gas nhanh tại Dĩ An, Thuận An, VietSing. Phân phối bình gas công nghiệp Luxen 45kg, Sopet 45kg cho nhà hàng. Gọi 19009396.',
    meta_keywords: 'giao gas nhanh, giao gas nhanh dĩ an, giao gas nhanh vietsing, bình gas 45kg',
    is_published: 1,
    created_at: new Date().toISOString()
  }
];

let memoryPosts = [...defaultInitialPosts];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published');

    let query = 'SELECT * FROM posts';
    const queryParams = [];

    if (publishedOnly === 'true' || publishedOnly === '1') {
      query += ' WHERE is_published = 1';
    } else if (publishedOnly === 'false' || publishedOnly === '0') {
      query += ' WHERE is_published = 0';
    }

    query += ' ORDER BY created_at DESC';

    let rows = [];
    try {
      const [dbRows] = await db.query(query, queryParams);
      rows = dbRows || [];
    } catch (e) {
      console.error('Database query error in GET /api/posts:', e.message);
    }

    if (!rows || rows.length === 0) {
      for (const p of defaultInitialPosts) {
        try {
          await db.query(
            `INSERT INTO posts (id, title, slug, excerpt, content, image_url, meta_title, meta_description, meta_keywords, is_published)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.id, p.title, p.slug, p.excerpt, p.content, p.image_url, p.meta_title, p.meta_description, p.meta_keywords, p.is_published]
          );
        } catch (e) {}
      }

      try {
        const [newRows] = await db.query(query, queryParams);
        rows = newRows || [];
      } catch (e) {}
    }

    if (!rows || rows.length === 0) {
      rows = memoryPosts;
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return NextResponse.json({ success: true, data: memoryPosts });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để thực hiện thao tác này.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      image_url, 
      meta_title,
      meta_description,
      meta_keywords,
      is_published 
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề và slug là bắt buộc' },
        { status: 400 }
      );
    }

    let insertId = Date.now();
    try {
      const [result] = await db.query(
        `INSERT INTO posts (title, slug, content, excerpt, image_url, meta_title, meta_description, meta_keywords, is_published) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title, 
          slug, 
          content || '', 
          excerpt || '', 
          image_url || '', 
          meta_title || null,
          meta_description || null,
          meta_keywords || null,
          is_published ? 1 : 0
        ]
      );
      if (result && result.insertId) {
        insertId = result.insertId;
      }
    } catch (dbErr) {
      console.error('DB Insert error in POST /api/posts:', dbErr.message);
    }

    const newPostObj = {
      id: insertId,
      title,
      slug,
      content: content || '',
      excerpt: excerpt || '',
      image_url: image_url || '',
      meta_title: meta_title || title,
      meta_description: meta_description || excerpt,
      meta_keywords: meta_keywords || '',
      is_published: is_published ? 1 : 0,
      created_at: new Date().toISOString()
    };

    memoryPosts.unshift(newPostObj);

    return NextResponse.json({
      success: true,
      message: 'Tạo bài viết thành công',
      data: newPostObj
    });
  } catch (error) {
    console.error('Error creating post:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo bài viết: ' + error.message },
      { status: 500 }
    );
  }
}
