import axios from 'axios';
import Utils from 'utils';

export const SET_AGENDUM_NOTES = 'SET_AGENDUM_NOTES';

export const RECEIVE_NEW_AGENDUM_NOTE = 'RECEIVE_NEW_AGENDUM_NOTE';
export const RECEIVE_UPDATED_AGENDUM_NOTE = 'RECEIVE_UPDATED_AGENDUM_NOTE';
export const RECEIVE_DELETED_AGENDUM_NOTE = 'RECEIVE_DELETED_AGENDUM_NOTE';

/**
* Set the agendum notes in state. This will replace
* any existing state.
*/
export function setAgendumNotes(agendumNotes) {
  return {
    type: SET_AGENDUM_NOTES,
    agendumNotes
  };
}

/**
* Add an agendum note on the backend.
*/
export function addAgendumNote(agendumID, partialAgendumNote) {
  return function(dispatch, getState) {
    axios({
      url: `/agenda/${agendumID}/notes/`,
      method: 'POST',
      data: {
        authenticity_token: Utils.getAuthenticityToken(),
        agendum_note: partialAgendumNote
      }
    })
    .then(response => dispatch(receiveNewAgendumNote(response.data)))
    .catch(error => console.log(error));
  }
}

/**
* Receives a new agendum note from the backend and
* adds it in the frontend state.
*/
export function receiveNewAgendumNote(agendumNote) {
  return {
    type: RECEIVE_NEW_AGENDUM_NOTE,
    agendumNote
  };
}

/**
* Update an agendum note on the backend.
*/
export function updateAgendumNote(agendumID, agendumNoteID, partialAgendumNote) {
  return function(dispatch, getState) {
    axios({
      url: `/notes/${agendumNoteID}`,
      method: 'PATCH',
      data: {
        authenticity_token: Utils.getAuthenticityToken(),
        agendum_note: partialAgendumNote
      }
    })
    .then(response => dispatch(receiveUpdatedAgendumNote(response.data)))
    .catch(error => console.log(error));
  }
}

/**
* Receives an updated agendum note from the backend and
* update it in the frontend state.
*/
export function receiveUpdatedAgendumNote(agendumNote) {
  return {
    type: RECEIVE_UPDATED_AGENDUM_NOTE,
    agendumNote
  };
}

export function deleteAgendumNote(agendumID, agendumNoteID) {
  return function(dispatch, getState) {
    axios({
      url: `/notes/${agendumNoteID}`,
      method: 'DELETE',
      data: { authenticity_token: Utils.getAuthenticityToken() }
    })
    .then(response => dispatch(receiveDeletedAgendumNote(agendumNoteID)))
    .catch(error => console.log(error));
  }
}

/**
* Receives a deleted agendum note from the backend and
* remove it from the frontend state.
*/
export function receiveDeletedAgendumNote(agendumNoteID) {
  return {
    type: RECEIVE_DELETED_AGENDUM_NOTE,
    agendumNoteID
  };
}