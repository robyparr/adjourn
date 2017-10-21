import {
    SET_MEETING,
} from '../actions/meetings';

const initialState = {
    id: null,
    title: null,
    start_date: null,
    end_date: null
};

export default function meetings(state = initialState, action) {
    switch(action.type) {
        case SET_MEETING:
            return Object.assign({}, state, {
                id: action.meeting.id,
                title: action.meeting.title,
                start_date: action.meeting.start_date,
                end_date: action.meeting.end_date
            });

        default:
            return state;
    }
}