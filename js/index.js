'use strict';

(function () {

  var INITIAL_OFFERS_QUANTITY = 8;

  window.data.getInitialOffers(INITIAL_OFFERS_QUANTITY, window.mapPins.drawAllPinElements);
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

  var filters = document.querySelector('.tokyo__filters');
  for (var i = 0; i < filters.elements.length; i++) {
    var element = filters.elements[i];
    element.addEventListener('change', function () {
      window.mapPins.clearAllPinElements();
      window.mapPins.drawAllPinElements();
    });
  }

})();
