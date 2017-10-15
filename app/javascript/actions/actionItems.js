export const SET_ACTION_ITEMS = 'SET_ACTION_ITEMS';

export function setActionItems(actionItems) {
    return {
        type: SET_ACTION_ITEMS,
        actionItems
    };
}