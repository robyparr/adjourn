import axios from 'axios';
import Utils from 'utils';

export const SET_ATTENDEES = 'SET_ATTENDEES';

export function setAttendees(attendees) {
    return {
        type: SET_ATTENDEES,
        attendees
    };
}

export const addAttendee = (email, meetingID) => {
    return function (dispatch, getState) {
        axios({
            method: 'POST',
            url: `/meetings/${meetingID}/attendees/attend`,
            data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => {
            const updatedAttendees = [
                ...getState().attendees,
                {
                    id: response.data.id,
                    email: response.data.email
                }
            ];
            dispatch(setAttendees(updatedAttendees));
        })
        .catch(error => console.log(error));
    }
}

export const removeAttendee = (email, meetingID) => {
    return function (dispatch, getState) {
        axios({
            method: 'DELETE',
            url: `/meetings/${meetingID}/attendees`,
            data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
        }).then((response) => {
            const updatedAttendees = getState().attendees.filter(a => a.email !== email);
            dispatch(setAttendees(updatedAttendees));
        });
    }
}
