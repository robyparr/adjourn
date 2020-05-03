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

      <h4 class="mt-8">Agenda</h4>
      <draggable class="agenda"
                 v-model="meeting.agenda"
                 @end="sortAgenda"
                 draggable=".sortable">
        <agendum
          v-for="agendum in meeting.agenda"
          :key="agendum.id"
          class="sortable"
          :agendum="agendum" />

        <agendum :agendum="{}" />
      </draggable>
    </div>

    <!-- {/* Sidebar: Action items, Attendees, & Agendum details */} -->
    <!-- <MeetingSidebar /> -->
    <sidebar />
  </div>
</template>

<script>
import InlineEditor from '../components/InlineEditor'
import DateTimeRangePicker from '../components/DateTimeRangePicker'
import Agendum from './meeting/Agendum'
import Draggable from 'vuedraggable'
import Sidebar from './meeting/Sidebar'

export default {
  components: {
    InlineEditor,
    DateTimeRangePicker,
    Agendum,
    Draggable,
    Sidebar,
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
    },

    sortAgenda() {
      const agendaIDs = this.meeting.agenda.map(agendum => agendum.id)
      this.$store.dispatch('sortAgenda', agendaIDs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
