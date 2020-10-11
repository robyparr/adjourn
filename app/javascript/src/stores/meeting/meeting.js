import Utils from 'utils'
import axios from 'axios'

import meetingService from '../../services/meetingService'

export default {
  state: {
    meeting: {},
    links: [],
  },

  mutations: {
    SET_MEETING: (state, meeting) => {
      state.meeting = meeting
    },

    ADD_MEETING_LINK: (state, link) => {
      state.links = [...state.links, link]
    },

    REMOVE_MEETING_LINK: (state, link) => {
      state.links = state.links.filter(existingLink => existingLink.id !== link.id)
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

    fetchLinks({ commit }, { meeting }) {
      meetingService.fetchLinks(meeting)
        .then(links => {
          links.forEach(link => commit('ADD_MEETING_LINK', link))
        })
        .catch(error => console.log(error))
    },

    createLink({ commit }, { meeting, link }) {
      meetingService.createMeetingLink(meeting, link)
        .then(link => commit('ADD_MEETING_LINK', link))
        .catch(error => console.log(error))
    },

    destroyLink({ commit }, link) {
      return meetingService.destroyMeetingLink(link)
        .then(response => {
          commit('REMOVE_MEETING_LINK', link)
          return response
        })
        .catch(error => console.log(error))
    },
  }
}
