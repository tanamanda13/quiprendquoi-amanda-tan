/** API PUSH FAILED */
// const webpush = require('web-push');
// if ('serviceWorker' in navigator && 'PushManager' in window) { 
//   console.log('API push suported')
//   // Aks permission to send notification
//   Notification.requestPermission().then(function (result) {
//     if (result === 'granted') {
//         navigator.serviceWorker.register('sw.js');
//         navigator.serviceWorker.ready.then(function (registration) {
//             return registration.pushManager.subscribe({
//               userVisibleOnly: true,
//               applicationServerKey: urlBase64ToUint8Array('BI28ouNYrNLr5WKpu1d92a-RRN25LKhHu08vdpsdmrbR9myyM604OAHAJzW3S-nmp1QgpzfMMdQLreiTG0zhrsQ')
//             }).then(function (pushSubscription) {
//                 // console.log('type', JSON.stringify(pushSubscription));
//         //         localStorage.setItem('user-push', JSON.stringify(pushSubscription));
//                 const subscriptionObject = JSON.parse(JSON.stringify(pushSubscription));
//                 sendSubscriptionToBackEnd(subscriptionObject)
//             }
//         //         // webpush.setVapidDetails('mailto:tanamanda13@gmail.com', `${process.env.PUBLIC_KEY}`, `${process.env.PRIVATE_KEY}`);
//         //         // VAPID keys should only be generated only once.
//         //         // const vapidKeys = webpush.generateVAPIDKeys();
//         //         // console.log('kiki', vapidKeys.publicKey);

//         //         // webpush.setVapidDetails('mailto:tanamanda13@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);
//         //         const infosubscription = JSON.parse(localStorage.getItem('user-push'));
//         //         console.log('infos', infosubscription.keys.auth)

//         //         // const pushSubscriptionSend = {
//         //         //     endpoint: `"${infosubscription.endpoint}"`,
//         //         //     keys: {
//         //         //         auth: `"${infosubscription.keys.auth}"`,
//         //         //         p256dh: `"${infosubscription.keys.p256dh}"`
//         //         //     }
//         //         // };
//         //         const pushSubscriptionSend = {
//         //             endpoint: infosubscription.endpoint,
//         //             keys: {
//         //                 auth: infosubscription.keys.auth,
//         //                 p256dh: infosubscription.keys.p256dh
//         //             }
//         //         };

//         //         webpush.sendNotification(pushSubscriptionSend, 'Here a notification');
//         //     });
//         // })
        
//         )}
//     )}
//   })
// }
// else 
// {
//   console.log('API push NOT supported')
// }

// /**
//  * urlBase64ToUint8Array
//  * 
//  * @param {string} base64String a public vavid key
//  */
// function urlBase64ToUint8Array(base64String) {
//   var padding = '='.repeat((4 - base64String.length % 4) % 4);
//   var base64 = (base64String + padding)
//       .replace(/\-/g, '+')
//       .replace(/_/g, '/');

//   var rawData = window.atob(base64);
//   var outputArray = new Uint8Array(rawData.length);

//   for (var i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// /**
//  * Sending the subscription
//  * to the Backend
//  */
// function sendSubscriptionToBackEnd(subscription) {
//   // return fetch(`${process.env.FRONT_URL}:${process.env.PORT}`, {
//   return fetch('http://localhost:3000/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(subscription)
//   })
//   .then(function(response) {
//     if (!response.ok) {
//       throw new Error('Bad status code from server.');
//     }

//     return response.json();
//   })
//   .then(function(responseData) {
//     if (!(responseData.data && responseData.data.success)) {
//       throw new Error('Bad response from server.');
//     }
//   });
// }