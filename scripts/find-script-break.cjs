const h = require('fs').readFileSync(require('path').join(__dirname, '../index.html'), 'utf8');
const idx = h.indexOf('var _vrLvWas=0');
console.log('licence script at', idx);
console.log(h.slice(idx - 200, idx + 400));
const bad = [];
let i = 0;
while ((i = h.indexOf('</', i)) >= 0) {
  const snip = h.slice(i, i + 12).toLowerCase();
  if (snip.startsWith('</script') || snip.startsWith('</style')) {
    bad.push({ i, snip: h.slice(i, i + 20) });
  }
  i += 2;
}
console.log('closing tags', bad.length);
bad.forEach((b) => console.log(b.i, b.snip));
