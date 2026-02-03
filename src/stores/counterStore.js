import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useSettingStore } from './settingStore.js'
import { getCounters, createCounter, delCounter } from '../services/counterService.js'

//should the store carry logic or no?
//feels nicer to have it separated in a composable
const STORAGE_KEY = 'counter-store'

export const useCounterStore = defineStore('counter', () => {
  //-------certain state-------------
  const counters = ref([])
  const loading = ref(false)
  const error = ref(null)
  const settings = useSettingStore()

  async function addCounter(counterData) {
    loading.value = true
    error.value = null
    try {
      const newCounter = await createCounter(counterData)
      await loadCounters()
      return newCounter
    } catch (e) {
      error.value = e
      console.error = ('Failed to add counter: ', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function loadCounters() {
    loading.value = true
    error.value = null

    try {
      const apiCounters = await getCounters()
      counters.value = apiCounters
    } catch (error) {
      error.value = error
      console.error('Failed to load counters: ', error)
    } finally {
      loading.value = false
    }

    async function removeCounter(id) {
      loading.value = true
      error.value = null
      try {
        await delCounter(id)
        await loadCounters()
      } catch (e) {
        error.value = e
        console.error('Failed to remove counter: ', e)
        throw e
      } finally {
        loading.value = false
      }
    }

    function getCounterRef(id) {
      return computed({
        get: () => counters.value[id].value,
        set: (v) => {
          counters.value[id].value = v
          counters.value[id].isZero = v === 0
        },
      })
    }

    const totalDoubled = computed(() =>
      ids.value.reduce((sum, id) => sum + counters.value[id].value * 2, 0),
    )

    const total = computed(() => ids.value.reduce((sum, id) => sum + counters.value[id].value, 0))

    const hydrate = JSON.parse(localStorage.getItem(STORAGE_KEY))
    counters = ref(hydrate?.counters ?? {}) //Initial value, zero if null?
    const ids = ref(hydrate?.ids ?? [])

    //persistence. huh?
    watch(
      [counters, ids],
      ([newCounters, newIds]) => {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            counters: newCounters,
            ids: newIds,
          }),
        )
      },
      { deep: true },
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
  }
})
