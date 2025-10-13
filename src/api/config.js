// Base URL for all API calls
// This will use environment variables or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hammerhead-app-68j7i.ondigitalocean.app/api'
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5251/api'


// Export configuration for axios
export const config = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
}

// All your API endpoints in one place
// Use functions for dynamic URLs (with IDs)
export const endpoints = {
  // Authentication endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
    getUserByContact: '/User/get-with-contact',
    sendOtp: '/User/send-otp',
    verifyAndLogin: '/User/verify-and-login',
    createUser: '/User/create',
  },
  
  // Product endpoints
  products: {
    getAll: '/Product/getall',
    base: '/Products',
    byId: (id) => `/products/${id}`,
  },

  categories: {
    base:'/Category',
    getall: '/Category/getall',
    byId: (id) => `/Category/get/${id}`
  },
  
  // Order endpoints
  checkout: {
    base: '/Checkout',
    getUserCheckout: (userId) => `/Checkout/get_user_checkout?userId=${userId}`,
    create: '/Checkout/create_checkout'
  },

  wallet: {
    getUserAll: (userId) => `/Wallet/getuserAll?userId=${userId}`,
    addFunds: '/Wallet/add_funds',
    withdraw: '/Wallet/withdraw',
    addWallet: '/Wallet/create'
  },
  
  // User endpoints
  user: {
    profile: '/user/profile',
    wallet: '/user/wallet',
    updateProfile: '/user/profile',
    externalWallets: '/user/wallets',
  },

  // Cart endpoints (if separate from orders)
  cart: {
    base: '/cart',
    addItem: '/cart/items',
    removeItem: (itemId) => `/cart/items/${itemId}`,
    clear: '/cart/clear',
  }
}