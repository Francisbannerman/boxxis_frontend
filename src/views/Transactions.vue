<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8 max-w-5xl">
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
        <p class="text-muted-foreground mt-2">View and manage all your transactions</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        <Card>
          <CardContent class="pt-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted-foreground">Net Balance</p>
                <p :class="`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`">
                  ₵{{ netBalance.toFixed(2) }}
                </p>
              </div>
              <TrendingUp class="h-10 w-10 text-[#A3E635] opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Filters -->
      <div class="mb-6 space-y-4">
        <!-- Type Filters -->
        <div>
          <p class="text-sm font-medium mb-2">Filter by Type</p>
          <div class="flex flex-wrap gap-2">
            <Button
              variant="outline"
              :class="selectedTypeFilter === 'all' ? 'bg-[#8E44AD] text-white hover:bg-[#8E44AD]/90' : ''"
              @click="selectedTypeFilter = 'all'"
              size="sm"
            >
              All Types
            </Button>
            <Button
              v-for="filter in transactionTypeFilters"
              :key="filter.value"
              variant="outline"
              :class="[
                selectedTypeFilter === filter.value ? filter.activeClass : '',
                'border'
              ]"
              @click="selectedTypeFilter = filter.value"
              size="sm"
            >
              <span class="font-bold mr-1.5">{{ filter.acronym }}</span>
              {{ filter.label }}
            </Button>
          </div>
        </div>

        <!-- Direction Filters -->
        <div>
          <p class="text-sm font-medium mb-2">Filter by Direction</p>
          <div class="flex gap-2">
            <Button
              variant="outline"
              :class="selectedDirectionFilter === 'all' ? 'bg-[#8E44AD] text-white hover:bg-[#8E44AD]/90' : ''"
              @click="selectedDirectionFilter = 'all'"
              size="sm"
            >
              All
            </Button>
            <Button
              variant="outline"
              :class="selectedDirectionFilter === 'credit' ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' : ''"
              @click="selectedDirectionFilter = 'credit'"
              size="sm"
            >
              <ArrowDownCircle class="h-4 w-4 mr-1.5" />
              Credits
            </Button>
            <Button
              variant="outline"
              :class="selectedDirectionFilter === 'debit' ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200' : ''"
              @click="selectedDirectionFilter = 'debit'"
              size="sm"
            >
              <ArrowUpCircle class="h-4 w-4 mr-1.5" />
              Debits
            </Button>
          </div>
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
            {{ getEmptyStateMessage() }}
          </p>
          <Button 
            variant="outline"
            @click="resetFilters"
            class="border-[#8E44AD] text-[#8E44AD] hover:bg-[#8E44AD] hover:text-white"
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      <!-- Transactions List -->
      <Card v-else>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <span>{{ filteredTransactions.length }} Transaction{{ filteredTransactions.length !== 1 ? 's' : '' }}</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <div class="divide-y">
            <div 
              v-for="transaction in filteredTransactions" 
              :key="transaction.transactionId"
              class="p-4 hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-start justify-between gap-4">
                <!-- Left Side: Type Badge + Details -->
                <div class="flex items-start gap-4 flex-1 min-w-0">
                  <!-- Transaction Type Badge -->
                  <div 
                    :class="`p-3 rounded-lg border flex-shrink-0 ${transaction.typeColor}`"
                  >
                    <span class="font-bold text-sm">{{ transaction.typeAcronym }}</span>
                  </div>

                  <!-- Transaction Details -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                      <p class="font-semibold">{{ transaction.typeText }}</p>
                      <Badge 
                        :class="transaction.statusColor"
                        class="text-xs"
                      >
                        {{ transaction.statusText }}
                      </Badge>
                    </div>
                    
                    <p class="text-sm text-muted-foreground mb-2">
                      {{ transaction.description }}
                    </p>
                    
                    <div class="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span class="flex items-center gap-1">
                        <Clock class="h-3 w-3" />
                        {{ formatDate(transaction.transactionDate) }}
                      </span>
                      <span v-if="transaction.externalReference" class="flex items-center gap-1">
                        <Hash class="h-3 w-3" />
                        {{ transaction.externalReference.slice(0, 16) }}...
                      </span>
                      <span v-if="transaction.orderId" class="flex items-center gap-1">
                        <Package class="h-3 w-3" />
                        Order #{{ transaction.orderId.toString().slice(0, 8) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Right Side: Amount + Direction -->
                <div class="flex items-center gap-3 flex-shrink-0">
                  <component 
                    :is="transaction.type === 'credit' ? ArrowDownCircle : ArrowUpCircle"
                    :class="`h-5 w-5 ${
                      transaction.type === 'credit' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`"
                  />
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
                  </div>
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
  ArrowUpCircle,
  TrendingUp,
  Clock,
  Hash,
  Package
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Badge from '@/components/ui/badge.vue'
import { transactionService } from '@/api/services/transaction'
import { useAuthStore } from '@/store/auth'
import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const transactions = ref([])
const selectedTypeFilter = ref('all')
const selectedDirectionFilter = ref('all')

const transactionTypeFilters = [
  { value: 1, label: 'Commission Earned', acronym: 'CE', activeClass: 'bg-purple-100 text-purple-700 border-purple-300' },
  { value: 2, label: 'Wallet Top-Up', acronym: 'WT', activeClass: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 3, label: 'Commission Transfer', acronym: 'CT', activeClass: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { value: 4, label: 'Shopping', acronym: 'SP', activeClass: 'bg-[#8E44AD]/20 text-[#8E44AD] border-[#8E44AD]/30' },
  { value: 5, label: 'Other', acronym: 'OT', activeClass: 'bg-gray-100 text-gray-700 border-gray-300' }
]

const filteredTransactions = computed(() => {
  let filtered = transactions.value

  // Filter by type
  if (selectedTypeFilter.value !== 'all') {
    filtered = filtered.filter(t => t.transactionTypes === selectedTypeFilter.value)
  }

  // Filter by direction
  if (selectedDirectionFilter.value !== 'all') {
    filtered = filtered.filter(t => t.type === selectedDirectionFilter.value)
  }

  return filtered
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

const netBalance = computed(() => {
  return totalReceived.value - totalSpent.value
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

const getEmptyStateMessage = () => {
  if (selectedTypeFilter.value !== 'all' && selectedDirectionFilter.value !== 'all') {
    const typeLabel = transactionTypeFilters.find(f => f.value === selectedTypeFilter.value)?.label
    return `No ${selectedDirectionFilter.value} transactions of type "${typeLabel}"`
  }
  if (selectedTypeFilter.value !== 'all') {
    const typeLabel = transactionTypeFilters.find(f => f.value === selectedTypeFilter.value)?.label
    return `No "${typeLabel}" transactions found`
  }
  if (selectedDirectionFilter.value !== 'all') {
    return `No ${selectedDirectionFilter.value} transactions found`
  }
  return "You haven't made any transactions yet"
}

const resetFilters = () => {
  selectedTypeFilter.value = 'all'
  selectedDirectionFilter.value = 'all'
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