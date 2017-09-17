'use strict';

(function () {

  var APPEARING_TIME = 5000;

  function flash(message) {
    var flashAlert = document.querySelector('.alert');
    flashAlert.textContent = message;
    flashAlert.classList.remove('hidden');
    setTimeout(function () {
      flashAlert.classList.add('hidden');
    }, APPEARING_TIME);
  }

  window.flash = flash;

})();
