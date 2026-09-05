const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// --- 1) Revert bottom nav to original pill (no green overlay duplicate) ---
const badNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",clip:"inset(16% 80% 18% 0%)"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",clip:"inset(16% 60% 18% 20%)"},{name:"Licence",view:"licence",left:"40%",width:"20%",clip:"inset(16% 40% 18% 40%)"},{name:"Payments",view:"payments",left:"60%",width:"20%",clip:"inset(16% 20% 18% 60%)"},{name:"Profile",view:"profile",left:"80%",width:"20%",clip:"inset(16% 0% 18% 80%)"}],act=z.find(G=>G.name===N);return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3 vr-nav-wrap",children:[h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"Navigation",className:"vr-nav-strip vr-nav-strip-gray relative z-0 w-full h-auto"}),act&&h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"",className:"vr-nav-strip vr-nav-strip-green absolute inset-0 z-[1] w-full h-full object-contain object-bottom pointer-events-none","aria-hidden":!0,style:{clipPath:act.clip}}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,"data-vr-nav":G.name,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))})]})})}';

const goodNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"27.4%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"27.4%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"27.4%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"27.4%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"27.4%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"Navigation",className:"vr-nav-strip relative z-0 w-full h-auto"}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`))]})})}';

if (!s.includes(badNav)) {
  console.error('MISSING: bad nav');
  process.exit(1);
}
s = s.replace(badNav, goodNav);
console.log('OK: revert bottom nav');

// --- 2) Licence motion: never prompt on licence page; only listen if already granted ---
const oldMotion =
  'C.useEffect(()=>{if(r!=="licenceDetail"){try{if(localStorage.getItem("vr_hologram_enabled")!=="0")return}catch(_){}S(.5);return}try{if(localStorage.getItem("vr_hologram_enabled")!=="0")S(1)}catch(_){}let z,dead=0,clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),onMotion=G=>{var ye=typeof G.gamma=="number"&&!isNaN(G.gamma)?G.gamma:typeof G.beta=="number"&&!isNaN(G.beta)?G.beta:typeof G.alpha=="number"&&!isNaN(G.alpha)?G.alpha*.35:0,tilt=clamp(Math.abs(ye)/32,0,1),op=.5+.5*tilt;try{if(localStorage.getItem("vr_hologram_enabled")!=="0")S(op)}catch(_){S(op)}try{window.dispatchEvent(new CustomEvent("vr:hologram-tilt",{detail:{tilt:op}}))}catch(_){}},attach=()=>{z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,{passive:!0});try{window.DeviceMotionEvent&&window.addEventListener("devicemotion",function(ev){if(!ev||!ev.rotationRate)return;var rr=ev.rotationRate,g=typeof rr.gamma=="number"?rr.gamma:typeof rr.beta=="number"?rr.beta:0;if(g)onMotion({gamma:g*4,beta:g*4})},{passive:!0})}catch(_){}},wake=()=>{try{if(typeof window.__vrNativeMotionRequest=="function")return window.__vrNativeMotionRequest();if(typeof DeviceOrientationEvent!="undefined"&&typeof DeviceOrientationEvent.requestPermission=="function")return DeviceOrientationEvent.requestPermission()}catch(_){}return Promise.resolve("granted")},boot=async()=>{try{var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}if(mc==="denied")return;if(mc!=="granted"){if(typeof DeviceOrientationEvent.requestPermission!="function"){if(dead)return;attach();return}var pr=await DeviceOrientationEvent.requestPermission();if(pr!=="granted"){console.warn("Motion permission not granted");return}try{localStorage.setItem("vr_motion_permission","granted"),localStorage.setItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="),"granted"),localStorage.setItem("vr_hologram_enabled","1")}catch(_){}}else await wake();if(dead)return;attach();try{localStorage.setItem("vr_hologram_enabled","1")}catch(_){}try{if(localStorage.getItem("vr_hologram_enabled")!=="0")S(1)}catch(_){}try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}catch(G){console.error("Orientation permission error:",G)}},onGranted=()=>{dead||boot()},onShow=()=>{dead||boot()},onTouch=()=>{dead||boot()};boot();window.addEventListener("vr:motion-permission-granted",onGranted);window.addEventListener("pageshow",onShow);document.addEventListener("touchstart",onTouch,{passive:!0});return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted);window.removeEventListener("pageshow",onShow);document.removeEventListener("touchstart",onTouch)}},[r])';

