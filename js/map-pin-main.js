'use strict';

(function () {

  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HALF_WIDTH = Math.floor(PIN_MAIN_WIDTH / 2);
  var PIN_MAIN_HEIGHT = 94;

  var pinMain = document.querySelector('.pin__main');

  var startCoordinates;

  function makeMainPinDraggable() {
    pinMain.addEventListener('mousedown', mousedownHandler);
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
    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  }

  function mouseupHandler(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', mousemoveHandler);
    document.removeEventListener('mouseup', mouseupHandler);
    displayAddress();
  }

  function displayAddress() {
    var x = pinMain.offsetLeft + PIN_MAIN_HALF_WIDTH;
    var y = pinMain.offsetTop + PIN_MAIN_HEIGHT;
    window.form.setAddress('x: ' + x + ', y:' + y);
  }

  window.mapPinMain = {
    makeMainPinDraggable: makeMainPinDraggable,
    displayAddress: displayAddress,
  };

})();
