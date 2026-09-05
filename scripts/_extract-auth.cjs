const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
const q = s.indexOf('function QE()');
const chunk = s.slice(q, q + 15000);
const markers = [
  'vrPasskey',
  'vrFaceUnlock',
  'vrPasskeyEnsure',
  'adminPanel',
  'pinEntry',
  'p.length===6',
  'splash',
  'loadingSplash',
  'DeviceOrientationEvent.requestPermission',
];
for (const m of markers) {
  const i = chunk.indexOf(m);
  if (i >= 0) console.log('\n---', m, '@', i, '---\n', chunk.slice(i, i + 600));
}
