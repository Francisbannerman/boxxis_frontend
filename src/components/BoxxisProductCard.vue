<template>
  <v-card
    class="product-card"
    elevation="2"
    rounded="lg"
    height="300"
  >
    <!-- Product Image -->
    <div class="image-container position-relative">
      <v-img
        :src="product.image"
        :alt="product.name"
        height="180"
        cover
        class="product-image"
      />
      
      <!-- Discount Badge -->
      <v-chip
        v-if="product.discount > 0"
        color="lime-accent-3"
        size="small"
        class="discount-badge"
        text-color="black"
      >
        -{{ product.discount }}%
      </v-chip>

      <!-- Wishlist Heart -->
      <v-btn
        icon
        size="small"
        variant="flat"
        color="white"
        class="wishlist-btn"
      >
        <v-icon size="small" color="grey-darken-2">mdi-heart-outline</v-icon>
      </v-btn>

      <!-- Quick Add Button -->
      <v-btn
        v-if="!itemQuantity"
        icon
        size="small"
        color="lime-accent-3"
        class="add-btn"
        @click="addToCart"
      >
        <v-icon color="black">mdi-plus</v-icon>
      </v-btn>

      <!-- Quantity Controls -->
      <div v-else class="quantity-controls">
        <v-btn
          icon="mdi-minus"
          size="x-small"
          color="deep-purple"
          variant="flat"
          @click="decrementQuantity"
        />
        <span class="quantity-text">{{ itemQuantity }}</span>
        <v-btn
          icon="mdi-plus"
          size="x-small"
          color="deep-purple"
          variant="flat"
          @click="incrementQuantity"
        />
      </div>
    </div>

    <!-- Product Info -->
    <v-card-text class="pa-3">
      <!-- Category -->
      <div class="text-caption text-grey-darken-1 mb-1">
        {{ product.category }}
      </div>
      
      <!-- Product Name -->
      <div class="product-name text-body-2 font-weight-bold text-truncate-2 mb-2">
        {{ product.name }}
      </div>
      
      <!-- Rating -->
      <div class="d-flex align-center mb-2">
        <v-rating
          :model-value="product.rating"
          color="amber"
          half-increments
          readonly
          size="x-small"
          density="compact"
        />
        <span class="text-caption text-grey-darken-1 ml-1">
          ({{ product.reviewCount || 156 }})
        </span>
      </div>

      <!-- Price -->
      <div class="price-container">
        <span class="current-price text-h6 font-weight-bold">
          ₵{{ (product.discountPrice || product.price).toFixed(2) }}
        </span>
        <span
          v-if="product.discountPrice"
          class="original-price text-caption text-grey text-decoration-line-through ml-2"
        >
          ₵{{ product.price.toFixed(2) }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const itemQuantity = computed(() => {
  return cartStore.getItemQuantity(props.product.id)
})

const addToCart = () => {
  cartStore.addToCart(props.product)
}

const incrementQuantity = () => {
  cartStore.incrementQuantity(props.product.id)
}

const decrementQuantity = () => {
  cartStore.decrementQuantity(props.product.id)
}
</script>

<style scoped>
.product-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.product-image {
  border-radius: 8px 8px 0 0;
}

.discount-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  font-weight: bold;
}

.wishlist-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}

.add-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 2;
}

.quantity-controls {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: white;
  border-radius: 20px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 2;
}

.quantity-text {
  font-weight: bold;
  color: rgb(var(--v-theme-deep-purple));
  min-width: 20px;
  text-align: center;
  font-size: 12px;
}

.product-name {
  line-height: 1.3;
  min-height: 32px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-container {
  display: flex;
  align-items: baseline;
}

.current-price {
  color: rgb(var(--v-theme-deep-purple));
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>