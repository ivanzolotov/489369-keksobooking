'use strict';

(function () {

  var offers = [];
  var limit;

  function setLimit(number) {
    limit = number;
  }

  function getOffers() {
    return offers.filter(window.filter.filterOffers).slice(0, limit);
  }

  function getInitialOffers(cb) {
    window.backend.load(function (data) {
      data = data.filter(function (offer) {
        return offer.author.avatar !== 'img/avatars/default.png';
      });
      for (var i = 0; i < data.length; i++) {
        offers.push(data[i]);
      }
      cb();
    }, function (message) {
      window.flash(message);
    });
  }

  window.data = {
    getOffers: getOffers,
    getInitialOffers: getInitialOffers,
    setLimit: setLimit,
  };

})();
