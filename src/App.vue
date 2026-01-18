<template>
  <div class="counter">
    <h1>You did it with a counter!</h1>
    <p>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>

    <p>Count: {{ count }}</p>

    <button @click="increment">+</button>

    <button @click="decrement" :disabled="count === 0">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { useCounter } from './composables/useCounter.js'

const { count, increment, decrement, reset } = useCounter()
</script>

<style scoped>
.counter {
  padding: 2rem;
  font-family: system-ui, sans-serif;
}
button {
  margin-right: 0.5rem;
}
</style>
