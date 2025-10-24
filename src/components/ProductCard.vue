<template>
  <Card class="group hover:shadow-lg hover:border-[#8E44AD]/30 transition-all duration-200 cursor-pointer border-2 border-transparent">
    <CardContent class="p-0">
      <div class="relative overflow-hidden rounded-t-lg">
        <ImageWithFallback
          :src="product.image"
          :alt="product.name"
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
          @click="$emit('productClick', product)"
        />
        
        <!-- Sale Badge -->
        <Badge 
          v-if="product.isOnSale"
          class="absolute top-2 left-2 bg-[#A3E635] text-[#2d1b3d] hover:bg-[#A3E635]/80"
        >
          -{{ discountPercentage }}%
        </Badge>

        <!-- Action Buttons (Heart) -->
        <!-- <div class="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            class="h-8 w-8 bg-background/80 backdrop-blur-sm"
          >
            <Heart class="h-4 w-4" />
          </Button>
        </div> -->

        <!-- Quick Add Button - ✅ FIXED FOR MOBILE -->
        <div class="absolute bottom-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            class="h-8 w-8 bg-[#8E44AD] hover:bg-[#8E44AD]/80"
            @click="handleAddToCart"
            :disabled="isAddingToCart"
          >
            <div v-if="isAddingToCart" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <Plus v-else class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div class="p-4" @click="$emit('productClick', product)">
        <div class="mb-2">
          <p class="text-sm text-muted-foreground">{{ product.category }}</p>
          <h3 class="font-medium line-clamp-2">{{ product.name }}</h3>
        </div>

        <div class="flex items-center mb-2">
          <div class="flex items-center">
            <span
              v-for="i in 5"
              :key="i"
              :class="`text-xs ${
                i <= Math.floor(product.rating = 5) 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
              }`"
            >
              ★
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="font-bold">GH₵{{ product.price }}</span>
            <span 
              v-if="product.originalPrice"
              class="text-sm text-muted-foreground line-through"
            >
              ${{ product.originalPrice }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Login Modal -->
  <LoginModal v-model:open="showLoginModal" @success="handleLoginSuccess" />
</template>

<!-- Script stays the same -->

<script>
import { ref, computed } from 'vue'
import { Heart, Plus } from 'lucide-vue-next'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { useToast } from '@/components/ui/toast/use-toast'
import Button from './ui/button.vue'
import { Card, CardContent } from './ui/card'
import Badge from './ui/badge.vue'
import ImageWithFallback from './figma/ImageWithFallback.vue'
import LoginModal from './LoginModal.vue'

export default {
  name: 'ProductCard',
  components: {
    Heart,
    Plus,
    Button,
    Card,
    CardContent,
    Badge,
    ImageWithFallback,
    LoginModal
  },
  props: {
    product: {
      type: Object,
      required: true,
      validator: (product) => {
        return product && 
               typeof product.id === 'string' &&
               typeof product.name === 'string' &&
               typeof product.price === 'number' &&
               typeof product.image === 'string' &&
               typeof product.category === 'string' &&
               typeof product.rating === 'number' &&
               typeof product.reviewCount === 'number'
      }
    }
  },
  emits: ['productClick'],
  setup(props) {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const { toast } = useToast()
    const isAddingToCart = ref(false)
    const showLoginModal = ref(false)
    const pendingProduct = ref(null)

    const discountPercentage = computed(() => {
      return props.product.originalPrice 
        ? Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
        : 0
    })

    const handleAddToCart = async (event) => {
      event.stopPropagation()
      
      if (isAddingToCart.value) return

      // Check authentication first
      if (!authStore.isAuthenticated) {
        pendingProduct.value = props.product
        showLoginModal.value = true
        toast({
          title: 'Login Required',
          description: 'Please login to add items to cart',
          variant: 'destructive'
        })
        return
      }
      
      isAddingToCart.value = true
      
      try {
        await cartStore.addToCart(props.product.id, 1)
        
        toast({
          title: 'Added to cart!',
          description: `${props.product.name} has been added to your cart.`,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to add item to cart',
          variant: 'destructive',
        })
      } finally {
        isAddingToCart.value = false
      }
    }

    const handleLoginSuccess = async () => {
      toast({
        title: 'Welcome! 🎉',
        description: 'Successfully logged in'
      })

      // Auto-add the pending product after login
      if (pendingProduct.value) {
        isAddingToCart.value = true
        try {
          await cartStore.addToCart(pendingProduct.value.id, 1)
          toast({
            title: 'Added to cart!',
            description: `${pendingProduct.value.name} has been added to your cart.`,
          })
        } catch (error) {
          toast({
            title: 'Error',
            description: error.message || 'Failed to add item to cart',
            variant: 'destructive',
          })
        } finally {
          isAddingToCart.value = false
          pendingProduct.value = null
        }
      }
    }

    return {
      discountPercentage,
      isAddingToCart,
      showLoginModal,
      handleAddToCart,
      handleLoginSuccess
    }
  }
}
</script>