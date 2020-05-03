<template>
  <div class="assignees">
    <div class="selected-assignees">
      <div v-if="!assignedIDs.length" @click="openSelector">No assignees</div>
      <div v-else-if="assignedIDs.length == 1" @click="openSelector" class="media">
        <img :src="attendeeAvatar(assignees[0])" class="avatar" />
        <div class="media-text">
          {{ assignees[0].email }}
        </div>
      </div>
      <div v-else @click="openSelector" class="media" :title="assignees.map(it => it.email).join(', ')">
        <img v-for="assignee in assignees"
             :key="assignee.id"
             :src="attendeeAvatar(assignee)"
             class="avatar" />
        <div class="media-text">
          {{ assignees.length }} assignees
        </div>
      </div>
    </div>
    <div v-if="selectorOpen" class="selector" ref="selector">
      <div class="header">
        <span>Select an attendee to assign to the action item.</span>
      </div>
      <ul>
        <li v-for="attendee in attendees"
            :key="attendee.id"
            :class="{ selected: assignedIDs.includes(attendee.id) }"
            @click="selectAttendee(attendee)">
          <div class="media">
            <img :src="attendeeAvatar(attendee)" class="avatar" />
            <div class="media-text">{{ attendee.email }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Utils from '../../../../../utils'

export default {
  props: {
    assignedIDs: Array,
    attendees: Array,
  },

  data() {
    return {
      selectorOpen: false,
    }
  },

  computed: {
    assignees() {
      return this.attendees.filter(attendee => this.assignedIDs.includes(attendee.id))
    }
  },

  methods: {
    attendeeAvatar(attendee) {
      return Utils.getGravatarUrl(attendee.email, { size: 24 })
    },

    openSelector() {
      this.selectorOpen = true
      document.addEventListener('click', this.blurComponent);
    },

    closeSelector() {
      this.selectorOpen = false
      document.removeEventListener('click', this.blurComponent);
    },

    blurComponent(e) {
      if (this.selectorOpen && !this.$el.contains(e.target))
        this.closeSelector()
    },

    selectAttendee(attendee) {
      if (this.assignedIDs.includes(attendee.id)) {
        this.$emit('unassign-attendee', attendee)
      } else {
        this.$emit('assign-attendee', attendee)
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
