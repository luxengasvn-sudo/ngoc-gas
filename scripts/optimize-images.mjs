import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const baseName = path.basename(file, ext);
      const webpPath = path.join(dirPath, `${baseName}.webp`);

      // Only generate if WebP does not exist or original is newer
      if (!fs.existsSync(webpPath) || stat.mtimeMs > fs.statSync(webpPath).mtimeMs) {
        try {
          const originalSizeKB = (stat.size / 1024).toFixed(1);
          await sharp(fullPath)
            .webp({ quality: 82, effort: 4 })
            .toFile(webpPath);
          const newSizeKB = (fs.statSync(webpPath).size / 1024).toFixed(1);
          const savings = (((stat.size - fs.statSync(webpPath).size) / stat.size) * 100).toFixed(1);
          console.log(`✓ Converted: ${file} (${originalSizeKB} KB) -> ${baseName}.webp (${newSizeKB} KB, saved ${savings}%)`);
        } catch (err) {
          console.error(`✗ Error converting ${file}:`, err.message);
        }
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization with Sharp (preserving original files)...');
  console.log('--- Processing public/uploads ---');
  await processDirectory(UPLOADS_DIR);
  console.log('--- Processing public/images ---');
  await processDirectory(IMAGES_DIR);
  console.log('✨ Image optimization completed successfully.');
}

main().catch(console.error);
