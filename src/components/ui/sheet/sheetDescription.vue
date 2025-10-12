<template>
  <p
    :class="cn('text-muted-foreground text-sm', className)"
    data-slot="sheet-description"
    v-bind="$attrs"
  >
    <slot />
  </p>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
console.log('sheetDescription')


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