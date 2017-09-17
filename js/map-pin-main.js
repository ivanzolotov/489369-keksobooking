'use strict';

(function () {

  var PIN_MAIN_WIDTH = 75;
  var PIN_MAIN_HALF_WIDTH = Math.floor(PIN_MAIN_WIDTH / 2);
  var PIN_MAIN_HEIGHT = 94;
  var PIN_LEFT_MIN = 0;
  var PIN_LEFT_MAX = 1200 - PIN_MAIN_WIDTH;
  var PIN_TOP_MIN = 100;
  var PIN_TOP_MAX = 650 - PIN_MAIN_HEIGHT;

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
    var pinLeft = pinMain.offsetLeft - shift.x;
    var pinTop = pinMain.offsetTop - shift.y;
    if (pinLeft >= PIN_LEFT_MIN && pinLeft <= PIN_LEFT_MAX && pinTop >= PIN_TOP_MIN && pinTop <= PIN_TOP_MAX) {
      startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };
      pinMain.style.left = pinLeft + 'px';
      pinMain.style.top = pinTop + 'px';
    }
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
