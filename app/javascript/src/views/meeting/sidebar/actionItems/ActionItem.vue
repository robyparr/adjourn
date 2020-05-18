<template>
  <div class="action-item list-item-content">
    <div class="flex">
      <input type="checkbox"
        :id="`item-done-${actionItem.id}`"
        :checked="actionItem.done"
        @change="updateActionItemField(actionItem, 'done', $event.target.checked)" />

      <div class="flex flex-col mx-4 w-full">
        <inline-editor editor="textInput"
                        placeholder="Action Item"
                        :value="actionItem.title"
                        @editor-changed="updateActionItemField(actionItem, 'title', $event)">
          <div slot="display" class="w-full font-semibold">{{ actionItem.title }}</div>
        </inline-editor>

        <assignees
          :attendees="attendees"
          :assignedIDs="actionItem.attendees.map(attendee => attendee.id)"
          @assign-attendee="assignAttendee(actionItem, $event)"
          @unassign-attendee="unassignAttendee(actionItem, $event)" />

        <div class="action-item-description">
          <inline-editor editor="markdownEditor"
                          placeholder="Description"
                          :value="actionItem.description"
                          @editor-changed="updateActionItemField(actionItem, 'description', $event)">
            <p slot="display" class="markdown-body" v-html="actionItemDescription" />
          </inline-editor>
        </div>
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

    assignAttendee(actionItem, attendee) {
      this.$store.dispatch('assignAttendeeToActionItem', { actionItemID: actionItem.id, email: attendee.email })
    },

    unassignAttendee(actionItem, attendee) {
      this.$store.dispatch('unassignAttendeeFromActionItem', { actionItemID: actionItem.id, email: attendee.email })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
