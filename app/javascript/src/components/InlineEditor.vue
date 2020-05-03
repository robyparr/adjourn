<template>
  <div>
    <span class="display" @mousedown="mousedown()" @mouseup="mouseup()">
      <slot v-if="isDisplayMode" name="display" />
    </span>
    <span v-if="isEditMode" class="editor" ref="editorWrap">
      <input v-if="editor === 'textInput'"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @change="submitEditor($event.target.value)"
        @blur="submitEditor($event.target.value)"
        @keypress.enter="submitEditor($event.target.value)"
        autofocus="true" />
      <markdown-editor v-if="editor === 'markdownEditor'"
        :value="value"
        @change="submitEditor" />
    </span>
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor'

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

  data() {
    return {
      mode: 'display',
      longClick: false
    }
  },

  computed: {
    isDisplayMode() {
      return this.mode === 'display';
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
    },

    changeMode() {
      if (this.isDisplayMode) {
        this.mode = 'edit'
      } else {
        this.mode = 'display'
      }
      this.longClick = false
    },

    submitEditor(editorValue) {
      this.$emit('editor-changed', editorValue)
      this.changeMode()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
