document.addEventListener('click', function(e) {
  if (e.target.dataset.adjournModal) {
    var modalSelector = e.target.dataset.adjournModal;
    var modal = document.querySelector(modalSelector);

    var overlay = document.createElement('div')
    overlay.classList.add('adjourn-modal-overlay');
    overlay.dataset.closeAdjournModal = modalSelector;

    modal.parentNode.insertBefore(overlay, modal);

    modal.classList.add('block');
    modal.classList.remove('hidden');
  }
});

document.addEventListener('click', function(e) {
  if (e.target.dataset.closeAdjournModal) {
    var modalSelector = e.target.dataset.closeAdjournModal;
    var modal = document.querySelector(modalSelector);

    modal.classList.add('hidden');
    modal.classList.remove('block');
    document
      .querySelector('.adjourn-modal-overlay[data-close-adjourn-modal="' + modalSelector +'"]')
      .remove();
  }
});
