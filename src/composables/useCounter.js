import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  function increment() {
    count.value += 1
  }

  function decrement() {
    if (count.value > 0) {
      count.value -= 1
    }
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}
