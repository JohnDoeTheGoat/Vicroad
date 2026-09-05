const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const HOLO_KEY = 'vr_hologram_enabled';

// 1) Default hologram on + continuous tilt-driven brightness
const oldState =
  '[T,S]=C.useState(.5),[k,b]=C.useState(0),F=10,[Q,M]=C.useState(120)';

const newState =
  `[T,S]=C.useState(function(){try{if(localStorage.getItem("${HOLO_KEY}")==="0")return .5}catch(_){}return 1}),[k,b]=C.useState(0),F=10,[Q,M]=C.useState(120)`;

if (!s.includes(oldState)) {
  console.error('MISSING: hologram state init');
  process.exit(1);
}
s = s.replace(oldState, newState);
console.log('OK: hologram defaults on');

const oldMotionEffect =
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0,onMotion=G=>{const ye=typeof G.gamma=="number"?G.gamma:typeof G.beta=="number"?G.beta:0,xe=Math.floor(Math.abs(ye)/F);b(U=>{if(xe===U)return U;S(W=>W===.5?1:.5);return xe})},attach=()=>{z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,!1)},wake=()=>{try{if(typeof window.__vrNativeMotionRequest=="function")return window.__vrNativeMotionRequest();if(typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function")return DeviceOrientationEvent.requestPermission()}catch(_){}return Promise.resolve("granted")},boot=async()=>{try{var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}if(mc==="denied")return;if(mc!=="granted"){if(typeof DeviceOrientationEvent.requestPermission!="function"){if(dead)return;attach();return}var pr=await DeviceOrientationEvent.requestPermission();if(pr!=="granted"){console.warn("Motion permission not granted");return}try{localStorage.setItem("vr_motion_permission","granted"),localStorage.setItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="),"granted")}catch(_){}}else await wake();if(dead)return;attach();try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}catch(G){console.error("Orientation permission error:",G)}},onGranted=()=>{dead||boot()},onShow=()=>{dead||boot()};boot();window.addEventListener("vr:motion-permission-granted",onGranted);window.addEventListener("pageshow",onShow);return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted);window.removeEventListener("pageshow",onShow)}},[r])';

const newMotionEffect =
  `C.useEffect(()=>{if(r!=="licenceDetail"){try{if(localStorage.getItem("${HOLO_KEY}")!=="0")return}catch(_){}S(.5);return}try{if(localStorage.getItem("${HOLO_KEY}")!=="0")S(1)}catch(_){}let z,dead=0,clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),onMotion=G=>{var ye=typeof G.gamma=="number"&&!isNaN(G.gamma)?G.gamma:typeof G.beta=="number"&&!isNaN(G.beta)?G.beta:typeof G.alpha=="number"&&!isNaN(G.alpha)?G.alpha*.35:0,tilt=clamp(Math.abs(ye)/38,0,1);try{if(localStorage.getItem("${HOLO_KEY}")!=="0")S(.52+.48*tilt)}catch(_){S(.52+.48*tilt)}},attach=()=>{z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,{passive:!0})},wake=()=>{try{if(typeof window.__vrNativeMotionRequest=="function")return window.__vrNativeMotionRequest();if(typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function")return DeviceOrientationEvent.requestPermission()}catch(_){}return Promise.resolve("granted")},boot=async()=>{try{var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}if(mc==="denied")return;if(mc!=="granted"){if(typeof DeviceOrientationEvent.requestPermission!="function"){if(dead)return;attach();return}var pr=await DeviceOrientationEvent.requestPermission();if(pr!=="granted"){console.warn("Motion permission not granted");return}try{localStorage.setItem("vr_motion_permission","granted"),localStorage.setItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="),"granted"),localStorage.setItem("${HOLO_KEY}","1")}catch(_){}}else await wake();if(dead)return;attach();try{localStorage.setItem("${HOLO_KEY}","1")}catch(_){}try{if(localStorage.getItem("${HOLO_KEY}")!=="0")S(1)}catch(_){}try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}catch(G){console.error("Orientation permission error:",G)}},onGranted=()=>{dead||boot()},onShow=()=>{dead||boot()},onTouch=()=>{dead||boot()};boot();window.addEventListener("vr:motion-permission-granted",onGranted);window.addEventListener("pageshow",onShow);document.addEventListener("touchstart",onTouch,{passive:!0});return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted);window.removeEventListener("pageshow",onShow);document.removeEventListener("touchstart",onTouch)}},[r])`;

