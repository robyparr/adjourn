import {
  SET_AGENDUM_NOTES,
  RECEIVE_NEW_AGENDUM_NOTE,
  RECEIVE_UPDATED_AGENDUM_NOTE,
  RECEIVE_DELETED_AGENDUM_NOTE
} from '../actions/agendumNotes';

const initialState = [];

export default function agendumNotes(state = initialState, action) {
  switch(action.type) {
    case SET_AGENDUM_NOTES:
      // Sort notes oldest -> newest
      return action.agendumNotes.sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)

        if (dateA > dateB) return 1;
        else if (dateA < dateB) return -1;
        else return 0;
      });;

    case RECEIVE_NEW_AGENDUM_NOTE:
      return [ ...state, action.agendumNote ];

    case RECEIVE_UPDATED_AGENDUM_NOTE:
      return state.map(note => {
        if (note.id === action.agendumNote.id) {
          return action.agendumNote;
        }
        return note;
      });

    case RECEIVE_DELETED_AGENDUM_NOTE:
      return state.filter(note => note.id != action.agendumNoteID);

    default:
      return state;
  }
}
