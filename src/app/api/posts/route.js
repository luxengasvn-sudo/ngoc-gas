import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    const [rows] = await db.query(query, queryParams);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy danh sách bài viết' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
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

    return NextResponse.json({
      success: true,
      message: 'Tạo bài viết thành công',
      data: { id: result.insertId, title, slug }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Slug đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo bài viết' },
      { status: 500 }
    );
  }
}
