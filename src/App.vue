<template>
  <div>
    <h1>You did it with multiple counters!</h1>
    <MultiCounter/>
  </div>
</template>

<script setup>
isdamport MultiCounter from './components/multiCounter.vue'
import { useCounterStore } from './stores/counterStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'


</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
