const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const navSrc =
  './OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png';

// --- 1) Bottom nav: gray bar + green active tab + mini home logo ---
const oldNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"27.4%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"27.4%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"27.4%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"27.4%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"27.4%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsx("img",{src:"./OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png",alt:"Navigation",className:"vr-nav-strip relative z-0 w-full h-auto"}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`))]})})}';

const newNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",clip:"inset(12% 80% 18% 0%)"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",clip:"inset(12% 60% 18% 20%)"},{name:"Licence",view:"licence",left:"40%",width:"20%",clip:"inset(12% 40% 18% 40%)"},{name:"Payments",view:"payments",left:"60%",width:"20%",clip:"inset(12% 20% 18% 60%)"},{name:"Profile",view:"profile",left:"80%",width:"20%",clip:"inset(12% 0% 18% 80%)"}],act=z.find(G=>G.name===N);return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsxs("div",{className:"relative w-full leading-[0]",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip vr-nav-base relative z-0 w-full h-auto block"}),act&&h.jsx("img",{src:"' +
  navSrc +
  '",alt:"",className:"vr-nav-strip vr-nav-green absolute top-0 left-0 w-full h-auto block pointer-events-none z-[1]","aria-hidden":!0,style:{clipPath:act.clip}})]}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),N==="Home"&&h.jsx("img",{src:"./icon-192-v2.png",alt:"",className:"vr-nav-home-v pointer-events-none"})]})})}';

if (!s.includes(oldNav)) {
  console.error('MISSING: nav component');
  process.exit(1);
}
s = s.replace(oldNav, newNav);
console.log('OK: nav green tabs + mini home logo');

// --- 2) Licence header: fixed top + reliable back button ---
const oldHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:()=>Z("licence"),className:"relative z-[70] p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation cursor-pointer",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7 pointer-events-none",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2",';

const newHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsx("div",{className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:h.jsxs("div",{className:"relative flex items-center min-h-[48px]",children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}Z("licence")},className:"relative z-[80] min-w-[48px] min-h-[48px] flex items-center justify-center -ml-2 touch-manipulation cursor-pointer",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"absolute inset-x-0 text-center text-lg font-semibold text-gray-900 pointer-events-none select-none",children:"View details"})]})}),h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)))"}}),h.jsx("div",{className:"px-4 pt-1 pb-2",';

if (!s.includes(oldHeader)) {
  console.error('MISSING: licence header');
  process.exit(1);
}
s = s.replace(oldHeader, newHeader);
console.log('OK: fixed licence header + back button');

// --- 3) Reset hi-user tap counter when opening licence detail ---
const motionAnchor =
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0';

const motionWithReset =
  'C.useEffect(()=>{if(r==="licenceDetail"){window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}}},[r]),C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0';

if (!s.includes(motionWithReset)) {
  if (!s.includes(motionAnchor)) {
    console.error('MISSING: motion anchor');
    process.exit(1);
  }
  s = s.replace(motionAnchor, motionWithReset);
  console.log('OK: reset hi tap on licence detail');
}

fs.writeFileSync(bundlePath, s);

// --- index.html CSS ---
const oldNavCss =
  '#root .vr-nav-home-v{display:none!important}#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.12);transform:translate(-50%,-50%)}#root .vr-nav-strip{filter:none!important;-webkit-filter:none!important}';

const newNavCss =
  '#root .vr-nav-pill{display:none!important}#root .vr-nav-base{filter:grayscale(1) brightness(0.78) contrast(0.96)}#root .vr-nav-green{filter:none;-webkit-filter:none}#root .vr-nav-home-v{position:absolute;left:11%;top:27.4%;width:22px;height:22px;transform:translate(-50%,-50%);z-index:25;object-fit:contain;border-radius:5px;pointer-events:none}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav css');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);

const oldLicenceCss =
  'body.vr-licence-view-active #root .vr-licence-header{position:sticky!important;top:0!important;z-index:60!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header button{min-width:44px;min-height:44px;touch-action:manipulation;cursor:pointer;pointer-events:auto!important;position:relative;z-index:70}';

const newLicenceCss =
  'body.vr-licence-view-active #root .vr-licence-header{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:60!important;width:100%!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header-spacer{display:block!important;width:100%}body.vr-licence-view-active #root .vr-licence-header button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;pointer-events:auto!important;position:relative;z-index:80}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence css');
  process.exit(1);
}
html = html.replace(oldLicenceCss, newLicenceCss);

// Nav observer script: keep home class in sync (optional, icon now in React)
html = html.replace(
  't.className="vr-nav-home-v",t.src="./icon-192-v2.png"',
  't.className="vr-nav-home-v",t.src="./icon-192-v2.png",t.style.width="22px",t.style.height="22px"'
);

html = html.replace(/index-CpHhEkhB\.js\?v=20260527[a-z]/, 'index-CpHhEkhB.js?v=20260528a');
if (!html.includes('index-CpHhEkhB.js?v=20260528a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260528a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
