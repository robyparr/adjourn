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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
