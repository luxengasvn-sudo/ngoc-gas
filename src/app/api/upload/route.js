import { writeFile, mkdir, readdir, stat, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { getAuthenticatedUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to recursively collect images from a directory
async function scanImageFiles(dirPath, urlPrefix, results = []) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        await scanImageFiles(fullPath, `${urlPrefix}/${entry.name}`, results);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico'].includes(ext)) {
          try {
            const fileStat = await stat(fullPath);
            results.push({
              url: `${urlPrefix}/${entry.name}`,
              name: entry.name,
              size: (fileStat.size / 1024).toFixed(1) + ' KB',
              rawSize: fileStat.size,
              mtime: fileStat.mtime.getTime(),
              folder: urlPrefix.replace('/', '')
            });
          } catch (e) {
            // Ignore stat errors for individual files
          }
        }
      }
    }
  } catch (e) {
    // Directory might not exist yet
  }
  return results;
}

export async function GET(request) {
  try {
    let mediaFiles = [];

    // 1. Scan public/uploads
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    await scanImageFiles(uploadsDir, '/uploads', mediaFiles);

    // 2. Scan public/images
    const imagesDir = path.join(process.cwd(), 'public/images');
    await scanImageFiles(imagesDir, '/images', mediaFiles);

    // 3. Add default system images fallback if missing
    const defaultSystemImages = [
      '/images/sopet-xam.png',
      '/images/sopet-xanh-den.png',
      '/images/sopet-xanh.png',
      '/images/sopet.png',
      '/images/phoenix-xam.png',
      '/images/phoenix-lg-xanh.png',
      '/images/phoenix-do.png',
      '/images/luxen-gas.png',
      '/images/luxen-xam-12kg.png',
      '/images/luxen-45.png',
      '/images/luxen-xam-45.png',
      '/images/delivery-motorcycle.jpg',
      '/images/gas-cylinder.jpg'
    ];

    const existingUrls = new Set(mediaFiles.map(m => m.url));
    for (const sysUrl of defaultSystemImages) {
      if (!existingUrls.has(sysUrl)) {
        mediaFiles.push({
          url: sysUrl,
          name: path.basename(sysUrl),
          size: 'System Image',
          rawSize: 0,
          mtime: Date.now(),
          folder: 'images'
        });
      }
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
