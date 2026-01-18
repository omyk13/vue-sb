import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

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

  return {
    count,
    doubled,
    canDecrement,
    increment,
    decrement,
    reset,
  }
}
