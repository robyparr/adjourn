<template>
  <div class="agendum-details px-4 pb-4">
    <p v-if="!agendum">Select an agendum to see details.</p>
    <div v-else>
      <h4>{{ agendum.title }}</h4>

      <h6 class="mb-2">Uploads</h6>
      <file-dropzone :uploadFiles="uploadFiles" />

      <ul v-if="agendum.uploads && agendum.uploads.length" class="list mt-4">
        <li v-for="upload in agendum.uploads"
            :key="upload.id"
            class="list-item">
          <div class="media">
            <i :class="['fa', 'fa-lg', `${uploadIcon(upload)}`]"></i>
            <div class="media-text">
              <a :href="`/uploads/${upload.id}/download`">{{ upload.filename }}</a>
              <span class="text-gray-500 -mt-2">{{ humanizedFileSize(upload) }} KB</span>
            </div>
          </div>
          <button class="list-floating-text">
            <i class="fa fa-trash"
               :data-modal="`.confirm-agendum-upload-delete-${upload.id}`">
            </i>
          </button>
          <div :class="`modal confirm-agendum-upload-delete-${upload.id}`">
            <div class="modal-title">Are you sure?</div>
            <div class="modal-content">
              Are you sure you want to remove this upload?
            </div>
            <div class="modal-footer">
              <a href="#" :data-close-modal="`.confirm-agendum-upload-delete-${upload.id}`">
                No
              </a>
              <button class="button primary ml-4" @click="deleteUpload(upload, agendum)">
                Yes
              </button>
            </div>
          </div>
        </li>
      </ul>
      <h6 class="mt-4 mb-2">Agendum Notes</h6>
      <ul v-if="agendum.notes && agendum.notes.length" class="list">
        <li v-for="note in agendum.notes"
            :key="note.id"
            class="list-item">
          <inline-editor editor="markdownEditor"
                         placeholder="Agendum note"
                         :value="note.content"
                         class="w-full"
                         editorClass="-mx-4 -mb-4"
                         @editor-changed="updateAgendumNote(note, $event)">
            <p slot="display" class="markdown-body" v-html="renderedNoteContent(note)" />
          </inline-editor>

          <button class="button icon list-floating-text">
            <i class="fa fa-trash"
               :data-modal="`.confirm-agendum-note-delete-${note.id}`">
            </i>
          </button>

          <div :class="`modal confirm-agendum-note-delete-${note.id}`">
            <div class="modal-title">Are you sure?</div>
            <div class="modal-content">
              Are you sure you want to remove this note?
            </div>
            <div class="modal-footer">
              <a href="#" :data-close-modal="`.confirm-agendum-note-delete-${note.id}`">
                No
              </a>
              <button class="button primary ml-4" @click="deleteNote(note)">
                Yes
              </button>
            </div>
          </div>
        </li>
      </ul>
      <markdown-editor class="mt-4"
                       placeholder="New agendum note"
                       @blur="addAgendumNote" />
    </div>
  </div>
</template>

<script>
import FileDropzone from '../../../components/FileDropzone'
import InlineEditor from '../../../components/InlineEditor'
import MarkdownEditor from '../../../components/MarkdownEditor'
import marked from 'marked'

import { mapState } from 'vuex'

export default {
  components: {
    FileDropzone,
    InlineEditor,
    MarkdownEditor,
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      agenda: state => state.agenda.agenda,
      selectedAgendumID: state => state.selectedAgendumID,
    }),

    agendum() {
      return this.agenda.find(agendum => agendum.id === this.selectedAgendumID)
    },
  },

  methods: {
    uploadFiles(files) {
      return this.$store.dispatch('uploadAgendumFiles', { agendumID: this.agendum.id, files })
    },

    uploadIcon(upload) {
      return upload.content_type.includes('image') ? 'fa-image' : 'fa-file'
    },

    humanizedFileSize(upload) {
      return (upload.file_size / 1024).toFixed(2)
    },

    addAgendumNote(e) {
      this.$store.dispatch('addAgendumNote', { agendum_id: this.agendum.id, content: e.target.value })
      e.target.clear()
    },

    renderedNoteContent(note) {
      return marked(note.content || '')
    },

    updateAgendumNote(note, content) {
      this.$store.dispatch('updateAgendumNote', { id: note.id, content: content })
    },

    deleteNote(note) {
      this.$store.dispatch('deleteAgendumNote', { id: note.id, agendumID: note.agendum_id })
    },

    deleteUpload(upload, uploadable) {
      this.$store.dispatch('deleteUpload', { id: upload.id, uploadable_id: uploadable.id })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
