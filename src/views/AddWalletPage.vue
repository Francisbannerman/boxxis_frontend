<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <!-- Header -->
      <div class="mb-8">
        <Button 
          variant="ghost" 
          @click="$router.back()"
          class="mb-4"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
          Add New Wallet
        </h1>
        <p class="text-muted-foreground mt-1">Connect a new payment method</p>
      </div>

      <!-- Form -->
      <Card>
        <CardContent class="pt-6">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Wallet Name -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Wallet Name *</label>
              <Input
                v-model="form.walletName"
                placeholder="e.g., MTN MoMo, Vodafone Cash"
                required
              />
              <p class="text-xs text-muted-foreground">
                Choose a name to identify this wallet
              </p>
            </div>

            <!-- Account Number -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Account Number *</label>
              <Input
                v-model="form.accountNumber"
                placeholder="e.g., 0244123456"
                required
              />
              <p class="text-xs text-muted-foreground">
                Your mobile money or account number
              </p>
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Description (Optional)</label>
              <textarea
                v-model="form.description"
                placeholder="Add notes about this wallet..."
                rows="3"
                class="w-full px-3 py-2 border rounded-md resize-none"
              />
            </div>

            <!-- Submit Buttons -->
            <div class="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline" 
                @click="$router.back()"
                class="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                :disabled="loading"
                class="flex-1 bg-[#8E44AD] hover:bg-[#8E44AD]/80"
              >
                {{ loading ? 'Adding...' : 'Add Wallet' }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import Button from '../components/ui/button.vue'
import Input from '../components/ui/input.vue'
import { Card, CardContent } from '../components/ui/card'
import { walletService } from '../api/services/wallet'
import { toast } from 'vue-sonner'

const router = useRouter()
const loading = ref(false)

// TODO: Get from auth store
const currentUserId = '1472f95a-5c0c-485e-971b-46ffeb730bc1'

const form = ref({
  walletName: '',
  accountNumber: '',
  description: ''
})

const handleSubmit = async () => {
  try {
    loading.value = true
    
    const payload = {
      userId: currentUserId,
      accountNumber: form.value.accountNumber,
      walletName: form.value.walletName,
      description: form.value.description || form.value.walletName
    }
    
    await walletService.createWallet(payload)
    toast.success('Wallet added successfully!')
    router.push('/wallets')
  } catch (error) {
    console.error('Failed to add wallet:', error)
    toast.error('Failed to add wallet. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>