import Vue from 'vue'

import uploadService from '../../services/uploadService'
import axios from 'axios'
import Utils from '../../../utils'

import _extend from 'lodash/extend'

export default {
  state: {
    agenda: [],
  },

  mutations: {
    SET_AGENDA: (state, agenda) => {
      state.agenda = agenda
    },

    ADD_AGENDUM: (state, agendum) => {
      state.agenda = [...state.agenda, agendum]
    },

    UPDATE_AGENDUM: (state, updatedAgendum) => {
      state.agenda =
        state.agenda.map(agendum => {
          if (agendum.id == updatedAgendum.id) {
            return _extend({}, agendum, updatedAgendum)
          }

          return agendum
        })
    },

    REMOVE_AGENDUM: (state, agendumID) => {
      state.agenda = state.agenda.filter(agendum => agendum.id !== agendumID)
    },

    ADD_AGENDUM_UPLOAD: (state, upload) => {
      const agendum = state.agenda.find(agendum => agendum.id === upload.uploadable_id)

      if (!agendum.uploads) {
        Vue.set(agendum, 'uploads', [upload])
      } else {
        agendum.uploads = [...agendum.uploads, upload]
      }
    },

    REMOVE_AGENDUM_UPLOAD: (state, { id, uploadable_id }) => {
      const agendum = state.agenda.find(agendum => agendum.id === uploadable_id)
      agendum.uploads = agendum.uploads.filter(item => item.id !== id)
    },

    ADD_AGENDUM_NOTE: (state, note) => {
      const agendum = state.agenda.find(agendum => agendum.id === note.agendum_id)

      if (!agendum.notes) {
        Vue.set(agendum, 'notes', [note])
      } else {
        agendum.notes = [...agendum.notes, note]
      }
    },

    UPDATE_AGENDUM_NOTE: (state, updatedNote) => {
      const agendum = state.agenda.find(agendum => agendum.id === updatedNote.agendum_id)
      agendum.notes =
        agendum.notes.map(note => {
          if (note.id === updatedNote.id)
            return updatedNote

          return note
        })
    },

    REMOVE_AGENDUM_NOTE: (state, { agendumID, id }) => {
      const agendum = state.agenda.find(agendum => agendum.id === agendumID)
      agendum.notes = agendum.notes.filter(item => item.id !== id)
    },
  },

  actions: {
    createAgendum({ rootState, commit }, agendum) {
      axios({
        url: `/meetings/${rootState.meeting.meeting.id}/agenda/`,
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

    sortAgenda({ rootState }, agendaIDs) {
      // Note: The agenda sort order is calculated locally already
      // so we don't have to update it again.
      axios({
        url: `/meetings/${rootState.meeting.meeting.id}/agenda/update_sort`,
        method: 'PATCH',
        data: {
          authenticity_token: Utils.getAuthenticityToken(),
          agenda_ids: agendaIDs
        }
      })
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

    deleteUpload({ commit }, { id, uploadable_id }) {
      axios({
        url: `/uploads/${id}.json`,
        method: 'DELETE',
        data: { authenticity_token: Utils.getAuthenticityToken() }
      })
      .then(_response => commit('REMOVE_AGENDUM_UPLOAD', { id, uploadable_id }))
      .catch(error => console.log(error))
    },
  }
}
