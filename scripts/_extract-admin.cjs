const fs = require('fs');
const path = require('path');
const s = fs.readFileSync(path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'), 'utf8');
const i = s.indexOf('return r==="adminPanel"');
console.log(s.slice(i, i + 4500));
