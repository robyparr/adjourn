<template>
  <div class="card" @click="$emit('click')">
    <div class="card-head">
      <span class="card-title">
        <slot name="title"></slot>
      </span>

      <div v-if="hasActions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div v-if="hasSecondaryInfo" class="card-secondary-info">
      <slot name="secondary-info"></slot>
    </div>

    <div class="card-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasActions: {
      type: Boolean,
      required: false,
      default: true,
    },
    hasSecondaryInfo: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
