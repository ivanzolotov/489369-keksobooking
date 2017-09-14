'use strict';

(function () {

  var INITIAL_OFFERS_QUANTITY = 8;

  window.data.generateInitialOffers(INITIAL_OFFERS_QUANTITY);
  window.mapPins.drawAllPinElements();
  window.mapPinMain.displayAddress();
  window.mapPinMain.makeMainPinDraggable();

  // Make show/close card work propetly
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  tokyoPinMap.addEventListener('click', window.showCard);
  tokyoPinMap.addEventListener('keydown', window.showCard);

  window.form.makeTimesReactive();
  window.form.makeMinimumPriceReactive();
  window.form.makeCapacityReactive();
  window.form.makeFormValidatable();
  window.form.uploadForm();

})();
