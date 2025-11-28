const CACHE_NAME = 'room-planner-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './freemode.html',
    './tidymode.html',
    './free-ipad.html',
    './tidy-ipad.html',
    './free-mobile.html',
    './free-mobile.html',
    './icons/icon192.png',
    './icons/icon512.png'
    // Add any other important files (freemode.html, tidymode.html, etc.)
];

// Install service worker and cache necessary files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
