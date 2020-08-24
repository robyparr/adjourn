<template>
  <div class="time-picker">
    <div class="inputs">
      <input type="tel"
        :class="{ error: errors.hour }"
        :value="hour"
        min="1" max="12" step="1"
        @change="changeHour"
        @click="selectText"
        ref="hourInput" />

      <span class="separator">:</span>

      <input type="tel"
        min="0" max="59" step="1"
        :class="{ error: errors.minute }"
        :value="minute"
        @change="changeMinute"
        @click="selectText"
        ref="minuteInput" />
    </div>

    <div class="meridian">
      <button :class="['button', 'outline', 'primary', { selected: meridian == 'AM' }]"
              @click="changeMeridian('AM')">
        AM
      </button>
      <button :class="['button', 'outline', 'primary', { selected: meridian == 'PM' }]"
              @click="changeMeridian('PM')">
        PM
      </button>
    </div>

    <div v-if="errors.hours" class="text-red">{errors.hour}</div>
    <div v-if="errors.minute" class="text-red">{errors.minute}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    time: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      errors: {},
      selectedTime: dayjs(this.time)
    }
  },

  computed: {
    hour() {
      return this.selectedTime.format('hh')
    },

    minute() {
      return this.selectedTime.format('mm')
    },

    meridian() {
      return this.selectedTime.format('A')
    }
  },

  methods: {
    changeHour(e) {
      this.selectedTime = this.selectedTime.hour(e.target.value)
      this.emitTimeSelectedEvent()
    },

    changeMinute(e) {
      this.selectedTime = this.selectedTime.minute(e.target.value)
      this.emitTimeSelectedEvent()
    },

    changeMeridian(meridian) {
      const dateTimeWithoutMeridian = this.selectedTime.format('YYYY-MM-DD hh:mm')

      this.selectedTime = dayjs(`${dateTimeWithoutMeridian} ${meridian}`)
      this.emitTimeSelectedEvent()
    },

    emitTimeSelectedEvent() {
      this.$emit('time-selected', this.selectedTime.format('hh:mm A'))
    },

    selectText(e) {
      e.target.select()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
