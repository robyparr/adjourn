import { SET_AGENDA } from '../actions/agenda';

const initialState = [];

export default function agenda(state = initialState, action) {
    switch(action.type) {
        case SET_AGENDA:
            return action.agenda;

        default:
            return state;
    }
}