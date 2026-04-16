// SW désactivé - se désinstalle automatiquement
self.addEventListener('install', function(e){
  self.skipWaiting();
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.map(function(n){ return caches.delete(n); }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});
// Pas de mise en cache - tout depuis le réseau
self.addEventListener('fetch', function(e){
  e.respondWith(fetch(e.request));
});