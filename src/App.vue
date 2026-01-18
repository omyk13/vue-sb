<template>
  <div>
    <h1>You did it with multiple counters!</h1>

    <Counter title="First Counter" :initialValue="5" />
    <Counter title="Second Counter" :initialValue="10" />
    <Counter title="Third Counter" :initialValue="15" />
  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
</script>
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.Counter {
  margin-bottom: 1rem;
}
</style>
