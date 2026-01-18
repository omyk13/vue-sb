import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubled = computed(() => count.value * 2)
  const canDecrement = computed(() => count.value > 0)

  function increment() {
    count.value++
  }
  function decrement() {
    if (canDecrement.value) {
      count.value--
    }
  }
  function reset() {
    count.value = 0
  }

  return { count, doubled, canDecrement, increment, decrement, reset }
})
