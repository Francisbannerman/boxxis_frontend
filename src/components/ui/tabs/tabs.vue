<template>
  <div
    :class="cn('flex flex-col gap-2', className)"
    data-slot="tabs"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'Tabs'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: null
  },
  defaultValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Internal state for uncontrolled mode
const internalValue = ref(props.defaultValue)

// Current active tab
const activeTab = computed(() => {
  return props.modelValue !== null ? props.modelValue : internalValue.value
})

// Methods
const setActiveTab = (value) => {
  if (props.modelValue !== null) {
    // Controlled mode
    emit('update:modelValue', value)
  } else {
    // Uncontrolled mode
    internalValue.value = value
  }
  emit('change', value)
}

// Provide context for child components
provide('tabsContext', {
  activeTab,
  setActiveTab
})
</script>







