const fs = require('fs');
const p = require('path').join(__dirname, '../index.html');
let h = fs.readFileSync(p, 'utf8');
const a =
  'if(c==="granted"){nativeMotion().catch(function(){});return}';
const b =
  'if(c==="granted"){nativeMotion().catch(function(){}),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0);return}';
if (!h.includes(a)) {
  console.error('not found');
  process.exit(1);
}
h = h.replace(a, b);
fs.writeFileSync(p, h);
console.log('ok');
