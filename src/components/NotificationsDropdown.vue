<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="relative hover:bg-muted">
        <Bell class="h-5 w-5" />
        <Badge 
          v-if="unreadCount > 0"
          class="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#A3E635] text-[#2d1b3d] hover:bg-[#A3E635]/80"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </Badge>
      </Button>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent align="end" class="w-80 max-h-96 overflow-y-auto">
      <DropdownMenuLabel class="flex items-center justify-between">
        <span>Notifications</span>
        <Button 
          v-if="notifications.length > 0 && isAuthenticated"
          variant="ghost" 
          size="sm"
          class="h-auto p-1 text-xs"
          @click="markAllAsRead"
        >
          Mark all read
        </Button>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <!-- Loading State -->
      <div v-if="loading" class="py-8 text-center">
        <div class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-[#8E44AD] border-r-transparent"></div>
        <p class="mt-2 text-sm text-muted-foreground">Loading notifications...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="py-4 px-3">
        <p class="text-sm text-destructive">{{ error }}</p>
        <Button 
          variant="outline" 
          size="sm" 
          class="mt-2 w-full"
          @click="fetchNotifications"
        >
          Retry
        </Button>
      </div>
      
      <!-- Guest Message -->
      <div v-else-if="!isAuthenticated" class="py-4 px-3">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 mt-1">
            <Bell class="h-5 w-5 text-[#8E44AD]" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">Welcome to Boxxis!</p>
            <p class="text-xs text-muted-foreground mt-1">
              Get a referral code and sign up for Boxxis to enjoy quality UK groceries at lower than Accra prices.
            </p>
            <Button 
              variant="default" 
              size="sm" 
              class="mt-3 w-full bg-gradient-to-r from-[#8E44AD] to-[#A3E635] hover:opacity-90"
              @click="handleSignUp"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="notifications.length === 0" class="py-8 text-center">
        <Bell class="h-12 w-12 mx-auto text-muted-foreground/50" />
        <p class="mt-2 text-sm text-muted-foreground">No notifications yet</p>
      </div>
      
      <!-- Notifications List -->
      <div v-else>
        <DropdownMenuItem
          v-for="notification in displayedNotifications"
          :key="notification.id"
          class="cursor-pointer focus:bg-muted p-3 flex-col items-start"
          :class="{ 'bg-muted/50': !notification.isRead }"
          @click="handleNotificationClick(notification)"
        >
          <div class="flex items-start justify-between w-full">
            <div class="flex-1 pr-2">
              <p class="text-sm font-medium line-clamp-1">{{ notification.title }}</p>
              <p class="text-xs text-muted-foreground line-clamp-2 mt-1">
                {{ notification.message }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                {{ formatDate(notification.createdAt) }}
              </p>
            </div>
            <div 
              v-if="!notification.isRead"
              class="flex-shrink-0 h-2 w-2 rounded-full bg-[#A3E635]"
            />
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          class="cursor-pointer justify-center text-[#8E44AD] hover:text-[#8E44AD] hover:bg-[#8E44AD]/10"
          @click="handleViewAll"
        >
          <span class="text-sm font-medium">View All Notifications</span>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
  
  <!-- Notification Detail Dialog -->
  <Dialog v-model:open="detailDialogOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ selectedNotification?.title }}</DialogTitle>
      </DialogHeader>
      <div class="py-4">
        <p class="text-sm text-muted-foreground whitespace-pre-wrap">
          {{ selectedNotification?.message }}
        </p>
        <p class="text-xs text-muted-foreground mt-4">
          {{ formatDate(selectedNotification?.createdAt) }}
        </p>
      </div>
      <DialogFooter class="flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          @click="detailDialogOpen = false"
          class="w-full sm:w-auto"
        >
          Close
        </Button>
        <Button 
          variant="destructive" 
          @click="handleDelete(selectedNotification)"
          :disabled="deleting"
          class="w-full sm:w-auto"
        >
          <Trash2 v-if="!deleting" class="h-4 w-4 mr-2" />
          <div v-else class="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
          {{ deleting ? 'Deleting...' : 'Delete' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <LoginModal v-model:open="showLoginModal" />
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Bell, Trash2 } from 'lucide-vue-next'
import Button from './ui/button.vue'
import Badge from './ui/badge.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdownMenu'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { useAuthStore } from '../store/auth'
import { useNotificationStore } from '../store/notifications'
import { useToast } from './ui/toast/use-toast'
import LoginModal from './LoginModal.vue'

export default {
  name: 'NotificationsDropdown',
  components: {
    Bell,
    Trash2,
    Button,
    Badge,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    LoginModal,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()
    const { toast } = useToast()
    
    const isOpen = ref(false)
    const detailDialogOpen = ref(false)
    const selectedNotification = ref(null)
    const loading = ref(false)
    const deleting = ref(false)
    const error = ref(null)
    const showLoginModal = ref(false)
    
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const notifications = computed(() => notificationStore.notifications)
    const displayedNotifications = computed(() => notifications.value.slice(0, 5))
    const unreadCount = computed(() => 
      notifications.value.filter(n => !n.isRead).length
    )
    
    const fetchNotifications = async () => {
      if (!isAuthenticated.value) return
      
      loading.value = true
      error.value = null
      
      try {
        await notificationStore.fetchNotifications()
      } catch (err) {
        error.value = 'Failed to load notifications'
        console.error('Error fetching notifications:', err)
      } finally {
        loading.value = false
      }
    }
    
    const handleNotificationClick = async (notification) => {
      selectedNotification.value = notification
      detailDialogOpen.value = true
      isOpen.value = false
      
      // Mark as read
      if (!notification.isRead) {
        try {
          await notificationStore.markAsRead(notification.id)
        } catch (err) {
          console.error('Error marking notification as read:', err)
        }
      }
    }
    
    const handleDelete = async (notification) => {
      if (!notification) return
      
      deleting.value = true
      
      try {
        await notificationStore.deleteNotification(notification.id)
        detailDialogOpen.value = false
        selectedNotification.value = null
        
        toast({
          title: 'Success',
          description: 'Notification deleted successfully',
        })
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to delete notification',
          variant: 'destructive',
        })
      } finally {
        deleting.value = false
      }
    }
    
    const markAllAsRead = async () => {
      try {
        await notificationStore.markAllAsRead()
        toast({
          title: 'Success',
          description: 'All notifications marked as read',
        })
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to mark notifications as read',
          variant: 'destructive',
        })
      }
    }
    
    const handleViewAll = () => {
      isOpen.value = false
      router.push('/notifications')
    }
    
    const handleSignUp = () => {
      isOpen.value = false
      showLoginModal.value = true
    }
    
    const formatDate = (dateString) => {
      if (!dateString) return ''
      
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now - date) / 1000)
      
      if (diffInSeconds < 60) return 'Just now'
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
    
    // Fetch notifications on mount and when authenticated
    onMounted(() => {
      if (isAuthenticated.value) {
        fetchNotifications()
      }
    })
    
    watch(isAuthenticated, (newVal) => {
      if (newVal) {
        fetchNotifications()
      }
    })
    
    // Refresh notifications when dropdown opens
    watch(isOpen, (newVal) => {
      if (newVal && isAuthenticated.value) {
        fetchNotifications()
      }
    })
    
    return {
      isOpen,
      detailDialogOpen,
      selectedNotification,
      loading,
      deleting,
      error,
      showLoginModal,
      isAuthenticated,
      notifications,
      displayedNotifications,
      unreadCount,
      fetchNotifications,
      handleNotificationClick,
      handleDelete,
      markAllAsRead,
      handleViewAll,
      handleSignUp,
      formatDate,
    }
  }
}
</script>