<template>
  <li :class="['list-item', index == 0 ? 'border' : 'border-r border-l border-b']">
    <div class="media">
      <img :src="attendeeAvatarUrl()" class="avatar" />
      <div class="media-text">
        <span :class="['truncate', { 'line-through': !attendee.attended }]">
          {{ attendee.email.slice(0, 25) }}<span v-if="attendee.email.length > 25">...</span>
        </span>
      </div>
    </div>
    <div class="list-floating-content">
      <div :id="`menu-${attendee.id}`" class="menu">
        <button type="button" class="button icon">
          <i class="fa fa-ellipsis-v"></i>
        </button>
        <ul class="menu-items">
          <li class="menu-item">
            <button type="button"
                    @click="toggleAttended()"
                    :title="attendButtonTitle()"
                    data-testid="attendee-attend-btn">
              <i :class="['fa', { 'fa-user-minus': attendee.attended, 'fa-user-plus': !attendee.attended }]"></i>
              {{ attendee.attended ? 'Unattend' : 'Attend' }}
            </button>
          </li>
          <li class="menu-item">
            <button type="button" @click="removeAttendee()">
              <i class="fa fa-trash"></i>
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import Utils from '../../../../../utils'
import Menu from '../../../../components/Menu'

export default {
  props: {
    attendee: Object,
    index: Number,
  },

  mounted() {
    this.menu = new Menu({ el: `#menu-${this.attendee.id}` })
  },

  methods: {
    attendeeAvatarUrl() {
      return Utils.getGravatarUrl(this.attendee.email)
    },

    removeAttendee() {
      this.$store.dispatch('removeAttendee', this.attendee.email)
    },

    toggleAttended() {
      const partialAttendee = { attended: !this.attendee.attended }
      this.$store.dispatch('updateAttendee', { id: this.attendee.id, partialAttendee })
    },

    attendButtonTitle() {
      if (this.attendee.attended)
        return 'Mark as not attended.'

      return 'Mark as attended.'
    },
  },
}
</script>

<style>

</style>
