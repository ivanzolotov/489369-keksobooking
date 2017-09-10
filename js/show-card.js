'use strict';

(function () {

  var offerDialogDomElement = document.getElementById('offer-dialog');
  var dialogCloseDomElement = offerDialogDomElement.querySelector('.dialog__close');

  function showCard(evt) {
    var target = evt.target;
    if (evt.type === 'click' && target.tagName === 'IMG') {
      target = target.parentNode;
    }
    if (evt.type === 'keydown' && !window.utils.isEnterPressed(evt)) {
      return;
    }
    window.mapPins.setActivePin(target);
    window.drawCard(window.mapPins.getActivePinIndex());
    if (offerDialogDomElement.classList.contains('hidden')) {
      offerDialogDomElement.classList.remove('hidden');
      dialogCloseDomElement.addEventListener('click', closeCard);
      document.body.addEventListener('keydown', closeCard);
    }
  }

  function closeCard(evt) {
    if (evt.type === 'keydown' && evt.target === dialogCloseDomElement && window.utils.isEnterPressed(evt) ||
        evt.type === 'keydown' && window.utils.isEscPressed(evt) ||
        evt.type === 'click') {
      evt.preventDefault();
      offerDialogDomElement.classList.add('hidden');
      window.mapPins.setActivePin();
      dialogCloseDomElement.removeEventListener('click', closeCard);
      document.body.removeEventListener('keydown', closeCard);
    }
  }

  window.showCard = showCard;

})();
