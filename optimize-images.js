// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './assets/characters-raw';
const outputDir = './assets/characters';

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.png')) {
    sharp(path.join(inputDir, file))
      .resize(300, 400, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, file.replace('.png', '.webp')))
      .then(() => console.log(`✅ ${file}`))
      .catch(err => console.error(`❌ ${file}:`, err));
  }
});
