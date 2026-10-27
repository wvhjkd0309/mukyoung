const C='mukyoung-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png']).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 const mine=u.origin===location.origin,lib=u.host==='www.gstatic.com'||u.host==='fonts.googleapis.com'||u.host==='fonts.gstatic.com';if(!mine&&!lib)return;
 e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:mine});
  const net=fetch(e.request).then(async r=>{if(r&&r.ok){if(mine&&hit&&(u.pathname.endsWith('/')||u.pathname.endsWith('.html'))){const a=hit.headers.get('etag')||hit.headers.get('last-modified'),b=r.headers.get('etag')||r.headers.get('last-modified');if(a&&b&&a!==b){const cl=await self.clients.matchAll();cl.forEach(x=>x.postMessage({t:'updated'}))}}c.put(e.request,r.clone())}return r}).catch(()=>hit);
  return hit||net}))});
