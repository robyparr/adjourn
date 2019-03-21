import {
  SET_ATTENDEES,
  RECEIVE_NEW_ATTENDEE,
  RECEIVE_REMOVED_ATTENDEE
} from '../actions/attendees';

const initialState = [];

export default function attendees(state = initialState, action) {
  switch(action.type) {
    case SET_ATTENDEES:
      return action.attendees;

    case RECEIVE_NEW_ATTENDEE:
      return [ ...state, action.attendee ];

    case RECEIVE_REMOVED_ATTENDEE:
      return state.filter(attendee => attendee.email !== action.email);

    default:
      return state;
  }
}
