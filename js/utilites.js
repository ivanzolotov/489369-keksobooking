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

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }

  function getRandomInteger(from, to) {
    return Math.round(Math.random() * (to - from) + from);
  }

  function extractRandomElement(array) {
    return array.splice(getRandomInteger(0, array.length - 1), 1)[0];
  }

  function getRandomElement(array) {
    return array[getRandomInteger(0, array.length - 1)];
  }

  /** 
   * Возвращает quantity либо случайное количество случайных элементов из array.
   * 
   * @param {Array} array
   * @param {number} quantity
   * @return {Array}
   */
  function getRandomElements(array, quantity) {
    quantity = quantity || getRandomInteger(1, array.length);
    var result = [];
    var arrayCopy = array.slice();
    for (var i = 0; i < quantity; i++) {
      result.push(extractRandomElement(arrayCopy));
    }
    return result;
  }

  function insertElementsToDom(arrayOfElements, destination) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayOfElements.length; i++) {
      fragment.appendChild(arrayOfElements[i]);
    }
    destination.appendChild(fragment);
  }

  function cloneElementValue(source, target) {
    target.value = source.value;
  }

  function isEnterPressed(evt) {
    return evt.keyCode === ENTER_KEYCODE;
  }

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function translate(word) {
    return DICTIONARY[word];
  }

  window.utilites = {
    capitalize: capitalize,
    addLeadingZero: addLeadingZero,
    getRandomInteger: getRandomInteger,
    extractRandomElement: extractRandomElement,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    insertElementsToDom: insertElementsToDom,
    cloneElementValue: cloneElementValue,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    translate: translate,
  };

})();
