<template>
  <div class="autocomplete">
    <input :id="id"
           :type="type || 'search'"
           :placeholder="placeholder"
           autoComplete="off"
           ref="autocomplete"
           v-model="autocompleteText"
           @input="fetchResults" />

    <ul v-if="results" :class="listClasses" ref="resultList">
      <li v-for="(result, index) in results"
          :class="['list-item', { selected: selectedItem === index }]"
          :key="index"
          @click="selectResult(result)"
          v-html="renderResultItem(result)">
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce, isObject } from 'lodash'
import axios from 'axios'

const UP_ARROW_KEY_CODE = 38
const DOWN_ARROW_KEY_CODE = 40
const ENTER_KEY_CODE = 13

export default {
  props: {
    id: String,
    placeholder: String,
    type: String,
    url: Function,
    method: {
      type: String,
      required: false,
      default: 'GET'
    },
    parseResponse: Function,
    renderResultItem: Function,
    listClasses: {
      type: String,
      required: false,
      default: ''
    },
    renderNoResultsMessage: Function,
  },

  data() {
    return {
      results: null,
      autocompleteText: '',
      selectedItem: null,
    }
  },

  computed: {
    noResultsMessage() {
      if (this.renderNoResultsMessage)
        return this.renderNoResultsMessage(this.autocompleteText)

      return 'No results found.'
    }
  },

  mounted() {
    document.addEventListener('click', this.customBlurClick)
    document.addEventListener('keyup', this.onHotkeyUsed)
  },

  destroyed() {
    document.removeEventListener('click', this.customBlurClick)
    document.removeEventListener('keyup', this.onHotkeyUsed)
  },

  methods: {
    fetchResults: debounce(function(e) {
      if (e.target.value.length <= 3) return

      const url = this.url(e.target.value)
      axios({ url, method: this.method }).then((response) => {
        if (this.parseResponse) {
          this.results = this.parseResponse(response.data)
        } else {
          this.results = response.data
        }

        if (this.results.length === 0)
          this.results = [this.noResultsMessage]
      })
    }, 500),

    selectResult(result) {
      this.$emit('select-result', isObject(result) ? result : this.autocompleteText)
      this.reset()
    },

    reset() {
      this.results = null
      this.autocompleteText = ''
      this.selectedItem = null
    },

    customBlurClick(e) {
      if (!this.$el.contains(e.target)) {
        this.reset()
      }
    },

    onHotkeyUsed(e) {
      const eventIsForAllowedKeys = [
        UP_ARROW_KEY_CODE,
        DOWN_ARROW_KEY_CODE,
        ENTER_KEY_CODE,
      ].includes(e.keyCode)

      if (!this.$el.contains(e.target) || !eventIsForAllowedKeys || !this.results) {
        return
      }

      const maximumItem = this.results ? this.results.length - 1 : 1
      const shouldSelectFirstItem = this.selectedItem === null && e.keyCode === DOWN_ARROW_KEY_CODE
      const shouldSelectNextItem = e.keyCode === DOWN_ARROW_KEY_CODE && this.selectedItem < maximumItem
      const shouldSelectPreviousItem = e.keyCode === UP_ARROW_KEY_CODE && this.selectedItem > 0
      const shouldSelectItem = e.keyCode === ENTER_KEY_CODE && this.selectedItem !== null

      if (shouldSelectFirstItem) {
        this.selectedItem = 0
      } else if (shouldSelectNextItem) {
        this.selectedItem += 1
      } else if (shouldSelectPreviousItem) {
        this.selectedItem -= 1
      } else if (shouldSelectItem) {
        const selectedResult = this.results[this.selectedItem]
        this.selectResult(selectedResult)
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
