<template>
  <div class="multi-counter">
    <h1>Multi-Counter superb app</h1>

    <button @click="addCounter">Add Counter</button>
    <button @click="removeCounter">Remove Counter</button>
    <Counter v-for="id in store.ids" :key="id" :id="id" @at-zero="handleZero(index)">
      <template #extra>
        <p v-if="counter.isZero" style="color: red">{{ counter.title }} reached zero!</p>
      </template>
    </Counter>

    <p>Total doubled count: {{ store.totalDoubled }}</p>
    <p>Total count: {{ store.total }}</p>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Counter from '../components/Counter.vue'
import { useCounterStore } from '../stores/counterStore.js'
import { storeToRefs } from 'pinia'
import counterService from '../services/counterService.js'

const store = useCounterStore()
const { doubled } = storeToRefs(store)

const counters = reactive([])

let nextId = 0

function addCounter() {
  store.addCounter(store.ids.length + 1)
}

function removeCounter() {
  store.removeCounter(store.ids.length - 1)
}

function handleZero(index) {
  counters[index].isZero = true
}

const totalDoubled = computed(() => doubled.value)
</script>

<style scoped>
.multi-counter {
  padding: 1 rem;
}

.multi-counter h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
