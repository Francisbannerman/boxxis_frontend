<!-- TableHead.vue -->
<template>
  <th
    :class="cn(
      'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )"
    data-slot="table-head"
    v-bind="$attrs"
  >
    <slot />
  </th>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TableHead'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>