import isPartyPage from '../scripts/isPartyPage';

if (isPartyPage(window.location.href)) {
  
  document.querySelector(".btn__back").onclick = function () {
    window.location.href = 'http://localhost:3000';


  };
}




