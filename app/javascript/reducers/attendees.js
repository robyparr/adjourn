import { SET_ATTENDEES } from '../actions/attendees';

const initialState = [];

export default function attendees(state = initialState, action) {
    switch(action.type) {
        case SET_ATTENDEES:
            return action.attendees;

        default:
            return state;
    }
}