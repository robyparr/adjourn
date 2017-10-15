import {
    SET_MEETING,
} from '../actions/meetings';

const initialState = {
    id: null,
    title: null,
    startDate: null,
    endDate: null
};

export default function meetings(state = initialState, action) {
    switch(action.type) {
        case SET_MEETING:
            return Object.assign({}, state, {
                id: action.meeting.id,
                title: action.meeting.title,
                startDate: action.meeting.startDate,
                endDate: action.meeting.endDate
            });

        default:
            return state;
    }
}