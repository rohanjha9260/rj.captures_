// scripts/convert-images.js
// Node script to recursively convert JPEG/PNG images in public/images to WebP using sharp.
// It writes WebP files alongside original images.

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputPath = fullPath.replace(/\.[^.]+$/, '.webp');
        const thumbOutputPath = fullPath.replace(/\.[^.]+$/, '-thumb.webp');
        
        let needsFull = true;
        let needsThumb = true;

        if (fs.existsSync(outputPath)) {
          const srcStat = fs.statSync(fullPath);
          const outStat = fs.statSync(outputPath);
          if (outStat.mtimeMs >= srcStat.mtimeMs) needsFull = false;
        }

        if (fs.existsSync(thumbOutputPath)) {
          const srcStat = fs.statSync(fullPath);
          const outStat = fs.statSync(thumbOutputPath);
          if (outStat.mtimeMs >= srcStat.mtimeMs) needsThumb = false;
        }

        if (!needsFull && !needsThumb) continue;

        if (needsFull) {
          sharp(fullPath)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outputPath)
            .then(() => console.log(`Converted: ${fullPath} → ${outputPath}`))
            .catch(err => console.error(`Error converting ${fullPath} (full):`, err));
        }

        if (needsThumb) {
          sharp(fullPath)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(thumbOutputPath)
            .then(() => console.log(`Converted: ${fullPath} → ${thumbOutputPath}`))
            .catch(err => console.error(`Error converting ${fullPath} (thumb):`, err));
        }
      }
    }
  }
}

walkDir(imagesDir);
console.log('Image conversion complete.');
