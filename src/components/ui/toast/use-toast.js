/**
 * Toast Composable
 * Provides a simple API for showing toast notifications
 */

import { ref } from 'vue'

// Global toast state
const toasts = ref([])
let toastId = 0

/**
 * Add a toast notification
 * @param {Object} options - Toast options
 * @returns {number} Toast ID
 */
const addToast = (options) => {
  const id = ++toastId
  const toast = {
    id,
    variant: 'default',
    duration: 4000,
    ...options,
  }

  toasts.value.push(toast)

  // Auto dismiss
  if (toast.duration > 0) {
    setTimeout(() => {
      dismissToast(id)
    }, toast.duration)
  }

  return id
}

/**
 * Dismiss a toast by ID
 * @param {number} id - Toast ID to dismiss
 */
const dismissToast = (id) => {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

/**
 * Toast function with shorthand methods
 */
export const toast = (options) => {
  if (typeof options === 'string') {
    return addToast({ description: options })
  }
  return addToast(options)
}

// Shorthand methods
toast.success = (title, options = {}) => {
  return addToast({
    title: typeof title === 'string' ? title : title.title,
    description: typeof title === 'string' ? options.description : title.description,
    variant: 'success',
    ...options,
  })
}

toast.error = (title, options = {}) => {
  return addToast({
    title: typeof title === 'string' ? title : title.title,
    description: typeof title === 'string' ? options.description : title.description,
    variant: 'destructive',
    ...options,
  })
}

toast.warning = (title, options = {}) => {
  return addToast({
    title: typeof title === 'string' ? title : title.title,
    description: typeof title === 'string' ? options.description : title.description,
    variant: 'warning',
    ...options,
  })
}

toast.info = (title, options = {}) => {
  return addToast({
    title: typeof title === 'string' ? title : title.title,
    description: typeof title === 'string' ? options.description : title.description,
    variant: 'info',
    ...options,
  })
}

toast.dismiss = dismissToast

/**
 * useToast composable
 * Returns the toast function and state
 */
export function useToast() {
  return {
    toast,
    toasts,
    dismiss: dismissToast,
  }
}

// Export for direct use
export { toasts, dismissToast }