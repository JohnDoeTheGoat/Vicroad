const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
console.log('photo-upload', s.includes('photo-upload'));
console.log('fixed header', s.includes('fixed inset-x-0 top-0 z-50'));
console.log('vr-licence-header', s.includes('vr-licence-header'));
const i = s.indexOf('htmlFor:"signature_url"');
console.log('sig admin idx', i);
if (i >= 0) console.log(s.slice(i - 30, i + 750));
const p = s.indexOf('htmlFor:"photo_url"');
console.log('photo admin idx', p);
if (p >= 0) {
  const start = s.lastIndexOf('h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"photo_url"', p);
  const end = s.indexOf('h.jsxs("div",{className:"space-y-6 pt-6 border-t"', p);
  console.log('PHOTO BLOCK LEN', end - start);
  console.log(s.slice(start, end));
}
const ld = s.indexOf('licenceDetail")return');
console.log('licence detail return', ld);
if (ld >= 0) console.log(s.slice(ld, ld + 550));
