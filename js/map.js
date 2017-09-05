'use strict';


// [!] Модуль utilites переложить в utilites.js

(function () {

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

  window.utilites = {
    capitalize: capitalize,
    addLeadingZero: addLeadingZero,
    getRandomInteger: getRandomInteger,
    extractRandomElement: extractRandomElement,
    getRandomElement: getRandomElement,
    getRandomElements: getRandomElements,
    insertElementsToDom: insertElementsToDom,
  };

})();


// [!] Модуль offers переложить в offers.js

(function () {

  var OFFER = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    PRICE_MIN: 1000,
    PRICE_MAX: 1000000,
    ROOMS_MIN: 1,
    ROOMS_MAX: 5,
    GUESTS_MIN: 1,
    GUESTS_MAX: 10,
    CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
    CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
    TYPES: ['flat', 'house', 'bungalo'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  };
  var DICTIONARY = {
    flat: 'квартира',
    bungalo: 'бунгало',
    house: 'дом',
  };
  var PIN_WIDTH = 56;
  var PIN_HALF_WIDTH = PIN_WIDTH / 2;
  var PIN_HEIGHT = 75;

  // States
  // Если данные о предложениях откуда-то будут подтягиваться, это можно будет сделать здесь
  var offers = [];
  var nextOfferIndex = 1;

  function getOffers() {
    return offers;
  }

  function addOffer(offer) {
    offers.push(offer);
  }

  function createOffer() {
    var offerIndex = nextOfferIndex++;
    var result = {
      author: {
        avatar: 'img/avatars/user' + window.utilites.addLeadingZero(offerIndex) + '.png',
      },
      offer: {
        title: window.utilites.extractRandomElement(OFFER.TITLES),
        price: window.utilites.getRandomInteger(OFFER.PRICE_MIN, OFFER.PRICE_MAX),
        type: window.utilites.getRandomElement(OFFER.TYPES),
        rooms: window.utilites.getRandomInteger(OFFER.ROOMS_MIN, OFFER.ROOMS_MAX),
        guests: window.utilites.getRandomInteger(OFFER.GUESTS_MIN, OFFER.GUESTS_MAX),
        checkin: window.utilites.getRandomElement(OFFER.CHECKIN_TIMES),
        checkout: window.utilites.getRandomElement(OFFER.CHECKOUT_TIMES),
        features: window.utilites.getRandomElements(OFFER.FEATURES),
        description: '',
        photos: [],
      },
      location: {
        x: window.utilites.getRandomInteger(300, 900),
        y: window.utilites.getRandomInteger(100, 500),
      },
    };
    result.offer.address = result.location.x + ', ' + result.location.y;
    return result;
  }

  function generateInitialOffers(quantity) {
    for (var i = 0; i < quantity; i++) {
      window.offers.addOffer(createOffer());
    }
  }

  function makePinElement(index) {
    var image = document.createElement('img');
    image.classList.add('rounded');
    image.src = offers[index].author.avatar;
    image.width = '40';
    image.height = '40';
    var div = document.createElement('div');
    div.classList.add('pin');
    div.style.left = (offers[index].location.x - PIN_HALF_WIDTH) + 'px';
    div.style.top = (offers[index].location.y - PIN_HEIGHT) + 'px';
    div.tabIndex = 0;
    div.appendChild(image);
    return div;
  }

  function makeAllPinElements() {
    var result = [];
    for (var i = 0; i < offers.length; i++) {
      result.push(makePinElement(i));
    }
    return result;
  }

  function drawAllPinElements() {
    window.utilites.insertElementsToDom(makeAllPinElements(), document.querySelector('.tokyo__pin-map'));
  }

  function makeDialogPanelElement(index) {
    var template = document.getElementById('lodge-template').content;
    var newDialogPanelElement = template.cloneNode(true);
    newDialogPanelElement = fillDialogPanelElement(newDialogPanelElement, index);
    return newDialogPanelElement;
  }

  function fillDialogPanelElement(newDialogPanelElement, index) {
    newDialogPanelElement.querySelector('.lodge__title').textContent = offers[index].offer.title;
    newDialogPanelElement.querySelector('.lodge__address').textContent = offers[index].offer.address;
    newDialogPanelElement.querySelector('.lodge__price').innerHTML = offers[index].offer.price + '&#x20bd;/ночь';
    newDialogPanelElement.querySelector('.lodge__type').textContent = window.utilites.capitalize(DICTIONARY[offers[index].offer.type]);
    newDialogPanelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offers[index].offer.guests + ' гостей в ' + offers[index].offer.rooms + ' комнатах';
    newDialogPanelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offers[index].offer.checkin + ', выезд до ' + offers[index].offer.checkout;
    newDialogPanelElement.querySelector('.lodge__features').innerHTML = makeLodgeFeaturesSpans(offers[index].offer.features);
    newDialogPanelElement.querySelector('.lodge__description').textContent = offers[index].offer.description;
    return newDialogPanelElement;
  }

  function drawDialogPanelElement(index) {
    index = index || 0;
    var offerDialogElement = document.getElementById('offer-dialog');
    var newDialogPanelElement = makeDialogPanelElement(index);
    var oldDialogPanelElement = offerDialogElement.querySelector('.dialog__panel');
    offerDialogElement.replaceChild(newDialogPanelElement, oldDialogPanelElement);
    drawDialogTitleElement(index);
  }

  function drawDialogTitleElement(index) {
    var offerDialogElement = document.getElementById('offer-dialog');
    offerDialogElement.querySelector('.dialog__title > img').src = offers[index].author.avatar;
  }

  function makeLodgeFeaturesSpans(features) {
    var result = '';
    for (var i = 0; i < features.length; i++) {
      result += '<span class="feature__image feature__image--' + features[i] + '"></span>';
    }
    return result;
  }

  window.offers = {
    getOffers: getOffers,
    addOffer: addOffer,
    createOffer: createOffer,
    generateInitialOffers: generateInitialOffers,
    makePinElement: makePinElement,
    makeAllPinElements: makeAllPinElements,
    drawAllPinElements: drawAllPinElements,
    makeDialogPanelElement: makeDialogPanelElement,
    fillDialogPanelElement: fillDialogPanelElement,
    drawDialogPanelElement: drawDialogPanelElement,
    drawDialogTitleElement: drawDialogTitleElement,
    makeLodgeFeaturesSpans: makeLodgeFeaturesSpans,
  };

})();


