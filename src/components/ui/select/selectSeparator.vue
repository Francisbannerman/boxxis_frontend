<template>
  <div
    :class="cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)"
    data-slot="select-separator"
    v-bind="$attrs"
  />
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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