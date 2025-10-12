<!-- SidebarMenuSkeleton.vue -->
<template>
  <div
    :class="cn('flex h-8 items-center gap-2 rounded-md px-2', className)"
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    v-bind="$attrs"
  >
    <div
      v-if="showIcon"
      class="size-4 rounded-md bg-gray-200 animate-pulse"
      data-sidebar="menu-skeleton-icon"
    />
    <div
      class="h-4 flex-1 bg-gray-200 rounded animate-pulse"
      :style="{ width: randomWidth }"
      data-sidebar="menu-skeleton-text"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  showIcon: {
    type: Boolean,
    default: false
  }
})

// Random width between 50 to 90%
const randomWidth = computed(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
})
</script>