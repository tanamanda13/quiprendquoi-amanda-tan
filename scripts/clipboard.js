if (navigator.clipboard) {
  console.log("Support du presse papier");

  document.querySelectorAll('[data-clipboard]').forEach(($clipboardEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Copier';
    $clipboardEl.parentNode.append($button);
    $button.classList.add('btn__copy');
  });

} else {
  console.warn("Pas de support")
}