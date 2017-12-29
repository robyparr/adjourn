import axios from 'axios';
import Utils from 'utils';

export const SET_AGENDA = 'SET_AGENDA';

export const RECEIVE_NEW_AGENDUM = 'RECEIVE_NEW_AGENDUM';
export const RECEIVE_UPDATED_AGENDUM = 'RECEIVE_UPDATED_AGENDUM';
export const RECEIVE_DELETED_AGENDUM = 'RECEIVE_DELETED_AGENDUM';
export const SET_SELECTED_AGENDUM = 'SET_SELECTED_AGENDUM';

/**
 * Set the meeting agenda to the passed agenda.
 * This will completely replace the existing agenda.
 */
export function setAgenda(agenda) {
    return {
        type: SET_AGENDA,
        agenda
    };
}

/**
 * Add a new agendum to the agenda on the backend.
 */
export function addAgendum(agendum) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/`,
            method: 'POST',
            data: { 
                authenticity_token: Utils.getAuthenticityToken(), 
                agendum: agendum
            }
        })
        .then(response => dispatch(receiveNewAgendum(response.data)));
    }
}

/**
 * Receives a newly created agendum and updates
 * the state on the frontend.
 */
export function receiveNewAgendum(agendum) {
    return {
        type: RECEIVE_NEW_AGENDUM,
        agendum
    };
}

/**
 * Update an agendum on the backend.
 */
export function updateAgendum(agendumID, partialAgendum) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/${agendumID}`,
            method: 'PATCH',
            data: { 
                authenticity_token: Utils.getAuthenticityToken(), 
                agendum: partialAgendum
            }
        })
        .then(response => dispatch(receiveUpdatedAgendum(response.data)));
    }
}

/**
 * Receives an updated agendum and updates
 * the state on the frontend.
 */
export function receiveUpdatedAgendum(agendum) {
    return {
        type: RECEIVE_UPDATED_AGENDUM,
        agendum
    };
}

/**
 * Delete an agendum on the backend.
 */
export function deleteAgendum(agendumID) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/${agendumID}`,
            method: 'delete',
            data: { authenticity_token: Utils.getAuthenticityToken() }
        }).then(response => dispatch(receiveDeletedAgendum(agendumID)));
    };
}

/**
 * Receives a deleted agendum and removes it from the
 * frontend state.
 */
export function receiveDeletedAgendum(agendumID) {
    return {
        type: RECEIVE_DELETED_AGENDUM,
        agendumID
    };
}

/**
 * Set the selected agendum in the UI.
 */
export function setSelectedAgendum(agendumID) {
    return {
        type: SET_SELECTED_AGENDUM,
        agendumID
    };
}
