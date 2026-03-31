self.addEventListener('install', e => {
 e.waitUntil(
  caches.open('game-cache').then(cache => cache.addAll([
   'index.html',
   'style.css',
   'game.js'
  ]))
 );
});

self.addEventListener('fetch', e => {
 e.respondWith(
  caches.match(e.request).then(res => res || fetch(e.request))
 );
});
