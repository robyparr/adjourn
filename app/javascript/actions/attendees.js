export const SET_ATTENDEES = 'SET_ATTENDEES';

export function setAttendees(attendees) {
    return {
        type: SET_ATTENDEES,
        attendees
    };
}