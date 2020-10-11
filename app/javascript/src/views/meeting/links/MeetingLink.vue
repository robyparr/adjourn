<template>
  <span class="tag">
    <span class="name">{{link.visible_link_text}}</span>
    <span class="value">
      <a :href="`/meetings/${link.linked_meeting.id}`">
        <truncated-text
          :value="link.linked_meeting.title"
          :max-length="20" />
      </a>
    </span>
    <button type="button" class="action" @click="destroyLink">
      <i class="fa fa-times"></i>
    </button>
  </span>
</template>

<script>
import TruncatedText from '../../../components/TruncatedText'

export default {
  components: {
    TruncatedText,
  },

  props: {
    link: {
      required: true,
      type: Object,
    },
  },

  methods: {
    destroyLink() {
      this.$store.dispatch('destroyLink', this.link)
        .then(data => showInformationMessage(data.message))
    },
  },
}
</script>

<style>

</style>
