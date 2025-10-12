import apiClient from '../client'

/**
 * Notification API Service
 * Handles all notification-related API calls
 */

const notificationService = {
  /**
   * Fetch all notifications for a user
   * @param {string} userId - The user's ID
   * @returns {Promise<Array>} Array of notifications
   */
  async getAllUserNotifications(userId) {
    try {
      // Since interceptor returns response.data directly,
      // the response here is already the data
      const data = await apiClient.get('/Notification/getalluser', {
        params: { userId }
      })
      
      console.log('API returned:', data) // Debug
      
      // Handle if data is wrapped in isSuccess format
      const rawNotifications = data.isSuccess 
        ? (data.data || [])
        : (Array.isArray(data) ? data : [])
      
      // Transform to match our expected format
      return rawNotifications.map(notification => ({
        id: notification.notificationId,
        title: notification.title || 'Notification',
        message: notification.message,
        isRead: notification.isRead !== undefined ? notification.isRead : false,
        createdAt: notification.dateSent
      }))
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Delete a specific notification
   * @param {string} id - The notification ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteNotification(id) {
    try {
      await apiClient.delete('/Notification/delete', {
        params: { 
          id 
        }
      })
      
      return true
    } catch (error) {
      console.error('Error deleting notification:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Mark a notification as read
   * @param {string} userId - The user's ID
   * @param {string} notificationId - The notification ID to mark as read
   * @returns {Promise<boolean>} Success status
   */
  async markAsRead(userId, notificationId) {
    try {
      // If you have this endpoint, uncomment and use it
      // await apiClient.patch('/Notification/markasread', null, {
      //   params: { 
      //     userId,
      //     notificationId 
      //   }
      // })
      
      return true
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Mark all notifications as read
   * @param {string} userId - The user's ID
   * @returns {Promise<boolean>} Success status
   */
  async markAllAsRead(userId) {
    try {
      // If you have this endpoint, uncomment and use it
      // await apiClient.patch('/Notification/markallasread', null, {
      //   params: { userId }
      // })
      
      return true
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Delete all notifications for a user
   * @param {string} userId - The user's ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteAllNotifications(userId) {
    try {
      // If you have a bulk delete endpoint, use it
      // Otherwise, this will be handled in the store with individual deletes
      // await apiClient.delete('/Notification/deleteall', {
      //   params: { userId }
      // })
      
      return true
    } catch (error) {
      console.error('Error deleting all notifications:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Get unread notification count
   * @param {string} userId - The user's ID
   * @returns {Promise<number>} Unread count
   */
  async getUnreadCount(userId) {
    try {
      // If you have a dedicated endpoint for count
      // const response = await apiClient.get('/Notification/unreadcount', {
      //   params: { userId }
      // })
      // return response.count || 0
      
      // Otherwise, fetch all and count unread
      const notifications = await this.getAllUserNotifications(userId)
      return notifications.filter(n => !n.isRead).length
    } catch (error) {
      console.error('Error getting unread count:', error)
      throw this.handleError(error)
    }
  },

  /**
   * Handle and format API errors
   * @param {Error} error - The error object
   * @returns {Error} Formatted error
   */
  handleError(error) {
    console.error('Full error object:', error)
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     error.response.statusText ||
                     'An error occurred'
      
      const customError = new Error(message)
      customError.status = error.response.status
      customError.data = error.response.data
      return customError
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.')
    } else {
      // Error in request setup
      return new Error(error.message || 'An unexpected error occurred')
    }
  }
}

export default notificationService