const CACHE_NAME = "muslim-bro-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});self.addEventListener("install", event => {
    console.log("Service Worker Installed");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("Service Worker Activated");
});

self.addEventListener("fetch", event => {
    // Allow normal network requests
});
