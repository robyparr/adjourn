<template>
  <div class="inline-editor">
    <span class="display" @mousedown="mousedown()" @mouseup="mouseup()">
      <slot v-if="isDisplayMode" name="display" />
    </span>
    <span v-if="isEditMode" class="editor" ref="editorWrap">
      <input v-if="editor === 'textInput'"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @blur="submitEditor"
        @keypress.enter="$event.target.blur()"
        ref="editor" />
      <markdown-editor v-if="editor === 'markdownEditor'"
        :initialValue="value"
        @blur="submitEditor"
        ref="editor" />
    </span>
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor'
import { defer } from 'lodash'

export default {
  components: {
    MarkdownEditor,
  },

  props: {
    editor: {
      type: String,
      required: false,
      default: 'textInput'
    },
    placeholder: String,
    value: String,
  },

  created() {
    this.$on('inline-editor:mode-changed', () => {
      if (this.isDisplayMode)
        return

      defer(() => {
        if (this.$refs.editor && this.$refs.editor.focus)
          this.$refs.editor.focus()
      })
    })
  },

  destroyed() {
    this.removeCustomBlurEventListener()
  },

  data() {
    return {
      mode: 'display',
      longClick: false
    }
  },

  computed: {
    isDisplayMode() {
      return this.mode === 'display'
    },

    isEditMode() {
      return this.mode === 'edit'
    },
  },

  methods: {
    mousedown() {
      this.longClickTimer = setTimeout(() => this.longClick = true, 250)
    },

    mouseup() {
      clearTimeout(this.longClickTimer)
      if (!this.longClick) {
        this.changeMode()
      }
      this.longClick = false
      this.$emit('click')
    },

    changeMode() {
      if (this.isDisplayMode) {
        this.mode = 'edit'
        this.addCustomBlurEventListener()
      } else {
        this.mode = 'display'
        this.removeCustomBlurEventListener()
      }
      this.longClick = false
      this.$emit('inline-editor:mode-changed')
    },

    submitEditor() {
      this.$emit('editor-changed', this.$refs.editor.value)
      this.changeMode()
    },

    customBlurClick(e) {
      if (this.isDisplayMode)
        return

      if (!this.$el.contains(e.target)) {
        this.submitEditor()
      }
    },

    addCustomBlurEventListener() {
      document.addEventListener('click', this.customBlurClick)
    },

    removeCustomBlurEventListener() {
      document.removeEventListener('click', this.customBlurClick)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
