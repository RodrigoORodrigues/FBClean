import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

// Clean existing public directory
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir, { recursive: true });

// Copy all static assets from root to public
const items = fs.readdirSync(rootDir);
const staticExts = ['.html', '.png', '.jpeg', '.jpg', '.svg', '.webp', '.ico', '.css', '.js'];
const excludeFiles = new Set(['server.js', 'build.js', 'package.json', 'package-lock.json', 'vercel.json']);

let copiedCount = 0;
for (const item of items) {
  const itemPath = path.join(rootDir, item);
  const stat = fs.statSync(itemPath);

  if (stat.isFile()) {
    const ext = path.extname(item).toLowerCase();
    if (staticExts.includes(ext) && !excludeFiles.has(item)) {
      fs.copyFileSync(itemPath, path.join(publicDir, item));
      copiedCount++;
    }
  }
}

console.log(`Build complete: Copied ${copiedCount} files to public/`);
