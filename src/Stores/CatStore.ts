import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCatFactStore = defineStore('catFact', () => {
    const fact = ref('')
    const error = ref(null)
    const loading = ref(false)

    async function fetchFact() {
        loading.value = true
        error.value = null
        try {
            const response = await axios.get('https://catfact.ninja/fact')
            fact.value = response.data.fact
        } catch (err) {
            error.value = err.message || 'There is some error'
        } finally {
            loading.value = false
        }
    }

    return { fact, error, loading, fetchFact }
})
