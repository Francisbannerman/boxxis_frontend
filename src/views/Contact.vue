<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">Contact Us</h1>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-6">Get In Touch</h2>
        
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <Mail class="w-5 h-5 text-[#8E44AD] mt-1" />
            <div>
              <p class="font-medium">Email</p>
              <a href="mailto:support@Boxxis.com" class="text-[#8E44AD] hover:underline">support@NuRetail.com</a>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <Phone class="w-5 h-5 text-[#8E44AD] mt-1" />
            <div>
              <p class="font-medium">Phone</p>
              <a href="tel:+233123456789" class="text-[#8E44AD] hover:underline">+233 123 456 789</a>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <MapPin class="w-5 h-5 text-[#8E44AD] mt-1" />
            <div>
              <p class="font-medium">Address</p>
              <p class="text-gray-600">123 Independence Avenue<br>Accra, Ghana</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <Clock class="w-5 h-5 text-[#8E44AD] mt-1" />
            <div>
              <p class="font-medium">Business Hours</p>
              <p class="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM<br>Sat: 9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Name</label>
            <Input placeholder="Your name" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Message</label>
            <textarea 
              class="w-full min-h-[120px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <Button class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Mail, Phone, MapPin, Clock } from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'

export default {
  components: { Mail, Phone, MapPin, Clock, Button, Input }
}
</script>