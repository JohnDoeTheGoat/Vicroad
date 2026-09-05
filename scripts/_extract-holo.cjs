const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '../index.html'), 'utf8');
const i = html.indexOf('function a(){');
console.log(html.slice(i, i + 3500));
