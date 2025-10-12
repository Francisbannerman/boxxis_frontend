import { defineStore } from 'pinia'
import { orderService } from '@/api/services/orders'

export const useOrderStore = defineStore('order', {
  state: () => ({
    allOrders: [],
    completedOrders: [], // status 4 and 5
    activeOrders: [],    // status 1, 2, and 3
    loading: false,
    error: null
  }),
  
  getters: {
    totalOrders: (state) => state.allOrders.length,
    hasOrders: (state) => state.allOrders.length > 0
  },
  
  actions: {
    async fetchOrders(userId = null) {
      try {
        this.loading = true
        this.error = null
        
        const data = await orderService.getUserOrders(userId)
        
        // Store all orders
        this.allOrders = data
        
        // Filter completed orders (status 4 and 5)
        this.completedOrders = data.filter(order => order.status === 4 || order.status === 5)
        
        // Filter active orders (status 1, 2, and 3)
        this.activeOrders = data.filter(order => order.status === 1 || order.status === 2 || order.status === 3)
        
        return data
      } catch (error) {
        console.error('Error fetching orders:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    clearOrders() {
      this.allOrders = []
      this.completedOrders = []
      this.activeOrders = []
      this.error = null
    }
  }
})