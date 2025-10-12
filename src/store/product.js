import { defineStore } from 'pinia'
import { productService } from '@/api/services/product'
import { categoryService } from '@/api/services/category'
import { mapProducts } from '@/api/mappers/productMapper'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: ['All'],
    rawCategories: [],
    selectedCategory: 'All',
    loading: false,
    error: null,
    features: [
      { title: 'Next Day Delivery', subtitle: 'Fast shipping', icon: 'mdi-truck-fast', color: 'lime-accent-3' },
      { title: 'International Quality', subtitle: 'Premium goods', icon: 'mdi-quality-high', color: 'deep-purple' },
      { title: 'Lower Prices', subtitle: 'Save more', icon: 'mdi-tag-outline', color: 'lime-accent-3' },
      { title: 'Earn Commission', subtitle: 'Refer & earn', icon: 'mdi-cash-multiple', color: 'deep-purple' }
    ]
  }),

  getters: {
    filteredProducts: (state) => {
      if (state.selectedCategory === 'All') {
        return state.products
      }
      return state.products.filter(p => p.category === state.selectedCategory)
    }
  },

  actions: {
    async fetchCategories() {
      try {
        this.loading = true
        this.error = null
        
        const apiCategories = await categoryService.getAll()
        this.rawCategories = apiCategories
        
        const categoryNames = apiCategories.map(cat => cat.name)
        this.categories = ['All', ...categoryNames]
        
        console.log('Categories loaded:', this.categories)
        console.log('Raw categories:', this.rawCategories)
      } catch (error) {
        this.error = 'Failed to load categories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchProducts() {
      try {
        this.loading = true
        this.error = null
        
        console.log('Fetching products with categories:', this.rawCategories)
        
        // Get raw response from API
        const response = await productService.getRaw()
        console.log('Raw product response (first item):', response[0])
        
        // Map with categories - THE FIX IS HERE
        const mapped = mapProducts(response, this.rawCategories)
        console.log('Mapped products (first item):', mapped[0])
        
        this.products = mapped
      } catch (error) {
        this.error = 'Failed to load products'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async initialize() {
      console.log('=== INITIALIZING STORE ===')
      
      // Fetch categories FIRST
      await this.fetchCategories()
      console.log('After fetchCategories:')
      console.log('- rawCategories:', this.rawCategories)
      console.log('- categories:', this.categories)
      
      // Then fetch products
      await this.fetchProducts()
      console.log('After fetchProducts:')
      console.log('- products count:', this.products.length)
      console.log('- first product:', this.products[0])
      
      console.log('=== INITIALIZATION COMPLETE ===')
    },

    setSelectedCategory(category) {
      this.selectedCategory = category
      console.log('Selected category:', category)
    },

    searchProducts(query) {
      const lowerQuery = query.toLowerCase()
      return this.products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery)
      )
    }
  }
})