const newMotion =
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0,clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),onMotion=G=>{var ye=typeof G.gamma=="number"&&!isNaN(G.gamma)?G.gamma:typeof G.beta=="number"&&!isNaN(G.beta)?G.beta:typeof G.alpha=="number"&&!isNaN(G.alpha)?G.alpha*.35:0,tilt=clamp(Math.abs(ye)/32,0,1),op=.5+.5*tilt;S(op);try{window.dispatchEvent(new CustomEvent("vr:hologram-tilt",{detail:{tilt:op}}))}catch(_){}},attach=()=>{if(dead)return;z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,{passive:!0});S(1)},onGranted=()=>{if(dead)return;var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}mc==="granted"&&attach()};var mc0=null;try{mc0=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}mc0==="granted"?attach():S(1);window.addEventListener("vr:motion-permission-granted",onGranted);return()=>{dead=1;z&&window.removeEventListener("deviceorientation",z);window.removeEventListener("vr:motion-permission-granted",onGranted)}},[r])';

if (!s.includes(oldMotion)) {
  console.error('MISSING: licence motion effect');
  process.exit(1);
}
s = s.replace(oldMotion, newMotion);
console.log('OK: licence never prompts motion');

// --- 3) Licence header: sticky only, working back button ---
const oldHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden overflow-y-auto",children:[h.jsxs("div",{className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

const newHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"relative z-[70] p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation cursor-pointer",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7 pointer-events-none",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2",';

if (!s.includes(oldHeader)) {
  console.error('MISSING: licence header');
  process.exit(1);
}
s = s.replace(oldHeader, newHeader);
console.log('OK: sticky licence header + back button');

// --- 4) Admin hologram button: robust motion request ---
const oldHoloBtn =
  'onClick:()=>{const run=typeof window.__vrPromptMotionForAdmin=="function"?window.__vrPromptMotionForAdmin:typeof window.__vrNativeMotionRequest=="function"?window.__vrNativeMotionRequest:null;run?run().then(function(x){try{localStorage.setItem("vr_hologram_enabled","1")}catch(_){}try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}).catch(function(){}):alert("Motion not supported on this device")}';

const newHoloBtn =
  'onClick:()=>{const done=function(){try{localStorage.setItem("vr_hologram_enabled","1"),localStorage.setItem("vr_motion_permission","granted"),localStorage.setItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="),"granted")}catch(_){}try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}};const run=window.__vrPromptMotionForAdmin||window.__vrNativeMotionRequest;if(typeof run=="function"){run().then(function(x){x!=="denied"&&done()}).catch(function(){done()});return}if(typeof DeviceOrientationEvent!="undefined"){var req=DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission():Promise.resolve("granted");req.then(function(x){x!=="denied"&&done()}).catch(function(){done()});return}done()}';

if (!s.includes(oldHoloBtn)) {
  console.error('MISSING: holo button');
  process.exit(1);
}
s = s.replace(oldHoloBtn, newHoloBtn);
console.log('OK: admin hologram button');

// --- 5) Remove license photo + signature upload from admin ---
const photoBlock =
  '),h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"photo_url",children:"License Photo"}),h.jsxs("div",{className:"mt-2",children:[A.profile.photo_url&&h.jsx("img",{src:A.profile.photo_url,alt:"License",className:"w-32 h-32 object-cover rounded-lg mb-2"}),h.jsx("input",{type:"file",accept:"image/*",onChange:N=>ue(N,"photo_url"),className:"hidden",id:"photo-upload"}),h.jsx("label",{htmlFor:"photo-upload",children:h.jsx(_a,{type:"button",variant:"outline",className:"cursor-pointer",asChild:!0,children:h.jsxs("span",{children:[h.jsx(ip,{className:"w-4 h-4 mr-2"}),"Upload Photo"]})})})]})]}),h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"signature_url",children:"Signature Image"}),h.jsxs("div",{className:"mt-2",children:[A.profile.signature_url&&h.jsx("img",{src:A.profile.signature_url,alt:"Signature",className:"h-16 mb-2 bg-white border rounded"}),h.jsx("input",{type:"file",accept:"image/*",onChange:N=>ue(N,"signature_url"),className:"hidden",id:"signature-upload"}),h.jsx("label",{htmlFor:"signature-upload",children:h.jsx(_a,{type:"button",variant:"outline",className:"cursor-pointer",asChild:!0,children:h.jsxs("span",{children:[h.jsx(ip,{className:"w-4 h-4 mr-2"}),"Upload Signature"]})})})]})]})]}),h.jsxs("div",{className:"space-y-6 pt-6 border-t",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"License Information"}';

const photoRemoved =
  ')]}),h.jsxs("div",{className:"space-y-6 pt-6 border-t",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"License Information"}';

