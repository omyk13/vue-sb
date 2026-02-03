import apiClient from '../services/api.js'

export default {
  async getCounters() {
    try {
      const response = await apiClient.get('/getcounter')
      return response.data.counters
    } catch (error) {
      console.error('Error fetching count: ', error)
      throw error
    }
  },

  //changing names with context, ask TJ
  async createCounter(counter) {
    try {
      const response = await apiClient.post('/setCount', { counter })
      return response.data.reply
    } catch (error) {
      console.error('Error setting count: ', error)
      throw error
    }
  },

  async delCounter(id) {
    try {
      const response = await apiClient.delete(`/delCounter/${id}`)
      return response.data.reply
    } catch (error) {
      console.error('Error deleting counter: ', error)
      throw error
    }
  },

  async getRamp(id) {
    try {
      const response = await apiClient.get(`/getRamp/${id}`)
      return response.data.ramp
    } catch (error) {
      console.error('Error getting ramp value: ', error)
      throw error
    }
  },

  async setRamp(id) {
    try {
      const response = await apiClient.post(`/setRamp/${id}`)
      return response.data.reply
    } catch (error) {
      console.error('Error setting ramp value: ', error)
      throw error
    }
  },

  async getId() {
    try {
    } catch (error) {
      console.error('Error getting id list: ', error)
      throw error
    }
  },
}
