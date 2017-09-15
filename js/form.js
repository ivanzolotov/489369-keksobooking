'use strict';

(function () {

  var form = document.querySelector('.notice__form');
  var timeinSelect = form.querySelector('.timein');
  var timeoutSelect = form.querySelector('.timeout');
  var typeSelect = form.querySelector('.type');
  var priceInput = form.querySelector('.price');
  var roomsSelect = form.querySelector('.room_number');

  function uploadForm() {
    var successHandler = function () {
      window.form.resetForm();
    };
    var errorHandler = function (message) {
      window.flash(message);
    };
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(form), successHandler, errorHandler);
    });
  }

  function resetForm() {
    for (var i = 0; i < form.elements.length; i++) {
      var element = form.elements[i];
      if (element.tagName === 'INPUT' && element.type === 'checkbox') {
        element.checked = false;
      } else if (element.tagName === 'INPUT') {
        element.value = '';
      }
    }
    typeSelect.value = 'flat';
    timeinSelect.value = '12:00';
    timeoutSelect.value = '12:00';
    roomsSelect.value = 1;
    setMinimumPrice();
    setCapacity();
  }

  function makeTimesReactive() {
    var TIMES = ['12:00', '13:00', '14:00'];
    timeinSelect.addEventListener('change', function () {
      window.synchronizeFields(timeinSelect, timeoutSelect, TIMES, TIMES);
    });
    timeoutSelect.addEventListener('change', function () {
      window.synchronizeFields(timeoutSelect, timeinSelect, TIMES, TIMES);
    });
  }

  function makeMinimumPriceReactive() {
    typeSelect.addEventListener('change', setMinimumPrice);
    setMinimumPrice();
  }

  function makeCapacityReactive() {
    roomsSelect.addEventListener('change', setCapacity);
    setCapacity();
  }

  function makeFormValidatable() {
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].addEventListener('invalid', function (evt) {
        evt.target.style.outline = '2px solid red';
      });
    }
  }

  function setMinimumPrice() {
    var PRICES_BY_TYPE = [
      [0, 1000, 10000],
      ['bungalo', 'flat', 'house'],
    ];
    window.synchronizeFields(typeSelect, priceInput, PRICES_BY_TYPE[1], PRICES_BY_TYPE[0], function (element, value) {
      element.min = value;
    });
  }

  function setCapacity() {
    var capacityText = ['не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];
    var capacitySelectDomElement = document.getElementById('capacity');
    capacitySelectDomElement.innerHTML = '';
    if (roomsSelect.value === '100') {
      capacitySelectDomElement.appendChild(new Option(capacityText[0], 0));
    } else {
      for (var i = roomsSelect.value; i > 0; i--) {
        var option = new Option(capacityText[i], i);
        capacitySelectDomElement.appendChild(option);
      }
    }
  }

  function setAddress(value) {
    var addressInputDomElement = document.getElementById('address');
    addressInputDomElement.value = value;
  }

  window.form = {
    uploadForm: uploadForm,
    resetForm: resetForm,
    makeTimesReactive: makeTimesReactive,
    makeMinimumPriceReactive: makeMinimumPriceReactive,
    makeCapacityReactive: makeCapacityReactive,
    makeFormValidatable: makeFormValidatable,
    setAddress: setAddress,
  };

})();
