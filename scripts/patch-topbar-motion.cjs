const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// 1) Fix grey top band — layout wrapper was bg-gray-50
const oldKe =
  'function KE({children:r,currentPageName:n}){const s=mn();return["/","/splash","/pin-entry","/qr-code-view"].includes(s.pathname)?h.jsx("div",{className:"min-h-screen bg-gray-50",children:r}):h.jsxs("div",{className:"min-h-screen bg-gray-50",children:';
const newKe =
  'function KE({children:r,currentPageName:n}){const s=mn();return["/splash","/pin-entry","/qr-code-view"].includes(s.pathname)?h.jsx("div",{className:"min-h-screen bg-white",children:r}):h.jsxs("div",{className:"min-h-screen bg-[#E8EDF1]",children:';
if (!s.includes(oldKe)) {
  console.error('KE layout not found');
  process.exit(1);
}
s = s.replace(oldKe, newKe);
console.log('OK: KE layout backgrounds');

// 2) Licence motion — wake sensors when already granted, re-attach on resume
const oldMotion =
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0,attach=()=>{z=G=>{const ye=G.beta||0,xe=Math.floor(Math.abs(ye)/F);b(U=>{if(xe===U)return U;S(W=>W===.5?1:.5);return xe})};window.addEventListener("deviceorientation",z)};(async()=>{try{var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}if(mc==="granted"){if(dead)return;attach();return}if(typeof DeviceOrientationEvent.requestPermission!="function"){if(dead)return;attach();return}if(mc==="denied")return;var pr=await DeviceOrientationEvent.requestPermission();if(pr!=="granted"){console.warn("Motion permission not granted");return}if(dead)return;attach()}catch(G){console.error("Orientation permission error:",G)}})();return()=>{dead=1,z&&window.removeEventListener("deviceorientation",z)}},[r])';

const newMotion =
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0,onMotion=G=>{const ye=typeof G.gamma=="number"?G.gamma:typeof G.beta=="number"?G.beta:0,xe=Math.floor(Math.abs(ye)/F);b(U=>{if(xe===U)return U;S(W=>W===.5?1:.5);return xe})},attach=()=>{z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,!1)},wake=()=>{try{if(typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function")return DeviceOrientationEvent.requestPermission()}catch(_){}return Promise.resolve("granted")},boot=async()=>{try{var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}if(mc==="denied")return;if(mc!=="granted"){if(typeof DeviceOrientationEvent.requestPermission!="function"){if(dead)return;attach();return}var pr=await DeviceOrientationEvent.requestPermission();if(pr!=="granted"){console.warn("Motion permission not granted");return}try{localStorage.setItem("vr_motion_permission","granted"),localStorage.setItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="),"granted")}catch(_){}}else await wake();if(dead)return;attach();try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}catch(G){console.error("Orientation permission error:",G)}},onGranted=()=>{dead||boot()},onShow=()=>{dead||boot()};boot();window.addEventListener("vr:motion-permission-granted",onGranted);window.addEventListener("pageshow",onShow);return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted);window.removeEventListener("pageshow",onShow)}},[r])';

if (!s.includes(oldMotion)) {
  console.error('licence motion effect not found');
  process.exit(1);
}
s = s.replace(oldMotion, newMotion);
console.log('OK: licence motion effect');

fs.writeFileSync(bundlePath, s);

// 3) index.html — viewport, status bar, body bg, hide fake top spacer, wake motion on resume
html = html.replace(
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
);

if (!html.includes('apple-mobile-web-app-status-bar-style')) {
  html = html.replace(
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default">'
  );
}

html = html.replace(
  '<meta name="theme-color" content="#ffffff">',
  '<meta name="theme-color" content="#E8EDF1">'
);

html = html.replace(
  'background_color:"#ffffff",theme_color:"#ffffff"',
  'background_color:"#E8EDF1",theme_color:"#E8EDF1"'
);

html = html.replace(
  '<style>html{-webkit-text-size-adjust:100%}',
  '<style>html{-webkit-text-size-adjust:100%;background:#E8EDF1}body{margin:0;background:#E8EDF1}'
);

html = html.replace(
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{height:calc(3.5rem + env(safe-area-inset-top,0px))!important;flex-shrink:0}',
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{display:none!important;height:0!important;min-height:0!important;overflow:hidden!important}'
);

// Wake motion + broadcast when app returns (already granted — no prompt)
const motionWake =
  'function wakeMotion(){var c=get();if(c!=="granted")return;var p=ro?O.requestPermission():Promise.resolve("granted");p.then(function(s){s==="granted"&&broadcast()}).catch(function(){})}window.addEventListener("pageshow",wakeMotion);document.addEventListener("visibilitychange",function(){document.hidden||wakeMotion()});';

if (!html.includes('function wakeMotion()')) {
  html = html.replace('armPrompt()}}()', 'armPrompt();' + motionWake + '}()');
  console.log('OK: motion wake on resume');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260524[a-z]/, 'index-CpHhEkhB.js?v=20260524i');
if (!html.includes('20260524i')) {
  html = html.replace('index-CpHhEkhB.js?v=20260524h', 'index-CpHhEkhB.js?v=20260524i');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
