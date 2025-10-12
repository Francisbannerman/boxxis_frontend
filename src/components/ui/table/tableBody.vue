<!-- TableBody.vue -->
<template>
  <tbody
    :class="cn('[&_tr:last-child]:border-0', className)"
    data-slot="table-body"
    v-bind="$attrs"
  >
    <slot />
  </tbody>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableBody'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>