import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: {
      id: 1,
      username: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null,
      initials: 'JD'
    },
    wallets: [
      {
        id: 1,
        type: 'MTN MoMo',
        accountNumber: '****-****-7890',
        fullNumber: '0241-234-567890',
        isDefault: true
      },
      {
        id: 2,
        type: 'GCB Bank',
        accountNumber: '****-****-1234',
        fullNumber: '1234-567-891234',
        isDefault: false
      }
    ],
    earnings: {
      totalEarned: 450.75,
      thisMonth: 125.50,
      referrals: 23,
      pendingPayouts: 75.25,
      commissionRate: 5
    }
  }),

  getters: {
    userInitials: (state) => {
      if (!state.profile.username) return 'UN'
      return state.profile.username
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },
    
    defaultWallet: (state) => {
      return state.wallets.find(wallet => wallet.isDefault)
    },
    
    formattedEarnings: (state) => {
      return {
        totalEarned: `₵${state.earnings.totalEarned.toFixed(2)}`,
        thisMonth: `₵${state.earnings.thisMonth.toFixed(2)}`,
        pendingPayouts: `₵${state.earnings.pendingPayouts.toFixed(2)}`
      }
    }
  },

  actions: {
    updateProfile(profileData) {
      this.profile = { ...this.profile, ...profileData }
    },

    addWallet(walletData) {
      const newWallet = {
        id: Date.now(),
        ...walletData,
        accountNumber: this.maskAccountNumber(walletData.fullNumber)
      }
      this.wallets.push(newWallet)
    },

    maskAccountNumber(number) {
      if (!number || number.length < 4) return number
      const visible = number.slice(-4)
      const masked = '*'.repeat(Math.max(0, number.length - 4))
      return `${masked.slice(0, 4)}-${masked.slice(4, 8)}-${visible}`
    }
  }
})