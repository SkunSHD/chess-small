import { askNotificationPermission, addNotificationSubscription, showTestNotification } from './notifications';

export default function registerServiceWorker() {
    const registerServiceWorkerHandler = ()=> {
        if('serviceWorker' in navigator) {
            if(process.env.NODE_ENV === 'development') {
                navigator.serviceWorker
                    .register('./service-worker.js', {scope: './'})
                    .then(registration => {
                        console.log('[SW] reg successful, scope: ', registration.scope);
                        askNotificationPermission()
                            .then(addNotificationSubscription)
                            .then(showTestNotification);
                    })
                    .catch(error => {
                        console.log('[SW] registration failed: ', error);
                    });
            } else {
                // add worker for production
            }
        }
    };

    document.addEventListener('DOMContentLoaded', registerServiceWorkerHandler)
}