if (!s.includes(oldMotionEffect)) {
  console.error('MISSING: licence motion effect');
  process.exit(1);
}
s = s.replace(oldMotionEffect, newMotionEffect);
console.log('OK: continuous tilt hologram + auto-on');

// 2) Sticky View details header in bundle
const oldHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden",children:[h.jsxs("div",{className:"fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center",children:[h.jsx("button",{onClick:()=>Z("licence"),className:"p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

const newHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden overflow-y-auto",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

if (!s.includes(oldHeader)) {
  console.error('MISSING: licence header JSX');
  process.exit(1);
}
s = s.replace(oldHeader, newHeader);
console.log('OK: sticky licence header');

// 3) Admin entry: 4x Hi user in 2s -> motion prompt then admin
const oldJ =
  'j=()=>{var N=(window.__vrHiTap=(window.__vrHiTap||0)+1);clearTimeout(window.__vrHiTapT);if(N>=4){window.__vrHiTap=0;Z("adminPanel");return}window.__vrHiTapT=setTimeout(function(){window.__vrHiTap=0},2e3)}';

const newJ =
  'j=()=>{var N=(window.__vrHiTap=(window.__vrHiTap||0)+1);clearTimeout(window.__vrHiTapT);if(N>=4){window.__vrHiTap=0;var go=()=>Z("adminPanel");if(typeof window.__vrPromptMotionForAdmin=="function"){window.__vrPromptMotionForAdmin().then(go).catch(go)}else if(typeof window.__vrNativeMotionRequest=="function"){window.__vrNativeMotionRequest().then(go).catch(go)}else go();return}window.__vrHiTapT=setTimeout(function(){window.__vrHiTap=0},2e3)}';

if (!s.includes(oldJ)) {
  console.error('MISSING: Hi user tap handler');
  process.exit(1);
}
s = s.replace(oldJ, newJ);
console.log('OK: admin opens with motion prompt');

// 4) Also prompt when admin panel mounts
const oldAdmin =
  'if(r==="adminPanel")return h.jsxs("div",{className:"min-h-screen bg-gray-50 p-6",children:[h.jsxs("div",{className:"max-w-2xl mx-auto",children:[h.jsxs("div",{className:"flex items-center justify-between mb-6",children:[h.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Admin Panel"})';

const newAdmin =
  'if(r==="adminPanel")return h.jsxs("div",{className:"min-h-screen bg-gray-50 p-6",children:[h.jsxs("div",{className:"max-w-2xl mx-auto",children:[h.jsxs("div",{className:"flex items-center justify-between mb-6",children:[h.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Admin Panel"})';

// Add useEffect for admin - insert after adminPanel check via separate patch
const adminEffectAnchor =
  'C.useEffect(()=>{if(r!=="licenceDetail"){try{if(localStorage.getItem("vr_hologram_enabled")!=="0")return}catch(_){}S(.5);return}';

const adminEffect =
  'C.useEffect(()=>{if(r!=="adminPanel")return;var ran=0,run=()=>{if(ran)return;ran=1;if(typeof window.__vrPromptMotionForAdmin=="function")window.__vrPromptMotionForAdmin().catch(function(){});else if(typeof window.__vrNativeMotionRequest=="function")window.__vrNativeMotionRequest().catch(function(){})};run();return()=>{ran=0}},[r]),';

if (!s.includes(adminEffectAnchor)) {
  console.error('MISSING: anchor for admin effect');
  process.exit(1);
}
if (!s.includes('if(r!=="adminPanel")return;var ran=0')) {
  s = s.replace(adminEffectAnchor, adminEffect + adminEffectAnchor);
  console.log('OK: admin panel motion prompt on mount');
} else {
  console.log('SKIP: admin effect already present');
}

