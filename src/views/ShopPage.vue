<template>
  <div class="min-h-screen bg-background">
    <Header 
      @cart-click="isCartOpen = true"
      @search="handleSearch"
    />

    <main class="container mx-auto px-4 py-8">
      <!-- Key Features -->
      <div class="text-center mb-8 relative">
        <!-- ... your features code ... -->
      </div>

      <!-- Search Results Info -->
      <div v-if="searchQuery" class="mb-4">
        <p class="text-sm text-muted-foreground">
          Found {{ filteredProducts.length }} result{{ filteredProducts.length !== 1 ? 's' : '' }} for 
          <span class="font-medium text-foreground">"{{ searchQuery }}"</span>
          <Button 
            variant="ghost" 
            size="sm" 
            class="ml-2 text-[#8E44AD]"
            @click="clearSearch"
          >
            Clear search
          </Button>
        </p>
      </div>

      <!-- Category Filter -->
      <CategoryFilter
        :categories="categories"
        :selected-category="selectedCategory"
        @category-change="selectedCategory = $event"
      />

      <!-- Product Grid -->
      <ProductGrid
        :products="filteredProducts"
        @add-to-cart="addToCart"
        @product-click="selectedProduct = $event"
      />

      <!-- No Results -->
      <div 
        v-if="filteredProducts.length === 0" 
        class="text-center py-12"
      >
        <p class="text-muted-foreground">
          No products found{{ searchQuery ? ` for "${searchQuery}"` : '' }}
        </p>
      </div>
    </main>

    <Footer />

    <!-- Shopping Cart -->
    <ShoppingCart
      :is-open="isCartOpen"
      @close="isCartOpen = false"
    />

    <!-- Product Modal -->
    <ProductModal
      :product="selectedProduct"
      :is-open="!!selectedProduct"
      @close="selectedProduct = null"
      @add-to-cart="addToCart"
    />

    <Toaster />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../store/product'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { useToast } from '../components/ui/toast/use-toast'
import Button from '../components/ui/button.vue'
import Header from '../components/Header.vue'
import ProductGrid from '../components/ProductGrid.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import ProductModal from '../components/ProductModal.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import Footer from '../components/Footer.vue'
import Toaster from '../components/ui/toast/Toaster.vue'

export default {
  name: 'ShopPage',
  components: {
    Button,
    Header,
    ProductGrid,
    ShoppingCart,
    ProductModal,
    CategoryFilter,
    Footer,
    Toaster
  },
  setup() {
    const productsStore = useProductsStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const { toast } = useToast()
    
    const isCartOpen = ref(false)
    const selectedProduct = ref(null)
    const selectedCategory = ref('All')
    const searchQuery = ref('')

    // Initialize stores on mount
    onMounted(async () => {
      await productsStore.initialize()
      
      if (authStore.isAuthenticated) {
        try {
          await cartStore.fetchCartItems()
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      }
    })

    // Get categories from store
    const categories = computed(() => productsStore.categories)
    
    // Get filtered products (by category AND search)
    const filteredProducts = computed(() => {
      let products = productsStore.products

      // Filter by category
      if (selectedCategory.value !== 'All') {
        products = products.filter(p => p.category === selectedCategory.value)
      }

      // Filter by search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        products = products.filter(p => 
          p.productName?.toLowerCase().includes(query) ||
          p.productDescription?.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query) ||
          p.manufacturer?.toLowerCase().includes(query)
        )
      }

      return products
    })

    // Handle search from header
    const handleSearch = (query) => {
      searchQuery.value = query
      // Reset category when searching
      if (query) {
        selectedCategory.value = 'All'
      }
    }

    // Clear search
    const clearSearch = () => {
      searchQuery.value = ''
    }

    // Add to cart
    const addToCart = async (product, quantity = 1) => {
      if (!authStore.isAuthenticated) {
        toast({
          title: 'Login Required',
          description: 'Please login to add items to cart',
          variant: 'destructive'
        })
        return
      }

      try {
        await cartStore.addToCart(product.productId, quantity)
        toast({
          title: 'Success',
          description: `Added ${product.productName} to cart`
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to add item to cart',
          variant: 'destructive'
        })
      }
    }

    return {
      isCartOpen,
      selectedProduct,
      selectedCategory,
      searchQuery,
      categories,
      filteredProducts,
      handleSearch,
      clearSearch,
      addToCart
    }
  }
}
</script>