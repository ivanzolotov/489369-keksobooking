'use strict';

(function () {

  var offerDialog = document.getElementById('offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  function showCard(evt) {
    var target = evt.target;
    if (evt.type === 'click' && target.tagName === 'IMG') {
      target = target.parentNode;
    }
    if (window.utils.isNotEnterPressed(evt)) {
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
    var isDialogClosePressed = window.utils.isEnterPressed(evt) && evt.target === dialogClose;
    var isEscPressed = window.utils.isEscPressed(evt);
    var isClickEvent = evt.type === 'click';
    if (isDialogClosePressed || isEscPressed || isClickEvent) {
      evt.preventDefault();
      offerDialog.classList.add('hidden');
      window.mapPins.setActivePin();
      dialogClose.removeEventListener('click', closeCard);
      document.body.removeEventListener('keydown', closeCard);
    }
  }

  window.showCard = showCard;

})();
