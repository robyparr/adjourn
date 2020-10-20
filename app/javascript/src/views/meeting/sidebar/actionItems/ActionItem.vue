<template>
  <div class="action-item list-item-content">
    <div class="flex items-start justify-between">
      <input type="checkbox"
        :id="`item-done-${actionItem.id}`"
        :checked="actionItem.done"
        @change="updateActionItemField(actionItem, 'done', $event.target.checked)" />

        <inline-editor editor="textInput"
                       placeholder="Action Item"
                       :value="actionItem.title"
                       class="w-full mx-4"
                       @editor-changed="updateActionItemField(actionItem, 'title', $event)">
          <h5 slot="display" class="w-full font-semibold -mt-2 mb-0">{{ actionItem.title }}</h5>
        </inline-editor>

      <div class="-mt-2 -mr-2">
        <button class="button icon" :data-modal="`.confirm-aa-delete-${actionItem.id}`">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
    <assignees
      class="ml-6"
      :assignedContactIDs="actionItem.contacts.map(contact => contact.id)"
      @assign-attendee="assignContact(actionItem, $event)"
      @unassign-attendee="unassignContact(actionItem, $event)" />
    <div class="action-item-description">
      <inline-editor editor="markdownEditor"
                     placeholder="Description"
                     :value="actionItem.description"
                     @editor-changed="updateActionItemField(actionItem, 'description', $event)">
        <p slot="display" class="markdown-body" v-html="actionItemDescription" />
      </inline-editor>
    </div>

    <div :class="`modal confirm-aa-delete-${actionItem.id}`">
      <div class="modal-title">Are you sure?</div>
      <div class="modal-content">
        Are you sure you want to delete this action item?
      </div>
      <div class="modal-footer">
        <a href="#" :data-close-modal="`.confirm-aa-delete-${actionItem.id}`">
          No
        </a>
        <button class="button primary ml-4" @click="removeActionItem">
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import InlineEditor from '../../../../components/InlineEditor'
import Assignees from './Assignees'

export default {
  components: {
    InlineEditor,
    Assignees,
  },

  props: {
    actionItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
    }
  },

  computed: {
    actionItemDescription() {
      return marked(this.actionItem.description || 'No description')
    }
  },

  methods: {
    updateActionItemField(actionItem, field, value) {
      const partialActionItem = {}
      partialActionItem[field] = value

      this.$store.dispatch('updateActionItem', { id: actionItem.id, partialActionItem })
    },

    assignContact(actionItem, contact) {
      this.$store.dispatch('assignContactToActionItem', { actionItemID: actionItem.id, email: contact.email })
    },

    unassignContact(actionItem, contact) {
      this.$store.dispatch('unassignContactFromActionItem', { actionItemID: actionItem.id, email: contact.email })
    },

    removeActionItem() {
      this.$store.dispatch('removeActionItem', this.actionItem.id)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
