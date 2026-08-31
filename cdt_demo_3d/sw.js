// ==========================================================================
// OXOT Cyber Digital Twin - Service Worker & Performance Cache (v3)
// Fast offline caching for 3D models while ensuring JS/CSS/HTML updates are fresh
// ==========================================================================

const CACHE_NAME = 'oxot-cdt-cache-v4';

const PRECACHE_ASSETS = [
  './hyperscale_campus.glb',
  './graph/facility-graph.json',
  './graph/hall-graph.json',
  './graph/positions.json',
  './graph/routes.json',
  './graph/hazard-log.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[OXOT SW v4] Pre-caching static assets & 3D models...');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[OXOT SW v4] Pre-cache warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first strictly for heavy binary GLB 3D models and web fonts
  if (url.pathname.endsWith('.glb') || url.pathname.endsWith('.woff2')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Network-first for JS, CSS, JSON, and HTML to guarantee latest navigation & content
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

