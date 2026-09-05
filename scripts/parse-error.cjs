const fs = require('fs');
const path = require('path');
const s = fs.readFileSync(path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'), 'utf8');

function tryParse(code) {
  try {
    new Function(code);
    return true;
  } catch {
    return false;
  }
}

// Find first line where prefix fails
const lines = s.split('\n');
let lo = 0;
let hi = lines.length;
while (lo < hi) {
  const mid = (lo + hi) >> 1;
  const prefix = lines.slice(0, mid + 1).join('\n');
  if (tryParse(prefix)) lo = mid + 1;
  else hi = mid;
}
console.log('first bad line (1-based):', lo + 1);
const bad = lines[lo] || '';
console.log('line length', bad.length);
// Find char in line via binary search
let loC = 0;
let hiC = bad.length;
while (loC < hiC) {
  const mid = (loC + hiC) >> 1;
  const prefix = lines.slice(0, lo).join('\n') + (lo ? '\n' : '') + bad.slice(0, mid + 1);
  if (tryParse(prefix)) loC = mid + 1;
  else hiC = mid;
}
console.log('first bad col (0-based):', loC);
console.log('context:', bad.slice(Math.max(0, loC - 60), loC + 60));
