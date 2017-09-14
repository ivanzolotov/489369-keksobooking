'use strict';

(function () {

  var APPEARING_TIME = 5000;

  window.flash = function (message) {
    var flashAlert = document.querySelector('.alert');
    flashAlert.textContent = message;
    flashAlert.classList.remove('hidden');
    setTimeout(function () {
      flashAlert.classList.add('hidden');
    }, APPEARING_TIME);
  };

})();
