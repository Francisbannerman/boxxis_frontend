<template>
  <div class="toaster-container">
    <TransitionGroup name="toast" tag="div" class="toast-list">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="getToastClasses(toast)"
        class="toast"
      >
        <div class="toast-content">
          <!-- Icon -->
          <div v-if="getIcon(toast.variant)" class="toast-icon">
            <component :is="getIcon(toast.variant)" class="h-5 w-5" />
          </div>

          <!-- Text content -->
          <div class="toast-text">
            <div v-if="toast.title" class="toast-title">
              {{ toast.title }}
            </div>
            <div v-if="toast.description" class="toast-description">
              {{ toast.description }}
            </div>
          </div>

          <!-- Close button -->
          <button
            class="toast-close"
            @click="dismiss(toast.id)"
            aria-label="Close"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { computed } from 'vue'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-vue-next'
import { useToast } from './use-toast'

export default {
  name: 'Toaster',
  components: {
    X,
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
  },
  setup() {
    const { toasts, dismiss } = useToast()

    const getIcon = (variant) => {
      const icons = {
        success: CheckCircle2,
        destructive: AlertCircle,
        warning: AlertTriangle,
        info: Info,
      }
      return icons[variant] || null
    }

    const getToastClasses = (toast) => {
      const variantClasses = {
        default: 'toast-default',
        success: 'toast-success',
        destructive: 'toast-destructive',
        warning: 'toast-warning',
        info: 'toast-info',
      }
      return variantClasses[toast.variant] || variantClasses.default
    }

    return {
      toasts,
      dismiss,
      getIcon,
      getToastClasses,
    }
  },
}
</script>

<style scoped>
.toaster-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  padding: 1rem;
  pointer-events: none;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.toast {
  pointer-events: auto;
  min-width: 356px;
  max-width: 420px;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  transition: all 0.2s ease;
}

.toast:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.toast-icon {
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
  line-height: 1.25rem;
  color: hsl(var(--foreground));
}

.toast-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
  margin-top: 0.25rem;
}

.toast-close {
  flex-shrink: 0;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
  color: hsl(var(--muted-foreground));
  transition: all 0.2s;
}

.toast-close:hover {
  color: hsl(var(--foreground));
  background: hsl(var(--muted));
}

/* Variant styles */
.toast-success {
  border-color: hsl(142, 76%, 36%);
}

.toast-success .toast-icon {
  color: hsl(142, 76%, 36%);
}

.toast-destructive {
  border-color: hsl(0, 84%, 60%);
}

.toast-destructive .toast-icon {
  color: hsl(0, 84%, 60%);
}

.toast-warning {
  border-color: hsl(38, 92%, 50%);
}

.toast-warning .toast-icon {
  color: hsl(38, 92%, 50%);
}

.toast-info {
  border-color: hsl(221, 83%, 53%);
}

.toast-info .toast-icon {
  color: hsl(221, 83%, 53%);
}

/* Toast transitions */
.toast-enter-active {
  animation: toast-in 0.3s ease-out;
}

.toast-leave-active {
  animation: toast-out 0.2s ease-in;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Mobile responsive */
@media (max-width: 640px) {
  .toaster-container {
    left: 0;
    right: 0;
    padding: 1rem;
  }

  .toast-list {
    align-items: stretch;
  }

  .toast {
    min-width: auto;
    max-width: 100%;
  }
}
</style>