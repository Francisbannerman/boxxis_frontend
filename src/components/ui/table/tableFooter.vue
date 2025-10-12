<!-- TableFooter.vue -->
<template>
  <tfoot
    :class="cn(
      'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
      className
    )"
    data-slot="table-footer"
    v-bind="$attrs"
  >
    <slot />
  </tfoot>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableFooter'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>