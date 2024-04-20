/* eslint-disable no-restricted-globals */
const CACHE_NAME = "myCache";

self.addEventListener("install", (event) => {
  console.log("Installing Service Worker");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache
        .addAll(["/", "/index.html", "static/js/bundle.js"])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating Service Worker");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  console.log(`Fetching ${event.request.url}`);
  if (navigator.onLine) {
    let fetchRequest = event.request.clone();
    return fetch(fetchRequest).then((response) => {
      if (!response || response.status !== 200 || response.type !== "basic")
        return response;

      let responseToCache = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, responseToCache);
      });

      return response;
    });
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
      })
    );
  }
});
