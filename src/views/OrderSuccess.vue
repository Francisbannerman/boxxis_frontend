<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <Card class="text-center">
        <CardContent class="pt-12 pb-8 px-6">
          <!-- Success Icon -->
          <div class="mb-6 flex justify-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <CheckCircle class="w-12 h-12 text-green-600" />
            </div>
          </div>

          <!-- Success Message -->
          <h1 class="text-3xl font-bold text-gray-900 mb-3">
            Order Placed Successfully! 🎉
          </h1>
          <p class="text-gray-600 mb-8">
            Thank you for your order. We've received your order and will process it shortly.
          </p>

          <!-- Order Details -->
          <div class="bg-gray-50 rounded-lg p-4 mb-8 text-left">
            <div class="flex items-start gap-3 mb-3">
              <Package class="w-5 h-5 text-[#8E44AD] mt-0.5" />
              <div>
                <p class="text-sm text-gray-600">Order Number</p>
                <p class="font-semibold text-gray-900">#{{ orderNumber }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Mail class="w-5 h-5 text-[#8E44AD] mt-0.5" />
              <div>
                <p class="text-sm text-gray-600">Confirmation Email</p>
                <p class="font-medium text-gray-900">Sent to your email</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <Button
              class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
              @click="$router.push('/shop')"
            >
              <Home class="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              class="w-full"
              @click="$router.push('/')"
            >
              Back to Home
            </Button>
          </div>

          <!-- Additional Info -->
          <div class="mt-8 pt-6 border-t">
            <p class="text-sm text-gray-500">
              Need help? Contact us at 
              <a href="mailto:support@boxxis.com" class="text-[#8E44AD] hover:underline">
                support@boxxis.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { CheckCircle, Package, Mail, ListOrdered, Home } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent } from '@/components/ui/card'

export default {
  name: 'OrderSuccess',
  components: {
    CheckCircle,
    Package,
    Mail,
    ListOrdered,
    Home,
    Button,
    Card,
    CardContent
  },
  setup() {
    const orderNumber = ref('')

    // Generate a random order number
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      return `BOX${timestamp}${random}`
    }

    onMounted(() => {
      orderNumber.value = generateOrderNumber()
    })

    return {
      orderNumber
    }
  }
}
</script>