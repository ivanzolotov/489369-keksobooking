'use strict';

(function () {

  window.flash = function (message) {
    var flashAlert = document.querySelector('.alert');
    flashAlert.textContent = message;
    flashAlert.classList.remove('hidden');
    setTimeout(function () {
      flashAlert.classList.add('hidden');
    }, 5000);
  };

})();
