import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useCounter } from '../composables/useCounter.js'
import { useSettingStore } from './settingStore.js'

//should the store carry logic or no?
//feels nicer to have it separated in a composable
const STORAGE_KEY = 'counter-store'

export const useCounterStore = defineStore('counter', () => {

  //-------certain state-------------
  //hydrate??
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
  const counters = ref(saved?.counters ?? {})  //Initial value, zero if null?
  const ids = ref(saved?.ids ?? [])

  const loading = ref(false)
  const error = ref(null)

  let abortController = null
  let nextId =0
  const settings = useSettingStore()

  function addCounter(title) {
    const id = nextId++
    counters.value[id] = {
      id,
      title,
      value: 0,
      isZero: false,
    }
    ids.value.push(id)
  }

  function removeCounter(id) {
    delete counters.value[id]
    ids.value = ids.value.filter(x => x!== id)
  }

  function getCounterRef(id) {
    return computed({
      get: () => counters.value[id].value,
      set: v => {
        counters.value[id].value = v
        counters.value[id].isZero = v === 0
      },
    })
  }

  const totalDoubled = computed (() =>
    ids.value.reduce(
      (sum,id) => sum + counters.value[id].value * 2,0
    )
  )

  const total = computed (() =>
    ids.value.reduce(
      (sum,id) => sum + counters.value[id].value,0
    )
  )

  //persistence. huh?
  watch(
    () => ({counters: counters.value, ids: ids.value}),
    (state) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({state})
      )
    },

    {deep:true}
  )

  //async action test
  async function loadInitialCount(){

    abortController?.abort()
    abortController = new AbortController()

    loading.value = true
    error.value = null

    try{
      //api latency sim. Rule of thumb: always keep latest request according to GPT.
      //Always silent abort.
      await withRetry(async ()=> {
      await new Promise((resolve,reject) =>{
        const timeout =setTimeout(resolve, 1000)

        abortController.signal.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new DOMException('ABORTED', 'AbortError'))
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

  return {
    counters,
    ids,
    settings,
    total,
    totalDoubled,
    addCounter,
    removeCounter,
    getCounterRef,
    loadInitialCount,
    loading,
    error,
  }
})
