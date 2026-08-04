import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy chi tiết bài viết' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const { id } = await params;
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
        { success: false, message: 'Tiêu đề và slug là bài viết bắt buộc' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `UPDATE posts 
       SET title = ?, 
           slug = ?, 
           content = ?, 
           excerpt = ?, 
           image_url = ?, 
           meta_title = ?,
           meta_description = ?,
           meta_keywords = ?,
           is_published = ? 
       WHERE id = ?`,
      [
        title, 
        slug, 
        content || '', 
        excerpt || '', 
        image_url || '', 
        meta_title || null,
        meta_description || null,
        meta_keywords || null,
        is_published ? 1 : 0, 
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật bài viết thành công'
    });
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Slug đã tồn tại, vui lòng chọn slug khác' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật bài viết' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa bài viết thành công'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa bài viết' },
      { status: 500 }
    );
  }
}
