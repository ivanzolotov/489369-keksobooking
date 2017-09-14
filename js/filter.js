'use strict';

(function () {

  var filters = document.querySelector('.tokyo__filters');

  var typeFilter = function (it) {
    var value = filters.querySelector('#housing_type').value;
    switch (value) {
      case 'any':
        return true;
      default:
        return it.offer.type === value;
    }
  };

  var priceFilter = function (it) {
    var value = filters.querySelector('#housing_price').value;
    switch (value) {
      case 'middle':
        return it.offer.price >= 10000 && it.offer.price < 50000;
      case 'low':
        return it.offer.price < 10000;
      case 'high':
        return it.offer.price >= 50000;
      default:
        return true;
    }
  };

  var roomFilter = function (it) {
    var value = filters.querySelector('#housing_room-number').value;
    switch (value) {
      case 'any':
        return true;
      default:
        return it.offer.rooms === +value;
    }
  };

  var guestsFilter = function (it) {
    var value = filters.querySelector('#housing_guests-number').value;
    switch (value) {
      case 'any':
        return true;
      default:
        return it.offer.guests === +value;
    }
  };

  var featureFilter = function (it) {
    var fieldset = filters.querySelector('#housing_features');
    var offerFeatures = it.offer.features;
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
  };

  window.filter = function (it) {
    return typeFilter(it) && priceFilter(it) && roomFilter(it) && guestsFilter(it) && featureFilter(it);
  };

})();
