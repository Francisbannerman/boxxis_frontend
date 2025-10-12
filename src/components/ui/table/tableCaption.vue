<!-- TableCaption.vue -->
<template>
  <caption
    :class="cn('text-muted-foreground mt-4 text-sm', className)"
    data-slot="table-caption"
    v-bind="$attrs"
  >
    <slot />
  </caption>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableCaption'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>