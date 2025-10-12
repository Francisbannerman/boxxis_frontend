// services/api/paymentService.js

import apiClient from '../client'

class PaymentService {
  /**
   * Initiate payment with Hubtel
   * @param {Object} paymentData - The payment data
   * @param {number} paymentData.amount - Total amount to pay
   * @param {string} paymentData.description - Payment description
   * @param {string} paymentData.themeId - Cart ID
   * @param {string} paymentData.clientReference - Checkout/Order ID
   * @returns {Promise<Object>} Payment response with checkout URL
   */
  async initiatePayment(paymentData) {
    try {
      const payload = {
        amount: paymentData.amount,
        description: paymentData.description,
        themeId: paymentData.themeId,
        clientReference: paymentData.clientReference
      }

      console.log('Initiating payment:', payload)

      const data = await apiClient.post('/Payment/initiate', payload)
      
      return data.isSuccess ? data.data : data
    } catch (error) {
      console.error('Error initiating payment:', error)
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
      const message = error.response.data?.message || 
                     error.response.data?.title ||
                     'Payment initiation failed'
      return new Error(message)
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.')
    } else {
      return new Error(error.message || 'An unexpected error occurred')
    }
  }
}

export default new PaymentService()