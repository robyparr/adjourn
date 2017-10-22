import { 
    SET_ACTION_ITEMS,
    RECEIVE_NEW_ACTION_ITEM,
    RECEIVE_UPDATED_ACTION_ITEM,
    REMOVE_DELETED_ACTION_ITEM
} from '../actions/actionItems';

const initialState = [];

export default function actionItems(state = initialState, action) {
    switch(action.type) {
        case SET_ACTION_ITEMS:
            return action.actionItems;

        case RECEIVE_NEW_ACTION_ITEM:
            return [
                ...state,
                action.actionItem
            ];

        case RECEIVE_UPDATED_ACTION_ITEM:
            return state.map(actionItem => {
                if (actionItem.id === action.actionItem.id) {
                    return action.actionItem;
                }
                return actionItem;
            });

        case REMOVE_DELETED_ACTION_ITEM:
            return state.filter(actionItem => actionItem.id !== action.actionItemID);

        default:
            return state;
    }
}