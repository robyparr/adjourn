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
            return action.agenda.sort((a, b) => {
                const dateA = new Date(a.created_at)
                const dateB = new Date(b.created_at)

                if (dateA > dateB) return 1;
                else if (dateA < dateB) return -1;
                else return 0;
            });

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