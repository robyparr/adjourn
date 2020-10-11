<template>
  <div class="row">
    <div class="column lg9 lg:pr-6">
      <inline-editor editor="textInput"
                     placeholder="Meeting title"
                     class="meeting-title"
                     :value="meeting.title"
                     @editor-changed="updateMeetingTitle">
        <h3 slot="display" class="mb-1">{{ meeting.title }}</h3>
      </inline-editor>

      <date-time-range-picker
        :from="meeting.start_date"
        :to="meeting.end_date"
        @date-time-updated="updateMeetingFromTo" />

      <button @click="emailAttendees"
              class="button primary mt-4"
              data-testid="email-attendees-button">
        Email Attendees
      </button>

      <a target="_blank"
         rel="noopener noreferrer"
         class="button mt-4"
         :href="`/meetings/${meeting.id}/download`">
        Download
      </a>

      <button class="button mt-4" @click="addNewLink = !addNewLink">
        Link Meeting
      </button>

      <links
        :addNewLink="addNewLink"
        @link-created="addNewLink = false" />

      <h4 class="mt-8">Agenda</h4>
      <draggable class="agenda"
                 v-model="agenda"
                 @end="sortAgenda"
                 draggable=".sortable"
                 handle=".drag-handle">
        <agendum
          v-for="agendum in agenda"
          :key="agendum.id"
          class="sortable"
          :agendum="agendum" />

        <agendum :agendum="{}" />
      </draggable>
    </div>

    <sidebar />
  </div>
</template>

<script>
import InlineEditor from '../components/InlineEditor'
import DateTimeRangePicker from '../components/DateTimeRangePicker'
import Agendum from './meeting/Agendum'
import Draggable from 'vuedraggable'
import Sidebar from './meeting/Sidebar'
import Links from './meeting/Links'
import meetingService from '../services/meetingService'

import { mapState } from 'vuex'

export default {
  components: {
    InlineEditor,
    DateTimeRangePicker,
    Agendum,
    Draggable,
    Sidebar,
    Links,
  },

  data() {
    return {
      addNewLink: false,
    }
  },

  computed: {
    ...mapState({
      meeting: state => state.meeting.meeting,
    }),

    agenda: {
      get() {
        return this.$store.state.agenda.agenda
      },

      set(agenda) {
        this.$store.commit('SET_AGENDA', agenda)
      },
    },
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
      const agendaIDs = this.agenda.map(agendum => agendum.id)
      this.$store.dispatch('sortAgenda', agendaIDs)
    },

    emailAttendees() {
      meetingService.emailAttendees(this.meeting.id)
        .then(({ message }) => showInformationMessage(message))
        .catch(({ message }) => showErrorMessage(message))
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
