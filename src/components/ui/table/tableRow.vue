<!-- TableRow.vue -->
<template>
  <tr
    :class="cn(
      'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
      className
    )"
    data-slot="table-row"
    v-bind="$attrs"
  >
    <slot />
  </tr>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableRow'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>