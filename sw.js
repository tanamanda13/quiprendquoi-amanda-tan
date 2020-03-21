addEventListener('install', (event) => {
  console.log('Hello from the service worker')
  event.waitUntil(
    caches.open('offline').then((cache) => {
      cache.add('offline.html');
    })
  );
});

addEventListener('fetch', (event) => {
  // console.log(event);
  if (event.request.headers.get('Accept').includes('text/html')) {
    // event.respondWith(new Response('Hello World'));
    // event.respondWith(fetch(event.request));
    event.respondWith(
      fetch(event.request)
      .then((res) => {
        if (isPartyPage(event.request.url)) {
          const copy = res.clone();
          caches
            .open('parties')
            .then((cache) => cache.put(event.request, copy));
          return res;
        } else {
          return res;
        }
      })
      .catch(() => {
        if (isPartyPage(event.request.url)) {
          return caches
            .match(event.request)
            .catch((err) => caches.match('offline.html'));
        } else {
          return caches.match('offline.html');
        }
      })
    );
   
  }
  else {

    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open('static').then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request)),
    );

  }
});

addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(
      // console.log('backgroundSync ok')
     caches
      .match(event.request)
      .catch((err) => caches.match('offline.html'))
    )
  }
});

/** API PUSH FAILED */

// addEventListener('push', function(event) {
//   const promise = registration.showNotification('Qui prend whaat?', {
//       body: 'Nouvelle ajout dans un évènement',
//       icon: './pwa/images/icons/icon-192x192.png',
//       vibrate: [200, 100, 200, 100, 200, 100, 200],
//       tag: 'vibration-sample'
//   });

//   event.waitUntil(promise);
// });


/**
 *
 * Check if it's a party page
 */
function isPartyPage(url) {
  return /party\/[a-zA-Z0-9]*$/.test(url);
}