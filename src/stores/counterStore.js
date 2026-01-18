import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useCounter } from '../composables/useCounter.js'
import { useSettingStore } from './settingStore.js'
import { normalizeModuleId } from 'vite/module-runner'

const STORAGE_KEY = 'counter-store'

export const useCounterStore = defineStore('counter', () => {
  
  //-------certain state-------------
  //hydrate??
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
  const count = ref(saved?.count ?? 0)  //Initial value, zero if null?
  
  const loading = ref(false)
  const error = ref(null)


  const settings = useSettingStore()

  const { doubled, canDecrement,increment,decrement, reset } = useCounter(count,settings.step)

 
  //persistence. huh?
  watch(
    count,
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({count: count.value})
      )
    },
    {deep:false}
  )

  //async action test
  async function loadInitialCount(){
    loading.value = true
    error.value = normalizeModuleId
    
    try{
      //api latency sim
      await new Promise(r => setTimeout(r,1000))

      const response = {count : 42}

      count.value = response.count
    } 
    catch (e) {
      error.value = 'failed to load count'

    }
    finally{
      loading.value = false
    }
  }

  return { count, doubled, canDecrement, increment, decrement, reset, loadInitialCount, loading, error }
})
