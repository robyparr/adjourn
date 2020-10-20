<template>
  <div>
    <h4 v-if="addNewLink || links.length" class="mt-8">Links</h4>
    <div v-if="addNewLink" class="row">
      <div class="column md8">
        <div class="card mb-2">
          <div class="card-content">
            <div class="row mb-0">
              <div class="column md4">
                <select @change="(e) => newLink.link_type = e.target.value">
                  <option value="relates_to" :selected="newLink.link_type == 'relates_to'">Relates to</option>
                  <option value="follows_up" :selected="newLink.link_type == 'follows_up'">Follows up</option>
                  <option value="followed_up_by" :selected="newLink.link_type == 'followed_up_by'">Followed up by</option>
                </select>
              </div>
              <div class="column md5">
                <div v-if="selectedMeeting">
                  <strong class="block -mb-2">{{selectedMeeting.title}}</strong>
                  <span class="text-muted text-sm">{{selectedMeetingDate()}}</span>
                </div>
                <autocomplete
                  v-else
                  placeholder="Search meeting..."
                  :url="(q) => `/name-search?q=${encodeURIComponent(q)}`"
                  :parseResponse="(response) => response.filter(meetingResult => meetingResult.id !== meeting.id)"
                  :renderResultItem="renderMeetingAutocompleteResultItem"
                  @select-result="selectMeeting" />
              </div>
              <div class="column md3 text-right">
                <button type="button"
                        class="button primary with-icon"
                        :disabled="selectedMeeting == null"
                        @click="createLink">
                  <i class="icon fa fa-link"></i>
                  Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-x-2">
      <meeting-link
        v-for="link in links"
        :key="link.id"
        :link="link" />
    </div>
  </div>
</template>

<script>
import Autocomplete from '../../components/Autocomplete'
import MeetingLink from './links/MeetingLink'

import meetingService from '../../services/meetingService'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import _template from 'lodash/template'
import _truncate from 'lodash/truncate'

export default {
  components: {
    Autocomplete,
    MeetingLink,
  },

  props: {
    addNewLink: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  data() {
    return {
      selectedMeeting: null,
    }
  },

  mounted() {
    this.resetNewLink()
    this.fetchLinks()
  },

  computed: {
    ...mapState({
      meeting: state => state.meeting.meeting,
      links: state => state.meeting.links,
    }),
  },

  methods: {
    fetchLinks() {
      this.$store.dispatch('fetchLinks', { meeting: this.meeting })
    },

    selectMeeting(meeting) {
      if (!meeting.id) return

      this.newLink.to_meeting_id = meeting.id
      this.selectedMeeting = meeting
    },

    createLink() {
      this.$store.dispatch('createLink', { meeting: this.meeting, link: this.newLink })
        .then(() => showInformationMessage('Successfully created link.'))
      this.resetNewLink()
      this.selectedMeeting = null
      this.$emit('link-created')
    },

    resetNewLink() {
      this.newLink = {
        from_meeting_id: this.meeting.id,
        link_type: 'relates_to',
      }
    },

    selectedMeetingDate() {
      return dayjs(this.selectedMeeting.date).format('MMMM YYYY hh:mm A')
    },

    renderMeetingAutocompleteResultItem(meetingOrMessage) {
      if (!meetingOrMessage.id)
        return meetingOrMessage

      let meeting = meetingOrMessage
      const template =
        _template(`
          <div>
            <strong><%- title %></strong>
            <div class="text-muted"><%- start_date %></div>
          </div>
        `)

      const templateData = {
        title: _truncate(meeting.title),
        start_date: dayjs(meeting.start_date).format('MMMM DD, YYYY hh:mm A'),
      }
      return template(templateData)
    },
  }
}
</script>

<style>

</style>
