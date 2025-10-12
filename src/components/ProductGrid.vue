<template>
  <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @product-click="$emit('productClick', $event)"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: true,
      validator: (products) => {
        return Array.isArray(products) && products.every(product => 
          product && 
          typeof product.id === 'string' &&
          typeof product.name === 'string' &&
          typeof product.price === 'number' &&
          typeof product.image === 'string' &&
          typeof product.category === 'string' &&
          typeof product.rating === 'number' &&
          typeof product.reviewCount === 'number'
        )
      }
    }
  },
  emits: ['productClick']
}
</script>