// [!] Модуль main переложить в main.js

(function () {
  // generateInitialOffers
  var INITIAL_OFFERS_QUANTITY = 8;
  window.offers.generateInitialOffers(INITIAL_OFFERS_QUANTITY);
  window.offers.drawAllPinElements();
  window.offers.drawDialogPanelElement();
})();


// [!] Модуль про показ/скрытие карточки объявления

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var activePin;

  var offerDialogDomElement = document.getElementById('offer-dialog');
  var dialogCloseDomElement = offerDialogDomElement.querySelector('.dialog__close');
  var tokyoPinMapDomElement = document.querySelector('.tokyo__pin-map');

  tokyoPinMapDomElement.addEventListener('click', tokyoPinMapDomElementClickHandler);
  tokyoPinMapDomElement.addEventListener('keydown', tokyoPinMapDomElementKeydownHandler);

  function tokyoPinMapDomElementClickHandler(evt) {
    var target = evt.target;
    while (target !== tokyoPinMapDomElement) {
      if (target.tagName === 'DIV' && !target.classList.contains('pin__main')) {
        activatePin(target);
        window.offers.drawDialogPanelElement(getPinIndex(activePin));
        openDialog();
        return;
      }
      target = target.parentNode;
    }
  }

  function tokyoPinMapDomElementKeydownHandler(evt) {
    if (isEnterPressed(evt)) {
      activatePin(evt.target);
      window.offers.drawDialogPanelElement(getPinIndex(activePin));
      openDialog();
    }
  }

  function dialogCloseDomElementKeydownHandler(evt) {
    if (isEnterPressed(evt)) {
      closeDialog();
    }
  }

  function bodyKeydownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      closeDialog();
    }
  }

  function isEnterPressed(evt) {
    return evt.keyCode === ENTER_KEYCODE;
  }

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function getPinIndex(pin) {
    var pins = document.querySelectorAll('.pin:not(.pin__main)');
    return Array.prototype.indexOf.call(pins, pin);
  }

  function isDialogOpened() {
    return !offerDialogDomElement.classList.contains('hidden');
  }

  function openDialog() {
    if (!isDialogOpened()) {
      offerDialogDomElement.classList.remove('hidden');
      dialogCloseDomElement.addEventListener('click', closeDialog);
      dialogCloseDomElement.addEventListener('keydown', dialogCloseDomElementKeydownHandler);
      document.body.addEventListener('keydown', bodyKeydownHandler);
    }
  }

  function closeDialog() {
    offerDialogDomElement.classList.add('hidden');
    dialogCloseDomElement.removeEventListener('click', closeDialog);
    dialogCloseDomElement.removeEventListener('keydown', dialogCloseDomElementKeydownHandler);
    document.body.removeEventListener('keydown', bodyKeydownHandler);
    activatePin();
  }

  function activatePin(pin) {
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
    activePin = pin;
    if (pin) {
      pin.classList.add('pin--active');
    }
  }

  window.dialog = {
    tokyoPinMapDomElementClickHandler: tokyoPinMapDomElementClickHandler,
    tokyoPinMapDomElementKeydownHandler: tokyoPinMapDomElementKeydownHandler,
    dialogCloseDomElementKeydownHandler: dialogCloseDomElementKeydownHandler,
    bodyKeydownHandler: bodyKeydownHandler,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    getPinIndex: getPinIndex,
    isDialogOpened: isDialogOpened,
    openDialog: openDialog,
    closeDialog: closeDialog,
    activatePin: activatePin,
  };

})();


