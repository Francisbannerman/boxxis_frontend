<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
      Frequently Asked Questions
    </h1>

    <div class="space-y-4">
      <div v-for="(faq, index) in faqs" :key="index" class="border rounded-lg">
        <button
          @click="toggleFaq(index)"
          class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span class="font-medium">{{ faq.question }}</span>
          <ChevronDown 
            :class="{ 'rotate-180': openFaq === index }"
            class="w-5 h-5 text-[#8E44AD] transition-transform"
          />
        </button>
        <div 
          v-show="openFaq === index"
          class="px-4 pb-4 text-gray-600"
        >
          {{ faq.answer }}
        </div>
      </div>
    </div>

    <div class="mt-12 p-6 bg-purple-50 rounded-lg">
      <h2 class="text-xl font-semibold mb-2">Still have questions?</h2>
      <p class="text-gray-600 mb-4">We're here to help! Contact our support team.</p>
      <Button @click="$router.push('/contact')" class="bg-[#8E44AD] hover:bg-[#8E44AD]/80">
        Contact Support
      </Button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

export default {
  name: 'FAQs',
  components: { ChevronDown, Button },
  setup() {
    const openFaq = ref(null)
    
    const faqs = [
      {
        question: 'How do I place an order?',
        answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You can pay using mobile money or card payment.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Mobile Money (MTN, Vodafone, AirtelTigo), credit/debit cards, and bank transfers.'
      },
      {
        question: 'How long does delivery take?',
        answer: 'Delivery within Accra takes 1-3 business days. Other regions in Ghana take 3-7 business days depending on location.'
      },
      {
        question: 'Do you deliver nationwide?',
        answer: 'Yes! We deliver to all regions in Ghana. Delivery fees vary based on location.'
      },
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 7 days of delivery for damaged or defective products. Contact our support team to initiate a return.'
      },
      {
        question: 'Are your products authentic?',
        answer: 'Absolutely! All our products are imported directly from authorized distributors and suppliers. We guarantee 100% authenticity.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order in the "My Orders" section of your account.'
      },
      {
        question: 'Do you offer bulk discounts?',
        answer: 'Yes! Contact our sales team for bulk orders and we can offer special pricing for large quantities.'
      },
      {
        question: 'What if I receive a damaged product?',
        answer: 'Please contact us immediately with photos of the damaged item. We will arrange a replacement or full refund.'
      },
      {
        question: 'Can I cancel my order?',
        answer: 'Orders can be cancelled within 2 hours of placement. After that, please contact support for assistance.'
      }
    ]

    const toggleFaq = (index) => {
      openFaq.value = openFaq.value === index ? null : index
    }

    return { faqs, openFaq, toggleFaq }
  }
}
</script>