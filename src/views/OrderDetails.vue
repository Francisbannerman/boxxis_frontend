<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-5xl">
      <!-- Back Button -->
      <Button 
        variant="ghost" 
        class="mb-6 text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
        @click="goBack"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Orders
      </Button>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-muted-foreground">Loading order details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!order" class="text-center py-12">
        <Package class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 class="text-2xl font-bold mb-2">Order Not Found</h2>
        <p class="text-muted-foreground mb-4">We couldn't find the order you're looking for.</p>
        <Button @click="goBack">Go Back</Button>
      </div>

      <!-- Order Details -->
      <div v-else class="space-y-6">
        <!-- Header with Status Badges -->
        <Card class="border-2">
          <CardContent class="pt-6">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 class="text-3xl font-bold mb-2">
                  Order #{{ order.checkoutId.slice(0, 8).toUpperCase() }}
                </h1>
                <p class="text-muted-foreground mb-4">
                  Placed on {{ formatFullDate(order.dateOfCheckout) }}
                </p>
                
                <!-- Status Badges -->
                <div class="flex flex-wrap gap-3">
                  <!-- Order Status -->
                  <div class="flex items-center gap-2">
                    <component :is="getOrderStatusIcon(order.status)" class="h-4 w-4" />
                    <Badge :class="`text-sm px-3 py-1.5 ${getOrderStatusColor(order.status)}`">
                      {{ getOrderStatusText(order.status) }}
                    </Badge>
                  </div>
                  
                  <!-- Payment Status -->
                  <div class="flex items-center gap-2">
                    <component :is="getPaymentStatusIcon(order.transaction.transactionStatus)" class="h-4 w-4" />
                    <Badge :class="`text-sm px-3 py-1.5 ${getPaymentStatusColor(order.transaction.transactionStatus)}`">
                      {{ getPaymentStatusText(order.transaction.transactionStatus) }}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <!-- Order Total -->
              <div class="text-right">
                <p class="text-sm text-muted-foreground mb-1">Order Total</p>
                <p class="text-3xl font-bold text-[#8E44AD]">₵{{ order.transaction.amount.toFixed(2) }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Left Column: Order Timeline & Items -->
          <div class="md:col-span-2 space-y-6">
            <!-- Order Timeline -->
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <Truck class="h-5 w-5" />
                  Order Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div 
                    v-for="(step, index) in orderSteps" 
                    :key="index"
                    class="flex items-start gap-4"
                  >
                    <div class="flex flex-col items-center">
                      <div 
                        :class="[
                          'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                          step.completed ? 'bg-[#8E44AD] text-white' : 'bg-muted text-muted-foreground'
                        ]"
                      >
                        <component :is="step.icon" class="h-5 w-5" />
                      </div>
                      <div 
                        v-if="index < orderSteps.length - 1"
                        :class="[
                          'w-0.5 h-16 my-1 transition-colors',
                          step.completed ? 'bg-[#8E44AD]' : 'bg-muted'
                        ]"
                      />
                    </div>
                    <div class="flex-1 pt-2">
                      <p :class="['font-semibold mb-1', step.completed ? 'text-foreground' : 'text-muted-foreground']">
                        {{ step.label }}
                      </p>
                      <p v-if="step.date" class="text-sm text-muted-foreground">
                        {{ step.date }}
                      </p>
                      <p v-if="step.description" class="text-sm text-muted-foreground mt-1">
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Order Items -->
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center justify-between">
                  <span class="flex items-center gap-2">
                    <Package class="h-5 w-5" />
                    Order Items
                  </span>
                  <Badge variant="outline">{{ order.cart.cartProducts.length }} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div 
                    v-for="item in order.cart.cartProducts" 
                    :key="item.cartProductId"
                    class="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <!-- Product Image -->
                    <div class="w-20 h-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        v-if="item.product.defaultImage" 
                        :src="item.product.defaultImage" 
                        :alt="item.product.productName"
                        class="w-full h-full object-cover"
                      />
                      <Package v-else class="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h4 class="font-semibold mb-1 truncate">{{ item.product.productName }}</h4>
                      <p class="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {{ item.product.productDescription }}
                      </p>
                      <div class="flex items-center gap-4 text-sm">
                        <span class="text-muted-foreground">Qty: {{ item.quantity }}</span>
                        <span class="text-muted-foreground">₵{{ item.product.sellingPrice.toFixed(2) }} each</span>
                      </div>
                    </div>
                    
                    <!-- Item Total -->
                    <div class="text-right flex-shrink-0">
                      <p class="font-bold text-[#8E44AD]">₵{{ item.amount.toFixed(2) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Order Summary -->
                <Separator class="my-4" />
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Subtotal ({{ order.cart.cartProducts.length }} items)</span>
                    <span class="font-medium">₵{{ order.cart.totalCartAmount.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Delivery Fee</span>
                    <span class="font-medium">₵0.00</span>
                  </div>
                  <Separator class="my-2" />
                  <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span class="text-[#8E44AD]">₵{{ order.transaction.amount.toFixed(2) }}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Right Column: Delivery & Payment Info -->
          <div class="space-y-6">
            <!-- Delivery Information -->
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <MapPin class="h-5 w-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div>
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Address</p>
                  <p class="font-medium">{{ order.deliveryLocation }}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Expected Delivery</p>
                  <p class="font-medium">{{ formatDate(order.deliveryDate) }}</p>
                </div>
                
                <div v-if="order.alternateNumber">
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Contact Number</p>
                  <p class="font-medium">{{ order.alternateNumber }}</p>
                </div>
                
                <div v-if="order.deliveryNote && order.deliveryNote !== 'string'">
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Delivery Note</p>
                  <p class="text-sm">{{ order.deliveryNote }}</p>
                </div>
                
                <div v-if="order.gpsLocation && order.gpsLocation !== 'string'">
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">GPS Location</p>
                  <p class="text-sm font-mono">{{ order.gpsLocation }}</p>
                </div>
              </CardContent>
            </Card>

            <!-- Rider Information -->
            <Card v-if="order.assignedRidersName">
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <User class="h-5 w-5" />
                  Delivery Rider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div class="flex items-center gap-3 mb-4">
                  <Avatar class="h-12 w-12">
                    <AvatarFallback class="bg-[#8E44AD] text-white text-lg">
                      {{ order.assignedRidersName.charAt(0).toUpperCase() }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="flex-1">
                    <p class="font-semibold">{{ order.assignedRidersName }}</p>
                    <p class="text-sm text-muted-foreground">{{ order.assignedRidersNumber }}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  class="w-full border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                  @click="callRider"
                >
                  <Phone class="h-4 w-4 mr-2" />
                  Call Rider
                </Button>
              </CardContent>
            </Card>

            <!-- Payment Information -->
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  <CreditCard class="h-5 w-5" />
                  Payment Info
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div>
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Transaction ID</p>
                  <p class="text-sm font-mono">{{ order.transactionId.slice(0, 16) }}...</p>
                </div>
                
                <Separator />
                
                <div>
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Payment Status</p>
                  <Badge :class="`${getPaymentStatusColor(order.transaction.transactionStatus)}`">
                    {{ getPaymentStatusText(order.transaction.transactionStatus) }}
                  </Badge>
                </div>
                
                <div>
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Payment Date</p>
                  <p class="font-medium">{{ formatDate(order.transaction.transactionDate) }}</p>
                </div>
                
                <div>
                  <p class="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Amount Paid</p>
                  <p class="text-xl font-bold text-[#8E44AD]">₵{{ order.transaction.amount.toFixed(2) }}</p>
                </div>
              </CardContent>
            </Card>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <Button 
                class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/90 text-white"
                @click="trackOrder"
              >
                <MapPin class="h-4 w-4 mr-2" />
                Track Order
              </Button>
              
              <Button 
                v-if="order.status === 1 && order.transaction.transactionStatus !== 2"
                variant="outline"
                class="w-full border-red-500 text-red-500 hover:bg-red-50"
                @click="cancelOrder"
              >
                <XCircle class="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
              
              <Button 
                variant="outline"
                class="w-full"
                @click="contactSupport"
              >
                <Phone class="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeft, Package, MapPin, User, Phone, Clock, Truck, 
  CheckCircle, CreditCard, XCircle, AlertCircle 
} from 'lucide-vue-next'
import Button from '../components/ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Badge from '../components/ui/badge.vue'
import Separator from '../components/ui/separator.vue'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { useOrderStore } from '../store/orders'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const loading = ref(true)
const order = ref(null)

const orderId = route.params.id

onMounted(async () => {
  try {
    if (!orderStore.hasOrders) {
      await orderStore.fetchOrders()
    }
    
    order.value = orderStore.allOrders.find(
      o => o.checkoutId === orderId || o.id === orderId
    )
  } catch (error) {
    console.error('Failed to load order:', error)
  } finally {
    loading.value = false
  }
})

const orderSteps = computed(() => {
  if (!order.value) return []
  
  const status = order.value.status
  const paymentStatus = order.value.transaction.transactionStatus
  
  return [
    {
      label: 'Order Received',
      icon: CheckCircle,
      completed: status >= 1,
      date: formatDate(order.value.dateOfCheckout),
      description: paymentStatus === 2 ? 'Payment confirmed' : 'Awaiting payment confirmation'
    },
    {
      label: 'Order Processing',
      icon: Package,
      completed: status >= 2,
      date: status >= 2 ? formatDate(order.value.dateOfCheckout) : null,
      description: status >= 2 ? 'Your order is being prepared' : null
    },
    {
      label: 'Order Dispatched',
      icon: Truck,
      completed: status >= 3,
      date: status >= 3 ? formatDate(order.value.deliveryDate) : null,
      description: status >= 3 ? 'Order is on the way' : null
    },
    {
      label: 'Delivered',
      icon: CheckCircle,
      completed: status >= 4,
      date: status >= 4 ? formatDate(order.value.deliveryDate) : null,
      description: status >= 4 ? 'Order successfully delivered' : null
    }
  ]
})

// Order Status Functions
const getOrderStatusIcon = (status) => {
  switch (status) {
    case 1: return Clock
    case 2: return Package
    case 3: return Truck
    case 4: return CheckCircle
    case 5: return XCircle
    default: return Clock
  }
}

const getOrderStatusColor = (status) => {
  switch (status) {
    case 1: return 'bg-yellow-100 text-yellow-800'
    case 2: return 'bg-blue-100 text-blue-800'
    case 5: return 'bg-[#A3E635]/20 text-[#A3E635]'
    case 4:
    case 3: return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getOrderStatusText = (status) => {
  switch (status) {
    case 1: return 'Order Received'
    case 2: return 'Order Processing'
    case 3: return 'Order Dispatched'
    case 4: return 'Order Delivered'
    case 5: return 'Cancelled'
    default: return 'Unknown'
  }
}

// Payment Status Functions
const getPaymentStatusIcon = (status) => {
  switch (status) {
    case 1: return AlertCircle
    case 2:
    case 3: return CreditCard
    case 5:
    case 4: return XCircle
    default: return AlertCircle
  }
}

const getPaymentStatusColor = (status) => {
  switch (status) {
    case 1: return 'bg-amber-100 text-amber-800'
    case 2:
    case 3: return 'bg-green-100 text-green-800'
    case 5:
    case 4: return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getPaymentStatusText = (status) => {
  switch (status) {
    case 1: return 'Payment Pending'
    case 2: return 'Processing'
    case 3: return 'Paid'
    case 4: return 'Failed'
    case 5: return 'Cancelled'
    case 6: return 'Reversed'
    default: return 'Unknown'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return 'N/A'
  }
}

const formatFullDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'N/A'
  }
}

const goBack = () => {
  router.push('/orders')
}

const trackOrder = () => {
  // Implement tracking functionality
  console.log('Track order:', orderId)
}

const cancelOrder = () => {
  // Implement cancel functionality
  console.log('Cancel order:', orderId)
}

const contactSupport = () => {
  // Implement support contact
  console.log('Contact support for order:', orderId)
}

const callRider = () => {
  if (order.value?.assignedRidersNumber) {
    window.location.href = `tel:${order.value.assignedRidersNumber}`
  }
}
</script>