import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import notificationService from '../api/services/notification'
import { useAuthStore } from './auth'

export const useNotificationStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.isRead).length
  )

  const unreadNotifications = computed(() =>
    notifications.value.filter(n => !n.isRead)
  )

  const readNotifications = computed(() =>
    notifications.value.filter(n => n.isRead)
  )

  /**
   * Fetch all notifications for the authenticated user
   * @returns {Promise<Array>} Array of notifications
   */
  const fetchNotifications = async () => {
    const authStore = useAuthStore()
    
    if (!authStore.userId) {
      throw new Error('User not authenticated')
    }

    loading.value = true
    error.value = null

    try {
      const data = await notificationService.getAllUserNotifications(authStore.userId)
      
      // Sort by createdAt descending (newest first)
      notifications.value = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
      
      return notifications.value
    } catch (err) {
      error.value = err.message || 'Failed to fetch notifications'
      console.error('Error in fetchNotifications:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a notification
   * @param {string} notificationId - The ID of the notification to delete
   * @returns {Promise<boolean>}
   */
  const deleteNotification = async (notificationId) => {
    const authStore = useAuthStore()
    
    if (!authStore.userId) {
      throw new Error('User not authenticated')
    }

    try {
      // Just pass the notificationId, not userId
      await notificationService.deleteNotification(notificationId)

      // Remove from local state
      notifications.value = notifications.value.filter(
        n => n.id !== notificationId
      )
      
      return true
    } catch (err) {
      error.value = err.message || 'Failed to delete notification'
      console.error('Error in deleteNotification:', err)
      throw err
    }
  }

  /**
   * Delete all notifications
   * @returns {Promise<boolean>}
   */
  const deleteAllNotifications = async () => {
    const authStore = useAuthStore()
    
    if (!authStore.userId) {
      throw new Error('User not authenticated')
    }

    try {
      // Delete all notifications one by one
      // If your API has a bulk delete endpoint, use it instead
      const deletePromises = notifications.value.map(notification =>
        notificationService.deleteNotification(authStore.userId, notification.id)
      )
      
      await Promise.all(deletePromises)

      // Clear local state
      notifications.value = []
      
      return true
    } catch (err) {
      error.value = err.message || 'Failed to delete all notifications'
      console.error('Error in deleteAllNotifications:', err)
      throw err
    }
  }

  /**
   * Mark a notification as read
   * @param {string} notificationId - The ID of the notification to mark as read
   * @returns {Promise<boolean>}
   */
  const markAsRead = async (notificationId) => {
    const authStore = useAuthStore()
    
    if (!authStore.userId) {
      throw new Error('User not authenticated')
    }

    try {
      // Update locally first for immediate UI feedback (optimistic update)
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification && !notification.isRead) {
        notification.isRead = true
      }

      // Make API call
      await notificationService.markAsRead(authStore.userId, notificationId)
      
      return true
    } catch (err) {
      // Revert optimistic update on error
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification) {
        notification.isRead = false
      }
      
      console.error('Error in markAsRead:', err)
      throw err
    }
  }

  /**
   * Mark all notifications as read
   * @returns {Promise<boolean>}
   */
  const markAllAsRead = async () => {
    const authStore = useAuthStore()
    
    if (!authStore.userId) {
      throw new Error('User not authenticated')
    }

    try {
      // Store previous state for rollback
      const previousState = notifications.value.map(n => ({ 
        id: n.id, 
        isRead: n.isRead 
      }))

      // Update locally first for immediate UI feedback (optimistic update)
      notifications.value.forEach(notification => {
        notification.isRead = true
      })

      // Make API call
      await notificationService.markAllAsRead(authStore.userId)
      
      return true
    } catch (err) {
      // Revert optimistic update on error
      const previousState = notifications.value.map(n => ({ 
        id: n.id, 
        isRead: false 
      }))
      
      console.error('Error in markAllAsRead:', err)
      throw err
    }
  }

  /**
   * Get unread notification count
   * @returns {number}
   */
  const getUnreadCount = () => {
    return unreadCount.value
  }

  /**
   * Add a new notification (for real-time updates)
   * @param {Object} notification - The notification object
   */
  const addNotification = (notification) => {
    // Add to beginning of array (newest first)
    notifications.value.unshift(notification)
  }

  /**
   * Clear all notifications from state (doesn't delete from server)
   */
  const clearNotifications = () => {
    notifications.value = []
    error.value = null
  }

  /**
   * Reset the store to initial state
   */
  const reset = () => {
    notifications.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    notifications,
    loading,
    error,
    
    // Getters
    unreadCount,
    unreadNotifications,
    readNotifications,
    
    // Actions
    fetchNotifications,
    deleteNotification,
    deleteAllNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    addNotification,
    clearNotifications,
    reset,
  }
})