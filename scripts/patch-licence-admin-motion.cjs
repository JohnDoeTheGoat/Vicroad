const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

function rep(label, from, to) {
  if (!s.includes(from)) {
    console.error('MISSING bundle:', label);
    process.exit(1);
  }
  s = s.replace(from, to);
  console.log('OK:', label);
}

// Licence header: sticky at top, working back button, no overlap spacer
if (!s.includes('vr-licence-header')) {
  rep(
    'licence-header',
    'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden",children:[h.jsxs("div",{className:"fixed inset-x-0 top-0 z-50 bg-white px-4 py-3 flex items-center",children:[h.jsx("button",{onClick:()=>Z("home"),className:"p-1 -ml-1",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"shrink-0 h-14","aria-hidden":!0}),h.jsx("div",{className:"px-4 py-2 relative z-0",',
    'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"vr-licence-back relative z-[61] min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7 pointer-events-none",children:"View details"})]}),h.jsx("div",{className:"px-4 py-2 relative z-0",'
  );
} else {
  console.log('SKIP: licence-header already patched');
}

// Remove admin upload photo + signature blocks entirely
const uploadBlocks =
  'h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"photo_url",children:"License Photo"}),h.jsxs("div",{className:"mt-2",children:[A.profile.photo_url&&h.jsx("img",{src:A.profile.photo_url,alt:"License",className:"w-32 h-32 object-cover rounded-lg mb-2"}),h.jsx("input",{type:"file",accept:"image/*",onChange:N=>ue(N,"photo_url"),className:"hidden",id:"photo-upload"}),h.jsx("label",{htmlFor:"photo-upload",children:h.jsx(_a,{type:"button",variant:"outline",className:"cursor-pointer",asChild:!0,children:h.jsxs("span",{children:[h.jsx(ip,{className:"w-4 h-4 mr-2"}),"Upload Photo"]})})})]})]}),h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"signature_url",children:"Signature Image"}),h.jsxs("div",{className:"mt-2",children:[A.profile.signature_url&&h.jsx("img",{src:A.profile.signature_url,alt:"Signature",className:"h-16 mb-2 bg-white border rounded"}),h.jsx("input",{type:"file",accept:"image/*",onChange:N=>ue(N,"signature_url"),className:"hidden",id:"signature-upload"}),h.jsx("label",{htmlFor:"signature-upload",children:h.jsx(_a,{type:"button",variant:"outline",className:"cursor-pointer",asChild:!0,children:h.jsxs("span",{children:[h.jsx(ip,{className:"w-4 h-4 mr-2"}),"Upload Signature"]})})})]})]})]}),';

if (s.includes(uploadBlocks)) {
  s = s.replace(uploadBlocks, '');
  console.log('OK: removed photo+signature upload blocks');
} else if (!s.includes('photo-upload')) {
  console.log('SKIP: upload blocks already removed');
} else {
  console.error('MISSING upload blocks');
  process.exit(1);
}

// Motion: passive listener, hologram pulse, touch wake
if (s.includes('window.addEventListener("deviceorientation",z,!1)')) {
  s = s.replace(
    'window.addEventListener("deviceorientation",z,!1)',
    'window.addEventListener("deviceorientation",z,{passive:!0})'
  );
  console.log('OK: passive deviceorientation in React');
}

const oldMotionTail =
  'if(dead)return;attach();try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}catch(G){console.error("Orientation permission error:",G)}},onGranted=()=>{dead||boot()},onShow=()=>{dead||boot()};boot();window.addEventListener("vr:motion-permission-granted",onGranted);window.addEventListener("pageshow",onShow);return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted);window.removeEventListener("pageshow",onShow)}},[r])';