if (!s.includes(photoBlock)) {
  console.error('MISSING: admin photo block');
  process.exit(1);
}
s = s.replace(photoBlock, photoRemoved);
console.log('OK: removed admin photo/signature uploads');

fs.writeFileSync(bundlePath, s);

// --- index.html: scrollbars, nav CSS, licence CSS, motion always on window, licence observer ---
const oldNavCss =
  '#root .vr-nav-pill{display:none!important}#root .vr-nav-home-v{display:none!important}#root .vr-nav-strip-gray{filter:grayscale(1) brightness(0.72) contrast(0.95);opacity:.92}#root .vr-nav-strip-green{filter:sepia(1) saturate(6) hue-rotate(95deg) brightness(1.05)}#root .vr-nav-wrap{position:relative}';

const newNavCss =
  '#root .vr-nav-home-v{display:none!important}#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.12);transform:translate(-50%,-50%)}#root .vr-nav-strip{filter:none!important;-webkit-filter:none!important}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav css');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);

const oldLicenceCss =
  'body.vr-licence-view-active{-ms-overflow-style:none;scrollbar-width:none}body.vr-licence-view-active::-webkit-scrollbar{width:0;height:0;background:0 0}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch;padding-top:0}body.vr-licence-view-active #root .vr-licence-header{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:60!important;width:100%!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header-spacer{display:block!important;width:100%}body.vr-licence-view-active #root .vr-licence-header button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important}';

const newLicenceCss =
  'html,body{-ms-overflow-style:none;scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar,#root::-webkit-scrollbar{display:none;width:0;height:0}body.vr-licence-view-active #root .vr-licence-header{position:sticky!important;top:0!important;z-index:60!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer;pointer-events:auto!important;position:relative;z-index:70}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.shrink-0.h-14{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence css - try partial');
  if (html.includes('body.vr-licence-view-active #root .vr-licence-header{position:fixed')) {
    html = html.replace(
      /body\.vr-licence-view-active\{[^}]+\}body\.vr-licence-view-active::-webkit-scrollbar\{[^}]+\}/,
      ''
    );
    html = html.replace(
      'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch;padding-top:0}body.vr-licence-view-active #root .vr-licence-header{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:60!important;width:100%!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header-spacer{display:block!important;width:100%}body.vr-licence-view-active #root .vr-licence-header button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer}',
      'html,body{-ms-overflow-style:none;scrollbar-width:none}html::-webkit-scrollbar,body::-webkit-scrollbar,#root::-webkit-scrollbar{display:none;width:0;height:0}body.vr-licence-view-active #root .vr-licence-header{position:sticky!important;top:0!important;z-index:60!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer;pointer-events:auto!important;position:relative;z-index:70}'
    );
    console.log('OK: licence css partial replace');
  } else {
    process.exit(1);
  }
} else {
  html = html.replace(oldLicenceCss, newLicenceCss);
  console.log('OK: global scrollbar hide + licence sticky css');
}

// Licence view observer: do not call motion on enter
const oldLvObs =
  'if(on&&!_vrLvWas){try{var g=localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))||localStorage.getItem("vr_motion_permission");g==="granted"&&(window.__vrNativeMotionRequest?window.__vrNativeMotionRequest().catch(function(){}):window.__vrMotionBroadcast&&window.__vrMotionBroadcast())}catch(e){}}';

const newLvObs = 'if(on&&!_vrLvWas){try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(e){}}';

if (html.includes(oldLvObs)) {
  html = html.replace(oldLvObs, newLvObs);
  console.log('OK: licence observer no motion prompt');
}

// Ensure motion helpers always exist (even when no iOS permission API)
const motionGuard =
  'window.__vrPromptMotionForAdmin=function(){var c=get();if(c==="denied")return Promise.resolve("denied");if(c==="granted")return nativeMotion();return runPrompt()};if(ro||rm){';

const motionGuardNew =
  'window.__vrPromptMotionForAdmin=function(){var c=get();if(c==="denied")return Promise.resolve("denied");if(c==="granted")return nativeMotion();return runPrompt()};window.__vrEnableHologram=window.__vrPromptMotionForAdmin;if(ro||rm){';

if (html.includes(motionGuard) && !html.includes('__vrEnableHologram')) {
  html = html.replace(motionGuard, motionGuardNew);
  console.log('OK: motion alias');
}

// If motion block only closes with }() when ro||rm - ensure __vrNativeMotionRequest is outside - already is

html = html.replace(/index-CpHhEkhB\.js\?v=20260526[a-z]/, 'index-CpHhEkhB.js?v=20260527a');
if (!html.includes('index-CpHhEkhB.js?v=20260527a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260527a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
