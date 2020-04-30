<template>
  <div className="row">
    <div className="column lg9 lg:pr-6">
      <inline-editor editor="textInput"
                     placeholder="Meeting title"
                     :value="meeting.title"
                     @editor-changed="updateMeetingTitle">
        <h3 slot="display" class="mb-1 meeting-title">{{ meeting.title }}</h3>
      </inline-editor>

      <date-time-range-picker
        :from="meeting.start_date"
        :to="meeting.end_date"
        @date-time-updated="updateMeetingFromTo" />

      <button class="button primary mt-4">Email Attendees</button>

      <!-- {/* Agenda */} -->
      <h4 class="mt-8">Agenda</h4>
      <div class="agenda">
        <agendum
          v-for="agendum in meeting.agenda"
          :key="agendum.id"
          :agendum="agendum" />

        <agendum :agendum="{}" />
      </div>
      <!-- <AgendaContainer /> -->
    </div>

    <!-- {/* Sidebar: Action items, Attendees, & Agendum details */} -->
    <!-- <MeetingSidebar /> -->
  </div>
</template>

<script>
import InlineEditor from '../components/InlineEditor'
import DateTimeRangePicker from '../components/DateTimeRangePicker'
import Agendum from './meeting/Agendum'

export default {
  components: {
    InlineEditor,
    DateTimeRangePicker,
    Agendum
  },

  data() {
    return {
      meeting: this.$store.state.meeting,
      calendarData: {}
    }
  },

  methods: {
    updateMeetingTitle(newTitle) {
      this.meeting.title = newTitle
      this.$store.dispatch('updateMeeting', this.meeting)
    },

    updateMeetingFromTo(from, to) {
      this.meeting.start_date = from.format()
      this.meeting.end_date = to.format()

      this.$store.dispatch('updateMeeting', this.meeting)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
