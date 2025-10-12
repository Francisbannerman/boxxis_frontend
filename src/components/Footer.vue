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
            <Button variant="ghost" size="icon">
              <Facebook class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="font-medium">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">About Us</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Contact</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">FAQs</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Import Guide</a></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="space-y-4">
          <h4 class="font-medium">Customer Service</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Delivery Info</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Quality Guarantee</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4">
          <h4 class="font-medium">Stay Updated</h4>
          <p class="text-sm text-muted-foreground">
            Subscribe to get special offers and latest updates.
          </p>
          <div class="flex space-x-2">
            <Input
              placeholder="Enter your email"
              class="flex-1 border-border focus:border-[#8E44AD] focus:ring-[#8E44AD]"
            />
            <Button size="icon" class="bg-[#A3E635] hover:bg-[#A3E635]/80 text-[#2d1b3d]">
              <Mail class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator class="my-8" />

      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-sm text-muted-foreground">
          © 2024 Boxxis. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm">
          <a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">
            Privacy
          </a>
          <a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">
            Terms
          </a>
          <a href="#" class="text-muted-foreground hover:text-[#8E44AD] transition-colors">
            Support
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { Facebook, Twitter, Instagram, Mail } from 'lucide-vue-next'
import Button from './ui/button.vue'
import Input from './ui/input.vue'
import Separator from './ui/separator.vue'

export default {
  name: 'Footer',
  components: {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Button,
    Input,
    Separator
  }
}
</script>