<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <Button 
          variant="ghost" 
          class="mb-4 text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
          @click="$router.back()"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
          Transaction History
        </h1>
        <p class="text-muted-foreground mt-2">View all your transactions</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent class="pt-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Total Transactions</p>
                <p class="text-2xl font-bold text-[#8E44AD]">{{ transactions.length }}</p>
              </div>
              <Receipt class="h-10 w-10 text-[#8E44AD] opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="pt-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Total Spent</p>
                <p class="text-2xl font-bold text-red-600">₵{{ totalSpent.toFixed(2) }}</p>
              </div>
              <ArrowUpCircle class="h-10 w-10 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent class="pt-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Total Received</p>
                <p class="text-2xl font-bold text-green-600">₵{{ totalReceived.toFixed(2) }}</p>
              </div>
              <ArrowDownCircle class="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Filter Buttons -->
      <div class="mb-6">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <Button
            v-for="filter in transactionFilters"
            :key="filter.value"
            :variant="selectedFilter === filter.value ? 'default' : 'outline'"
            :class="selectedFilter === filter.value ? 'bg-[#8E44AD] hover:bg-[#8E44AD]/80' : ''"
            @click="selectedFilter = filter.value"
            size="sm"
          >
            {{ filter.label }}
          </Button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="h-12 w-12 mx-auto border-4 border-[#8E44AD] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-muted-foreground">Loading transactions...</p>
      </div>

      <!-- Empty State -->
      <Card v-else-if="filteredTransactions.length === 0" class="border-dashed">
        <CardContent class="text-center py-12">
          <Receipt class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-lg font-semibold mb-2">No Transactions Found</h3>
          <p class="text-muted-foreground mb-6">
            {{ selectedFilter === 'all' ? "You haven't made any transactions yet" : `No ${selectedFilter} transactions` }}
          </p>
        </CardContent>
      </Card>

      <!-- Transactions List -->
      <Card v-else>
        <CardContent class="p-0">
          <div class="divide-y">
            <div 
              v-for="transaction in filteredTransactions" 
              :key="transaction.transactionId"
              class="p-4 hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <!-- Icon -->
                  <div 
                    :class="`p-3 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100' 
                        : 'bg-red-100'
                    }`"
                  >
                    <component 
                      :is="transaction.type === 'credit' ? ArrowDownCircle : ArrowUpCircle"
                      :class="`h-5 w-5 ${
                        transaction.type === 'credit' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`"
                    />
                  </div>

                  <!-- Transaction Details -->
                  <div>
                    <p class="font-semibold">{{ transaction.description || 'Transaction' }}</p>
                    <p class="text-sm text-muted-foreground">
                      {{ formatDate(transaction.transactionDate) }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <Badge variant="outline" class="text-xs">
                        {{ transaction.transactionTypes || 'Unknown' }}
                      </Badge>
                      <Badge 
                        :class="getStatusColor(transaction.status)"
                        class="text-xs"
                      >
                        {{ transaction.status }}
                      </Badge>
                    </div>
                  </div>
                </div>

                <!-- Amount -->
                <div class="text-right">
                  <p 
                    :class="`text-xl font-bold ${
                      transaction.type === 'credit' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`"
                  >
                    {{ transaction.type === 'credit' ? '+' : '-' }}₵{{ transaction.amount.toFixed(2) }}
                  </p>
                  <p v-if="transaction.externalReference" class="text-xs text-muted-foreground mt-1">
                    Ref: {{ transaction.externalReference.slice(0, 12) }}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  Receipt, 
  ArrowDownCircle, 
  ArrowUpCircle
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent } from '@/components/ui/card'
import Badge from '@/components/ui/badge.vue'
import { transactionService } from '@/api/services/transaction'
import { useAuthStore } from '@/store/auth'
import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const transactions = ref([])
const selectedFilter = ref('all')

const transactionFilters = [
  { value: 'all', label: 'All' },
  { value: 'credit', label: 'Credits' },
  { value: 'debit', label: 'Debits' }
]

const filteredTransactions = computed(() => {
  if (selectedFilter.value === 'all') {
    return transactions.value
  }
  return transactions.value.filter(t => t.type === selectedFilter.value)
})

const totalSpent = computed(() => {
  return transactions.value
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalReceived = computed(() => {
  return transactions.value
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0)
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

const getStatusColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

const fetchTransactions = async () => {
  if (!authStore.userId) {
    toast.error('Please login to view transactions')
    router.push('/')
    return
  }

  try {
    loading.value = true
    const data = await transactionService.getUserTransactions(authStore.userId)
    transactions.value = data
  } catch (error) {
    console.error('Failed to load transactions:', error)
    toast.error('Failed to load transactions')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTransactions()
})
</script>