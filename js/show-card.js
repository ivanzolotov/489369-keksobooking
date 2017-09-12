'use strict';

(function () {

  var offerDialog = document.getElementById('offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

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
    if (offerDialog.classList.contains('hidden')) {
      offerDialog.classList.remove('hidden');
      dialogClose.addEventListener('click', closeCard);
      document.body.addEventListener('keydown', closeCard);
    }
  }

  function closeCard(evt) {
    if (evt.type === 'keydown' && evt.target === dialogClose && window.utils.isEnterPressed(evt) ||
        evt.type === 'keydown' && window.utils.isEscPressed(evt) ||
        evt.type === 'click') {
      evt.preventDefault();
      offerDialog.classList.add('hidden');
      window.mapPins.setActivePin();
      dialogClose.removeEventListener('click', closeCard);
      document.body.removeEventListener('keydown', closeCard);
    }
  }

  window.showCard = showCard;

})();
