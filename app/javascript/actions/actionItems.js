import axios from 'axios';
import Utils from 'utils';

export const SET_ACTION_ITEMS = 'SET_ACTION_ITEMS';
export const RECEIVE_NEW_ACTION_ITEM = 'RECEIVE_NEW_ACTION_ITEM';
export const RECEIVE_UPDATED_ACTION_ITEM = 'RECEIVE_UPDATED_ACTION_ITEM';
export const REMOVE_DELETED_ACTION_ITEM = 'REMOVE_DELETED_ACTION_ITEM';

/**
 * Set the entire state to the passed action items.
 */
export function setActionItems(actionItems) {
    return {
        type: SET_ACTION_ITEMS,
        actionItems
    };
}

/**
 * Adds a new action item on the backend.
 */
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
        .then(response => dispatch(receiveNewActionItem(response.data)))
        .catch(error => console.log(error));
    }
}

/**
 * Receives a newly created action item from the backend
 * and adds it to the application state.
 */
export function receiveNewActionItem(actionItem) {
    return {
        type: RECEIVE_NEW_ACTION_ITEM,
        actionItem
    };
}

/**
 * Updates the specified action item on the backend.
 */
export function updateActionItem(actionItemID, partialActionItem) {
    return function (dispatch) {
        axios({
            url: `/action_items/${actionItemID}`,
            method: 'PATCH',
            data: {
                authenticity_token: Utils.getAuthenticityToken(),
                action_item: partialActionItem
            }
        })
        .then(response => dispatch(receiveUpdatedActionItem(response.data)))
        .catch(error => console.log(error));
    }
}

/**
 * Receives an updated action item from the backend and
 * updates it in the application state.
 */
export function receiveUpdatedActionItem(actionItem) {
    return {
        type: RECEIVE_UPDATED_ACTION_ITEM,
        actionItem
    };
}

/**
 * Deletes the action item on the backend.
 */
export function deleteActionItem(actionItemID) {
    return function (dispatch, getState) {
        axios({
            url: `/action_items/${actionItemID}`,
            method: 'delete',
            data: { authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => dispatch(removeDeletedActionItem(actionItemID)))
        .catch(error => console.log(error));
    }
}

/**
 * Removes a deleted action item from the application state.
 */
export function removeDeletedActionItem(actionItemID) {
    return {
        type: REMOVE_DELETED_ACTION_ITEM,
        actionItemID
    };
}