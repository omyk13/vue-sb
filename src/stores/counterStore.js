import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useCounter } from '../composables/useCounter.js'
import { useSettingStore } from './settingStore.js'


const STORAGE_KEY = 'counter-store'

export const useCounterStore = defineStore('counter', () => {

  //-------certain state-------------
  //hydrate??
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
  const count = ref(saved?.count ?? 0)  //Initial value, zero if null?

  const loading = ref(false)
  const error = ref(null)

  let abortController = null

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

    abortController?.abort()
    abortController = new AbortController()

    loading.value = true
    error.value = null

    try{
      //api latency sim. Rule of thumb: always keep latest request according to GPT. Always silent abort.
      await withRetry(async ()=> {
      await new Promise((resolve,reject) =>{
        const timeout =setTimeout(resolve, 1000)

        abortController.signal.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new DOMException('ABORTED', 'Abortrror'))
        })
      })
      count.value = 42
    })
  }
    catch (e) {
      if (e.name !=='AbortError'){
          error.value = 'failed to load count'
      }
      else{
        error.value = 'bad response'
      }
    }
    finally{
      loading.value = false
    }
  }

  async function withRetry(asyncFunction, retries = 3, delay = 1000) {
    for (let i =0; i < retries; i++){
      try{
        return await asyncFunction()

      }
      catch (e){
        if (i === retries -1) throw e
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  return { count, doubled, canDecrement, increment, decrement, reset, loadInitialCount, loading, error }
})