const newMotionTail =
  'if(dead)return;attach();try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}setTimeout(function(){if(!dead){try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}},350)}catch(G){console.error("Orientation permission error:",G)}},onGranted=()=>{dead||boot()},onShow=()=>{dead||boot()},onTouch=()=>{dead||boot()};boot();window.addEventListener("vr:motion-permission-granted",onGranted);window.addEventListener("pageshow",onShow);document.addEventListener("touchstart",onTouch,{passive:!0});return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted);window.removeEventListener("pageshow",onShow);document.removeEventListener("touchstart",onTouch)}},[r])';

if (s.includes(oldMotionTail)) {
  s = s.replace(oldMotionTail, newMotionTail);
  console.log('OK: motion boot + touch wake');
} else if (s.includes('onTouch=()=>{dead||boot()}')) {
  console.log('SKIP: motion already patched');
} else {
  console.error('MISSING motion tail');
  process.exit(1);
}

fs.writeFileSync(bundlePath, s);

// index.html: licence header CSS + stronger admin hide + hologram passive listener
html = html.replace(
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50{padding-top:calc(.75rem + env(safe-area-inset-top,0px))!important;padding-bottom:.75rem!important}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{display:none!important;height:0!important;min-height:0!important;overflow:hidden!important}',
  '#root .vr-licence-header{position:sticky;top:0;z-index:60}#root button.vr-licence-back{pointer-events:auto!important;touch-action:manipulation;-webkit-tap-highlight-color:transparent;cursor:pointer}'
);

// Improve admin hide - remove whole field groups
const oldAdminScript =
  'function e(){var e=Array.prototype.find.call(document.querySelectorAll("h1"),function(e){return e&&e.textContent&&"Admin Panel"===e.textContent.trim()});if(e){var t=e.closest("div.min-h-screen")||document.body,n={"photo-upload":!0,"signature-upload":!0};Array.prototype.forEach.call(t.querySelectorAll("input[type=\'file\']"),function(e){e&&n[e.id]&&(e.parentElement?e.parentElement.style.display="none":e.style.display="none")}),Array.prototype.forEach.call(t.querySelectorAll("label"),function(e){if(e){var t=(e.textContent||"").trim(),n=e.getAttribute("for")||"";"photo-upload"!==n&&"signature-upload"!==n&&"License Photo"!==t&&"Signature Image"!==t||(e.style.display="none")}})}';

const newAdminScript =
  'function e(){var e=Array.prototype.find.call(document.querySelectorAll("h1"),function(e){return e&&e.textContent&&"Admin Panel"===e.textContent.trim()});if(e){var t=e.closest("div.min-h-screen")||document.body;Array.prototype.forEach.call(t.querySelectorAll("input[type=\'file\']"),function(e){var p=e&&e.closest("div");for(;p&&p!==t;){if(p.querySelector&&(p.querySelector("label[for=\'photo-upload\']")||p.querySelector("label[for=\'signature-upload\']")||p.querySelector("#photo-upload")||p.querySelector("#signature-upload"))){p.style.display="none";break}p=p.parentElement}}),Array.prototype.forEach.call(t.querySelectorAll("label"),function(e){if(e){var n=(e.textContent||"").trim(),o=e.getAttribute("for")||"";if("photo-upload"===o||"signature-upload"===o||"License Photo"===n||"Signature Image"===n){var p=e.closest("div");p&&(p.style.display="none")}}})}';

if (html.includes(oldAdminScript)) {
  html = html.replace(oldAdminScript, newAdminScript);
  console.log('OK: admin hide script');
}

// Hologram: passive orientation listener + re-register on licence view
const holoPatch =
  'window.addEventListener("deviceorientation",n,!1)';
const holoNew =
  'window.addEventListener("deviceorientation",n,{passive:!0})';
if (html.includes(holoPatch)) {
  html = html.replace(holoPatch, holoNew);
  console.log('OK: passive deviceorientation');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260524[a-z]/, 'index-CpHhEkhB.js?v=20260524k');
if (!html.includes('20260524k')) {
  html = html.replace('index-CpHhEkhB.js?v=20260524j', 'index-CpHhEkhB.js?v=20260524k');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
