import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCounter } from '../composables/useCounter.js'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const { doubled, canDecrement, increment, decrement, reset } = useCounter(count)

  return { count, doubled, canDecrement, increment, decrement, reset }
})
