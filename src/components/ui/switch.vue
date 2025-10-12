<template>
  <button
    ref="switchRoot"
    :class="cn(
      'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )"
    :data-state="isChecked ? 'checked' : 'unchecked'"
    :disabled="disabled"
    :aria-checked="isChecked"
    data-slot="switch"
    role="switch"
    type="button"
    @click="handleClick"
    @keydown="handleKeyDown"
    v-bind="$attrs"
  >
    <span
      :class="cn(
        'bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
      )"
      :data-state="isChecked ? 'checked' : 'unchecked'"
      data-slot="switch-thumb"
    />
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultChecked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Refs
const switchRoot = ref()

// Internal state for uncontrolled mode
const internalChecked = ref(props.defaultChecked)

// Computed checked state (controlled vs uncontrolled)
const isChecked = computed(() => {
  // If checked prop is provided, use it (controlled)
  if (props.checked !== null) {
    return props.checked
  }
  // If modelValue is provided, use it (v-model)
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  // Otherwise use internal state (uncontrolled)
  return internalChecked.value
})

// Event handlers
const handleClick = () => {
  if (props.disabled) return
  
  const newValue = !isChecked.value
  
  // Update internal state if uncontrolled
  if (props.checked === null && props.modelValue === undefined) {
    internalChecked.value = newValue
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
</script>