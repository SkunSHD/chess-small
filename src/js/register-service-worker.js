export default function registerServiceWorker() {
    const registerServiceWorkerHandler = ()=> {
        if('serviceWorker' in navigator) {
            if(process.env.NODE_ENV === 'development') {
                navigator.serviceWorker
                    .register('./service-worker.js', {scope: './'})
                    .then(reg => {
                        if(reg.installing) {
                            console.log('Service worker installing');
                        } else if(reg.waiting) {
                            console.log('Service worker installed');
                        } else if(reg.active) {
                            console.log('Service worker active');
                        }
                    })
                    .catch(error => {
                        console.log('Registration failed with ' + error);
                    });
            } else {
                // add worker for production
            }
        }
    };

    document.addEventListener('DOMContentLoaded', registerServiceWorkerHandler)
}