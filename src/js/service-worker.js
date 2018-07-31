const cacheName = 'v2';
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
    // install waits util promise resolve inside
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles')
            return cache.addAll(cacheFiles).catch(function(err) {
                console.log('%%---> [ServiceWorker] Caching cacheFiles err', err)
            });
        })
    )
});

self.addEventListener('activate', function(event) {
    console.log('%%---> [ServiceWorker] Activated')
    event.waitUntil(
        caches.keys().then(function(aldCacheNames) {
            return Promise.all(aldCacheNames.map(function(oldCacheName) {

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

        caches.match(event.request).then(function(response) {
            if(response) {
                console.log('%%---> [ServiceWorker] Found in cache');
                return response;
            }

            const requestClone = event.request.clone();

            fetch(requestClone)
                .then(function() {
                    if(!response) {
                        console.log('%%---> [ServiceWorker] No response from fetch');
                        return response;
                    }

                    const responseClone = response.clone();

                    caches.open(cacheName).then(function(cache) {
                        console.log('%%---> [ServiceWorker] New Data add in cahche: ', event.request.url);

                        cache.put(event.request, responseClone);
                        return response;
                    })
                })
                .catch(function(err) {
                    console.log('%%---> [ServiceWorker] fetch error ', err)
                })
        }).catch(function(err) {
            console.log('%%---> [ServiceWorker] caches.match ', err)
        })
    );
});

// nassa api key = KiE6gDczbatfZK1oqFld4CpLEPSyW3mELiwEoDZ5