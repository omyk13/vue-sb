<template>
  <div class="counter">
    <h2>{{ title }}</h2>

    <p>Count : {{ count }}</p>
    <p>Doubled : {{ doubled }}</p>

    <button @click="increment">+</button>
    <button @click="decrement" :disabled="!canDecrement">-</button>
    <button @click="reset">RESET</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counterStore.js'
import { storeToRefs } from 'pinia'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const counterStore = useCounterStore()

const { count, doubled, canDecrement } = storeToRefs(counterStore)
const { increment, decrement, reset } = counterStore
</script>

<style scoped>
.counter {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
