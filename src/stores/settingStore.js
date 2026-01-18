import { defineStore} from 'pinia'
import {ref} from 'vue'

export const useSettingStore = defineStore('settings',() => {
    const step = ref(1)

    function setStep(value){
        step.value
    }

    return {step, setStep}
})