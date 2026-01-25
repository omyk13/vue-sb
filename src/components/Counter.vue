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


  </template>

</div>
</template>

<script setup>
import { useCounterStore } from '../stores/counterStore.js'
import { useCounter } from '../composables/useCounter.js'
import { storeToRefs } from 'pinia'
import {watch, computed} from 'vue'

const props = defineProps({
id: {
    type: Number,
    required: true,
},
})

const emit = defineEmits(['at-zero'])
const store = useCounterStore()
const counterRef = store.getCounterRef(props.id)

const {
  count,
  doubled,
  canDecrement,
  decrement,
  increment,
  reset,
} = useCounter(counterRef, store.settings.step)

const isZero = computed(() => store.counters[props.id].isZero)
const title = computed(() => store.counters[props.id].title)
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
