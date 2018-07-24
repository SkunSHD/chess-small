if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw-test/sw.js', { scope: '/sw-test/' })
        .then(reg => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch(error => {
            console.log('Registration failed with ' + error);
        });
}