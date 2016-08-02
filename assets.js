const fs = require('fs');
const path = './build/manifest.json';
const manifest = JSON.parse(fs.readFileSync(path, 'utf8'));
const content = JSON.stringify({ manifest: manifest });
fs.writeFileSync(path, content, 'utf8');
