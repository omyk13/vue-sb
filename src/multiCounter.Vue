<template>
    <div class ="multi-counter">
        <h1>Mutlti-Counter superb app</h1>


        <Counter 
            v-for = "(counter, index) in counters"
            :key = "counter.id"
            :title="counter.title"
            @at-zero = "handleZero(index)"
        >

        <template #extra>
            <p v-if="counter.isZero" style="color: red;">
            {{ counter.title }} reached zero!
            </p>
        </template>
        </Counter>

        <p> Total doubled count: {{totalDoubled}} </p>

    </div>
</template>

<script setup>

import {reactive,computed} from 'vue'
import Counter from '/.Counter.vue'
import {useCounterStore} from '../stores/counterStore.js'
import {storeToRefs} from 'pinia'

const store = useCounterStore()
const {doubled} = storeToRefs(store)

const counters = reactive([
    {id: 1, title: 'Counter 1', isZero:false},
    {id: 2 ,title: 'Counter 2'. isZero:false},
    {id: 3 ,title: 'Counter 3'. isZero:false}
])


function handleZero(index){
    counters[index].isZero = true
}

const totalDoubled = computed(()=> doubled.value)
</script>

<style scoped>
.multi-counter{
    padding: 1 rem
}

.multi-counter h1{
    text-align: center;
    margin-bottom: 2rem;
}
</style>


    </div>
</template>