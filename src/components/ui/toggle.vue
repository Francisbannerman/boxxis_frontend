<template>
  <button
    :class="cn(toggleVariants({ variant, size }), className)"
    :data-state="isPressed ? 'on' : 'off'"
    :aria-pressed="isPressed"
    :disabled="disabled"
    data-slot="toggle"
    type="button"
    @click="handleClick"
    @keydown="handleKeyDown"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Toggle variants function (equivalent to cva)
function toggleVariants({ variant = 'default', size = 'default' } = {}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap'
  
  const variantClasses = {
    default: 'bg-transparent',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizeClasses = {
    default: 'h-9 px-2 min-w-9',
    sm: 'h-8 px-1.5 min-w-8',
    lg: 'h-10 px-2.5 min-w-10'
  }
  
  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default
  )
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: value => ['default', 'sm', 'lg'].includes(value)
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultPressed: {
    type: Boolean,
    default: false
  },
  pressed: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Internal state for uncontrolled mode
const internalPressed = ref(props.defaultPressed)

// Computed pressed state (controlled vs uncontrolled)
const isPressed = computed(() => {
  // If pressed prop is provided, use it (controlled)
  if (props.pressed !== null) {
    return props.pressed
  }
  // If modelValue is provided, use it (v-model)
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  // Otherwise use internal state (uncontrolled)
  return internalPressed.value
})

// Event handlers
const handleClick = () => {
  if (props.disabled) return
  
  const newValue = !isPressed.value
  
  // Update internal state if uncontrolled
  if (props.pressed === null && props.modelValue === undefined) {
    internalPressed.value = newValue
  }
  
  // Emit events
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleKeyDown = (event) => {
  if (props.disabled) return
  
  // Handle space and enter keys
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    handleClick()
  }
}

// Export toggleVariants for use in other components
defineExpose({
  toggleVariants
})
</script>