// Service Worker para Cultura Chelera PWA
const CACHE_NAME = 'cultura-chelera-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/diptico.html',
  '/el-hervor-frio.html',
  '/assets/catalogo.html',
  '/assets/degustacion.html',
  '/assets/css/diptico.css',
  '/assets/js/web.js',
  '/assets/js/pwa.js',
  '/assets/img/favicon.svg',
  '/assets/img/favicon.png',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png',
  '/assets/img/cover.jpg',
  '/manifest.webmanifest',
  '/offline.html'
];

// Instalación: Precachear recursos esenciales de la interfaz
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('PWA SW: precaching advertencia parcial', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpieza y migración de versiones anteriores de caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de Fetch:
// - Para navegación (páginas HTML): Red primero con respaldo en caché (Network-First)
//   Permite que las actualizaciones y nuevos contenidos siempre se vean inmediatamente cuando hay internet.
// - Para recursos estáticos (CSS, JS, imágenes): Caché primero con actualización en segundo plano (Stale-While-Revalidate)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navegación (HTML de páginas)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const match = await caches.match(request);
          if (match) return match;
          const fallback = await caches.match('/offline.html');
          if (fallback) return fallback;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Recursos estáticos del mismo origen (imágenes, fuentes, css, js)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
