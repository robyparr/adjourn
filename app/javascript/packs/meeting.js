import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Meeting from '../components/meeting/meeting';

var rootNode = document.getElementById('react-root');
var meeting = JSON.parse(rootNode.getAttribute('data-meeting'));

ReactDOM.render(
  <MuiThemeProvider>
    <Meeting meeting={meeting} />
  </MuiThemeProvider>,
  document.getElementById('react-root'),
);
