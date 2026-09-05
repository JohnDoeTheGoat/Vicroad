const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const navSrc =
  './OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png';

const originalNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"27.4%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"27.4%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"27.4%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"27.4%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"27.4%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip relative z-0 w-full h-auto"}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`))]})})}';

const navStart = s.indexOf('Ee=({active:N})');
const navEnd = s.indexOf(',fe=N=>', navStart);
if (navStart < 0 || navEnd < 0) {
  console.error('MISSING: nav component bounds');
  process.exit(1);
}
s = s.slice(0, navStart) + originalNav + s.slice(navEnd);
console.log('OK: restored original bottom nav');

const oldLicenceHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsx("div",{className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))",transform:"translateY(-10px)"},children:h.jsxs("div",{className:"relative flex items-center min-h-[48px]",children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}Z("licence")},className:"relative z-[80] min-w-[48px] min-h-[48px] flex items-center justify-center -ml-2 touch-manipulation cursor-pointer",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"absolute inset-x-0 text-center text-lg font-semibold text-gray-900 pointer-events-none select-none",children:"View details"})]})}),h.jsx("div",{className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)) - 10px)"}}),h.jsx("div",{className:"px-4 pt-1 pb-2",';

const newLicenceHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsxs("div",{className:"fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}Z("licence")},className:"p-1 -ml-1 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation cursor-pointer relative z-[11]",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7 pointer-events-none",children:"View details"})]}),h.jsx("div",{className:"px-4 pt-1 pb-2 relative z-0",';

if (!s.includes(oldLicenceHeader)) {
  console.error('MISSING: licence header block');
  process.exit(1);
}
s = s.replace(oldLicenceHeader, newLicenceHeader);
console.log('OK: restored original licence header layout');

fs.writeFileSync(bundlePath, s);

const originalNavCss =
  '#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.1);box-shadow:none;transform:translate(-50%,-50%);top:auto;left:auto}#root .vr-nav-strip{-webkit-filter:none!important;filter:none!important}#root .vr-nav-home-v{display:none;position:absolute;left:10.5%;top:36%;width:30px;height:30px;transform:translate(-50%,-50%);z-index:16;pointer-events:none;object-fit:contain}html.vr-nav-home-active #root .vr-nav-home-v{display:block}html.vr-nav-home-active #root .vr-nav-pill{display:none!important}';

const navCssRe =
  /#root \.vr-nav-(?:base|pill|green|home-v)\{[^}]+\}(?:#root \.vr-nav-(?:base|pill|green|home-v|strip)\{[^}]+\})*(?:html\.vr-nav-home-active[^}]+\})*(?:html\.vr-nav-home-active[^}]+\})?/;

if (html.includes('#root .vr-nav-base')) {
  html = html.replace(
    '#root .vr-nav-base{filter:grayscale(1) brightness(0.78) contrast(0.96);-webkit-filter:grayscale(1) brightness(0.78) contrast(0.96)}#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:2;width:50px;height:24px;margin:0;padding:0;border-radius:9999px;background:rgba(0,0,0,0.09);transform:translate(-50%,-50%)}#root .vr-nav-home-v{position:absolute;left:10.6%;top:31%;width:20px;height:20px;transform:translate(-50%,-50%);z-index:25;object-fit:contain;border-radius:5px;pointer-events:none}',
    originalNavCss
  );
  console.log('OK: restored original nav CSS');
} else if (html.includes('#root .vr-nav-pill')) {
  // fallback: replace from pill through home-v block if pattern differs
  const i = html.indexOf('#root .vr-nav-pill');
  const j = html.indexOf('#root .vr-nav-bar-layer');
  if (i >= 0 && j > i) {
    html = html.slice(0, i) + originalNavCss + html.slice(j);
    console.log('OK: restored original nav CSS (fallback)');
  }
} else {
  console.error('MISSING: nav css anchor');
  process.exit(1);
}

const oldLicenceCss =
  'body.vr-licence-view-active #root .vr-licence-header{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:60!important;width:100%!important;border:none!important;box-shadow:none!important}body.vr-licence-view-active #root .vr-licence-header-spacer{display:block!important;width:100%}body.vr-licence-view-active #root .vr-licence-header button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;pointer-events:auto!important;position:relative;z-index:80}';

const newLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50{position:relative!important;top:auto!important;inset:auto!important;width:100%;padding-top:max(.75rem,env(safe-area-inset-top));padding-bottom:.25rem;z-index:10!important;box-shadow:none;border-bottom:none!important}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50 button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;position:relative;z-index:11}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence css block');
  process.exit(1);
}
html = html.replace(oldLicenceCss, newLicenceCss);
console.log('OK: restored original licence view CSS');

const navScript =
  '<script>!function(){function a(){var t=document.querySelectorAll("#root button.vr-nav-tab"),e=t&&t[0]&&t[0].getAttribute("aria-pressed")==="true";document.documentElement.classList.toggle("vr-nav-home-active",!!e)}function n(){var e=document.querySelector("#root .fixed.bottom-0 .relative.pt-3");if(e&&!e.querySelector(".vr-nav-home-v")){var t=document.createElement("img");t.className="vr-nav-home-v",t.src="./icon-192-v2.png",t.alt="",e.appendChild(t)}a()}var o=0;function r(){clearTimeout(o),o=setTimeout(n,60)}n(),new MutationObserver(r).observe(document.getElementById("root")||document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-pressed","class"]})}()</script>';

if (!html.includes('vr-nav-home-active')) {
  html = html.replace('</body>', navScript + '</body>');
  console.log('OK: restored nav home icon script');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260529[a-z]/, 'index-CpHhEkhB.js?v=20260530a');
if (!html.includes('index-CpHhEkhB.js?v=20260530a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260530a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
