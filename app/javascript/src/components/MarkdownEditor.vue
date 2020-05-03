<template>
  <editor
    ref="toastuiEditor"
    :initialValue="value"
    :options="editorOptions"
    previewStyle="tab" />
</template>

<script>
import { Editor } from '@toast-ui/vue-editor'

export default {
  components: {
    Editor,
  },

  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
  },

  data() {
    return {
      editorOptions: {
        usageStatistics: false,
        toolbarItems: [
          'heading',  'bold',       'italic', 'strike', 'divider',
          'hr',       'quote',      'divider',
          'ul',       'ol',         'divider',
          'table',    'link',       'divider',
          'code',     'codeblock',
        ]
      }
    }
  },

  mounted() {
    document.addEventListener('click', this.customBlurClick)
    document.addEventListener('keypress', this.customBlurKeypress)
  },

  destroyed() {
    document.removeEventListener('click', this.customBlurClick)
    document.removeEventListener('keypress', this.customBlurKeypress)
  },

  methods: {
    emitChangeEvent() {
      const markdownContent = this.$refs.toastuiEditor.invoke('getMarkdown')
      this.$emit('change', markdownContent)
    },

    customBlurClick(e) {
      if (!this.$el.contains(e.target)) {
        this.emitChangeEvent()
      }
    },

    customBlurKeypress(e) {
      if (e.key === 'Enter' && e.shiftKey) {
        this.emitChangeEvent()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
