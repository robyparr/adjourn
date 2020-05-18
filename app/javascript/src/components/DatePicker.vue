<template>
  <div class="calendar">
    <div class="header">
      <div class="month-selector" @click="previousMonth">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div>{{ currentMonth.format('MMMM YYYY') }}</div>
      <div class="month-selector" @click="nextMonth">
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>

    <div class="week">
      <div v-for="(day, index) in daysOfWeek" :key="index" class="day">{{ day }}</div>
    </div>
    <div v-for="(week, weekIndex) in weeks" :key="`week-${weekIndex}`" class="week">
      <div v-for="(day, dayIndex) in week"
           :key="`week-${weekIndex}-day-${dayIndex}`"
           :class="day.classes"
           @click="selectDate(day.date)">
        {{ day.date.date() }}
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    props: {
      date: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        currentMonth: dayjs(this.date),
        selectedDate: dayjs(this.date),
        daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      }
    },

    computed: {
      weeks() {
        const weeks = []

        const firstDayOfFirstWeekOfMonth = this.currentMonth.startOf('month').startOf('week')
        const lastDayOfLastWeekOfMonth = this.currentMonth.endOf('month').endOf('week')

        var currentDay = firstDayOfFirstWeekOfMonth
        while (currentDay <= lastDayOfLastWeekOfMonth) {
          var days = []

          for (var i = 0; i < 7; i++) {
            var dayClasses = ['day']

            if (currentDay.month() != this.currentMonth.month()) {
              dayClasses.push('inactive')
            } else if (currentDay.isSame(this.selectedDate, 'date')) {
              dayClasses.push('selected')
            } else if (currentDay.isSame(dayjs(), 'date')) {
              dayClasses.push('today')
            }

            days.push({ date: currentDay, classes: dayClasses })
            currentDay = currentDay.add(1, 'day')
          }

          weeks.push(days)
        }

        return weeks
      }
    },

    methods: {
      nextMonth() {
        this.currentMonth = this.currentMonth.add(1, 'month')
      },

      previousMonth() {
        this.currentMonth = this.currentMonth.subtract(1, 'month')
      },

      selectDate(date) {
        this.selectedDate = date
        this.$emit('date-selected', date.format('YYYY-MM-DD'))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
