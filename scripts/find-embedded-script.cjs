const h = require('fs').readFileSync(require('path').join(__dirname, '../index.html'), 'utf8');
const low = h.toLowerCase();
let i = 0;
while ((i = low.indexOf('</script>', i)) >= 0) {
  const before = h.slice(Math.max(0, i - 80), i);
  const ok = /\}\)\(\)\s*$/.test(before) || /\}\s*\(\)\s*$/.test(before);
  if (!ok) {
    console.log('SUSPICIOUS at', i);
    console.log('before:', before);
    console.log('after:', h.slice(i, i + 120));
  }
  i += 9;
}
