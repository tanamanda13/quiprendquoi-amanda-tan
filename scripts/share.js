if (navigator.share) 
{
  console.log("Support share api ok");

  document.querySelectorAll('[data-share-url]').forEach(($shareEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Partager';
    $shareEl.parentNode.append($button);
     // Add some style
     $button.classList.add('btn__copy');

    $button.addEventListener('click', share.bind(this, $shareEl));
  });
}
else
{
  console.warn("Pas de share support")
}

function share($shareEl) {
  navigator.share({
    title: $shareEl.getAttribute('data-share-title'),
    text: $shareEl.getAttribute('data-share-text'),
    url: $shareEl.getAttribute('data-share-url'),
  });
}