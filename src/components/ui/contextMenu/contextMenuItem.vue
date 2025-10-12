// ContextMenuItem.vue - Individual menu item
<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    :data-inset="inset"
    :data-variant="variant"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*=\\'text-\\'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\\'size-\\'])]:size-4',
      className
    )"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuItem>
</template>

<script>
import { ContextMenuItem } from 'radix-vue'
import { cn } from './utils'

export default {
  name: 'ContextMenuItem',
  components: {
    ContextMenuItem
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    inset: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'destructive'].includes(value)
    }
  },
  inheritAttrs: false,
  setup() {
    return {
      cn
    }
  }
}
</script>