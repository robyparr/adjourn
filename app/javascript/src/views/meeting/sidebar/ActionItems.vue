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

        <button class="list-floating-text">
          <i class="fa fa-trash" :data-modal="`.confirm-aa-delete-${actionItem.id}`"></i>
        </button>
        <div :class="`modal confirm-aa-delete-${actionItem.id}`">
          <div class="modal-title">Are you sure?</div>
          <div class="modal-content">
            Are you sure you want to delete this action item?
          </div>
          <div class="modal-footer">
            <a href="#" :data-close-modal="`.confirm-aa-delete-${actionItem.id}`">
              No
            </a>
            <button class="button primary ml-4" @click="removeActionItem(actionItem)">
              Yes
            </button>
          </div>
        </div>
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
