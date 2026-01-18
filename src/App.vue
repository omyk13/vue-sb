<template>
  <div>
    <h1>You did it with multiple counters!</h1>

    <Counter title="First Counter" />
    <Counter title="Second Counter" />
    <Counter title="Third Counter" />

    <p>Total: {{ doubled }}</p>
  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
import { useCounterStore } from './stores/counterStore.js'

const { doubled } = useCounterStore()
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
