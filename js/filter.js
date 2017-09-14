'use strict';

(function () {

  var PRICE_LOW_MAX = 10000;
  var PRICE_MIDDLE_MAX = 50000;

  var filters = document.querySelector('.tokyo__filters');

  function typeFilter(offer) {
    var value = filters.querySelector('#housing_type').value;
    return value === 'any' ? true : offer.offer.type === value;
  }

  function priceFilter(offer) {
    var value = filters.querySelector('#housing_price').value;
    switch (value) {
      case 'low':
        return offer.offer.price < PRICE_LOW_MAX;
      case 'middle':
        return offer.offer.price >= PRICE_LOW_MAX && offer.offer.price < PRICE_MIDDLE_MAX;
      case 'high':
        return offer.offer.price >= PRICE_MIDDLE_MAX;
      default:
        return true;
    }
  }

  function roomFilter(offer) {
    var value = filters.querySelector('#housing_room-number').value;
    return value === 'any' ? true : offer.offer.rooms === +value;
  }

  function guestsFilter(offer) {
    var value = filters.querySelector('#housing_guests-number').value;
    return value === 'any' ? true : offer.offer.guests === +value;
  }

  function featureFilter(offer) {
    var fieldset = filters.querySelector('#housing_features');
    var offerFeatures = offer.offer.features;
    var checkedFeatures = [];
    for (var i = 0; i < fieldset.elements.length; i++) {
      var checkbox = fieldset.elements[i];
      if (checkbox.checked) {
        checkedFeatures.push(checkbox.value);
      }
    }
    var allCheckedFeaturesAreInOffer = checkedFeatures.reduce(function (accumulator, feature) {
      return accumulator && offerFeatures.indexOf(feature) > -1;
    }, true);
    return allCheckedFeaturesAreInOffer;
  }

  function filterOffers(offer) {
    return typeFilter(offer) && priceFilter(offer) && roomFilter(offer) && guestsFilter(offer) && featureFilter(offer);
  }

  function makeFiltersWork() {
    for (var i = 0; i < filters.elements.length; i++) {
      var element = filters.elements[i];
      element.addEventListener('change', function () {
        window.debounce(window.mapPins.renderPins);
      });
    }
  }

  window.filter = {
    filterOffers: filterOffers,
    makeFiltersWork: makeFiltersWork,
  };

})();
