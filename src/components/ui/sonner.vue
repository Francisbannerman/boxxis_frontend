<template>
  <div
    ref="toasterRef"
    class="toaster group"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)'
    }"
    v-bind="$attrs"
  >
    <!-- Toast container will be rendered here -->
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="getToastClasses(toast)"
      :data-theme="currentTheme"
      :data-type="toast.type"
      @click="() => dismissToast(toast.id)"
    >
      <div class="toast-content">
        <component 
          v-if="toast.icon" 
          :is="toast.icon" 
          class="toast-icon"
        />
        <div class="toast-text">
          <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>
          <div v-if="toast.description" class="toast-description">{{ toast.description }}</div>
        </div>
        <button 
          v-if="toast.dismissible !== false"
          @click.stop="dismissToast(toast.id)"
          class="toast-close"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  theme: {
    type: String,
    default: 'system'
  },
  position: {
    type: String,
    default: 'bottom-right'
  },
  expand: {
    type: Boolean,
    default: false
  },
  richColors: {
    type: Boolean,
    default: false
  },
  closeButton: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 4000
  }
})

// Toast state
const toasts = ref([])
const toasterRef = ref()

// Theme detection (simplified version of useTheme)
const systemTheme = ref('light')
const currentTheme = computed(() => {
  if (props.theme === 'system') {
    return systemTheme.value
  }
  return props.theme
})

// Detect system theme
const detectSystemTheme = () => {
  if (typeof window !== 'undefined') {
    systemTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
}

// Toast functions
const addToast = (toast) => {
  const id = Date.now() + Math.random()
  const newToast = {
    id,
    type: 'default',
    dismissible: true,
    duration: props.duration,
    ...toast
  }
  
  toasts.value.push(newToast)
  
  // Auto dismiss
  if (newToast.duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, newToast.duration)
  }
  
  return id
}

const dismissToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const getToastClasses = (toast) => {
  const baseClasses = 'toast-item'
  const typeClasses = {
    default: 'toast-default',
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
    info: 'toast-info'
  }
  
  return [baseClasses, typeClasses[toast.type] || typeClasses.default].join(' ')
}

// Global toast methods (similar to sonner's toast functions)
const toast = (message, options = {}) => {
  return addToast({
    description: message,
    type: 'default',
    ...options
  })
}

toast.success = (message, options = {}) => {
  return addToast({
    description: message,
    type: 'success',
    ...options
  })
}

toast.error = (message, options = {}) => {
  return addToast({
    description: message,
    type: 'error',
    ...options
  })
}

toast.warning = (message, options = {}) => {
  return addToast({
    description: message,
    type: 'warning',
    ...options
  })
}

toast.info = (message, options = {}) => {
  return addToast({
    description: message,
    type: 'info',
    ...options
  })
}

toast.dismiss = dismissToast

// Media query listener for system theme
let mediaQuery
onMounted(() => {
  detectSystemTheme()
  
  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', detectSystemTheme)
  }
  
  // Make toast function globally available
  if (typeof window !== 'undefined') {
    window.toast = toast
  }
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', detectSystemTheme)
  }
  
  if (typeof window !== 'undefined') {
    delete window.toast
  }
})

// Expose toast function for composable use
defineExpose({
  toast,
  addToast,
  dismissToast
})
</script>

<style scoped>
.toaster {
  position: fixed;
  z-index: 9999;
  bottom: 1rem;
  right: 1rem;
  max-width: 356px;
  pointer-events: none;
}

.toast-item {
  background: var(--normal-bg);
  color: var(--normal-text);
  border: 1px solid var(--normal-border);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  opacity: 0;
  transform: translateX(100%);
  animation: toast-enter 0.3s ease-out forwards;
  cursor: pointer;
}

.toast-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.toast-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.toast-text {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25;
  margin-bottom: 0.25rem;
}

.toast-description {
  font-size: 0.875rem;
  line-height: 1.25;
  opacity: 0.8;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.5;
  padding: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
}

.toast-close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

/* Toast type variants */
.toast-success {
  border-color: #10b981;
}

.toast-error {
  border-color: #ef4444;
}

.toast-warning {
  border-color: #f59e0b;
}

.toast-info {
  border-color: #3b82f6;
}

/* Animation */
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Dark theme adjustments */
[data-theme="dark"] .toast-item {
  background: var(--normal-bg);
  color: var(--normal-text);
  border-color: var(--normal-border);
}

[data-theme="dark"] .toast-close:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>