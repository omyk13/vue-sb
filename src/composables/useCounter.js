import { ref, computed, watch } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(Number(localStorage.getItem('count')) || initialValue)

  const doubled = computed(() => count.value * 2)
  const canDecrement = computed(() => count.value > 0)

  function increment() {
    count.value += 1
  }

  function decrement() {
    if (canDecrement.value) {
      count.value -= 1
    }
  }

  function reset() {
    count.value = initialValue
  }

  watch(count, (newValue, oldValue) => {
    localStorage.setItem('count', newValue)
  })

  return {
    count,
    doubled,
    canDecrement,
    increment,
    decrement,
    reset,
  }
}
