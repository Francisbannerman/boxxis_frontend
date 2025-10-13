import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './index.css'
import { startTokenRefresh } from './utils/tokenRefresh'

const app = createApp(App)
const pinia = createPinia()

// Install Pinia FIRST
app.use(pinia)

// NOW you can use stores
import { useAuthStore } from './store/auth'
const authStore = useAuthStore()
await authStore.initAuth()

// Then install router and mount
app.use(router)
app.mount('#app')

startTokenRefresh()