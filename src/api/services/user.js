import apiClient from '../client'

export const userService = {
  async updateUsername(userId, username) {
    try {
      const response = await apiClient.put('/User/update', {
        userId,
        username
      })
      return response
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }
}