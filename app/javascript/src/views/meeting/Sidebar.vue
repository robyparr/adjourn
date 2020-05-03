<template>
  <div>
    <div :class="['column lg3 meeting-sidebar', { active: true }]">
      <div class="row tabs">
        <div id="attendees-tab"
             :class="['tab column sm4', { selected: selectedTab === 'attendees' }]"
             @click="selectTab('attendees')">
          <i class="fa fa-users"></i>
        </div>
        <div id="action-items-tab"
             :class="['tab column sm4', { selected: selectedTab === 'actionItems' }]"
             @click="selectTab('actionItems')">
          <i class="fa fa-check"></i>
        </div>
        <div id="agendum-details-tab"
             :class="['tab column sm4', { selected: selectedTab === 'agendumDetails' }]"
             @click="selectTab('agendumDetails')">
          <i class="fa fa-book-open"></i>
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

export default {
  components: {
    Attendees,
    ActionItems,
    AgendumDetails,
  },

  data() {
    return {
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
  },

  methods: {
    selectTab(tabName) {
      this.selectedTab = tabName
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
