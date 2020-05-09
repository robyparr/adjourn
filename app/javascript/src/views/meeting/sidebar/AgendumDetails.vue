<template>
  <div class="agendum-details px-4 pb-4">
    <p v-if="!agendum">Select an agendum to see details.</p>
    <div v-else>
      <h4>{{ agendum.title }}</h4>

      <h6 class="mb-2">Uploads</h6>
      <file-dropzone :uploadFiles="uploadFiles" />

      <ul v-if="agendum.uploads.length" class="list mt-4">
        <li v-for="upload in agendum.uploads"
            :key="upload.id"
            class="list-item">
          <div class="media">
            <i :class="['fa', 'fa-lg', `${uploadIcon(upload)}`]"></i>
            <div class="media-text">
              <a :href="`/uploads/${upload.id}/download`">{{ upload.filename }}</a>
              <span class="text-gray-500">{{ humanizedFileSize(upload) }} KB</span>
            </div>
          </div>
        </li>
      </ul>
      <h6 class="mt-4 mb-2">Agendum Notes</h6>
      <ul class="list">
        <li v-for="note in agendum.notes"
            :key="note.id"
            class="list-item">
          <inline-editor editor="markdownEditor"
                         placeholder="Agendum note"
                         :value="note.content"
                         @editor-changed="updateAgendumNote(note, $event)">
            <p slot="display" class="markdown-body" v-html="renderedNoteContent(note)" />
          </inline-editor>

          <button class="list-floating-text">
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
        <li class="list-item">
          <markdown-editor @change="addAgendumNote" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FileDropzone from '../../../components/FileDropzone'
import InlineEditor from '../../../components/InlineEditor'
import MarkdownEditor from '../../../components/MarkdownEditor'
import marked from 'marked'

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
    agendum() {
      const agenda = this.$store.state.meeting.agenda
      const selectedAgendumID = this.$store.state.selectedAgendumID

      return agenda.find(agendum => agendum.id === selectedAgendumID)
    },
  },

  methods: {
    uploadFiles(files) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('uploadAgendumFiles', { agendumID: this.agendum.id, files })
        resolve()
      })
    },

    uploadIcon(upload) {
      return upload.content_type.includes('image') ? 'fa-image' : 'fa-file'
    },

    humanizedFileSize(upload) {
      return (upload.file_size / 1024).toFixed(2)
    },

    addAgendumNote({ editor, content }) {
      editor.clear()
      this.$store.dispatch('addAgendumNote', { agendum_id: this.agendum.id, content: content })
    },

    renderedNoteContent(note) {
      return marked(note.content || '')
    },

    updateAgendumNote(note, { content }) {
      this.$store.dispatch('updateAgendumNote', { id: note.id, content: content })
    },

    deleteNote(note) {
      this.$store.dispatch('deleteAgendumNote', { id: note.id, agendumID: note.agendum_id })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