fs.writeFileSync(bundlePath, s);

// 5) index.html: sticky header CSS (remove broken relative override), motion prompt only via admin
const oldLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50{position:relative!important;top:auto!important;inset:auto!important;width:100%;padding-top:max(.75rem,env(safe-area-inset-top));padding-bottom:.25rem;z-index:10!important;box-shadow:none}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50 button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer;position:relative;z-index:11}';

const newLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch}body.vr-licence-view-active #root .vr-licence-header,body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.sticky.top-0{position:sticky!important;top:0!important;z-index:60!important;width:100%;box-shadow:0 1px 0 rgba(0,0,0,.06)}body.vr-licence-view-active #root .vr-licence-header button,body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.sticky.top-0 button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence view CSS');
  process.exit(1);
}
html = html.replace(oldLicenceCss, newLicenceCss);
console.log('OK: sticky header CSS');

// 6) Motion script: no global prompt on random tap; admin-only prompt helper
const oldArmBlock =
  'function runPrompt(){function next(x){return rm&&x==="granted"?M.requestPermission():Promise.resolve(x)}var p=ro?O.requestPermission():Promise.resolve("granted");p.then(next).catch(function(){})}if(ro||rm){ro&&(O.requestPermission=wrap(O.requestPermission.bind(O))),rm&&(M.requestPermission=wrap(M.requestPermission.bind(M)));function armPrompt(){function once(){var c=get();if(c==="granted"){nativeMotion().catch(function(){}),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0);return}if(c==="denied")return;runPrompt(),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",function(){var c=get();c==="granted"&&nativeMotion().catch(function(){});document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0)},{once:!0}):(get()==="granted"&&nativeMotion().catch(function(){}),document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0))}armPrompt();';

const newArmBlock =
  'function runPrompt(){function next(x){return rm&&x==="granted"?nativeRM?nativeRM():Promise.resolve(x):Promise.resolve(x)}var p=nativeRO?nativeRO():Promise.resolve("granted");return p.then(function(s){return s==="granted"&&(put("granted"),broadcast()),s==="denied"&&put("denied"),next(s)}).catch(function(){return"denied"})}window.__vrPromptMotionForAdmin=function(){var c=get();if(c==="denied")return Promise.resolve("denied");if(c==="granted")return nativeMotion();return runPrompt()};if(ro||rm){ro&&(O.requestPermission=wrap(O.requestPermission.bind(O))),rm&&(M.requestPermission=wrap(M.requestPermission.bind(M)));function armResume(){var c=get();c==="granted"&&nativeMotion().catch(function(){})}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",armResume,{once:!0}):armResume();';

if (!html.includes(oldArmBlock)) {
  console.error('MISSING: armPrompt block');
  process.exit(1);
}
html = html.replace(oldArmBlock, newArmBlock);
console.log('OK: admin-only motion prompt helper');

// Stronger hologram tilt sensitivity in index.html profile holo
const oldHoloN =
  'function n(e){var t=0;"number"==typeof e.gamma?t=o((e.gamma||0)/32,-1,1):"number"==typeof e.beta&&(t=o((e.beta||0)/42,-1,1)),r(t)}';
const newHoloN =
  'function n(e){var t=0;"number"==typeof e.gamma&&!isNaN(e.gamma)?t=o((e.gamma||0)/28,-1,1):"number"==typeof e.beta&&!isNaN(e.beta)?t=o((e.beta||0)/35,-1,1):"number"==typeof e.alpha&&!isNaN(e.alpha)&&(t=o((e.alpha||0)/55,-1,1)),r(t)}';

if (html.includes(oldHoloN)) {
  html = html.replace(oldHoloN, newHoloN);
  console.log('OK: holo tilt sensitivity');
} else {
  console.log('SKIP: holo n() already updated');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260524[a-z]/, 'index-CpHhEkhB.js?v=20260525a');
if (!html.includes('index-CpHhEkhB.js?v=20260525a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260525a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
