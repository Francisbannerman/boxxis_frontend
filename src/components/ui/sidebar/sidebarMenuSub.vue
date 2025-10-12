<!-- SidebarMenuSub.vue -->
<template>
  <ul
    :class="cn(
      'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      className
    )"
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script setup>
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>