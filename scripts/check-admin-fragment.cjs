const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
const marker = 'placeholder:"DD/MM/YYYY"})]}),h.jsxs("div",{className:"space-y-6 pt-6 border-t",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"License Information"}';
const i = s.indexOf(marker);
console.log('marker idx', i);
if (i >= 0) console.log(s.slice(i - 120, i + 80));
