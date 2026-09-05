const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const oldHeader =
  'r==="demeritPoints")return h.jsxs("div",{className:"min-h-screen bg-white",children:[h.jsxs("div",{className:"sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center",children:[h.jsx("button",{onClick:()=>Z("home"),className:"p-1 -ml-1",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"Demerit points"})]}),';

const newHeader =
  'r==="demeritPoints")return h.jsxs("div",{className:"min-h-screen bg-white",children:[h.jsx("div",{className:"sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10",children:h.jsxs("div",{className:"relative flex items-center min-h-[48px]",children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),Z("home")},className:"relative z-[80] min-w-[48px] min-h-[48px] flex items-center justify-center -ml-2 touch-manipulation cursor-pointer",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"absolute inset-x-0 text-center text-lg font-semibold text-gray-900 pointer-events-none select-none",children:"Demerit points"})]})}),';

if (!s.includes(oldHeader)) {
  console.error('MISSING: demerit header');
  process.exit(1);
}
s = s.replace(oldHeader, newHeader);
fs.writeFileSync(bundlePath, s);
console.log('OK: demerit back button');

html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260531d');
fs.writeFileSync(indexPath, html);
console.log('OK: cache buster');
