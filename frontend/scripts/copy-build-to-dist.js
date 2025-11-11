const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'build');
const dest = path.join(__dirname, '..', 'dist');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyRecursive(srcPath, destPath) {
  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    ensureDir(destPath);
    const entries = fs.readdirSync(srcPath, { withFileTypes: true });
    for (const entry of entries) {
      const srcEntry = path.join(srcPath, entry.name);
      const destEntry = path.join(destPath, entry.name);
      copyRecursive(srcEntry, destEntry);
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
  }
}

function main() {
  if (!fs.existsSync(src)) {
    console.error(`Source build directory not found: ${src}`);
    process.exit(1);
  }
  // Clean destination
  fs.rmSync(dest, { recursive: true, force: true });
  ensureDir(dest);
  // Copy build -> dist
  copyRecursive(src, dest);
  console.log('✅ Copiado: build -> dist');
}

main();