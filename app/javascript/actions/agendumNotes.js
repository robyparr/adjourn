export const SET_AGENDUM_NOTES = 'SET_AGENDUM_NOTES';

export function setAgendumNotes(agendumNotes) {
    return {
        type: SET_AGENDUM_NOTES,
        agendumNotes
    };
}