import { SET_AGENDUM_NOTES } from '../actions/agendumNotes';

const initialState = [];

export default function agendumNotes(state = initialState, action) {
    switch(action.type) {
        case SET_AGENDUM_NOTES:
            return action.agendumNotes;

        default:
            return state;
    }
}