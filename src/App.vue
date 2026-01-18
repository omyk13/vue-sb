<template>
  <div class="counter">
    <h1>You did it with multiple counters!</h1>
    <p>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>

    <Counter title="First Counter" :initialValue="5" />
    <Counter title="Second Counter" :initialValue="10" />
    <Counter title="Third Counter" :initialValue="15" />
  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
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
