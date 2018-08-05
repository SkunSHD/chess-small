function askNotificationPermission() {
    return new Promise((resolve, reject) => {
            const permissionResult = Notification.requestPermission(result => resolve(result));
            if(permissionResult) {
                permissionResult.then(resolve, reject);
            }
        })
        .then((permissionResult) => permissionResult === 'granted');
}

function addNotificationSubscription(isGranted) {
    if(isGranted) {
        console.log('notificationPermission granted')
        // add subscription e.g. new groups building
    }
}

function showTestNotification() {
    navigator.serviceWorker.ready.then(function(reg) {
        var options = {
            body: 'FAMILIYA, IMYA, OCHESTVO ?!!',
            icon: 'img/logo.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        reg.showNotification('Privet, Chepuha!', options);
    });
}

export { askNotificationPermission, addNotificationSubscription, showTestNotification };
