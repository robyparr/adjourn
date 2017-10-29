import { 
    SET_AGENDA,
    RECEIVE_NEW_AGENDUM,
    RECEIVE_UPDATED_AGENDUM,
    RECEIVE_DELETED_AGENDUM
} from '../actions/agenda';

const initialState = [];

export default function agenda(state = initialState, action) {
    switch(action.type) {
        case SET_AGENDA:
            return action.agenda;

        case RECEIVE_NEW_AGENDUM:
            return [ ...state, action.agendum ];

        case RECEIVE_UPDATED_AGENDUM:
            return state.map(agendum => {
                if (agendum.id === action.agendum.id) {
                    return action.agendum.id;
                }
                return agendum;
            });

        case RECEIVE_DELETED_AGENDUM:
            return state.filter(agendum => agendum.id !== action.agendumID);

        default:
            return state;
    }
}