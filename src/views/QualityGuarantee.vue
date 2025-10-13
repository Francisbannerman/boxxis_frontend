<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
      Quality Guarantee
    </h1>

    <div class="prose prose-lg max-w-none">
      <div class="bg-gradient-to-r from-purple-100 to-lime-100 p-8 rounded-lg mb-8">
        <h2 class="text-2xl font-bold mb-4">Our Quality Promise</h2>
        <p class="text-lg">
          At Boxxis, we guarantee 100% authentic, high-quality products. If you're not satisfied, 
          we'll make it right - no questions asked.
        </p>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-4">What We Guarantee</h2>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="border-2 border-[#8E44AD] rounded-lg p-6">
          <div class="flex items-center gap-3 mb-3">
            <Shield class="w-8 h-8 text-[#8E44AD]" />
            <h3 class="text-xl font-semibold">Authenticity</h3>
          </div>
          <p class="text-gray-600">
            Every product is sourced directly from authorized distributors. We guarantee 100% genuine products.
          </p>
        </div>

        <div class="border-2 border-[#A3E635] rounded-lg p-6">
          <div class="flex items-center gap-3 mb-3">
            <CheckCircle class="w-8 h-8 text-[#A3E635]" />
            <h3 class="text-xl font-semibold">Quality Control</h3>
          </div>
          <p class="text-gray-600">
            Rigorous inspection process ensures only the best products reach your doorstep.
          </p>
        </div>

        <div class="border-2 border-[#8E44AD] rounded-lg p-6">
          <div class="flex items-center gap-3 mb-3">
            <Calendar class="w-8 h-8 text-[#8E44AD]" />
            <h3 class="text-xl font-semibold">Fresh Products</h3>
          </div>
          <p class="text-gray-600">
            All food items have minimum 6 months shelf life. We never sell expired or near-expiry products.
          </p>
        </div>

        <div class="border-2 border-[#A3E635] rounded-lg p-6">
          <div class="flex items-center gap-3 mb-3">
            <Package class="w-8 h-8 text-[#A3E635]" />
            <h3 class="text-xl font-semibold">Perfect Packaging</h3>
          </div>
          <p class="text-gray-600">
            Secure packaging ensures products arrive in perfect condition, just as they left our warehouse.
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Our Quality Process</h2>
      
      <div class="space-y-4">
        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-[#8E44AD] text-white rounded-full flex items-center justify-center font-bold text-lg">
            1
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">Supplier Verification</h3>
            <p class="text-gray-600">
              We only work with certified, reputable international suppliers with proven track records.
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-[#8E44AD] text-white rounded-full flex items-center justify-center font-bold text-lg">
            2
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">Import Inspection</h3>
            <p class="text-gray-600">
              Every shipment undergoes thorough inspection upon arrival for quality, authenticity, and compliance.
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-[#8E44AD] text-white rounded-full flex items-center justify-center font-bold text-lg">
            3
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">Storage Standards</h3>
            <p class="text-gray-600">
              Climate-controlled warehouse maintains optimal conditions for all products.
            </p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-[#8E44AD] text-white rounded-full flex items-center justify-center font-bold text-lg">
            4
          </div>
          <div>
            <h3 class="font-semibold text-lg mb-2">Pre-Delivery Check</h3>
            <p class="text-gray-600">
              Final quality check before packing ensures only perfect products are shipped.
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-semibold mt-12 mb-4">Our Guarantee to You</h2>
      
      <div class="bg-purple-50 border-l-4 border-[#8E44AD] p-6 mb-4">
        <h3 class="font-semibold mb-2">7-Day Return Policy</h3>
        <p>Not satisfied? Return any product within 7 days for a full refund or replacement.</p>
      </div>

      <div class="bg-lime-50 border-l-4 border-[#A3E635] p-6 mb-4">
        <h3 class="font-semibold mb-2">Damaged Product Replacement</h3>
        <p>Received a damaged item? We'll replace it immediately at no extra cost.</p>
      </div>

      <div class="bg-purple-50 border-l-4 border-[#8E44AD] p-6">
        <h3 class="font-semibold mb-2">Money-Back Guarantee</h3>
        <p>If we can't resolve your issue, we'll provide a full refund - no hassle.</p>
      </div>

      <h2 class="text-2xl font-semibold mt-12 mb-4">Certifications & Compliance</h2>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>Ghana Standards Authority (GSA) Certified</li>
        <li>Food and Drugs Authority (FDA) Approved</li>
        <li>ISO 9001:2015 Quality Management</li>
        <li>HACCP Food Safety Standards</li>
      </ul>

      <div class="mt-12 p-6 bg-gradient-to-r from-purple-50 to-lime-50 rounded-lg text-center">
        <h3 class="text-2xl font-bold mb-4">Quality Issues?</h3>
        <p class="mb-6">We take quality seriously. Report any concerns immediately.</p>
        <Button @click="$router.push('/contact')" class="bg-[#8E44AD] hover:bg-[#8E44AD]/80">
          Report an Issue
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Shield, CheckCircle, Calendar, Package } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

export default {
  components: { Shield, CheckCircle, Calendar, Package, Button }
}
</script>