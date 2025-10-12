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
                  <div class="flex items-center gap-2 mb-1">
                    <component :is="getStatusIcon(order.status)" />
                    <span class="font-medium text-sm">
                      Order #{{ (order.id || order.checkoutId || 'N/A').toString().slice(0, 8) }}
                    </span>
                    <Badge :class="`text-xs ${getStatusColor(order.status)}`">
                      {{ getStatusText(order.status) }}
                    </Badge>
                  </div>
                  <p class="text-sm text-muted-foreground mb-1">
                    {{ order.deliveryLocation || 'No location' }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">
                      {{ order.date || formatDate(order.dateOfCheckout) }}
                    </span>
                    <span class="font-medium text-[#8E44AD]">₵{{ calculateTotal(order) }}</span>
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
import { Package, Clock, CheckCircle, Truck } from 'lucide-vue-next'
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

    const getStatusIcon = (status) => {
      switch (status) {
        case 1:
          return h(Clock, { class: 'h-4 w-4 text-yellow-500' })
        case 2:
          return h(Truck, { class: 'h-4 w-4 text-blue-500' })
        case 3:
          return h(Package, { class: 'h-4 w-4 text-[#A3E635]' })
        case 4:
        case 5:
          return h(CheckCircle, { class: 'h-4 w-4 text-green-500' })
        default:
          return h(Clock, { class: 'h-4 w-4' })
      }
    }

    const getStatusColor = (status) => {
      switch (status) {
        case 1:
          return 'bg-yellow-100 text-yellow-800'
        case 2:
          return 'bg-blue-100 text-blue-800'
        case 3:
          return 'bg-[#A3E635]/20 text-[#A3E635]'
        case 4:
        case 5:
          return 'bg-green-100 text-green-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getStatusText = (status) => {
      switch (status) {
        case 1:
          return 'Pending'
        case 2:
          return 'Processing'
        case 3:
          return 'Shipped'
        case 4:
          return 'Delivered'
        case 5:
          return 'Completed'
        default:
          return 'Unknown'
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
      getStatusIcon,
      getStatusColor,
      getStatusText,
      formatDate,
      calculateTotal
    }
  }
}
</script>