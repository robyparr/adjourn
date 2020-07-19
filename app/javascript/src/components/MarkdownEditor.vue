<template>
  <editor
    ref="toastuiEditor"
    :initialValue="initialValue"
    :options="editorOptions"
    previewStyle="tab"
    @focus="onFocus"
    @blur="onBlur" />
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import _delay from 'lodash/delay'

export default {
  components: {
    Editor,
  },

  props: {
    initialValue: {
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

  computed: {
    value() {
      return this.$refs.toastuiEditor.invoke('getMarkdown')
    },
  },

  methods: {
    emitBlurEvent() {
      this.$emit('blur', { target: this })
    },

    customBlurClick(e) {
      if (!this.$el.contains(e.target)) {
        this.emitBlurEvent()
      }
    },

    customBlurKeypress(e) {
      if (e.key === 'Enter' && e.shiftKey) {
        this.emitBlurEvent()
      }
    },

    onFocus() {
      document.addEventListener('click', this.customBlurClick)
      document.addEventListener('keypress', this.customBlurKeypress)
    },

    onBlur() {
      _delay(() => {
        document.removeEventListener('click', this.customBlurClick)
        document.removeEventListener('keypress', this.customBlurKeypress)
      }, 100)
    },

    clear() {
      this.$refs.toastuiEditor.invoke('setMarkdown', '')
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
