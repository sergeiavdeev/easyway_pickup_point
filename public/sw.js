let version = 1;
let cacheName = 'ewa-pickup-v-' + version;
let appShellFiles = [
    './',
    './index.html',
    './js/app.js',
    './js/chunk-vendors.js',
    './favicon.ico',
    './favicon-32x32.png'
];

self.addEventListener('install', event => {
    
    self.skipWaiting()

    console.log('[Service Worker]: Installed')
  
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        console.log('[Service Worker]: Caching App Shell')
        return cache.addAll(appShellFiles)
      })
    )
});

self.addEventListener('activate', event => {
    console.log('[SW]: activate');

});

self.addEventListener('fetch', event => {
    console.log('[SW]: fetch');

    event.respondWith(
        caches.match(event.request).then((response) => {
  
          if (response) {
            console.log('[Service Worker]: returning ' + event.request.url + ' from cache');
            return response;
          } else {
            console.log('[Service Worker]: returning ' + event.request.url + ' from net');
            return fetch(event.request);
          }          
        }
      )
    );
});