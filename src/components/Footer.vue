// ============================================
// 1. UPDATE FOOTER COMPONENT WITH ROUTER LINKS
// ============================================

// Footer.vue (Updated)
<template>
  <footer class="bg-muted/50 border-t mt-16">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">Boxxis</h3>
          <p class="text-sm text-muted-foreground">
            Premium international groceries at competitive prices. 
            Quality imports, better deals than local Ghana markets.
          </p>
          <div class="flex space-x-2">
            <Button variant="ghost" size="icon" @click="openLink('https://facebook.com')">
              <Facebook class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" @click="openLink('https://twitter.com')">
              <Twitter class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" @click="openLink('https://instagram.com')">
              <Instagram class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="font-medium">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/about" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">About Us</router-link></li>
            <li><router-link to="/contact" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Contact</router-link></li>
            <li><router-link to="/faqs" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">FAQs</router-link></li>
            <li><router-link to="/import-guide" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Import Guide</router-link></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="space-y-4">
          <h4 class="font-medium">Customer Service</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/delivery-info" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Delivery Info</router-link></li>
            <li><router-link to="/quality-guarantee" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Quality Guarantee</router-link></li>
            <li><router-link to="/privacy-policy" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Privacy Policy</router-link></li>
            <li><router-link to="/terms" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Terms of Service</router-link></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4">
          <h4 class="font-medium">Stay Updated</h4>
          <p class="text-sm text-muted-foreground">
            Subscribe to get special offers and latest updates.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex space-x-2">
            <Input
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              required
              class="flex-1 border-border focus:border-[#8E44AD] focus:ring-[#8E44AD]"
              :disabled="isSubscribing"
            />
            <Button 
              type="submit" 
              size="icon" 
              class="bg-[#A3E635] hover:bg-[#A3E635]/80 text-[#2d1b3d]"
              :disabled="isSubscribing"
            >
              <Loader2 v-if="isSubscribing" class="h-4 w-4 animate-spin" />
              <Mail v-else class="h-4 w-4" />
            </Button>
          </form>
          <p v-if="subscriptionMessage" :class="subscriptionSuccess ? 'text-green-600' : 'text-red-600'" class="text-xs">
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>

      <Separator class="my-8" />

      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-sm text-muted-foreground">
          © 2024 Boxxis. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm">
          <router-link to="/privacy-policy" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">
            Privacy
          </router-link>
          <router-link to="/terms" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">
            Terms
          </router-link>
          <router-link to="/contact" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">
            Support
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'
import { Facebook, Twitter, Instagram, Mail, Loader2 } from 'lucide-vue-next'
import Button from './ui/button.vue'
import Input from './ui/input.vue'
import Separator from './ui/separator.vue'
import { subscribeToNewsletter } from '@/api/services/newsletter'
import { useAuthStore } from '@/store/auth'

export default {
  name: 'Footer',
  components: {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Loader2,
    Button,
    Input,
    Separator
  },
  setup() {
    const authStore = useAuthStore()
    const newsletterEmail = ref('')
    const isSubscribing = ref(false)
    const subscriptionMessage = ref('')
    const subscriptionSuccess = ref(false)

    const subscribeNewsletter = async () => {
      isSubscribing.value = true
      subscriptionMessage.value = ''

      try {
        const userId = authStore.user?.id || null
        const username = authStore.user?.username || 'Guest'
        
        await subscribeToNewsletter({
          userId,
          username,
          email: newsletterEmail.value
        })

        subscriptionSuccess.value = true
        subscriptionMessage.value = 'Successfully subscribed to newsletter!'
        newsletterEmail.value = ''
      } catch (error) {
        subscriptionSuccess.value = false
        subscriptionMessage.value = error.message || 'Failed to subscribe. Please try again.'
      } finally {
        isSubscribing.value = false
      }
    }

    const openLink = (url) => {
      window.open(url, '_blank')
    }

    return {
      newsletterEmail,
      isSubscribing,
      subscriptionMessage,
      subscriptionSuccess,
      subscribeNewsletter,
      openLink
    }
  }
}
</script>