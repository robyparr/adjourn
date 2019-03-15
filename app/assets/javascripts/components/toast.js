var Toast = (function() {
  toastContainer = null;

  var createToastContainer = function() {
    toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container');
    document.body.appendChild(toastContainer);
  };

  var removeToast = function(toast) {
    toast.classList.toggle('visible', false);
    setTimeout(function() {
      toast.remove();
    }, 500);
  };

  var createToast = function(message, type) {
    var toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(type);
    toast.innerText = message;

    toastContainer.appendChild(toast);
    setTimeout(function() {
      toast.classList.toggle('visible', true);
    }, 0);

    setTimeout(function() {
      removeToast(toast);
    }, 5000);

    document.addEventListener('click', function(e) {
      if (e.target === toast) {
        removeToast(toast);
      }
    });
  }

  return {
    show: function(message, type) {
      if (toastContainer === null) {
        createToastContainer();
      }
      createToast(message, type);
    }
  }
})();
