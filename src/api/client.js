import axios from 'axios'
import { config, endpoints } from './config'

// Create axios instance with base configuration
const apiClient = axios.create(config)

// Track if we're currently refreshing to avoid multiple refresh calls
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

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
  // SUCCESS HANDLER (first function)
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
  
  // ERROR HANDLER (second function) - THIS SHOULD BE SEPARATE!
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')
      
      if (!refreshToken) {
        console.log('No refresh token found, logging out')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
        return Promise.reject(error)
      }

      try {
        console.log('Attempting to refresh token...')
        
        const response = await axios.post(
          `${config.baseURL}${endpoints.auth.refreshToken}`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )
        
        const newAccessToken = response.data?.data?.accessToken || response.data?.accessToken
        const newRefreshToken = response.data?.data?.refreshToken || response.data?.refreshToken
        
        if (newAccessToken) {
          console.log('Token refreshed successfully')
          
          localStorage.setItem('auth_token', newAccessToken)
          if (newRefreshToken) {
            localStorage.setItem('refresh_token', newRefreshToken)
          }
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          processQueue(null, newAccessToken)
          
          return apiClient(originalRequest)
        } else {
          throw new Error('No access token in refresh response')
        }
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        processQueue(refreshError, null)
        
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
        
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    
    // Forbidden - user doesn't have permission
    if (error.response?.status === 403) {
      console.error('You do not have permission')
    }
    
    // Server error
    if (error.response?.status >= 500) {
      console.error('Server error, please try again later')
    }
    
    return Promise.reject(error)
  },


  async (error) => {
    const originalRequest = error.config
    
    // Unauthorized - token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return apiClient(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')
      
      if (!refreshToken) {
        // No refresh token, logout immediately
        console.log('No refresh token found, logging out')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        console.log('Attempting to refresh token...')
        
        // Call refresh token endpoint
        const response = await axios.post(
          `${config.baseURL}/Auth/refresh-token`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )
        
        const newAccessToken = response.data?.data?.accessToken || response.data?.accessToken
        const newRefreshToken = response.data?.data?.refreshToken || response.data?.refreshToken
        
        if (newAccessToken) {
          console.log('Token refreshed successfully')
          
          // Save new tokens
          localStorage.setItem('auth_token', newAccessToken)
          if (newRefreshToken) {
            localStorage.setItem('refresh_token', newRefreshToken)
          }
          
          // Update the failed request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          
          // Process queued requests
          processQueue(null, newAccessToken)
          
          // Retry the original request
          return apiClient(originalRequest)
        } else {
          throw new Error('No access token in refresh response')
        }
        
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        
        // Process queue with error
        processQueue(refreshError, null)
        
        // Clear tokens and redirect to login
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
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