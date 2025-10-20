<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button 
        v-if="$slots.default"
        variant="ghost" 
        size="icon"
        :class="`hover:bg-muted ${className}`"
      >
        <slot />
      </Button>
      <Button 
        v-else
        variant="ghost" 
        :class="`text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white ${className}`"
      >
        Orders
        <Badge 
          v-if="activeOrders.length > 0"
          class="ml-2 bg-[#A3E635] text-[#2d1b3d] hover:bg-[#A3E635]/80"
        >
          {{ activeOrders.length }}
        </Badge>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-96" align="start">
      <Card class="border-0 shadow-none">
        <CardHeader class="pb-3">
          <CardTitle class="flex items-center gap-2">
            <Package class="h-5 w-5 text-[#8E44AD]" />
            <span class="bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
              Your Orders
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div v-if="loading" class="text-center py-8">
            <p class="text-muted-foreground">Loading orders...</p>
          </div>
          
          <p v-else-if="displayOrders.length === 0" class="text-center text-muted-foreground py-8">
            No active orders. Start shopping!
          </p>
          
          <div v-else class="space-y-3">
            <div 
              v-for="(order, index) in displayOrders" 
              :key="order.id || order.checkoutId || index"
              @click="goToOrderDetails(order)"
              class="cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">

                  <div class="space-y-2 mb-3">
                    <!-- Order ID Header -->
                    <div class="flex items-center gap-2">
                      <span class="font-semibold text-base">
                        Order #{{ (order.id || order.checkoutId || 'N/A').toString().slice(0, 8) }}
                      </span>
                    </div>
                    
                    <!-- Status Indicators -->
                    <div class="flex flex-wrap items-center gap-3">
                      <!-- Order Status -->
                      <div class="flex items-center gap-1.5">
                        <component :is="getOrderStatusIcon(order.status)" />
                        <Badge :class="`text-xs ${getOrderStatusColor(order.status)}`">
                          {{ getOrderStatusText(order.status) }}
                        </Badge>
                      </div>
                      
                      <!-- Divider -->
                      <div class="h-4 w-px bg-gray-300"></div>
                      
                      <!-- Payment Status -->
                      <div class="flex items-center gap-1.5">
                        <component :is="getPaymentStatusIcon(order.transactionStatus)" />
                        <Badge :class="`text-xs ${getPaymentStatusColor(order.transactionStatus)}`">
                          {{ getPaymentStatusText(order.transactionStatus) }}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-muted-foreground mb-1">
                    {{ order.deliveryLocation || 'No location' }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">
                      {{ order.deliveryDate || formatDate(order.deliveryDate) }}
                    </span>
                    <span class="font-medium text-[#8E44AD]">₵{{ order.orderAmount.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              <Separator v-if="index < displayOrders.length - 1 && index < 3" class="mt-3" />
            </div>
            
            <div v-if="activeOrders.length > 4" class="pt-2 border-t">
              <Button 
                variant="ghost" 
                class="w-full text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                @click="goToAllOrders"
              >
                View All Orders ({{ activeOrders.length }})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PopoverContent>
  </Popover>
</template>

<script>
import { computed, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Clock, Truck, Package, CheckCircle, CreditCard, XCircle, AlertCircle } from 'lucide-vue-next'
import Button from './ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Badge from './ui/badge.vue'
import Separator from './ui/separator.vue'
import { useOrderStore } from '../store/orders'
import { useAuthStore } from '../store/auth'

export default {
  name: 'OrdersDropdown',
  components: {
    Package,
    Clock,
    CheckCircle,
    Truck,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Badge,
    Separator
  },
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  
  setup() {
    const router = useRouter()
    const orderStore = useOrderStore()
    const authStore = useAuthStore()

    const activeOrders = computed(() => {
      const orders = orderStore.activeOrders
      return Array.isArray(orders) ? orders : []
    })
    
    const displayOrders = computed(() => {
      return activeOrders.value.slice(0, 4)
    })
    
    const loading = computed(() => orderStore.loading)

    onMounted(async () => {
      if (authStore.isAuthenticated && authStore.userId && !orderStore.hasOrders) {
        try {
          await orderStore.fetchOrders()
        } catch (error) {
          console.error('Failed to fetch orders:', error)
        }
      }
    })

    const goToOrderDetails = (order) => {
      const orderId = order.id || order.checkoutId
      router.push(`/orders/${orderId}`)
    }

    const goToAllOrders = () => {
      router.push('/orders')
    }

    // Order Status Functions
    const getOrderStatusIcon = (status) => {
      switch (status) {
        case 1:
        case 2:
          return h(Package, { class: 'h-4 w-4 text-[#A3E635]' })
        case 3:
          return h(Truck, { class: 'h-4 w-4 text-blue-500' })
        case 4:
          return h(CheckCircle, { class: 'h-4 w-4 text-green-500' })
        case 5:
          return h(XCircle, { class: 'h-4 w-4 text-red-500' })
        default:
          return h(Clock, { class: 'h-4 w-4 text-gray-400' })
      }
    }

    const getOrderStatusColor = (status) => {
      switch (status) {
        case 1:
          return 'bg-yellow-100 text-yellow-800'
        case 2:
          return 'bg-blue-100 text-blue-800'
        case 3:
          return 'bg-[#A3E635]/20 text-[#A3E635]'
        case 4:
          return 'bg-green-100 text-green-800'
        case 5:
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getOrderStatusText = (status) => {
      switch (status) {
        case 1:
          return 'Order Received'
        case 2:
          return 'Order Processing'
        case 3:
          return 'Order Dispatched'
        case 4:
          return 'Order Delivered'
        case 5:
          return 'Order Cancelled'
        default:
          return 'Unknown'
      }
    }

    // Payment Status Functions
    const getPaymentStatusIcon = (status) => {
      switch (status) {
        case 1:
        case 2:
          return h(AlertCircle, { class: 'h-4 w-4 text-amber-500' })
        case 3:
          return h(CreditCard, { class: 'h-4 w-4 text-green-500' })
        case 5:
        case 4:
        case 6:
          return h(XCircle, { class: 'h-4 w-4 text-red-500' })
        default:
          return h(AlertCircle, { class: 'h-4 w-4 text-gray-400' })
      }
    }

    const getPaymentStatusColor = (status) => {
      switch (status) {
        case 1:
          return 'bg-amber-100 text-amber-800'
        case 2:
          return 'bg-yellow-100 text-yellow-800'
        case 3:
          return 'bg-green-100 text-green-800'
        case 4:
          return 'bg-red-100 text-red-800'
        case 5:
          return 'bg-pink-100 text-pink-800'
        case 6:
          return 'bg-magenta-100 text-magenta-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getPaymentStatusText = (status) => {
      switch (status) {
        case 1:
          return 'Payment Pending'
        case 2:
          return 'Payment Processing'
        case 3:
          return 'Paid'
        case 4:
          return 'Failed'
        case 5:
          return 'Cancelled'
        case 6:
          return 'Reversed'
        default:
          return 'Unknown Payment'
      }
    }


    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      } catch {
        return 'N/A'
      }
    }

    const calculateTotal = (order) => {
      return order?.total?.toFixed(2) || '0.00'
    }

    return {
      activeOrders,
      displayOrders,
      loading,
      goToOrderDetails,
      goToAllOrders,
      getOrderStatusIcon,
      getOrderStatusColor,
      getOrderStatusText,
      getPaymentStatusIcon,
      getPaymentStatusColor,
      getPaymentStatusText,
      formatDate,
      calculateTotal
    }
  }
}
</script>