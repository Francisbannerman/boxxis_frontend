<template>
  <h2
    :class="cn('text-foreground font-semibold', className)"
    data-slot="sheet-title"
    v-bind="$attrs"
  >
    <slot />
  </h2>
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