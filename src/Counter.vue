<template>
  <div class="counter">
    <h2>{{ title }}</h2>

    <p>Count : {{ count }}</p>
    <p>Doubled : {{ doubled }}</p>

    <button @click="increment">ADD</button>
    <button @click="decrement" :disabled="!canDecrement">SUBTRACT</button>
    <button @click="reset">RESET</button>
  </div>
  >
</template>
>

<script setup>
import { useCounter } from './composables/useCounter.js'

defineProps({
  title: {
    type: String,
    required: true,
  },
  initialValue: {
    type: Number,
    default: 0,
  },
})
const { count, canDecrement, doubled, increment, decrement, reset } = useCounter(initialValue)
</script>

<style scoped>
.counter {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
