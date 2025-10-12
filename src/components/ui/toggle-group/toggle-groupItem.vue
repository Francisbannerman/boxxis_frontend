<!-- ToggleGroupItem.vue -->
<template>
  <button
    :class="cn(
      toggleVariants({
        variant: contextVariant,
        size: contextSize
      }),
      'min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
      className
    )"
    :data-variant="contextVariant"
    :data-size="contextSize"
    :data-state="isPressed ? 'on' : 'off'"
    :aria-pressed="isPressed"
    data-slot="toggle-group-item"
    type="button"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, inject } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Toggle variants function (similar to your toggle.js file)
function toggleVariants({ variant = 'default', size = 'default' } = {}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
  
  const variantClasses = {
    default: 'bg-transparent',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizeClasses = {
    default: 'h-10 px-3',
    sm: 'h-9 px-2.5',
    lg: 'h-11 px-5'
  }
  
  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size]
  )
}

defineOptions({
  name: 'ToggleGroupItem'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  value: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Get context from parent ToggleGroup
const context = inject('toggleGroupContext', {})

// Use context values or fallback to props
const contextVariant = computed(() => context.variant || props.variant || 'default')
const contextSize = computed(() => context.size || props.size || 'default')

// Determine if this item is pressed/active
const isPressed = computed(() => {
  if (!context.modelValue) return false
  
  if (context.type === 'single') {
    return context.modelValue === props.value
  } else {
    return Array.isArray(context.modelValue) && context.modelValue.includes(props.value)
  }
})

// Handle click
const handleClick = () => {
  if (props.disabled || !context.updateValue) return
  
  if (context.type === 'single') {
    // Single selection mode
    const newValue = isPressed.value ? null : props.value
    context.updateValue(newValue)
  } else {
    // Multiple selection mode
    const currentValues = Array.isArray(context.modelValue) ? context.modelValue : []
    let newValues
    
    if (isPressed.value) {
      // Remove value
      newValues = currentValues.filter(v => v !== props.value)
    } else {
      // Add value
      newValues = [...currentValues, props.value]
    }
    
    context.updateValue(newValues)
  }
}
</script>
