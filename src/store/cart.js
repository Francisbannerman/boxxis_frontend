import { defineStore } from 'pinia'
import cartService from '../api/services/cartService'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
    cart: null,
    cartId: null,
    loading: false,
    error: null
  }),

  getters: {
    itemCount: (state) => {
      return state.cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    },

    subtotal: (state) => {
      return state.cartItems.reduce((sum, item) => {
        const price = item.price || 0
        const quantity = item.quantity || 0
        return sum + (price * quantity)
      }, 0)
    },

    // Use regular function, not arrow function
    shipping(state) {
      return 0
    },

    // Use regular function, not arrow function
    total(state) {
      const sub = this.subtotal || 0
      const ship = this.shipping || 0
      return sub + ship
    },

    isEmpty: (state) => {
      return state.cartItems.length === 0
    }
  },

  actions: {
    /**
     * Fetch cart items from API
     */
    async fetchCartItems() {
      const authStore = useAuthStore()
      
      if (!authStore.userId) {
        console.warn('User not authenticated')
        this.cartItems = []
        return []
      }

      this.loading = true
      this.error = null

      try {
        const items = await cartService.getCartItems(authStore.userId)
        this.cartItems = items
        
        // Also fetch cart details
        const cartData = await cartService.getUserCart(authStore.userId)
        this.cart = cartData
        
        // ✅ EXTRACT CARTID FROM CART DATA
        this.cartId = cartData?.cartId || null
        
        console.log('✅ Cart loaded:', {
          cartId: this.cartId,
          itemCount: this.cartItems.length,
          cart: this.cart
        })
        
        return this.cartItems
      } catch (err) {
        this.error = err.message || 'Failed to fetch cart items'
        console.error('Error in fetchCartItems:', err)
        this.cartItems = []
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Add item to cart
     */
    async addToCart(productId, quantity = 1) {
      const authStore = useAuthStore()
      
      if (!authStore.userId) {
        throw new Error('User not authenticated')
      }

      try {
        await cartService.addToCart(authStore.userId, productId, quantity)
        await this.fetchCartItems() // Refresh cart (this will also update cartId)
        return true
      } catch (err) {
        this.error = err.message || 'Failed to add item to cart'
        console.error('Error in addToCart:', err)
        throw err
      }
    },

    /**
     * Increase item quantity by 1
     */
    async increaseQuantity(cartProductId) {
      try {
        await cartService.increaseCartItem(cartProductId)
        
        // Optimistic update
        const item = this.cartItems.find(i => i.id === cartProductId)
        if (item) {
          item.quantity += 1
          item.amount = item.price * item.quantity
        }
        
        return true
      } catch (err) {
        // Revert on error
        await this.fetchCartItems()
        this.error = err.message || 'Failed to increase quantity'
        throw err
      }
    },

    /**
     * Decrease item quantity by 1
     */
    async decreaseQuantity(cartProductId) {
      try {
        const item = this.cartItems.find(i => i.id === cartProductId)
        
        if (item && item.quantity <= 1) {
          // If quantity is 1, remove item instead
          return await this.removeItem(cartProductId)
        }
        
        await cartService.decreaseCartItem(cartProductId)
        
        // Optimistic update
        if (item) {
          item.quantity -= 1
          item.amount = item.price * item.quantity
        }
        
        return true
      } catch (err) {
        // Revert on error
        await this.fetchCartItems()
        this.error = err.message || 'Failed to decrease quantity'
        throw err
      }
    },

    /**
     * Remove item from cart
     */
    async removeItem(cartProductId) {
      try {
        await cartService.deleteCartItem(cartProductId)
        
        // Remove from local state
        this.cartItems = this.cartItems.filter(item => item.id !== cartProductId)
        
        return true
      } catch (err) {
        this.error = err.message || 'Failed to remove item'
        console.error('Error in removeItem:', err)
        throw err
      }
    },

    /**
     * Clear all items from cart
     */
    async clearCart() {
      try {
        const deletePromises = this.cartItems.map(item => 
          cartService.deleteCartItem(item.id)
        )
        
        await Promise.all(deletePromises)
        this.cartItems = []
        this.cart = null
        this.cartId = null // ✅ Also clear cartId
        
        return true
      } catch (err) {
        this.error = err.message || 'Failed to clear cart'
        console.error('Error in clearCart:', err)
        throw err
      }
    },

    /**
     * Reset cart state (for logout)
     */
    reset() {
      this.cartItems = []
      this.cart = null
      this.cartId = null // ✅ Also reset cartId
      this.loading = false
      this.error = null
    }
  }
})