const V="scriptorium-v1",SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.hostname.endsWith("supabase.co"))return;
  if(u.origin===location.origin){
    e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
  }else if(/jsdelivr|googleapis|gstatic/.test(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put(r,y));return x})));
  }
});
