const h = require('fs').readFileSync(require('path').join(__dirname, '../index.html'), 'utf8');
const j = h.indexOf('function e(){var e=Array.prototype.find');
console.log(h.slice(j, j + 900));
console.log('has photo-upload hide css', h.includes('#photo-upload'));
