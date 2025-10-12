<template>
  <div class="mb-8">
    <h3 class="font-medium mb-4">Categories</h3>
    <div class="flex flex-wrap gap-2">
      <Button
        :variant="selectedCategory === 'All' ? 'default' : 'outline'"
        @click="$emit('categoryChange', 'All')"
        :class="`text-sm ${selectedCategory === 'All' ? 'bg-[#8E44AD] hover:bg-[#8E44AD]/80' : 'border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white'}`"
      >
        All Products
      </Button>
      <Button
        v-for="category in categories"
        :key="category"
        :variant="selectedCategory === category ? 'default' : 'outline'"
        @click="$emit('categoryChange', category)"
        :class="`text-sm ${selectedCategory === category ? 'bg-[#8E44AD] hover:bg-[#8E44AD]/80' : 'border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white'}`"
      >
        {{ category }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from './ui/button.vue'

export default {
  name: 'CategoryFilter',
  components: {
    Button
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    }
  },
  emits: ['categoryChange']
}
</script>