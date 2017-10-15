import axios from 'axios';
import Utils from 'utils';

export const SET_MEETING = 'SET_MEETING';
export const UPDATE_MEETING = 'UPDATE_MEETING';

export const setMeeting = meeting => {
    return {
        type: SET_MEETING,
        meeting
    };
}

export const updateMeeting = meeting => {
    return function (dispatch) {
        axios({
            method: meeting.id ? 'PATCH' : 'POST',
            url: meeting.id ? `/meetings/${meeting.id}` : '/meetings',
            data: { meeting: meeting, authenticity_token: Utils.getAuthenticityToken() }
        })
        .then(response => dispatch(setMeeting(response.data)))
        .catch(error => console.log(error));
    }
}