import apiClient from '../client'
import { mapCheckouts } from '../mappers/orderMapper'
import { useAuthStore } from '@/store/auth'

export const orderService = {
  /**
   * Get user's checkouts/orders
   * @param {string} userId - User ID
   */
  async getUserOrders(userId = null) {
    if(!userId){
      const authStore = useAuthStore()
      userId = authStore.userId
    }
    try {
      const response = await apiClient.get(`/Checkout/get_user_checkout?userId=${userId}`)
      console.log('Raw checkout response:', response)
      
      const mappedOrders = mapCheckouts(response)
      console.log('Mapped orders:', mappedOrders)
      
      return mappedOrders
    } catch (error) {
      console.error('Error fetching orders:', error)
      return []
    }
  }
}