const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const navSrc =
  './OZzkXmsjrDRW.co/storage/v1/object/public/base44-prod/public/68f76fb0e5537db2ab995755/29b561457_IMG_6936-removebg-preview1.png';

// --- 1) Bottom nav: revert to single strip + green pill (no clip-path overlay) ---
const oldNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",clip:"inset(12% 80% 18% 0%)"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",clip:"inset(12% 60% 18% 20%)"},{name:"Licence",view:"licence",left:"40%",width:"20%",clip:"inset(12% 40% 18% 40%)"},{name:"Payments",view:"payments",left:"60%",width:"20%",clip:"inset(12% 20% 18% 60%)"},{name:"Profile",view:"profile",left:"80%",width:"20%",clip:"inset(12% 0% 18% 80%)"}],act=z.find(G=>G.name===N);return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsxs("div",{className:"relative w-full leading-[0]",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip vr-nav-base relative z-0 w-full h-auto block"}),act&&h.jsx("img",{src:"' +
  navSrc +
  '",alt:"",className:"vr-nav-strip vr-nav-green absolute top-0 left-0 w-full h-auto block pointer-events-none z-[1]","aria-hidden":!0,style:{clipPath:act.clip}})]}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),N==="Home"&&h.jsx("img",{src:"./icon-192-v2.png",alt:"",className:"vr-nav-home-v pointer-events-none"})]})})}';

const newNav =
  'Ee=({active:N})=>{const z=[{name:"Home",view:"home",left:"0%",width:"20%",pillLeft:"11%",pillTop:"27.4%"},{name:"Vehicles",view:"vehicles",left:"20%",width:"20%",pillLeft:"31%",pillTop:"27.4%"},{name:"Licence",view:"licence",left:"40%",width:"20%",pillLeft:"50%",pillTop:"27.4%"},{name:"Payments",view:"payments",left:"60%",width:"20%",pillLeft:"69%",pillTop:"27.4%"},{name:"Profile",view:"profile",left:"80%",width:"20%",pillLeft:"89%",pillTop:"27.4%"}];return h.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-50 bg-white",children:h.jsxs("div",{className:"relative pt-3",children:[h.jsx("img",{src:"' +
  navSrc +
  '",alt:"Navigation",className:"vr-nav-strip relative z-0 w-full h-auto block"}),h.jsx("div",{className:"vr-nav-bar-layer",children:z.map(G=>h.jsx("button",{type:"button","aria-pressed":G.name===N,onClick:()=>Z(G.view),className:"vr-nav-tab h-full",style:{left:G.left,width:G.width,position:"absolute",top:0,bottom:0},children:h.jsx("div",{className:"w-full h-full"})},G.name))}),z.map(G=>G.name===N&&h.jsx("div",{className:"vr-nav-pill",style:{left:G.pillLeft,top:G.pillTop}},`indicator-${G.name}`)),N==="Home"&&h.jsx("img",{src:"./icon-192-v2.png",alt:"",className:"vr-nav-home-v pointer-events-none"})]})})}';

if (!s.includes(oldNav)) {
  console.error('MISSING: nav component');
  process.exit(1);
}
s = s.replace(oldNav, newNav);
console.log('OK: nav pill + home icon only on Home');

// --- 2) Cache licence photo so permit/identity tab switches stay instant ---
const oldPhotoCheck = '$!=null&&$.photo_url?h.jsxs(h.Fragment,{children:[h.jsx("img",{src:$.photo_url,alt:"License photo"';
const newPhotoCheck =
  '(($!=null&&$.photo_url)||window.__vrCachedPhoto)?h.jsxs(h.Fragment,{children:[h.jsx("img",{src:($==null?void 0:$.photo_url)||window.__vrCachedPhoto,alt:"License photo"';

if (!s.includes(oldPhotoCheck)) {
  console.error('MISSING: photo check');
  process.exit(1);
}
s = s.replace(oldPhotoCheck, newPhotoCheck);

const queryAnchor =
  'cacheTime:600*1e3}),{data:V}=pa({queryKey:["demeritPoints",d],queryFn:async()=>{const N=await yt.entities.DemeritPoints.filter({app_instance_id:d});return N.length===0?await yt.entities.DemeritPoints.create({app_instance_id:d,balance:0,threshold:12}):N[0]},enabled:r!=="pinEntry",staleTime:300*1e3,cacheTime:600*1e3});';

const queryWithPhotoCache =
  'cacheTime:600*1e3}),{data:V}=pa({queryKey:["demeritPoints",d],queryFn:async()=>{const N=await yt.entities.DemeritPoints.filter({app_instance_id:d});return N.length===0?await yt.entities.DemeritPoints.create({app_instance_id:d,balance:0,threshold:12}):N[0]},enabled:r!=="pinEntry",staleTime:300*1e3,cacheTime:600*1e3});C.useEffect(()=>{var u=$==null?void 0:$.photo_url;if(u){window.__vrCachedPhoto=u;try{var im=new Image;im.src=u}catch(_){}}},[$==null?void 0:$.photo_url]);';

if (!s.includes(queryAnchor)) {
  console.error('MISSING: query anchor for photo cache');
  process.exit(1);
}
s = s.replace(queryAnchor, queryWithPhotoCache);
console.log('OK: cached licence photo');

// --- 3) Licence header: nudge up ~4px so Last refreshed is visible ---
const oldHeaderStyle =
  'className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"}';
const newHeaderStyle =
  'className:"vr-licence-header fixed top-0 left-0 right-0 z-[60] bg-white px-4 py-3",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))",transform:"translateY(-4px)"}';

if (!s.includes(oldHeaderStyle)) {
  console.error('MISSING: licence header style');
  process.exit(1);
}
s = s.replace(oldHeaderStyle, newHeaderStyle);

const oldSpacer =
  'className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)))"}}';
const newSpacer =
  'className:"vr-licence-header-spacer","aria-hidden":!0,style:{height:"calc(3.25rem + max(0.75rem, env(safe-area-inset-top)) - 4px)"}}';

if (!s.includes(oldSpacer)) {
  console.error('MISSING: licence header spacer');
  process.exit(1);
}
s = s.replace(oldSpacer, newSpacer);
console.log('OK: licence header nudged up');

// --- 4) Admin back button: larger tap target + absolute title ---
const oldAdminHeader =
  'adminPanel"?h.jsxs("div",{className:"min-h-screen bg-white",children:[h.jsxs("div",{className:"sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center z-10",children:[h.jsx("button",{onClick:()=>Z("home"),className:"p-1 -ml-1",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900"})}),h.jsx("h1",{className:"flex-1 text-center text-lg font-semibold text-gray-900 pr-7",children:"Admin Panel"})]}),';

const newAdminHeader =
  'adminPanel"?h.jsxs("div",{className:"min-h-screen bg-white",children:[h.jsx("div",{className:"sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10",children:h.jsxs("div",{className:"relative flex items-center min-h-[48px]",children:[h.jsx("button",{type:"button",onClick:N=>{N.preventDefault(),N.stopPropagation(),window.__vrHiTap=0;try{clearTimeout(window.__vrHiTapT)}catch(_){}Z("home")},className:"relative z-[80] min-w-[48px] min-h-[48px] flex items-center justify-center -ml-2 touch-manipulation cursor-pointer",children:h.jsx(sa,{className:"w-6 h-6 text-gray-900 pointer-events-none"})}),h.jsx("h1",{className:"absolute inset-x-0 text-center text-lg font-semibold text-gray-900 pointer-events-none select-none",children:"Admin Panel"})]})}),';

if (!s.includes(oldAdminHeader)) {
  console.error('MISSING: admin header');
  process.exit(1);
}
s = s.replace(oldAdminHeader, newAdminHeader);
console.log('OK: admin back button');

fs.writeFileSync(bundlePath, s);

// --- index.html: restore pill CSS, remove duplicate nav icon script ---
const oldNavCss =
  '#root .vr-nav-pill{display:none!important}#root .vr-nav-base{filter:grayscale(1) brightness(0.78) contrast(0.96)}#root .vr-nav-green{filter:none;-webkit-filter:none}#root .vr-nav-home-v{position:absolute;left:11%;top:27.4%;width:22px;height:22px;transform:translate(-50%,-50%);z-index:25;object-fit:contain;border-radius:5px;pointer-events:none}';

const newNavCss =
  '#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.12);transform:translate(-50%,-50%)}#root .vr-nav-strip{filter:none!important;-webkit-filter:none!important}#root .vr-nav-home-v{position:absolute;left:11%;top:27.4%;width:22px;height:22px;transform:translate(-50%,-50%);z-index:25;object-fit:contain;border-radius:5px;pointer-events:none}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav css');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);

// Remove nav observer that re-injects home icon when React removes it
const navScriptRe =
  /<script>!function\(\)\{var t=document\.querySelectorAll\("#root button\.vr-nav-tab"\)[\s\S]*?new MutationObserver\(r\)\.observe\(document\.getElementById\("root"\)[\s\S]*?\}\(\)<\/script>/;
if (navScriptRe.test(html)) {
  html = html.replace(navScriptRe, '');
  console.log('OK: removed duplicate nav icon script');
} else {
  console.warn('WARN: nav observer script not found (may already be removed)');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260528[a-z]/, 'index-CpHhEkhB.js?v=20260529a');
if (!html.includes('index-CpHhEkhB.js?v=20260529a')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260529a');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
