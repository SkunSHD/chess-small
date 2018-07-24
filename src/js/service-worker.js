(()=> {
    const registerServiceWorker = ()=> {
        if('serviceWorker' in navigator) {
            if(process.env.NODE_ENV === 'development') {
                navigator.serviceWorker
                    .register('./src/js/service-worker.js')
                    .then(reg => {
                        console.log('Registration succeeded. Scope is ' + reg.scope);
                    })
                    .catch(error => {
                        console.log('Registration failed with ' + error);
                    });
            } else {
                // add for production
            }
        }
    };

    document.addEventListener('DOMContentLoaded', registerServiceWorker)
})();