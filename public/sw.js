const CACHE_NAME = 'healthcopilot-solaris-v2'
const APP_SHELL = ['/', '/manifest.json', '/healthcopilot-mark.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))))
  self.clients.claim()
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) || new Response(JSON.stringify({ offline: true }), { headers: { 'Content-Type': 'application/json' } })
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) (await caches.open(CACHE_NAME)).put(request, response.clone())
  return response
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request))
    return
  }
  if (event.request.destination === 'image' || url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(event.request))
    return
  }
  event.respondWith(networkFirst(event.request))
})
