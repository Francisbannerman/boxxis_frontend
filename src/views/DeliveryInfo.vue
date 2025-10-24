<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
      Delivery Information
    </h1>

    <div class="prose prose-lg max-w-none">
      <h2 class="text-2xl font-semibold mb-4">Delivery Zones & Timeline</h2>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border rounded-lg p-6">
          <div class="flex items-center gap-2 mb-4">
            <MapPin class="w-6 h-6 text-[#8E44AD]" />
            <h3 class="text-xl font-semibold">Greater Accra</h3>
          </div>
          <p class="text-gray-600 mb-2">Delivery Time: 1-3 business days</p>
          <p class="text-gray-600">Delivery Fee: GH₵ 20 - GH₵ 40</p>
        </div>

        <div class="border rounded-lg p-6">
          <div class="flex items-center gap-2 mb-4">
            <MapPin class="w-6 h-6 text-[#8E44AD]" />
            <h3 class="text-xl font-semibold">Other Regions</h3>
          </div>
          <p class="text-gray-600 mb-2">Delivery Time: 3-7 business days</p>
          <p class="text-gray-600">Delivery Fee: GH₵ 50 - GH₵ 100</p>
        </div>
      </div>

      <div class="bg-lime-50 border border-lime-200 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold mb-2 flex items-center gap-2">
          <Package class="w-5 h-5 text-[#8E44AD]" />
          Free Delivery
        </h3>
        <p>Orders above GH₵ 500 qualify for FREE delivery within Greater Accra!</p>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-4">How Delivery Works</h2>
      
      <ol class="space-y-4 list-decimal list-inside">
        <li class="text-gray-700">
          <strong>Order Confirmation:</strong> You receive email and SMS confirmation immediately after placing your order.
        </li>
        <li class="text-gray-700">
          <strong>Processing:</strong> We carefully pack your items within 24 hours (business days).
        </li>
        <li class="text-gray-700">
          <strong>Dispatch:</strong> Your order is dispatched with tracking number sent via email/SMS.
        </li>
        <li class="text-gray-700">
          <strong>Delivery:</strong> Our courier delivers to your specified address. Please ensure someone is available to receive.
        </li>
      </ol>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Delivery Partners</h2>
      <p class="mb-4">We work with trusted courier services:</p>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>DHL Ghana</li>
        <li>Speedaf Express</li>
        <li>Kwik Delivery</li>
        <li>Our own Nu Retail delivery fleet (Accra only)</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Tracking Your Order</h2>
      <p>
        Once dispatched, you can track your order using the tracking number provided. 
        Log into your account and visit "My Orders" section for real-time updates.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Delivery Issues</h2>
      <p class="mb-4">If you experience any delivery issues:</p>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>Contact us within 24 hours of scheduled delivery</li>
        <li>Provide your order number and tracking details</li>
        <li>We will investigate and resolve immediately</li>
      </ul>

      <div class="mt-8 p-6 bg-purple-50 rounded-lg">
        <h3 class="font-semibold mb-2">Need Help?</h3>
        <p class="text-gray-600 mb-4">Contact our delivery support team</p>
        <Button @click="$router.push('/contact')" class="bg-[#8E44AD] hover:bg-[#8E44AD]/80">
          Contact Us
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin, Package } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

export default {
  components: { MapPin, Package, Button }
}
</script>