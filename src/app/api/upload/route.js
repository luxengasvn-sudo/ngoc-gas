import { writeFile, mkdir, readdir, stat, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { getAuthenticatedUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const imagesDir = path.join(process.cwd(), 'public/images');
    
    let mediaFiles = [];

    // 1. Read files in public/uploads
    try {
      await mkdir(uploadsDir, { recursive: true });
      const uploadNames = await readdir(uploadsDir);
      for (const name of uploadNames) {
        if (name.startsWith('.')) continue;
        const filePath = path.join(uploadsDir, name);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          mediaFiles.push({
            url: `/uploads/${name}`,
            name,
            size: (fileStat.size / 1024).toFixed(1) + ' KB',
            rawSize: fileStat.size,
            mtime: fileStat.mtime.getTime(),
            folder: 'uploads'
          });
        }
      }
    } catch (e) {
      console.error('Error reading uploads folder:', e);
    }

    // 2. Read files in public/images
    try {
      await mkdir(imagesDir, { recursive: true });
      const imageNames = await readdir(imagesDir);
      for (const name of imageNames) {
        if (name.startsWith('.')) continue;
        const filePath = path.join(imagesDir, name);
        const fileStat = await stat(filePath);
        if (fileStat.isFile()) {
          mediaFiles.push({
            url: `/images/${name}`,
            name,
            size: (fileStat.size / 1024).toFixed(1) + ' KB',
            rawSize: fileStat.size,
            mtime: fileStat.mtime.getTime(),
            folder: 'images'
          });
        }
      }
    } catch (e) {
      console.error('Error reading images folder:', e);
    }

    // Sort newest first
    mediaFiles.sort((a, b) => b.mtime - a.mtime);

    return NextResponse.json({
      success: true,
      data: mediaFiles
    });
  } catch (error) {
    console.error('Error fetching media files:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi lấy danh sách thư viện ảnh' },
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

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy tệp tin tải lên' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.name);
    
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: 'Tải ảnh lên thành công',
      url: `/uploads/${filename}`,
      name: filename
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi tải tệp tin lên' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Không có quyền truy cập. Vui lòng đăng nhập.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');

    if (!fileUrl) {
      return NextResponse.json(
        { success: false, message: 'URL tệp tin là bắt buộc' },
        { status: 400 }
      );
    }

    // Only allow deleting files in /uploads/
    if (!fileUrl.startsWith('/uploads/')) {
      return NextResponse.json(
        { success: false, message: 'Chỉ được phép xóa các ảnh trong thư mục /uploads/' },
        { status: 403 }
      );
    }

    const filename = path.basename(fileUrl);
    const filePath = path.join(process.cwd(), 'public/uploads', filename);

    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: 'Đã xóa ảnh khỏi thư viện server thành công'
    });
  } catch (error) {
    console.error('Error deleting media file:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa file khỏi server' },
      { status: 500 }
    );
  }
}
