const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

function rep(label, from, to) {
  if (!s.includes(from)) {
    console.error('MISSING:', label);
    process.exit(1);
  }
  s = s.replace(from, to);
  console.log('OK:', label);
}

rep(
  'states',
  '[r,n]=C.useState("splash"),[s,o]=C.useState(0)',
  '[r,n]=C.useState("splash"),[vrFaceUi,setVrFaceUi]=C.useState(!1),[adminPin,setAdminPin]=C.useState(""),[adminPin2,setAdminPin2]=C.useState(""),[s,o]=C.useState(0)'
);

rep(
  'splash-flow',
  'C.useEffect(()=>{if(r!=="splash")return;let x=0;const t=async()=>{await new Promise(e=>setTimeout(e,900));if(x)return;n("loadingSplash");await new Promise(e=>setTimeout(e,400));if(x)return;await vrFaceUnlock();if(x)return;n("pinEntry")};t();return()=>{x=1}},[r])',
  'C.useEffect(()=>{if(r!=="splash")return;let x=0;const t=async()=>{await new Promise(e=>setTimeout(e,350));if(x)return;n("loadingSplash");await new Promise(e=>setTimeout(e,30));if(x)return;const ok=await vrFaceUnlock();if(x)return;if(!ok)n("pinEntry")};t();return()=>{x=1}},[r])'
);

rep(
  'pin-motion-prompt',
  'typeof DeviceOrientationEvent.requestPermission=="function"&&DeviceOrientationEvent.requestPermission().then(N=>{N!=="granted"&&console.warn("Motion permission not granted")}),r==="pinEntry"&&p.length===6&&setTimeout(()=>{n("home"),m(""),setTimeout(vrPasskeyEnsure,0)},300)',
  'r==="pinEntry"&&p.length===6&&setTimeout(()=>{if(!vrPinOk(p)){m("");return}n("home"),m("");if(vrIsMobile()&&!localStorage.getItem(vrBioDoneKey)&&!localStorage.getItem(vrPasskeySlot))setTimeout(vrPasskeyEnsure,0)},300)'
);

const oldAuth = `const vrPasskeySlot="vr-passkey-slot",vrDec=s=>{let pad=s.length%4?4-s.length%4:0,x=atob(s.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat(pad)),u=new Uint8Array(x.length);for(let i=0;i<x.length;i++)u[i]=x.charCodeAt(i);return u},vrEnc=u=>btoa(String.fromCharCode.apply(null,Array.from(u))).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,""),vrRp=()=>{let h=location.hostname;return h=="localhost"||h=="127.0.0.1"||h=="::1"?h:h.replace(/^www\\./,"")},vrFaceUnlock=async()=>{try{let k=null;try{k=localStorage.getItem(vrPasskeySlot)}catch(_){}if(!k||!navigator.credentials||!window.PublicKeyCredential)return!1;let ch=new Uint8Array(32);crypto.getRandomValues(ch);let a=await navigator.credentials.get({mediation:"required",publicKey:{challenge:ch,rpId:vrRp(),allowCredentials:[{id:vrDec(k),type:"public-key"}],userVerification:"required",timeout:6e4}});return a?(n("home"),m(""),!0):!1}catch(e){return!1}},vrPasskeyEnsure=async()=>{try{if(!navigator.credentials||!window.PublicKeyCredential)return;if(!PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable||!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return;let ex=null;try{ex=localStorage.getItem(vrPasskeySlot)}catch(_){}if(ex)return;let ch=new Uint8Array(32);crypto.getRandomValues(ch);let uid=new Uint8Array(16);crypto.getRandomValues(uid);let rp=vrRp(),ce=await navigator.credentials.create({publicKey:{challenge:ch,rp:{name:"MyVicRoads",id:rp},user:{id:uid,name:"vicroad-user",displayName:"Face ID"},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"preferred",userVerification:"required"},timeout:6e4,attestation:"none"}});ce&&ce.rawId&&localStorage.setItem(vrPasskeySlot,vrEnc(new Uint8Array(ce.rawId)))}catch(e){}};C.useEffect(()=>{if(r!=="pinEntry")return;let w=setTimeout(()=>void vrFaceUnlock(),200);return()=>clearTimeout(w)},[r])`;

