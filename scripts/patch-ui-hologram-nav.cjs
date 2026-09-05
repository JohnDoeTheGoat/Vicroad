const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// --- 1) Bottom nav: per-tab green clip overlay, no oversized home icon ---
const oldNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"27.4%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"27.4%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"27.4%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"27.4%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"27.4%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"Navigation",className:"vr-nav-strip relative z-0 w-full h-auto"}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`))]})})}';

const newNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",clip:"inset(16% 80% 18% 0%)"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",clip:"inset(16% 60% 18% 20%)"},{name:"Licence",view:"licence",left:"40%",width:"20%",clip:"inset(16% 40% 18% 40%)"},{name:"Payments",view:"payments",left:"60%",width:"20%",clip:"inset(16% 20% 18% 60%)"},{name:"Profile",view:"profile",left:"80%",width:"20%",clip:"inset(16% 0% 18% 80%)"}],act=z.find(G=>G.name===N);return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3 vr-nav-wrap",children:[h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"Navigation",className:"vr-nav-strip vr-nav-strip-gray relative z-0 w-full h-auto"}),act&&h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"",className:"vr-nav-strip vr-nav-strip-green absolute inset-0 z-[1] w-full h-full object-contain object-bottom pointer-events-none","aria-hidden":!0,style:{clipPath:act.clip}}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,"data-vr-nav":G.name,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))})]})})}';

if (!s.includes(oldNav)) {
  console.error('MISSING: nav Ee component');
  process.exit(1);
}
s = s.replace(oldNav, newNav);
console.log('OK: bottom nav green active icons');

// --- 2) Hi user: open admin only (no motion prompt on tap) ---
const oldJ =
  'j=()=>{var N=(window.__vrHiTap=(window.__vrHiTap||0)+1);clearTimeout(window.__vrHiTapT);if(N>=4){window.__vrHiTap=0;var go=()=>Z("adminPanel");if(typeof window.__vrPromptMotionForAdmin=="function"){window.__vrPromptMotionForAdmin().then(go).catch(go)}else if(typeof window.__vrNativeMotionRequest=="function"){window.__vrNativeMotionRequest().then(go).catch(go)}else go();return}window.__vrHiTapT=setTimeout(function(){window.__vrHiTap=0},2e3)}';

const newJ =
  'j=()=>{var N=(window.__vrHiTap=(window.__vrHiTap||0)+1);clearTimeout(window.__vrHiTapT);if(N>=4){window.__vrHiTap=0;Z("adminPanel");return}window.__vrHiTapT=setTimeout(function(){window.__vrHiTap=0},2e3)}';

if (!s.includes(oldJ)) {
  console.error('MISSING: Hi user handler');
  process.exit(1);
}
s = s.replace(oldJ, newJ);
console.log('OK: admin entry without motion prompt');

// --- 3) Remove auto motion on admin mount ---
const adminAuto =
  'C.useEffect(()=>{if(r!=="adminPanel")return;var ran=0,run=()=>{if(ran)return;ran=1;if(typeof window.__vrPromptMotionForAdmin=="function")window.__vrPromptMotionForAdmin().catch(function(){});else if(typeof window.__vrNativeMotionRequest=="function")window.__vrNativeMotionRequest().catch(function(){})};run();return()=>{ran=0}},[r]),';

if (s.includes(adminAuto)) {
  s = s.replace(adminAuto, '');
  console.log('OK: removed auto admin motion prompt');
} else {
  console.log('SKIP: admin auto motion already removed');
}

// --- 4) Admin panel: Enable hologram button ---
const oldAdminBanner =
  'children:"Put in your preferences for your infomation"})]}),h.jsxs("div",{className:"space-y-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Personal Information"}';

const newAdminBanner =
  'children:"Put in your preferences for your infomation"})]}),h.jsx(_a,{type:"button",className:"w-full bg-white text-[#2d8a26] border-2 border-white/80 font-semibold py-3 rounded-xl shadow-sm touch-manipulation",onClick:()=>{const run=typeof window.__vrPromptMotionForAdmin=="function"?window.__vrPromptMotionForAdmin:typeof window.__vrNativeMotionRequest=="function"?window.__vrNativeMotionRequest:null;run?run().then(function(x){try{localStorage.setItem("vr_hologram_enabled","1")}catch(_){}try{window.dispatchEvent(new CustomEvent("vr:motion-permission-granted"))}catch(_){}}).catch(function(){}):alert("Motion not supported on this device")},children:"Enable licence hologram (tilt phone)"}),h.jsxs("div",{className:"space-y-6",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Personal Information"}';

if (!s.includes(oldAdminBanner)) {
  console.error('MISSING: admin banner anchor');
  process.exit(1);
}
s = s.replace(oldAdminBanner, newAdminBanner);
console.log('OK: admin hologram enable button');

// --- 5) Licence header: fixed top, no border line, spacer ---
const oldLicenceHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden overflow-y-auto",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

const newLicenceHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden",children:[h.jsxs("div",{className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3 flex items-center border-0 shadow-none",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"vr-licence-header-spacer shrink-0","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsx("div",{className:"overflow-y-auto overflow-x-hidden",style:{maxHeight:"calc(100dvh - 3.25rem - max(0.75rem, env(safe-area-inset-top)))"},children:[h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

// Close the extra scroll wrapper before end of licenceDetail - find licenceDetail end is hard. We added opening `[h.jsx("div",{className:"overflow-y-auto` - need to close with `]})` before Ee or closing of licence view.

// Actually simpler: use fixed header + spacer only, let whole page scroll (body scroll)
const newLicenceHeaderSimple =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden overflow-y-auto",children:[h.jsxs("div",{className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"View details"})]}),h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

