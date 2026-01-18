import { computed } from 'vue'

export function useCounter(count, step) {
  const doubled = computed(() => count.value * 2)
  const canDecrement = computed(() => count.value > 0)

  function increment() {
    count.value = count.value + step
  }

  function decrement() {
    if (canDecrement.value) {
      count.value = count.value - step
    }
  }

  function reset() {
    count.value = 0
  }

  return {
    doubled,
    canDecrement,
    increment,
    decrement,
    reset,
  }
}
