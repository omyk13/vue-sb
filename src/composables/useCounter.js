import { computed } from 'vue'

export function useCounter(count) {
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
    count.value = 7
  }

  return {
    doubled,
    canDecrement,
    increment,
    decrement,
    reset,
  }
}
