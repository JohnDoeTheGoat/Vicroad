const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// --- 1) Hi User: much bigger on home ---
const oldHi =
  'className:"text-gray-900 text-[1.85rem] sm:text-4xl font-bold leading-tight cursor-pointer select-none",children:["Hi ",($==null?void 0:$.first_name)||"User"]';
const newHi =
  'className:"text-gray-900 text-5xl sm:text-6xl font-bold leading-none cursor-pointer select-none",children:["Hi ",($==null?void 0:$.first_name)||"User"]';

if (!s.includes(oldHi)) {
  console.error('MISSING: Hi User');
  process.exit(1);
}
s = s.replace(oldHi, newHi);
console.log('OK: Hi User much bigger');

// --- 2) Licence detail: fixed View details at top, remove Last refreshed ---
const oldLicenceBlock =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden overflow-y-auto pb-8",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}Z("licence")},className:"p-1 -ml-1 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation cursor-pointer relative z-[11]",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7 pointer-events-none",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",children:h.jsxs("p",{className:"text-xs text-gray-500 text-center",children:["Last refreshed: ",new Date().toLocaleString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1})]})}),h.jsxs("div",{className:"bg-[#DE3424] px-5 py-4 flex items-center justify-between relative z-0",';

const newLicenceBlock =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsxs("div",{className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}Z("licence")},className:"p-1 -ml-1 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation cursor-pointer relative z-[11]",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7 pointer-events-none",children:"View details"})]}),h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsxs("div",{className:"bg-[#DE3424] px-5 py-4 flex items-center justify-between relative z-0",';

if (!s.includes(oldLicenceBlock)) {
  console.error('MISSING: licence detail block');
  process.exit(1);
}
s = s.replace(oldLicenceBlock, newLicenceBlock);
console.log('OK: fixed View details, removed Last refreshed');

fs.writeFileSync(bundlePath, s);

// --- 3) Licence CSS: fixed header ---
const oldLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch}body.vr-licence-view-active #root .vr-licence-header{position:sticky!important;top:0!important;z-index:60!important;width:100%;background:#fff!important}body.vr-licence-view-active #root .vr-licence-header button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;position:relative;z-index:61}';

const newLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch}body.vr-licence-view-active #root .vr-licence-header{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:60!important;width:100%;background:#fff!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header-spacer{display:block!important;width:100%}body.vr-licence-view-active #root .vr-licence-header button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;position:relative;z-index:61}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence css');
  process.exit(1);
}
html = html.replace(oldLicenceCss, newLicenceCss);
console.log('OK: licence fixed header CSS');

// --- 4) Status bar: reliable color on every page change ---
const oldStatusScript =
  /<script>!function\(\)\{var m=document\.getElementById\("vr-theme-color"\)[\s\S]*?attributeFilter:\["class"\]\)\}\(\)<\/script>/;

const newStatusScript =
  '<script>!function(){var m=document.getElementById("vr-theme-color")||document.querySelector(\'meta[name=theme-color]\');function set(c){if(m)m.setAttribute("content",c);document.documentElement.style.backgroundColor=c;document.body.style.backgroundColor=c}function pick(){var r=document.getElementById("root");if(!r)return set("#E8EDF1");var e=r.firstElementChild;if(!e)e=r.querySelector(".min-h-screen");if(!e)return set("#E8EDF1");var s=e.className||"",b=e.querySelector("[class*=\\"bg-[\\"]");if(s.indexOf("E8EDF1")>=0||s.indexOf("bg-[#E8EDF1]")>=0)set("#E8EDF1");else if(s.indexOf("F2F2F7")>=0||s.indexOf("bg-[#F2F2F7]")>=0)set("#F2F2F7");else if(s.indexOf("bg-white")>=0||/bg-\\[#FFF/i.test(s))set("#FFFFFF");else if(b&&b.className){var bc=b.className;if(bc.indexOf("E8EDF1")>=0)set("#E8EDF1");else if(bc.indexOf("F2F2F7")>=0)set("#F2F2F7");else set("#FFFFFF")}else set("#FFFFFF")}var t=0;function run(){clearTimeout(t);t=setTimeout(pick,30)}pick();new MutationObserver(run).observe(document.getElementById("root")||document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]});document.addEventListener("visibilitychange",run);window.addEventListener("pageshow",run);setInterval(pick,800)}()</script>';

if (oldStatusScript.test(html)) {
  html = html.replace(oldStatusScript, newStatusScript);
  console.log('OK: improved status bar script');
} else {
  console.warn('WARN: status bar script pattern not found');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260531[a-z]/, 'index-CpHhEkhB.js?v=20260531b');
if (!html.includes('index-CpHhEkhB.js?v=20260531b')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260531b');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
