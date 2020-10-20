<template>
  <div>
    <div v-if="active"
         class="meeting-sidebar-overlay"
         @click="active = false">
      &nbsp;
    </div>
    <div :class="['column lg3 meeting-sidebar', { active: active }]">
      <div class="row tabs">
        <div id="attendees-tab"
             :class="['tab column sm4 relative', { selected: selectedTab === 'attendees' }]"
             @click="selectTab('attendees')"
             data-tooltip="Attendees">
          <i :class="['fa fa-lg fa-users', { 'opacity-50': selectedTab !== 'attendees' }]"></i>
          <span class="badge small absolute" style="top: 10%; left: 55%;">{{attendees.length}}</span>
        </div>
        <div id="action-items-tab"
             :class="['tab column sm4 relative', { selected: selectedTab === 'actionItems' }]"
             @click="selectTab('actionItems')"
             data-tooltip="Action Items">
          <i :class="['fa fa-lg fa-check', { 'opacity-50': selectedTab !== 'actionItems' }]"></i>
          <span class="badge small absolute" style="top: 10%; left: 55%;">{{actionItems.length}}</span>
        </div>
        <div id="agendum-details-tab"
             :class="['tab column sm4', { selected: selectedTab === 'agendumDetails' }]"
             @click="selectTab('agendumDetails')"
             data-tooltip="Agendum Details">
          <i :class="['fa fa-lg fa-book-open', { 'opacity-50': selectedTab !== 'agendumDetails' }]"></i>
        </div>
      </div>
      <div class="row">
        <div class="column sm12 pt-2 pl-4 bg-white border-b border-l"
             :style="{ borderLeftColor: 'transparent' }">
          <h5>{{ tabTitle }}</h5>
        </div>
      </div>
      <div class="row">
        <div class="column sm12 meeting-sidebar-contents">
          <attendees v-if="selectedTab === 'attendees'" />
          <action-items v-if="selectedTab === 'actionItems'" />
          <agendum-details v-if="selectedTab === 'agendumDetails'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Attendees from './sidebar/Attendees'
import ActionItems from './sidebar/ActionItems'
import AgendumDetails from './sidebar/AgendumDetails'
import { mapState } from 'vuex';

export default {
  components: {
    Attendees,
    ActionItems,
    AgendumDetails,
  },

  data() {
    return {
      active: false,
      selectedTab: 'attendees',
      tabs: {
        attendees: 'Attendees',
        actionItems: 'Action Items',
        agendumDetails: 'Agendum Details',
      },
    }
  },

  computed: {
    tabTitle() {
      return this.tabs[this.selectedTab]
    },

    ...mapState({
      selectedAgendumID: state => state.selectedAgendumID,
      actionItems: state => state.action_items.action_items,
      attendees: state => state.attendees.attendees,
    })
  },

  methods: {
    selectTab(tabName) {
      this.selectedTab = tabName
      this.active = true
    }
  },

  watch: {
    selectedAgendumID() {
      this.selectTab('agendumDetails')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
