<template>
  <div class="mb-8">
    <div 
      v-if="!authStore.isAuthenticated"
      class="mb-6 p-4 bg-gradient-to-r from-[#8E44AD] to-[#A3E635] rounded-lg text-white"
    >
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#8E44AD] via-[#9D52BD] to-[#A3E635] p-6 shadow-lg">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div class="relative z-10 text-center max-w-3xl mx-auto">
          <div class="mb-3">
            <span class="text-4xl">🎉</span>
          </div>
          
          <h3 class="text-2xl sm:text-3xl font-bold text-white mb-3">
            Start Shopping Today!
          </h3>
          
          <p class="text-white/90 text-sm sm:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
            Login now to enjoy exclusive benefits: affordable prices and earn referral commissions 
            when you buy from this members-only club
          </p>
          
          <Button
            @click="showLoginModal = true"
            size="lg"
            class="bg-white text-[#8E44AD] hover:bg-gray-50 hover:scale-105 font-semibold px-8 py-3 shadow-xl transition-all duration-200"
          >
            <span class="mr-2">🔓</span>
            Login Now
          </Button>
          
          <!-- Features -->
          <div class="mt-6 flex flex-wrap justify-center gap-4 text-white/80 text-xs sm:text-sm">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>Affordable Prices</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>Earn Commissions</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>Exclusive Club</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="font-bold mb-4 mt-6">Categories</h3>
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

  <!-- Login Modal -->
  <LoginModal v-model:open="showLoginModal" @success="handleLoginSuccess" />
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useToast } from './ui/toast/use-toast'
import Button from './ui/button.vue'
import LoginModal from './LoginModal.vue'

export default {
  name: 'CategoryFilter',
  components: {
    Button,
    LoginModal
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
  emits: ['categoryChange'],
  setup() {
    const authStore = useAuthStore()
    const { toast } = useToast()
    const showLoginModal = ref(false)

    const handleLoginSuccess = () => {
      toast({
        title: 'Welcome! 🎉',
        description: 'Successfully logged in. Start shopping now!'
      })
    }
    
    return {
      authStore,
      showLoginModal,
      handleLoginSuccess
    }
  }
}
</script>