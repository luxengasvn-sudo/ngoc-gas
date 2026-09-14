import { writeFile, mkdir, readdir, stat, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';
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

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico']);
const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/x-icon',
  'image/vnd.microsoft.icon'
]);
const MAX_FILE_SIZE = 8 * 1024 * 1024; // Tối đa 8MB

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

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy tệp tin tải lên hợp lệ' },
        { status: 400 }
      );
    }

    // 1. Kiểm tra kích thước tệp
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Dung lượng tệp vượt quá giới hạn tối đa cho phép (8MB).' },
        { status: 400 }
      );
    }

    // 2. Kiểm tra định dạng phần mở rộng (Extension Whitelist)
    const rawExt = path.extname(file.name || '').toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(rawExt)) {
      return NextResponse.json(
        { success: false, message: 'Định dạng tệp không được hỗ trợ. Chỉ chấp nhận ảnh (.png, .jpg, .jpeg, .webp, .svg, .gif, .ico)' },
        { status: 400 }
      );
    }

    // 3. Kiểm tra MIME-type
    if (file.type && !ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: 'MIME type của tệp không hợp lệ.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Tạo tên file ngẫu nhiên an toàn, loại bỏ ký tự đặc biệt
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + rawExt;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Auto generate optimized WebP version for images
    if (['.png', '.jpg', '.jpeg'].includes(rawExt)) {
      try {
        const webpFilename = `${uniqueSuffix}.webp`;
        const webpPath = path.join(uploadDir, webpFilename);
        await sharp(buffer)
          .webp({ quality: 82, effort: 4 })
          .toFile(webpPath);
      } catch (sharpErr) {
        console.warn('Auto WebP conversion warning:', sharpErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Tải ảnh lên thành công',
      url: `/uploads/${filename}`,
      name: filename
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi máy chủ khi tải tệp tin lên.' },
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

    // Chặn Path Traversal và chỉ cho phép xóa file trong /uploads/
    if (!fileUrl.startsWith('/uploads/') || fileUrl.includes('..')) {
      return NextResponse.json(
        { success: false, message: 'Đường dẫn tệp tin không hợp lệ hoặc bị từ chối truy cập.' },
        { status: 403 }
      );
    }

    const filename = path.basename(fileUrl);
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    await unlink(filePath);

    // Also remove webp companion if exists
    const ext = path.extname(filename).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const base = path.basename(filename, ext);
      const webpPath = path.join(process.cwd(), 'public', 'uploads', `${base}.webp`);
      await unlink(webpPath).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: 'Đã xóa ảnh khỏi thư viện server thành công'
    });
  } catch (error) {
    console.error('Error deleting media file:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa file khỏi server.' },
      { status: 500 }
    );
  }
}
