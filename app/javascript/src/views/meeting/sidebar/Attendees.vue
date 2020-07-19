<template>
  <div>
    <autocomplete
      id="attendees-autocomplete"
      class="autocomplete bg-white flex-no-shrink"
      placeholder="Add Attendee"
      method="GET"
      :url="value => `/contacts/autocomplete?email=${encodeURIComponent(value)}`"
      :parseResponse="parseAutocompleteResults"
      :renderResultItem="item => item.email || item"
      @select-result="addAttendee"
      :renderNoResultsMessage="renderNoResultsMessage" />

    <ul class="list mt-4 attendees-list" :style="{ borderWidth: 0 }">
      <li v-for="(attendee, index) in meeting.attendees"
          :key="attendee.id"
          :class="['list-item', index == 0 ? 'border' : 'border-r border-l border-b']">
        <div class="media">
          <img :src="attendeeAvatarUrl(attendee)" class="avatar" />
          <div class="media-text">
            <span :class="['truncate', { 'line-through': !attendee.attended }]">
              {{ attendee.email.slice(0, 25) }}<span v-if="attendee.email.length > 25">...</span>
            </span>
          </div>
        </div>
        <div class="list-floating-content">
          <button type="button"
                  @click="toggleAttended(attendee)"
                  :title="attendButtonTitle(attendee)"
                  data-testid="attendee-attend-btn">
            <i :class="['fa', { 'fa-user-minus': attendee.attended, 'fa-user-plus': !attendee.attended }]"></i>
          </button>
          <button type="button" @click="removeAttendee(attendee)">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Utils from '../../../../utils'
import Autocomplete from '../../../components/Autocomplete'

export default {
  components: {
    Autocomplete,
  },

  data() {
    return {
      meeting: this.$store.state.meeting
    }
  },

  methods: {
    attendeeAvatarUrl(attendee) {
      return Utils.getGravatarUrl(attendee.email)
    },

    addAttendee(attendeeOrEmail) {
      this.$store.dispatch('addAttendee', attendeeOrEmail.email || attendeeOrEmail)
    },

    removeAttendee(attendee) {
      this.$store.dispatch('removeAttendee', attendee.email)
    },

    parseAutocompleteResults(autocompleteResults) {
      const contactIDs = this.meeting.attendees.map(attendee => attendee.contact_id)
      return autocompleteResults.filter(result => !contactIDs.includes(result.id))
    },

    renderNoResultsMessage(autocompleteText) {
      return `No attendees found. Click here to add '${autocompleteText}'`
    },

    toggleAttended(attendee) {
      const partialAttendee = { attended: !attendee.attended }
      this.$store.dispatch('updateAttendee', { id: attendee.id, partialAttendee })
    },

    attendButtonTitle(attendee) {
      if (attendee.attended)
        return 'Mark as not attended.'

      return 'Mark as attended.'
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
