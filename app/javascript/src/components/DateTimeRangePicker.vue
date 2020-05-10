<template>
  <div class="relative">
    <span class="text-gray-800 cursor-pointer"
          @click="pickerOpen ? cancel() : pickerOpen = true">
      <span slot="date">{{ selectedFrom.format('MMMM DD, YYYY') }}</span>
      <span slot="times">
        {{ selectedFrom.format('hh:mm A') }} to {{ selectedTo.format('hh:mm A') }}
      </span>
    </span>

    <div v-if="pickerOpen" class="bg-white shadow-lg rounded inline-block absolute z-10 left-0 mt-8">
      <div class="row">
        <div class="sm12 md6 column">
          <date-picker
            :date="selectedFrom"
            @date-selected="updateDate" />
        </div>
        <div class="sm12 md6 column relative">
          <h5 class="mt-4">From</h5>
          <time-picker
            :time="selectedFrom"
            @time-selected="updateTime('from', $event)" />

          <h5 class="mt-4">To</h5>
          <time-picker
            :time="selectedTo"
            @time-selected="updateTime('to', $event)" />

          <div v-if="errors.length" class="alert error mt-4 mb-4">
              <div v-for="(error, index) in errors"
                   :key="index"
                   class="text-red-500">
                {{ error }}
              </div>
          </div>

          <div class="row absolute bottom-0 inset-x-0">
            <div class="column md12 inline-flex">
              <button class="button flex-grow" @click="cancel">Cancel</button>
              <button class="button primary flex-grow ml-4" @click="submitDateTimes">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import dayjs from 'dayjs'

export default {
  components: {
    DatePicker,
    TimePicker
  },

  props: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selectedFrom: dayjs(this.from),
      selectedTo: dayjs(this.to),
      pickerOpen: false,
      errors: []
    }
  },

  computed: {
    fromDate() {
      return this.selectedFrom.format('YYYY-MM-DD')
    },

    fromTime() {
      return this.selectedFrom.format('hh:mm A')
    },

    toDate() {
      return this.selectedTo.format('YYYY-MM-DD')
    },

    toTime() {
      return this.selectedTo.format('hh:mm A')
    },
  },

  methods: {
    updateDate(date) {
      this.selectedFrom = dayjs(`${date} ${this.fromTime}`)
      this.selectedTo = dayjs(`${date} ${this.toTime}`)

      this.validateDateTimes()
    },

    updateTime(fromOrTo, time) {
      if (fromOrTo === 'from') {
        this.selectedFrom = dayjs(`${this.fromDate} ${time}`)
      } else {
        this.selectedTo = dayjs(`${this.toDate} ${time}`)
      }

      this.validateDateTimes()
    },

    validateDateTimes() {
      if (this.selectedFrom.isAfter(this.selectedTo)) {
        this.errors = ['"To" must be after "From"']
      } else {
        this.errors = []
      }
    },

    cancel() {
      this.selectedFrom = dayjs(this.from)
      this.selectedTo = dayjs(this.to)

      this.pickerOpen = false
    },

    submitDateTimes() {
      this.pickerOpen = false
      this.$emit('date-time-updated', this.selectedFrom, this.selectedTo)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
