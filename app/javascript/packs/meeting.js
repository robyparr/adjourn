import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const humps = require('humps');

import Meeting from '../components/meeting/meeting';
import MeetingContainer from '../containers/MeetingContainer';
import rootReducer from '../reducers';
import { setMeeting } from '../actions/meetings';
import { setAgenda } from '../actions/agenda';
import { setAgendumNotes } from '../actions/agendumNotes';
import { setActionItems } from '../actions/actionItems';
import { setAttendees } from '../actions/attendees';

let store = createStore(rootReducer);

var rootNode = document.getElementById('react-root');
var jsonString = rootNode.getAttribute('data-meeting');
var meeting = humps.camelizeKeys(JSON.parse(jsonString));

store.dispatch(setMeeting(meeting));
store.dispatch(setAgenda(meeting.agenda));
store.dispatch(setAgendumNotes(meeting.agenda.map(agendum => agendum.notes)));
store.dispatch(setActionItems(meeting.actionItems));
store.dispatch(setAttendees(meeting.attendees));

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <MeetingContainer />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root'),
);
