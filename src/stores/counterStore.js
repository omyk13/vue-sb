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
  const hydrate= JSON.parse(localStorage.getItem(STORAGE_KEY))
  const counters = ref(hydrate?.counters ?? {})  //Initial value, zero if null?
  const ids = ref(hydrate?.ids ?? [])


  let nextId =ids.value.length?Math.max(...ids.value)+1:0
  const settings = useSettingStore()

  function addCounter() {
    const id = nextId
    counters.value[id] = {
      id,
      title: `Counter ${id + 1}`,
      value: 0,
      isZero: false,
    }
    ids.value.push(id)
    console.log('New counter created at:',id)
    nextId++
    console.log('Next counter will be created at:',nextId)
  }

  function removeCounter(id) {
    delete counters.value[id]
    ids.value.splice(id,1)
    console.log('Counter removed from: ',id)
    nextId = id
    console.log('Next counter will be created at: ',nextId)
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
    [counters,ids],
    ([newCounters, newIds]) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          counters: newCounters,
          ids: newIds
        })
      )
    },
    {deep:true}
 )


  return {
    counters,
    ids,
    settings,
    total,
    totalDoubled,
    addCounter,
    removeCounter,
    getCounterRef,
  }
})
