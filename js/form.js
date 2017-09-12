'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var timeinSelect = noticeForm.querySelector('select[name=timein]');
  var timeoutSelect = noticeForm.querySelector('select[name=timeout]');
  var typeSelect = noticeForm.querySelector('select[name=type]');
  var priceInput = noticeForm.querySelector('input[name=price]');
  var roomsSelect = noticeForm.querySelector('select[name=rooms]');

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
    for (var i = 0; i < noticeForm.elements.length; i++) {
      noticeForm.elements[i].addEventListener('invalid', function (evt) {
        evt.target.style.outline = '2px solid red';
      });
    }
  }

  function setMinimumPrice() {
    var PRICES_BY_TYPE = [
      [0, 1000, 5000, 10000],
      ['bungalo', 'flat', 'house', 'palace'],
    ];
    window.synchronizeFields(typeSelect, priceInput, PRICES_BY_TYPE[1], PRICES_BY_TYPE[0], function (element, value) {
      element.min = value;
    });
  }

  function setCapacity() {
    var capacityText = ['не для гостей', 'для 1 гостя', 'для 2 гостей', 'для 3 гостей'];
    var capacitySelectDomElement = noticeForm.querySelector('select[name=capacity]');
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
    var addressInputDomElement = noticeForm.querySelector('input[name=address]');
    addressInputDomElement.value = value;
  }

  window.form = {
    makeTimesReactive: makeTimesReactive,
    makeMinimumPriceReactive: makeMinimumPriceReactive,
    makeCapacityReactive: makeCapacityReactive,
    makeFormValidatable: makeFormValidatable,
    setAddress: setAddress,
  };

})();
