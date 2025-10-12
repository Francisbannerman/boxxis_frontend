import apiClient from '../client'

export const walletService = {
  /**
   * Get all wallets for a user
   * @param {string} userId - User ID
   */
  async getUserWallets(userId) {
    try {
      const response = await apiClient.get(`/Wallet/getuserAll?userId=${userId}`)
      return response || []
    } catch (error) {
      console.error('Error fetching user wallets:', error)
      return []
    }
  },

  /**
   * Get the system wallet balance for a user
   * @param {string} userId - User ID
   */
  async getSystemWallet(userId) {
    try {
      const wallets = await this.getUserWallets(userId)
      
      // Find wallet where walletName is 'System.Wallet'
      const systemWallet = wallets.find(
        wallet => wallet.walletName === 'System.Wallet' || 
                  wallet.description === 'System.Wallet'
      )
      
      return systemWallet || null
    } catch (error) {
      console.error('Error fetching system wallet:', error)
      return null
    }
  },

  /**
   * Get all non-system wallets (for manage wallets page)
   * @param {string} userId - User ID
   */
  async getUserCustomWallets(userId) {
    try {
      const wallets = await this.getUserWallets(userId)
      
      // Filter out the system wallet
      const customWallets = wallets.filter(
        wallet => wallet.walletName !== 'System.Wallet' && 
                  wallet.description !== 'System.Wallet'
      )
      
      return customWallets
    } catch (error) {
      console.error('Error fetching custom wallets:', error)
      return []
    }
  },

  /**
   * Create a new wallet
   * @param {Object} walletData - Wallet creation data
   */
  async createWallet(walletData) {
    try {
      const response = await apiClient.post('/Wallet/create', walletData)
      return response
    } catch (error) {
      console.error('Error creating wallet:', error)
      throw error
    }
  },

  /**
   * Delete a wallet
   * @param {string}
   */
  async deleteWallet(walletId) {
    try {
      const response = await apiClient.delete(`/Wallet/delete?walletId=${walletId}`)
      return response
    } catch (error) {
      console.error('Error deleting wallet:', error)
      throw error
    }
  },

  /**
   * Add funds to wallet (placeholder for your payment integration)
   * @param {string} userId - User ID
   * @param {number} amount - Amount to add
   */
  async addFunds(userId, amount) {
    try {
      // TODO: Implement your payment API endpoint
      const response = await apiClient.post('/Wallet/add-funds', {
        userId,
        amount
      })
      return response
    } catch (error) {
      console.error('Error adding funds:', error)
      throw error
    }
  }
}