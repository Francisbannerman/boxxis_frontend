<template>
  <div
    :class="cn(
      'group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs',
      className
    )"
    :data-variant="variant"
    :data-size="size"
    data-slot="toggle-group"
    role="group"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { provide } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'ToggleGroup'
})

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
  type: {
    type: String,
    default: 'multiple',
    validator: value => ['single', 'multiple'].includes(value)
  },
  modelValue: {
    type: [String, Array],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Provide context for child components
provide('toggleGroupContext', {
  variant: props.variant,
  size: props.size,
  type: props.type,
  modelValue: props.modelValue,
  updateValue: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})
</script>


