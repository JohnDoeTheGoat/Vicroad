const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
const lines = s.split('\n');
console.log('total lines', lines.length);
for (let i = 135; i <= 140; i++) {
  const line = lines[i - 1] || '';
  const ticks = (line.match(/`/g) || []).length;
  console.log('L' + i, 'len', line.length, 'backticks', ticks);
}
const idx = s.indexOf('setTimeout(function(){if(!dead)');
console.log('setTimeout motion at', idx);
if (idx >= 0) {
  const lineNum = s.slice(0, idx).split('\n').length;
  console.log('line', lineNum);
  console.log(s.slice(idx - 200, idx + 300));
}