if (!s.includes(oldLicenceHeader)) {
  console.error('MISSING: licence header');
  process.exit(1);
}
s = s.replace(oldLicenceHeader, newLicenceHeaderSimple);
console.log('OK: fixed licence header, no border');

// --- 6) Stronger motion on licence + devicemotion fallback ---
const oldOnMotion =
  'onMotion=G=>{var ye=typeof G.gamma=="number"&&!isNaN(G.gamma)?G.gamma:typeof G.beta=="number"&&!isNaN(G.beta)?G.beta:typeof G.alpha=="number"&&!isNaN(G.alpha)?G.alpha*.35:0,tilt=clamp(Math.abs(ye)/38,0,1);try{if(localStorage.getItem("vr_hologram_enabled")!=="0")S(.52+.48*tilt)}catch(_){S(.52+.48*tilt)}},attach=()=>{z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,{passive:!0})}';

const newOnMotion =
  'onMotion=G=>{var ye=typeof G.gamma=="number"&&!isNaN(G.gamma)?G.gamma:typeof G.beta=="number"&&!isNaN(G.beta)?G.beta:typeof G.alpha=="number"&&!isNaN(G.alpha)?G.alpha*.35:0,tilt=clamp(Math.abs(ye)/32,0,1),op=.5+.5*tilt;try{if(localStorage.getItem("vr_hologram_enabled")!=="0")S(op)}catch(_){S(op)}try{window.dispatchEvent(new CustomEvent("vr:hologram-tilt",{detail:{tilt:op}}))}catch(_){}},attach=()=>{z&&window.removeEventListener("deviceorientation",z);z=onMotion;window.addEventListener("deviceorientation",z,{passive:!0});try{window.DeviceMotionEvent&&window.addEventListener("devicemotion",function(ev){if(!ev||!ev.rotationRate)return;var rr=ev.rotationRate,g=typeof rr.gamma=="number"?rr.gamma:typeof rr.beta=="number"?rr.beta:0;if(g)onMotion({gamma:g*4,beta:g*4})},{passive:!0})}catch(_){}}';

if (!s.includes(oldOnMotion)) {
  console.error('MISSING: onMotion handler');
  process.exit(1);
}
s = s.replace(oldOnMotion, newOnMotion);
console.log('OK: improved motion handler');

fs.writeFileSync(bundlePath, s);

// --- index.html: nav CSS + licence fixed header CSS ---
const oldNavCss =
  '#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.1);box-shadow:none;transform:translate(-50%,-50%);top:auto;left:auto}#root .vr-nav-strip{-webkit-filter:none!important;filter:none!important}#root .vr-nav-home-v{display:none;position:absolute;left:10.5%;top:36%;width:30px;height:30px;transform:translate(-50%,-50%);z-index:16;pointer-events:none;object-fit:contain}html.vr-nav-home-active #root .vr-nav-home-v{display:block}html.vr-nav-home-active #root .vr-nav-pill{display:none!important}';

const newNavCss =
  '#root .vr-nav-pill{display:none!important}#root .vr-nav-home-v{display:none!important}#root .vr-nav-strip-gray{filter:grayscale(1) brightness(0.72) contrast(0.95);opacity:.92}#root .vr-nav-strip-green{filter:sepia(1) saturate(6) hue-rotate(95deg) brightness(1.05)}#root .vr-nav-wrap{position:relative}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav CSS block');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);

const oldLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch}body.vr-licence-view-active #root .vr-licence-header,body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.sticky.top-0{position:sticky!important;top:0!important;z-index:60!important;width:100%;box-shadow:0 1px 0 rgba(0,0,0,.06)}body.vr-licence-view-active #root .vr-licence-header button,body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.sticky.top-0 button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer}';

const newLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch;padding-top:0}body.vr-licence-view-active #root .vr-licence-header{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:60!important;width:100%!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header-spacer{display:block!important;width:100%}body.vr-licence-view-active #root .vr-licence-header button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence CSS block');
  process.exit(1);
}
html = html.replace(oldLicenceCss, newLicenceCss);

// Sync index.html holo to React tilt event
const holoListen =
  'window.addEventListener("pageshow",function(){try{var g=localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))||localStorage.getItem("vr_motion_permission");g==="granted"&&window.__vrNativeMotionRequest&&window.__vrNativeMotionRequest().catch(function(){})}catch(e){}}));';

const holoListenNew =
  'window.addEventListener("pageshow",function(){try{var g=localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))||localStorage.getItem("vr_motion_permission");g==="granted"&&window.__vrNativeMotionRequest&&window.__vrNativeMotionRequest().catch(function(){})}catch(e){}}),window.addEventListener("vr:hologram-tilt",function(ev){var t=ev&&ev.detail&&ev.detail.tilt;if(typeof t!=="number")return;(e=e.filter(function(x){return x&&x.container&&x.container.isConnected})).forEach(function(x){x.holoImg&&(x.holoImg.style.opacity=Math.max(.55,Math.min(1,t)).toFixed(3))})}));';

if (html.includes(holoListen) && !html.includes('vr:hologram-tilt')) {
  html = html.replace(holoListen, holoListenNew);
  console.log('OK: holo listens to tilt event');
}

// Remove nav home icon injector script effect - optional, script adds vr-nav-home-v - hide via CSS already

html = html.replace(/index-CpHhEkhB\.js\?v=20260525[a-z]/, 'index-CpHhEkhB.js?v=20260526a');
if (!html.includes('index-CpHhEkhB.js?v=20260526a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260526a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
