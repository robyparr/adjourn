export const SET_AGENDA = 'SET_AGENDA';

export function setAgenda(agenda) {
    return {
        type: SET_AGENDA,
        agenda
    };
}