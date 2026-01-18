import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCounter } from '../composables/useCounter.js'
import { useSettingStore } from './settingStore.js'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const settings = useSettingStore()

  function increment(){
    count.value += settings.step
  }

  function decrement(){
    count.value -= settings.step
  }

  const { doubled, canDecrement, reset } = useCounter(count)

  return { count, doubled, canDecrement, increment, decrement, reset }
})
