<template>
  <div>
    <input type="text"
           placeholder="Add action item"
           class="mb-4"
           @keyup.enter="addActionItem" />

    <ul class="list border-0">
      <li v-for="(actionItem, index) in actionItems"
          :class="['list-item', index == 0 ? 'border' : 'border-r border-l border-b']"
          :key="actionItem.id">

        <action-item :actionItem="actionItem" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ActionItem from './actionItems/ActionItem'

export default {
  components: {
    ActionItem,
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      actionItems: state => state.action_items.action_items
    }),
  },

  methods: {
    addActionItem(e) {
      this.$store.dispatch('addActionItem', e.target.value)
      e.target.value = ''
    },

    removeActionItem(actionItem) {
      this.$store.dispatch('removeActionItem', actionItem.id)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
