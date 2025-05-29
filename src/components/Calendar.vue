<template>
  <nav class="px-4 flex items-center space-x-2">
    <Uibutton
      :customClass="'btn btn-sm text-white bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700'"
      @click="reset"
    >
      Today
    </Uibutton>
    <Uibutton
      :customClass="'btn btn-sm text-white bg-gradient-to-r from-gray-400 to-gray-600 hover:from-orange-500 hover:to-gray-700'"
      @click="shiftMonth(-1)"
    >
      ← Previous
    </Uibutton>
    <Uibutton
      :customClass="'btn btn-sm text-white bg-gradient-to-r from-gray-400 to-gray-600 hover:from-orange-500 hover:to-gray-700'"
      @click="shiftMonth(1)"
    >
      Next →
    </Uibutton>
    <transition name="fade" mode="out-in">
      <span :key="chosenDay.day" class="text-3xl ml-6">
        {{ chosenDay.day > 0 ? chosenDay.day : '' }} {{ formatMonthYear }}
      </span>
    </transition>
  </nav>

  <header class="grid grid-cols-7 gap-1 my-4">
    <div v-for="day in weekDays" :key="day" class="text-center font-semibold">
      {{ day }}
    </div>
  </header>

  <section class="overflow-hidden h-[70vh]">
    <transition-group name="fade" tag="div" class="grid grid-cols-7 gap-1">
      <div v-for="p in daystoPrepend" :key="'empty-' + p" class="h-24"></div>
      <div
        v-for="d in days"
        :key="d.toISOString().split('T')[0]"
        @click="dayHandle(d)"
        :class="[
          'card shadow-md transition-all duration-200 ease-in-out',
          'flex flex-col h-24 justify-center items-center cursor-pointer select-none',
          'border border-slate-300 dark:border-slate-600',
          'hover:bg-gray-300 dark:hover:bg-gray-700',
          'active:bg-gray-500 dark:active:bg-gray-800',
          isToday(d) ? 'bg-orange-100 dark:bg-orange-600 rounded-full' : '',
          isChosenDay(d) ? 'border-4 border-gray-200 dark:border-gray-400' : ''
        ]"
      >
        <div class="text-center text-gray-900 dark:text-gray-100 font-bold">
          {{ d.getDate() }}
        </div>
      </div>
    </transition-group>
  </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import Uibutton from './Uibutton.vue'

const viewDate = ref(new Date())

const chosenDay = ref({ day: 0, month: 0 })

const getStartOfMonth = (date: Date): Date =>{
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

const isSameDay =(d1: Date, d2: Date): boolean => {
  return d1.toDateString() === d2.toDateString()
}

const isToday =(date: Date): boolean  =>{
  const today = new Date()
  return isSameDay(date, today)
}

const isChosenDay =(date: Date): boolean => {
  return (
    date.getDate() === chosenDay.value.day &&
    date.getMonth() + 1 === chosenDay.value.month
  )
}

const shiftMonth = (amount: number) => {
  const newDate = new Date(viewDate.value)
  newDate.setMonth(newDate.getMonth() + amount)
  viewDate.value = newDate
  chosenDay.value = { day: 0, month: 0 }
}

const reset = () => {
  viewDate.value = new Date()
  chosenDay.value = { day: 0, month: 0 }
}

const dayHandle = (date: Date) => {
  chosenDay.value = { day: date.getDate(), month: date.getMonth() + 1 }
}

const weekDays = computed(() => {
  const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
  const base = new Date(2023, 0, 1) // Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    return formatter.format(d)
  })
})

const daystoPrepend = computed(() => {
  const firstDay = getStartOfMonth(viewDate.value)
  return firstDay.getDay()
})

const days = computed(() => {
  const start = getStartOfMonth(viewDate.value)
  const end = getEndOfMonth(viewDate.value)
  const result: Date[] = []

  const current = new Date(start)
  while (current <= end) {
    result.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return result
})

const formatMonthYear = computed(() => {
  return viewDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
