var AdjournAutocomplete = (function() {
  var autocompleteTextboxSelector;
  var autocompleteTextbox;
  var autocompleteResultsList;
  var autocompleteResults = [];

  var showResults = function() {
    var existingResults = document.querySelector(autocompleteTextboxSelector + ' + ul');
    if (existingResults) {
      existingResults.classList.remove('hidden');
      return;
    }

    autocompleteResultsList = document.createElement('ul');
    autocompleteTextbox.insertAdjacentElement('afterend', autocompleteResultsList);
  };

  var hideResults = function() {
    autocompleteResultsList.classList.add('hidden');
  };

  var removeResults = function() {
    autocompleteResultsList.remove();
  };

  var callURL = function(method, url, renderItem, parseResponse) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        autocompleteResults = JSON.parse(this.responseText);

        if (parseResponse && typeof parseResponse === 'function') {
          autocompleteResults = parseResponse(autocompleteResults);
        }

        showResults();
        autocompleteResultsList.innerHTML = "";

        if (autocompleteResults.length === 0) {
          var item = document.createElement('li');
          item.innerText = 'No results';

          autocompleteResultsList.appendChild(item);
        } else {
          for (var i = 0; i < autocompleteResults.length; i++) {
            var item = document.createElement('li');
            item.innerHTML = renderItem(autocompleteResults[i]);
            item.dataset.resultIndex = i;

            autocompleteResultsList.appendChild(item);
          }
        }
      }
    };

    ajax.open(method, url, true);
    ajax.send();
  };
  return {
    init: function(el, options) {
      autocompleteTextboxSelector = el;
      autocompleteTextbox = document.querySelector(el);

      var debounceTimeout = null;
      document.addEventListener('keyup', function(e) {
        if (e.target === autocompleteTextbox) {
          if (debounceTimeout !== null) {
            clearTimeout(debounceTimeout);
          }

          debounceTimeout = setTimeout(function() {
            callURL(options.method, options.url(e.target.value), options.renderItem, options.parseResponse);
          }, 500);
        }
      });

      document.addEventListener('click', function(e) {
        if (typeof autocompleteResultsList === 'undefined') {
          return;
        }

        var targetIsAutocomplete = e.target === autocompleteTextbox;
        var targetIsWithinResults = autocompleteResultsList.contains(e.target);

        if (targetIsAutocomplete) {
          showResults();
        } else if (!targetIsWithinResults) {
          hideResults();
        }
      });

      document.addEventListener('click', function(e) {
        if (typeof autocompleteResultsList === 'undefined') {
          return;
        }

        if (autocompleteResultsList.contains(e.target) && e.target.nodeName === 'LI') {
          var item = autocompleteResults[e.target.dataset.resultIndex];
          options.onItemSelected(item);
          removeResults();
        }
      });
    }
  };
})();