const cacheName = 'v3';
const cacheFiles = [
    './',
    './index.html',
    './img/logo.png',
    './img/promo_kids.png',
    './img/menu.png',
    './build.js'
];

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Installed');

    event.waitUntil(
        caches.open(cacheName)
            .then((cache)=> {
                console.log('[ServiceWorker] Caching cacheFiles')
                return cache.addAll(cacheFiles)
                    .then(self.skipWaiting())
                    .catch((err) => console.log('%%---> [ServiceWorker] Caching cacheFiles err', err));
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('%%---> [ServiceWorker] Activated')
    event.waitUntil(
        caches.keys().then(function(oldCacheNames) {
            return Promise.all(oldCacheNames.map(function(oldCacheName) {
                if(oldCacheName !== cacheName) {
                    console.log('%%---> Removing old cache files from ' + oldCacheName);
                    return caches.delete(oldCacheName);
                }
            }))
        })
    )

});

self.addEventListener('fetch', function(event) {
    console.log('%%---> [ServiceWorker] Fetching', event.request.url)

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    console.log("----|> no cache has been found")
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = response.clone();

                        caches.open(cacheName)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// nassa api key = KiE6gDczbatfZK1oqFld4CpLEPSyW3mELiwEoDZ5