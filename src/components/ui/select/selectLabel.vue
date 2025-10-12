<template>
  <div
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', className)"
    data-slot="select-label"
    v-bind="$attrs"
  >
    <slot />
  </div>
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