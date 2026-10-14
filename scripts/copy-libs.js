// Copies the SheetJS library (used to read the Excel question database) into www/lib,
// so the Android app can import .xlsx files without internet access to a CDN.
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'node_modules', 'xlsx', 'dist', 'xlsx.full.min.js');
const dstDir = path.join(__dirname, '..', 'www', 'lib');
if (!fs.existsSync(src)) {
  console.error('Missing ' + src + ' – run "npm install" first.');
  process.exit(1);
}
fs.mkdirSync(dstDir, { recursive: true });
fs.copyFileSync(src, path.join(dstDir, 'xlsx.full.min.js'));
console.log('SheetJS copied to www/lib/xlsx.full.min.js');
