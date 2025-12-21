const CACHE_NAME = "expense-manager-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/auth/login.html",
  "/auth/signup.html",
  "/dashboard/home.html",
  "/dashboard/history.html",
  "/dashboard/analysis.html",
  "/dashboard/profile.html",
  "/js/app.js",
  "/js/firebase.js",
  "/js/auth.js",
  "/js/db.js",
  "/js/constants.js",
  "/css/main.css",
  "/favicon.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
