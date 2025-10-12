<!-- TableHeader.vue -->
<template>
  <thead
    :class="cn('[&_tr]:border-b', className)"
    data-slot="table-header"
    v-bind="$attrs"
  >
    <slot />
  </thead>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableHeader'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>