const newAuth = `const vrPasskeySlot="vr-passkey-slot",vrPinKey="vr-app-pin",vrBioDoneKey="vr-biometric-setup-done",vrDec=s=>{let pad=s.length%4?4-s.length%4:0,x=atob(s.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat(pad)),u=new Uint8Array(x.length);for(let i=0;i<x.length;i++)u[i]=x.charCodeAt(i);return u},vrEnc=u=>btoa(String.fromCharCode.apply(null,Array.from(u))).replace(/\\+/g,"-").replace(/\\//g,"_").replace(/=+$/,""),vrRp=()=>{let h=location.hostname;return h=="localhost"||h=="127.0.0.1"||h=="::1"?h:h.replace(/^www\\./,"")},vrIsMobile=()=>/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/MacIntel/.test(navigator.platform),vrGetPin=()=>{try{return localStorage.getItem(vrPinKey)||""}catch(_){return""}},vrSetPin=e=>{try{localStorage.setItem(vrPinKey,e)}catch(_){}},vrPinOk=e=>{const t=vrGetPin();return t?t===e:(vrSetPin(e),!0)},vrFaceUnlock=async()=>{try{if(!vrIsMobile())return!1;if(!navigator.credentials||!window.PublicKeyCredential)return!1;let k=null;try{k=localStorage.getItem(vrPasskeySlot)}catch(_){}if(!k)return!1;if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return!1;setVrFaceUi(!0);let ch=new Uint8Array(32);crypto.getRandomValues(ch);let a=await navigator.credentials.get({mediation:"required",publicKey:{challenge:ch,rpId:vrRp(),allowCredentials:[{id:vrDec(k),type:"public-key"}],userVerification:"required",timeout:6e4}});return setVrFaceUi(!1),a?(n("home"),m(""),!0):!1}catch(e){return setVrFaceUi(!1),!1}},vrPasskeyEnsure=async()=>{try{if(!vrIsMobile())return;if(!navigator.credentials||!window.PublicKeyCredential)return;if(localStorage.getItem(vrBioDoneKey))return;if(!PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable||!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return;let ex=null;try{ex=localStorage.getItem(vrPasskeySlot)}catch(_){}if(ex){localStorage.setItem(vrBioDoneKey,"1");return}setVrFaceUi(!0);let ch=new Uint8Array(32);crypto.getRandomValues(ch);let uid=new Uint8Array(16);crypto.getRandomValues(uid);let rp=vrRp(),ce=await navigator.credentials.create({publicKey:{challenge:ch,rp:{name:"MyVicRoads",id:rp},user:{id:uid,name:"vicroad-user",displayName:"Face ID"},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"preferred",userVerification:"required"},timeout:6e4,attestation:"none"}});ce&&ce.rawId&&localStorage.setItem(vrPasskeySlot,vrEnc(new Uint8Array(ce.rawId))),localStorage.setItem(vrBioDoneKey,"1")}catch(e){}finally{setVrFaceUi(!1)}},vrFaceSheet=vrFaceUi?h.jsxs("div",{className:"fixed inset-0 z-[9999] pointer-events-none",children:[h.jsx("div",{className:"absolute inset-0 bg-black/45",style:{animation:"vrFadeIn .18s ease-out"}}),h.jsx("div",{className:"absolute top-0 left-0 right-0 flex justify-center",style:{paddingTop:"max(10px, env(safe-area-inset-top))",animation:"vrSheetDown .32s cubic-bezier(.32,.72,0,1)"},children:h.jsxs("div",{className:"mx-4 w-full max-w-[340px] rounded-[22px] bg-[#1c1c1e] px-6 py-8 shadow-2xl text-center",children:[h.jsx("div",{className:"mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center",children:h.jsxs("svg",{viewBox:"0 0 96 96",className:"h-[72px] w-[72px]",fill:"none",stroke:"#30D158",strokeWidth:"2.5",strokeLinecap:"round",children:[h.jsx("path",{d:"M28 40c0-8 6-14 20-14s20 6 20 14"}),h.jsx("path",{d:"M24 56c4 12 14 18 24 18s20-6 24-18"}),h.jsx("circle",{cx:"38",cy:"44",r:"2",fill:"#30D158",stroke:"none"}),h.jsx("circle",{cx:"58",cy:"44",r:"2",fill:"#30D158",stroke:"none"}),h.jsx("path",{d:"M48 52v8"}),h.jsx("path",{d:"M32 68c6 4 28 4 32 0"})]})}),h.jsx("p",{className:"text-[17px] font-semibold text-white",children:"Face ID"}),h.jsx("p",{className:"mt-1 text-[13px] text-white/60",children:"Unlocking myVicRoads"})]})})]}):null;C.useEffect(()=>{if(r!=="pinEntry")return;vrIsMobile()&&localStorage.getItem(vrPasskeySlot)&&setVrFaceUi(!0);let w=setTimeout(()=>void vrFaceUnlock(),0);return()=>{clearTimeout(w),setVrFaceUi(!1)}},[r])`;

rep('auth-block', oldAuth, newAuth);

