import axios from 'axios';
import Utils from 'utils';

export const SET_ACTION_ITEMS = 'SET_ACTION_ITEMS';

export function setActionItems(actionItems) {
    return {
        type: SET_ACTION_ITEMS,
        actionItems
    };
}

export function addActionItem(actionItem) {
    return function (dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/action_items`,
            method: 'POST',
            data: {
                authenticity_token: Utils.getAuthenticityToken(),
                action_item: actionItem
            }
        })
        .then(response => {
            const updatedActionItems = [
                ...getState().actionItems,
                response.data
            ];
            dispatch(setActionItems(updatedActionItems));
        })
        .catch(error => console.log(error));
    }
}

export function updateActionItem(actionItemID, partialActionItem) {
    return function (dispatch, getState) {
        axios({
            url: `/action_items/${actionItemID}`,
            method: 'PATCH',
            data: {
                authenticity_token: Utils.getAuthenticityToken(),
                action_item: partialActionItem
            }
        })
        .then(response => {
            const updatedActionItems = getState()
                .actionItems
                .map(item => {
                    if (item.id === response.data.id) {
                        return response.data;
                    }

                    return item;
                });
            dispatch(setActionItems(updatedActionItems));
        })
        .catch(error => console.log(error));
    }
}

export function deleteActionItem(actionItemID) {
    return function (dispatch, getState) {
        axios({
            url: `/action_items/${actionItemID}`,
            method: 'delete',
            data: { authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => {
            const updatedActionItems = getState()
                .actionItems
                .filter(item => item.id !== actionItemID);
            dispatch(setActionItems(updatedActionItems));
        });
    }
}