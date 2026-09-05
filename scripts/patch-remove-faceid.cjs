const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

function rep(label, from, to) {
  if (!s.includes(from)) {
    console.error('MISSING:', label);
    process.exit(1);
  }
  s = s.replace(from, to);
  console.log('OK:', label);
}

rep(
  'state',
  '[r,n]=C.useState("splash"),[vrFaceUi,setVrFaceUi]=C.useState(!1),[adminPin,setAdminPin]',
  '[r,n]=C.useState("splash"),[adminPin,setAdminPin]'
);

rep(
  'splash',
  'C.useEffect(()=>{if(r!=="splash")return;let dead=0;const t=async()=>{try{await new Promise(e=>setTimeout(e,100));if(dead)return;n("pinEntry")}catch(_e){if(!dead)n("pinEntry")}};t();return()=>{dead=1}},[r])',
  'C.useEffect(()=>{if(r!=="splash")return;let dead=0;const t=async()=>{try{await new Promise(e=>setTimeout(e,400));if(dead)return;n("loadingSplash");await new Promise(e=>setTimeout(e,500));if(dead)return;n("pinEntry")}catch(_e){if(!dead)n("pinEntry")}};t();return()=>{dead=1}},[r])'
);

rep(
  'pin-submit',
  'r==="pinEntry"&&p.length===6&&setTimeout(()=>{if(!vrPinOk(p)){m("");return}n("home"),m("");if(vrIsMobile()&&!localStorage.getItem(vrBioDoneKey)&&!localStorage.getItem(vrPasskeySlot))setTimeout(vrPasskeyEnsure,80)},120)',
  'r==="pinEntry"&&p.length===6&&setTimeout(()=>{if(!vrPinOk(p)){m("");return}n("home"),m("")},200)'
);

const authStart = s.indexOf('const vrPasskeySlot=');
const authEnd = s.indexOf('const qrPattern=()=>');
if (authStart < 0 || authEnd < 0) {
  console.error('auth block bounds not found');
  process.exit(1);
}

const pinOnly =
  'const vrPinKey="vr-app-pin",vrGetPin=()=>{try{return localStorage.getItem(vrPinKey)||""}catch(_){return""}},vrSetPin=e=>{try{localStorage.setItem(vrPinKey,e)}catch(_){}},vrPinOk=e=>{const t=vrGetPin();return t?t===e:(vrSetPin(e),!0)};';

s = s.slice(0, authStart) + pinOnly + s.slice(authEnd);
console.log('OK: removed passkey/face auth block');

// Remove face-id pinEntry effect if present
const faceEffect =
  'C.useEffect(()=>{if(r==="loadingSplash"){n("pinEntry");return}if(r!=="pinEntry")return;vrIsMobile()&&localStorage.getItem(vrPasskeySlot)&&setVrFaceUi(!0);let w=setTimeout(()=>void vrFaceUnlock(),50);return()=>{clearTimeout(w),setVrFaceUi(!1)}},[r]);';
if (s.includes(faceEffect)) {
  s = s.replace(faceEffect, '');
  console.log('OK: removed face pin effect');
}

if (s.includes('vrFaceSheet,')) {
  s = s.replace('vrFaceSheet,', '');
  console.log('OK: removed vrFaceSheet from pinEntry');
}

const styleBlock =
  'h.jsx("style",{children:"@keyframes vrFadeIn{from{opacity:0}to{opacity:1}}@keyframes vrSheetDown{from{transform:translateY(-120%)}to{transform:translateY(0)}}"}),';
if (s.includes(styleBlock)) {
  s = s.replace(styleBlock, '');
  console.log('OK: removed face anim styles');
}

if (s.includes('children:vrIsMobile()&&localStorage.getItem(vrPasskeySlot)?"Use Face ID or enter your PIN":"Enter your PIN"')) {
  s = s.replace(
    'children:vrIsMobile()&&localStorage.getItem(vrPasskeySlot)?"Use Face ID or enter your PIN":"Enter your PIN"',
    'children:"Enter your PIN"'
  );
  console.log('OK: pin title');
} else if (s.includes('children:"Use Face ID or enter your PIN"')) {
  s = s.replace('children:"Use Face ID or enter your PIN"', 'children:"Enter your PIN"');
  console.log('OK: pin title alt');
}

fs.writeFileSync(bundlePath, s);

html = html.replace(
  '<meta http-equiv="Permissions-Policy" content="publickey-credentials-get=(self), publickey-credentials-create=(self)"> ',
  ''
);
html = html.replace(/index-CpHhEkhB\.js\?v=20260524[a-z]/, 'index-CpHhEkhB.js?v=20260524h');
if (!html.includes('20260524h')) {
  html = html.replace('index-CpHhEkhB.js?v=20260524g', 'index-CpHhEkhB.js?v=20260524h');
}
fs.writeFileSync(indexPath, html);

console.log('Done. Run node --check on bundle.');
