import React from 'react';
import ReactDOM from 'react-dom';

import Autocomplete from '../components/common/Autocomplete';

window.AdjournAutocomplete = (selector, options = {}) => {
  document.querySelectorAll(selector).forEach(element => {
    ReactDOM.render(
      <Autocomplete {...options} />,
      element,
    );
  });
}
