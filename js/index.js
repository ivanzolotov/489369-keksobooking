'use strict';

(function () {

  var INITIAL_OFFERS_QUANTITY = 8;

  window.data.generateInitialOffers(INITIAL_OFFERS_QUANTITY);
  window.mapPins.drawAllPinElements();
  window.mapPinMain.makeMainPinDraggable();
  window.mapDialog.makeDialogTogglable();
  window.form.syncTimeinAndTimeout();
  window.form.makeMinimumPriceReactive();
  window.form.makeCapacityReactive();
  window.form.makeFormValidatable();
})();
