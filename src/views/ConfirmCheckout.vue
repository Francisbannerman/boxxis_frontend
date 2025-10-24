<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <Button
          variant="ghost"
          @click="$router.back()"
          class="mb-4"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
        <h1 class="text-3xl font-bold text-gray-900">Confirm Your Order</h1>
        <p class="text-gray-600 mt-2">Review your order and delivery details</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Content - Order Details Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Delivery Information Card -->
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <MapPin class="h-5 w-5 text-[#8E44AD]" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <!-- Delivery Date -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Delivery Date <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  v-model="deliveryForm.deliveryDate"
                  :min="minDate"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E44AD] focus:border-transparent"
                  required
                />
              </div>

              <!-- Delivery Location -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Delivery Location <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  v-model="deliveryForm.deliveryLocation"
                  placeholder="Enter your delivery address"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E44AD] focus:border-transparent"
                  required
                />
              </div>

              <!-- GPS Location -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  GPS Location
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="deliveryForm.gpsLocation"
                    placeholder="e.g., GA-123-4567"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E44AD] focus:border-transparent"
                  />
                  <Button
                    variant="outline"
                    @click="getGPSLocation"
                    :disabled="gettingLocation"
                  >
                    <Navigation v-if="!gettingLocation" class="h-4 w-4" />
                    <div v-else class="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </Button>
                </div>
                <p class="text-xs text-muted-foreground mt-1">
                  Optional: Ghana Digital Address or coordinates
                </p>
              </div>

              <!-- Delivery Note -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Delivery Note
                </label>
                <textarea
                  v-model="deliveryForm.deliveryNote"
                  placeholder="Special instructions for delivery (e.g., gate code, landmarks)"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E44AD] focus:border-transparent resize-none"
                ></textarea>
              </div>

              <!-- Alternate Phone Number -->
              <div>
                <label class="block text-sm font-medium mb-2">
                  Alternate Phone Number
                </label>
                <input
                  type="tel"
                  v-model="deliveryForm.alternateNumber"
                  placeholder="+233 XX XXX XXXX"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8E44AD] focus:border-transparent"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  Optional: Backup contact number for delivery
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Order Items Card -->
          <Card>
            <CardHeader class="bg-gray-50 border-b">
              <div class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2">
                  <ShoppingBag class="h-5 w-5 text-[#8E44AD]" />
                  Review Order
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="$router.push('/')"
                  class="text-[#8E44AD] hover:text-[#8E44AD]/80"
                >
                  Edit Cart
                </Button>
              </div>
              <p class="text-sm text-muted-foreground mt-1">
                {{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'item' : 'items' }} in your order
              </p>
            </CardHeader>
            <CardContent class="p-0">
              <!-- Scrollable Items List -->
              <div class="max-h-[400px] overflow-y-auto">
                <div class="divide-y">
                  <div 
                    v-for="item in cartStore.cartItems" 
                    :key="item.id"
                    class="p-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div class="flex gap-4">
                      <!-- Product Image -->
                      <div class="relative flex-shrink-0">
                        <ImageWithFallback
                          :src="item.image"
                          :alt="item.name"
                          class="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <!-- Quantity Badge -->
                        <div class="absolute -top-2 -right-2 bg-[#8E44AD] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                          {{ item.quantity }}
                        </div>
                      </div>

                      <!-- Product Details -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between gap-2">
                          <div class="flex-1">
                            <h4 class="font-semibold text-gray-900 line-clamp-2 mb-1">
                              {{ item.name }}
                            </h4>
                            <p class="text-sm text-muted-foreground mb-2">
                              {{ item.category }}
                            </p>
                          </div>
                          
                          <!-- Price -->
                          <div class="text-right flex-shrink-0">
                            <p class="font-bold text-gray-900">
                              ₵{{ (item.price * item.quantity).toFixed(2) }}
                            </p>
                          </div>
                        </div>

                        <!-- Item Meta Info -->
                        <div class="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div class="flex items-center gap-1">
                            <span class="font-medium text-gray-700">Qty:</span>
                            <span>{{ item.quantity }}</span>
                          </div>
                          <div class="h-1 w-1 rounded-full bg-gray-300"></div>
                          <div class="flex items-center gap-1">
                            <span class="font-medium text-gray-700">Unit Price:</span>
                            <span>₵{{ item.price.toFixed(2) }}</span>
                          </div>
                        </div>

                        <!-- Product Attributes (if any) -->
                        <div v-if="item.size || item.color" class="flex items-center gap-3 mt-2">
                          <span v-if="item.size" class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                            Size: {{ item.size }}
                          </span>
                          <span v-if="item.color" class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                            Color: {{ item.color }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Summary Footer -->
              <div class="p-4 bg-gray-50 border-t space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Subtotal ({{ cartStore.itemCount }} items)</span>
                  <span class="font-medium text-gray-900">₵{{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <!-- <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Estimated Delivery</span>
                  <span class="font-medium text-gray-900">
                    {{ cartStore.shipping === 0 ? 'FREE' : `₵${cartStore.shipping.toFixed(2)}` }}
                  </span>
                </div> -->
                
                <!-- Free Shipping Progress -->
                <!-- <div v-if="cartStore.subtotal < 100" class="pt-2">
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="text-[#A3E635] font-medium">
                      ₵{{ (100 - cartStore.subtotal).toFixed(2) }} away from FREE shipping
                    </span>
                    <span class="text-gray-500">
                      {{ Math.min(100, (cartStore.subtotal / 100) * 100).toFixed(0) }}%
                    </span>
                  </div>
                  <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-[#8E44AD] to-[#A3E635] transition-all duration-500"
                      :style="{ width: `${Math.min(100, (cartStore.subtotal / 100) * 100)}%` }"
                    ></div>
                  </div>
                </div> -->

                <div class="pt-2 mt-2 border-t border-gray-200">
                  <div class="flex justify-between items-center">
                    <span class="font-semibold text-gray-900">Order Total</span>
                    <span class="text-2xl font-bold text-[#8E44AD]">
                      ₵{{ cartStore.total.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar - Order Summary -->
        <div class="lg:col-span-1">
          <Card class="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Subtotal</span>
                  <span>₵{{ cartStore.subtotal.toFixed(2) }}</span>
                </div>
                <!-- <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Shipping</span>
                  <span>
                    {{ cartStore.shipping === 0 ? "Free" : `₵${cartStore.shipping.toFixed(2)}` }}
                  </span>
                </div> -->
                <!-- <div 
                  v-if="cartStore.subtotal < 100"
                  class="text-xs text-[#A3E635] font-medium p-2 bg-[#A3E635]/10 rounded"
                >
                  Add ₵{{ (100 - cartStore.subtotal).toFixed(2) }} more for free shipping!
                </div> -->
                <Separator />
                <div class="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span class="text-[#8E44AD]">
                    ₵{{ cartStore.total.toFixed(2) }}
                  </span>
                </div>
              </div>

              <Separator />

              <!-- Delivery Summary -->
              <div class="space-y-2 text-sm">
                <div class="flex items-start gap-2">
                  <Calendar class="h-4 w-4 text-[#8E44AD] mt-0.5" />
                  <div>
                    <p class="text-muted-foreground">Delivery Date</p>
                    <p class="font-medium">
                      {{ deliveryForm.deliveryDate ? formatDate(deliveryForm.deliveryDate) : 'Not selected' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <MapPin class="h-4 w-4 text-[#8E44AD] mt-0.5" />
                  <div>
                    <p class="text-muted-foreground">Delivery To</p>
                    <p class="font-medium">
                      {{ deliveryForm.deliveryLocation || 'Not provided' }}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <Button
                class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
                @click="handlePlaceOrder"
                :disabled="!isFormValid || placingOrder"
              >
                <div v-if="placingOrder" class="flex items-center gap-2">
                  <div class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
                <div v-else class="flex items-center gap-2">
                  <CheckCircle class="h-4 w-4" />
                  Pay With Mobile Money
                </div>
              </Button>

              <!-- <p class="text-xs text-center text-muted-foreground">
                You will be redirected to Hubtel for secure payment
              </p> -->

              <Button
                class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
                @click="handleBoxxisPayment"
                :disabled="!isFormValid || placingOrder"
              >
                <div v-if="placingOrder" class="flex items-center gap-2">
                  <div class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
                <div v-else class="flex items-center gap-2">
                  <Wallet class="h-4 w-4" />
                  Pay With Nu Retail Wallet
                </div>
              </Button>
              <p class="text-xs text-center text-muted-foreground">
                Enjoy 5% discount when you pay with Nu Retail Wallet 
              </p>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  Navigation,
  CheckCircle,
  Wallet
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Separator from '@/components/ui/separator.vue'
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { useToast } from '@/components/ui/toast/use-toast'
import checkoutService from '@/api/services/checkoutService'
import cartService from '@/api/services/cartService'
import paymentService from '@/api/services/paymentService'

export default {
  name: 'ConfirmCheckout',
  components: {
    ArrowLeft,
    MapPin,
    ShoppingBag,
    Calendar,
    Navigation,
    CheckCircle,
    Wallet,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
    ImageWithFallback
  },
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const { toast } = useToast()

    const deliveryForm = ref({
      deliveryDate: '',
      deliveryLocation: '',
      gpsLocation: '',
      deliveryNote: '',
      alternateNumber: ''
    })

    const placingOrder = ref(false)
    const gettingLocation = ref(false)

    // Set minimum date to tomorrow
    const minDate = computed(() => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    })

    // Form validation
    const isFormValid = computed(() => {
      return deliveryForm.value.deliveryDate && 
             deliveryForm.value.deliveryLocation.trim()
    })

    // Format date for display
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }

    // Get GPS location using browser geolocation
    const getGPSLocation = () => {
      if (!navigator.geolocation) {
        toast({
          title: 'Error',
          description: 'Geolocation is not supported by your browser',
          variant: 'destructive'
        })
        return
      }

      gettingLocation.value = true

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6)
          const lng = position.coords.longitude.toFixed(6)
          deliveryForm.value.gpsLocation = `${lat}, ${lng}`
          
          toast({
            title: 'Success',
            description: 'GPS location captured successfully',
          })
          
          gettingLocation.value = false
        },
        (error) => {
          toast({
            title: 'Error',
            description: 'Unable to get your location. Please enter manually.',
            variant: 'destructive'
          })
          gettingLocation.value = false
        }
      )
    }

    const handleBoxxisPayment = async () => {
      if (!isFormValid.value) {
        toast({ title: 'Incomplete Form', description: 'Please fill in all required fields', variant: 'destructive' })
        return
      }

      if (cartStore.isEmpty) {
        toast({ title: 'Empty Cart', description: 'Your cart is empty', variant: 'destructive' })
        router.push('/')
        return
      }

      const orderData = {
        total: cartStore.total,
        deliveryDetails: deliveryForm.value,
        items: cartStore.cartItems.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        cartId: null,
        checkoutId: null
      }
      localStorage.setItem('pendingOrder', JSON.stringify(orderData))

      router.replace({
        name: 'BoxxisPayment',
        state: { orderData }
      })
    }

    // Handle order placement and payment
    const handlePlaceOrder = async () => {
      console.log('=== PLACE ORDER & PAYMENT CLICKED ===')
      
      if (!isFormValid.value) {
        toast({
          title: 'Incomplete Form',
          description: 'Please fill in all required fields',
          variant: 'destructive'
        })
        return
      }

      // Check if cart is empty
      if (cartStore.isEmpty) {
        toast({
          title: 'Empty Cart',
          description: 'Your cart is empty. Please add items to checkout.',
          variant: 'destructive'
        })
        router.push('/')
        return
      }

      placingOrder.value = true

      try {
        // Step 1: Get cart to retrieve cartId
        console.log('Step 1: Fetching cart...')
        const cart = await cartService.getUserCart(authStore.userId)
        const cartId = cart?.cartId
        
        console.log('Cart fetched:', { cartId })
        
        if (!cartId) {
          throw new Error('Unable to retrieve cart information')
        }

        // Step 2: Create checkout/order
        console.log('Step 2: Creating checkout...')
        const checkoutData = {
          cartId: cartId,
          customerId: authStore.userId,
          deliveryDate: new Date(deliveryForm.value.deliveryDate).toISOString(),
          deliveryLocation: deliveryForm.value.deliveryLocation,
          gpsLocation: deliveryForm.value.gpsLocation || null,
          deliveryNote: deliveryForm.value.deliveryNote || null,
          alternateNumber: deliveryForm.value.alternateNumber || null,
          paymentMethod: 'HubtelPayment'
        }

        const checkoutResponse = await checkoutService.createCheckout(checkoutData)
        
        console.log('Checkout created:', checkoutResponse)

        // Extract checkout/order ID
        const checkoutId = checkoutResponse.checkoutId

        if (!checkoutId) {
          throw new Error('Failed to get order ID from checkout response')
        }

        console.log('Order ID:', checkoutId)

        // Step 3: Initiate payment with Hubtel
        console.log('Step 3: Initiating payment...')
        const now = new Date()
        const itemCount = cartStore.itemCount
        const totalAmount = cartStore.total

        const paymentData = {
          amount: totalAmount,
          description: `Checkout ${itemCount} ${itemCount === 1 ? 'item' : 'items'} on ${now.toLocaleString()}`,
          themeId: cartId,
          clientReference: checkoutId
        }

        console.log('Payment data:', paymentData)

        const paymentResponse = await paymentService.initiatePayment(paymentData)

        console.log('Payment response:', paymentResponse)

        // Extract checkout URL
        const checkoutUrl = paymentResponse.checkoutUrl || 
                           paymentResponse.data?.checkoutUrl

        if (!checkoutUrl) {
          throw new Error('Failed to get payment URL from payment response')
        }

        console.log('Payment URL:', checkoutUrl)

        // Step 4: Clear cart
        //console.log('Step 4: Clearing cart...')
        //await cartStore.clearCart()

        // Step 5: Redirect to Hubtel payment page
        toast({
          title: 'Redirecting to Payment... 💳',
          description: 'Please complete your payment to finish your order.',
        })

        console.log('Redirecting to:', checkoutUrl)

        // Small delay to show the toast, then redirect (no way back)
        setTimeout(() => {
          window.location.replace(checkoutUrl)
        }, 1500)

      } catch (error) {
        console.error('Error in checkout/payment process:', error)
        
        // Check if it's a network error that might still have created the order
        const isNetworkError = error.message?.includes('No response from server') || 
                              error.code === 'ERR_NETWORK' ||
                              error.code === 'ERR_INCOMPLETE_CHUNKED_ENCODING'
        
        if (isNetworkError) {
          toast({
            title: 'Connection Issue',
            description: 'Your order may have been placed. Please check your order history or contact support.',
            variant: 'destructive'
          })
          
          // Still try to clear cart
          try {
            await cartStore.clearCart()
          } catch (clearError) {
            console.error('Error clearing cart:', clearError)
          }
          
          // Redirect to home after delay
          setTimeout(() => {
            router.push('/')
          }, 3000)
        } else {
          toast({
            title: 'Order Failed',
            description: error.message || 'Failed to process order. Please try again.',
            variant: 'destructive'
          })
        }
      } finally {
        placingOrder.value = false
      }
    }

    // Load cart items on mount
    onMounted(async () => {
      if (cartStore.isEmpty) {
        try {
          await cartStore.fetchCartItems()
          
          // If still empty, redirect to shop
          if (cartStore.isEmpty) {
            toast({
              title: 'Empty Cart',
              description: 'Your cart is empty. Add items to checkout.',
              variant: 'destructive'
            })
            router.push('/')
          }
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      }
    })

    return {
      cartStore,
      deliveryForm,
      placingOrder,
      gettingLocation,
      minDate,
      isFormValid,
      formatDate,
      getGPSLocation,
      handlePlaceOrder,
      handleBoxxisPayment,
    }
  }
}
</script>