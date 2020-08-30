import Vue from 'vue'
import Vuex from 'vuex'

import meeting from './meeting/meeting'
import agenda from './meeting/agenda'
import attendees from './meeting/attendees'
import action_items from './meeting/action_items'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedAgendumID: null,
  },

  modules: {
    meeting,
    agenda,
    attendees,
    action_items,
  },
})
