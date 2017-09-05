'use strict';

(function () {

  // Синхронизируем время выезда и времени заезда
  var noticeFormDomElement = document.querySelector('.notice__form');
  var timeinSelectDomElement = noticeFormDomElement.querySelector('select[name=timein]');
  var timeoutSelectDomElement = noticeFormDomElement.querySelector('select[name=timeout]');
  timeinSelectDomElement.addEventListener('change', function (evt) {
    window.utilites.cloneElementValue(evt.target, timeoutSelectDomElement);
  });
  timeoutSelectDomElement.addEventListener('change', function (evt) {
    window.utilites.cloneElementValue(evt.target, timeinSelectDomElement);
  });

  // Устанавливаем минимальную цену за ночь в соответствии с типом жилья
  var typeSelectDomElement = noticeFormDomElement.querySelector('select[name=type]');
  typeSelectDomElement.addEventListener('change', setMinimumPrice);
  setMinimumPrice();

  // Устанавливаем количество мест в соответствии с количеством комнат
  var roomsSelectDomElement = noticeFormDomElement.querySelector('select[name=rooms]');
  roomsSelectDomElement.addEventListener('change', setCapacity);
  setCapacity();

  // Навешиваем на все элементы формы обработчик-валидатор
  appendUniversalValidator();

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

  function appendUniversalValidator() {
    for (var i = 0; i < noticeFormDomElement.elements.length; i++) {
      noticeFormDomElement.elements[i].addEventListener('invalid', function (evt) {
        evt.target.style.outline = '2px solid red';
      });
    }
  }

  window.form = {
    setMinimumPrice: setMinimumPrice, // Не используется снаружи
    setCapacity: setCapacity, // Не используется снаружи
    appendUniversalValidator: appendUniversalValidator, // Не используется снаружи
  };

})();
