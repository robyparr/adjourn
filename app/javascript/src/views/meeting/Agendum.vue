<template>
  <card :class="['agendum', { selected: isSelected }]"
        @click="selectAgendum">
    <template v-if="isExistingAgendum" slot="title">
      <inline-editor editor="textInput"
                     placeholder="Agendum Title"
                     :value="agendum.title"
                     @editor-changed="updateAgendumTitle">
        <h3 slot="display" class="mb-1 meeting-title">{{ agendum.title }}</h3>
      </inline-editor>
    </template>
    <template v-else slot="title">
      <input type="text"
             placeholder="New Agendum"
             @change="createAgendum" />
    </template>

    <template v-if="isExistingAgendum" slot="actions">
      <button>
        <i class="fa fa-trash"
          :data-modal="`.confirm-agendum-delete-${agendum.id}`">
        </i>
      </button>
    </template>

    <template v-if="isExistingAgendum" slot="content">
      <inline-editor editor="markdownEditor"
                     placeholder="Agendum Details"
                     :value="agendum.description"
                     @editor-changed="updateAgendumDescription">
        <p slot="display" class="markdown-body" v-html="agendumDescription" />
      </inline-editor>

      <div :class="['modal' , `confirm-agendum-delete-${agendum.id}`]">
        <div class="modal-title">Are you sure?</div>
        <div class="modal-content">
          Are you sure you want to remove this agendum?
        </div>
        <div class="modal-footer">
          <a href="#"
              :data-close-modal="`.confirm-agendum-delete-${agendum.id}`">
            No
          </a>
          <button class="button primary ml-4"
                  @click="deleteAgendum">
            Yes
          </button>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import Card from '../../components/Card'
import InlineEditor from '../../components/InlineEditor'

import marked from 'marked'

export default {
  components: {
    Card,
    InlineEditor,
  },

  props: {
    agendum: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isExistingAgendum() {
      return Boolean(this.agendum.id)
    },

    isSelected() {
      return this.isExistingAgendum && this.$store.state.selectedAgendumID == this.agendum.id
    },

    agendumDescription() {
      return marked(this.agendum.description || 'No description')
    },
  },

  methods: {
    selectAgendum() {
      if (!this.isExistingAgendum) return

      this.$store.state.selectedAgendumID = this.agendum.id
      openAgendumDetailsView()
    },

    createAgendum(e) {
      this.$store.dispatch('createAgendum', { title: e.target.value })
      e.target.value = ''
    },

    updateAgendumTitle(title) {
      this.$store.dispatch('updateAgendum', { id: this.agendum.id, title: title })
    },

    updateAgendumDescription(description) {
      this.$store.dispatch('updateAgendum', { id: this.agendum.id, description: description })
    },

    deleteAgendum() {
      this.$store.dispatch('deleteAgendum', this.agendum.id)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
