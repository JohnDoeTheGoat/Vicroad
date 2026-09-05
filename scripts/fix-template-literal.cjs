const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
let s = fs.readFileSync(bundlePath, 'utf8');

// Inside template literals, {passive:!0} is parsed as interpolation — use !1 instead
const fixes = [
  ['window.addEventListener("deviceorientation",z,{passive:!0})', 'window.addEventListener("deviceorientation",z,!1)'],
  ['document.addEventListener("touchstart",onTouch,{passive:!0})', 'document.addEventListener("touchstart",onTouch,!1)'],
];

for (const [from, to] of fixes) {
  if (s.includes(from)) {
    s = s.replace(from, to);
    console.log('fixed:', from.slice(0, 50));
  }
}

fs.writeFileSync(bundlePath, s);
console.log('done');
