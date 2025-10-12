<!-- SidebarMenuButton.vue -->
<template>
  <button
    :class="cn(
      // Base classes
      'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50',
      
      // Active state
      'data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground',
      
      // Open state
      'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
      
      // Icon mode
      'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
      
      // Content styling
      '[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
      
      // Variant styles
      variant === 'default' && 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      variant === 'outline' && 'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      
      // Size styles
      size === 'default' && 'h-8 text-sm',
      size === 'sm' && 'h-7 text-xs',
      size === 'lg' && 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      
      className
    )"
    :data-size="size"
    :data-active="isActive"
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
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
  isActive: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: value => ['default', 'sm', 'lg'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
})
</script>