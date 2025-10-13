// In your main.js or a separate tokenRefresh.js file
import { useAuthStore } from '../store/auth'

let refreshInterval = null

export const startTokenRefresh = () => {
  const authStore = useAuthStore()
  
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
  
  // Check token every 4 minutes and refresh if expiring soon
  refreshInterval = setInterval(async () => {
    if (authStore.isAuthenticated && authStore.isTokenExpiringSoon) {
      console.log('Token expiring soon, refreshing...')
      await authStore.refreshAccessToken()
    }
  }, 4 * 60 * 1000) // Check every 4 minutes
}

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}