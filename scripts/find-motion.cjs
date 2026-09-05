const fs = require('fs');
const s = fs.readFileSync(
  require('path').join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js'),
  'utf8'
);
const i = s.indexOf('licenceDetail"){S(.5)');
if (i < 0) {
  console.log('no licenceDetail motion');
  process.exit(0);
}
const chunk = s.slice(i, i + 2200);
console.log(chunk);
const j = chunk.indexOf('onGranted=()=>{dead||boot()}');
console.log('onGranted at', j);
