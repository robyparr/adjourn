document.addEventListener('click', function(e) {
  if (e.target.dataset.modal) {
    var modalSelector = e.target.dataset.modal;
    var modal = document.querySelector(modalSelector);

    var overlay = document.createElement('div')
    overlay.classList.add('modal-overlay');
    overlay.dataset.closeModal = modalSelector;

    modal.parentNode.insertBefore(overlay, modal);

    modal.classList.add('block');
    modal.classList.remove('hidden');
  }
});

document.addEventListener('click', function(e) {
  if (e.target.dataset.closeModal) {
    e.preventDefault();

    var modalSelector = e.target.dataset.closeModal;
    var modal = document.querySelector(modalSelector);

    modal.classList.add('hidden');
    modal.classList.remove('block');
    document
      .querySelector('.modal-overlay[data-close-modal="' + modalSelector +'"]')
      .remove();
  }
});
