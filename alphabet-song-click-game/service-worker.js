const CACHE_NAME = "tap-the-abc-v4";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/alphabet-meadow.png",
  "./assets/apple-touch-icon.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/sounds/cat.mp3",
  "./assets/sounds/dog.mp3",
  "./assets/sounds/frog.mp3",
  "./assets/sounds/bird.mp3",
  "./assets/sounds/bear.mp3",
  "./assets/sounds/lion.mp3",
  "./assets/sounds/sheep.mp3",
  "./assets/sounds/chicken.mp3",
  "./credits.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => event.request.mode === "navigate" ? caches.match("./index.html") : Response.error())
  );
});
