import apiClient from '../services/api.js'
export function acounterFunctions() {
  async function getCounters() {
    try {
      const response = await apiClient.get('')
      return response.data.counters
    } catch (error) {
      console.error('Error fetching count: ', error)
      throw error
    }
  }

  async function createCounter(counter) {
    try {
      const response = await apiClient.post('', { counter })
      return response.data.reply
    } catch (error) {
      console.error('Error setting count: ', error)
      throw error
    }
  }

  async function delCounters(id) {
    try {
      const response = await apiClient.delete(`/delCounter/${id}`)
      return response.data.reply
    } catch (error) {
      console.error('Error deleting counter: ', error)
      throw error
    }
  }

  async function getRamp(id) {
    try {
      const response = await apiClient.get(`/getRamp/${id}`)
      return response.data.ramp
    } catch (error) {
      console.error('Error getting ramp value: ', error)
      throw error
    }
  }

  async function setRamp(id) {
    try {
      const response = await apiClient.post(`/setRamp/${id}`)
      return response.data.reply
    } catch (error) {
      console.error('Error setting ramp value: ', error)
      throw error
    }
  }
  return { getCounters, createCounter, delCounters, getRamp, setRamp }
}
