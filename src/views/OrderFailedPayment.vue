<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <Card class="text-center">
        <CardContent class="pt-12 pb-8 px-6">
          <!-- Failed Icon -->
          <div class="mb-6 flex justify-center">
            <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <XCircle class="w-12 h-12 text-red-600" />
            </div>
          </div>

          <!-- Failed Message -->
          <h1 class="text-3xl font-bold text-gray-900 mb-3">
            Payment Failed
          </h1>
          <p class="text-gray-600 mb-8">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>

          <!-- Error Details -->
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <div class="flex items-start gap-3 mb-3">
              <AlertCircle class="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p class="text-sm font-semibold text-red-900">Transaction Failed</p>
                <p class="text-sm text-red-700 mt-1">
                  Your payment could not be completed. No charges were made to your account.
                </p>
              </div>
            </div>
          </div>

          <!-- Common Reasons -->
          <div class="bg-gray-50 rounded-lg p-4 mb-8 text-left">
            <p class="text-sm font-semibold text-gray-900 mb-3">Common reasons for payment failure:</p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start gap-2">
                <span class="text-gray-400">•</span>
                <span>Insufficient funds</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gray-400">•</span>
                <span>Incorrect payment details</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gray-400">•</span>
                <span>Card expired or blocked</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-gray-400">•</span>
                <span>Network connection issues</span>
              </li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <Button
              class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
              @click="retryPayment"
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Retry Payment
            </Button>
            <Button
              variant="outline"
              class="w-full"
              @click="$router.push('/shop')"
            >
              <ShoppingCart class="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            <Button
              variant="ghost"
              class="w-full"
              @click="$router.push('/shop')"
            >
              Continue Shopping
            </Button>
          </div>

          <!-- Additional Help -->
          <div class="mt-8 pt-6 border-t">
            <p class="text-sm text-gray-500">
              Need help? Contact us at 
              <a href="mailto:support@Boxxis.com" class="text-[#8E44AD] hover:underline">
                support@Boxxis.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script>
import { XCircle, AlertCircle, RefreshCw, ShoppingCart } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent } from '@/components/ui/card'

export default {
  name: 'OrderFailed',
  components: {
    XCircle,
    AlertCircle,
    RefreshCw,
    ShoppingCart,
    Button,
    Card,
    CardContent
  },
  setup() {
    const retryPayment = () => {
      // Refresh the page to retry payment
      window.location.reload()
    }

    return {
      retryPayment
    }
  }
}
</script>