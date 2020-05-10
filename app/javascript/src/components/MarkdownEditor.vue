<template>
  <editor
    ref="toastuiEditor"
    :initialValue="value"
    :options="editorOptions"
    previewStyle="tab"
    @focus="addCustomListeners"
    @blur="removeCustomListeners" />
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import { delay } from 'lodash'

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
        ],
      }
    }
  },

  methods: {
    emitChangeEvent() {
      const markdownContent = this.$refs.toastuiEditor.invoke('getMarkdown')
      this.$emit('change', { editor: this, content: markdownContent })
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
    },

    addCustomListeners() {
      document.addEventListener('click', this.customBlurClick)
      document.addEventListener('keypress', this.customBlurKeypress)
    },

    removeCustomListeners() {
      delay(() => {
        document.removeEventListener('click', this.customBlurClick)
        document.removeEventListener('keypress', this.customBlurKeypress)
      }, 100)
    },

    clear() {
      this.$refs.toastuiEditor.invoke('setMarkdown', '')
    },

    focus() {
      this.$refs.toastuiEditor.invoke('focus')
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
