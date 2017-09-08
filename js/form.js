'use strict';

(function () {

  var noticeFormDomElement = document.querySelector('.notice__form');
  var typeSelectDomElement = noticeFormDomElement.querySelector('select[name=type]');
  var roomsSelectDomElement = noticeFormDomElement.querySelector('select[name=rooms]');

  function syncTimeinAndTimeout() {
    var timeinSelectDomElement = noticeFormDomElement.querySelector('select[name=timein]');
    var timeoutSelectDomElement = noticeFormDomElement.querySelector('select[name=timeout]');
    timeinSelectDomElement.addEventListener('change', function (evt) {
      window.utils.cloneElementValue(evt.target, timeoutSelectDomElement);
    });
    timeoutSelectDomElement.addEventListener('change', function (evt) {
      window.utils.cloneElementValue(evt.target, timeinSelectDomElement);
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

  function setAddress(value) {
    var addressInputDomElement = noticeFormDomElement.querySelector('input[name=address]');
    addressInputDomElement.value = value;
  }

  window.form = {
    syncTimeinAndTimeout: syncTimeinAndTimeout,
    makeMinimumPriceReactive: makeMinimumPriceReactive,
    makeCapacityReactive: makeCapacityReactive,
    makeFormValidatable: makeFormValidatable,
    setAddress: setAddress,
  };

})();
