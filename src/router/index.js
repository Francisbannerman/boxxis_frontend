import { createRouter, createWebHistory } from 'vue-router'
import ShopPage from '../views/ShopPage.vue'
import WalletsPage from '../views/WalletPage.vue'
import AddWalletPage from '../views/AddWalletPage.vue'
import { useAuthStore } from '../store/auth'
import OrderDetails from '../views/OrderDetails.vue'
import Notifications from '../views/Notifications.vue'
import ConfirmCheckout from '../views/ConfirmCheckout.vue' // ✅ Add this line


const routes = [
  {
    path: '/',
    redirect: '/shop'
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage
  },
  {
    path: '/wallets',
    name: 'Wallets',
    component: WalletsPage
  },
  {
    path: '/wallets/add',
    name: 'AddWallet',
    component: AddWalletPage
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: OrderDetails
  },
  {
    path:'/notifications',
    name: 'Notifications',
    component: Notifications,
    meta: {requiresAuth: true},
  },
  {
    path: '/checkout',
    name: 'ConfirmCheckout',
    component: ConfirmCheckout,
    meta: { 
      requiresAuth: true,
      title: 'Checkout - Boxxis' 
    }
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: () => import('@/views/OrderSuccess.vue'),
    meta: { 
      requiresAuth: true,
      title: 'Order Confirmed - Boxxis' 
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to,from, savedPosition){
    if (savedPosition) {
      return savedPosition 
    } else {
      return { top: 0 }
    }
  }
})

export const setupAuthGuard = (router) => {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    // Initialize auth store if not already done
    if (!authStore.isAuthenticated) {
      authStore.initAuth()
    }

    if (to.meta.title){
      document.title = to.meta.title
    }

    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      // Redirect to home or show login modal
      next({
        path: '/',
        query: { redirect: to.fullPath } // Save intended destination
      })
    } else if (to.path === '/login' && authStore.isAuthenticated) {
      // Redirect authenticated users away from login page
      next('/')
    } else {
      next()
    }
  })
}

/**
 * Optional: Add axios response interceptor to redirect on 401
 */
export const handleUnauthorized = (router) => {
  const authStore = useAuthStore()
  
  // This should be called when axios interceptor detects 401
  authStore.logout()
  router.push({
    path: '/',
    query: { sessionExpired: 'true' }
  })
}

export default router