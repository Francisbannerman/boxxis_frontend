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
  {
    path: '/orderfailedpayment',
    name: 'OrderFailedPayment',
    component: () => import('@/views/OrderFailedPayment.vue'),
    meta: { 
      requiresAuth: true,
      title: 'Order Failed - Boxxis' 
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Boxxis-payment',
    name: 'BoxxisPayment',
    component: () => import('@/views/BoxxisPaymentConfirmation.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('@/views/Transactions.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/about',
    name: 'AboutUs',
    component: () => import('@/views/AboutUs.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue')
  },
  {
    path: '/faqs',
    name: 'FAQs',
    component: () => import('@/views/FAQs.vue')
  },
  {
    path: '/import-guide',
    name: 'ImportGuide',
    component: () => import('@/views/ImportGuide.vue')
  },
  {
    path: '/delivery-info',
    name: 'DeliveryInfo',
    component: () => import('@/views/DeliveryInfo.vue')
  },
  {
    path: '/quality-guarantee',
    name: 'QualityGuarantee',
    component: () => import('@/views/QualityGuarantee.vue')
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/Terms.vue')
  }
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

// ============================================================
// PAYMENT RETURN URL FIXER - Must run BEFORE auth guard
// ============================================================
router.beforeEach((to, from, next) => {
  const checkoutId = to.query.checkoutid
  
  // Fix malformed payment gateway return URLs
  if (checkoutId && 
      to.path.includes('order-success') && 
      to.path !== '/order-success') {
    
    console.log('Malformed payment return URL detected:', to.path)
    console.log('Redirecting to clean /order-success')
    next({
      path: '/order-success',
      query: to.query // Preserve all query parameters
    })
    return
  }
  
  next()
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