<template>
  <div
    data-slot="table-container"
    class="relative w-full overflow-x-auto"
  >
    <table
      :class="cn('w-full caption-bottom text-sm', className)"
      data-slot="table"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'Table'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>
