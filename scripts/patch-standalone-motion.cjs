const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let html = fs.readFileSync(indexPath, 'utf8');
let s = fs.readFileSync(bundlePath, 'utf8');

// --- index.html: stop short-circuiting native motion API when cached "granted" ---
const oldWrap =
  'function wrap(native){return function(){if(!native)return Promise.resolve("granted");var cached=get();return cached==="granted"?(broadcast(),Promise.resolve("granted")):cached==="denied"?Promise.resolve("denied"):native().then(function(s){return s==="granted"&&(put("granted"),broadcast()),s==="denied"&&put("denied"),s})}}';

const newWrap =
  'var nativeRO=ro?O.requestPermission.bind(O):null,nativeRM=rm?M.requestPermission.bind(M):null;function nativeMotion(){function next(x){return nativeRM&&x==="granted"?nativeRM():Promise.resolve(x)}var p=nativeRO?nativeRO():Promise.resolve("granted");return p.then(function(s){return s==="granted"&&(put("granted"),broadcast()),s==="denied"&&put("denied"),next(s)})}window.__vrNativeMotionRequest=nativeMotion;function wrap(native){return function(){if(!native)return Promise.resolve("granted");if(get()==="denied")return Promise.resolve("denied");return native().then(function(s){return s==="granted"&&(put("granted"),broadcast()),s==="denied"&&put("denied"),s})}}';

if (!html.includes(oldWrap)) {
  console.error('MISSING: motion wrap short-circuit');
  process.exit(1);
}
html = html.replace(oldWrap, newWrap);
console.log('OK: motion wrap uses native API');

const oldWake =
  'function wakeMotion(){var c=get();if(c!=="granted")return;var p=ro?O.requestPermission():Promise.resolve("granted");p.then(function(s){s==="granted"&&broadcast()}).catch(function(){})}';

const newWake =
  'function wakeMotion(){var c=get();if(c!=="granted")return;nativeMotion().catch(function(){})}';

if (!html.includes(oldWake)) {
  console.error('MISSING: wakeMotion');
  process.exit(1);
}
html = html.replace(oldWake, newWake);
console.log('OK: wakeMotion calls native');

const oldOnce =
  'function once(){var c=get();if(c==="granted"){broadcast();return}if(c==="denied")return;runPrompt(),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0)}';

const newOnce =
  'function once(){var c=get();if(c==="granted"){nativeMotion().catch(function(){}),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0);return}if(c==="denied")return;runPrompt(),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0)}';

if (!html.includes(oldOnce)) {
  console.error('MISSING: armPrompt once');
  process.exit(1);
}
html = html.replace(oldOnce, newOnce);
console.log('OK: armPrompt once re-arms native motion');

const oldDomReady =
  'document.addEventListener("DOMContentLoaded",function(){var c=get();c==="granted"&&broadcast();document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0)},{once:!0}):(get()==="granted"&&broadcast(),document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0))';

const newDomReady =
  'document.addEventListener("DOMContentLoaded",function(){var c=get();c==="granted"&&nativeMotion().catch(function(){});document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0)},{once:!0}):(get()==="granted"&&nativeMotion().catch(function(){}),document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0))';

if (!html.includes(oldDomReady)) {
  console.error('MISSING: DOMContentLoaded motion boot');
  process.exit(1);
}
html = html.replace(oldDomReady, newDomReady);
console.log('OK: DOMContentLoaded re-arms native motion');

// Hologram: re-arm sensors when PWA returns from background
const oldHoloGrant =
  'window.addEventListener("vr:motion-permission-granted",function(){try{window.removeEventListener("deviceorientation",n);window.addEventListener("deviceorientation",n,{passive:!0})}catch(e){}r(0)}));';

const newHoloGrant =
  'window.addEventListener("vr:motion-permission-granted",function(){try{window.removeEventListener("deviceorientation",n);window.addEventListener("deviceorientation",n,{passive:!0})}catch(e){}r(0)}),window.addEventListener("pageshow",function(){try{var g=localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))||localStorage.getItem("vr_motion_permission");g==="granted"&&window.__vrNativeMotionRequest&&window.__vrNativeMotionRequest().catch(function(){})}catch(e){}}));';

if (!html.includes(oldHoloGrant)) {
  console.error('MISSING: hologram motion listener');
  process.exit(1);
}
html = html.replace(oldHoloGrant, newHoloGrant);
console.log('OK: hologram pageshow re-arm');

// Licence view observer: use native motion on resume
const oldLicenceBroadcast =
  'g==="granted"&&window.__vrMotionBroadcast&&window.__vrMotionBroadcast()';

const newLicenceBroadcast =
  'g==="granted"&&(window.__vrNativeMotionRequest?window.__vrNativeMotionRequest().catch(function(){}):window.__vrMotionBroadcast&&window.__vrMotionBroadcast())';

if (!html.includes(oldLicenceBroadcast)) {
  console.error('MISSING: licence view motion broadcast');
  process.exit(1);
}
html = html.replace(oldLicenceBroadcast, newLicenceBroadcast);
console.log('OK: licence view uses native motion');

// --- React bundle: wake() must call native motion, not wrapped short-circuit ---
const oldWakeFn =
  'wake=()=>{try{if(typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function")return DeviceOrientationEvent.requestPermission()}catch(_){}return Promise.resolve("granted")}';

const newWakeFn =
  'wake=()=>{try{if(typeof window.__vrNativeMotionRequest=="function")return window.__vrNativeMotionRequest();if(typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function")return DeviceOrientationEvent.requestPermission()}catch(_){}return Promise.resolve("granted")}';

if (!s.includes(oldWakeFn)) {
  console.error('MISSING: React wake()');
  process.exit(1);
}
s = s.replace(oldWakeFn, newWakeFn);
console.log('OK: React wake() uses native motion');

// Bump cache busters
html = html.replace(/index-CpHhEkhB\.js\?v=20260524[a-z]/, 'index-CpHhEkhB.js?v=20260524r');
if (!html.includes('index-CpHhEkhB.js?v=20260524r')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=\d+[a-z]?/, 'index-CpHhEkhB.js?v=20260524r');
}

fs.writeFileSync(indexPath, html);
fs.writeFileSync(bundlePath, s);
console.log('Done.');
