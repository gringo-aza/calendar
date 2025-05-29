<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-5 text-gray-800">
    <header class="bg-gray-100 py-2 px-4">
      <h1 class="text-2xl font-bold opacity-[.1]">My Calendar</h1>
    </header>

    <main class="p-4" role="main">
      <section aria-label="Calendar component">
        <Calendar />
      </section>
    </main>

    <footer class="mt-2 text-center text-sm text-gray-500 py-4">
      © {{ new Date().getFullYear() }} My Calendar Site
    </footer>
  </div>
</template>
