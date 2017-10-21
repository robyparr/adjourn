import axios from 'axios';
import Utils from 'utils';

export const SET_AGENDA = 'SET_AGENDA';

export function setAgenda(agenda) {
    return {
        type: SET_AGENDA,
        agenda
    };
}

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
        .then(response => {
            const updatedAgenda = [
                ...getState().agenda,
                response.data
            ];
            dispatch(setAgenda(updatedAgenda));
        });
    }
}

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
        .then(response => {
            const updatedAgenda = getState().agenda.filter(agendum => {
                if (agendum.id === response.data.id) {
                    return response.data;
                }
                return agendum;
            })
            dispatch(setAgenda(updatedAgenda));
        });
    }
}

export function deleteAgendum(agendumID) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/${agendumID}`,
            method: 'delete',
            data: { authenticity_token: Utils.getAuthenticityToken() }
        }).then(response => {
            const updatedAgenda = getState()
                .agenda
                .filter(agendum => agendum.id !== agendumID);

            dispatch(setAgenda(updatedAgenda));
        });
    }
}