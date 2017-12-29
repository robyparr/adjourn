import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MeetingContainer from '../containers/MeetingContainer';
import rootReducer from '../reducers';
import { setMeeting } from '../actions/meetings';
import { setAgenda } from '../actions/agenda';
import { setAgendumNotes } from '../actions/agendumNotes';
import { setActionItems } from '../actions/actionItems';
import { setAttendees } from '../actions/attendees';
import { setMeetingAgendumUploads } from '../actions/agendumUploads';

// For material-ui
injectTapEventPlugin();

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

var rootNode = document.getElementById('react-root');
var jsonString = rootNode.getAttribute('data-meeting');
var meeting = JSON.parse(jsonString);

if (meeting.id) {
  store.dispatch(setMeeting(meeting));
  store.dispatch(setAgenda(meeting.agenda));
  store.dispatch(
    setMeetingAgendumUploads(
      meeting
        .agenda
        .map(agendum => agendum.uploads)
        .reduce((accumulator, current) => accumulator.concat(current), [])
    )
  );
  store.dispatch(
    setAgendumNotes(
      meeting
        .agenda
        .map(agendum => agendum.notes)
        .reduce((accumulator, current) => accumulator.concat(current), [])
    )
  );
  store.dispatch(setActionItems(meeting.action_items));
  store.dispatch(setAttendees(meeting.attendees));
}

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <MeetingContainer />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('react-root'),
);
