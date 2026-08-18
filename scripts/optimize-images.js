const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

async function optimizeImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('Images directory does not exist:', IMAGES_DIR);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  console.log(`Found ${files.length} files in public/images/`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const fullPath = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(fullPath);
    const origSize = stat.size;
    totalOriginal += origSize;

    const baseName = path.basename(file, ext);
    const webpPath = path.join(IMAGES_DIR, `${baseName}.webp`);

    try {
      // 1. Create optimized WebP version
      await sharp(fullPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);

      const webpStat = fs.statSync(webpPath);
      totalWebp += webpStat.size;

      const saving = ((origSize - webpStat.size) / origSize * 100).toFixed(1);
      console.log(`✓ Converted: ${file} (${(origSize/1024).toFixed(1)} KB) -> ${baseName}.webp (${(webpStat.size/1024).toFixed(1)} KB) [Saved ${saving}%]`);

      // 2. Also compress original PNG in-place if it's over 300KB
      if (ext === '.png' && origSize > 300 * 1024) {
        const compressedPngBuffer = await sharp(fullPath)
          .png({ compressionLevel: 9, quality: 85 })
          .toBuffer();
        
        if (compressedPngBuffer.length < origSize) {
          fs.writeFileSync(fullPath, compressedPngBuffer);
          console.log(`  └─ Optimized PNG fallback: ${file} from ${(origSize/1024).toFixed(1)} KB to ${(compressedPngBuffer.length/1024).toFixed(1)} KB`);
        }
      }
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Summary: Total original ${(totalOriginal / 1024 / 1024).toFixed(2)} MB -> Total WebP ${(totalWebp / 1024 / 1024).toFixed(2)} MB (Reduced by ${((totalOriginal - totalWebp) / totalOriginal * 100).toFixed(1)}%)`);
}

optimizeImages();
