<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header -->
      <div class="mb-8">
        <Button 
          variant="ghost" 
          class="mb-4 text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
          @click="$router.back()"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
          My Orders
        </h1>
        <p class="text-muted-foreground mt-2">View and track all your orders</p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <Button
            v-for="status in orderStatuses"
            :key="status.value"
            :variant="selectedStatus === status.value ? 'default' : 'outline'"
            :class="selectedStatus === status.value ? 'bg-[#8E44AD] hover:bg-[#8E44AD]/80' : ''"
            @click="selectedStatus = status.value"
            size="sm"
          >
            {{ status.label }}
          </Button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="orderStore.loading" class="text-center py-12">
        <div class="h-12 w-12 mx-auto border-4 border-[#8E44AD] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-muted-foreground">Loading your orders...</p>
      </div>

      <!-- Empty State -->
      <Card v-else-if="filteredOrders.length === 0" class="border-dashed">
        <CardContent class="text-center py-12">
          <Package class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-lg font-semibold mb-2">No Orders Found</h3>
          <p class="text-muted-foreground mb-6">
            {{ selectedStatus === 'all' ? "You haven't placed any orders yet" : `No ${selectedStatus} orders` }}
          </p>
          <Button 
            @click="$router.push('/shop')"
            class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
          >
            Start Shopping
          </Button>
        </CardContent>
      </Card>

      <!-- Orders List -->
      <div v-else class="space-y-4">
        <Card 
          v-for="order in filteredOrders" 
          :key="order.checkoutId"
          class="hover:border-[#8E44AD] transition-colors"
        >
          <CardHeader>
            <div class="flex items-start justify-between">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <CardTitle class="text-lg">
                    Order #{{ order.checkoutId ? order.checkoutId.slice(0, 8) : 'N/A' }}
                  </CardTitle>
                  <Badge :class="getOrderStatusColor(order.status)">
                    {{ getOrderStatusText(order.status) }}
                  </Badge>
                </div>
                <p class="text-sm text-muted-foreground">
                  Placed on {{ formatDate(order.dateOfCheckout) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-[#8E44AD]">
                  ₵{{ order.totalAmount?.toFixed(2) || '0.00' }}
                </p>
                <Badge variant="outline" class="mt-1">
                  {{ order.paymentStatus || 'Pending' }}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Delivery Information -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <MapPin class="h-4 w-4 text-[#8E44AD] mt-0.5" />
                  <div>
                    <p class="text-sm font-medium">Delivery Location</p>
                    <p class="text-sm text-muted-foreground">{{ order.deliveryLocation || 'N/A' }}</p>
                  </div>
                </div>
                <div v-if="order.gpsLocation" class="flex items-start gap-2">
                  <Navigation class="h-4 w-4 text-[#8E44AD] mt-0.5" />
                  <div>
                    <p class="text-sm font-medium">GPS Location</p>
                    <p class="text-sm text-muted-foreground">{{ order.gpsLocation }}</p>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <Calendar class="h-4 w-4 text-[#8E44AD] mt-0.5" />
                  <div>
                    <p class="text-sm font-medium">Delivery Date</p>
                    <p class="text-sm text-muted-foreground">{{ formatDate(order.deliveryDate) }}</p>
                  </div>
                </div>
                <div v-if="order.alternateNumber" class="flex items-start gap-2">
                  <Phone class="h-4 w-4 text-[#8E44AD] mt-0.5" />
                  <div>
                    <p class="text-sm font-medium">Contact</p>
                    <p class="text-sm text-muted-foreground">{{ order.alternateNumber }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Delivery Note -->
            <div v-if="order.deliveryNote" class="p-3 bg-muted rounded-lg">
              <p class="text-sm font-medium mb-1">Delivery Note</p>
              <p class="text-sm text-muted-foreground">{{ order.deliveryNote }}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-2 border-t">
              <Button 
                variant="outline" 
                size="sm"
                @click="viewOrderDetails(order)"
                class="border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
              >
                View Details
              </Button>
              <Button 
                v-if="order.status === 'delivered'"
                variant="outline" 
                size="sm"
                @click="reorder(order)"
              >
                Order Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Navigation, 
  Calendar,
  Phone
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Badge from '@/components/ui/badge.vue'
import { useOrderStore } from '@/store/orders'
import { useAuthStore } from '@/store/auth'
import { toast } from 'vue-sonner'

const router = useRouter()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const selectedStatus = ref('all')

const orderStatuses = [
  { value: 'all', label: 'All Orders' },
  { value: 0, label: 'Order Received' },
  { value: 1, label: 'Processing' },
  { value: 2, label: 'Packed' },
  { value: 3, label: 'Shipped' },
  { value: 4, label: 'Delivered' },
  { value: 5, label: 'Cancelled' }
]

const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') {
    return orderStore.allOrders
  }
  return orderStore.allOrders.filter(order => 
    order.status === selectedStatus.value
  )
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

const getOrderStatusColor = (status) => {
  // Status is a number enum from backend
  // 0 = Pending, 1 = Processing, 2 = Shipped, 3 = Delivered, 4 = Cancelled (or similar)
  const statusMap = {
    0: 'bg-yellow-100 text-yellow-800',     // OrderReceived/Pending
    1: 'bg-blue-100 text-blue-800',         // Processing
    2: 'bg-purple-100 text-purple-800',     // Packed
    3: 'bg-[#A3E635]/20 text-[#A3E635]',    // Shipped
    4: 'bg-green-100 text-green-800',       // Delivered
    5: 'bg-red-100 text-red-800'            // Cancelled
  }
  
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}

const getOrderStatusText = (status) => {
  const statusText = {
    0: 'Order Received',
    1: 'Processing',
    2: 'Packed',
    3: 'Shipped',
    4: 'Delivered',
    5: 'Cancelled'
  }
  
  return statusText[status] || 'Unknown'
}

const viewOrderDetails = (order) => {
  // Navigate to order details page (create this later if needed)
  toast.info('Order details coming soon')
}

const reorder = (order) => {
  toast.info('Reorder functionality coming soon')
}

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    toast.error('Please login to view orders')
    router.push('/')
    return
  }

  if (!orderStore.hasOrders) {
    await orderStore.fetchOrders()
  }
})
</script>