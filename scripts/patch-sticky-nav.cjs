const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

// --- 1) Sticky View details header ---
const oldLicenceHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden pb-8",children:[h.jsxs("div",{className:"fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:';

const newLicenceHeader =
  'licenceDetail")return h.jsxs("div",{className:"min-h-screen bg-white overflow-x-hidden overflow-y-auto pb-8",children:[h.jsxs("div",{className:"vr-licence-header sticky top-0 z-[60] bg-white border-b border-gray-100 px-4 py-3 flex items-center",style:{paddingTop:"max(0.75rem, env(safe-area-inset-top))"},children:';

if (!s.includes(oldLicenceHeader)) {
  console.error('MISSING: licence header');
  process.exit(1);
}
s = s.replace(oldLicenceHeader, newLicenceHeader);
console.log('OK: sticky View details header');

fs.writeFileSync(bundlePath, s);

// --- 2) Licence CSS: sticky header, scrollable page ---
const oldLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50{position:relative!important;top:auto!important;inset:auto!important;width:100%;padding-top:max(.75rem,env(safe-area-inset-top));padding-bottom:.25rem;z-index:10!important;box-shadow:none;border-bottom:none!important}body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden>div.fixed.inset-x-0.top-0.z-50 button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;position:relative;z-index:11}';

const newLicenceCss =
  'body.vr-licence-view-active #root .min-h-screen.bg-white.overflow-x-hidden{overflow-y:auto;-webkit-overflow-scrolling:touch}body.vr-licence-view-active #root .vr-licence-header{position:sticky!important;top:0!important;z-index:60!important;width:100%;background:#fff!important}body.vr-licence-view-active #root .vr-licence-header button{min-width:48px;min-height:48px;touch-action:manipulation;cursor:pointer;position:relative;z-index:61}';

if (!html.includes(oldLicenceCss)) {
  console.error('MISSING: licence css');
  process.exit(1);
}
html = html.replace(oldLicenceCss, newLicenceCss);
console.log('OK: licence sticky CSS');

// --- 3) Nav: remove V logo overlay, keep pill on all tabs including Home ---
const oldNavCss =
  '#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.1);box-shadow:none;transform:translate(-50%,-50%);top:auto;left:auto}#root .vr-nav-strip{-webkit-filter:none!important;filter:none!important}#root .vr-nav-home-v{display:none;position:absolute;left:10.5%;top:36%;width:30px;height:30px;transform:translate(-50%,-50%);z-index:16;pointer-events:none;object-fit:contain}html.vr-nav-home-active #root .vr-nav-home-v{display:block}html.vr-nav-home-active #root .vr-nav-pill{display:none!important}';

const newNavCss =
  '#root .vr-nav-pill{position:absolute;pointer-events:none;z-index:30;width:72px;height:32px;margin:0;padding:0;border-radius:9999px;background:rgba(82,184,72,.1);box-shadow:none;transform:translate(-50%,-50%);top:auto;left:auto}#root .vr-nav-strip{-webkit-filter:none!important;filter:none!important}#root .vr-nav-home-v{display:none!important}';

if (!html.includes(oldNavCss)) {
  console.error('MISSING: nav css');
  process.exit(1);
}
html = html.replace(oldNavCss, newNavCss);
console.log('OK: removed V logo from nav');

// Remove nav home-icon injection script
const navScriptRe =
  /<script>!function\(\)\{function a\(\)\{var t=document\.querySelectorAll\("#root button\.vr-nav-tab"\)[\s\S]*?attributeFilter:\["aria-pressed","class"\]\)\}\(\)<\/script>\s*/;
if (navScriptRe.test(html)) {
  html = html.replace(navScriptRe, '');
  console.log('OK: removed nav home icon script');
}

html = html.replace(/index-CpHhEkhB\.js\?v=20260530[a-z]/, 'index-CpHhEkhB.js?v=20260530c');
if (!html.includes('index-CpHhEkhB.js?v=20260530c')) {
  html = html.replace(/index-CpHhEkhB\.js\?v=[^"']+/, 'index-CpHhEkhB.js?v=20260530c');
}

fs.writeFileSync(indexPath, html);
console.log('Done.');
