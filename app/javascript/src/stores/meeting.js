import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import Utils from 'utils'
import _extend from 'lodash/extend'

Vue.use(Vuex)

import uploadService from '../services/uploadService'

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
        if (agendum.id == updatedAgendum.id) {
          return _extend({}, agendum, updatedAgendum)
        }

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
    },

    ADD_ACTION_ITEM: (state, actionItem) => {
      state.meeting.action_items = [...state.meeting.action_items, actionItem]
    },

    UPDATE_ACTION_ITEM: (state, updatedActionItem) => {
      state.meeting.action_items = state.meeting.action_items.map(actionItem => {
        if (actionItem.id == updatedActionItem.id)
          return updatedActionItem

        return actionItem
      })
    },

    REMOVE_ACTION_ITEM: (state, actionItemID) => {
      state.meeting.action_items = state.meeting.action_items.filter(item => item.id !== actionItemID)
    },

    ADD_AGENDUM_UPLOAD: (state, upload) => {
      const agendum = state.meeting.agenda.find(agendum => agendum.id === upload.agendum_id)
      agendum.uploads = [...agendum.uploads, upload]
    },

    ADD_AGENDUM_NOTE: (state, note) => {
      const agendum = state.meeting.agenda.find(agendum => agendum.id === note.agendum_id)
      if (!agendum.notes) Vue.set(agendum, 'notes', [])

      agendum.notes = [...agendum.notes, note]
    },

    UPDATE_AGENDUM_NOTE: (state, updatedNote) => {
      const agendum = state.meeting.agenda.find(agendum => agendum.id === updatedNote.agendum_id)
      agendum.notes = agendum.notes.map(note => {
        if (note.id === updatedNote.id)
          return updatedNote

        return note
      })
    },

    REMOVE_AGENDUM_NOTE: (state, { agendumID, id }) => {
      const agendum = state.meeting.agenda.find(agendum => agendum.id === agendumID)
      agendum.notes = agendum.notes.filter(item => item.id !== id)
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
        url: `/meetings/${state.meeting.id}/contacts/attend`,
        data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(response => {
        const attendee = {
          id: response.data.id,
          email: response.data.email,
          contact_id: response.data.contact_id,
        }
        commit('ADD_ATTENDEE', attendee)
      })
      .catch(error => console.log(error))
    },

    removeAttendee({ commit, state }, email) {
      axios({
        method: 'DELETE',
        url: `/meetings/${state.meeting.id}/contacts/unattend`,
        data: { email: email, authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(_response => commit('REMOVE_ATTENDEE', email))
      .catch(error => console.log(error))
    },

    addActionItem({ commit, state }, title) {
      axios({
        url: `/meetings/${state.meeting.id}/action_items`,
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

    uploadAgendumFiles({ commit }, { agendumID, files }) {
      const uploadsURL = `/agenda/${agendumID}/uploads`

      return Promise.all(uploadService.uploadFiles(uploadsURL, files))
        .then(uploadResponses => {
          for (const response of uploadResponses) {
            commit('ADD_AGENDUM_UPLOAD', response.data)
          }
        })
    },

    addAgendumNote({ commit }, partialNote) {
      axios({
        url: `/agenda/${partialNote.agendum_id}/notes/`,
        method: 'POST',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          agendum_note: partialNote
        }
      })
      .then(response => commit('ADD_AGENDUM_NOTE', response.data))
      .catch(error => console.log(error))
    },

    updateAgendumNote({ commit }, partialNote) {
      axios({
        url: `/notes/${partialNote.id}`,
        method: 'PATCH',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          agendum_note: partialNote
        }
      })
      .then(response => commit('UPDATE_AGENDUM_NOTE', response.data))
      .catch(error => console.log(error))
    },

    deleteAgendumNote({ commit }, { id, agendumID }) {
      axios({
        url: `/notes/${id}`,
        method: 'DELETE',
        data: { authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(_response => commit('REMOVE_AGENDUM_NOTE', { agendumID, id }))
      .catch(error => console.log(error))
    },
  }
})
