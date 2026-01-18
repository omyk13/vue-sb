<template>
  <div>
    <h1>You did it with multiple counters!</h1>

    <Counter title="First Counter" @ATZero="atZeroHandler"/>
    <template #slot here!!!>
      <p style="color: burlywood;">This is content for the slot!</p>
    </template>
    <Counter title="Second Counter" />
    <Counter title="Third Counter" />

    <p>Total: {{ doubled }}</p>
  </div>
</template>

<script setup>
import Counter from './components/Counter.vue'
import { useCounterStore } from './stores/counterStore.js'
import { storeToRefs } from 'pinia'

const doublestore = useCounterStore()
const { doubled } = storeToRefs(doublestore)
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
