<template>
  <div>
    <input type="text"
           placeholder="Add action item"
           class="mb-4"
           @keyup.enter="addActionItem" />

    <ul class="list border-0">
      <li v-for="(actionItem, index) in actionItems"
          :class="['list-item', index == 0 ? 'border' : 'border-r border-l border-b']"
          :key="actionItem.id">
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
                :attendees="meeting.attendees"
                :assignedIDs="actionItem.attendees.map(attendee => attendee.id)"
                @assign-attendee="assignAttendee(actionItem, $event)"
                @unassign-attendee="unassignAttendee(actionItem, $event)" />

              <div class="action-item-description">
                <inline-editor editor="textInput"
                               placeholder="Description"
                               :value="actionItem.description"
                               @editor-changed="updateActionItemField(actionItem, 'description', $event)">
                  <div slot="display" class="my-0 w-full">{{ actionItem.description || 'No description' }}</div>
                </inline-editor>
              </div>
            </div>
          </div>
        </div>

        <button class="list-floating-text">
          <i class="fa fa-trash" :data-modal="`.confirm-aa-delete-${actionItem.id}`"></i>
        </button>
        <div :class="`modal confirm-aa-delete-${actionItem.id}`">
          <div class="modal-title">Are you sure?</div>
          <div class="modal-content">
            Are you sure you want to delete this action item?
          </div>
          <div class="modal-footer">
            <a href="#" :data-close-modal="`.confirm-aa-delete-${actionItem.id}`">
              No
            </a>
            <button class="button primary ml-4" @click="removeActionItem(actionItem)">
              Yes
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import InlineEditor from '../../../components/InlineEditor'
import Assignees from './actionItems/Assignees'

export default {
  components: {
    InlineEditor,
    Assignees,
  },

  data() {
    return {
      meeting: this.$store.state.meeting,
    }
  },

  computed: {
    actionItems() {
      return this.meeting.action_items
    }
  },

  methods: {
    addActionItem(e) {
      this.$store.dispatch('addActionItem', e.target.value)
      e.target.value = ''
    },

    updateActionItemField(actionItem, field, value) {
      const partialActionItem = {}
      partialActionItem[field] = value

      this.$store.dispatch('updateActionItem', { id: actionItem.id, partialActionItem })
    },

    removeActionItem(actionItem) {
      this.$store.dispatch('removeActionItem', actionItem.id)
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
