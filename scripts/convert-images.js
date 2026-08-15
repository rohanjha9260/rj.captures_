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
        // Skip if already up‑to‑date
        if (fs.existsSync(outputPath)) {
          const srcStat = fs.statSync(fullPath);
          const outStat = fs.statSync(outputPath);
          if (outStat.mtimeMs >= srcStat.mtimeMs) continue;
        }
        sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`Converted: ${fullPath} → ${outputPath}`))
          .catch(err => console.error(`Error converting ${fullPath}:`, err));
      }
    }
  }
}

walkDir(imagesDir);
console.log('Image conversion complete.');
