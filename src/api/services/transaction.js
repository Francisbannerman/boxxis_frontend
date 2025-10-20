// api/services/transaction.js
import apiClient from '../client'
import { mapTransactions } from '../mappers/transactionMapper'
import { useAuthStore } from '@/store/auth'

export const transactionService = {
  /**
   * Get user's transactions
   */
  async getUserTransactions(userId = null) {
    if (!userId) {
      const authStore = useAuthStore()
      userId = authStore.userId
    }
    
    try {
      const response = await apiClient.get(`/Transaction/getUsersTransactions?userId=${userId}`)
      console.log('Raw transactions response:', response)

      const mappedTransactions = mapTransactions(response, userId)
      console.log('Mapped transactions:', mappedTransactions)
      
      return mappedTransactions
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return []
    }
  }
}