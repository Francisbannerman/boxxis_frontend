<template>
  <div
    :class="cn('flex flex-col gap-1.5 p-4', className)"
    data-slot="sheet-header"
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