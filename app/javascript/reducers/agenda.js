import {
  SET_AGENDA,
  RECEIVE_NEW_AGENDUM,
  RECEIVE_UPDATED_AGENDUM,
  RECEIVE_DELETED_AGENDUM,
  SET_SELECTED_AGENDUM
} from '../actions/agenda';

const initialState = [];

export default function agenda(state = initialState, action) {
  switch(action.type) {
    case SET_AGENDA:
      // Sort agendums oldest -> newest
      return action.agenda;

    case RECEIVE_NEW_AGENDUM:
      return [ ...state, action.agendum ];

    case RECEIVE_UPDATED_AGENDUM:
      return state.map(agendum => {
        if (agendum.id === action.agendum.id) {
          return Object.assign({}, action.agendum, {
            // Make sure we keep the agendum's selection status
            selected: agendum.selected
          });
        }
        return agendum;
      });

    case RECEIVE_DELETED_AGENDUM:
      return state.filter(agendum => agendum.id !== action.agendumID);

    case SET_SELECTED_AGENDUM:
      return state.map(agendum => {
        if (agendum.id === action.agendumID) {
          return Object.assign({}, agendum, {
            selected: true
          });
        } else if (agendum.selected) {
          return Object.assign({}, agendum, {
            selected: false
          });
        }
        return agendum;
      });

    default:
      return state;
  }
}
