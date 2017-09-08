'use strict';

(function () {

  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HALF_WIDTH = Math.floor(PIN_MAIN_WIDTH / 2);
  var PIN_MAIN_HEIGHT = 94;

  var pinMainDomElement = document.querySelector('.pin__main');

  var startCoordinates;

  function makeMainPinDraggable() {
    pinMainDomElement.addEventListener('mousedown', mousedownHandler);
  }

  function mousedownHandler(evt) {
    evt.preventDefault();
    startCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };
    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  }

  function mousemoveHandler(evt) {
    evt.preventDefault();
    var shift = {
      x: startCoordinates.x - evt.clientX,
      y: startCoordinates.y - evt.clientY
    };
    startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    pinMainDomElement.style.top = (pinMainDomElement.offsetTop - shift.y) + 'px';
    pinMainDomElement.style.left = (pinMainDomElement.offsetLeft - shift.x) + 'px';
  }

  function mouseupHandler(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', mousemoveHandler);
    document.removeEventListener('mouseup', mouseupHandler);
    displayAddress();
  }

  function displayAddress() {
    var x = pinMainDomElement.offsetLeft + PIN_MAIN_HALF_WIDTH;
    var y = pinMainDomElement.offsetTop + PIN_MAIN_HEIGHT;
    window.form.setAddress('x: ' + x + ', y:' + y);
  }

  window.mapPinMain = {
    makeMainPinDraggable: makeMainPinDraggable,
    displayAddress: displayAddress,
  };

})();
