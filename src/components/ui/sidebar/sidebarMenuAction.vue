<!-- SidebarMenuAction.vue -->
<template>
  <button
    :class="cn(
      'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      
      // Mobile hit area
      'after:absolute after:-inset-2 md:after:hidden',
      
      // Size positioning
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      
      // Icon mode
      'group-data-[collapsible=icon]:hidden',
      
      // Show on hover
      showOnHover && 'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
      
      className
    )"
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    v-bind="$attrs"
  >
    <slot />
  </button>
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
  },
  showOnHover: {
    type: Boolean,
    default: false
  }
})
</script>