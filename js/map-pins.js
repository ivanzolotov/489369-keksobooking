'use strict';

(function () {

  var PIN_WIDTH = 56;
  var PIN_HALF_WIDTH = PIN_WIDTH / 2;
  var PIN_HEIGHT = 75;

  var activePin;

  function makePinElement(index) {
    var image = document.createElement('img');
    image.classList.add('rounded');
    image.src = window.data.getOffers()[index].author.avatar;
    image.width = '40';
    image.height = '40';
    var div = document.createElement('div');
    div.classList.add('pin');
    div.style.left = (window.data.getOffers()[index].location.x - PIN_HALF_WIDTH) + 'px';
    div.style.top = (window.data.getOffers()[index].location.y - PIN_HEIGHT) + 'px';
    div.tabIndex = 0;
    div.appendChild(image);
    return div;
  }

  function makeAllPinElements() {
    var result = [];
    for (var i = 0; i < window.data.getOffers().length; i++) {
      result.push(makePinElement(i));
    }
    return result;
  }

  function drawAllPinElements() {
    window.utils.insertElementsToDom(makeAllPinElements(), document.querySelector('.tokyo__pin-map'));
  }

  function setActivePin(pin) {
    if (getActivePin()) {
      getActivePin().classList.remove('pin--active');
    }
    activePin = pin;
    if (pin) {
      pin.classList.add('pin--active');
    }
  }

  function getActivePin() {
    return activePin;
  }

  function getActivePinIndex() {
    var pins = document.querySelectorAll('.pin:not(.pin__main)');
    return Array.prototype.indexOf.call(pins, activePin);
  }

  window.mapPins = {
    drawAllPinElements: drawAllPinElements,
    setActivePin: setActivePin,
    getActivePin: getActivePin,
    getActivePinIndex: getActivePinIndex,
  };

})();
