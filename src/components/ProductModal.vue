<template>
  <Dialog v-if="product" :open="isOpen" @update:open="handleClose">
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-auto">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="relative">
            <ImageWithFallback
              :src="product.image"
              :alt="product.name"
              class="w-full h-96 object-cover rounded-lg"
            />
            <Badge 
              v-if="product.isOnSale"
              class="absolute top-4 left-4 bg-[#A3E635] text-[#2d1b3d] hover:bg-[#A3E635]/80"
            >
              -{{ discountPercentage }}% OFF
            </Badge>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <p class="text-sm text-muted-foreground uppercase tracking-wide">
              {{ product.category }}
            </p>
            <DialogHeader>
              <DialogTitle class="text-2xl">{{ product.name }}</DialogTitle>
            </DialogHeader>
            
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center">
                <Star
                  v-for="i in 5"
                  :key="i"
                  :class="`h-4 w-4 ${
                    i <= Math.floor(product.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`"
                />
              </div>
              <span class="text-sm text-muted-foreground">
                ({{ product.reviewCount }} reviews)
              </span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="text-3xl font-bold">${{ product.price }}</span>
              <span 
                v-if="product.originalPrice"
                class="text-xl text-muted-foreground line-through"
              >
                ${{ product.originalPrice }}
              </span>
            </div>
            <p 
              v-if="product.isOnSale && product.originalPrice"
              class="text-sm text-[#A3E635] font-medium"
            >
              You save ${{ (product.originalPrice - product.price).toFixed(2) }}
            </p>
          </div>

          <Separator />

          <div class="space-y-4">
            <!-- Only show size selector if product has variants -->
            <div v-if="product.hasVariants">
              <label class="block text-sm font-medium mb-2">Size</label>
              <Select v-model="selectedSize">
                <SelectTrigger>
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem 
                    v-for="variant in product.variantsList" 
                    :key="variant" 
                    :value="variant"
                  >
                    {{ variant }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Quantity</label>
              <Select v-model="quantityString">
                <SelectTrigger class="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem 
                    v-for="i in 10" 
                    :key="i" 
                    :value="i.toString()"
                  >
                    {{ i }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="flex gap-3">
            <Button 
              class="flex-1 bg-[#8E44AD] hover:bg-[#8E44AD]/80" 
              @click="handleAddToCart"
              :disabled="(product.hasVariants && !selectedSize) || isAddingToCart"
            >
              <ShoppingCart v-if="!isAddingToCart" class="h-4 w-4 mr-2" />
              <div v-else class="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
            </Button>
            <Button variant="outline" size="icon">
              <Heart class="h-4 w-4" />
            </Button>
          </div>

          <div class="space-y-4 text-sm">
            <div>
              <h4 class="font-medium mb-2">Product Details</h4>
              <ul class="space-y-1 text-muted-foreground">
                <li>• Premium quality materials</li>
                <li>• Comfortable fit</li>
                <li>• Easy care instructions</li>
                <li>• Available in multiple colors</li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium mb-2">Shipping & Returns</h4>
              <ul class="space-y-1 text-muted-foreground">
                <li>• Free shipping on orders over $100</li>
                <li>• 30-day return policy</li>
                <li>• Ships within 2-3 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { Heart, ShoppingCart, Star } from 'lucide-vue-next'
import { useCartStore } from '@/store/cart'
import { useToast } from '@/components/ui/toast/use-toast'
import Button from './ui/button.vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import Badge from './ui/badge.vue'
import Separator from './ui/separator.vue'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select'
import ImageWithFallback from './figma/ImageWithFallback.vue'

export default {
  name: 'ProductModal',
  components: {
    Heart,
    ShoppingCart,
    Star,
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Badge,
    Separator,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    ImageWithFallback
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const cartStore = useCartStore()
    const { toast } = useToast()
    
    const selectedSize = ref('')
    const quantity = ref(1)
    const isAddingToCart = ref(false)

    const discountPercentage = computed(() => {
      if (!props.product || !props.product.originalPrice) return 0
      return Math.round(((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100)
    })

    const quantityString = computed({
      get: () => quantity.value.toString(),
      set: (value) => {
        quantity.value = parseInt(value)
      }
    })

    const handleAddToCart = async () => {
      if (!props.product) return
      
      // Only require size selection if product has variants
      if (props.product.hasVariants && !selectedSize.value) return
      
      isAddingToCart.value = true
      
      try {
        await cartStore.addToCart(props.product.id, quantity.value)
        
        const description = props.product.hasVariants 
          ? `${quantity.value} x ${props.product.name} (Size: ${selectedSize.value})`
          : `${quantity.value} x ${props.product.name}`
        
        toast({
          title: 'Added to cart!',
          description,
        })
        
        // Close modal after successful add
        setTimeout(() => {
          emit('close')
        }, 500)
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

    const handleClose = (value) => {
      if (!value) {
        emit('close')
      }
    }

    // Reset state when modal closes
    watch(() => props.isOpen, (newValue) => {
      if (!newValue) {
        selectedSize.value = ''
        quantity.value = 1
        isAddingToCart.value = false
      }
    })

    return {
      selectedSize,
      quantity,
      quantityString,
      discountPercentage,
      isAddingToCart,
      handleAddToCart,
      handleClose
    }
  }
}
</script>