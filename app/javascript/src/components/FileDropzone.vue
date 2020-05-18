<template>
  <form class="w-full bg-gray-200 border-2 border-gray-400 border-dashed
               flex items-center justify-center rounded"
        method="post"
        action=""
        enctype="multipart/form-data"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragover.prevent.stop="toggleDraggingOver"
        @dragenter.prevent.stop="toggleDraggingOver"
        @dragleave.prevent.stop="removeDraggingOver"
        @dragend.prevent.stop="removeDraggingOver"
        @drop.prevent.stop="dropFiles">
    <input type="file"
           id="files"
           name="files[]"
           class="hidden"
           data-multiple-caption="{count} files selected"
           multiple="multiple"
           @change="selectFiles" />
    <div class="flex flex-col items-center p-4">
      <i class="fas fa-file-upload fa-2x opacity-25"></i>
      <p class="mt-2 mb-0">
        <div v-if="files.length === 0">
          <label class="inline hover:text-blue-500 cursor-pointer" for="files">
            Choose a file
          </label> or drop one here.
        </div>
        <div v-else>
          <p>
            Uploading
            <strong>
              {{ files.length === 1 ? files[0].name : `${files.length} files`}}
            </strong>...
          </p>
        </div>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    uploadFiles: Function,
  },

  data() {
    return {
      files: [],
    }
  },

  methods: {
    toggleDraggingOver() {
      this.$el.classList.remove('bg-gray-200')
      this.$el.classList.add('bg-white')
    },

    removeDraggingOver() {
      this.$el.classList.remove('bg-white')
      this.$el.classList.add('bg-gray-200')
    },

    selectFiles(e) {
      this.triggerFileUploads(e.target.files)
    },

    dropFiles(e) {
      this.triggerFileUploads(e.dataTransfer.files)
    },

    triggerFileUploads(files) {
      this.removeDraggingOver()
      this.files = Array.from(files)

      this.uploadFiles(this.files).then(() => this.files = [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
