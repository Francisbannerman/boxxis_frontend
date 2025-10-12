// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../api/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const refreshToken = ref(null)
  const accessTokenExpiry = ref(null)
  const refreshTokenExpiry = ref(null)

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const userId = computed(() => user.value?.userId || null)

  // Check if token is expired
  const isTokenExpired = () => {
    if (!accessTokenExpiry.value) return true
    return new Date(accessTokenExpiry.value) <= new Date()
  }

  // Check if token is expiring soon (within 5 minutes)
  const isTokenExpiringSoon = computed(() => {
    if (!accessTokenExpiry.value) return false
    const expiryDate = new Date(accessTokenExpiry.value)
    const now = new Date()
    const minutesUntilExpiry = (expiryDate - now) / 1000 / 60
    return minutesUntilExpiry < 5 && minutesUntilExpiry > 0
  })

  // Fetch fresh user profile from server
  const fetchUserProfile = async () => {
    if (!userId.value) {
      console.warn('No userId available to fetch profile')
      return
    }

    try {
      console.log('Fetching fresh user profile...')
      const userData = await authService.getUserProfile(userId.value)
      
      if (userData) {
        user.value = userData
        
        // Update localStorage with fresh data
        const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}')
        storedAuth.user = userData
        localStorage.setItem('auth', JSON.stringify(storedAuth))
        
        console.log('User profile refreshed:', {
          monthlySpent: userData.monthlySpent,
          earnedCommission: userData.earnedCommission
        })
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  // Initialize from localStorage
  const initAuth = () => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth)
        user.value = parsed.user
        accessToken.value = parsed.accessToken
        refreshToken.value = parsed.refreshToken
        accessTokenExpiry.value = parsed.accessTokenExpiry
        refreshTokenExpiry.value = parsed.refreshTokenExpiry

        // Check if token is expired
        if (isTokenExpired()) {
          console.log('Token expired on init, clearing auth')
          clearAuth()
        }
      } catch (error) {
        console.error('Failed to parse stored auth:', error)
        clearAuth()
      }
    }
  }

  const setAuth = (authData) => {
    user.value = authData.user
    accessToken.value = authData.accessToken
    refreshToken.value = authData.refreshToken
    accessTokenExpiry.value = authData.accessTokenExpiry
    refreshTokenExpiry.value = authData.refreshTokenExpiry

    // Persist to localStorage
    localStorage.setItem('auth', JSON.stringify({
      user: authData.user,
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
      accessTokenExpiry: authData.accessTokenExpiry,
      refreshTokenExpiry: authData.refreshTokenExpiry
    }))

    console.log('Auth set successfully', {
      userId: authData.user?.userId,
      tokenExpiry: authData.accessTokenExpiry
    })
  }

  const clearAuth = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    accessTokenExpiry.value = null
    refreshTokenExpiry.value = null
    localStorage.removeItem('auth')
    console.log('Auth cleared')
  }

  const login = async (authData) => {
    setAuth(authData)
  }

  const logout = async () => {
    try {
      // Optional: Call logout endpoint if available
      // await authService.logout()
    } finally {
      clearAuth()
    }
  }

  const updateUser = (userData) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}')
      storedAuth.user = user.value
      localStorage.setItem('auth', JSON.stringify(storedAuth))
    }
  }

  // Refresh access token using refresh token
  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      console.log('No refresh token available')
      clearAuth()
      return false
    }

    try {
      console.log('Attempting to refresh access token...')
      const response = await authService.refreshToken(refreshToken.value)
      
      if (response.isSuccess && response.data) {
        setAuth(response.data)
        console.log('Token refreshed successfully')
        return true
      }
      
      console.log('Token refresh failed: Invalid response')
      clearAuth()
      return false
    } catch (error) {
      console.error('Token refresh failed:', error)
      clearAuth()
      return false
    }
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    userId,
    isTokenExpiringSoon,
    initAuth,
    setAuth,
    clearAuth,
    login,
    logout,
    updateUser,
    isTokenExpired,
    refreshAccessToken,
    fetchUserProfile
  }
})