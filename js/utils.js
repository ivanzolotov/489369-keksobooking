'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var DICTIONARY = {
    flat: 'квартира',
    bungalo: 'бунгало',
    house: 'дом',
  };

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function insertElementsToDom(arrayOfElements, destination) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayOfElements.length; i++) {
      fragment.appendChild(arrayOfElements[i]);
    }
    destination.appendChild(fragment);
  }

  function isEnterPressed(evt) {
    return evt.keyCode === ENTER_KEYCODE && evt.type === 'keydown';
  }

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE && evt.type === 'keydown';
  }

  function translate(word) {
    return DICTIONARY[word];
  }

  window.utils = {
    capitalize: capitalize,
    insertElementsToDom: insertElementsToDom,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    translate: translate,
  };

})();
