<template>
  <Sheet :open="isOpen" @update:open="handleClose">
    <SheetContent class="w-full sm:max-w-md p-0">
      <div class="flex flex-col h-full">
        <SheetHeader class="px-6 py-4 border-b">
          <SheetTitle>
            Shopping Cart ({{ cartStore.itemCount }})
          </SheetTitle>
        </SheetHeader>

        <!-- Loading State -->
        <div v-if="cartStore.loading" class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8E44AD] border-r-transparent"></div>
            <p class="mt-4 text-sm text-muted-foreground">Loading cart...</p>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else class="flex-1 overflow-auto px-6 py-4">
          <!-- Empty State -->
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingBag class="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p class="text-muted-foreground mb-4">
              Your cart is empty
            </p>
            <Button
              @click="handleClose"
              class="bg-[#8E44AD] hover:bg-[#8E44AD]/80"
            >
              Continue Shopping
            </Button>
          </div>
          
          <!-- Cart Items List -->
          <div v-else class="space-y-4">
            <div 
              v-for="item in cartStore.cartItems" 
              :key="item.id" 
              class="flex gap-3"
            >
              <ImageWithFallback
                :src="item.image"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
              />

              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-sm line-clamp-2">
                  {{ item.name }}
                </h4>
                <p class="text-sm text-muted-foreground">
                  {{ item.category }}
                </p>
                <p class="font-medium">
                  ₵{{ (item.price || 0).toFixed(2) }}
                </p>
              </div>

              <div class="flex flex-col items-end space-y-2">
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  @click="handleRemoveItem(item.id)"
                  :disabled="removing"
                >
                  <X class="h-4 w-4" />
                </Button>

                <div class="flex items-center border border-border rounded">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 hover:bg-muted"
                    @click="handleDecreaseQuantity(item.id)"
                    :disabled="updating"
                  >
                    <Minus class="h-3 w-3" />
                  </Button>
                  <span class="px-2 text-sm font-medium min-w-[2rem] text-center">
                    {{ item.quantity || 0 }}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 text-[#A3E635] hover:bg-[#A3E635] hover:text-[#2d1b3d]"
                    @click="handleIncreaseQuantity(item.id)"
                    :disabled="updating"
                  >
                    <Plus class="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div v-if="!cartStore.isEmpty && !cartStore.loading" class="border-t px-6 py-4 space-y-4">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₵{{ (cartStore.subtotal || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Delivery</span>
              <span class="text-muted-foreground">N/A</span> <!-- ✅ Shows N/A -->
              <!-- <span>
                {{ (cartStore.shipping || 0) === 0 ? "Free" : `₵${(cartStore.shipping || 0).toFixed(2)}` }}
              </span> -->
            </div>
            <!-- <p 
              v-if="(cartStore.subtotal || 0) < 100"
              class="text-xs text-[#A3E635] font-medium"
            >
              Add ₵{{ (100 - (cartStore.subtotal || 0)).toFixed(2) }} more for free shipping!
            </p> -->
            <Separator />
            <div class="flex justify-between font-medium">
              <span>Total</span>
              <span class="text-[#8E44AD] text-lg">
                ₵{{ (cartStore.total || 0).toFixed(2) }}
              </span>
            </div>
          </div>

          <div class="space-y-2">
            <Button 
              class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
              @click="handleCheckout"
            >
              Checkout
            </Button>
            <Button
              variant="outline"
              class="w-full"
              @click="handleClose"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script>
import { ref, watch } from 'vue'
import { Minus, Plus, X, ShoppingBag } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Button from './ui/button.vue'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import Separator from './ui/separator.vue'
import ImageWithFallback from './figma/ImageWithFallback.vue'
import { useCartStore } from '../store/cart'
import { useToast } from './ui/toast/use-toast'
import { useAuthStore } from '../store/auth'

export default {
  name: 'ShoppingCart',
  components: {
    Minus,
    Plus,
    X,
    ShoppingBag,
    Button,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    Separator,
    ImageWithFallback
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const router = useRouter()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const { toast } = useToast()
    
    const updating = ref(false)
    const removing = ref(false)

    // Fetch cart items when cart opens
    watch(() => props.isOpen, async (newVal) => {
      if (newVal && authStore.isAuthenticated) {
        try {
          await cartStore.fetchCartItems()
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      }
    })

    const handleClose = () => {
      emit('close')
    }

    const handleIncreaseQuantity = async (cartProductId) => {
      updating.value = true
      try {
        await cartStore.increaseQuantity(cartProductId)
        toast({
          title: 'Success',
          description: 'Quantity updated',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update quantity',
          variant: 'destructive'
        })
      } finally {
        updating.value = false
      }
    }

    const handleDecreaseQuantity = async (cartProductId) => {
      updating.value = true
      try {
        await cartStore.decreaseQuantity(cartProductId)
        toast({
          title: 'Success',
          description: 'Quantity updated',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update quantity',
          variant: 'destructive'
        })
      } finally {
        updating.value = false
      }
    }

    const handleRemoveItem = async (cartProductId) => {
      removing.value = true
      try {
        await cartStore.removeItem(cartProductId)
        toast({
          title: 'Success',
          description: 'Item removed from cart',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to remove item',
          variant: 'destructive'
        })
      } finally {
        removing.value = false
      }
    }

    // In your ShoppingCart.vue, update the handleCheckout method:

    const handleCheckout = () => {
      // Check if cart is not empty
      if (cartStore.isEmpty) {
        toast({
          title: 'Empty Cart',
          description: 'Please add items to your cart before checkout',
          variant: 'destructive'
        })
        return
      }

      // Close the cart drawer
      handleClose()
      
      // Navigate to checkout page
      router.push('/checkout')
    }

    return {
      cartStore,
      authStore,
      updating,
      removing,
      handleClose,
      handleIncreaseQuantity,
      handleDecreaseQuantity,
      handleRemoveItem,
      handleCheckout
    }
  }
}
</script>