<template>
  <div
    :class="cn('bg-accent animate-pulse rounded-md', className)"
    data-slot="skeleton"
    v-bind="$attrs"
  />
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utils function
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>