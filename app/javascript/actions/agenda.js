import axios from 'axios';
import Utils from 'utils';

export const SET_AGENDA = 'SET_AGENDA';

export const RECEIVE_NEW_AGENDUM = 'RECEIVE_NEW_AGENDUM';
export const RECEIVE_UPDATED_AGENDUM = 'RECEIVE_UPDATED_AGENDUM';
export const RECEIVE_DELETED_AGENDUM = 'RECEIVE_DELETED_AGENDUM';
export const SET_SELECTED_AGENDUM = 'SET_SELECTED_AGENDUM';

export const RECEIVE_NEW_AGENDUM_UPLOAD = 'RECEIVE_NEW_AGENDUM_UPLOAD';

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

export function receiveNewAgendumUpload(upload) {
    return {
        type: RECEIVE_NEW_AGENDUM_UPLOAD,
        upload
    };
}

export function addAgendumUpload(agendumID, files) {
    return function(dispatch, getState) {
        const meetingID = getState().meeting.id;
        const uploadsURL = `/meetings/${meetingID}/agenda/${agendumID}/uploads`;

        files.forEach(file => {
            var storageKey = '';

            axios.post(`${uploadsURL}/presign`, {
                authenticity_token: Utils.getAuthenticityToken(),
                filename: file.name,
                file_type: file.type
            })
            .then(response => {
                storageKey = response.data.key;
                var headers = response.data.headers;
                return axios.put(response.data.url, file, { headers: headers });
            })
            .then(response => {
                return axios.post(`${uploadsURL}`, {
                    authenticity_token: Utils.getAuthenticityToken(),
                    upload: {
                        storage_key: storageKey,
                        filename: file.name,
                        content_type: file.type,
                        file_size: file.size
                    }
                });
            })
            .then(response => dispatch(receiveNewAgendumUpload(response.data)));
        });
    }
}