export default function registerServiceWorker() {
    const registerServiceWorkerHandler = ()=> {
        if('serviceWorker' in navigator) {
            if(process.env.NODE_ENV === 'development') {
                navigator.serviceWorker
                    .register('./service-worker.js', {scope: './'})
                    .then(registration => {
                        console.log('[SW] reg successful, scope: ', registration.scope);
                    })
                    .catch(error => {
                        console.log('[SW] registration failed: ', err);
                    });
            } else {
                // add worker for production
            }
        }
    };

    document.addEventListener('DOMContentLoaded', registerServiceWorkerHandler)
}