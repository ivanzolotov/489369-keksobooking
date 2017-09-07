'use strict';

(function () {

  var offerDialogDomElement = document.getElementById('offer-dialog');
  var dialogCloseDomElement = offerDialogDomElement.querySelector('.dialog__close');
  var tokyoPinMapDomElement = document.querySelector('.tokyo__pin-map');

  function makeDialogTogglable() {
    tokyoPinMapDomElement.addEventListener('click', tokyoPinMapDomElementClickHandler);
    tokyoPinMapDomElement.addEventListener('keydown', tokyoPinMapDomElementKeydownHandler);
  }

  function tokyoPinMapDomElementClickHandler(evt) {
    var target = evt.target;
    while (target !== tokyoPinMapDomElement) {
      if (target.tagName === 'DIV' && !target.classList.contains('pin__main')) {
        window.mapPins.setActivePin(target);
        drawDialogPanelElement(window.mapPins.getActivePinIndex());
        openDialog();
        return;
      }
      target = target.parentNode;
    }
  }

  function tokyoPinMapDomElementKeydownHandler(evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.mapPins.setActivePin(evt.target);
      drawDialogPanelElement(window.mapPins.getActivePinIndex());
      openDialog();
    }
  }

  function dialogCloseDomElementKeydownHandler(evt) {
    if (window.utils.isEnterPressed(evt)) {
      closeDialog();
    }
  }

  function bodyKeydownHandler(evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closeDialog();
    }
  }

  function isDialogOpened() {
    return !offerDialogDomElement.classList.contains('hidden');
  }

  function openDialog() {
    if (!isDialogOpened()) {
      offerDialogDomElement.classList.remove('hidden');
      dialogCloseDomElement.addEventListener('click', closeDialog);
      dialogCloseDomElement.addEventListener('keydown', dialogCloseDomElementKeydownHandler);
      document.body.addEventListener('keydown', bodyKeydownHandler);
    }
  }

  function closeDialog() {
    offerDialogDomElement.classList.add('hidden');
    dialogCloseDomElement.removeEventListener('click', closeDialog);
    dialogCloseDomElement.removeEventListener('keydown', dialogCloseDomElementKeydownHandler);
    document.body.removeEventListener('keydown', bodyKeydownHandler);
    window.mapPins.setActivePin();
  }

  function makeLodgeFeaturesSpans(features) {
    var result = '';
    for (var i = 0; i < features.length; i++) {
      result += '<span class="feature__image feature__image--' + features[i] + '"></span>';
    }
    return result;
  }

  function fillDialogPanelElement(newDialogPanelElement, index) {
    newDialogPanelElement.querySelector('.lodge__title').textContent = window.data.getOffers()[index].offer.title;
    newDialogPanelElement.querySelector('.lodge__address').textContent = window.data.getOffers()[index].offer.address;
    newDialogPanelElement.querySelector('.lodge__price').innerHTML = window.data.getOffers()[index].offer.price + '&#x20bd;/ночь';
    newDialogPanelElement.querySelector('.lodge__type').textContent = window.utils.capitalize(window.utils.translate(window.data.getOffers()[index].offer.type));
    newDialogPanelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + window.data.getOffers()[index].offer.guests + ' гостей в ' + window.data.getOffers()[index].offer.rooms + ' комнатах';
    newDialogPanelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + window.data.getOffers()[index].offer.checkin + ', выезд до ' + window.data.getOffers()[index].offer.checkout;
    newDialogPanelElement.querySelector('.lodge__features').innerHTML = makeLodgeFeaturesSpans(window.data.getOffers()[index].offer.features);
    newDialogPanelElement.querySelector('.lodge__description').textContent = window.data.getOffers()[index].offer.description;
    return newDialogPanelElement;
  }

  function makeDialogPanelElement(index) {
    var template = document.getElementById('lodge-template').content;
    var newDialogPanelElement = template.cloneNode(true);
    newDialogPanelElement = fillDialogPanelElement(newDialogPanelElement, index);
    return newDialogPanelElement;
  }

  function drawDialogPanelElement(index) {
    index = index || 0;
    var offerDialogElement = document.getElementById('offer-dialog');
    var newDialogPanelElement = makeDialogPanelElement(index);
    var oldDialogPanelElement = offerDialogElement.querySelector('.dialog__panel');
    offerDialogElement.replaceChild(newDialogPanelElement, oldDialogPanelElement);
    drawDialogTitleElement(index);
  }

  function drawDialogTitleElement(index) {
    var offerDialogElement = document.getElementById('offer-dialog');
    offerDialogElement.querySelector('.dialog__title > img').src = window.data.getOffers()[index].author.avatar;
  }

  window.mapDialog = {
    makeDialogTogglable: makeDialogTogglable,
  };

})();
