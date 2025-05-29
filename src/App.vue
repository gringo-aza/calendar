<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Calendar from "./components/Calendar.vue";
import Navbar from "./components/Navbar.vue";

const darkMode = ref(false);

onMounted(() => {
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
