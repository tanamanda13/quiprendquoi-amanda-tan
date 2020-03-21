if ('serviceWorker' in navigator && 'SyncManager' in window) {
  // console.log('backSync ok!')
  navigator.serviceWorker.register('/sw.js');

  navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('sync request');
  })
  .catch(() => {
    // system was unable to register for a sync,
    postDataFromThePage();
  });

}
else {
  // serviceworker/sync not supported
  console.log('backgroundSync not supported')
  postDataFromThePage();
}



function postDataFromThePage() {
  return caches.match('offline.html');
}