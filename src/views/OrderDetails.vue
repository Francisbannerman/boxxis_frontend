<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
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
        <!-- Header -->
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">
              Order #{{ order.id.slice(0, 8) }}
            </h1>
            <p class="text-muted-foreground">
              Placed on {{ formatFullDate(order.dateOfCheckout) }}
            </p>
          </div>
          <Badge :class="`text-sm px-3 py-1 ${getStatusColor(order.status)}`">
            <component :is="getStatusIcon(order.status)" class="mr-2" />
            {{ getStatusText(order.status) }}
          </Badge>
        </div>

        <!-- Status Timeline -->
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
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
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      step.completed ? 'bg-[#8E44AD] text-white' : 'bg-muted text-muted-foreground'
                    ]"
                  >
                    <component :is="step.icon" class="h-5 w-5" />
                  </div>
                  <div 
                    v-if="index < orderSteps.length - 1"
                    :class="[
                      'w-0.5 h-12 my-1',
                      step.completed ? 'bg-[#8E44AD]' : 'bg-muted'
                    ]"
                  />
                </div>
                <div class="flex-1 pt-2">
                  <p :class="['font-medium', step.completed ? 'text-foreground' : 'text-muted-foreground']">
                    {{ step.label }}
                  </p>
                  <p v-if="step.date" class="text-sm text-muted-foreground">
                    {{ step.date }}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Delivery Information -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <MapPin class="h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Delivery Address</p>
              <p class="font-medium">{{ order.deliveryLocation }}</p>
            </div>
            <div v-if="order.deliveryNote">
              <p class="text-sm text-muted-foreground mb-1">Delivery Note</p>
              <p class="font-medium">{{ order.deliveryNote }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Expected Delivery</p>
              <p class="font-medium">{{ formatFullDate(order.deliveryDate) }}</p>
            </div>
            <div v-if="order.alternateNumber">
              <p class="text-sm text-muted-foreground mb-1">Contact Number</p>
              <p class="font-medium">{{ order.alternateNumber }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- Rider Information (if assigned) -->
        <Card v-if="order.assignedRidersName">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <User class="h-5 w-5" />
              Delivery Rider
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center gap-4">
              <Avatar class="h-12 w-12">
                <AvatarFallback class="bg-[#8E44AD] text-white">
                  {{ order.assignedRidersName.charAt(0) }}
                </AvatarFallback>
              </Avatar>
              <div class="flex-1">
                <p class="font-medium">{{ order.assignedRidersName }}</p>
                <p class="text-sm text-muted-foreground">{{ order.assignedRidersNumber }}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                class="border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
              >
                <Phone class="h-4 w-4 mr-2" />
                Call Rider
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Order Items (Placeholder - you'll need to fetch cart items) -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Package class="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm">
              Cart ID: {{ order.cartId }}
            </p>
            <!-- Add cart items here when available -->
          </CardContent>
        </Card>

        <!-- Order Summary -->
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Subtotal</span>
              <span class="font-medium">₵{{ order.total?.toFixed(2) || '0.00' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Delivery Fee</span>
              <span class="font-medium">₵0.00</span>
            </div>
            <Separator />
            <div class="flex justify-between text-lg">
              <span class="font-bold">Total</span>
              <span class="font-bold text-[#8E44AD]">₵{{ order.total?.toFixed(2) || '0.00' }}</span>
            </div>
          </CardContent>
        </Card>

        <!-- Actions -->
        <div class="flex gap-4">
          <Button 
            variant="outline"
            class="flex-1 border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
          >
            Track Order
          </Button>
          <Button 
            v-if="order.status === 1"
            variant="outline"
            class="flex-1 border-red-500 text-red-500 hover:bg-red-50"
          >
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Package, MapPin, User, Phone, Clock, Truck, CheckCircle } from 'lucide-vue-next'
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
    // Fetch orders if not already loaded
    if (!orderStore.hasOrders) {
      await orderStore.fetchOrders()
    }
    
    // Find the specific order
    order.value = orderStore.allOrders.find(
      o => o.id === orderId || o.checkoutId === orderId
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
  return [
    {
      label: 'Order Placed',
      icon: Clock,
      completed: status >= 1,
      date: formatFullDate(order.value.dateOfCheckout)
    },
    {
      label: 'Processing',
      icon: Package,
      completed: status >= 2,
      date: status >= 2 ? formatFullDate(order.value.dateOfCheckout) : null
    },
    {
      label: 'Shipped',
      icon: Truck,
      completed: status >= 3,
      date: status >= 3 ? formatFullDate(order.value.deliveryDate) : null
    },
    {
      label: 'Delivered',
      icon: CheckCircle,
      completed: status >= 4,
      date: status >= 4 ? formatFullDate(order.value.deliveryDate) : null
    }
  ]
})

const getStatusIcon = (status) => {
  switch (status) {
    case 1: return Clock
    case 2: return Truck
    case 3: return Package
    case 4:
    case 5: return CheckCircle
    default: return Clock
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 1: return 'bg-yellow-100 text-yellow-800'
    case 2: return 'bg-blue-100 text-blue-800'
    case 3: return 'bg-[#A3E635]/20 text-[#A3E635]'
    case 4:
    case 5: return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 1: return 'Pending'
    case 2: return 'Processing'
    case 3: return 'Shipped'
    case 4: return 'Delivered'
    case 5: return 'Completed'
    default: return 'Unknown'
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
  router.push('/')
}
</script>