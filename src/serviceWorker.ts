const CACHE_NAME = 'recipe-app-cache-v1';
const API_URL = 'https://dummyjson.com/recipes';

// Self refers to the Service Worker itself
self.addEventListener('install', (event: any) => {
  // Perform install steps (pre-cache some static files)
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(['/index.html', '/']);
    })
  );
});

// Fetch Event - Intercepts all fetch requests
self.addEventListener('fetch', (event: any) => {
  if (event.request.url.startsWith(API_URL)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Otherwise, make a network request and cache the response
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Cache the network response for future requests
            cache.put(event.request, networkResponse.clone());
            console.log('Fetched and cached:', event.request.url);
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Handle other non-API requests normally
    event.respondWith(fetch(event.request));
  }
});

// Activate Event - Cleanup old caches if necessary
self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches not in the whitelist
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Ensure TypeScript treats this file as a module
export {};
