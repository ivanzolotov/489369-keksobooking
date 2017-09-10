'use strict';

(function () {
  var INITIAL_OFFERS_QUANTITY = 8;

  window.data.generateInitialOffers(INITIAL_OFFERS_QUANTITY);
  window.mapPins.drawAllPinElements();
  window.mapPinMain.displayAddress();
  window.mapPinMain.makeMainPinDraggable();

  var tokyoPinMapDomElement = document.querySelector('.tokyo__pin-map');
  tokyoPinMapDomElement.addEventListener('click', window.showCard);
  tokyoPinMapDomElement.addEventListener('keydown', window.showCard);

  window.form.syncTimeinAndTimeout();
  window.form.makeMinimumPriceReactive();
  window.form.makeCapacityReactive();
  window.form.makeFormValidatable();
})();
