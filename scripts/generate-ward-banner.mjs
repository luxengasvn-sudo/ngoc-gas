#!/usr/bin/env node

/**
 * CÔNG CỤ TỰ ĐỘNG XUẤT BANNER LOCAL SEO TỐI GIẢN (NGỌC GAS BANNER GENERATOR)
 * Chuẩn 4 thông tin:
 * 1. Hệ thống Ngọc Gas (Logo)
 * 2. Giao Gas Nhanh — Cân Đủ Ký
 * 3. [Tên Phường]
 * 4. Hotline 1900 9396
 *
 * Cách dùng:
 * node scripts/generate-ward-banner.mjs --ward "Phường Dĩ An" --output "scratch/banner-di-an.jpg"
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

function parseArgs(args) {
  const params = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        params[key] = next;
        i++;
      } else {
        params[key] = true;
      }
    }
  }
  return params;
}

const args = parseArgs(process.argv.slice(2));
const wardName = args.ward || 'Phường Dĩ An';
const outputPath = args.output || `scratch/banner-${wardName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;

const rootDir = process.cwd();
const scratchDir = path.join(rootDir, 'scratch');
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

// Tìm browser executable (Chrome hoặc Edge)
function findBrowser() {
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Không tìm thấy Chrome hoặc Edge trên máy tính để chụp ảnh banner!');
}

const browserPath = findBrowser();

// Chuẩn bị đường dẫn tệp ảnh và logo
const bgImagePath = path.join(rootDir, 'public', 'images', 'xe-giao-gas-dong-phuc-chuan-ngoc-gas.jpg').replace(/\\/g, '/');
const logoImagePath = path.join(rootDir, 'public', 'uploads', '1784863563190-682917009.png').replace(/\\/g, '/');

const htmlTemplate = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Banner ${wardName} - Ngọc Gas</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative;
      background: #0A192F;
    }

    /* Background Driver Photo */
    .bg-photo {
      position: absolute;
      top: 0;
      right: 0;
      width: 660px;
      height: 630px;
      background-image: url('file:///${encodeURI(bgImagePath)}');
      background-size: cover;
      background-position: center 20%;
    }

    /* Smooth Gradient Overlay */
    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 1200px;
      height: 630px;
      background: linear-gradient(90deg, #071324 0%, #071324 52%, rgba(7, 19, 36, 0.92) 64%, rgba(7, 19, 36, 0.25) 86%, transparent 100%);
      z-index: 1;
    }

    /* Content Box */
    .content-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 720px;
      height: 630px;
      padding: 60px 64px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #FFFFFF;
    }

    /* 1. Hệ thống Ngọc Gas */
    .brand-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }

    .brand-logo-img {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background: #FFFFFF;
      padding: 4px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.35);
    }

    .brand-name {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 0.8px;
      color: #F8FAFC;
      text-transform: uppercase;
    }

    /* 2 & 3. Giao Gas Nhanh - Cân Đủ Ký & Phường */
    .title-group {
      margin-bottom: 34px;
    }

    .main-slogan {
      font-size: 38px;
      font-weight: 900;
      line-height: 1.25;
      color: #FFFFFF;
      margin-bottom: 10px;
      letter-spacing: -0.3px;
      white-space: nowrap;
    }

    .ward-name {
      font-size: 46px;
      font-weight: 900;
      color: #FFB703;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      display: inline-block;
      text-shadow: 0 2px 14px rgba(255, 183, 3, 0.3);
    }

    /* 4. Hotline 19009396 */
    .hotline-box {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      background: linear-gradient(135deg, #FF6B00 0%, #EA580C 100%);
      padding: 14px 30px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(234, 88, 12, 0.5);
      border: 1.5px solid rgba(255, 255, 255, 0.3);
      width: fit-content;
    }

    .hotline-icon {
      font-size: 28px;
      line-height: 1;
    }

    .hotline-number {
      font-size: 38px;
      font-weight: 900;
      color: #FFFFFF;
      letter-spacing: 1.5px;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="bg-photo"></div>
  <div class="gradient-overlay"></div>

  <div class="content-box">
    <!-- 1. Hệ thống Ngọc Gas -->
    <div class="brand-row">
      <img class="brand-logo-img" src="file:///${encodeURI(logoImagePath)}" alt="Logo Ngọc Gas" />
      <span class="brand-name">HỆ THỐNG NGỌC GAS</span>
    </div>

    <!-- 2 & 3. Giao Gas Nhanh - Cân Đủ Ký + Tên Phường -->
    <div class="title-group">
      <div class="main-slogan">Giao Gas Nhanh — Cân Đủ Ký</div>
      <div class="ward-name">${wardName.toUpperCase()}</div>
    </div>

    <!-- 4. Hotline 19009396 -->
    <div class="hotline-box">
      <span class="hotline-icon">📞</span>
      <span class="hotline-number">1900 9396</span>
    </div>
  </div>
</body>
</html>`;

const tempHtmlPath = path.join(scratchDir, `temp-banner-${Date.now()}.html`);
const tempPngPath = path.join(scratchDir, `temp-banner-${Date.now()}.png`);

fs.writeFileSync(tempHtmlPath, htmlTemplate, 'utf8');

try {
  console.log(`🎨 [BANNER GENERATOR] Đang tạo banner cho: "${wardName}"...`);
  const encodedHtmlUrl = `file:///${tempHtmlPath.replace(/\\/g, '/').split('/').map(segment => encodeURIComponent(segment)).join('/')}`.replace('file:///%2F', 'file:///');
  
  // Gọi Chrome/Edge headless
  const cmd = `powershell -Command "Start-Process -FilePath '${browserPath}' -ArgumentList '--headless', '--disable-gpu', '--screenshot=\\\"${tempPngPath}\\\"', '--window-size=1200,630', '${encodedHtmlUrl}' -Wait"`;
  execSync(cmd, { stdio: 'inherit' });

  if (!fs.existsSync(tempPngPath)) {
    throw new Error('Không tạo được ảnh PNG tạm từ headless browser!');
  }

  // Tối ưu hóa và xuất ảnh đích
  const absOutputPath = path.isAbsolute(outputPath) ? outputPath : path.join(rootDir, outputPath);
  const outExt = path.extname(absOutputPath).toLowerCase();

  let pipeline = sharp(tempPngPath);
  if (outExt === '.webp') {
    pipeline = pipeline.webp({ quality: 90 });
  } else if (outExt === '.jpg' || outExt === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
  } else {
    pipeline = pipeline.png({ quality: 90 });
  }

  await pipeline.toFile(absOutputPath);
  console.log(`✅ [BANNER GENERATOR] Đã xuất banner thành công tại: ${absOutputPath}`);

} finally {
  // Dọn dẹp file tạm
  if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
  if (fs.existsSync(tempPngPath)) fs.unlinkSync(tempPngPath);
}
