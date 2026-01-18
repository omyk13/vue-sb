import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCounter } from '../composables/useCounter.js'
import { useSettingStore } from './settingStore.js'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const settings = useSettingStore()

  const { doubled, canDecrement,increment,decrement, reset } = useCounter(count,settings.step)

  return { count, doubled, canDecrement, increment, decrement, reset }
})
