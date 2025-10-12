import apiClient from '../client'
import { endpoints } from '../config'

export const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Auth token and user data
   */
  async login(credentials) {
    const response = await apiClient.post(endpoints.auth.login, credentials)
    
    // Save token to localStorage
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
    }
    
    return response
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Created user and token
   */
  async register(userData) {
    const response = await apiClient.post(endpoints.auth.register, userData)
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
    }
    
    return response
  },

  /**
   * Logout user
   * @returns {Promise}
   */
  async logout() {
    try {
      await apiClient.post(endpoints.auth.logout)
    } finally {
      // Clear token regardless of API response
      localStorage.removeItem('auth_token')
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  },

  /**
   * Check if user exists with contact number
   * @param {string} contactNumber - User's contact number
   * @returns {Promise<Object>} User data or null
   */
  async getUserByContact(contactNumber) {
    try {
      const response = await apiClient.get(endpoints.auth.getUserByContact, {
        params: { contactNumber: contactNumber }
      })
      return response
    } catch (error) {
      if (error.response?.status === 404){
        return null
      }
      console.error('Get user by contact error:', error)
      throw error
    }
  },

  /**
   * Send OTP to user's contact number
   * @param {string} contactNumber - User's contact number
   * @returns {Promise<Object>} Response data
   */
  async sendOtp(contactNumber) {
    try {
      const response = await apiClient.get(endpoints.auth.sendOtp, {
        params: { contactNumber: contactNumber }
      })
      return response
    } catch (error) {
      console.error('Send OTP error:', error)
      throw error
    }
  },

  /**
   * Verify OTP and login user
   * @param {string} contactNumber - User's contact number
   * @param {string} otp - One-time password
   * @returns {Promise<Object>} Auth data with tokens and user info
   */
  async verifyAndLogin(contactNumber, otp) {
    try {
      const response = await apiClient.post(endpoints.auth.verifyAndLogin, {
        contactNumber,
        otp
      })
      
      // Save tokens if login successful
      if (response.isSuccess && response.data) {
        localStorage.setItem('auth_token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
      }
      
      return response
    } catch (error) {
      console.error('Verify and login error:', error)
      throw error
    }
  },

  /**
   * Create new user
   * POST /api/User/create
   */
  async createUser(username, contactNumber, referralCode, otp) {
    console.log('🟡🟡🟡 [AUTH] Starting createUser')
    console.log('👤 Username:', username)
    console.log('📱 Contact:', contactNumber)
    console.log('🎫 Referral:', referralCode)
    console.log('🔑 OTP:', otp)
    
    try {
      const response = await apiClient.post(endpoints.auth.createUser, {
        Username: username,
        ContactNumber: contactNumber,
        ReferralCode: referralCode,
        Otp: otp
      })
      
      console.log('✅✅✅ [AUTH] createUser SUCCESS')
      console.log('📥 Response:', response)
      // Save tokens (response should contain accessToken, refreshToken, user)
      if (response && response.accessToken) {
        localStorage.setItem('auth_token', response.accessToken)
        localStorage.setItem('refresh_token', response.refreshToken)
      }
      
      return response
    } catch (error) {
      console.error('❌❌❌ [AUTH] createUser ERROR:', error)
      console.error('Error details:', error.response?.data)
      throw error
    }
  },

  /**
   * Get current user profile with latest data
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User profile data
   */
  async getUserProfile(userId) {
    try {
      const response = await apiClient.get(`/User/get/${userId}`)
      return response
    } catch (error) {
      console.error('Get user profile error:', error)
      throw error
    }
  },

  /**
   * Refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New auth data
   */
  async refreshToken(refreshToken) {
    try {
      const response = await apiClient.post(endpoints.auth.refreshToken, {
        refreshToken
      })
      return response
    } catch (error) {
      console.error('Refresh token error:', error)
      throw error
    }
  }
}