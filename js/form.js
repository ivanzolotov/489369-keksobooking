'use strict';

(function () {

  var noticeFormDomElement = document.querySelector('.notice__form');
  var timeinSelectDomElement = noticeFormDomElement.querySelector('select[name=timein]');
  var timeoutSelectDomElement = noticeFormDomElement.querySelector('select[name=timeout]');
  var typeSelectDomElement = noticeFormDomElement.querySelector('select[name=type]');
  var priceInputDomElement = noticeFormDomElement.querySelector('input[name=price]');
  var roomsSelectDomElement = noticeFormDomElement.querySelector('select[name=rooms]');

  function makeTimesReactive() {
    var TIMES = ['12:00', '13:00', '14:00'];
    timeinSelectDomElement.addEventListener('change', function () {
      window.synchronizeFields(timeinSelectDomElement, timeoutSelectDomElement, TIMES, TIMES);
    });
    timeoutSelectDomElement.addEventListener('change', function () {
      window.synchronizeFields(timeoutSelectDomElement, timeinSelectDomElement, TIMES, TIMES);
    });
  }

  function makeMinimumPriceReactive() {
    typeSelectDomElement.addEventListener('change', setMinimumPrice);
    setMinimumPrice();
  }

  function makeCapacityReactive() {
    roomsSelectDomElement.addEventListener('change', setCapacity);
    setCapacity();
  }

  function makeFormValidatable() {
    for (var i = 0; i < noticeFormDomElement.elements.length; i++) {
      noticeFormDomElement.elements[i].addEventListener('invalid', function (evt) {
        evt.target.style.outline = '2px solid red';
      });
    }
  }

  function setMinimumPrice() {
    var PRICES_BY_TYPE = [
      [0, 1000, 5000, 10000],
      ['bungalo', 'flat', 'house', 'palace'],
    ];
    window.synchronizeFields(typeSelectDomElement, priceInputDomElement, PRICES_BY_TYPE[1], PRICES_BY_TYPE[0], function (element, value) {
      element.min = value;
    });
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

  function setAddress(value) {
    var addressInputDomElement = noticeFormDomElement.querySelector('input[name=address]');
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
