<template>
  <nav aria-label="Calendar navigation" class="px-4">
    <Uibutton
      :customClass="'bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700'"
      @click="reset"
    >
      Today
    </Uibutton>
    <Uibutton
      :customClass="'bg-gradient-to-r mx-4 from-gray-400 to-gray-600 hover:from-orange-500 hover:to-gray-700'"
      @click="shiftMonth(-1)"
    >
      ← Previous
    </Uibutton>
    <Uibutton
      :customClass="'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-orange-500 hover:to-gray-700'"
      @click="shiftMonth(1)"
    >
      Next →
    </UiButton>
    <transition name="fade" mode="out-in">
        <span :key="chosenDay.day" class="text-3xl ml-6">
  {{ chosenDay.day > 0 ? chosenDay.day : '' }} {{ viewDate.format('MMMM YYYY') }}
</span>

    </transition>
  </nav>
  <header class="grid grid-cols-7 gap-1 my-4" aria-label="Week Days">
    <div v-for="d in weekDays"
         class="text-center">
      <div>{{ d }}</div>
    </div>
  </header>
  <section class="overflow-hidden h-[70vh]" aria-label="Calendar Days">
    <transition-group name="fade" tag="div" class="grid grid-cols-7 gap-1">
      <div v-for="p in daystoPrepend" :key="'empty-' + p"></div>
      <div
        v-for="d in units"
        :key="d.format('YYYY-MM-DD')"
        @click="dayHandle(d)"
        :class="[
    'border border-slate-300 flex flex-col h-24 justify-center cursor-pointer hover:bg-gray-300 active:bg-gray-500',
    d.isToday() ? 'bg-orange-100 mx-10 rounded-full' : '',
    (d.date() === chosenDay.day && (d.month() + 1) === chosenDay.month) ? 'border-4 border-gray-200' : ''
  ]"
      >
        <div class="text-center">
          {{ d.format('D') }}
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import Uibutton from "./Uibutton.vue";

dayjs.extend(isToday);

type Props = {
  modelValue?: any;
  display?: 'month' | 'year' | 'week' | 'day';
  startDate?: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => null,
  display: () => 'month',
  startDate: () => '2022-12-05',
});

const emits = defineEmits(['update:modelValue']);

const viewDate = ref(dayjs(props.startDate));

// Типизируем chosenDay: day и month — числа
const chosenDay = ref<{ day: number; month: number }>({
  day: 0,
  month: 0,
});

const daystoPrepend = computed(() => {
  const startOfMonth = viewDate.value.startOf("month");
  const startOfFirstWeek = startOfMonth.startOf("week");
  const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, "day");
  return Array.from(new Array(daysToFirstDay).keys());
});

const dayHandle = (day: dayjs.Dayjs) => {
  chosenDay.value.day = day.date();
  chosenDay.value.month = day.month() + 1; // month() возвращает 0-11, добавляем 1
};

const units = computed(() => {
  const start = viewDate.value.startOf('month');
  const end = viewDate.value.endOf('month');
  const days = [];

  let current = start;

  while (current.isBefore(end) || current.isSame(end)) {
    days.push(current);
    current = current.add(1, 'day');
  }

  return days;
});

const shiftMonth = function (amount: number) {
  viewDate.value = viewDate.value.add(amount, 'month');
  chosenDay.value.day = 0;
  chosenDay.value.month = 0;
};

const reset = function () {
  viewDate.value = dayjs();
  chosenDay.value.day = 0;
  chosenDay.value.month = 0;
};

const weekDays = computed(() => {
  const start = dayjs().startOf('week');
  return Array.from({ length: 7 }, (_, i) => start.add(i, 'day').format('dddd'));
});
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(0);
}

.fade-leave-from {
  opacity: 1;
  transform: scale(0);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1);
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  width: 100%;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>