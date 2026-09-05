const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
let s = fs.readFileSync(bundlePath, 'utf8');

const start = s.indexOf('vrFaceSheet=vrFaceUi?');
const end = s.indexOf('}):null;C.useEffect(()=>{if(r==="loadingSplash")');
if (start < 0 || end < 0) {
  console.error('face sheet block not found', start, end);
  process.exit(1);
}

const newSheet =
  'vrFaceSheet=vrFaceUi?h.jsx("div",{className:"fixed inset-x-0 top-0 z-[9999] flex justify-center pointer-events-none",style:{paddingTop:"max(8px, env(safe-area-inset-top))",animation:"vrSheetDown .28s cubic-bezier(.32,.72,0,1)"},children:h.jsxs("div",{className:"mx-3 flex items-center gap-3 rounded-2xl bg-[#1c1c1e]/95 px-4 py-3 shadow-2xl backdrop-blur-md",children:[h.jsxs("svg",{viewBox:"0 0 96 96",className:"h-10 w-10 shrink-0",fill:"none",stroke:"#30D158",strokeWidth:"2.5",strokeLinecap:"round",children:[h.jsx("path",{d:"M28 40c0-8 6-14 20-14s20 6 20 14"}),h.jsx("path",{d:"M24 56c4 12 14 18 24 18s20-6 24-18"}),h.jsx("circle",{cx:"38",cy:"44",r:"2",fill:"#30D158",stroke:"none"}),h.jsx("circle",{cx:"58",cy:"44",r:"2",fill:"#30D158",stroke:"none"}),h.jsx("path",{d:"M48 52v8"}),h.jsx("path",{d:"M32 68c6 4 28 4 32 0"})]}),h.jsxs("div",{className:"text-left",children:[h.jsx("p",{className:"text-[15px] font-semibold leading-tight text-white",children:"Face ID"}),h.jsx("p",{className:"text-[12px] text-white/55",children:"Unlocking myVicRoads"})]})]})}):null';

s = s.slice(0, start) + newSheet + s.slice(end);
fs.writeFileSync(bundlePath, s);
console.log('OK: compact top Face ID bar');
