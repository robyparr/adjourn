import axios from 'axios';
import Utils from 'utils';

export const SET_ATTENDEES = 'SET_ATTENDEES';
export const RECEIVE_NEW_ATTENDEE = 'RECEIVE_NEW_ATTENDEE';
export const RECEIVE_REMOVED_ATTENDEE = 'RECEIVE_REMOVED_ATTENDEE';

/**
 * Set the state's attendees.
 */
export function setAttendees(attendees) {
    return {
        type: SET_ATTENDEES,
        attendees
    };
}

/**
 * Add an attendee to the meeting on the backend.
 */
export const addAttendee = (email, meetingID) => {
    return function (dispatch) {
        axios({
            method: 'POST',
            url: `/meetings/${meetingID}/attendees/attend`,
            data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => {
            const attendee = {
                id: response.data.id,
                email: response.data.email
            };
            dispatch(receiveNewAttendee(attendee));
        })
        .catch(error => console.log(error));
    }
}

/**
 * Receives a newly added attendee from the backend
 * and adds it to the frontend's state.
 */
export function receiveNewAttendee(attendee) {
    return {
        type: RECEIVE_NEW_ATTENDEE,
        attendee
    };
}

/**
 * Removes an attendee from the meeting on the backend.
 */
export const removeAttendee = (email, meetingID) => {
    return function (dispatch) {
        axios({
            method: 'DELETE',
            url: `/meetings/${meetingID}/attendees`,
            data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => dispatch(receiveRemovedAttendee(email)))
        .catch(error => console.log(error));
    }
}

/**
 * Receives a removed attendee from the backend
 * and removes it from the frontend's state.
 */
export function receiveRemovedAttendee(email) {
    return {
        type: RECEIVE_REMOVED_ATTENDEE,
        email
    };
}
