'use strict';

var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_TIMES = OFFER_CHECKIN_TIMES;
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_ROOMS_MAX = 5;
var OFFER_GUESTS_MAX = 10;
var PIN_WIDTH = 56;
var PIN_HEIGHT = 75;

var DICTIONARY = {
  flat: 'квартира',
  bungalo: 'бунгало',
  house: 'дом',
};

var offersQuantity = 8;
var fakeTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var offers = [];
var pinElements = [];
for (var i = 0; i < offersQuantity; i++) {
  offers.push(makeFakeOffer(i));
  pinElements.push(makePinElement(offers[i]));
}
insertElementsToDom(pinElements, document.querySelector('.tokyo__pin-map'));
redrawLodgeTemplate(offers[0]);


function insertElementsToDom(elements, destination) {
  var fragment = document.createDocumentFragment();
  for (var index = 0; index < elements.length; index++) {
    fragment.appendChild(elements[index]);
  }
  destination.appendChild(fragment);  
}

function makePinElement(data) {
  var image = document.createElement('img');
  image.src = data.author.avatar;
  image.width = '40';
  image.height = '40';
  image.classList.add('rounded');
  var element = document.createElement('div');
  element.classList.add('pin');
  element.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
  element.style.top = (data.location.y - PIN_HEIGHT) + 'px';
  element.appendChild(image);
  return element;
}

function makeFakeOffer(index) {
  var result = {
    author: {
      avatar: 'img/avatars/user' + (index < 9 ? '0' + (index + 1) : (index + 1)) + '.png',
    },
    offer: {
      title: extractRandomElement(fakeTitles),
      price: getRandomInteger(1000, 100000),
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomInteger(1, OFFER_ROOMS_MAX),
      guests: getRandomInteger(1, OFFER_GUESTS_MAX),
      checkin: getRandomElement(OFFER_CHECKIN_TIMES),
      checkout: getRandomElement(OFFER_CHECKOUT_TIMES),
      features: getRandomElements(OFFER_FEATURES),
      description: '',
      photos: [],
    },
    location: {
      x: getRandomInteger(300, 900),
      y: getRandomInteger(100, 500),
    },
  };
  result.offer.address = result.location.x + ', ' + result.location.y;
  return result;
}

/** 
 * Заполняет шаблон #lodge-template переданными данными о предложении
 * и отрисовывает его вместо уже имеющегося блока .dialog__panel
 * @param {object} data
 */
function redrawLodgeTemplate(data) {
  var makeLodgeFeaturesSpans = function (features) {
    var result = '';
    for (var index = 0; index < features.length; index++) {
      result += '<span class="feature__image feature__image--' + features[index] + '"></span>';
    }
    return result;
  };
  var template = document.getElementById('lodge-template').content;
  template.querySelector('.lodge__title').textContent = data.offer.title;
  template.querySelector('.lodge__address').textContent = data.offer.address;
  template.querySelector('.lodge__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
  template.querySelector('.lodge__type').textContent = capitalizeFirstLetter(DICTIONARY[data.offer.type]);
  template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  template.querySelector('.lodge__features').innerHTML = makeLodgeFeaturesSpans(data.offer.features);
  template.querySelector('.lodge__description').textContent = data.offer.description;
  var replace = document.querySelector('.dialog__panel');
  replace.parentNode.replaceChild(template, replace);
  document.querySelector('.dialog__title > img').src = data.author.avatar;
}

function extractRandomElement(array) {
  return array.splice(getRandomInteger(0, array.length - 1), 1)[0];
}

function getRandomElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getRandomElements(array) {
  var result = [];
  var quantity = getRandomInteger(1, array.length);
  for (var index = 0; index < quantity; index++) {
    result.push(extractRandomElement(array));
  }
  return result;
}

function getRandomInteger(from, to) {
  return Math.round(Math.random() * (to - from) + from);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
