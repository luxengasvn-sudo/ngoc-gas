import { NextResponse } from 'next/server';
import { getPostByIdOrSlug, updatePostData, deletePostData } from '@/lib/postsHelper';
import { requireRole } from '@/lib/auth';
import { notifyGoogleIndex } from '@/lib/googleIndexing';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const post = await getPostByIdOrSlug(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi lấy chi tiết bài viết' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = requireRole(request, ['admin', 'editor']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề và slug là bắt buộc' },
        { status: 400 }
      );
    }

    const updatedPost = await updatePostData(id, body);

    // Tự động thông báo Google Indexing API nếu bài viết ở trạng thái xuất bản
    if (updatedPost && (updatedPost.is_published == 1 || updatedPost.is_published === true)) {
      notifyGoogleIndex(`https://ngocgas.com/tin-tuc/${updatedPost.slug}`, 'URL_UPDATED').catch(err => {
        console.warn('⚠️ [PUT /api/posts/[id]] Google Indexing API ping error:', err.message);
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật bài viết thành công',
      data: updatedPost
    });
  } catch (error) {
    console.error('Error updating post:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi cập nhật bài viết: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = requireRole(request, ['admin', 'editor']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const { id } = await params;
    const existingPost = await getPostByIdOrSlug(id);
    await deletePostData(id);

    // Tự động thông báo Google Indexing API gỡ URL nếu bài viết trước đó đã xuất bản
    if (existingPost && (existingPost.is_published == 1 || existingPost.is_published === true)) {
      notifyGoogleIndex(`https://ngocgas.com/tin-tuc/${existingPost.slug}`, 'URL_DELETED').catch(err => {
        console.warn('⚠️ [DELETE /api/posts/[id]] Google Indexing API delete error:', err.message);
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa bài viết thành công'
    });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi xóa bài viết' },
      { status: 500 }
    );
  }
}
