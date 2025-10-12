import apiClient from '../client'

class CheckoutService {
  /**
   * Create checkout/place order
   * @param {Object} checkoutData - The checkout data
   * @param {string} checkoutData.cartId - The cart ID
   * @param {string} checkoutData.customerId - The customer/user ID
   * @param {string} checkoutData.deliveryDate - Delivery date in ISO format
   * @param {string} checkoutData.deliveryLocation - Delivery address
   * @param {string} checkoutData.gpsLocation - GPS location (optional)
   * @param {string} checkoutData.deliveryNote - Delivery notes (optional)
   * @param {string} checkoutData.alternateNumber - Alternate phone number (optional)
   * @returns {Promise<Object>} Checkout response
   */
  async createCheckout(checkoutData) {
    try {
      const payload = {
        cartId: checkoutData.cartId,
        cartProductId: null, // Always null for now as per requirements
        customerId: checkoutData.customerId,
        orderType: 1, // Always 1 for now as per requirements
        deliveryDate: checkoutData.deliveryDate,
        deliveryLocation: checkoutData.deliveryLocation,
        gpsLocation: checkoutData.gpsLocation || null,
        deliveryNote: checkoutData.deliveryNote || null,
        alternateNumber: checkoutData.alternateNumber || null
      }

      const data = await apiClient.post('/Checkout/create_checkout', payload)
      
      return data.isSuccess ? data.data : data
    } catch (error) {
      console.error('Error creating checkout:', error)
      throw this.handleError(error)
    }
  }

  /**
   * Handle API errors
   * @param {Error} error - The error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 
                     error.response.data?.title ||
                     'Checkout failed'
      return new Error(message)
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.')
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred')
    }
  }
}

export default new CheckoutService()