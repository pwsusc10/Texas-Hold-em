const CACHE_NAME = 'cool-cache';

const PRECACHE_ASSETS = ['/images/icons/icon-192x192.png', '/images/icons/icon-512x512.png'];

// Install 이벤트에서 정적 리소스 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_ASSETS);
    })()
  );
});

// Activate 이벤트에서 이전 캐시 제거
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
      self.clients.claim();
    })()
  );
});

// Fetch 이벤트에서 요청 처리
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 비정상적인 요청 스킴 필터링
  if (!['http:', 'https:'].includes(url.protocol)) {
    return;
  }
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        return cachedResponse;
      } else {
        const networkResponse = await fetch(event.request);

        // GET 요청만 캐시에 저장
        if (event.request.method === 'GET' && networkResponse.ok) {
          try {
            await cache.put(event.request, networkResponse.clone());
          } catch (error) {
            console.error('Failed to cache request:', event.request.url, error);
          }
        }

        return networkResponse;
      }
    })()
  );
});