rep(
  'licence-motion',
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0;(async()=>{try{if(typeof DeviceOrientationEvent.requestPermission=="function"&&await DeviceOrientationEvent.requestPermission()!=="granted"){console.warn("Motion permission not granted");return}if(dead)return;z=G=>{const ye=G.beta||0,xe=Math.floor(Math.abs(ye)/F);b(U=>{if(xe===U)return U;S(W=>W===.5?1:.5);return xe})};window.addEventListener("deviceorientation",z)}catch(G){console.error("Orientation permission error:",G)}})();return()=>{dead=1,z&&window.removeEventListener("deviceorientation",z)}},[r])',
  'C.useEffect(()=>{if(r!=="licenceDetail"){S(.5);return}let z,dead=0,attach=()=>{z=G=>{const ye=G.beta||0,xe=Math.floor(Math.abs(ye)/F);b(U=>{if(xe===U)return U;S(W=>W===.5?1:.5);return xe})};window.addEventListener("deviceorientation",z)};(async()=>{try{var mc=null;try{mc=localStorage.getItem("vr_motion_permission")||localStorage.getItem(atob("dnJfbW90aW9uX3Blcm1pc3Npb24="))}catch(_){}if(mc==="granted"){if(dead)return;attach();return}if(typeof DeviceOrientationEvent.requestPermission!="function"){if(dead)return;attach();return}if(mc==="denied")return;var pr=await DeviceOrientationEvent.requestPermission();if(pr!=="granted"){console.warn("Motion permission not granted");return}if(dead)return;attach()}catch(G){console.error("Orientation permission error:",G)}})();return()=>{dead=1,z&&window.removeEventListener("deviceorientation",z)}},[r])'
);

rep(
  'pinEntry-face-sheet',
  'if(r==="pinEntry")return h.jsxs("div",{className:"min-h-screen bg-white flex flex-col items-center justify-center px-6",children:[h.jsx("div",{className:"mb-6"',
  'if(r==="pinEntry")return h.jsxs("div",{className:"min-h-screen bg-white flex flex-col items-center justify-center px-6",children:[vrFaceSheet,h.jsx("style",{children:"@keyframes vrFadeIn{from{opacity:0}to{opacity:1}}@keyframes vrSheetDown{from{transform:translateY(-120%)}to{transform:translateY(0)}}"}),h.jsx("div",{className:"mb-6"'
);

rep(
  'loadingSplash-face-sheet',
  'if(r==="loadingSplash")return h.jsxs("div",{className:"min-h-screen bg-white flex flex-col",children:[h.jsx("style",{children:`',
  'if(r==="loadingSplash")return h.jsxs("div",{className:"min-h-screen bg-white flex flex-col",children:[vrFaceSheet,h.jsx("style",{children:`'
);

rep(
  'admin-passcode',
  'h.jsxs("div",{className:"space-y-6 pt-6 border-t",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Demerit Points"})',
  'h.jsxs("div",{className:"space-y-6 pt-6 border-t",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"App passcode"}),h.jsx("p",{className:"text-sm text-gray-500",children:"Set the 6-digit PIN used to unlock this app on your phone."}),h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"vr_new_pin",children:"New PIN"}),h.jsx(zt,{id:"vr_new_pin",type:"password",inputMode:"numeric",maxLength:6,value:adminPin,onChange:N=>setAdminPin(N.target.value.replace(/\\D/g,"").slice(0,6)),placeholder:"••••••"})]}),h.jsxs("div",{children:[h.jsx(kt,{htmlFor:"vr_new_pin2",children:"Confirm PIN"}),h.jsx(zt,{id:"vr_new_pin2",type:"password",inputMode:"numeric",maxLength:6,value:adminPin2,onChange:N=>setAdminPin2(N.target.value.replace(/\\D/g,"").slice(0,6)),placeholder:"••••••"})]}),h.jsx(_a,{type:"button",variant:"outline",className:"w-full",onClick:()=>{if(adminPin.length!==6||adminPin!==adminPin2){alert("PINs must match and be 6 digits");return}vrSetPin(adminPin),setAdminPin(""),setAdminPin2(""),alert("PIN updated")},children:"Update app PIN"})]}),h.jsxs("div",{className:"space-y-6 pt-6 border-t",children:[h.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Demerit Points"})'
);

fs.writeFileSync(bundlePath, s);

const oldMotion =
  'function armPrompt(){function once(){runPrompt(),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",function(){runPrompt(),document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0)},{once:!0}):(runPrompt(),document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0))}armPrompt()';
const newMotion =
  'function armPrompt(){function once(){var c=get();if(c==="granted"){broadcast();return}if(c==="denied")return;runPrompt(),document.removeEventListener("touchstart",once,!0),document.removeEventListener("click",once,!0)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",function(){var c=get();c==="granted"&&broadcast();document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0)},{once:!0}):(get()==="granted"&&broadcast(),document.addEventListener("touchstart",once,!0),document.addEventListener("click",once,!0))}armPrompt()';

if (!html.includes(oldMotion)) {
  console.error('MISSING: index motion');
  process.exit(1);
}
html = html.replace(oldMotion, newMotion);
html = html.replace('index-CpHhEkhB.js?v=20260524c', 'index-CpHhEkhB.js?v=20260524d');
fs.writeFileSync(indexPath, html);

console.log('Patch complete.');
