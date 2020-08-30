import Utils from 'utils'
import axios from 'axios'

import _defaults from 'lodash/defaults'

export default {
  state: {
    attendees: []
  },

  mutations: {
    SET_ATTENDEES: (state, attendees) => {
      state.attendees = attendees
    },

    ADD_ATTENDEE: (state, attendee) => {
      state.attendees = [...state.attendees, attendee]
    },

    REMOVE_ATTENDEE: (state, email) => {
      state.attendees = state.attendees.filter(attendee => attendee.email !== email)
    },

    UPDATE_ATTENDEE: (state, updatedAttendee) => {
      state.attendees =
        state.attendees.map(attendee => {
          if (attendee.id === updatedAttendee.id)
            return updatedAttendee

          return attendee
        })
    },
  },

  actions: {
    addAttendee({ commit, rootState }, email) {
      axios({
        method: 'POST',
        url: `/meetings/${rootState.meeting.meeting.id}/attendees`,
        data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(response => {
        const attendee = _defaults({
          id: response.data.id,
          email: response.data.email,
          contact_id: response.data.contact_id,
        }, {
          attended: true,
        })
        commit('ADD_ATTENDEE', attendee)
      })
      .catch(error => console.log(error))
    },

    removeAttendee({ commit, rootState }, email) {
      axios({
        method: 'DELETE',
        url: `/meetings/${rootState.meeting.meeting.id}/attendees`,
        data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(_response => commit('REMOVE_ATTENDEE', email))
      .catch(error => console.log(error))
    },

    updateAttendee({ commit, rootState }, { id, partialAttendee }) {
      axios({
        method: 'PUT',
        url: `/meetings/${rootState.meeting.meeting.id}/attendees/${id}`,
        data: {
          attendee: partialAttendee,
          authenticity_token: Utils.getAuthenticityToken(),
        }
      })
      .then(response => commit('UPDATE_ATTENDEE', response.data))
      .catch(error => console.log(error))
    },
  }
}
