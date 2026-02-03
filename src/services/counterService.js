import apiClient from '../services/api.js'

export default {
  async getCount(id) {
    try {
      const response = await apiClient.get(`/getcount/${id}`)
      return response.data.count
    } catch (error) {
      console.error('Error fetching count: ', error)
      throw error
    }
  },

  //changing names with context, ask TJ
  async setCount(counter) {
    try {
      const response = await apiClient.post(`/setCount/${id}`, { counter })
      return response.data.reply
    } catch (error) {
      console.error('Error setting count: ', error)
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
