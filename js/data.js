'use strict';

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

  var offers = [];
  var limit = Infinity;
  var nextOfferIndex = 1;

  function setLimit(number) {
    limit = number;
  }

  function getOffers() {
    return offers.filter(window.filter.filterOffers).slice(0, limit);
  }

  function addOffer(offer) {
    offers.push(offer);
  }

  function createOffer() {
    var offerIndex = nextOfferIndex++;
    var result = {
      author: {
        avatar: 'img/avatars/user' + window.utils.addLeadingZero(offerIndex) + '.png',
      },
      offer: {
        title: window.utils.extractRandomElement(OFFER.TITLES),
        price: window.utils.getRandomInteger(OFFER.PRICE_MIN, OFFER.PRICE_MAX),
        type: window.utils.getRandomElement(OFFER.TYPES),
        rooms: window.utils.getRandomInteger(OFFER.ROOMS_MIN, OFFER.ROOMS_MAX),
        guests: window.utils.getRandomInteger(OFFER.GUESTS_MIN, OFFER.GUESTS_MAX),
        checkin: window.utils.getRandomElement(OFFER.CHECKIN_TIMES),
        checkout: window.utils.getRandomElement(OFFER.CHECKOUT_TIMES),
        features: window.utils.getRandomElements(OFFER.FEATURES),
        description: '',
        photos: [],
      },
      location: {
        x: window.utils.getRandomInteger(300, 900),
        y: window.utils.getRandomInteger(100, 500),
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

  function getInitialOffers(cb) {
    window.backend.load(function (data) {
      data = data.filter(function (offer) {
        return offer.author.avatar !== 'img/avatars/default.png';
      });
      for (var i = 0; i < data.length; i++) {
        addOffer(data[i]);
      }
      cb();
    }, function (message) {
      window.flash(message);
    });
  }

  window.data = {
    getOffers: getOffers,
    generateInitialOffers: generateInitialOffers,
    getInitialOffers: getInitialOffers,
    setLimit: setLimit,
  };

})();
