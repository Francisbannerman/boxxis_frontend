<template>
  <div>
    <Sheet v-model:open="isOpen">
      <SheetTrigger>
        <Button variant="ghost" size="icon" :class="`hover:bg-muted ${className}`">
          <User class="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" class="w-full sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle class="flex items-center gap-2">
            <Avatar>
              <AvatarFallback class="bg-[#8E44AD] text-white">
                {{ userInitials }}
              </AvatarFallback>
            </Avatar>
            <span class="bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
              Profile
            </span>
          </SheetTitle>
        </SheetHeader>

        <div class="space-y-6 mt-6">
          <!-- Username Section -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center justify-between">
                <span>Username</span>
                <Button 
                  v-if="!isEditing"
                  variant="ghost" 
                  size="sm"
                  @click="startEditing"
                  class="text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                >
                  <Edit3 class="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div v-if="isEditing" class="space-y-3">
                <Input
                  v-model="tempUsername"
                  placeholder="Enter your username"
                  class="border-[#8E44AD]/30 focus:border-[#8E44AD]"
                />
                <div class="flex gap-2">
                  <Button 
                    size="sm" 
                    @click="saveUsername"
                    :disabled="savingUsername"
                    class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
                  >
                    {{ savingUsername ? 'Saving...' : 'Save' }}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    @click="cancelEdit"
                    class="border-[#8E44AD]/30"
                  >
                    Cancel
                  </Button>
                </div>
              </div>


              <div v-else class="space-y-3">
                <div>
                  <p class="text-lg font-semibold">{{ username }}</p>
                  <p class="text-sm text-muted-foreground">{{ authStore.user?.contactNumber }}</p>
                </div>
                
                <div class="bg-muted/50 rounded-lg p-3 border border-border">
                  <p class="text-xs text-muted-foreground mb-1">Referral Code</p>
                  <div class="flex items-center justify-between gap-2">
                    <p class="text-sm font-mono font-medium">{{ authStore.user?.referralCode }}</p>
                    <button 
                      @click="copyReferralCode"
                      class="p-2 hover:bg-muted rounded-md transition-colors"
                      :title="copied ? 'Copied!' : 'Copy referral code'"
                    >
                      <svg 
                        v-if="!copied"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                      <svg 
                        v-else
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                        class="text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- <div v-else class="space-y-2">
                <p class="font-large">{{ username }}</p>
                <p class="text-sm text-muted-foreground">{{ authStore.user?.contactNumber }}</p>
                <p class="text-sm text-muted-foreground">{{ authStore.user?.referralCode }}</p>
              </div> -->
            </CardContent>
          </Card>

          <!-- Recent Transactions Section -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center justify-between">
                <span class="flex items-center gap-2">
                  <Receipt class="h-4 w-4" />
                  Recent Transactions
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  @click="viewAllTransactions"
                  class="text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                >
                  View More
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div v-if="loadingTransactions" class="text-center py-4">
                <p class="text-sm text-muted-foreground">Loading...</p>
              </div>
              
              <p v-else-if="transactions.length === 0" class="text-center text-muted-foreground py-4 text-sm">
                No transactions yet
              </p>
              
              <div v-else>
                <div 
                  v-for="(transaction, index) in transactions" 
                  :key="transaction.id"
                  class="space-y-2"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div :class="`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`">
                        <component 
                          :is="transaction.type === 'credit' ? ArrowDownCircle : ArrowUpCircle"
                          :class="`h-4 w-4 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`"
                        />
                      </div>
                      <div>
                        <p class="font-medium text-sm">{{ transaction.description || 'Transaction' }}</p>
                        <p class="text-xs text-muted-foreground">{{ formatDate(transaction.date) }}</p>
                      </div>
                    </div>
                    <p :class="`font-bold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`">
                      {{ transaction.type === 'credit' ? '+' : '-' }}₵{{ transaction.amount.toFixed(2) }}
                    </p>
                  </div>
                  <Separator v-if="index < transactions.length - 1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Past Orders Section -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center justify-between">
                <span class="flex items-center gap-2">
                  <Package class="h-4 w-4" />
                  Past Orders
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  @click="viewAllOrders"
                  class="text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                >
                  View More
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              <div v-if="loading" class="text-center py-4">
                <p class="text-sm text-muted-foreground">Loading...</p>
              </div>
              
              <p v-else-if="orders.length === 0" class="text-center text-muted-foreground py-4 text-sm">
                No past orders
              </p>
              
              <div v-else>
                <div 
                  v-for="(order, index) in orders" 
                  :key="order.id"
                  class="space-y-2"
                >
                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <p class="font-medium text-sm">Order #{{ order.id.slice(0, 8) }}</p>
                      <Badge :class="`text-xs ${getOrderStatusColor(order.status)}`">
                        {{ order.status }}
                      </Badge>
                    </div>
                    <div class="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{{ formatDate(order.date) }}</span>
                      <span class="font-medium text-[#8E44AD]">₵{{ order.total?.toFixed(2) || '0.00' }}</span>
                    </div>
                  </div>
                  <Separator v-if="index < orders.length - 1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Commission Earnings Section -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center gap-2">
                <Users class="h-4 w-4" />
                Commission Earnings
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 bg-[#8E44AD]/10 rounded-lg">
                  <p class="text-2xl font-bold text-[#8E44AD]">₵{{ authStore.user?.earnedCommission?.toFixed(2) || '0.00' }}</p>
                  <p class="text-sm text-muted-foreground">Total Earned</p>
                </div>
                <div class="text-center p-3 bg-[#A3E635]/10 rounded-lg">
                  <p class="text-2xl font-bold text-[#A3E635]">₵{{ thisMonth.toFixed(2) }}</p>
                  <p class="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Referral Code:</span>
                  <Badge class="bg-[#8E44AD] text-white font-mono">{{ authStore.user?.referralCode }}</Badge>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Referrals:</span>
                  <Badge class="bg-[#8E44AD] text-white">{{ referrals }}</Badge>
                </div>
              </div>

              <div class="pt-2 border-t">
                <p class="text-xs text-muted-foreground text-center">
                  Earn 5% commission on every successful referral
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Logout Button -->
          <Button 
            @click="handleLogout"
            variant="outline"
            class="w-full border-red-500 text-red-500 hover:bg-red-50"
          >
            <LogOut class="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Login Modal -->
    <LoginModal v-model:open="showLoginModal" @success="handleLoginSuccess" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { User, Edit3, Users, Package, Receipt, ArrowDownCircle, ArrowUpCircle, LogOut } from 'lucide-vue-next'
import Button from './ui/button.vue'
import Input from './ui/input.vue'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Badge from './ui/badge.vue'
import Separator from './ui/separator.vue'
import { Avatar, AvatarFallback } from './ui/avatar'
import LoginModal from './LoginModal.vue'
import { transactionService } from '../api/services/transaction'
import { userService } from '../api/services/user'
import { useAuthStore } from '../store/auth'
import { toast } from 'vue-sonner'
import { useOrderStore } from '../store/orders'

export default {
  name: 'UserProfile',
  components: {
    User,
    Edit3,
    Users,
    Package,
    Receipt,
    ArrowDownCircle,
    ArrowUpCircle,
    LogOut,
    Button,
    Input,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
    Separator,
    Avatar,
    AvatarFallback,
    LoginModal
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const orderStore = useOrderStore()  // Initialize the store
    
    const isOpen = ref(false)
    const showLoginModal = ref(false)
    const isEditing = ref(false)
    const savingUsername = ref(false)
    const tempUsername = ref('')
    
    // Transactions
    const transactions = ref([])
    const loadingTransactions = ref(false)
    
    // Orders - use computed to get from store
    const allOrders = computed(() => orderStore.allOrders)
    const loading = computed(() => orderStore.loading)
    const orders = computed(() => orderStore.completedOrders.slice(0, 3)) // First 3 orders

    const copied = ref(false)
    
    // Commission
    const thisMonth = ref(0)
    const referrals = ref(0)

    const username = computed(() => authStore.user?.username || 'Guest')
    
    const userInitials = computed(() => {
      return username.value.split(' ').map(n => n[0]).join('').toUpperCase()
    })

    // Check authentication when sheet is opened
    watch(isOpen, (newVal) => {
      if (newVal && !authStore.isAuthenticated) {
        isOpen.value = false
        showLoginModal.value = true
      } else if (newVal && authStore.isAuthenticated) {
        fetchUserData()
      }
    })

    const fetchUserData = async () => {
      await Promise.all([
        fetchTransactions(),
        fetchOrders(),
        fetchCommissionData()
      ])
    }

    const fetchTransactions = async () => {
      if (!authStore.userId) return
      
      try {
        loadingTransactions.value = true
        const data = await transactionService.getUserTransactions(authStore.userId, 3)
        transactions.value = data
      } catch (error) {
        console.error('Failed to load transactions:', error)
        toast.error('Failed to load transactions')
      } finally {
        loadingTransactions.value = false
      }
    }

    const fetchOrders = async () => {
      if (!authStore.userId) return
      
      try {
        // Fetch orders only if not already loaded
        if (!orderStore.hasOrders) {
          await orderStore.fetchOrders()
        }
      } catch (error) {
        console.error('Failed to load orders:', error)
        toast.error('Failed to load orders')
      }
    }

    const fetchCommissionData = async () => {
      // TODO: Implement API call to fetch commission data
      // For now using placeholder data
      thisMonth.value = 0
      referrals.value = 0
    }

    const startEditing = () => {
      tempUsername.value = username.value
      isEditing.value = true
    }

    const copyReferralCode = async () => {
      const referralCode = authStore.user?.referralCode
      
      if (!referralCode) {
        toast.error('No referral code available')
        return
      }

      try {
        await navigator.clipboard.writeText(referralCode)
        copied.value = true
        toast.success('Referral code copied!')
        
        setTimeout(() => {
          copied.value = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
        toast.error('Failed to copy referral code')
      }
    }

    const saveUsername = async () => {
      if (!authStore.userId || !tempUsername.value.trim()) {
        toast.error('Please enter a valid username')
        return
      }

      try {
        savingUsername.value = true
        await userService.updateUsername(authStore.userId, tempUsername.value)
        authStore.updateUser({ username: tempUsername.value })
        isEditing.value = false
        toast.success('Username updated successfully')
      } catch (error) {
        console.error('Failed to update username:', error)
        toast.error('Failed to update username')
      } finally {
        savingUsername.value = false
      }
    }

    const cancelEdit = () => {
      tempUsername.value = username.value
      isEditing.value = false
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const getOrderStatusColor = (status) => {
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-[#A3E635]/20 text-[#A3E635]',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const viewAllTransactions = () => {
      isOpen.value = false
      router.push('/transactions')
    }

    const viewAllOrders = () => {
      isOpen.value = false
      router.push('/orders')
    }

    const handleLogout = async () => {
      try {
        await authStore.logout()
        orderStore.clearOrders() // Clear orders on logout
        isOpen.value = false
        toast.success('Logged out successfully')
        router.push('/')
      } catch (error) {
        console.error('Logout error:', error)
        toast.error('Failed to logout')
      }
    }

    const handleLoginSuccess = () => {
      // After successful login, open the profile sheet
      setTimeout(() => {
        isOpen.value = true
      }, 300)
    }

    onMounted(() => {
      authStore.initAuth()
    })

    return {
      isOpen,
      showLoginModal,
      isEditing,
      savingUsername,
      username,
      tempUsername,
      userInitials,
      transactions,
      loadingTransactions,
      orders,  // This is now computed from store
      loading, // This is from orderStore.loading
      thisMonth,
      referrals,
      authStore,
      copied,
      startEditing,
      saveUsername,
      cancelEdit,
      formatDate,
      getOrderStatusColor,
      viewAllTransactions,
      viewAllOrders,
      handleLogout,
      handleLoginSuccess,
      copyReferralCode
    }
  }
}
</script>