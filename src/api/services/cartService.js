import apiClient from '../client'

/**
 * Cart API Service
 * Handles all cart-related API calls
 */

const cartService = {
  /**
   * Get user's cart
   * @param {string} userId - The user's ID
   * @returns {Promise<Object>} Cart object
   */
  async getUserCart(userId) {
    try {
      const data = await apiClient.get('/Cart/get_users_cart', {
        params: { userId }
      })
      
      return data.isSuccess ? data.data : data
    } catch (error) {
      console.error('Error fetching user cart:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Get all cart items for a user
   * @param {string} userId - The user's ID
   * @returns {Promise<Array>} Array of cart items
   */
  async getCartItems(userId) {
    try {
      const data = await apiClient.get('/Cart/get_users_cart', {
        params: { userId }
      })
      
      const cart = data.isSuccess ? data.data : data
      
      // Extract cart products and transform them
      const items = cart.cartProducts || []
      
      return items.map(item => ({
        id: item.cartProductId,
        productId: item.productId,
        cartId: item.cartId,
        name: item.product?.productName || 'Product',
        price: item.product?.sellingPrice || item.product?.unitPrice || (item.amount / item.quantity),
        quantity: item.quantity,
        amount: item.amount,
        image: item.product?.defaultImage || '/placeholder.jpg',
        category: item.product?.category?.categoryName || 'Uncategorized',
        dateAdded: item.dateAddedToCart,
        // Store original product data
        product: item.product
      }))
    } catch (error) {
      console.error('Error fetching cart items:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Get cart item count
   * @param {string} userId - The user's ID
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartItemCount(userId) {
    try {
      const data = await apiClient.get('/Cart/get_cart_item_count', {
        params: { userId }
      })
      
      return data.isSuccess ? data.data : (data.count || 0)
    } catch (error) {
      console.error('Error fetching cart count:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Add item to cart
   * @param {string} userId - The user's ID
   * @param {string} productId - The product ID to add
   * @param {number} quantity - Quantity to add
   * @returns {Promise<Object>} Updated cart item
   */
  async addToCart(userId, productId, quantity = 1) {
    try {
      const data = await apiClient.post('/Cart/add_to_cart', {
        userId,
        productId,
        quantity
      })
      
      return data.isSuccess ? data.data : data
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Increase cart item quantity
   * @param {string} cartProductId - The cart product ID
   * @returns {Promise<Object>} Updated cart item
   */
  async increaseCartItem(cartProductId) {
    try {
      const data = await apiClient.post('/Cart/increase_cart_item', null, {
        params: { cartProductId }
      })
      
      return data.isSuccess ? data.data : data
    } catch (error) {
      console.error('Error increasing cart item:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Decrease cart item quantity
   * @param {string} cartProductId - The cart product ID
   * @returns {Promise<Object>} Updated cart item
   */
  async decreaseCartItem(cartProductId) {
    try {
      const data = await apiClient.post('/Cart/decrease_cart_item', null, {
        params: { cartProductId }
      })
      
      return data.isSuccess ? data.data : data
    } catch (error) {
      console.error('Error decreasing cart item:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Delete item from cart
   * @param {string} cartProductId - The cart product ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteCartItem(cartProductId) {
    try {
      await apiClient.delete('/Cart/delete_cart_item', {
        params: { cartProductId }
      })
      
      return true
    } catch (error) {
      console.error('Error deleting cart item:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Get all cart products (alternative endpoint)
   * @param {string} userId - The user's ID
   * @returns {Promise<Array>} Array of cart products
   */
  async getAllCartProducts(userId) {
    try {
      const data = await apiClient.get('/Cart/get_all_cart_products', {
        params: { userId }
      })
      
      return data.isSuccess ? data.data : (Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching all cart products:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Handle and format API errors
   * @param {Error} error - The error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     error.response.statusText ||
                     'An error occurred'
      
      const customError = new Error(message)
      customError.status = error.response.status
      customError.data = error.response.data
      return customError
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.')
    } else {
      return new Error(error.message || 'An unexpected error occurred')
    }
  }
}

export default cartService