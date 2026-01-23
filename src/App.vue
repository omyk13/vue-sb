<template>
  <div>
    <h1>You did it with multiple counters!</h1>

    <Counter title="First Counter"/>
    <Counter title="Second Counter" />
    <Counter title="Third Counter" />

    <p>Total: {{ doubled }}</p>

    <p v-if="lastZeroMessage">{{ lastZeroMessage}}</p>


  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
import { useCounterStore } from './stores/counterStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const doublestore = useCounterStore()
const { doubled } = storeToRefs(doublestore)
const lastZeroMessage = ref('')


function atZeroHandler(){
   lastZeroMessage.value = `yay!`
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
