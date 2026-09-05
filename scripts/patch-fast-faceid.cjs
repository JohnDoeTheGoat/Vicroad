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

// 1) Fast startup: splash -> pinEntry only (no loadingSplash, no Face ID blocking)
rep(
  'splash-flow',
  'C.useEffect(()=>{if(r!=="splash")return;let dead=0;const t=async()=>{try{const mob=typeof vrIsMobile=="function"&&vrIsMobile();if(!mob){await new Promise(e=>setTimeout(e,180));if(dead)return;n("pinEntry");return}await new Promise(e=>setTimeout(e,350));if(dead)return;n("loadingSplash");await new Promise(e=>setTimeout(e,30));if(dead)return;const ok=await vrFaceUnlock();if(dead)return;if(!ok)n("pinEntry")}catch(_e){if(!dead)n("pinEntry")}};t();return()=>{dead=1}},[r])',
  'C.useEffect(()=>{if(r!=="splash")return;let dead=0;const t=async()=>{try{await new Promise(e=>setTimeout(e,100));if(dead)return;n("pinEntry")}catch(_e){if(!dead)n("pinEntry")}};t();return()=>{dead=1}},[r])'
);

// 2) Passkey slot v2 (non-discoverable) — avoids GitHub passkey picker
rep('passkey-slot', 'vrPasskeySlot="vr-passkey-slot"', 'vrPasskeySlot="vr-passkey-v2"');

// 3) Face unlock: optional mediation, shorter timeout, show sheet first
rep(
  'face-unlock',
  'vrFaceUnlock=async()=>{try{if(!vrIsMobile())return!1;if(!navigator.credentials||!window.PublicKeyCredential)return!1;let k=null;try{k=localStorage.getItem(vrPasskeySlot)}catch(_){}if(!k)return!1;if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return!1;setVrFaceUi(!0);let ch=new Uint8Array(32);crypto.getRandomValues(ch);let a=await Promise.race([navigator.credentials.get({mediation:"required",publicKey:{challenge:ch,rpId:vrRp(),allowCredentials:[{id:vrDec(k),type:"public-key"}],userVerification:"required",timeout:12e3}}),new Promise(e=>setTimeout(()=>e(null),12e3))]);return setVrFaceUi(!1),a?(n("home"),m(""),!0):!1}catch(e){return setVrFaceUi(!1),!1}}',
  'vrFaceUnlock=async()=>{try{if(!vrIsMobile())return!1;if(!navigator.credentials||!window.PublicKeyCredential)return!1;let k=null;try{k=localStorage.getItem(vrPasskeySlot)}catch(_){}if(!k)return!1;if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return!1;setVrFaceUi(!0);let ch=new Uint8Array(32);crypto.getRandomValues(ch);let pk={challenge:ch,rpId:vrRp(),allowCredentials:[{id:vrDec(k),type:"public-key"}],userVerification:"required",timeout:8e3},a=await Promise.race([navigator.credentials.get({publicKey:pk}),new Promise(e=>setTimeout(()=>e(null),8500))]);return setVrFaceUi(!1),a?(n("home"),m(""),!0):!1}catch(e){return setVrFaceUi(!1),!1}}'
);

// 4) Passkey create: non-resident platform-only (Face ID, not sync passkey list)
rep(
  'passkey-create',
  'ce=await navigator.credentials.create({publicKey:{challenge:ch,rp:{name:"MyVicRoads",id:rp},user:{id:uid,name:"vicroad-user",displayName:"Face ID"},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"preferred",userVerification:"required"},timeout:6e4,attestation:"none"}})',
  'ce=await navigator.credentials.create({publicKey:{challenge:ch,rp:{name:"myVicRoads",id:rp},user:{id:uid,name:"vicroad-user",displayName:"myVicRoads"},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",residentKey:"discouraged",requireResidentKey:!1,userVerification:"required"},timeout:2e4,attestation:"none"}})'
);

// 5) Remove loadingSplash safety + keep pinEntry face trigger
rep(
  'loading-safety',
  'C.useEffect(()=>{if(r!=="loadingSplash")return;if(!vrIsMobile()){n("pinEntry");return}let dead=0;const id=setTimeout(()=>{if(!dead)n("pinEntry")},14e3);return()=>{dead=1,clearTimeout(id)}},[r]),C.useEffect(()=>{if(r!=="pinEntry")return;vrIsMobile()&&localStorage.getItem(vrPasskeySlot)&&setVrFaceUi(!0);let w=setTimeout(()=>void vrFaceUnlock(),0);return()=>{clearTimeout(w),setVrFaceUi(!1)}},[r])',
  'C.useEffect(()=>{if(r==="loadingSplash"){n("pinEntry");return}if(r!=="pinEntry")return;vrIsMobile()&&localStorage.getItem(vrPasskeySlot)&&setVrFaceUi(!0);let w=setTimeout(()=>void vrFaceUnlock(),50);return()=>{clearTimeout(w),setVrFaceUi(!1)}},[r])'
);

// 6) Faster PIN submit
rep(
  'pin-delay',
  'r==="pinEntry"&&p.length===6&&setTimeout(()=>{if(!vrPinOk(p)){m("");return}n("home"),m("");if(vrIsMobile()&&!localStorage.getItem(vrBioDoneKey)&&!localStorage.getItem(vrPasskeySlot))setTimeout(vrPasskeyEnsure,0)},300)',
  'r==="pinEntry"&&p.length===6&&setTimeout(()=>{if(!vrPinOk(p)){m("");return}n("home"),m("");if(vrIsMobile()&&!localStorage.getItem(vrBioDoneKey)&&!localStorage.getItem(vrPasskeySlot))setTimeout(vrPasskeyEnsure,80)},120)'
);

// 7) Remove loading text from loadingSplash fallback UI
const loadingText =
  'h.jsx("p",{className:"text-center text-gray-500 text-sm mt-8 px-6",children:vrIsMobile()?"Loading your details…":"Loading…"}),';
if (s.includes(loadingText)) {
  s = s.replace(loadingText, '');
  console.log('OK: removed loading text');
} else {
  const alt =
    'h.jsx("p",{className:"text-center text-gray-500 text-sm mt-8 px-6",children:"Loading your details…"}),';
  if (s.includes(alt)) {
    s = s.replace(alt, '');
    console.log('OK: removed loading text (alt)');
  } else {
    console.warn('WARN: loading text not found');
  }
}

// 8) Update pin hint — Face ID is automatic on phone, not passkey picker
rep(
  'pin-title',
  'children:"Use Face ID or enter your PIN"',
  'children:vrIsMobile()&&localStorage.getItem(vrPasskeySlot)?"Use Face ID or enter your PIN":"Enter your PIN"'
);

fs.writeFileSync(bundlePath, s);

if (html.includes('20260524e')) {
  html = html.replace('20260524e', '20260524f');
  fs.writeFileSync(indexPath, html);
  console.log('OK: cache bust 20260524f');
} else if (html.includes('20260524d')) {
  html = html.replace('20260524d', '20260524f');
  fs.writeFileSync(indexPath, html);
  console.log('OK: cache bust 20260524f (from d)');
} else {
  console.warn('WARN: update index.html cache bust manually');
}

console.log('Done.');
