<template>
  <Popover v-model:open="isOpen" :class="mergedClassName">
    <PopoverTrigger as-child>
      <Button 
        variant="outline" 
        class="gap-2 border-[#A3E635] text-[#A3E635] hover:bg-[#A3E635] hover:text-[#2d1b3d]"
      >
        <WalletIcon class="h-4 w-4" />
        <span class="hidden sm:inline">{{ formatCurrency(balance) }}</span>
        <Badge class="bg-[#8E44AD] hover:bg-[#8E44AD]/80 text-white ml-1">
          Boxxis
        </Badge>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80" align="end">
      <Card class="border-0 shadow-none">
        <CardHeader class="pb-3">
          <CardTitle class="flex items-center gap-2">
            <WalletIcon class="h-5 w-5 text-[#8E44AD]" />
            <span class="bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
              Boxxis Balance
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Not Logged In State -->
          <div v-if="!authStore.isAuthenticated" class="text-center py-8">
            <WalletIcon class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 class="font-semibold mb-2">Login to View Wallet</h3>
            <p class="text-sm text-muted-foreground mb-4">
              Sign in to access your Boxxis wallet and manage your funds
            </p>
            <Button 
              @click="openLoginModal"
              class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
            >
              Login / Sign Up
            </Button>
          </div>

          <!-- Loading State -->
          <div v-else-if="loading" class="text-center py-8">
            <p class="text-sm text-muted-foreground">Loading wallet...</p>
          </div>

          <!-- Wallet Content -->
          <template v-else>
            <div class="text-center">
              <div class="text-3xl font-bold text-[#8E44AD]">
                {{ formatCurrency(balance) }}
              </div>
              <p class="text-sm text-muted-foreground">Available Balance</p>
            </div>
            
            <div class="space-y-2">
              <p class="text-sm font-medium">Quick Add Funds</p>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  v-for="amount in [10, 25, 50]"
                  :key="amount"
                  variant="outline"
                  size="sm"
                  @click="addFunds(amount)"
                  :disabled="addingFunds"
                  class="border-[#A3E635] text-[#A3E635] hover:bg-[#A3E635] hover:text-[#2d1b3d]"
                >
                  +₵{{ amount }}
                </Button>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Amount Spent This Month:</span>
                <span class="font-medium">{{ formatCurrency(monthlySpent) }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">Commissions earned:</span>
                <span class="font-medium text-[#A3E635]">{{ formatCurrency(earnedCommission) }}</span>
              </div>
            </div>

            <div class="pt-2 border-t">
              <p class="text-xs text-muted-foreground text-center">
                Get up to 50% of profits from referral purchases
              </p>
            </div>

            <div class="pt-2 border-t">
              <Button 
                variant="ghost" 
                class="w-full text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                @click="navigateToWallets"
              >
                Manage Other Wallets
              </Button>
            </div>
          </template>
        </CardContent>
      </Card>
    </PopoverContent>
  </Popover>

  <!-- Login Modal -->
  <LoginModal v-model:open="showLoginModal" @success="handleLoginSuccess" />
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { Wallet as WalletIcon } from 'lucide-vue-next'
import Button from './ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Badge from './ui/badge.vue'
import LoginModal from './LoginModal.vue'
import { walletService } from '../api/services/wallet'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { useToast } from './ui/toast/use-toast'

export default {
  name: 'Wallet',
  components: {
    WalletIcon,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Badge,
    LoginModal
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    const authStore = useAuthStore()
    const router = useRouter()
    const { toast } = useToast()

    // Merge className prop with attrs.class
    const mergedClassName = computed(() => {
      return [props.className, attrs.class].filter(Boolean).join(' ')
    })

    const balance = ref(0)
    const isOpen = ref(false)
    const loading = ref(false)
    const addingFunds = ref(false)
    const systemWallet = ref(null)
    const showLoginModal = ref(false)

    // Get data from auth store
    const earnedCommission = computed(() => authStore.user?.earnedCommission || 0)
    const monthlySpent = computed(() => authStore.user?.monthlyAmountSpent || 0)
    const userId = computed(() => authStore.userId)

    const fetchWallet = async () => {
      if (!userId.value) {
        console.warn('No userId available')
        return
      }

      try {
        loading.value = true
        systemWallet.value = await walletService.getSystemWallet(userId.value)
        
        if (systemWallet.value) {
          balance.value = systemWallet.value.systemBalance || 0
          console.log('System wallet loaded:', systemWallet.value)
        } else {
          console.warn('No system wallet found for user')
          balance.value = 0
        }
      } catch (error) {
        console.error('Failed to load wallet:', error)
        toast({
          title: 'Error',
          description: 'Failed to load wallet',
          variant: 'destructive'
        })
      } finally {
        loading.value = false
      }
    }

    // Watch for authentication changes
    watch(() => authStore.isAuthenticated, (isAuth) => {
      if (isAuth && userId.value) {
        fetchWallet()
      } else {
        balance.value = 0
        systemWallet.value = null
      }
    })

    // Watch for popover open - close if not authenticated
    watch(isOpen, async (newVal) => {
      if (newVal && !authStore.isAuthenticated) {
        // Popover will show login prompt
        return
      }
      
      if (newVal && authStore.isAuthenticated && userId.value) {
        await authStore.fetchUserProfile()
        await fetchWallet()
      }
    })

    onMounted(() => {
      if (authStore.isAuthenticated && userId.value) {
        fetchWallet()
      }
    })

    const openLoginModal = () => {
      isOpen.value = false
      showLoginModal.value = true
    }

    const handleLoginSuccess = () => {
      // After successful login, fetch wallet and open popover
      fetchWallet()
      setTimeout(() => {
        isOpen.value = true
      }, 300)
    }

    const addFunds = async (amount) => {
      if (!userId.value) {
        toast({
          title: 'Error',
          description: 'Please login to add funds',
          variant: 'destructive'
        })
        return
      }

      try {
        addingFunds.value = true
        
        // TODO: Implement your actual add funds API call
        // await walletService.addFunds(userId.value, amount)
        
        // For now, just update locally and show success
        balance.value += amount
        toast({
          title: 'Success',
          description: `₵${amount} added to your wallet!`
        })
        
        // Optionally refresh the wallet data from server
        await fetchWallet()
      } catch (error) {
        console.error('Failed to add funds:', error)
        toast({
          title: 'Error',
          description: 'Failed to add funds',
          variant: 'destructive'
        })
      } finally {
        addingFunds.value = false
      }
    }

    const formatCurrency = (amount) => {
      const value = parseFloat(amount) || 0
      return `₵${value.toFixed(2)}`
    }

    const navigateToWallets = () => {
      isOpen.value = false
      router.push('/wallets')
    }

    return {
      authStore,
      balance,
      isOpen,
      loading,
      addingFunds,
      earnedCommission,
      monthlySpent,
      showLoginModal,
      mergedClassName,
      openLoginModal,
      handleLoginSuccess,
      addFunds,
      formatCurrency,
      navigateToWallets
    }
  }
}
</script>