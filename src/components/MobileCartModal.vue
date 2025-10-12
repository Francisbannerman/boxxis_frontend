<template>
  <v-dialog
    v-model="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
    class="mobile-cart-dialog"
  >
    <v-card class="mobile-cart">
      <!-- Header -->
      <v-card-title class="d-flex align-center justify-space-between pa-4">
        <h2 class="text-h6 font-weight-bold">Shopping Cart ({{ cartStore.totalItems }})</h2>
        <v-btn
          icon
          @click="$emit('close')"
          size="small"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <!-- Cart Items -->
      <v-card-text class="pa-0" style="max-height: calc(100vh - 300px); overflow-y: auto;">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item d-flex align-center pa-4"
        >
          <v-img
            :src="item.image"
            :alt="item.name"
            width="60"
            height="60"
            cover
            rounded="lg"
            class="mr-4"
          />

          <div class="flex-grow-1">
            <h4 class="text-body-1 font-weight-bold mb-1">{{ item.name }}</h4>
            <p class="text-body-2 text-grey-darken-1 mb-1">{{ item.category }}</p>
            <div class="price-section">
              <span class="text-h6 font-weight-bold text-deep-purple">
                ₵{{ (item.discountPrice || item.price).toFixed(2) }}
              </span>
            </div>
          </div>

          <v-btn
            icon
            size="small"
            variant="text"
            color="error"
            @click="cartStore.removeFromCart(item.id)"
            class="ml-2"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <div
          v-for="item in cartStore.items"
          :key="`qty-${item.id}`"
          class="quantity-row d-flex align-center justify-space-between pa-4 border-t"
        >
          <span class="text-body-2">{{ item.name }}</span>
          <div class="quantity-controls d-flex align-center">
            <v-btn
              icon="mdi-minus"
              size="small"
              variant="outlined"
              @click="cartStore.decrementQuantity(item.id)"
            />
            <span class="mx-4 font-weight-bold">{{ item.quantity }}</span>
            <v-btn
              icon="mdi-plus"
              size="small"
              variant="outlined"
              @click="cartStore.incrementQuantity(item.id)"
            />
          </div>
        </div>
      </v-card-text>

      <!-- Summary Section -->
      <div class="cart-summary pa-4">
        <div class="summary-row d-flex justify-space-between mb-2">
          <span class="text-body-1">Subtotal</span>
          <span class="text-body-1 font-weight-bold">₵{{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-row d-flex justify-space-between mb-2">
          <span class="text-body-1">Shipping</span>
          <span class="text-body-1 font-weight-bold text-green">₵10.00</span>
        </div>
        
        <!-- Free shipping progress -->
        <div class="free-shipping-note mb-4">
          <p class="text-caption text-lime-accent-3 text-center">
            Add ₵88.22 more for free shipping!
          </p>
        </div>

        <v-divider class="my-3" />
        
        <div class="summary-row d-flex justify-space-between mb-4">
          <span class="text-h6 font-weight-bold">Total</span>
          <span class="text-h6 font-weight-bold text-deep-purple">
            ₵{{ (cartStore.totalPrice + 10).toFixed(2) }}
          </span>
        </div>

        <!-- Action Buttons -->
        <v-btn
          color="deep-purple"
          variant="flat"
          size="large"
          block
          class="mb-3"
          @click="checkout"
        >
          Checkout
        </v-btn>
        
        <v-btn
          variant="outlined"
          size="large"
          block
          @click="continueShopping"
        >
          Continue Shopping
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'close'])
const router = useRouter()
const cartStore = useCartStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const checkout = () => {
  router.push('/checkout')
  emit('close')
}

const continueShopping = () => {
  emit('close')
}
</script>

<style scoped>
.mobile-cart-dialog :deep(.v-overlay__content) {
  margin: 0;
  max-width: none;
  max-height: none;
  border-radius: 0;
}

.cart-item {
  border-bottom: 1px solid #f0f0f0;
}

.quantity-controls {
  background: #f5f5f5;
  border-radius: 20px;
  padding: 4px 8px;
}

.cart-summary {
  background: white;
  border-top: 1px solid #e0e0e0;
}

.free-shipping-note {
  background: rgba(139, 195, 74, 0.1);
  padding: 8px;
  border-radius: 8px;
}

.border-t {
  border-top: 1px solid #f0f0f0;
}
</style>