import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import Utils from 'utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meeting: {},
    selectedAgendumID: null,
  },
  mutations: {
    SET_MEETING: (state, meeting) => {
      state.meeting = meeting
    },

    ADD_AGENDUM: (state, agendum) => {
      state.meeting.agenda = [...state.meeting.agenda, agendum]
    },

    UPDATE_AGENDUM: (state, updatedAgendum) => {
      state.meeting.agenda = state.meeting.agenda.map(agendum => {
        if (agendum.id == updatedAgendum.id)
          return updatedAgendum

        return agendum
      })
    },

    REMOVE_AGENDUM: (state, agendumID) => {
      state.meeting.agenda = state.meeting.agenda.filter(agendum => agendum.id !== agendumID)
    },

    ADD_ATTENDEE: (state, attendee) => {
      state.meeting.attendees = [...state.meeting.attendees, attendee]
    },

    REMOVE_ATTENDEE: (state, email) => {
      state.meeting.attendees = state.meeting.attendees.filter(attendee => attendee.email !== email)
    }
  },

  actions: {
    updateMeeting({ commit }, meeting) {
      axios({
        method: meeting.id ? 'PATCH' : 'POST',
        url: meeting.id ? `/meetings/${meeting.id}` : '/meetings',
        data: { meeting: meeting, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(response => commit('SET_MEETING', response.data))
      .catch(error => console.log(error))
    },

    createAgendum({ state, commit }, agendum) {
      axios({
        url: `/meetings/${state.meeting.id}/agenda/`,
        method: 'POST',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          agendum: agendum
        }
      })
      .then(response => commit('ADD_AGENDUM', response.data))
    },

    updateAgendum({ commit }, agendum) {
      axios({
        url: `/agenda/${agendum.id}`,
        method: 'PATCH',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          agendum: agendum
        }
      })
      .then(response => commit('UPDATE_AGENDUM', response.data))
    },

    deleteAgendum({ commit }, agendumID) {
      axios({
        url: `/agenda/${agendumID}`,
        method: 'delete',
        data: { authenticity_token: Utils.getAuthenticityToken() }
      }).then(_response => commit('REMOVE_AGENDUM', agendumID))
    },

    sortAgenda({ state }, agendaIDs) {
      // Note: The agenda sort order is calculated locally already
      // so we don't have to update it again.
      axios({
        url: `/meetings/${state.meeting.id}/agenda/update_sort`,
        method: 'PATCH',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          agenda_ids: agendaIDs
        }
      })
    },

    addAttendee({ commit, state }, email) {
      axios({
        method: 'POST',
        url: `/meetings/${state.meeting.id}/attendees/attend`,
        data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(response => {
        const attendee = {
          id: response.data.id,
          email: response.data.email
        }
        commit('ADD_ATTENDEE', attendee)
      })
      .catch(error => console.log(error))
    },

    removeAttendee({ commit, state }, email) {
      axios({
        method: 'DELETE',
        url: `/meetings/${state.meeting.id}/attendees/unattend`,
        data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(_response => commit('REMOVE_ATTENDEE', email))
      .catch(error => console.log(error))
    }
  }
})
