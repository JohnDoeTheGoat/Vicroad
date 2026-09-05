const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
const keys = ['vr-nav-pill', 'vr-nav-tab', 'vr-nav-strip', 'vr-nav-bar', 'function Ee', 'Ee=function', 'active:n'];
for (const k of keys) {
  const i = s.indexOf(k);
  console.log(k, i >= 0 ? i : 'MISSING');
  if (i >= 0) console.log(s.slice(Math.max(0, i - 100), i + 2500).slice(0, 2600));
  console.log('---');
}
