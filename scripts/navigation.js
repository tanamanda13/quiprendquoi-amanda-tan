
if (isPartyPage(window.location.href)) {
  
  document.querySelector(".btn__back").onclick = function () {
    window.location.href = 'http://localhost:3000';


  };
}



function isPartyPage(url) {
  return /party\/[a-zA-Z0-9]*$/.test(url);
}