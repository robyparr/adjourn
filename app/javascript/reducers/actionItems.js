import { SET_ACTION_ITEMS } from '../actions/actionItems';

const initialState = [];

export default function actionItems(state = initialState, action) {
    switch(action.type) {
        case SET_ACTION_ITEMS:
            return action.actionItems;

        default:
            return state;
    }
}