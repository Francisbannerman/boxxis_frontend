// ContextMenuRadioItem.vue - Radio menu item
<template>
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\\'size-\\'])]:size-4',
      className
    )"
    v-bind="$attrs"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <CircleIcon class="size-2 fill-current" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>

<script>
import { ContextMenuRadioItem, ContextMenuItemIndicator } from 'radix-vue'
import { CircleIcon } from 'lucide-vue-next'
import { cn } from './utils'

export default {
  name: 'ContextMenuRadioItem',
  components: {
    ContextMenuRadioItem,
    ContextMenuItemIndicator,
    CircleIcon
  },
  props: {
    className: {
      type: String,
      default: ''
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