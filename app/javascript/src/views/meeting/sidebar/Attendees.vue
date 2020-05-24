<template>
  <div>
    <autocomplete
      id="attendees-autocomplete"
      class="autocomplete bg-white flex-no-shrink"
      placeholder="Add Attendee"
      method="GET"
      :url="value => `/attendees/autocomplete?email=${encodeURIComponent(value)}`"
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
            <span class="truncate">
              {{ attendee.email.slice(0, 25) }}<span v-if="attendee.email.length > 25">...</span>
            </span>
          </div>
        </div>
        <button class="list-floating-content" @click="removeAttendee(attendee)">
          <i class="fa fa-trash"></i>
        </button>
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
      const attendeeIDs = this.meeting.attendees.map(attendee => attendee.id)
      return autocompleteResults.filter(result => attendeeIDs.indexOf(result.id) === -1)
    },

    renderNoResultsMessage(autocompleteText) {
      return `No attendees found. Click here to add '${autocompleteText}'`
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
