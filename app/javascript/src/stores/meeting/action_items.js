import Utils from 'utils'
import axios from 'axios'

export default {
  state: {
    action_items: [],
  },

  mutations: {
    SET_ACTION_ITEMS: (state, actionItems) => {
      state.action_items = actionItems
    },

    ADD_ACTION_ITEM: (state, actionItem) => {
      state.action_items = [...state.action_items, actionItem]
    },

    UPDATE_ACTION_ITEM: (state, updatedActionItem) => {
      state.action_items =
        state.action_items.map(actionItem => {
          if (actionItem.id == updatedActionItem.id)
            return updatedActionItem

          return actionItem
        })
    },

    REMOVE_ACTION_ITEM: (state, actionItemID) => {
      state.action_items = state.action_items.filter(item => item.id !== actionItemID)
    },
  },

  actions: {
    addActionItem({ commit, rootState }, title) {
      axios({
        url: `/meetings/${rootState.meeting.meeting.id}/action_items`,
        method: 'POST',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          action_item: { title: title }
        }
      })
      .then(response => commit('ADD_ACTION_ITEM', response.data))
      .catch(error => console.log(error))
    },

    updateActionItem({ commit }, { id, partialActionItem }) {
      axios({
        url: `/action_items/${id}`,
        method: 'PUT',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          action_item: partialActionItem
        }
      })
      .then(response => commit('UPDATE_ACTION_ITEM', response.data))
      .catch(error => console.log(error))
    },

    removeActionItem({ commit }, actionItemID) {
      axios({
        url: `/action_items/${actionItemID}`,
        method: 'DELETE',
        data: { authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(_response => commit('REMOVE_ACTION_ITEM', actionItemID))
      .catch(error => console.log(error))
    },

    assignContactToActionItem({ commit }, { actionItemID, email }) {
      axios({
        url: `/action_items/${actionItemID}/assign`,
        method: 'POST',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          email: email
        }
      })
      .then(response => commit('UPDATE_ACTION_ITEM', response.data))
      .catch(error => console.log(error))
    },

    unassignContactFromActionItem({ commit }, { actionItemID, email }) {
      axios({
        url: `/action_items/${actionItemID}/unassign`,
        method: 'POST',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          email: email
        }
      })
      .then(response => commit('UPDATE_ACTION_ITEM', response.data))
      .catch(error => console.log(error))
    },
  }
}
