import { NextResponse } from 'next/server';
import { getAllPosts, createPostData } from '@/lib/postsHelper';
import { requireRole } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published');

    let posts = await getAllPosts();
    if (publishedOnly === 'true' || publishedOnly === '1') {
      posts = posts.filter(p => p.is_published == 1);
    }

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    const fallback = await getAllPosts();
    return NextResponse.json({ success: true, data: fallback });
  }
}

export async function POST(request) {
  try {
    const auth = requireRole(request, ['admin', 'editor']);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status });
    }

    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề và slug là bắt buộc' },
        { status: 400 }
      );
    }

    const newPost = await createPostData(body);

    return NextResponse.json({
      success: true,
      message: 'Tạo bài viết thành công',
      data: newPost
    });
  } catch (error) {
    console.error('Error creating post:', error.message);
    return NextResponse.json(
      { success: false, message: 'Lỗi server khi tạo bài viết: ' + error.message },
      { status: 500 }
    );
  }
}
