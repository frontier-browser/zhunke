const CACHE_NAME = 'frontier-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Add paths to your main CSS, JS, and icons here so they load offline:
  // './css/style.css',
  // './js/app.js'
];

// Install Event - Caching basic assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event - Serving cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
