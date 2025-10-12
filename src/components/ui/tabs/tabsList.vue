<!-- TabsList.vue -->
<template>
  <div
    :class="cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex',
      className
    )"
    data-slot="tabs-list"
    role="tablist"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

defineOptions({
  name: 'TabsList'
})

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>