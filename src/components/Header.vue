<template>
  <header class="border-b bg-background sticky top-0 z-50 overflow-x-hidden">
    <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-5 max-w-full">
      <div class="flex items-center justify-between gap-2 sm:gap-3">
        <!-- Logo -->
        <div class="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0">
          <!-- Mobile Menu -->
          <Sheet v-model:open="mobileMenuOpen">
            <SheetTrigger>
              <Button variant="ghost" size="icon" class="md:hidden h-9 w-9 sm:h-11 sm:w-11">
                <Menu class="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="w-80">
              <SheetHeader class="text-left">
                <SheetTitle class="bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
                  Nu Retail
                </SheetTitle>
              </SheetHeader>
              <div class="py-6 space-y-4">
                <Button 
                  variant="ghost" 
                  class="w-full justify-start text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
                  @click="mobileMenuOpen = false"
                >
                  Home
                </Button>
                <div class="w-full">
                  <OrdersDropdown class="w-full justify-start" />
                </div>
                
                <!-- Notifications in mobile menu -->
                <div class="w-full border-t pt-4">
                  <NotificationsDropdown />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent whitespace-nowrap truncate">
            Nu Retail
          </h1>
        </div>

        <!-- Navigation - Hidden on mobile -->
        <nav class="hidden md:flex items-center space-x-6">
          <Button variant="ghost" class="text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white px-4 py-2">Home</Button>
          <OrdersDropdown />

          <NotificationsDropdown />
        </nav>

        <!-- Search Bar - Hidden on mobile -->
        <div class="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="header-search"
              name="search"
              type="search"
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="Search products..."
              autocomplete="off"
              class="pl-10 py-5 border-border focus:border-[#8E44AD] focus:ring-[#8E44AD]"
            />
            <Button
              v-if="searchQuery"
              variant="ghost"
              size="icon"
              class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              @click="clearSearch"
            >
              <X class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <!-- Search toggle - mobile only -->
          <Button 
            variant="ghost" 
            size="icon" 
            class="md:hidden h-9 w-9 sm:h-11 sm:w-11 p-0"
            @click="showMobileSearch = !showMobileSearch"
          >
            <Search class="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          
          <!-- Wallet - always visible -->
          <div class="scale-100">
            <Wallet />
          </div>
          
          <!-- Notifications - desktop only (in mobile menu) -->
          <!-- <div class="hidden sm:block">
            <NotificationsDropdown />
          </div> -->
          
          <!-- User Profile - always visible -->
          <div class="scale-100">
            <UserProfile />
          </div>
          
          <!-- Cart - always visible -->
          <Button 
            variant="ghost" 
            size="icon" 
            class="relative hover:bg-muted h-9 w-9 sm:h-11 sm:w-11 p-0"
            @click="$emit('cartClick')"
          >
            <ShoppingCart class="h-5 w-5 sm:h-6 sm:w-6" />
            <Badge 
              v-if="authStore.isAuthenticated && cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center p-0 text-xs sm:text-sm bg-[#A3E635] text-[#2d1b3d] hover:bg-[#A3E635]/80"
            >
              {{ cartStore.itemCount }}
            </Badge>
          </Button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div 
        v-if="showMobileSearch" 
        class="md:hidden mt-4 pb-2"
      >
        <div class="relative w-full">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="mobile-search"
            name="search"
            type="search"
            v-model="searchQuery"
            @input="handleSearch"
            placeholder="Search products..."
            autocomplete="off"
            class="pl-10 pr-10 py-5 border-border focus:border-[#8E44AD] focus:ring-[#8E44AD]"
          />
          <Button
            v-if="searchQuery"
            variant="ghost"
            size="icon"
            class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            @click="clearSearch"
          >
            <X class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { ShoppingCart, Search, Menu, Package, X } from 'lucide-vue-next'
import Button from './ui/button.vue'
import Input from './ui/input.vue'
import Badge from './ui/badge.vue'
import Wallet from './Wallet.vue'
import OrdersDropdown from './OrdersDropdown.vue'
import UserProfile from './UserProfile.vue'
import NotificationsDropdown from './NotificationsDropdown.vue'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { useOrderStore } from '../store/orders'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'

export default {
  name: 'Header',
  components: {
    ShoppingCart,
    Search,
    Menu,
    Package,
    X,
    Button,
    Input,
    Badge,
    Wallet,
    OrdersDropdown,
    UserProfile,
    NotificationsDropdown,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  },
  emits: ['cartClick', 'search'],
  setup(props, { emit }) {
    const mobileMenuOpen = ref(false)
    const showMobileSearch = ref(false)
    const searchQuery = ref('')
    const orderStore = useOrderStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    
    const activeOrdersCount = computed(() => orderStore.activeOrders.length)

    // Fetch cart items when user is authenticated
    onMounted(async () => {
      if (authStore.isAuthenticated) {
        try {
          await cartStore.fetchCartItems()
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      }
    })

    // Watch for authentication changes
    watch(() => authStore.isAuthenticated, async (isAuth) => {
      if (isAuth) {
        try {
          await cartStore.fetchCartItems()
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      } else {
        cartStore.reset()
      }
    })

    const handleSearch = () => {
      emit('search', searchQuery.value)
    }

    const clearSearch = () => {
      searchQuery.value = ''
      emit('search', '')
    }

    return {
      mobileMenuOpen,
      showMobileSearch,
      searchQuery,
      activeOrdersCount,
      cartStore,
      authStore,
      handleSearch,
      clearSearch
    }
  }
}
</script>