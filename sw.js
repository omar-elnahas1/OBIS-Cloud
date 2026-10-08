const CACHE='obis-v5';
const ASSETS=['./','index.html','styles.css','app.js','adhkar.js','manifest.json','course.html','course.js','شامل محاضره اولى وتانيه محاسبه.pdf'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