// [!] Модуль noticeForm переложить в notice-form.js

(function () {

  // Синхронизируем время выезда и времени заезда
  var noticeFormDomElement = document.querySelector('.notice__form');
  var timeinSelectDomElement = noticeFormDomElement.querySelector('select[name=timein]');
  var timeoutSelectDomElement = noticeFormDomElement.querySelector('select[name=timeout]');
  timeinSelectDomElement.addEventListener('change', syncTimeInAndTimeOut);
  timeoutSelectDomElement.addEventListener('change', syncTimeInAndTimeOut);

  // Устанавливаем минимальную цену за ночь в соответствии с типом жилья
  var typeSelectDomElement = noticeFormDomElement.querySelector('select[name=type]');
  typeSelectDomElement.addEventListener('change', setMinimumPrice);
  setMinimumPrice();

  // Устанавливаем количество мест в соответствии с количеством комнат
  var roomsSelectDomElement = noticeFormDomElement.querySelector('select[name=rooms]');
  roomsSelectDomElement.addEventListener('change', setCapacity);
  setCapacity();

  // Навешиваем на все элементы формы обработчик-валидатор
  appendUniversalValidator();

  function syncTimeInAndTimeOut(evt) {
    timeinSelectDomElement.value = evt.target.value;
    timeoutSelectDomElement.value = evt.target.value;
  }

  function setMinimumPrice() {
    var priceInputDomElement = noticeFormDomElement.querySelector('input[name=price]');
    var price = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000,
    };
    priceInputDomElement.setAttribute('min', price[typeSelectDomElement.value]);
  }

  function setCapacity() {
    var capacityText = ['не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];
    var capacitySelectDomElement = noticeFormDomElement.querySelector('select[name=capacity]');
    capacitySelectDomElement.innerHTML = '';
    if (roomsSelectDomElement.value === '100') {
      capacitySelectDomElement.appendChild(new Option(capacityText[0], 0));
    } else {
      for (var i = roomsSelectDomElement.value; i > 0; i--) {
        var option = new Option(capacityText[i], i);
        capacitySelectDomElement.appendChild(option);
      }
    }
  }

  function appendUniversalValidator() {
    for (var i = 0; i < noticeFormDomElement.elements.length; i++) {
      noticeFormDomElement.elements[i].addEventListener('invalid', function (evt) {
        evt.target.style.outline = '2px solid red';
      });
    }
  }

  window.noticeForm = {
    syncTimeInAndTimeOut: syncTimeInAndTimeOut,
    setMinimumPrice: setMinimumPrice,
    setCapacity: setCapacity,
    appendUniversalValidator: appendUniversalValidator,
  };

})();
