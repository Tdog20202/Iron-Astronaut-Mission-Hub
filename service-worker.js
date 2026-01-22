const CACHE_NAME = "iron-astronaut-cache-v1";
const ASSETS = [
  "index.html",
  "css/style.css",
  "js/app.js",
  "js/sidebar.js",
  "js/tabs.js",
  "js/dv.js",
  "js/missions.js",
  "js/mods.js",
  "js/builder.js",
  "js/timeline.js",
  "js/engines.js",
  "js/saves.js",
  "data/missions.json",
  "data/mods.json",
  "data/engines.json",
  "data/timeline.json",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});