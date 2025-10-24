<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <Button 
            variant="ghost" 
            class="mb-4 text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
            @click="router.back()"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
            My Wallets
          </h1>
          <p class="text-muted-foreground mt-2">Manage your payment methods and wallets</p>
        </div>
        <Button 
          @click="showCreateWallet = true"
          class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
        >
          <Plus class="h-4 w-4 mr-2" />
          Add Wallet
        </Button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-muted-foreground">Loading wallets...</p>
      </div>

      <!-- Wallets Grid -->
      <div v-else class="space-y-6">
        <!-- System Wallet (Featured) -->
        <Card v-if="systemWallet" class="border-[#8E44AD] border-2">
          <CardHeader>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-[#8E44AD] flex items-center justify-center">
                  <WalletIcon class="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle class="flex items-center gap-2">
                    {{ systemWallet.walletName }}
                    <Badge class="bg-[#A3E635] text-[#2d1b3d]">System</Badge>
                  </CardTitle>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{ systemWallet.description || 'Main Nu Retail Wallet' }}
                  </p>
                  <p class="text-xs text-muted-foreground mt-1">
                    Account: {{ systemWallet.accountNumber }}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-muted-foreground mb-1">Available Balance</p>
                <p class="text-3xl font-bold text-[#8E44AD]">
                  ₵{{ (systemWallet.systemBalance || 0).toFixed(2) }}
                </p>
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
              <Button 
                class="w-full bg-[#A3E635] hover:bg-[#A3E635]/80 text-[#2d1b3d]"
                @click="showAddFundsDialog = true"
              >
                <Plus class="h-4 w-4 mr-2" />
                Add Custom Amount
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Custom Wallets -->
        <div v-if="customWallets.length > 0">
          <h2 class="text-xl font-semibold mb-4">Other Wallets</h2>
          <p class="text-sm text-muted-foreground mb-4">
            These are your connected payment methods. You can only add funds to your System Wallet.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              v-for="wallet in customWallets" 
              :key="wallet.walletId"
              class="hover:border-[#8E44AD] transition-colors"
            >
              <CardHeader>
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <CreditCard class="h-5 w-5 text-[#8E44AD]" />
                    </div>
                    <div class="flex-1">
                      <CardTitle class="text-base">{{ wallet.walletName }}</CardTitle>
                      <p class="text-xs text-muted-foreground mt-1">
                        {{ wallet.accountNumber }}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 text-red-500 hover:bg-red-50"
                    @click="confirmDeleteWallet(wallet)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div class="space-y-2">
                  <div v-if="wallet.description">
                    <p class="text-sm text-muted-foreground">{{ wallet.description }}</p>
                  </div>
                  <div class="pt-2">
                    <Badge variant="outline" class="text-xs">
                      Payment Method Only
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Empty State -->
        <Card v-if="customWallets.length === 0 && !systemWallet" class="border-dashed">
          <CardContent class="text-center py-12">
            <WalletIcon class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 class="text-lg font-semibold mb-2">No Wallets Yet</h3>
            <p class="text-muted-foreground mb-4">Add your first wallet to get started</p>
            <Button 
              @click="showCreateWallet = true"
              class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
            >
              <Plus class="h-4 w-4 mr-2" />
              Add Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Add Custom Amount Dialog -->
    <Dialog v-model:open="showAddFundsDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds to System Wallet</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Amount (₵)</label>
            <Input 
              v-model.number="customAmount" 
              type="number" 
              placeholder="Enter amount"
              min="1"
              step="0.01"
            />
          </div>
          <div class="bg-muted p-3 rounded-lg">
            <p class="text-sm text-muted-foreground">
              Current Balance: <span class="font-medium text-foreground">₵{{ (systemWallet?.systemBalance || 0).toFixed(2) }}</span>
            </p>
            <p class="text-sm text-muted-foreground mt-1">
              New Balance: <span class="font-medium text-[#8E44AD]">₵{{ ((systemWallet?.systemBalance || 0) + (customAmount || 0)).toFixed(2) }}</span>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showAddFundsDialog = false">Cancel</Button>
          <Button 
            @click="addCustomFunds"
            :disabled="!customAmount || customAmount <= 0 || addingFunds"
            class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
          >
            {{ addingFunds ? 'Processing...' : 'Add Funds' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Create Wallet Dialog -->
    <Dialog v-model:open="showCreateWallet">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Payment Method</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Wallet Name</label>
            <Input v-model="newWallet.walletName" placeholder="e.g., Mobile Money" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Account Number</label>
            <Input v-model="newWallet.accountNumber" placeholder="Enter account number" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description (Optional)</label>
            <Input v-model="newWallet.description" placeholder="Add a description" />
          </div>
          <div class="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p class="text-xs text-blue-800">
              <strong>Note:</strong> This will be added as a payment method. You can only add funds to your System Wallet.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showCreateWallet = false">Cancel</Button>
          <Button 
            @click="createWallet"
            :disabled="!newWallet.walletName || !newWallet.accountNumber || creating"
            class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
          >
            {{ creating ? 'Creating...' : 'Create Wallet' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="showDeleteConfirm">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Payment Method</DialogTitle>
        </DialogHeader>
        <p class="py-4">
          Are you sure you want to delete <strong>{{ walletToDelete?.walletName }}</strong>? This action cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteConfirm = false">Cancel</Button>
          <Button 
            @click="deleteWallet"
            :disabled="deleting"
            class="bg-red-500 hover:bg-red-600 text-white"
          >
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, WalletIcon, Plus, CreditCard, Trash2 } from 'lucide-vue-next'
import Button from '../components/ui/button.vue'
import Input from '../components/ui/input.vue'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog'
import Badge from '../components/ui/badge.vue'
import { walletService } from '../api/services/wallet'
import paymentService from '../api/services/paymentService'
import { useAuthStore } from '../store/auth'
import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const creating = ref(false)
const deleting = ref(false)
const addingFunds = ref(false)
const systemWallet = ref(null)
const customWallets = ref([])
const showCreateWallet = ref(false)
const showDeleteConfirm = ref(false)
const showAddFundsDialog = ref(false)
const walletToDelete = ref(null)
const customAmount = ref(null)

const newWallet = ref({
  walletName: '',
  accountNumber: '',
  description: ''
})

const fetchWallets = async () => {
  if (!authStore.userId) {
    toast.error('Please login to view wallets')
    router.push('/')
    return
  }

  try {
    loading.value = true
    
    // Fetch system wallet
    systemWallet.value = await walletService.getSystemWallet(authStore.userId)
    
    // Fetch custom wallets
    customWallets.value = await walletService.getUserCustomWallets(authStore.userId)
    
    console.log('System wallet:', systemWallet.value)
    console.log('Custom wallets:', customWallets.value)
  } catch (error) {
    console.error('Failed to load wallets:', error)
    toast.error('Failed to load wallets')
  } finally {
    loading.value = false
  }
}

const addFunds = async (amount) => {
  console.log('=== ADD FUNDS TO WALLET (Wallets Page) ===')
  console.log('Amount:', amount)

  if (!authStore.userId) {
    toast.error('Please login to add funds')
    return
  }

  if (!systemWallet.value) {
    toast.error('System wallet not found')
    return
  }

  addingFunds.value = true

  try {
    // Step 1: Call wallet topup API first
    console.log('Step 1: Calling wallet topup API...')
    const topupData = {
      userId: authStore.userId,
      amount: amount
    }
    
    console.log('Topup data:', topupData)
    const topupResponse = await walletService.topup(topupData)
    console.log('Topup response:', topupResponse)

    // Extract transaction or reference ID from topup response
    const transactionRef = topupResponse.transactionId || 
                          topupResponse.TransactionId || 
                          topupResponse.data?.transactionId ||
                          topupResponse.data?.TransactionId ||
                          `WALLET-${authStore.userId}-${Date.now()}`

    // Step 2: Create payment data
    const now = new Date()
    const walletId = systemWallet.value?.walletId || 'system-wallet'
    
    const paymentData = {
      amount: amount,
      description: `Add ₵${amount} to Nu Retail Wallet - ${now.toLocaleString()}`,
      themeId: walletId,
      clientReference: transactionRef
    }

    console.log('Payment data:', paymentData)

    // Step 3: Initiate payment with Hubtel
    console.log('Step 2: Initiating payment...')
    const paymentResponse = await paymentService.initiatePayment(paymentData)

    console.log('Payment response:', paymentResponse)

    // Extract checkout URL
    const checkoutUrl = paymentResponse.checkoutUrl || 
                       paymentResponse.data?.checkoutUrl

    if (!checkoutUrl) {
      throw new Error('Failed to get payment URL from payment response')
    }

    console.log('Payment URL:', checkoutUrl)

    // Step 4: Show redirect message
    toast.success(`Redirecting to Payment... 💳`, {
      description: `Please complete your ₵${amount} payment to add funds to your wallet.`
    })

    console.log('Redirecting to:', checkoutUrl)

    // Step 5: Redirect to Hubtel payment page
    setTimeout(() => {
      window.location.replace(checkoutUrl)
    }, 1500)

  } catch (error) {
    console.error('Failed to initiate payment:', error)
    
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       'Failed to initiate payment'
    
    toast.error('Payment Failed', {
      description: errorMessage
    })
  } finally {
    addingFunds.value = false
  }
}

const addCustomFunds = async () => {
  if (!customAmount.value || customAmount.value <= 0) {
    toast.error('Please enter a valid amount')
    return
  }

  showAddFundsDialog.value = false
  await addFunds(customAmount.value)
  customAmount.value = null
}

const createWallet = async () => {
  if (!authStore.userId) {
    toast.error('Please login to create a wallet')
    return
  }

  try {
    creating.value = true
    
    const walletData = {
      userId: authStore.userId,
      walletName: newWallet.value.walletName,
      accountNumber: newWallet.value.accountNumber,
      description: newWallet.value.description || null
    }
    
    await walletService.createWallet(walletData)
    
    toast.success('Payment method added successfully!')
    showCreateWallet.value = false
    
    // Reset form
    newWallet.value = {
      walletName: '',
      accountNumber: '',
      description: ''
    }
    
    // Refresh wallets
    await fetchWallets()
  } catch (error) {
    console.error('Failed to create wallet:', error)
    toast.error('Failed to add payment method')
  } finally {
    creating.value = false
  }
}

const confirmDeleteWallet = (wallet) => {
  walletToDelete.value = wallet
  showDeleteConfirm.value = true
}

const deleteWallet = async () => {
  if (!walletToDelete.value) return

  try {
    deleting.value = true
    
    await walletService.deleteWallet(walletToDelete.value.walletId)
    
    toast.success('Payment method deleted successfully!')
    showDeleteConfirm.value = false
    walletToDelete.value = null
    
    // Refresh wallets
    await fetchWallets()
  } catch (error) {
    console.error('Failed to delete wallet:', error)
    toast.error('Failed to delete payment method')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  fetchWallets()
})
</script>