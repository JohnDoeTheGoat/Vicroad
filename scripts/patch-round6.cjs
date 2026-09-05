const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const navSrc =
  './OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png';

// --- 1) Bottom nav: gray tight pill behind active icon (no green clip) ---
const oldNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",clip:"inset(12% 80% 18% 0%)"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",clip:"inset(12% 60% 18% 20%)"},{name:"Licence",view:"licence",left:"40%",width:"20%",clip:"inset(12% 40% 18% 40%)"},{name:"Payments",view:"payments",left:"60%",width:"20%",clip:"inset(12% 20% 18% 60%)"},{name:"Profile",view:"profile",left:"80%",width:"20%",clip:"inset(12% 0% 18% 80%)"}],act=z.find(G=>G.name===N);return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsxs("div",{className:"relative w-full leading-[0]",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip vr-nav-base relative z-0 w-full h-auto block"}),act&&h.jsx("img",{src:"' +
  navSrc +
  '",alt:"",className:"vr-nav-strip vr-nav-green absolute top-0 left-0 w-full h-auto block pointer-events-none z-[1]","aria-hidden":!0,style:{clipPath:act.clip,WebkitClipPath:act.clip}}),N==="Home"&&h.jsx("img",{src:"./icon-192-v2.png",alt:"",className:"vr-nav-home-v pointer-events-none"})]}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))})]})})}';

const newNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"10.6%",pillTop:"31%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"30%",pillTop:"31%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"31%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"70%",pillTop:"31%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89.5%",pillTop:"31%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsxs("div",{className:"relative w-full leading-[0]",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip vr-nav-base relative z-0 w-full h-auto block"}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`)),N==="Home"&&h.jsx("img",{src:"./icon-192-v2.png",alt:"",className:"vr-nav-home-v pointer-events-none"})]}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))})]})})}';

if (!s.includes(oldNav)) {
  console.error('MISSING: nav component');
  process.exit(1);
}
s = s.replace(oldNav, newNav);
console.log('OK: gray tight nav pill');

// --- 2) Licence header: raise View details further ---
const oldHeaderStyle =
  'style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))",transform:"translateY(-4px)"}';
const newHeaderStyle =
  'style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))",transform:"translateY(-10px)"}';

if (!s.includes(oldHeaderStyle)) {
  console.error('MISSING: licence header transform');
  process.exit(1);
}
s = s.replace(oldHeaderStyle, newHeaderStyle);

const oldSpacer =
  'style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)) - 4px)"}}';
const newSpacer =
  'style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)) - 10px)"}}';

if (!s.includes(oldSpacer)) {
  console.error('MISSING: licence header spacer');
  process.exit(1);
}
s = s.replace(oldSpacer, newSpacer);
console.log('OK: licence header raised');

fs.writeFileSync(bundlePath, s);

const oldNavCss =
  '#root .vr-nav-base{filter:grayscale(1) brightness(0.78) contrast(0.96);-webkit-filter:grayscale(1) brightness(0.78) contrast(0.96)}#root .vr-nav-green{filter:none!important;-webkit-filter:none!important}#root .vr-nav-home-v{position:absolute;left:10.6%;top:31%;width:20px;height:20px;transform:translate(-50%,-50%);z-index:25;object-fit:contain;border-radius:5px;pointer-events:none}';

const newNavCss =
  '#root .vr-nav-base{filter:grayscale(1) brightness(0.78) contrast(0.96);-webkit-filter:grayscale(1) brightness(0.78) contrast(0.96)}#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:2;width:50px;height:24px;margin:0;padding:0;border-radius:9999px;background:rgba(0,0,0,0.09);transform:translate(-50%,-50%)}#root .vr-nav-home-v{position:absolute;left:10.6%;top:31%;width:20px;height:20px;transform:translate(-50%,-50%);z-index:25;object-fit:contain;border-radius:5px;pointer-events:none}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav css');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);

html = html.replace(/index-CpHhEkhB\.js\?v=20260529[a-z]/, 'index-CpHhEkhB.js?v=20260529c');
if (!html.includes('index-CpHhEkhB.js?v=20260529c')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260529c');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
