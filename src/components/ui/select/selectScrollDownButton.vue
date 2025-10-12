<template>
  <div
    :class="cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )"
    data-slot="select-scroll-down-button"
    v-bind="$attrs"
  >
    <ChevronDown class="size-4" />
  </div>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'
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