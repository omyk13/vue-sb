<template>
  <div class="counter">
    <h2>{{ title }}</h2>

    <p v-if="loading">Loading</p>
    <p v-if = "error">error : {{ error }}</p>

    <template v-else>
    <p>Count : {{ count }}</p>
    <p>Doubled : {{ doubled }}</p> 

    <button @click="increment">+</button>
    <button @click="decrement" :disabled="!canDecrement">-</button>
    <button @click="reset">RESET</button>
    <button @click="loadInitialCount">Load</button>
    
      <slot name = "slot here!!!"></slot>
  </template>

</div>
</template>

<script setup>
import { useCounterStore } from '../stores/counterStore.js'
import { storeToRefs } from 'pinia'
import {watch} from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['ATZero'])
const counterStore = useCounterStore()

const { count, doubled, canDecrement, loading, error } = storeToRefs(counterStore)
const { increment, decrement, reset, loadInitialCount } = counterStore


watch(count,(newValue)=>{
  if (newValue ===0){
    emit('ATZero')
  }
})

</script>

<style scoped>
.counter {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
.error{
  color: red
}
</style>
