<template>
  <div
    :class="cn(
      'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      className
    )"
    :data-orientation="orientation"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="!decorative ? orientation : undefined"
    data-slot="separator-root"
    v-bind="$attrs"
  />
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utils function
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: value => ['horizontal', 'vertical'].includes(value)
  },
  decorative: {
    type: Boolean,
    default: true
  }
})
</script>
