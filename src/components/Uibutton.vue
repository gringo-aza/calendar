<template>
  <button
    :class="computedClass"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

const baseClass =
  'text-white font-semibold px-6 py-2 rounded-full shadow-md transform hover:-translate-y-1 active:scale-95 transition duration-300 ease-in-out'

const computedClass = computed(() => `${baseClass} ${props.customClass}`)
</script>
