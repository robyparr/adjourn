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
      <attendee
        v-for="(attendee, index) in attendees"
        :key="attendee.id"
        :index="index"
        :attendee="attendee" />
    </ul>
  </div>
</template>

<script>
import Utils from '../../../../utils'
import Autocomplete from '../../../components/Autocomplete'
import Attendee from './attendees/Attendee'

import { mapState } from 'vuex'

export default {
  components: {
    Autocomplete,
    Attendee,
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      attendees: state => state.attendees.attendees
    })
  },

  methods: {
    addAttendee(attendeeOrEmail) {
      this.$store.dispatch('addAttendee', attendeeOrEmail.email || attendeeOrEmail)
    },

    parseAutocompleteResults(autocompleteResults) {
      const contactIDs = this.attendees.map(attendee => attendee.contact_id)
      return autocompleteResults.filter(result => !contactIDs.includes(result.id))
    },

    renderNoResultsMessage(autocompleteText) {
      return `No attendees found. Click here to add '${autocompleteText}'`
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
