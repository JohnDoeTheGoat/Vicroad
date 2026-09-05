const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// 1) Pin screen: lock in place, no scroll
const oldPin =
  'if(r==="pinEntry")return h.jsxs("div",{className:"min-h-screen bg-white flex flex-col items-center justify-center px-6",children:';
const newPin =
  'if(r==="pinEntry")return h.jsxs("div",{className:"vr-pin-screen fixed inset-0 z-[100] h-[100dvh] overflow-hidden overscroll-none bg-white flex flex-col items-center justify-center px-6",children:';

if (!s.includes(oldPin)) {
  console.error('MISSING: pin screen');
  process.exit(1);
}
s = s.replace(oldPin, newPin);

// 2) Hi User: 3 sizes smaller, less bold
const oldHi =
  'className:"text-gray-900 text-5xl sm:text-6xl font-bold leading-none cursor-pointer select-none",children:["Hi ",($==null?void 0:$.first_name)||"User"]';
const newHi =
  'className:"text-gray-900 text-2xl sm:text-3xl font-semibold leading-tight cursor-pointer select-none",children:["Hi ",($==null?void 0:$.first_name)||"User"]';

if (!s.includes(oldHi)) {
  console.error('MISSING: Hi User');
  process.exit(1);
}
s = s.replace(oldHi, newHi);

// 3) Licence: restore Last refreshed + fix spacer so header clears red bar
const oldLicence =
  'h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsxs("div",{className:"bg-[#DE3424] px-5 py-4 flex items-center justify-between relative z-0",children:';

const newLicence =
  'h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0 bg-white",children:h.jsxs("p",{className:"text-xs text-gray-500 text-center",children:["Last refreshed: ",new Date().toLocaleString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1})]})}),h.jsxs("div",{className:"bg-[#DE3424] px-5 py-4 flex items-center justify-between relative z-0",children:';

if (!s.includes(oldLicence)) {
  console.error('MISSING: licence block');
  process.exit(1);
}
s = s.replace(oldLicence, newLicence);

fs.writeFileSync(bundlePath, s);

// Pin screen CSS + prevent body scroll
const pinCss =
  '#root .vr-pin-screen{position:fixed!important;inset:0!important;height:100dvh!important;max-height:100dvh!important;overflow:hidden!important;touch-action:none!important;overscroll-behavior:none!important}body.vr-pin-active{overflow:hidden!important;position:fixed!important;width:100%!important;height:100%!important}';

if (!html.includes('vr-pin-screen')) {
  html = html.replace(
    '#root .vr-nav-base{filter:grayscale',
    pinCss + '#root .vr-nav-base{filter:grayscale'
  );
}

// Pin active body class script
const pinScript =
  '<script>!function(){function s(){var p=document.querySelector("#root .vr-pin-screen");document.body.classList.toggle("vr-pin-active",!!p)}var t=0;function r(){clearTimeout(t);t=setTimeout(s,30)}s();new MutationObserver(r).observe(document.getElementById("root")||document.body,{childList:!0,subtree:!0})}()</script>';

if (!html.includes('vr-pin-active')) {
  html = html.replace('</body>', pinScript + '</body>');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260531[a-z]/, 'index-CpHhEkhB.js?v=20260531c');
if (!html.includes('index-CpHhEkhB.js?v=20260531c')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260531c');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
