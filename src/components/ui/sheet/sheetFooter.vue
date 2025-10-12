<template>
  <div
    :class="cn('mt-auto flex flex-col gap-2 p-4', className)"
    data-slot="sheet-footer"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
console.log('sheetFooter')


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