<!-- SidebarMenuSubItem.vue -->
<template>
  <li
    :class="cn('group/menu-sub-item relative', className)"
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    v-bind="$attrs"
  >
    <slot />
  </li>
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