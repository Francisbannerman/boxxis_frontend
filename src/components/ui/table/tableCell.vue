<!-- TableCell.vue -->
<template>
  <td
    :class="cn(
      'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )"
    data-slot="table-cell"
    v-bind="$attrs"
  >
    <slot />
  </td>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableCell'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>