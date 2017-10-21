import axios from 'axios';
import Utils from 'utils';

export const SET_AGENDUM_NOTES = 'SET_AGENDUM_NOTES';

export function setAgendumNotes(agendumNotes) {
    return {
        type: SET_AGENDUM_NOTES,
        agendumNotes
    };
}

export function addAgendumNote(agendumID, partialAgendumNote) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/${agendumID}/notes/`,
            method: 'POST',
            data: { 
                authenticity_token: Utils.getAuthenticityToken(), 
                agendum_note: partialAgendumNote
            }
        })
        .then(response => {
            const updatedAgendumNotes = [
                ...getState().agendumNotes,
                response.data
            ];
            dispatch(setAgendumNotes(updatedAgendumNotes));
        })
        .catch(error => console.log(error));
    }
}

export function updateAgendumNote(agendumID, agendumNoteID, partialAgendumNote) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/${agendumID}/notes/${agendumNoteID}`,
            method: 'PATCH',
            data: { 
                authenticity_token: Utils.getAuthenticityToken(), 
                agendum_note: partialAgendumNote
            }
        })
        .then(response => {
            const updatedAgendumNotes = getState()
                .agendumNotes
                .filter(note => {
                    if (note.id === response.data.id) {
                        return response.data;
                    }
                    return note;
                });
            dispatch(setAgendumNotes(updatedAgendumNotes));
        });
    }
}

export function deleteAgendumNote(agendumID, agendumNoteID) {
    return function(dispatch, getState) {
        axios({
            url: `/meetings/${getState().meeting.id}/agenda/${agendumID}/notes/${agendumNoteID}`,
            method: 'DELETE',
            data: { authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => {
            const updatedAgendumNotes = getState()
                .agendumNotes
                .filter(note => note.id !== agendumNoteID);
            
            dispatch(setAgendumNotes(updatedAgendumNotes));
        });
    }
}