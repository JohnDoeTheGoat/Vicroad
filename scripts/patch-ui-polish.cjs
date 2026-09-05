const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const navSrc =
  './OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png';

// --- 1) Hi User: bigger and bolder ---
const oldHi =
  'className:"text-gray-900 text-2xl sm:text-3xl font-semibold leading-tight cursor-pointer select-none",children:["Hi ",($==null?void 0:$.first_name)||"User"]';
const newHi =
  'className:"text-gray-900 text-[1.85rem] sm:text-4xl font-bold leading-tight cursor-pointer select-none",children:["Hi ",($==null?void 0:$.first_name)||"User"]';

if (!s.includes(oldHi)) {
  console.error('MISSING: Hi User styles');
  process.exit(1);
}
s = s.replace(oldHi, newHi);
console.log('OK: Hi User bigger/bolder');

// --- 2) Bottom nav: gray pill + green active icon/label via clip ---
const oldNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"27.4%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"27.4%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"27.4%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"27.4%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"27.4%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip relative z-0 w-full h-auto"}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`))]})})},fe=N=>';

const newNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"24%",clip:"inset(4% 80% 0% 0%)"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"24%",clip:"inset(4% 60% 0% 20%)"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"24%",clip:"inset(4% 40% 0% 40%)"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"24%",clip:"inset(4% 20% 0% 60%)"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"24%",clip:"inset(4% 0% 0% 80%)"}],act=z.find(G=>G.name===N);return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsxs("div",{className:"relative w-full leading-[0]",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip vr-nav-base relative z-0 w-full h-auto block"}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`pill-${G.name}`)),act&&h.jsx("img",{src:"' +
  navSrc +
  '",alt:"",className:"vr-nav-strip vr-nav-green absolute top-0 left-0 w-full h-auto block pointer-events-none z-[2]","aria-hidden":!0,style:{clipPath:act.clip,WebkitClipPath:act.clip}})]}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))})]})})},fe=N=>';

if (!s.includes(oldNav)) {
  console.error('MISSING: nav component');
  process.exit(1);
}
s = s.replace(oldNav, newNav);
console.log('OK: nav gray pill + green active tabs');

fs.writeFileSync(bundlePath, s);

// --- 3) Nav CSS ---
const oldNavCss =
  '#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.1);box-shadow:none;transform:translate(-50%,-50%);top:auto;left:auto}#root .vr-nav-strip{-webkit-filter:none!important;filter:none!important}#root .vr-nav-home-v{display:none!important}';

const newNavCss =
  '#root .vr-nav-base{filter:grayscale(1) saturate(0) brightness(0.92) contrast(0.98);-webkit-filter:grayscale(1) saturate(0) brightness(0.92) contrast(0.98)}#root .vr-nav-green{filter:none!important;-webkit-filter:none!important}#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:1;width:78px;height:36px;margin:0;padding:0;border-radius:9999px;background:rgba(142,142,147,0.16);box-shadow:none;transform:translate(-50%,-50%)}#root .vr-nav-strip{pointer-events:none}#root .vr-nav-home-v{display:none!important}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav css');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);
console.log('OK: nav CSS');

// --- 4) iOS status bar: match page background ---
if (!html.includes('apple-mobile-web-app-status-bar-style')) {
  html = html.replace(
    '<meta name="theme-color" content="#E8EDF1">',
    '<meta name="theme-color" content="#E8EDF1" id="vr-theme-color"> <meta name="apple-mobile-web-app-status-bar-style" content="default">'
  );
} else if (!html.includes('id="vr-theme-color"')) {
  html = html.replace(
    '<meta name="theme-color" content="#E8EDF1">',
    '<meta name="theme-color" content="#E8EDF1" id="vr-theme-color">'
  );
}

const statusBarScript =
  '<script>!function(){var m=document.getElementById("vr-theme-color")||document.querySelector(\'meta[name=theme-color]\');function c(x){if(m)m.setAttribute("content",x);document.documentElement.style.backgroundColor=x;document.body.style.backgroundColor=x}function p(){var r=document.getElementById("root");if(!r)return c("#E8EDF1");var e=r.querySelector(".min-h-screen");if(!e)return c("#E8EDF1");var s=e.className||"";if(s.indexOf("bg-[#E8EDF1]")>=0)c("#E8EDF1");else if(s.indexOf("bg-[#F2F2F7]")>=0)c("#F2F2F7");else c("#FFFFFF")}var t=0;function d(){clearTimeout(t);t=setTimeout(p,50)}p();new MutationObserver(d).observe(document.getElementById("root")||document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}()</script>';

if (!html.includes('vr-theme-color') || !html.includes('function p(){var r=document.getElementById("root")')) {
  html = html.replace('</body>', statusBarScript + '</body>');
  console.log('OK: status bar sync script');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260530[a-z]/, 'index-CpHhEkhB.js?v=20260531a');
if (!html.includes('index-CpHhEkhB.js?v=20260531a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260531a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
