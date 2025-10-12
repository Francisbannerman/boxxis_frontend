import apiClient from '../client'

export const transactionService = {
  async getUserTransactions(userId, limit = 5) {
    try {
      const response = await apiClient.get(`/Transaction/getUsersTransactions?userId=${userId}`)
      // Return only the latest 'limit' transactions
      return Array.isArray(response) ? response.slice(0, limit) : []
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
  }
}