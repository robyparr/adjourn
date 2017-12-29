import { combineReducers } from 'redux';

import meetings from './meetings';
import agenda from './agenda';
import agendumNotes from './agendumNotes';
import actionItems from './actionItems';
import attendees from './attendees';
import agendumUploads from './agendumUploads';

const rootReducer = combineReducers({
    meeting: meetings,
    agenda,
    agendumNotes,
    actionItems,
    attendees,
    agendumUploads
});

export default rootReducer;