const CACHE_NAME = "campusconnect-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/data/events.json",
  "/data/gallery.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;

  if (
    request.url.includes("/data/") ||
    request.destination === "image" ||
    request.url.endsWith(".png") ||
    request.url.endsWith(".jpg") ||
    request.url.endsWith(".jpeg") ||
    request.url.endsWith(".webp")
  ) {
    event.respondWith(
      caches.match(request).then(
        response =>
          response ||
          fetch(request).then(fetchRes =>
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, fetchRes.clone());
              return fetchRes;
            })
          )
      )
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
