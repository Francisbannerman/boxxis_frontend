import axios from 'axios'
import { config } from './config'

// Create axios instance with base configuration
const apiClient = axios.create(config)

// REQUEST INTERCEPTOR
// Runs before every request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or Pinia store)
    const token = localStorage.getItem('auth_token')
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // You can add more here, like:
    // - Request ID for tracking
    // - User ID
    // - Custom headers
    
    console.log('Making request to:', config.url)
    return config
  },
  (error) => {
    // Handle request errors
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => {
    // Check if response has the standard API format
    if (response.data && typeof response.data === 'object') {
      // If it has isSuccess, return the whole response.data
      // (which includes data, isSuccess, message, errors)
      if ('isSuccess' in response.data) {
        return response.data
      }
    }
    
    // Otherwise return just response.data (for other endpoints)
    return response.data
  },
  (error) => {
    // Handle different error scenarios
    
    // Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
    }
    
    // Forbidden - user doesn't have permission
    if (error.response?.status === 403) {
      console.error('You do not have permission')
    }
    
    // Server error
    if (error.response?.status >= 500) {
      console.error('Server error, please try again later')
    }
    
    // Return error with useful information
    return Promise.reject(error)
  }
)

export default apiClient