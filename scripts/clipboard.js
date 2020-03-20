if (navigator.clipboard) 
{
  console.log("Support du presse papier");

  document.querySelectorAll('[data-clipboard]').forEach(($clipboardEl) => {

    // Create copy button
    const $button = document.createElement('button');
    $button.innerHTML = 'Copier';
    $clipboardEl.parentNode.append($button);
      // Add some style
      $button.classList.add('btn__copy');


    $button.addEventListener(
      'click',
      copyToClipboard.bind(this, $clipboardEl, $button)
      );
     
      
  });


} 
else 
{
  console.warn("Pas de support")
}



function copyToClipboard($clipboardEl, $button) 
{
  // console.log('Click !');
  navigator.clipboard
  .writeText($clipboardEl.getAttribute('data-clipboard'))
  .then(() => {
    // console.log('Copié !');
    $button.innerHTML = 'Copié !';
    setTimeout(() => ($button.innerHTML = 'Copier'), 2000);
  })
  .catch((err) => console.warn(err));
}