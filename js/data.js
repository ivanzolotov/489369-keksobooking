'use strict';

(function () {

  var INITIAL_OFFERS_QUANTITY = 8;
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

  var offers = [];
  var nextOfferIndex = 1;

  generateInitialOffers(INITIAL_OFFERS_QUANTITY);

  // [?] Может быть имеет смысл сделать ещё один модуль типа
  //     index.js, подключить его самым последним и унести
  //     в него то, что *делают* модули, в данном случае -
  //     var INITIAL_OFFERS_QUANTITY = 8;
  //     generateInitialOffers(INITIAL_OFFERS_QUANTITY);

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
      addOffer(createOffer());
    }
  }

  window.data = {
    getOffers: getOffers,
    addOffer: addOffer, // Не используется снаружи (но, возможно, будет)
    createOffer: createOffer, // Не используется снаружи (но, возможно, будет)
    generateInitialOffers: generateInitialOffers, // Не используется снаружи (но, возможно, будет)
  };

})();
