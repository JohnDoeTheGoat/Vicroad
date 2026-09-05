const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../yhrznifOvvzQ.app/assets/index-CpHhEkhB.js');
const indexPath = path.join(__dirname, '../index.html');

let s = fs.readFileSync(bundlePath, 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const oldSplash =
  'C.useEffect(()=>{if(r!=="splash")return;let x=0;const t=async()=>{await new Promise(e=>setTimeout(e,350));if(x)return;n("loadingSplash");await new Promise(e=>setTimeout(e,30));if(x)return;const ok=await vrFaceUnlock();if(x)return;if(!ok)n("pinEntry")};t();return()=>{x=1}},[r])';

const newSplash =
  'C.useEffect(()=>{if(r!=="splash")return;let dead=0;const t=async()=>{try{const mob=typeof vrIsMobile=="function"&&vrIsMobile();if(!mob){await new Promise(e=>setTimeout(e,180));if(dead)return;n("pinEntry");return}await new Promise(e=>setTimeout(e,350));if(dead)return;n("loadingSplash");await new Promise(e=>setTimeout(e,30));if(dead)return;const ok=await vrFaceUnlock();if(dead)return;if(!ok)n("pinEntry")}catch(_e){if(!dead)n("pinEntry")}};t();return()=>{dead=1}},[r])';

if (!s.includes(oldSplash)) {
  console.error('splash block not found');
  process.exit(1);
}
s = s.replace(oldSplash, newSplash);
console.log('OK: splash');

const oldMobile =
  'vrIsMobile=()=>/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/MacIntel/.test(navigator.platform)';

const newMobile =
  'vrIsMobile=()=>{try{if(window.matchMedia&&window.matchMedia("(pointer:fine)").matches&&!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)))return!1}catch(_){}return/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/MacIntel/.test(navigator.platform)}';

if (!s.includes(oldMobile)) {
  console.error('vrIsMobile not found');
  process.exit(1);
}
s = s.replace(oldMobile, newMobile);
console.log('OK: vrIsMobile');

const oldFace =
  'vrFaceUnlock=async()=>{try{if(!vrIsMobile())return!1;if(!navigator.credentials||!window.PublicKeyCredential)return!1;let k=null;try{k=localStorage.getItem(vrPasskeySlot)}catch(_){}if(!k)return!1;if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return!1;setVrFaceUi(!0);let ch=new Uint8Array(32);crypto.getRandomValues(ch);let a=await navigator.credentials.get({mediation:"required",publicKey:{challenge:ch,rpId:vrRp(),allowCredentials:[{id:vrDec(k),type:"public-key"}],userVerification:"required",timeout:6e4}});return setVrFaceUi(!1),a?(n("home"),m(""),!0):!1}catch(e){return setVrFaceUi(!1),!1}}';

const newFace =
  'vrFaceUnlock=async()=>{try{if(!vrIsMobile())return!1;if(!navigator.credentials||!window.PublicKeyCredential)return!1;let k=null;try{k=localStorage.getItem(vrPasskeySlot)}catch(_){}if(!k)return!1;if(PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()))return!1;setVrFaceUi(!0);let ch=new Uint8Array(32);crypto.getRandomValues(ch);let a=await Promise.race([navigator.credentials.get({mediation:"required",publicKey:{challenge:ch,rpId:vrRp(),allowCredentials:[{id:vrDec(k),type:"public-key"}],userVerification:"required",timeout:12e3}}),new Promise(e=>setTimeout(()=>e(null),12e3))]);return setVrFaceUi(!1),a?(n("home"),m(""),!0):!1}catch(e){return setVrFaceUi(!1),!1}}';

if (!s.includes(oldFace)) {
  console.error('vrFaceUnlock not found');
  process.exit(1);
}
s = s.replace(oldFace, newFace);
console.log('OK: vrFaceUnlock');

const anchor =
  'C.useEffect(()=>{if(r!=="pinEntry")return;vrIsMobile()&&localStorage.getItem(vrPasskeySlot)&&setVrFaceUi(!0);let w=setTimeout(()=>void vrFaceUnlock(),0);return()=>{clearTimeout(w),setVrFaceUi(!1)}},[r]);const qrPattern';

const safety =
  'C.useEffect(()=>{if(r!=="loadingSplash")return;if(!vrIsMobile()){n("pinEntry");return}let dead=0;const id=setTimeout(()=>{if(!dead)n("pinEntry")},14e3);return()=>{dead=1,clearTimeout(id)}},[r]),C.useEffect(()=>{if(r!=="pinEntry")return;vrIsMobile()&&localStorage.getItem(vrPasskeySlot)&&setVrFaceUi(!0);let w=setTimeout(()=>void vrFaceUnlock(),0);return()=>{clearTimeout(w),setVrFaceUi(!1)}},[r]);const qrPattern';

if (!s.includes(anchor)) {
  console.error('pinEntry effect anchor not found');
  process.exit(1);
}
s = s.replace(anchor, safety);
console.log('OK: loadingSplash safety');

const oldLoadingText =
  'children:"Loading your details…"';
const newLoadingText =
  'children:vrIsMobile()?"Loading your details…":"Loading…"';

// Only one loadingSplash has this text - replace in context of loadingSplash
if (s.includes(oldLoadingText)) {
  // loadingSplash block uses this - pinEntry doesn't
  const idx = s.indexOf('if(r==="loadingSplash")');
  const chunk = s.slice(idx, idx + 2500);
  if (chunk.includes(oldLoadingText)) {
    const newChunk = chunk.replace(oldLoadingText, newLoadingText);
    s = s.slice(0, idx) + newChunk + s.slice(idx + 2500);
    console.log('OK: loading text (chunk)');
  }
}

fs.writeFileSync(bundlePath, s);

if (html.includes('20260524d')) {
  html = html.replace('20260524d', '20260524e');
  fs.writeFileSync(indexPath, html);
  console.log('OK: cache bust 20260524e');
}

console.log('Done.');
