// Offline-Cache für Schwarmfänger.
// Die Seite selbst wird immer zuerst frisch aus dem Netz geholt (Updates kommen sofort an),
// der Cache dient nur als Rückfall ohne Internet. Bei Änderungen VERSION erhöhen.
const VERSION = 'schwarm-v5';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function remember(req, res) {
  if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html') || url.pathname.endsWith('.webmanifest');

  if (isPage) {
    // Netz zuerst, Cache nur offline
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => remember(req, res))
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  if (url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com')) {
    // Icons und Schriften: Cache zuerst
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => remember(req, res))));
  }
});
