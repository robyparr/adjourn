import Utils from 'utils'
import axios from 'axios'

export default {
  state: {
    meeting: {},
  },

  mutations: {
    SET_MEETING: (state, meeting) => {
      state.meeting = meeting
    },
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
  }
}
