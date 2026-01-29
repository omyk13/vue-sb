import { computed,ref } from 'vue'

export function useCounter(count, step) {
  const doubled = computed(() => count.value * 2)
  const canDecrement = computed(() => count.value > 0)

  let abortController = null

  const loading = ref(false)
  const error = ref(null)

  function increment() {
    count.value = count.value + step
  }

  function decrement() {
    if (canDecrement.value) {
      count.value = count.value - step
    }
  }

  function reset() {
    count.value = 0
  }

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
        const timeout =setTimeout(resolve, 5000)

        abortController.signal.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new DOMException('ABORTED', 'AbortError'))
        })
      })
    })
    count.value = 11
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
    count,
    doubled,
    canDecrement,
    increment,
    decrement,
    loadInitialCount,
    reset,
  }
}
