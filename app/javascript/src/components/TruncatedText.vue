<template>
  <span :data-tooltip="value">{{this.truncatedText()}}{{this.truncatedMarker()}}</span>
</template>

<script>
export default {
  props: {
    maxLength: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    shouldTruncate() {
      return (this.value.length) >= this.maxLength
    },

    truncatedText() {
      if (!this.shouldTruncate())
        return this.value

      return this.value.slice(0, this.maxLength)
    },

    truncatedMarker() {
      if (this.shouldTruncate())
        return '...'

      return ''
    },
  },
}
</script>

<style>

</style>
