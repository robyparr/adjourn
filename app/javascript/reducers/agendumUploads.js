import {
  SET_MEETING_AGENDUM_UPLOADS,
  RECEIVE_NEW_AGENDUM_UPLOAD
} from '../actions/agendumUploads';

const initialState = [];

export default function agendumUploads(state = initialState, action) {
  switch(action.type) {
    case SET_MEETING_AGENDUM_UPLOADS:
      return action.uploads;

    case RECEIVE_NEW_AGENDUM_UPLOAD:
      return [ ...state, action.upload ];

    default:
      return state;
  }
}
