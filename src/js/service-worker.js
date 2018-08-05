const cacheName = 'v3';
const cacheFiles = [
    './',
    './index.html',
    './build.js'
];

self.addEventListener('install', function(event) {
    console.log('[SW] Installed');

    event.waitUntil(
        caches.open(cacheName)
            .then((cache)=> {
                console.log('[SW] Caching cacheFiles')
                return cache.addAll(cacheFiles)
                    .then(self.skipWaiting())
                    .catch((err) => console.log('[SW] Caching cacheFiles err', err));
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[SW] Activated')
    event.waitUntil(
        caches.keys().then(function(oldCacheNames) {
            return Promise.all(oldCacheNames.map(function(oldCacheName) {
                if(oldCacheName !== cacheName) {
                    console.log('Removing old cache files from ' + oldCacheName);
                    return caches.delete(oldCacheName);
                }
            }))
        })
    )

});

self.addEventListener('fetch', function(event) {
    console.log('[SW] Fetching', event.request.url)

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    console.log("----> [SW] Returned from cache", response.url)
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