<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Calendar from "./components/Calendar.vue";
import Navbar from "./components/Navbar.vue";
import {useCatFactStore} from "./Stores/CatStore"

const darkMode = ref(false);
const catFactStore = useCatFactStore();

onMounted(() => {
  catFactStore.fetchFact()
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    darkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('darkMode', darkMode.value.toString());
};
</script>

<template>
  <div
    class="min-h-screen
           bg-gray-50 dark:bg-gray-900
           text-gray-800 dark:text-gray-200
           transition-colors duration-500 ease-in-out"
  >
    <Navbar :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />

    <main class="p-4">
      <section aria-label="Calendar component">
        <Calendar />
      </section>
    </main>

    <div class="max-w-md mx-auto mt-10 p-4 flex flex-col justify-start">
      <button
        class="btn btn-primary mb-4"
        @click="catFactStore.fetchFact"
        :disabled="catFactStore.loading"
      >
        Refresh
      </button>

      <div v-if="catFactStore.loading" class="alert alert-info shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
             viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
          <path fill="currentColor" d="M12 6v6l4 2" />
        </svg>
        <span>Loading...</span>
      </div>

      <div v-else-if="catFactStore.error" class="alert alert-error shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Error: {{ catFactStore.error }}</span>
      </div>

      <div v-else class="alert alert-success shadow-lg">
        <div style=" color: black;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
            <path
              d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54c-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16z"
              fill="currentColor" />
          </svg>
        </div>

        <span>Fact: {{ catFactStore.fact }}</span>
      </div>
    </div>


    <footer
      class="mt-2 text-center text-sm
             text-gray-500 dark:text-gray-400
             py-4
             select-none"
    >
      © {{ new Date().getFullYear() }} My Calendar Site
    </footer>
  </div>
</template>
