import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MIME_TYPES = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams?.path;

    if (!pathSegments || !Array.isArray(pathSegments) || pathSegments.length === 0) {
      return NextResponse.json({ error: 'Tệp tin không tồn tại' }, { status: 404 });
    }

    // 1. Kiểm tra an toàn chống Path Traversal
    for (const segment of pathSegments) {
      if (!segment || segment.includes('..') || segment.includes('/') || segment.includes('\\')) {
        return NextResponse.json({ error: 'Đường dẫn không hợp lệ' }, { status: 400 });
      }
    }

    const relativePath = path.join(...pathSegments);

    // 2. Tìm kiếm tệp tin tại các vị trí lưu trữ thực tế trên máy chủ
    const candidatePaths = [
      path.join(process.cwd(), 'public', 'uploads', relativePath),
      path.join(process.cwd(), '..', '..', 'public', 'uploads', relativePath),
      path.join(process.cwd(), '..', 'public', 'uploads', relativePath),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'uploads', relativePath)
    ];

    const targetPath = candidatePaths.find(p => {
      try {
        return fs.existsSync(p) && fs.statSync(p).isFile();
      } catch (e) {
        return false;
      }
    });

    if (!targetPath) {
      return NextResponse.json({ error: 'Không tìm thấy tệp ảnh' }, { status: 404 });
    }

    // 3. Đọc dữ liệu tệp và xác định MIME Type
    const fileBuffer = fs.readFileSync(targetPath);
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(fileBuffer.length)
      }
    });
  } catch (error) {
    console.error('Error serving upload file:', error.message);
    return NextResponse.json({ error: 'Lỗi máy chủ khi đọc tệp' }, { status: 500 });
  }
}

export async function HEAD(request, { params }) {
  const getRes = await GET(request, { params });
  return new NextResponse(null, {
    status: getRes.status,
    headers: getRes.headers
  });
}
