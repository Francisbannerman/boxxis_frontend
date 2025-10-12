<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent">
          Notifications
        </h1>
        <p class="text-sm text-muted-foreground mt-1">
          {{ unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!' }}
        </p>
      </div>
      
      <div class="flex items-center gap-2">
        <Button 
          v-if="notifications.length > 0"
          variant="outline" 
          size="sm"
          @click="markAllAsRead"
          :disabled="unreadCount === 0"
        >
          Mark all read
        </Button>
        <Button 
          v-if="notifications.length > 0"
          variant="outline" 
          size="sm"
          @click="showDeleteAllDialog = true"
        >
          <Trash2 class="h-4 w-4 mr-2" />
          Clear all
        </Button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-12 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8E44AD] border-r-transparent"></div>
      <p class="mt-4 text-muted-foreground">Loading notifications...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-12 text-center">
      <p class="text-destructive mb-4">{{ error }}</p>
      <Button @click="fetchNotifications">Retry</Button>
    </div>

    <!-- Empty State -->
    <div v-else-if="notifications.length === 0" class="py-12 text-center">
      <Bell class="h-16 w-16 mx-auto text-muted-foreground/30" />
      <h3 class="mt-4 text-lg font-semibold">No notifications yet</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        When you receive notifications, they'll appear here
      </p>
    </div>

    <!-- Notifications List -->
    <div v-else class="space-y-3">
      <Card
        v-for="notification in paginatedNotifications"
        :key="notification.id"
        class="transition-all hover:shadow-md cursor-pointer"
        :class="{ 'border-l-4 border-l-[#A3E635] bg-muted/30': !notification.isRead }"
        @click="handleNotificationClick(notification)"
      >
        <CardContent class="p-4">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-sm truncate">
                  {{ notification.title }}
                </h3>
                <Badge 
                  v-if="!notification.isRead"
                  variant="secondary"
                  class="bg-[#A3E635] text-[#2d1b3d] hover:bg-[#A3E635]/80"
                >
                  New
                </Badge>
              </div>
              
              <p class="text-sm text-muted-foreground line-clamp-2">
                {{ notification.message }}
              </p>
              
              <div class="flex items-center gap-4 mt-2">
                <span class="text-xs text-muted-foreground">
                  {{ formatDate(notification.createdAt) }}
                </span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              class="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
              @click.stop="handleDeleteClick(notification)"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <ChevronLeft class="h-4 w-4" />
        Previous
      </Button>
      
      <div class="flex items-center gap-1">
        <Button
          v-for="page in displayedPages"
          :key="page"
          :variant="page === currentPage ? 'default' : 'outline'"
          size="sm"
          class="w-10"
          :class="page === currentPage ? 'bg-gradient-to-r from-[#8E44AD] to-[#A3E635]' : ''"
          @click="currentPage = page"
        >
          {{ page }}
        </Button>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
        <ChevronRight class="h-4 w-4" />
      </Button>
    </div>

    <!-- Notification Detail Dialog -->
    <Dialog v-model:open="detailDialogOpen">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{{ selectedNotification?.title }}</DialogTitle>
        </DialogHeader>
        <div class="py-4">
          <p class="text-sm text-muted-foreground whitespace-pre-wrap">
            {{ selectedNotification?.message }}
          </p>
          <div class="mt-4 pt-4 border-t">
            <p class="text-xs text-muted-foreground">
              {{ formatFullDate(selectedNotification?.createdAt) }}
            </p>
          </div>
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

    <!-- Delete All Confirmation Dialog -->
    <Dialog v-model:open="showDeleteAllDialog">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Clear all notifications?</DialogTitle>
        </DialogHeader>
        <p class="text-sm text-muted-foreground py-4">
          This will permanently delete all {{ notifications.length }} notification{{ notifications.length > 1 ? 's' : '' }}. This action cannot be undone.
        </p>
        <DialogFooter class="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            @click="showDeleteAllDialog = false"
            class="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            @click="handleDeleteAll"
            :disabled="deletingAll"
            class="w-full sm:w-auto"
          >
            {{ deletingAll ? 'Deleting...' : 'Delete All' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { Bell, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from '../components/ui/button.vue'
import Badge from '../components/ui/badge.vue'
import { Card, CardContent } from '../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { useNotificationStore } from '../store/notifications'
import { useToast } from '../components/ui/toast/use-toast'

const ITEMS_PER_PAGE = 10

export default {
  name: 'NotificationsPage',
  components: {
    Bell,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Button,
    Badge,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  },
  setup() {
    const notificationStore = useNotificationStore()
    const { toast } = useToast()
    
    const loading = ref(false)
    const error = ref(null)
    const detailDialogOpen = ref(false)
    const showDeleteAllDialog = ref(false)
    const selectedNotification = ref(null)
    const deleting = ref(false)
    const deletingAll = ref(false)
    const currentPage = ref(1)
    
    const notifications = computed(() => notificationStore.notifications)
    const unreadCount = computed(() => 
      notifications.value.filter(n => !n.isRead).length
    )
    
    const totalPages = computed(() => 
      Math.ceil(notifications.value.length / ITEMS_PER_PAGE)
    )
    
    const paginatedNotifications = computed(() => {
      const start = (currentPage.value - 1) * ITEMS_PER_PAGE
      const end = start + ITEMS_PER_PAGE
      return notifications.value.slice(start, end)
    })
    
    const displayedPages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })
    
    const fetchNotifications = async () => {
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
      
      if (!notification.isRead) {
        try {
          await notificationStore.markAsRead(notification.id)
        } catch (err) {
          console.error('Error marking notification as read:', err)
        }
      }
    }
    
    const handleDeleteClick = (notification) => {
      selectedNotification.value = notification
      handleDelete(notification)
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
        
        // Adjust current page if needed
        if (paginatedNotifications.value.length === 0 && currentPage.value > 1) {
          currentPage.value--
        }
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
    
    const handleDeleteAll = async () => {
      deletingAll.value = true
      
      try {
        const deletePromises = notifications.value.map(notification =>
          notificationStore.deleteNotification(notification.id)
        )
        
        await Promise.all(deletePromises)
        
        showDeleteAllDialog.value = false
        currentPage.value = 1
        
        toast({
          title: 'Success',
          description: 'All notifications deleted successfully',
        })
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to delete all notifications',
          variant: 'destructive',
        })
      } finally {
        deletingAll.value = false
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
    
    const formatFullDate = (dateString) => {
      if (!dateString) return ''
      
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    
    onMounted(() => {
      fetchNotifications()
    })
    
    return {
      loading,
      error,
      detailDialogOpen,
      showDeleteAllDialog,
      selectedNotification,
      deleting,
      deletingAll,
      currentPage,
      notifications,
      unreadCount,
      totalPages,
      paginatedNotifications,
      displayedPages,
      fetchNotifications,
      handleNotificationClick,
      handleDeleteClick,
      handleDelete,
      handleDeleteAll,
      markAllAsRead,
      formatDate,
      formatFullDate,
    }
  }
}
</script>