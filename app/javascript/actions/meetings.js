export const SET_MEETING = 'SET_MEETING';

export const setMeeting = meeting => {
    return {
        type: SET_MEETING,
        meeting
    };
}
