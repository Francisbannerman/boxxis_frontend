<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <Button
          variant="ghost"
          @click="$router.back()"
          class="mb-4"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back
        </Button>
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A3E635]/20 mb-4">
            <Wallet class="h-8 w-8 text-[#A3E635]" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Confirm Boxxis Wallet Payment
          </h1>
          <p class="text-gray-600">
            Review your order and enjoy 10% discount for paying with Boxxis Wallet
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="space-y-6">
        <!-- Discount Banner -->
        <Card class="border-2 border-[#A3E635] bg-gradient-to-r from-[#A3E635]/10 to-transparent">
          <CardContent class="p-6">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 rounded-full bg-[#A3E635] flex items-center justify-center">
                  <Tag class="h-6 w-6 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900 mb-1">
                  🎉 10% Wallet Discount Applied!
                </h3>
                <p class="text-sm text-gray-600">
                  You're saving ₵{{ discountAmount.toFixed(2) }} by paying with your Boxxis Wallet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Price Breakdown -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Receipt class="h-5 w-5 text-[#8E44AD]" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Original Price -->
            <div class="flex justify-between items-center pb-4 border-b">
              <span class="text-gray-600">Original Total</span>
              <span class="text-lg line-through text-gray-400">
                ₵{{ orderTotal.toFixed(2) }}
              </span>
            </div>

            <!-- Discount -->
            <div class="flex justify-between items-center pb-4 border-b">
              <div class="flex items-center gap-2">
                <span class="text-[#A3E635] font-medium">Wallet Discount (10%)</span>
                <Badge class="bg-[#A3E635] hover:bg-[#A3E635]/80 text-white">
                  SAVE
                </Badge>
              </div>
              <span class="text-lg font-semibold text-[#A3E635]">
                -₵{{ discountAmount.toFixed(2) }}
              </span>
            </div>

            <!-- Final Amount -->
            <div class="flex justify-between items-center py-4 bg-gray-50 -mx-6 px-6 rounded-lg">
              <span class="text-xl font-bold text-gray-900">You Pay</span>
              <span class="text-3xl font-bold text-[#8E44AD]">
                ₵{{ finalAmount.toFixed(2) }}
              </span>
            </div>
          </CardContent>
        </Card>

        <!-- Delivery Details -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <MapPin class="h-5 w-5 text-[#8E44AD]" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-muted-foreground mb-1">Delivery Date</p>
                <p class="font-medium flex items-center gap-2">
                  <Calendar class="h-4 w-4 text-[#8E44AD]" />
                  {{ formatDate(deliveryDetails.deliveryDate) }}
                </p>
              </div>
              
              <div>
                <p class="text-sm text-muted-foreground mb-1">Delivery Location</p>
                <p class="font-medium">{{ deliveryDetails.deliveryLocation }}</p>
              </div>
            </div>

            <div v-if="deliveryDetails.gpsLocation" class="pt-4 border-t">
              <p class="text-sm text-muted-foreground mb-1">GPS Location</p>
              <p class="font-medium text-sm font-mono">{{ deliveryDetails.gpsLocation }}</p>
            </div>

            <div v-if="deliveryDetails.deliveryNote" class="pt-4 border-t">
              <p class="text-sm text-muted-foreground mb-1">Delivery Note</p>
              <p class="text-sm">{{ deliveryDetails.deliveryNote }}</p>
            </div>

            <div v-if="deliveryDetails.alternateNumber" class="pt-4 border-t">
              <p class="text-sm text-muted-foreground mb-1">Alternate Contact</p>
              <p class="font-medium">{{ deliveryDetails.alternateNumber }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- Order Items -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <ShoppingBag class="h-5 w-5 text-[#8E44AD]" />
              Order Items ({{ orderItems.length }})
            </CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <div class="max-h-[300px] overflow-y-auto">
              <div class="divide-y">
                <div 
                  v-for="item in orderItems" 
                  :key="item.id"
                  class="p-4 flex gap-4"
                >
                  <ImageWithFallback
                    :src="item.image"
                    :alt="item.name"
                    class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-sm line-clamp-1">{{ item.name }}</h4>
                    <p class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="font-semibold">₵{{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Wallet Balance Check -->
        <Card v-if="walletBalance !== null" :class="hasEnoughBalance ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'">
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Wallet :class="`h-6 w-6 ${hasEnoughBalance ? 'text-green-600' : 'text-red-600'}`" />
                <div>
                  <p class="text-sm text-muted-foreground">Boxxis Wallet Balance</p>
                  <p class="text-xl font-bold">₵{{ walletBalance.toFixed(2) }}</p>
                </div>
              </div>
              <div v-if="!hasEnoughBalance" class="text-right">
                <p class="text-sm text-red-600 font-medium">Insufficient Balance</p>
                <p class="text-xs text-muted-foreground">
                  Need ₵{{ (finalAmount - walletBalance).toFixed(2) }} more
                </p>
              </div>
              <div v-else class="flex items-center gap-2 text-green-600">
                <CheckCircle class="h-5 w-5" />
                <span class="font-medium">Sufficient Balance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            class="flex-1 border-gray-300"
            @click="$router.back()"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            Go Back
          </Button>
          
          <Button
            class="flex-1 bg-[#8E44AD] hover:bg-[#8E44AD]/80"
            @click="handleBoxxisPayment"
            :disabled="!hasEnoughBalance || processingPayment"
          >
            <div v-if="processingPayment" class="flex items-center gap-2">
              <div class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
            <div v-else class="flex items-center gap-2">
              <Wallet class="h-4 w-4" />
              Confirm & Pay ₵{{ finalAmount.toFixed(2) }}
            </div>
          </Button>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- In BoxxisPaymentConfirmation.vue -->
        <!-- <Button
          variant="outline"
          class="flex-1 border-gray-300"
          @click="handleCancel"
        >
          <X class="h-4 w-4 mr-2" />
          Cancel Payment
        </Button> -->
        </div>

        <!-- Top Up Option -->
        <div v-if="!hasEnoughBalance" class="text-center">
          <p class="text-sm text-muted-foreground mb-3">
            Don't have enough balance?
          </p>
          <Button
            variant="outline"
            class="border-[#A3E635] text-[#A3E635] hover:bg-[#A3E635] hover:text-white"
            @click="handleTopUp"
          >
            <Plus class="h-4 w-4 mr-2" />
            Top Up Wallet
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Wallet,
  Tag,
  Receipt,
  MapPin,
  Calendar,
  ShoppingBag,
  CheckCircle,
  Plus,
  X
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Badge from '@/components/ui/badge.vue'
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue'
import { useAuthStore } from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/components/ui/toast/use-toast'
import paymentService from '@/api/services/paymentService'
import { walletService } from '@/api/services/wallet'
import checkoutService from '@/api/services/checkoutService'
import cartService from '@/api/services/cartService'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const { toast } = useToast()

const processingPayment = ref(false)
const walletBalance = ref(null)

// Get order details from route params/state
const orderTotal = ref(0)
const deliveryDetails = ref({
  deliveryDate: '',
  deliveryLocation: '',
  gpsLocation: '',
  deliveryNote: '',
  alternateNumber: ''
})
const orderItems = ref([])
const checkoutId = ref('')

// Calculate discount and final amount
const discountAmount = computed(() => orderTotal.value * 0.10)
const finalAmount = computed(() => orderTotal.value - discountAmount.value)
const hasEnoughBalance = computed(() => 
  walletBalance.value !== null && walletBalance.value >= finalAmount.value
)

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const fetchWalletBalance = async () => {
  try {
    const wallet = await walletService.getSystemWallet(authStore.userId)
    walletBalance.value = wallet?.systemBalance || 0
  } catch (error) {
    console.error('Failed to fetch wallet balance:', error)
    toast({
      title: 'Error',
      description: 'Failed to load wallet balance',
      variant: 'destructive'
    })
  }
}

const handleBoxxisPayment = async () => {
  if (!hasEnoughBalance.value) {
    toast({ title: 'Insufficient Balance', description: 'Please top up your wallet to continue', variant: 'destructive' })
    return
  }

  processingPayment.value = true

  try {
    // Step 1: Get cart
    const cart = await cartService.getUserCart(authStore.userId)
    const cartId = cart?.cartId
    
    if (!cartId) {
      throw new Error('Unable to retrieve cart information')
    }

    // Step 2: Create checkout NOW (when user confirms payment)
    const checkoutData = {
      cartId: cartId,
      customerId: authStore.userId,
      deliveryDate: new Date(deliveryDetails.value.deliveryDate).toISOString(),
      deliveryLocation: deliveryDetails.value.deliveryLocation,
      gpsLocation: deliveryDetails.value.gpsLocation || null,
      deliveryNote: deliveryDetails.value.deliveryNote || null,
      alternateNumber: deliveryDetails.value.alternateNumber || null,
      paymentMethod: 'BoxxisPay'
    }

    const checkoutResponse = await checkoutService.createCheckout(checkoutData)
    const newCheckoutId = checkoutResponse.checkoutId

    if (!newCheckoutId) {
      throw new Error('Failed to create order')
    }

    // Update checkoutId
    checkoutId.value = newCheckoutId

    // Step 3: Process payment
    const paymentData = {
      userId: authStore.userId,
      amount: finalAmount.value,
      description: `Order payment - ${orderItems.value.length} items (10% wallet discount applied)`,
      clientReference: newCheckoutId
    }

    console.log('Boxxis Payment Data:', paymentData)

    const response = await paymentService.BoxxisPay(paymentData)

    console.log('Boxxis Payment Response:', response)

    // Clear cart after successful payment
    await cartStore.clearCart()

    // Clean up pending order
    localStorage.removeItem('pendingOrder')

    toast({
      title: 'Payment Successful! 🎉',
      description: `Order confirmed. You saved ₵${discountAmount.value.toFixed(2)}!`,
    })

    // Redirect to order confirmation
    setTimeout(() => {
      router.push(`/orders/${newCheckoutId}`)
    }, 2000)

  } catch (error) {
    console.error('Boxxis payment failed:', error)
    toast({
      title: 'Payment Failed',
      description: error.message || 'Failed to process payment. Please try again.',
      variant: 'destructive'
    })
  } finally {
    processingPayment.value = false
  }
}

// const handleCancel = () => {
//   if (confirm('Cancel this payment? Your order will remain unpaid.')) {
//     localStorage.removeItem('pendingOrder')
//     router.push('/checkout')
//   }
// }

const handleTopUp = () => {
  router.push('/wallets')
}

onMounted(async () => {
  const orderData = history.state?.orderData || JSON.parse(localStorage.getItem('pendingOrder') || '{}')
  
  if (!orderData || !orderData.total) {
    toast({
      title: 'Error',
      description: 'No order data found',
      variant: 'destructive'
    })
    router.push('/checkout')
    return
  }

  orderTotal.value = orderData.total
  deliveryDetails.value = orderData.deliveryDetails
  orderItems.value = orderData.items
  checkoutId.value = orderData.checkoutId

  // Fetch wallet balance
  await fetchWalletBalance()
})

</script>