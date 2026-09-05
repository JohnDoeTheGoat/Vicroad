const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
const idx = s.indexOf('function QE()');
const chunk = s.slice(idx, idx + 25000);

// full vrFaceUnlock through vrPasskeyEnsure
const a = chunk.indexOf('vrFaceUnlock=async');
console.log('vrFaceUnlock block:\n', chunk.slice(a, a + 2200));

const b = chunk.indexOf('C.useEffect(()=>{i');
console.log('splash effect:\n', chunk.slice(b, b + 500));

const c = chunk.indexOf('r==="adminPanel"');
console.log('admin @', c);
if (c >= 0) console.log(chunk.slice(c, c + 5000));

const d = chunk.indexOf('r==="pinEntry"');
console.log('pinEntry @', d);
if (d >= 0) console.log(chunk.slice(d, d + 2500));

// second motion effect
const e = chunk.indexOf('typeof DeviceOrientationEvent.requestPermission=="function"&&DeviceOrientationEvent');
console.log('motion2 @', e);
if (e >= 0) console.log(chunk.slice(e, e + 400));
