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
        .catch(() => caches.match('offline.html')
      )
    );
   
  }
});