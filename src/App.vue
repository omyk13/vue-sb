<template>
  <div>
    <h1>You did it with multiple counters!</h1>

    <MultiCounter/>


    <p>Total: {{ doubled }}</p>

    <p v-if="lastZeroMessage">{{ lastZeroMessage}}</p>


  </div>
</template>

<script setup>
import MultiCounter from './components/multiCounter.vue'
import { useCounterStore } from './stores/counterStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const doublestore = useCounterStore()
const { doubled } = storeToRefs(doublestore)
const lastZeroMessage = ref('')

</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
