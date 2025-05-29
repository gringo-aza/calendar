<template>
  <header
    class="flex justify-between items-center
           bg-gray-100 dark:bg-gray-800
           py-2 px-4
           border-b border-gray-300 dark:border-gray-700
           transition-colors duration-500 ease-in-out"
  >
    <h1 @click="goToGithub" class="text-2xl font-bold opacity-10 select-none cursor-pointer">
       My Calendar
    </h1>
    <button
      @click="$emit('toggle-dark-mode')"
      aria-label="Toggle dark mode"
      class="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-300"
    >
      <span v-if="!darkMode" class="text-gray-800">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
          <path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z"/>
        </svg>
      </span>
      <span v-else class="text-yellow-400">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
          <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96s96-43.1 96-96s-43.1-96-96-96zm246.4 80.5l-94.7-47.3l33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5l-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4l-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3l-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5l47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7l100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4l94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0c-49.9-49.9-49.9-131.1 0-181c49.9-49.9 131.1-49.9 181 0c49.9 49.9 49.9 131.1 0 181z"/>
        </svg>
      </span>
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{ darkMode: boolean }>();
const emit = defineEmits(['toggle-dark-mode']);
const goToGithub = () => {
  window.open('https://github.com/gringo-aza', '_blank');
}
</script>
